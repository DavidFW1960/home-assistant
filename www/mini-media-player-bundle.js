const directives=new WeakMap,isDirective=e=>"function"==typeof e&&directives.has(e),isCEPolyfill=void 0!==window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,removeNodes=(e,t,i=null)=>{let r=t;for(;r!==i;){const t=r.nextSibling;e.removeChild(r),r=t}},noChange={},marker=`{{lit-${String(Math.random()).slice(2)}}}`,nodeMarker=`\x3c!--${marker}--\x3e`,markerRegex=new RegExp(`${marker}|${nodeMarker}`),rewritesStyleAttribute=(()=>{const e=document.createElement("div");return e.setAttribute("style","{{bad value}}"),"{{bad value}}"!==e.getAttribute("style")})();class Template{constructor(e,t){this.parts=[],this.element=t;let i=-1,r=0;const o=[],n=t=>{const s=t.content,a=document.createTreeWalker(s,133,null,!1);let l,c;for(;a.nextNode();){i++,l=c;const t=c=a.currentNode;if(1===t.nodeType){if(t.hasAttributes()){const o=t.attributes;let n=0;for(let e=0;e<o.length;e++)o[e].value.indexOf(marker)>=0&&n++;for(;n-- >0;){const o=e.strings[r],n=lastAttributeNameRegex.exec(o)[2],s=rewritesStyleAttribute&&"style"===n?"style$":/^[a-zA-Z-]*$/.test(n)?n:n.toLowerCase(),a=t.getAttribute(s).split(markerRegex);this.parts.push({type:"attribute",index:i,name:n,strings:a}),t.removeAttribute(s),r+=a.length-1}}"TEMPLATE"===t.tagName&&n(t)}else if(3===t.nodeType){const e=t.nodeValue;if(e.indexOf(marker)<0)continue;const n=t.parentNode,s=e.split(markerRegex),a=s.length-1;r+=a;for(let e=0;e<a;e++)n.insertBefore(""===s[e]?createMarker():document.createTextNode(s[e]),t),this.parts.push({type:"node",index:i++});n.insertBefore(""===s[a]?createMarker():document.createTextNode(s[a]),t),o.push(t)}else if(8===t.nodeType)if(t.nodeValue===marker){const e=t.parentNode,n=t.previousSibling;null===n||n!==l||n.nodeType!==Node.TEXT_NODE?e.insertBefore(createMarker(),t):i--,this.parts.push({type:"node",index:i++}),o.push(t),null===t.nextSibling?e.insertBefore(createMarker(),t):i--,c=l,r++}else{let e=-1;for(;-1!==(e=t.nodeValue.indexOf(marker,e+1));)this.parts.push({type:"node",index:-1})}}};n(t);for(const e of o)e.parentNode.removeChild(e)}}const isTemplatePartActive=e=>-1!==e.index,createMarker=()=>document.createComment(""),lastAttributeNameRegex=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F \x09\x0a\x0c\x0d"'>=\/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;class TemplateInstance{constructor(e,t,i){this._parts=[],this.template=e,this.processor=t,this.options=i}update(e){let t=0;for(const i of this._parts)void 0!==i&&i.setValue(e[t]),t++;for(const e of this._parts)void 0!==e&&e.commit()}_clone(){const e=isCEPolyfill?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),t=this.template.parts;let i=0,r=0;const o=e=>{const n=document.createTreeWalker(e,133,null,!1);let s=n.nextNode();for(;i<t.length&&null!==s;){const e=t[i];if(isTemplatePartActive(e))if(r===e.index){if("node"===e.type){const e=this.processor.handleTextExpression(this.options);e.insertAfterNode(s),this._parts.push(e)}else this._parts.push(...this.processor.handleAttributeExpressions(s,e.name,e.strings,this.options));i++}else r++,"TEMPLATE"===s.nodeName&&o(s.content),s=n.nextNode();else this._parts.push(void 0),i++}};return o(e),isCEPolyfill&&(document.adoptNode(e),customElements.upgrade(e)),e}}class TemplateResult{constructor(e,t,i,r){this.strings=e,this.values=t,this.type=i,this.processor=r}getHTML(){const e=this.strings.length-1;let t="",i=!0;for(let r=0;r<e;r++){const e=this.strings[r];t+=e;const o=e.lastIndexOf(">");!(i=(o>-1||i)&&-1===e.indexOf("<",o+1))&&rewritesStyleAttribute&&(t=t.replace(lastAttributeNameRegex,(e,t,i,r)=>"style"===i?`${t}style$${r}`:e)),t+=i?nodeMarker:marker}return t+=this.strings[e]}getTemplateElement(){const e=document.createElement("template");return e.innerHTML=this.getHTML(),e}}const isPrimitive=e=>null===e||!("object"==typeof e||"function"==typeof e);class AttributeCommitter{constructor(e,t,i){this.dirty=!0,this.element=e,this.name=t,this.strings=i,this.parts=[];for(let e=0;e<i.length-1;e++)this.parts[e]=this._createPart()}_createPart(){return new AttributePart(this)}_getValue(){const e=this.strings,t=e.length-1;let i="";for(let r=0;r<t;r++){i+=e[r];const t=this.parts[r];if(void 0!==t){const e=t.value;if(null!=e&&(Array.isArray(e)||"string"!=typeof e&&e[Symbol.iterator]))for(const t of e)i+="string"==typeof t?t:String(t);else i+="string"==typeof e?e:String(e)}}return i+=e[t]}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class AttributePart{constructor(e){this.value=void 0,this.committer=e}setValue(e){e===noChange||isPrimitive(e)&&e===this.value||(this.value=e,isDirective(e)||(this.committer.dirty=!0))}commit(){for(;isDirective(this.value);){const e=this.value;this.value=noChange,e(this)}this.value!==noChange&&this.committer.commit()}}class NodePart{constructor(e){this.value=void 0,this._pendingValue=void 0,this.options=e}appendInto(e){this.startNode=e.appendChild(createMarker()),this.endNode=e.appendChild(createMarker())}insertAfterNode(e){this.startNode=e,this.endNode=e.nextSibling}appendIntoPart(e){e._insert(this.startNode=createMarker()),e._insert(this.endNode=createMarker())}insertAfterPart(e){e._insert(this.startNode=createMarker()),this.endNode=e.endNode,e.endNode=this.startNode}setValue(e){this._pendingValue=e}commit(){for(;isDirective(this._pendingValue);){const e=this._pendingValue;this._pendingValue=noChange,e(this)}const e=this._pendingValue;e!==noChange&&(isPrimitive(e)?e!==this.value&&this._commitText(e):e instanceof TemplateResult?this._commitTemplateResult(e):e instanceof Node?this._commitNode(e):Array.isArray(e)||e[Symbol.iterator]?this._commitIterable(e):void 0!==e.then?this._commitPromise(e):this._commitText(e))}_insert(e){this.endNode.parentNode.insertBefore(e,this.endNode)}_commitNode(e){this.value!==e&&(this.clear(),this._insert(e),this.value=e)}_commitText(e){const t=this.startNode.nextSibling;e=null==e?"":e,t===this.endNode.previousSibling&&t.nodeType===Node.TEXT_NODE?t.textContent=e:this._commitNode(document.createTextNode("string"==typeof e?e:String(e))),this.value=e}_commitTemplateResult(e){const t=this.options.templateFactory(e);if(this.value&&this.value.template===t)this.value.update(e.values);else{const i=new TemplateInstance(t,e.processor,this.options),r=i._clone();i.update(e.values),this._commitNode(r),this.value=i}}_commitIterable(e){Array.isArray(this.value)||(this.value=[],this.clear());const t=this.value;let i,r=0;for(const o of e)void 0===(i=t[r])&&(i=new NodePart(this.options),t.push(i),0===r?i.appendIntoPart(this):i.insertAfterPart(t[r-1])),i.setValue(o),i.commit(),r++;r<t.length&&(t.length=r,this.clear(i&&i.endNode))}_commitPromise(e){this.value=e,e.then(t=>{this.value===e&&(this.setValue(t),this.commit())})}clear(e=this.startNode){removeNodes(this.startNode.parentNode,e.nextSibling,this.endNode)}}class BooleanAttributePart{constructor(e,t,i){if(this.value=void 0,this._pendingValue=void 0,2!==i.length||""!==i[0]||""!==i[1])throw new Error("Boolean attributes can only contain a single expression");this.element=e,this.name=t,this.strings=i}setValue(e){this._pendingValue=e}commit(){for(;isDirective(this._pendingValue);){const e=this._pendingValue;this._pendingValue=noChange,e(this)}if(this._pendingValue===noChange)return;const e=!!this._pendingValue;this.value!==e&&(e?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name)),this.value=e,this._pendingValue=noChange}}class PropertyCommitter extends AttributeCommitter{constructor(e,t,i){super(e,t,i),this.single=2===i.length&&""===i[0]&&""===i[1]}_createPart(){return new PropertyPart(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class PropertyPart extends AttributePart{}let eventOptionsSupported=!1;try{const e={get capture(){return eventOptionsSupported=!0,!1}};window.addEventListener("test",e,e),window.removeEventListener("test",e,e)}catch(e){}class EventPart{constructor(e,t,i){this.value=void 0,this._pendingValue=void 0,this.element=e,this.eventName=t,this.eventContext=i}setValue(e){this._pendingValue=e}commit(){for(;isDirective(this._pendingValue);){const e=this._pendingValue;this._pendingValue=noChange,e(this)}if(this._pendingValue===noChange)return;const e=this._pendingValue,t=this.value,i=null==e||null!=t&&(e.capture!==t.capture||e.once!==t.once||e.passive!==t.passive),r=null!=e&&(null==t||i);i&&this.element.removeEventListener(this.eventName,this,this._options),this._options=getOptions(e),r&&this.element.addEventListener(this.eventName,this,this._options),this.value=e,this._pendingValue=noChange}handleEvent(e){("function"==typeof this.value?this.value:"function"==typeof this.value.handleEvent?this.value.handleEvent:()=>null).call(this.eventContext||this.element,e)}}const getOptions=e=>e&&(eventOptionsSupported?{capture:e.capture,passive:e.passive,once:e.once}:e.capture);class DefaultTemplateProcessor{handleAttributeExpressions(e,t,i,r){const o=t[0];if("."===o){return new PropertyCommitter(e,t.slice(1),i).parts}return"@"===o?[new EventPart(e,t.slice(1),r.eventContext)]:"?"===o?[new BooleanAttributePart(e,t.slice(1),i)]:new AttributeCommitter(e,t,i).parts}handleTextExpression(e){return new NodePart(e)}}const defaultTemplateProcessor=new DefaultTemplateProcessor;function templateFactory(e){let t=templateCaches.get(e.type);void 0===t&&(t=new Map,templateCaches.set(e.type,t));let i=t.get(e.strings);return void 0===i&&(i=new Template(e,e.getTemplateElement()),t.set(e.strings,i)),i}const templateCaches=new Map,parts=new WeakMap,render=(e,t,i)=>{let r=parts.get(t);void 0===r&&(removeNodes(t,t.firstChild),parts.set(t,r=new NodePart(Object.assign({templateFactory:templateFactory},i))),r.appendInto(t)),r.setValue(e),r.commit()},html=(e,...t)=>new TemplateResult(e,t,"html",defaultTemplateProcessor),walkerNodeFilter=NodeFilter.SHOW_ELEMENT|NodeFilter.SHOW_COMMENT|NodeFilter.SHOW_TEXT;function removeNodesFromTemplate(e,t){const{element:{content:i},parts:r}=e,o=document.createTreeWalker(i,walkerNodeFilter,null,!1);let n=nextActiveIndexInTemplateParts(r),s=r[n],a=-1,l=0;const c=[];let h=null;for(;o.nextNode();){a++;const e=o.currentNode;for(e.previousSibling===h&&(h=null),t.has(e)&&(c.push(e),null===h&&(h=e)),null!==h&&l++;void 0!==s&&s.index===a;)s.index=null!==h?-1:s.index-l,s=r[n=nextActiveIndexInTemplateParts(r,n)]}c.forEach(e=>e.parentNode.removeChild(e))}const countNodes=e=>{let t=e.nodeType===Node.DOCUMENT_FRAGMENT_NODE?0:1;const i=document.createTreeWalker(e,walkerNodeFilter,null,!1);for(;i.nextNode();)t++;return t},nextActiveIndexInTemplateParts=(e,t=-1)=>{for(let i=t+1;i<e.length;i++){const t=e[i];if(isTemplatePartActive(t))return i}return-1};function insertNodeIntoTemplate(e,t,i=null){const{element:{content:r},parts:o}=e;if(null==i)return void r.appendChild(t);const n=document.createTreeWalker(r,walkerNodeFilter,null,!1);let s=nextActiveIndexInTemplateParts(o),a=0,l=-1;for(;n.nextNode();){for(l++,n.currentNode===i&&(a=countNodes(t),i.parentNode.insertBefore(t,i));-1!==s&&o[s].index===l;){if(a>0){for(;-1!==s;)o[s].index+=a,s=nextActiveIndexInTemplateParts(o,s);return}s=nextActiveIndexInTemplateParts(o,s)}}}const getTemplateCacheKey=(e,t)=>`${e}--${t}`;let compatibleShadyCSSVersion=!0;void 0===window.ShadyCSS?compatibleShadyCSSVersion=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected.Please update to at least @webcomponents/webcomponentsjs@2.0.2 and@webcomponents/shadycss@1.3.1."),compatibleShadyCSSVersion=!1);const shadyTemplateFactory=e=>t=>{const i=getTemplateCacheKey(t.type,e);let r=templateCaches.get(i);void 0===r&&(r=new Map,templateCaches.set(i,r));let o=r.get(t.strings);if(void 0===o){const i=t.getTemplateElement();compatibleShadyCSSVersion&&window.ShadyCSS.prepareTemplateDom(i,e),o=new Template(t,i),r.set(t.strings,o)}return o},TEMPLATE_TYPES=["html","svg"],removeStylesFromLitTemplates=e=>{TEMPLATE_TYPES.forEach(t=>{const i=templateCaches.get(getTemplateCacheKey(t,e));void 0!==i&&i.forEach(e=>{const{element:{content:t}}=e,i=new Set;Array.from(t.querySelectorAll("style")).forEach(e=>{i.add(e)}),removeNodesFromTemplate(e,i)})})},shadyRenderSet=new Set,prepareTemplateStyles=(e,t,i)=>{shadyRenderSet.add(i);const r=e.querySelectorAll("style");if(0===r.length)return;const o=document.createElement("style");for(let e=0;e<r.length;e++){const t=r[e];t.parentNode.removeChild(t),o.textContent+=t.textContent}if(removeStylesFromLitTemplates(i),insertNodeIntoTemplate(t,o,t.element.content.firstChild),window.ShadyCSS.prepareTemplateStyles(t.element,i),window.ShadyCSS.nativeShadow){const i=t.element.content.querySelector("style");e.insertBefore(i.cloneNode(!0),e.firstChild)}else{t.element.content.insertBefore(o,t.element.content.firstChild);const e=new Set;e.add(o),removeNodesFromTemplate(t,e)}},render$1=(e,t,i)=>{const r=i.scopeName,o=parts.has(t);if(render(e,t,Object.assign({templateFactory:shadyTemplateFactory(r)},i)),t instanceof ShadowRoot&&compatibleShadyCSSVersion&&e instanceof TemplateResult){if(!shadyRenderSet.has(r)){const e=parts.get(t).value;prepareTemplateStyles(t,e.template,r)}o||window.ShadyCSS.styleElement(t.host)}},fromBooleanAttribute=e=>null!==e,toBooleanAttribute=e=>e?"":null,notEqual=(e,t)=>t!==e&&(t==t||e==e),defaultPropertyDeclaration={attribute:!0,type:String,reflect:!1,hasChanged:notEqual},microtaskPromise=new Promise(e=>e(!0)),STATE_HAS_UPDATED=1,STATE_UPDATE_REQUESTED=4,STATE_IS_REFLECTING=8;class UpdatingElement extends HTMLElement{constructor(){super(),this._updateState=0,this._instanceProperties=void 0,this._updatePromise=microtaskPromise,this._changedProperties=new Map,this._reflectingProperties=void 0,this.initialize()}static get observedAttributes(){this._finalize();const e=[];for(const[t,i]of this._classProperties){const r=this._attributeNameForProperty(t,i);void 0!==r&&(this._attributeToPropertyMap.set(r,t),e.push(r))}return e}static createProperty(e,t=defaultPropertyDeclaration){if(!this.hasOwnProperty("_classProperties")){this._classProperties=new Map;const e=Object.getPrototypeOf(this)._classProperties;void 0!==e&&e.forEach((e,t)=>this._classProperties.set(t,e))}if(this._classProperties.set(e,t),this.prototype.hasOwnProperty(e))return;const i="symbol"==typeof e?Symbol():`__${e}`;Object.defineProperty(this.prototype,e,{get(){return this[i]},set(r){const o=this[e];this[i]=r,this._requestPropertyUpdate(e,o,t)},configurable:!0,enumerable:!0})}static _finalize(){if(this.hasOwnProperty("_finalized")&&this._finalized)return;const e=Object.getPrototypeOf(this);"function"==typeof e._finalize&&e._finalize(),this._finalized=!0,this._attributeToPropertyMap=new Map;const t=this.properties,i=[...Object.getOwnPropertyNames(t),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(t):[]];for(const e of i)this.createProperty(e,t[e])}static _attributeNameForProperty(e,t){const i=void 0!==t&&t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}static _valueHasChanged(e,t,i=notEqual){return i(e,t)}static _propertyValueFromAttribute(e,t){const i=t&&t.type;if(void 0===i)return e;const r=i===Boolean?fromBooleanAttribute:"function"==typeof i?i:i.fromAttribute;return r?r(e):e}static _propertyValueToAttribute(e,t){if(void 0===t||void 0===t.reflect)return;return(t.type===Boolean?toBooleanAttribute:t.type&&t.type.toAttribute||String)(e)}initialize(){this.renderRoot=this.createRenderRoot(),this._saveInstanceProperties()}_saveInstanceProperties(){for(const[e]of this.constructor._classProperties)if(this.hasOwnProperty(e)){const t=this[e];delete this[e],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(e,t)}}_applyInstanceProperties(){for(const[e,t]of this._instanceProperties)this[e]=t;this._instanceProperties=void 0}createRenderRoot(){return this.attachShadow({mode:"open"})}connectedCallback(){this._updateState&STATE_HAS_UPDATED?void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this):this.requestUpdate()}disconnectedCallback(){}attributeChangedCallback(e,t,i){t!==i&&this._attributeToProperty(e,i)}_propertyToAttribute(e,t,i=defaultPropertyDeclaration){const r=this.constructor,o=r._propertyValueToAttribute(t,i);if(void 0!==o){const t=r._attributeNameForProperty(e,i);void 0!==t&&(this._updateState=this._updateState|STATE_IS_REFLECTING,null===o?this.removeAttribute(t):this.setAttribute(t,o),this._updateState=this._updateState&~STATE_IS_REFLECTING)}}_attributeToProperty(e,t){if(!(this._updateState&STATE_IS_REFLECTING)){const i=this.constructor,r=i._attributeToPropertyMap.get(e);if(void 0!==r){const e=i._classProperties.get(r);this[r]=i._propertyValueFromAttribute(t,e)}}}requestUpdate(e,t){if(void 0!==e){const i=this.constructor._classProperties.get(e)||defaultPropertyDeclaration;return this._requestPropertyUpdate(e,t,i)}return this._invalidate()}_requestPropertyUpdate(e,t,i){return this.constructor._valueHasChanged(this[e],t,i.hasChanged)?(this._changedProperties.has(e)||this._changedProperties.set(e,t),!0===i.reflect&&(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(e,i)),this._invalidate()):this.updateComplete}async _invalidate(){if(!this._hasRequestedUpdate){let e;this._updateState=this._updateState|STATE_UPDATE_REQUESTED;const t=this._updatePromise;this._updatePromise=new Promise(t=>e=t),await t,this._validate(),e(!this._hasRequestedUpdate)}return this.updateComplete}get _hasRequestedUpdate(){return this._updateState&STATE_UPDATE_REQUESTED}_validate(){if(this._instanceProperties&&this._applyInstanceProperties(),this.shouldUpdate(this._changedProperties)){const e=this._changedProperties;this.update(e),this._markUpdated(),this._updateState&STATE_HAS_UPDATED||(this._updateState=this._updateState|STATE_HAS_UPDATED,this.firstUpdated(e)),this.updated(e)}else this._markUpdated()}_markUpdated(){this._changedProperties=new Map,this._updateState=this._updateState&~STATE_UPDATE_REQUESTED}get updateComplete(){return this._updatePromise}shouldUpdate(e){return!0}update(e){if(void 0!==this._reflectingProperties&&this._reflectingProperties.size>0){for(const[e,t]of this._reflectingProperties)this._propertyToAttribute(e,this[e],t);this._reflectingProperties=void 0}}updated(e){}firstUpdated(e){}}UpdatingElement._attributeToPropertyMap=new Map,UpdatingElement._finalized=!0,UpdatingElement._classProperties=new Map,UpdatingElement.properties={};class LitElement extends UpdatingElement{update(e){super.update(e);const t=this.render();t instanceof TemplateResult&&this.constructor.render(t,this.renderRoot,{scopeName:this.localName,eventContext:this})}render(){}}LitElement.render=render$1;const MEDIA_INFO=[{attr:"media_title"},{attr:"media_artist"},{attr:"media_series_title"},{attr:"media_season",prefix:"S"},{attr:"media_episode",prefix:"E"}],ICON={dropdown:"mdi:chevron-down",mute:{true:"mdi:volume-off",false:"mdi:volume-high"},next:"mdi:skip-next",playing:{true:"mdi:pause",false:"mdi:play"},power:"mdi:power",prev:"mdi:skip-previous",send:"mdi:send",shuffle:"mdi:shuffle-variant",volume_down:"mdi:volume-minus",volume_up:"mdi:volume-plus"};class MiniMediaPlayer extends LitElement{constructor(){super(),this._overflow=!1}static get properties(){return{_hass:Object,config:Object,entity:Object,source:String,position:Number,active:Boolean,idle:Boolean,_overflow:Boolean}}set hass(e){const t=e.states[this.config.entity];this._hass=e,t&&this.entity!==t&&(this.entity=t)}set overflow(e){e!==this._overflow&&(this._overflow=e)}setConfig(e){if(!e.entity||"media_player"!==e.entity.split(".")[0])throw new Error("Specify an entity from within the media_player domain.");const t=Object.assign({artwork:"default",artwork_border:!1,background:!1,consider_idle_after:!1,consider_pause_idle:!1,group:!1,hide_controls:!1,hide_icon:!1,hide_info:!1,hide_media_info:!1,hide_mute:!1,hide_power:!1,hide_volume:!1,icon:!1,max_volume:100,more_info:!0,power_color:!1,scroll_info:!1,short_info:!1,show_progress:!1,show_shuffle:!1,show_source:!1,show_tts:!1,title:"",toggle_power:!0,volume_stateless:!1},e);t.consider_idle_after=60*Number(t.consider_idle_after)||!1,t.max_volume=Number(t.max_volume)||100,t.collapse=t.hide_controls||t.hide_volume,t.short_info=t.short_info||t.scroll_info||t.collapse,this.config=t}shouldUpdate(e){if(this.entity&&(e.has("entity")||e.has("source")||e.has("position")||e.has("_overflow")))return this.active=this._isActive(),this.config.show_progress&&this._checkProgress(),!0}updated(){this.config.scroll_info&&this._computeOverflow()}render({_hass:e,config:t,entity:i}=this){const r=this._computeArtwork();return html`
      ${this._style()}
      <ha-card ?group=${t.group}
        ?more-info=${t.more_info} ?has-title=${""!==t.title}
        artwork=${t.artwork} ?has-artwork=${r} state=${i.state}
        ?hide-icon=${t.hide_icon} ?hide-info=${this.config.hide_info}
        @click='${e=>this._handleMore()}'>
        <div class='bg' ?bg=${t.background}
          style=${r?`background-image: url("${this._computeCover(r)}");`:""}>
        </div>
        <header>${t.title}</header>
        <div class='entity flex'>
          ${this._renderIcon(r)}
          <div class='entity__info' ?short=${t.short_info||!this.active}>
            <div class='entity__info__name' ?has-info=${this._hasMediaInfo()}>
              ${this._computeName()}
            </div>
            ${this._renderMediaInfo()}
          </div>
          <div class='entity__control-row--top flex'>
            ${this._renderPowerStrip()}
          </div>
        </div>
        <div class='rows'>
          <div class='control-row flex flex-wrap justify' ?wrap=${this.config.volume_stateless}>
            ${!t.collapse&&this.active?this._renderControlRow():""}
          </div>
          ${t.show_tts?this._renderTts():""}
        </div>
        ${t.show_progress&&this._showProgress?this._renderProgress():""}
      </ha-card>`}_computeName(){return this.config.name||this.entity.attributes.friendly_name}_computeCover(e){return e&&"cover"==this.config.artwork?e:this.config.background}_computeArtwork(){return!(!this.entity.attributes.entity_picture||""==this.entity.attributes.entity_picture||"none"===this.config.artwork||!this.active)&&this.entity.attributes.entity_picture}_computeIcon(){return this.config.icon?this.config.icon:this.entity.attributes.icon||"mdi:cast"}_computeOverflow(){const e=this.shadowRoot.querySelector(".marquee");if(e){const t=e.clientWidth>e.parentNode.clientWidth;this.overflow=!(!t||!this.active)&&7.5+e.clientWidth/50}}_renderIcon(e){if(!this.config.hide_icon)return this.active&&e&&"default"==this.config.artwork?html`
        <div class='entity__artwork' ?border=${this.config.artwork_border}
          style='background-image: url("${e}")'
          state=${this.entity.state}>
        </div>`:html`
      <div class='entity__icon'>
        <ha-icon icon='${this._computeIcon()}'></ha-icon>
      </div>
    `}_renderPower(){return html`
      <paper-icon-button class='power-button'
        .icon=${ICON.power}
        @click='${e=>this._handlePower(e)}'
        ?color=${this.config.power_color&&this.active}>
      </paper-icon-button>`}_renderPlayButton(){return html`
      <paper-icon-button .icon=${ICON.playing[this._isPlaying()]}
        @click='${e=>this._callService(e,"media_play_pause")}'>
      </paper-icon-button>`}_renderMediaInfo(){if(this.config.hide_media_info)return;const e=MEDIA_INFO.map(e=>Object.assign({info:this._getAttribute(e.attr),prefix:e.prefix||""},e)).filter(e=>""!==e.info);return html`
      <div class='entity__info__media' ?inactive=${!this.active}
        ?scroll=${this._overflow} style='animation-duration: ${this._overflow}s;'>
        ${this.config.scroll_info?html`
          <div>
            <div class='marquee'>
              ${e.map(e=>html`<span>${e.prefix+e.info}</span>`)}
            </div>
          </div>`:""}
          ${e.map(e=>html`<span>${e.prefix+e.info}</span>`)}
      </div>`}_renderProgress(){return html`
      <paper-progress class='progress transiting' value=${this.position}
        max=${this.entity.attributes.media_duration}>
      </paper-progress>`}_renderString(e,t="Unknown"){return html`
      <span class='string'>
        ${this._getLabel(e,t)}
      </span>`}_renderIdleStatus(){return this._isPaused()?this._renderPlayButton():this._renderString("state.media_player.idle","Idle")}_renderShuffle(){const e=this.entity.attributes.shuffle||!1;return html`
      <paper-icon-button class='shuffle' .icon=${ICON.shuffle} ?color=${e}
        @click='${t=>this._callService(t,"shuffle_set",{shuffle:!e})}'>
      </paper-icon-button>`}_renderPowerStrip({config:e}=this){return"unavailable"==this.entity.state&&this._renderString("state.default.unavailable","Unavailable"),html`
      <div class='select flex'>
        ${this.active&&e.collapse?this._renderControlRow():html``}
        <div class='flex right'>
          ${e.show_source?this._renderSource():html``}
          ${this.idle?this._renderIdleStatus():html``}
          ${e.hide_power?html``:this._renderPower()}
        <div>
      </div>`}_renderSource({entity:e}=this){const t=e.attributes.source_list||!1,i=e.attributes.source||"";if(!t)return;const r=t.indexOf(i);return html`
      <paper-menu-button class='source-menu' slot='dropdown-trigger'
        .horizontalAlign=${"right"} .verticalAlign=${"top"}
        .verticalOffset=${40} .noAnimations=${!0}
        @click='${e=>e.stopPropagation()}'>
        <paper-button class='source-menu__button' slot='dropdown-trigger'>
          <span class='source-menu__source' show=${this.config.show_source}>
            ${this.source||i}
          </span>
          <iron-icon .icon=${ICON.dropdown}></iron-icon>
        </paper-button>
        <paper-listbox slot='dropdown-content' selected=${r}
          @click='${e=>this._handleSource(e)}'>
          ${t.map(e=>html`<paper-item value=${e}>${e}</paper-item>`)}
        </paper-listbox>
      </paper-menu-button>`}_renderControlRow(){return html`
      ${this.config.hide_volume?"":this._renderVolControls()}
      <div class='flex'>
        ${this.config.show_shuffle?this._renderShuffle():""}
        ${this.config.hide_controls?"":this._renderMediaControls()}
      </div>`}_renderMediaControls(){return html`
      <paper-icon-button .icon=${ICON.prev}
        @click='${e=>this._callService(e,"media_previous_track")}'>
      </paper-icon-button>
      ${this._renderPlayButton()}
      <paper-icon-button .icon=${ICON.next}
        @click='${e=>this._callService(e,"media_next_track")}'>
      </paper-icon-button>`}_renderVolControls(){const e=this.entity.attributes.is_volume_muted||!1;return this.config.volume_stateless?this._renderVolButtons(e):this._renderVolSlider(e)}_renderMuteButton(e){const t={is_volume_muted:!e};if(!this.config.hide_mute)return html`
        <paper-icon-button .icon=${ICON.mute[e]}
          @click='${e=>this._callService(e,"volume_mute",t)}'>
        </paper-icon-button>`}_renderVolSlider(e=!1){const t=100*this.entity.attributes.volume_level;return html`
      <div class='vol-control flex'>
        <div>
          ${this._renderMuteButton(e)}
        </div>
        <paper-slider ?disabled=${e}
          @change='${e=>this._handleVolumeChange(e)}'
          @click='${e=>e.stopPropagation()}'
          min='0' max=${this.config.max_volume} value=${t}
          ignore-bar-touch pin>
        </paper-slider>
      </div>`}_renderVolButtons(e=!1){return html`
      <div class='flex'>
        ${this._renderMuteButton(e)}
        <paper-icon-button .icon=${ICON.volume_down}
          @click='${e=>this._callService(e,"volume_down")}'>
        </paper-icon-button>
        <paper-icon-button .icon=${ICON.volume_up}
          @click='${e=>this._callService(e,"volume_up")}'>
        </paper-icon-button>
      </div>`}_renderTts(){return html`
      <div class='tts flex justify'>
        <paper-input class='tts__input' no-label-float
          placeholder=${this._getLabel("ui.card.media_player.text_to_speak","Say")}...
          @click='${e=>e.stopPropagation()}'>
        </paper-input>
        <div>
          <paper-button @click='${e=>this._handleTts(e)}'>
            SEND
          </paper-button>
        </div>
      </div>`}_callService(e,t,i,r="media_player"){e.stopPropagation(),(i=null==i?{}:i).entity_id=i.entity_id||this.config.entity,this._hass.callService(r,t,i)}_handleVolumeChange(e){const t=parseFloat(e.target.value),i=t>0?t/100:0;this._callService(e,"volume_set",{volume_level:i})}_handlePower(e){this.config.toggle_power?this._callService(e,"toggle"):"off"===this.entity.state?this._callService(e,"turn_on"):this._callService(e,"turn_off")}_handleTts(e){const t=this.shadowRoot.querySelector(".tts paper-input"),i={message:t.value};this._callService(e,this.config.show_tts+"_say",i,"tts"),t.value=""}_handleMore({config:e}=this){e.more_info&&this._fire("hass-more-info",{entityId:e.entity})}_handleSource(e){const t=e.target.getAttribute("value"),i={source:t};this._callService(e,"select_source",i),this.source=t}_fire(e,t,i){i=i||{},t=null==t?{}:t;const r=new Event(e,{bubbles:void 0===i.bubbles||i.bubbles,cancelable:Boolean(i.cancelable),composed:void 0===i.composed||i.composed});return r.detail=t,this.dispatchEvent(r),r}_checkProgress(){this._isPlaying()&&this._showProgress?this._positionTracker||(this._positionTracker=setInterval(()=>this.position=this._currentProgress,1e3)):this._positionTracker&&(clearInterval(this._positionTracker),this._positionTracker=null),this.position=this._currentProgress}get _showProgress(){return(this._isPlaying()||this._isPaused())&&this.active&&"media_duration"in this.entity.attributes&&"media_position"in this.entity.attributes&&"media_position_updated_at"in this.entity.attributes}get _currentProgress(){const e=this.entity.attributes.media_position_updated_at;return this.entity.attributes.media_position+(Date.now()-new Date(e).getTime())/1e3}_isPaused(){return"paused"===this.entity.state}_isPlaying(){return"playing"===this.entity.state}_isActive(e=!1){return(this.config.consider_idle_after||this.config.consider_pause_idle)&&(this.idle=this._isIdle()),"off"!==this.entity.state&&"unavailable"!==this.entity.state&&!this.idle||!1}_isIdle(){if(this.config.consider_pause_idle&&this._isPaused())return!0;const e=this.entity.attributes.media_position_updated_at;if(!e||!this.config.consider_idle_after)return!1;const t=(Date.now()-new Date(e).getTime())/1e3;return t>this.config.consider_idle_after||(this._inactiveTracker||(this._inactiveTracker=setTimeout(()=>{this.position=0,this._inactiveTracker=null},1e3*(this.config.consider_idle_after-t))),!1)}_hasMediaInfo(){return 0!==MEDIA_INFO.map(e=>this._getAttribute(e.attr)).filter(e=>""!==e).length&&!this.config.hide_media_info}_getAttribute(e,{entity:t}=this){return t.attributes[e]||""}_getLabel(e,t="unknown"){const i=this._hass.selectedLanguage||this._hass.language,r=this._hass.resources[i];return r&&r[e]?r[e]:t}_style(){return html`
      <style>
        div:empty { display: none; }
        ha-card {
          padding: 16px;
          position: relative;
          transition: padding .5s;
        }
        header {
          display: none;
        }
        ha-card[has-title] header {
          display: block;
          font-size: var(--paper-font-headline_-_font-size);
          font-weight: var(--paper-font-headline_-_font-weight);
          letter-spacing: var(--paper-font-headline_-_letter-spacing);
          line-height: var(--paper-font-headline_-_line-height);
          padding: 24px 16px 16px;
          position: relative;
        }
        ha-card[has-title] {
          padding-top: 0px;
        }
        ha-card[group] {
          background: none;
          box-shadow: none;
          padding: 0;
        }
        ha-card[group][artwork='cover'][has-artwork] {
          padding: 8px 0;
        }
        ha-card[more-info] {
          cursor: pointer;
        }
        ha-card[artwork='cover'][has-artwork] .bg,
        .bg[bg] {
          opacity: 1;
          transition: all .5s ease-in;
        }
        ha-card[artwork='cover'][has-artwork] paper-icon-button,
        ha-card[artwork='cover'][has-artwork] ha-icon,
        ha-card[artwork='cover'][has-artwork] .entity__info,
        ha-card[artwork='cover'][has-artwork] .entity__info__name,
        ha-card[artwork='cover'][has-artwork] paper-button,
        ha-card[artwork='cover'][has-artwork] header,
        ha-card[artwork='cover'][has-artwork] .select span,
        ha-card[artwork='cover'][has-artwork] .source-menu__button[focused] iron-icon {
          color: #FFFFFF;
        }
        ha-card[artwork='cover'][has-artwork] paper-input {
          --paper-input-container-color: #FFFFFF;
          --paper-input-container-input-color: #FFFFFF;
        }
        .bg {
          background: transparent;
          background-size: cover;
          background-repeat: no-repeat;
          background-position: center center;
          opacity: 0;
          transition: all .5s ease-in;
          position: absolute;
          top: 0; right: 0; bottom: 0; left: 0;
        }
        .bg:before {
          background: #000000;
          content: '';
          opacity: 0;
          position: absolute;
          top: 0; left: 0; bottom: 0; right: 0;
          transition: all .5s ease-in;
          visibility: hidden;
        }
        ha-card[artwork='cover'][has-artwork] .bg:before {
          opacity: .5;
          visibility: visible;
        }
        .flex {
          display: flex;
          display: -ms-flexbox;
          display: -webkit-flex;
          flex-direction: row;
        }
        .flex-wrap[wrap] {
          flex-wrap: wrap;
        }
        .justify {
          -webkit-justify-content: space-between;
          justify-content: space-between;
        }
        .hidden {
          display: none;
        }
        .entity__info {
          margin-left: 8px;
          display: block;
          position: relative;
        }
        .rows {
          margin-left: 56px;
          position: relative;
          transition: margin-left 0.25s;
        }
        ha-card[hide-icon] .rows {
          margin-left: 0;
        }
        .entity__info[short] {
          max-height: 40px;
          overflow: hidden;
        }
        .entity__icon {
          color: var(--paper-item-icon-color, #44739e);
        }
        .entity__artwork, .entity__icon {
          background-position: center center;
          background-repeat: no-repeat;
          background-size: cover;
          border-radius: 100%;
          height: 40px;
          line-height: 40px;
          margin-right: 8px;
          min-width: 40px;
          position: relative;
          text-align: center;
          width: 40px;
        }
        .entity__artwork[border] {
          border: 2px solid var(--primary-text-color);
          box-sizing: border-box;
          -moz-box-sizing: border-box;
          -webkit-box-sizing: border-box;
        }
        .entity__artwork[state='playing'] {
          border-color: var(--accent-color);
        }
        .entity__info__name {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .entity__info__name[has-info] {
          line-height: 20px;
        }
        .entity__info__name, .entity__control-row--top {
          line-height: 40px;
        }
        .entity__info__name,
        paper-icon-button,
        paper-button,
        .select span {
          color: var(--primary-text-color);
          position: relative;
        }
        .entity__info__media {
          color: var(--secondary-text-color);
        }
        .entity__info[short] .entity__info__media {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .entity__info__media[inactive] {
          color: var(--primary-text-color);
          opacity: .5;
        }
        .entity__info__media[scroll] > span {
          visibility: hidden;
        }
        .entity__info__media[scroll] > div {
          animation: move linear infinite;
          animation-duration: inherit;
          overflow: visible;
        }
        .entity__info__media[scroll] .marquee {
          animation: slide linear infinite;
          animation-duration: inherit;
          visibility: visible;
        }
        .entity__info__media[scroll] {
          animation-duration: 10s;
          text-overflow: clip !important;
          mask-image: linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%);
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%);
        }
        .marquee {
          visibility: hidden;
          position: absolute;
          white-space: nowrap;
        }
        ha-card[artwork='cover'][has-artwork] .entity__info__media,
        paper-icon-button[color] {
          color: var(--accent-color) !important;
        }
        paper-icon-button {
          transition: color .25s ease-in-out;
        }
        paper-icon-button.shuffle {
          align-self: center;
          height: 38px;
          min-width: 38px;
          text-align: center;
          width: 38px;
        }
        .entity__info__media span:before {
          content: ' - ';
        }
        .entity__info__media span:first-of-type:before {
          content: '';
        }
        .entity__info__media span:empty,
        .source-menu span:empty {
          display: none;
        }
        .tts__input {
          cursor: text;
          flex: 1;
          -webkit-flex: 1;
        }
        .select .vol-control {
          max-width: 200px;
        }
        .entity__control-row--top,
        .select {
          justify-content: flex-end;
          margin-right: 0;
          margin-left: auto;
          width: auto;
        }
        .entity__control-row--top paper-slider {
          flex: 1;
        }
        .entity__control-row--top paper-slider {
          height: 40px;
        }
        .vol-control {
          flex: 1;
          min-width: 140px;
          max-height: 40px;
        }
        paper-slider {
          max-width: 400px;
          min-width: 100px;
          width: 100%;
        }
        paper-input {
          opacity: .75;
          --paper-input-container-color: var(--primary-text-color);
          --paper-input-container-focus-color: var(--accent-color);
        }
        paper-input[focused] {
          opacity: 1;
        }
        .source-menu {
          height: 40px;
          line-height: 20px;
          padding: 0;
        }
        .source-menu[focused] iron-icon {
          color: var(--accent-color);
          transform: rotate(180deg);
        }
        .source-menu__button[focused] iron-icon {
          color: var(--primary-text-color);
          transform: rotate(0deg);
        }
        .source-menu__button {
          height: 40px;
          line-height: 20px;
          margin: 0;
          min-width: 0;
          text-transform: initial;
        }
        .source-menu__source {
          display: block;
          max-width: 60px;
          overflow: hidden;
          position: relative;
          text-overflow: ellipsis;
          width: auto;
          white-space: nowrap;
        }
        .source-menu__source[show="small"] {
          display: none;
        }
        .source-menu__source[show="full"] {
          max-width: none;
        }
        paper-progress {
          bottom: 0;
          height: var(--paper-progress-height, 4px);
          left: 0;
          position: absolute;
          right: 0;
          width: 100%;
          --paper-progress-active-color: var(--accent-color);
          --paper-progress-container-color: rgba(150,150,150,0.25);
          --paper-progress-transition-duration: 1s;
          --paper-progress-transition-timing-function: linear;
          --paper-progress-transition-delay: 0s;
        }
        ha-card[state='paused'] paper-progress {
          --paper-progress-active-color: var(--disabled-text-color, rgba(150,150,150,.5));
        }
        .string {
          margin: 0 8px;
          white-space: nowrap;
        }
        ha-card[hide-info] .entity__info,
        ha-card[hide-info] .entity__artwork,
        ha-card[hide-info] .entity__icon {
          display: none;
        }
        ha-card[hide-info] .entity__control-row--top,
        ha-card[hide-info] .select {
          justify-content: space-between;
        }
        ha-card[hide-info] .right {
          justify-content: flex-end;
          margin-left: auto;
        }
        ha-card[hide-info] .entity__control-row--top,
        ha-card[hide-info] .select,
        .entity__control-row--top,
        .select {
          flex: 1
        }
        ha-card[hide-info] paper-slider,
        ha-card[hide-info] .vol-control {
          width: 100%;
          max-width: none;
        }
        @keyframes slide {
          100% { transform: translateX(-100%); }
        }
        @keyframes move {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        @media screen and (max-width: 325px) {
          .rows {
            margin-left: 0;
          }
          .source-menu__source {
            display: none;
          }
        }
      </style>
    `}getCardSize(){return 1}}customElements.define("mini-media-player",MiniMediaPlayer);
