/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
function t(t,e,i,o){var n,s=arguments.length,r=s<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,o);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(r=(s<3?n(r):s>3?n(e,i,r):n(e,i))||r);return s>3&&r&&Object.defineProperty(e,i,r),r
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */}const e="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,i=(t,e,i=null)=>{for(;e!==i;){const i=e.nextSibling;t.removeChild(e),e=i}},o=`{{lit-${String(Math.random()).slice(2)}}}`,n=`\x3c!--${o}--\x3e`,s=new RegExp(`${o}|${n}`);class r{constructor(t,e){this.parts=[],this.element=e;const i=[],n=[],r=document.createTreeWalker(e.content,133,null,!1);let c=0,u=-1,h=0;const{strings:p,values:{length:g}}=t;for(;h<g;){const t=r.nextNode();if(null!==t){if(u++,1===t.nodeType){if(t.hasAttributes()){const e=t.attributes,{length:i}=e;let o=0;for(let t=0;t<i;t++)a(e[t].name,"$lit$")&&o++;for(;o-- >0;){const e=p[h],i=l.exec(e)[2],o=i.toLowerCase()+"$lit$",n=t.getAttribute(o);t.removeAttribute(o);const r=n.split(s);this.parts.push({type:"attribute",index:u,name:i,strings:r}),h+=r.length-1}}"TEMPLATE"===t.tagName&&(n.push(t),r.currentNode=t.content)}else if(3===t.nodeType){const e=t.data;if(e.indexOf(o)>=0){const o=t.parentNode,n=e.split(s),r=n.length-1;for(let e=0;e<r;e++){let i,s=n[e];if(""===s)i=d();else{const t=l.exec(s);null!==t&&a(t[2],"$lit$")&&(s=s.slice(0,t.index)+t[1]+t[2].slice(0,-"$lit$".length)+t[3]),i=document.createTextNode(s)}o.insertBefore(i,t),this.parts.push({type:"node",index:++u})}""===n[r]?(o.insertBefore(d(),t),i.push(t)):t.data=n[r],h+=r}}else if(8===t.nodeType)if(t.data===o){const e=t.parentNode;null!==t.previousSibling&&u!==c||(u++,e.insertBefore(d(),t)),c=u,this.parts.push({type:"node",index:u}),null===t.nextSibling?t.data="":(i.push(t),u--),h++}else{let e=-1;for(;-1!==(e=t.data.indexOf(o,e+1));)this.parts.push({type:"node",index:-1}),h++}}else r.currentNode=n.pop()}for(const t of i)t.parentNode.removeChild(t)}}const a=(t,e)=>{const i=t.length-e.length;return i>=0&&t.slice(i)===e},c=t=>-1!==t.index,d=()=>document.createComment(""),l=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;function u(t,e){const{element:{content:i},parts:o}=t,n=document.createTreeWalker(i,133,null,!1);let s=p(o),r=o[s],a=-1,c=0;const d=[];let l=null;for(;n.nextNode();){a++;const t=n.currentNode;for(t.previousSibling===l&&(l=null),e.has(t)&&(d.push(t),null===l&&(l=t)),null!==l&&c++;void 0!==r&&r.index===a;)r.index=null!==l?-1:r.index-c,s=p(o,s),r=o[s]}d.forEach(t=>t.parentNode.removeChild(t))}const h=t=>{let e=11===t.nodeType?0:1;const i=document.createTreeWalker(t,133,null,!1);for(;i.nextNode();)e++;return e},p=(t,e=-1)=>{for(let i=e+1;i<t.length;i++){const e=t[i];if(c(e))return i}return-1};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const g=new WeakMap,f=t=>"function"==typeof t&&g.has(t),v={},m={};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
class _{constructor(t,e,i){this.__parts=[],this.template=t,this.processor=e,this.options=i}update(t){let e=0;for(const i of this.__parts)void 0!==i&&i.setValue(t[e]),e++;for(const t of this.__parts)void 0!==t&&t.commit()}_clone(){const t=e?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),i=[],o=this.template.parts,n=document.createTreeWalker(t,133,null,!1);let s,r=0,a=0,d=n.nextNode();for(;r<o.length;)if(s=o[r],c(s)){for(;a<s.index;)a++,"TEMPLATE"===d.nodeName&&(i.push(d),n.currentNode=d.content),null===(d=n.nextNode())&&(n.currentNode=i.pop(),d=n.nextNode());if("node"===s.type){const t=this.processor.handleTextExpression(this.options);t.insertAfterNode(d.previousSibling),this.__parts.push(t)}else this.__parts.push(...this.processor.handleAttributeExpressions(d,s.name,s.strings,this.options));r++}else this.__parts.push(void 0),r++;return e&&(document.adoptNode(t),customElements.upgrade(t)),t}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const y=window.trustedTypes&&trustedTypes.createPolicy("lit-html",{createHTML:t=>t}),S=` ${o} `;class w{constructor(t,e,i,o){this.strings=t,this.values=e,this.type=i,this.processor=o}getHTML(){const t=this.strings.length-1;let e="",i=!1;for(let s=0;s<t;s++){const t=this.strings[s],r=t.lastIndexOf("\x3c!--");i=(r>-1||i)&&-1===t.indexOf("--\x3e",r+1);const a=l.exec(t);e+=null===a?t+(i?S:n):t.substr(0,a.index)+a[1]+a[2]+"$lit$"+a[3]+o}return e+=this.strings[t],e}getTemplateElement(){const t=document.createElement("template");let e=this.getHTML();return void 0!==y&&(e=y.createHTML(e)),t.innerHTML=e,t}}class b extends w{getHTML(){return`<svg>${super.getHTML()}</svg>`}getTemplateElement(){const t=super.getTemplateElement(),e=t.content,i=e.firstChild;return e.removeChild(i),((t,e,i=null,o=null)=>{for(;e!==i;){const i=e.nextSibling;t.insertBefore(e,o),e=i}})(e,i.firstChild),t}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const N=t=>null===t||!("object"==typeof t||"function"==typeof t),E=t=>Array.isArray(t)||!(!t||!t[Symbol.iterator]);class O{constructor(t,e,i){this.dirty=!0,this.element=t,this.name=e,this.strings=i,this.parts=[];for(let t=0;t<i.length-1;t++)this.parts[t]=this._createPart()}_createPart(){return new k(this)}_getValue(){const t=this.strings,e=t.length-1,i=this.parts;if(1===e&&""===t[0]&&""===t[1]){const t=i[0].value;if("symbol"==typeof t)return String(t);if("string"==typeof t||!E(t))return t}let o="";for(let n=0;n<e;n++){o+=t[n];const e=i[n];if(void 0!==e){const t=e.value;if(N(t)||!E(t))o+="string"==typeof t?t:String(t);else for(const e of t)o+="string"==typeof e?e:String(e)}}return o+=t[e],o}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class k{constructor(t){this.value=void 0,this.committer=t}setValue(t){t===v||N(t)&&t===this.value||(this.value=t,f(t)||(this.committer.dirty=!0))}commit(){for(;f(this.value);){const t=this.value;this.value=v,t(this)}this.value!==v&&this.committer.commit()}}class W{constructor(t){this.value=void 0,this.__pendingValue=void 0,this.options=t}appendInto(t){this.startNode=t.appendChild(d()),this.endNode=t.appendChild(d())}insertAfterNode(t){this.startNode=t,this.endNode=t.nextSibling}appendIntoPart(t){t.__insert(this.startNode=d()),t.__insert(this.endNode=d())}insertAfterPart(t){t.__insert(this.startNode=d()),this.endNode=t.endNode,t.endNode=this.startNode}setValue(t){this.__pendingValue=t}commit(){if(null===this.startNode.parentNode)return;for(;f(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=v,t(this)}const t=this.__pendingValue;t!==v&&(N(t)?t!==this.value&&this.__commitText(t):t instanceof w?this.__commitTemplateResult(t):t instanceof Node?this.__commitNode(t):E(t)?this.__commitIterable(t):t===m?(this.value=m,this.clear()):this.__commitText(t))}__insert(t){this.endNode.parentNode.insertBefore(t,this.endNode)}__commitNode(t){this.value!==t&&(this.clear(),this.__insert(t),this.value=t)}__commitText(t){const e=this.startNode.nextSibling,i="string"==typeof(t=null==t?"":t)?t:String(t);e===this.endNode.previousSibling&&3===e.nodeType?e.data=i:this.__commitNode(document.createTextNode(i)),this.value=t}__commitTemplateResult(t){const e=this.options.templateFactory(t);if(this.value instanceof _&&this.value.template===e)this.value.update(t.values);else{const i=new _(e,t.processor,this.options),o=i._clone();i.update(t.values),this.__commitNode(o),this.value=i}}__commitIterable(t){Array.isArray(this.value)||(this.value=[],this.clear());const e=this.value;let i,o=0;for(const n of t)i=e[o],void 0===i&&(i=new W(this.options),e.push(i),0===o?i.appendIntoPart(this):i.insertAfterPart(e[o-1])),i.setValue(n),i.commit(),o++;o<e.length&&(e.length=o,this.clear(i&&i.endNode))}clear(t=this.startNode){i(this.startNode.parentNode,t.nextSibling,this.endNode)}}class x{constructor(t,e,i){if(this.value=void 0,this.__pendingValue=void 0,2!==i.length||""!==i[0]||""!==i[1])throw new Error("Boolean attributes can only contain a single expression");this.element=t,this.name=e,this.strings=i}setValue(t){this.__pendingValue=t}commit(){for(;f(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=v,t(this)}if(this.__pendingValue===v)return;const t=!!this.__pendingValue;this.value!==t&&(t?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=t),this.__pendingValue=v}}class P extends O{constructor(t,e,i){super(t,e,i),this.single=2===i.length&&""===i[0]&&""===i[1]}_createPart(){return new C(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class C extends k{}let j=!1;(()=>{try{const t={get capture(){return j=!0,!1}};window.addEventListener("test",t,t),window.removeEventListener("test",t,t)}catch(t){}})();class M{constructor(t,e,i){this.value=void 0,this.__pendingValue=void 0,this.element=t,this.eventName=e,this.eventContext=i,this.__boundHandleEvent=t=>this.handleEvent(t)}setValue(t){this.__pendingValue=t}commit(){for(;f(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=v,t(this)}if(this.__pendingValue===v)return;const t=this.__pendingValue,e=this.value,i=null==t||null!=e&&(t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive),o=null!=t&&(null==e||i);i&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),o&&(this.__options=V(t),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=t,this.__pendingValue=v}handleEvent(t){"function"==typeof this.value?this.value.call(this.eventContext||this.element,t):this.value.handleEvent(t)}}const V=t=>t&&(j?{capture:t.capture,passive:t.passive,once:t.once}:t.capture)
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */;function $(t){let e=z.get(t.type);void 0===e&&(e={stringsArray:new WeakMap,keyString:new Map},z.set(t.type,e));let i=e.stringsArray.get(t.strings);if(void 0!==i)return i;const n=t.strings.join(o);return i=e.keyString.get(n),void 0===i&&(i=new r(t,t.getTemplateElement()),e.keyString.set(n,i)),e.stringsArray.set(t.strings,i),i}const z=new Map,T=new WeakMap;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const D=new
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
class{handleAttributeExpressions(t,e,i,o){const n=e[0];if("."===n){return new P(t,e.slice(1),i).parts}if("@"===n)return[new M(t,e.slice(1),o.eventContext)];if("?"===n)return[new x(t,e.slice(1),i)];return new O(t,e,i).parts}handleTextExpression(t){return new W(t)}};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.3.0");const A=(t,...e)=>new w(t,e,"html",D),I=(t,...e)=>new b(t,e,"svg",D)
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */,R=(t,e)=>`${t}--${e}`;let Z=!0;void 0===window.ShadyCSS?Z=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),Z=!1);const U=t=>e=>{const i=R(e.type,t);let n=z.get(i);void 0===n&&(n={stringsArray:new WeakMap,keyString:new Map},z.set(i,n));let s=n.stringsArray.get(e.strings);if(void 0!==s)return s;const a=e.strings.join(o);if(s=n.keyString.get(a),void 0===s){const i=e.getTemplateElement();Z&&window.ShadyCSS.prepareTemplateDom(i,t),s=new r(e,i),n.keyString.set(a,s)}return n.stringsArray.set(e.strings,s),s},H=["html","svg"],Y=new Set,q=(t,e,i)=>{Y.add(t);const o=i?i.element:document.createElement("template"),n=e.querySelectorAll("style"),{length:s}=n;if(0===s)return void window.ShadyCSS.prepareTemplateStyles(o,t);const r=document.createElement("style");for(let t=0;t<s;t++){const e=n[t];e.parentNode.removeChild(e),r.textContent+=e.textContent}(t=>{H.forEach(e=>{const i=z.get(R(e,t));void 0!==i&&i.keyString.forEach(t=>{const{element:{content:e}}=t,i=new Set;Array.from(e.querySelectorAll("style")).forEach(t=>{i.add(t)}),u(t,i)})})})(t);const a=o.content;i?function(t,e,i=null){const{element:{content:o},parts:n}=t;if(null==i)return void o.appendChild(e);const s=document.createTreeWalker(o,133,null,!1);let r=p(n),a=0,c=-1;for(;s.nextNode();){c++;for(s.currentNode===i&&(a=h(e),i.parentNode.insertBefore(e,i));-1!==r&&n[r].index===c;){if(a>0){for(;-1!==r;)n[r].index+=a,r=p(n,r);return}r=p(n,r)}}}(i,r,a.firstChild):a.insertBefore(r,a.firstChild),window.ShadyCSS.prepareTemplateStyles(o,t);const c=a.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==c)e.insertBefore(c.cloneNode(!0),e.firstChild);else if(i){a.insertBefore(r,a.firstChild);const t=new Set;t.add(r),u(i,t)}};window.JSCompiler_renameProperty=(t,e)=>t;const L={toAttribute(t,e){switch(e){case Boolean:return t?"":null;case Object:case Array:return null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){switch(e){case Boolean:return null!==t;case Number:return null===t?null:Number(t);case Object:case Array:return JSON.parse(t)}return t}},F=(t,e)=>e!==t&&(e==e||t==t),J={attribute:!0,type:String,converter:L,reflect:!1,hasChanged:F};class B extends HTMLElement{constructor(){super(),this.initialize()}static get observedAttributes(){this.finalize();const t=[];return this._classProperties.forEach((e,i)=>{const o=this._attributeNameForProperty(i,e);void 0!==o&&(this._attributeToPropertyMap.set(o,i),t.push(o))}),t}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const t=Object.getPrototypeOf(this)._classProperties;void 0!==t&&t.forEach((t,e)=>this._classProperties.set(e,t))}}static createProperty(t,e=J){if(this._ensureClassProperties(),this._classProperties.set(t,e),e.noAccessor||this.prototype.hasOwnProperty(t))return;const i="symbol"==typeof t?Symbol():"__"+t,o=this.getPropertyDescriptor(t,i,e);void 0!==o&&Object.defineProperty(this.prototype,t,o)}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(o){const n=this[t];this[e]=o,this.requestUpdateInternal(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this._classProperties&&this._classProperties.get(t)||J}static finalize(){const t=Object.getPrototypeOf(this);if(t.hasOwnProperty("finalized")||t.finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const t=this.properties,e=[...Object.getOwnPropertyNames(t),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(t):[]];for(const i of e)this.createProperty(i,t[i])}}static _attributeNameForProperty(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}static _valueHasChanged(t,e,i=F){return i(t,e)}static _propertyValueFromAttribute(t,e){const i=e.type,o=e.converter||L,n="function"==typeof o?o:o.fromAttribute;return n?n(t,i):t}static _propertyValueToAttribute(t,e){if(void 0===e.reflect)return;const i=e.type,o=e.converter;return(o&&o.toAttribute||L.toAttribute)(t,i)}initialize(){this._updateState=0,this._updatePromise=new Promise(t=>this._enableUpdatingResolver=t),this._changedProperties=new Map,this._saveInstanceProperties(),this.requestUpdateInternal()}_saveInstanceProperties(){this.constructor._classProperties.forEach((t,e)=>{if(this.hasOwnProperty(e)){const t=this[e];delete this[e],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(e,t)}})}_applyInstanceProperties(){this._instanceProperties.forEach((t,e)=>this[e]=t),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){void 0!==this._enableUpdatingResolver&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(t,e,i){e!==i&&this._attributeToProperty(t,i)}_propertyToAttribute(t,e,i=J){const o=this.constructor,n=o._attributeNameForProperty(t,i);if(void 0!==n){const t=o._propertyValueToAttribute(e,i);if(void 0===t)return;this._updateState=8|this._updateState,null==t?this.removeAttribute(n):this.setAttribute(n,t),this._updateState=-9&this._updateState}}_attributeToProperty(t,e){if(8&this._updateState)return;const i=this.constructor,o=i._attributeToPropertyMap.get(t);if(void 0!==o){const t=i.getPropertyOptions(o);this._updateState=16|this._updateState,this[o]=i._propertyValueFromAttribute(e,t),this._updateState=-17&this._updateState}}requestUpdateInternal(t,e,i){let o=!0;if(void 0!==t){const n=this.constructor;i=i||n.getPropertyOptions(t),n._valueHasChanged(this[t],e,i.hasChanged)?(this._changedProperties.has(t)||this._changedProperties.set(t,e),!0!==i.reflect||16&this._updateState||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(t,i))):o=!1}!this._hasRequestedUpdate&&o&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(t,e){return this.requestUpdateInternal(t,e),this.updateComplete}async _enqueueUpdate(){this._updateState=4|this._updateState;try{await this._updatePromise}catch(t){}const t=this.performUpdate();return null!=t&&await t,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return 4&this._updateState}get hasUpdated(){return 1&this._updateState}performUpdate(){if(!this._hasRequestedUpdate)return;this._instanceProperties&&this._applyInstanceProperties();let t=!1;const e=this._changedProperties;try{t=this.shouldUpdate(e),t?this.update(e):this._markUpdated()}catch(e){throw t=!1,this._markUpdated(),e}t&&(1&this._updateState||(this._updateState=1|this._updateState,this.firstUpdated(e)),this.updated(e))}_markUpdated(){this._changedProperties=new Map,this._updateState=-5&this._updateState}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this._updatePromise}shouldUpdate(t){return!0}update(t){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach((t,e)=>this._propertyToAttribute(e,this[e],t)),this._reflectingProperties=void 0),this._markUpdated()}updated(t){}firstUpdated(t){}}B.finalized=!0;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const K=t=>e=>"function"==typeof e?((t,e)=>(window.customElements.define(t,e),e))(t,e):((t,e)=>{const{kind:i,elements:o}=e;return{kind:i,elements:o,finisher(e){window.customElements.define(t,e)}}})(t,e),X=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?Object.assign(Object.assign({},e),{finisher(i){i.createProperty(e.key,t)}}):{kind:"field",key:Symbol(),placement:"own",descriptor:{},initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(i){i.createProperty(e.key,t)}};function G(t){return(e,i)=>void 0!==i?((t,e,i)=>{e.constructor.createProperty(i,t)})(t,e,i):X(t,e)}function Q(t){return G({attribute:!1,hasChanged:null==t?void 0:t.hasChanged})}
/**
@license
Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/const tt=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,et=Symbol();class it{constructor(t,e){if(e!==et)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){return void 0===this._styleSheet&&(tt?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const ot=(t,...e)=>{const i=e.reduce((e,i,o)=>e+(t=>{if(t instanceof it)return t.cssText;if("number"==typeof t)return t;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${t}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(i)+t[o+1],t[0]);return new it(i,et)};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
(window.litElementVersions||(window.litElementVersions=[])).push("2.4.0");const nt={};class st extends B{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const t=this.getStyles();if(Array.isArray(t)){const e=(t,i)=>t.reduceRight((t,i)=>Array.isArray(i)?e(i,t):(t.add(i),t),i),i=e(t,new Set),o=[];i.forEach(t=>o.unshift(t)),this._styles=o}else this._styles=void 0===t?[]:[t];this._styles=this._styles.map(t=>{if(t instanceof CSSStyleSheet&&!tt){const e=Array.prototype.slice.call(t.cssRules).reduce((t,e)=>t+e.cssText,"");return new it(String(e),et)}return t})}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const t=this.constructor._styles;0!==t.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?tt?this.renderRoot.adoptedStyleSheets=t.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(t.map(t=>t.cssText),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(t){const e=this.render();super.update(t),e!==nt&&this.constructor.render(e,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach(t=>{const e=document.createElement("style");e.textContent=t.cssText,this.renderRoot.appendChild(e)}))}render(){return nt}}st.finalized=!0,st.render=(t,e,o)=>{if(!o||"object"!=typeof o||!o.scopeName)throw new Error("The `scopeName` option is required.");const n=o.scopeName,s=T.has(e),r=Z&&11===e.nodeType&&!!e.host,a=r&&!Y.has(n),c=a?document.createDocumentFragment():e;if(((t,e,o)=>{let n=T.get(e);void 0===n&&(i(e,e.firstChild),T.set(e,n=new W(Object.assign({templateFactory:$},o))),n.appendInto(e)),n.setValue(t),n.commit()})(t,c,Object.assign({templateFactory:U(n)},o)),a){const t=T.get(c);T.delete(c);const o=t.value instanceof _?t.value.template:void 0;q(n,c,o),i(e,e.firstChild),e.appendChild(c),T.set(e,t)}!s&&r&&window.ShadyCSS.styleElement(e.host)};var rt=/d{1,4}|M{1,4}|YY(?:YY)?|S{1,3}|Do|ZZ|Z|([HhMsDm])\1?|[aA]|"[^"]*"|'[^']*'/g,at="[^\\s]+",ct=/\[([^]*?)\]/gm;function dt(t,e){for(var i=[],o=0,n=t.length;o<n;o++)i.push(t[o].substr(0,e));return i}var lt=function(t){return function(e,i){var o=i[t].map((function(t){return t.toLowerCase()})).indexOf(e.toLowerCase());return o>-1?o:null}};function ut(t){for(var e=[],i=1;i<arguments.length;i++)e[i-1]=arguments[i];for(var o=0,n=e;o<n.length;o++){var s=n[o];for(var r in s)t[r]=s[r]}return t}var ht=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],pt=["January","February","March","April","May","June","July","August","September","October","November","December"],gt=dt(pt,3),ft={dayNamesShort:dt(ht,3),dayNames:ht,monthNamesShort:gt,monthNames:pt,amPm:["am","pm"],DoFn:function(t){return t+["th","st","nd","rd"][t%10>3?0:(t-t%10!=10?1:0)*t%10]}},vt=ut({},ft),mt=function(t,e){for(void 0===e&&(e=2),t=String(t);t.length<e;)t="0"+t;return t},_t={D:function(t){return String(t.getDate())},DD:function(t){return mt(t.getDate())},Do:function(t,e){return e.DoFn(t.getDate())},d:function(t){return String(t.getDay())},dd:function(t){return mt(t.getDay())},ddd:function(t,e){return e.dayNamesShort[t.getDay()]},dddd:function(t,e){return e.dayNames[t.getDay()]},M:function(t){return String(t.getMonth()+1)},MM:function(t){return mt(t.getMonth()+1)},MMM:function(t,e){return e.monthNamesShort[t.getMonth()]},MMMM:function(t,e){return e.monthNames[t.getMonth()]},YY:function(t){return mt(String(t.getFullYear()),4).substr(2)},YYYY:function(t){return mt(t.getFullYear(),4)},h:function(t){return String(t.getHours()%12||12)},hh:function(t){return mt(t.getHours()%12||12)},H:function(t){return String(t.getHours())},HH:function(t){return mt(t.getHours())},m:function(t){return String(t.getMinutes())},mm:function(t){return mt(t.getMinutes())},s:function(t){return String(t.getSeconds())},ss:function(t){return mt(t.getSeconds())},S:function(t){return String(Math.round(t.getMilliseconds()/100))},SS:function(t){return mt(Math.round(t.getMilliseconds()/10),2)},SSS:function(t){return mt(t.getMilliseconds(),3)},a:function(t,e){return t.getHours()<12?e.amPm[0]:e.amPm[1]},A:function(t,e){return t.getHours()<12?e.amPm[0].toUpperCase():e.amPm[1].toUpperCase()},ZZ:function(t){var e=t.getTimezoneOffset();return(e>0?"-":"+")+mt(100*Math.floor(Math.abs(e)/60)+Math.abs(e)%60,4)},Z:function(t){var e=t.getTimezoneOffset();return(e>0?"-":"+")+mt(Math.floor(Math.abs(e)/60),2)+":"+mt(Math.abs(e)%60,2)}},yt=function(t){return+t-1},St=[null,"[1-9]\\d?"],wt=[null,at],bt=["isPm",at,function(t,e){var i=t.toLowerCase();return i===e.amPm[0]?0:i===e.amPm[1]?1:null}],Nt=["timezoneOffset","[^\\s]*?[\\+\\-]\\d\\d:?\\d\\d|[^\\s]*?Z?",function(t){var e=(t+"").match(/([+-]|\d\d)/gi);if(e){var i=60*+e[1]+parseInt(e[2],10);return"+"===e[0]?i:-i}return 0}],Et=(lt("monthNamesShort"),lt("monthNames"),{default:"ddd MMM DD YYYY HH:mm:ss",shortDate:"M/D/YY",mediumDate:"MMM D, YYYY",longDate:"MMMM D, YYYY",fullDate:"dddd, MMMM D, YYYY",isoDate:"YYYY-MM-DD",isoDateTime:"YYYY-MM-DDTHH:mm:ssZ",shortTime:"HH:mm",mediumTime:"HH:mm:ss",longTime:"HH:mm:ss.SSS"});var Ot=function(t,e,i){if(void 0===e&&(e=Et.default),void 0===i&&(i={}),"number"==typeof t&&(t=new Date(t)),"[object Date]"!==Object.prototype.toString.call(t)||isNaN(t.getTime()))throw new Error("Invalid Date pass to format");var o=[];e=(e=Et[e]||e).replace(ct,(function(t,e){return o.push(e),"@@@"}));var n=ut(ut({},vt),i);return(e=e.replace(rt,(function(e){return _t[e](t,n)}))).replace(/@@@/g,(function(){return o.shift()}))},kt=(function(){try{(new Date).toLocaleDateString("i")}catch(t){return"RangeError"===t.name}}(),function(){try{(new Date).toLocaleString("i")}catch(t){return"RangeError"===t.name}}(),function(){try{(new Date).toLocaleTimeString("i")}catch(t){return"RangeError"===t.name}}(),function(t,e,i,o){o=o||{},i=null==i?{}:i;var n=new Event(e,{bubbles:void 0===o.bubbles||o.bubbles,cancelable:Boolean(o.cancelable),composed:void 0===o.composed||o.composed});return n.detail=i,t.dispatchEvent(n),n}),Wt={version:"Verze",description:"Zobrazit kompas s indikátorem ve směru hodnoty entity",invalid_configuration:"Neplatná konfigurace",no_entity:"Entita není nakonfigurována",offset_not_a_number:"Kompenzace směru není číslo",invalid:"Neplatné",on:"Zapnuto",off:"Vypnuto"},xt={name:"Název",optional:"Volitelný",entity:"Entita",required:"Požadované",primary:"Směr",secondary:"Sekundární",indicator:"Indikátor",direction:"Směr",offset:"Kompenzace",show:"Ukázat",abbreviations:"Zkratky",toggle:"Přepnout",language:"Jazyk","primary entity description":"Entita směru ","secondary entity description":"Sekundární entita","language description":"Jazyk zkratky směru","offset description":"Kompenzace směru","show north description":"Zobrazit indikátor severu"},Pt={north:"Sever",east:"Východ",south:"Jih",west:"Západ",N:"S",NNE:"SSV",NE:"SV",ENE:"VSV",E:"V",ESE:"VJV",SE:"JV",SSE:"JJV",S:"J",SSW:"JJZ",SW:"JZ",WSW:"ZJZ",W:"Z",WNW:"ZSZ",NW:"SZ",NNW:"SSZ"},Ct={common:Wt,editor:xt,directions:Pt},jt={version:"Version",description:"Zeigt einen Kompass mit einem Indikator in Richtung des Entitätswertes an",invalid_configuration:"Ungültige Konfiguration",no_entity:"Entität nicht konfiguriert",offset_not_a_number:"Richtungs-Offset ist keine Zahl",invalid:"ungültig",on:"An",off:"Aus"},Mt={name:"Name",optional:"Optional",entity:"Entität",required:"Benötigt",primary:"Richtung",secondary:"Sekundär",indicator:"Indikator",direction:"Richtung",offset:"Offset",show:"Zeige",abbreviations:"Abkürzungen",toggle:"Umschalten",language:"Sprache","primary entity description":"Richtungsentität","secondary entity description":"Sekundäre Entität","language description":"Sprache der Himmelsrichtungen","offset description":"Richtungsversatz","show north description":"Nord-Indikator anzeigen"},Vt={north:"Norden",east:"Osten",south:"Süden",west:"Westen",N:"N",NNE:"NNO",NE:"NO",ENE:"ONO",E:"O",ESE:"OSO",SE:"SO",SSE:"SSO",S:"S",SSW:"SSW",SW:"SW",WSW:"WSW",W:"W",WNW:"WNW",NW:"NW",NNW:"NNW"},$t={common:jt,editor:Mt,directions:Vt},zt={version:"Version",description:"Show a compass with an indicator in the direction of the entity's value",invalid_configuration:"Invalid configuration",missing_direction_entity:"Missing direction entity",no_entity:"Entity not configured",offset_not_a_number:"Direction offset is not a number",invalid:"invalid",on:"On",off:"Off"},Tt={name:"Name",optional:"Optional",entity:"Entity",required:"Required",primary:"Direction",secondary:"Secondary",indicator:"Indicator",direction:"Direction",offset:"Offset",show:"Show",abbreviations:"Abbreviations",toggle:"Toggle",language:"Language","primary entity description":"Direction entity","secondary entity description":"Secondary entity","language description":"Direction abbreviation language","offset description":"Direction offset","show north description":"Show north indicator"},Dt={north:"North",east:"East",south:"South",west:"West",N:"N",NNE:"NNE",NE:"NE",ENE:"ENE",E:"E",ESE:"ESE",SE:"SE",SSE:"SSE",S:"S",SSW:"SSW",SW:"SW",WSW:"WSW",W:"W",WNW:"WNW",NW:"NW",NNW:"NNW"},At={common:zt,editor:Tt,directions:Dt},It={version:"Versión",description:"Mostrar una brújula con un indicador en la dirección del valor de la entidad",invalid_configuration:"Configuración inválida",no_entity:"Entidad no configurada",offset_not_a_number:"El desplazamiento de dirección no es un número",invalid:"inválido",on:"Encendido",off:"Apagado"},Rt={name:"Nombre",optional:"Opcional",entity:"Entidad",required:"Requerido",primary:"Primario",secondary:"Secundario",indicator:"Indicador",direction:"Dirección",offset:"Desplazamiento",show:"Mostrar",abbreviations:"Abreviaturas",toggle:"Conmutar",language:"Idioma","primary entity description":"Entidad primaria","secondary entity description":"Entidad secundaria","language description":"Idioma abreviatura dirección","offset description":"Desplazamiento de la dirección","show north description":"Mostrar indicador del norte"},Zt={north:"Norte",east:"Este",south:"Sur",west:"Oeste",N:"N",NNE:"NNE",NE:"NE",ENE:"ENE",E:"E",ESE:"ESE",SE:"SE",SSE:"SSE",S:"S",SSW:"SSO",SW:"SO",WSW:"OSO",W:"O",WNW:"ONO",NW:"NO",NNW:"NNO"},Ut={common:It,editor:Rt,directions:Zt},Ht={version:"version",description:"Montre une boussole avec un indicateur dans la direction de la valeur de l'entité",invalid_configuration:"configuration non valable",no_entity:"entité non configurée",offset_not_a_number:"Le décalage de direction n'est pas un nombre",invalid:"invalide",on:"allumé",off:"éteint"},Yt={name:"Nom",optional:"Facultatif",entity:"entité",required:"obligatoire",primary:"primaire",secondary:"secondaire",indicator:"indicateur",direction:"direction",offset:"décalage",show:"montrer",abbreviations:"abréviations",toggle:"basculer",language:"langue","primary entity description":"Entité primaire","secondary entity description":"Entité secondaire","language description":"Langue abréviation de la direction","offset description":"Décalage de la direction","show north description":"Afficher l'indicateur du nord"},qt={north:"Nord",east:"Est",south:"Sud",west:"Ouest",N:"N",NNE:"NNE",NE:"NE",ENE:"ENE",E:"E",ESE:"ESE",SE:"SE",SSE:"SSE",S:"S",SSW:"SSO",SW:"SO",WSW:"OSO",W:"O",WNW:"ONO",NW:"NO",NNW:"NNO"},Lt={common:Ht,editor:Yt,directions:qt},Ft={version:"Versione",description:"Mostra una bussola con un indicatore nella direzione indicata dal valore dell'entità.",invalid_configuration:"Configurazione non valida",no_entity:"Entità non configurata",offset_not_a_number:"L'offset della direzione non è un numero.",invalid:"invalido",on:"Acceso",off:"Spento"},Jt={name:"Nome",optional:"Opzionale",entity:"Entità",required:"Richiesto",primary:"Direzione",secondary:"Secondario",indicator:"Indicatore",direction:"Direzione",offset:"Compensazione",show:"Mostra",abbreviations:"Abbreviazioni",toggle:"Inverti stato",language:"Lingua","primary entity description":"Entità primaria","secondary entity description":"Entità secondaria","language description":"Lingua abbreviazione direzione","offset description":"Compensazione direzione","show north description":"Mostra indicatore Nord"},Bt={north:"Nord",east:"Est",south:"Sud",west:"Ovest",N:"N",NNE:"NNE",NE:"NE",ENE:"ENE",E:"E",ESE:"ESE",SE:"SE",SSE:"SSE",S:"S",SSW:"SSO",SW:"SO",WSW:"OSO",W:"O",WNW:"ONO",NW:"NO",NNW:"NNO"},Kt={common:Ft,editor:Jt,directions:Bt},Xt={version:"Versie",description:"Toon een kompas met een pijl wijzend naar de waarde van de entity",invalid_configuration:"Foutieve configuratie",no_entity:"Entity niet geconfigureerd",offset_not_a_number:"Direction offset is geen nummer",invalid:"ongeldig",on:"Aan",off:"Uit"},Gt={name:"Naam",optional:"Optioneel",entity:"Entiteit",required:"Noodzakelijk",primary:"Richting",secondary:"Secundaire",indicator:"Wijzer",direction:"Richting",offset:"Afwijking",show:"Toon",abbreviations:"Afkorting",toggle:"Wissel",language:"Taal","primary entity description":"Richtings entiteit","secondary entity description":"Secundaire entiteit","language description":"Richting afkortings taal","offset description":"Richtingsafwijking","show north description":"Toon indicator noorden"},Qt={north:"Noorden",east:"Oosten",south:"Zuiden",west:"Westen",N:"N",NNE:"NNO",NE:"NO",ENE:"ONO",E:"O",ESE:"OZO",SE:"ZO",SSE:"ZZO",S:"Z",SSW:"ZZW",SW:"ZW",WSW:"WZW",W:"W",WNW:"WNW",NW:"NW",NNW:"NNW"},te={common:Xt,editor:Gt,directions:Qt},ee={version:"Versjon",description:"Vis et kompass med en indikator i retning av enhetens verdi",invalid_configuration:"Ugyldig konfigurasjon",no_entity:"Enheten er ikke konfigurert",offset_not_a_number:"Retningsforskyvning er ikke et tall",invalid:"Ugyldig",on:"På",off:"Av"},ie={name:"Navn",optional:"Valgfri",entity:"Enhet",required:"Obligatorisk",primary:"Primær",secondary:"Sekundær",indicator:"Indikator",direction:"Retning",offset:"Offset",show:"Vis",abbreviations:"Forkortelser",toggle:"Veksle",language:"Språk","primary entity description":"Retningsenhet","secondary entity description":"Sekundær enhet","language description":"Retning for språkforkortelser","offset description":"Retningsforskyvningt","show north description":"Vis nordindikator"},oe={north:"Nord",east:"Øst",south:"Sør",west:"Vest",N:"N",NNE:"NNØ",NE:"NØ",ENE:"ØNØ",E:"Ø",ESE:"ØSØ",SE:"SØ",SSE:"SSØ",S:"S",SSW:"SSV",SW:"SV",WSW:"VSV",W:"V",WNW:"VNV",NW:"NV",NNW:"NNV"},ne={common:ee,editor:ie,directions:oe},se={version:"Wersja",description:"Pokazuje kompas ze wskaźnikiem w kierunku wartości encji",invalid_configuration:"Nieprawidłowa konfiguracja",no_entity:"Encja nie została skonfigurowana",offset_not_a_number:"Korekcja kierunku powinna być liczbą",invalid:"Nieprawidłowy",on:"Włączony",off:"Wyłączony"},re={name:"Nazwa",optional:"Opcjonalne",entity:"Encja",required:"Wymagane",primary:"Kierunek",secondary:"Dodatkowa",indicator:"Wskaźnik",direction:"Kierunek",offset:"Przesunięcie",show:"Pokaż",abbreviations:"Skróty",toggle:"Przełącznik",language:"Język","primary entity description":"Encja Kierunku","secondary entity description":"Encja Dodatkowa","language description":"Język skrótów kierunków","offset description":"Korekcja kierunku","show north description":"Pokaż wskaźnik Północy"},ae={north:"Północ",east:"Wschód",south:"Południe",west:"Zachód",N:"Pn.",NNE:"Pn. Pn. Wsch.",NE:"Pn. Wsch.",ENE:"Wsch. Pn. Wsch.",E:"Wsch.",ESE:"Wsch. Pd. Wsch.",SE:"Pd. Wsch.",SSE:"Pd. Pd. Wsch.",S:"Pd.",SSW:"Pd. Pd. Zach.",SW:"Pd. Zach.",WSW:"Zach. Pd. Zach.",W:"Zach.",WNW:"Zach. Pn. Zach.",NW:"Pn. Zach.",NNW:"Pn. Pn. Zach."},ce={common:se,editor:re,directions:ae},de={version:"versão",description:"Exibe uma bússola com um indicador na direção do valor da entidade",invalid_configuration:"configuração inválida",no_entity:"entidade não configurada",offset_not_a_number:"o offset direcional não é um número",invalid:"inválido",on:"ligado",off:"desligado"},le={name:"nome",optional:"opcional",entity:"entidade",required:"necessário",primary:"primário",secondary:"secundário",indicator:"indicador",direction:"direção",offset:"offset",show:"mostra",abbreviations:"abreviações",toggle:"alternar",language:"idioma","primary entity description":"Entidade primária","secondary entity description":"Entidade secundária","language description":"Idioma abreviação de direção","offset description":"Offset de direção","show north description":"Mostrar o indicador norte"},ue={north:"norte",east:"leste",south:"sul",west:"oeste",N:"N",NNE:"NNE",NE:"NE",ENE:"ENE",E:"L",ESE:"ESE",SE:"SE",SSE:"SSE",S:"S",SSW:"SSO",SW:"SO",WSW:"OSO",W:"O",WNW:"ONO",NW:"NO",NNW:"NNO"},he={common:de,editor:le,directions:ue},pe={version:"Версия",description:"Показывает компас с индикатором в направлении значения объекта",invalid_configuration:"Неверная конфигурация",no_entity:"Объект не сконфигурирован",offset_not_a_number:"Смещение направления не является числом",invalid:"ошибка",on:"Вкл",off:"Выкл"},ge={name:"Имя",optional:"Не обязательно",entity:"Объект",required:"Обязательно",primary:"Направление",secondary:"Дополнительно",indicator:"Индикатор",direction:"Направление",offset:"Смещение",show:"Показать",abbreviations:"Сокращения",toggle:"Включить",language:"Язык","primary entity description":"Объект направления","secondary entity description":"Дополнительный объект","language description":"Язык аббревиатуры направления","offset description":"Смещение направления","show north description":"Показать индикатор севера"},fe={north:"Север",east:"Восток",south:"Юг",west:"Запад",N:"С",NNE:"ССВ",NE:"СВ",ENE:"ВСВ",E:"В",ESE:"ВСВ",SE:"ЮВ",SSE:"ЮЮВ",S:"Ю",SSW:"ЮЮЗ",SW:"ЮЗ",WSW:"ЗЮЗ",W:"З",WNW:"ЗСЗ",NW:"СЗ",NNW:"ССЗ"},ve={common:pe,editor:ge,directions:fe};const me={cz:Object.freeze({__proto__:null,common:Wt,editor:xt,directions:Pt,default:Ct}),de:Object.freeze({__proto__:null,common:jt,editor:Mt,directions:Vt,default:$t}),en:Object.freeze({__proto__:null,common:zt,editor:Tt,directions:Dt,default:At}),es:Object.freeze({__proto__:null,common:It,editor:Rt,directions:Zt,default:Ut}),fr:Object.freeze({__proto__:null,common:Ht,editor:Yt,directions:qt,default:Lt}),it:Object.freeze({__proto__:null,common:Ft,editor:Jt,directions:Bt,default:Kt}),nl:Object.freeze({__proto__:null,common:Xt,editor:Gt,directions:Qt,default:te}),no:Object.freeze({__proto__:null,common:ee,editor:ie,directions:oe,default:ne}),pl:Object.freeze({__proto__:null,common:se,editor:re,directions:ae,default:ce}),pt:Object.freeze({__proto__:null,common:de,editor:le,directions:ue,default:he}),ru:Object.freeze({__proto__:null,common:pe,editor:ge,directions:fe,default:ve})},_e=[...Object.keys(me),""].sort();function ye(t,e="",i="",o=""){let n;""===o&&(o=(localStorage.getItem("selectedLanguage")||"en").replace(/['"]+/g,"").replace("-","_"));try{n=t.split(".").reduce((t,e)=>t[e],me[o])}catch(e){n=t.split(".").reduce((t,e)=>t[e],me.en)}return void 0===n&&(n=t.split(".").reduce((t,e)=>t[e],me.en)),""!==e&&""!==i&&(n=n.replace(e,i)),n}const Se="mdi:compass",we={N:0,NNE:22.5,NE:45,ENE:67.5,E:90,ESE:112.5,SE:135,SSE:157.5,S:180,SSW:202.5,SW:225,WSW:247.5,W:270,WNW:292.5,NW:315,NNW:337.5},be=[...Object.keys(we)],Ne=ye("common.invalid"),Ee=["arrow_inward","arrow_outward","circle"].sort();function Oe(t,e){const i=[];return t.indicator_sensors.forEach(o=>{o.sensor&&i.push(function(t,e,i,o){var n,s,r,a,c,d,l,u,h,p,g,f,v;const m=i.sensor||"",_=i.attribute||"";return{sensor:""===_?m:m+"."+_,is_attribute:""!==_,indicator:{type:(null===(n=i.indicator)||void 0===n?void 0:n.type)||Ee[1],dynamic_style:xe(null===(s=i.indicator)||void 0===s?void 0:s.dynamic_style,t),color:(null===(r=i.indicator)||void 0===r?void 0:r.color)||e.accent,show:Ce(null===(a=i.indicator)||void 0===a?void 0:a.show,!0)},state_abbreviation:{color:(null===(c=i.state_abbreviation)||void 0===c?void 0:c.color)||e.secondaryText,dynamic_style:xe(null===(d=i.state_abbreviation)||void 0===d?void 0:d.dynamic_style,t),show:Ce(null===(l=i.state_abbreviation)||void 0===l?void 0:l.show,0===o)},state_value:{color:(null===(u=i.state_value)||void 0===u?void 0:u.color)||e.secondaryText,dynamic_style:xe(null===(h=i.state_value)||void 0===h?void 0:h.dynamic_style,t),show:Ce(null===(p=i.state_value)||void 0===p?void 0:p.show,!1)},state_units:{color:(null===(g=i.state_units)||void 0===g?void 0:g.color)||e.secondaryText,dynamic_style:xe(null===(f=i.state_units)||void 0===f?void 0:f.dynamic_style,t),show:Ce(null===(v=i.state_units)||void 0===v?void 0:v.show,!1)}}}(t,e,o,i.length))}),i}function ke(t,e){const i=[];return t.value_sensors&&t.value_sensors.length>0&&t.value_sensors.forEach(o=>{o.sensor&&i.push(function(t,e,i){var o,n,s,r,a,c,d,l,u,h,p,g;const f=i.sensor||"",v=i.attribute||"";return{sensor:""===v?f:f+"."+v,is_attribute:""!==v,state_min:{color:(null===(o=i.state_min)||void 0===o?void 0:o.color)||e.secondaryText,dynamic_style:xe(null===(n=i.state_min)||void 0===n?void 0:n.dynamic_style,t),show:Ce(null===(s=i.state_min)||void 0===s?void 0:s.show,!1)},state_max:{color:(null===(r=i.state_max)||void 0===r?void 0:r.color)||e.secondaryText,dynamic_style:xe(null===(a=i.state_max)||void 0===a?void 0:a.dynamic_style,t),show:Ce(null===(c=i.state_max)||void 0===c?void 0:c.show,!1)},state_value:{color:(null===(d=i.state_value)||void 0===d?void 0:d.color)||e.primaryText,dynamic_style:xe(null===(l=i.state_value)||void 0===l?void 0:l.dynamic_style,t),show:Ce(null===(u=i.state_value)||void 0===u?void 0:u.show,!0)},state_units:{color:(null===(h=i.state_units)||void 0===h?void 0:h.color)||e.secondaryText,dynamic_style:xe(null===(p=i.state_units)||void 0===p?void 0:p.dynamic_style,t),show:Ce(null===(g=i.state_units)||void 0===g?void 0:g.show,!0)}}}(t,e,o))}),i}function We(t){const e=[];return t&&t.forEach(t=>{e.push({from_value:t.from_value,color:t.color||"black",show:Ce(t.show,!0)})}),e}function xe(t,e){const i=(null==t?void 0:t.sensor)||Pe(e).sensor,o=(null==t?void 0:t.attribute)||Pe(e).attribute;return{sensor:""===o?i:i+"."+o,is_attribute:""!==o,bands:We(null==t?void 0:t.bands)}}function Pe(t){var e,i;const o={sensor:(null===(e=t.indicator_sensors[0])||void 0===e?void 0:e.sensor)||"",attribute:(null===(i=t.indicator_sensors[0])||void 0===i?void 0:i.attribute)||""};return t.value_sensors&&t.value_sensors.length>0&&(o.sensor=t.value_sensors[0].sensor,o.attribute=t.value_sensors[0].attribute||o.attribute),o}function Ce(t,e){return void 0===t?e:Boolean(t).valueOf()}let je=class extends st{setConfig(t){var e;(e=t)&&e.entity&&"string"==typeof e.entity?(this._config=function(t){var e,i,o,n,s,r,a,c,d;const l={type:"custom:compass-card",indicator_sensors:[{sensor:t.entity}]};return(null===(e=t.compass)||void 0===e?void 0:e.indicator)&&1!==Ee.indexOf(null===(i=t.compass)||void 0===i?void 0:i.indicator)&&(l.indicator_sensors[0]=Object.assign(Object.assign({},l.indicator_sensors[0]),{indicator:{type:t.compass.indicator}})),t.secondary_entity&&""!==t.secondary_entity&&(l.value_sensors=[{sensor:t.secondary_entity}]),t.direction_offset&&"0"!==t.direction_offset&&(l.compass=Object.assign(Object.assign({},l.compass),{north:Object.assign({offset:Number(t.direction_offset)},null===(o=l.compass)||void 0===o?void 0:o.north)})),(null===(n=t.compass)||void 0===n?void 0:n.show_north)&&(null===(s=t.compass)||void 0===s?void 0:s.show_north)&&(l.compass=Object.assign(Object.assign({},l.compass),{north:Object.assign({show:!0},null===(r=l.compass)||void 0===r?void 0:r.north)})),(null===(a=t.compass)||void 0===a?void 0:a.language)&&""!==(null===(c=t.compass)||void 0===c?void 0:c.language)&&(l.language=null===(d=t.compass)||void 0===d?void 0:d.language),t.tap_action&&(l.tap_action=t.tap_action),t.name&&(l.header={title:{value:t.name}}),Object.assign({},l)}(t),kt(this,"config-changed",{config:this._config})):this._config=t}get _name(){var t,e,i;return(null===(i=null===(e=null===(t=this._config)||void 0===t?void 0:t.header)||void 0===e?void 0:e.title)||void 0===i?void 0:i.value)||""}get _entity(){var t,e,i;return(null===(t=this._config)||void 0===t?void 0:t.indicator_sensors)&&(null===(e=this._config)||void 0===e?void 0:e.indicator_sensors.length)>0?null===(i=this._config)||void 0===i?void 0:i.indicator_sensors[0].sensor:""}get _secondary_entity(){var t,e,i;return(null===(t=this._config)||void 0===t?void 0:t.value_sensors)&&(null===(e=this._config)||void 0===e?void 0:e.value_sensors.length)>0?null===(i=this._config)||void 0===i?void 0:i.value_sensors[0].sensor:""}get _direction_offset(){var t,e,i;return(null===(i=null===(e=null===(t=this._config)||void 0===t?void 0:t.compass)||void 0===e?void 0:e.north)||void 0===i?void 0:i.offset)||0}get _compass_indicator(){var t,e,i,o;return(null===(t=this._config)||void 0===t?void 0:t.indicator_sensors)&&(null===(e=this._config)||void 0===e?void 0:e.indicator_sensors.length)>0&&(null===(o=null===(i=this._config)||void 0===i?void 0:i.indicator_sensors[0].indicator)||void 0===o?void 0:o.type)||Ee[1]}get _compass_show_north(){var t,e,i;return(null===(i=null===(e=null===(t=this._config)||void 0===t?void 0:t.compass)||void 0===e?void 0:e.north)||void 0===i?void 0:i.show)||!1}get _compass_language(){var t;return(null===(t=this._config)||void 0===t?void 0:t.language)||""}render(){if(!this.hass)return A``;const t=["sensor","sun","input_number","input_text"],e=Object.keys(this.hass.states).filter(e=>t.includes(e.substr(0,e.indexOf(".")))).sort(),i=["",...e];return A`
      <div class="card-config">
        ${this.getEditorInput("editor.name","editor.optional","header.title.value",this._name)}
        ${this.getEditorDropDown("editor.primary entity description","editor.required","indicator_sensors[0].sensor",this._entity,e)}
        ${this.getEditorDropDown("editor.secondary entity description","editor.optional","value_sensors[0].sensor",this._secondary_entity,i)}
        ${this.getEditorDropDown("editor.indicator","editor.optional","indicator_sensors[0].indicator.type",this._compass_indicator,Ee)}
        ${this.getEditorDropDown("editor.language description","editor.optional","language",this._compass_language,_e)}
        ${this.getEditorInput("editor.offset description","editor.optional","compass.north.offset",this._direction_offset)}
        ${this.getEditorSwitch("editor.show north description","compass.north.show",this._compass_show_north)}
      </div>
    `}_valueChanged(t){var e,i,o,n,s,r,a,c,d,l,u,h,p,g,f,v,m,_,y,S,w,b,N,E;if(!this._config||!this.hass)return;const O=t.target;if(void 0!==O.checked){if(this["_"+O.configValue]===O.checked)return}else if(this["_"+O.configValue]===O.value)return;if(O.configValue)switch(O.configValue){case"language":this._config=Object.assign(Object.assign({},this._config),{language:O.value}),""===O.value.trim()&&delete this._config.language;break;case"compass.north.show":const t=Object.assign(Object.assign({},null===(e=this._config.compass)||void 0===e?void 0:e.north),{show:O.checked}),W=Object.assign(Object.assign({},this._config.compass),{north:t});this._config=Object.assign(Object.assign({},this._config),{compass:W}),O.checked||(null===(o=null===(i=this._config.compass)||void 0===i?void 0:i.north)||void 0===o||delete o.show,(null===(n=this._config.compass)||void 0===n?void 0:n.north)&&0===Object.keys(null===(s=this._config.compass)||void 0===s?void 0:s.north).length&&(null===(r=this._config.compass)||void 0===r||delete r.north),this._config.compass&&0===Object.keys(this._config.compass).length&&delete this._config.compass);break;case"header.title.value":const x=Object.assign(Object.assign({},null===(a=this._config.header)||void 0===a?void 0:a.title),{value:O.value}),P=Object.assign(Object.assign({},this._config.header),{title:x});this._config=Object.assign(Object.assign({},this._config),{header:P}),""===O.value.trim()&&(null===(d=null===(c=this._config.header)||void 0===c?void 0:c.title)||void 0===d||delete d.value,(null===(l=this._config.header)||void 0===l?void 0:l.title)&&0===Object.keys(null===(u=this._config.header)||void 0===u?void 0:u.title).length&&(null===(h=this._config.header)||void 0===h||delete h.title),this._config.header&&0===Object.keys(this._config.header).length&&delete this._config.header);break;case"compass.north.offset":const C=Object.assign(Object.assign({},null===(p=this._config.compass)||void 0===p?void 0:p.north),{offset:Number(O.value)}),j=Object.assign(Object.assign({},this._config.compass),{north:C});this._config=Object.assign(Object.assign({},this._config),{compass:j}),"string"!=typeof(k=O.value)||isNaN(Number(k))||isNaN(parseFloat(k))||0!==Number(O.value)||(null===(f=null===(g=this._config.compass)||void 0===g?void 0:g.north)||void 0===f||delete f.offset,(null===(v=this._config.compass)||void 0===v?void 0:v.north)&&0===Object.keys(null===(m=this._config.compass)||void 0===m?void 0:m.north).length&&(null===(_=this._config.compass)||void 0===_||delete _.north),this._config.compass&&0===Object.keys(this._config.compass).length&&delete this._config.compass);break;case"indicator_sensors[0].sensor":const M=[...this._config.indicator_sensors];M[0]=Object.assign(Object.assign({},this._config.indicator_sensors[0]),{sensor:O.value}),this._config=Object.assign(Object.assign({},this._config),{indicator_sensors:M}),this._config.indicator_sensors[0].attribute&&delete this._config.indicator_sensors[0].attribute;break;case"value_sensors[0].sensor":const V=this._config.value_sensors?[...this._config.value_sensors]:[];V[0]=Object.assign(Object.assign({},V[0]),{sensor:O.value}),this._config=Object.assign(Object.assign({},this._config),{value_sensors:V}),this._config.value_sensors&&this._config.value_sensors.length>0&&(this._config.value_sensors[0].attribute&&delete this._config.value_sensors[0].attribute,""===O.value.trim()&&(this._config.value_sensors=this._config.value_sensors.slice(1)));break;case"indicator_sensors[0].indicator.type":const $=Object.assign(Object.assign({},null===(y=this._config.indicator_sensors[0])||void 0===y?void 0:y.indicator),{type:O.value}),z=[...this._config.indicator_sensors];z[0]=Object.assign(Object.assign({},this._config.indicator_sensors[0]),{indicator:$}),this._config=Object.assign(Object.assign({},this._config),{indicator_sensors:z}),(null===(w=null===(S=this._config.indicator_sensors[0])||void 0===S?void 0:S.indicator)||void 0===w?void 0:w.type)&&1===Ee.indexOf(null===(N=null===(b=this._config.indicator_sensors[0])||void 0===b?void 0:b.indicator)||void 0===N?void 0:N.type)&&1===Object.keys(null===(E=this._config.indicator_sensors[0])||void 0===E?void 0:E.indicator).length&&delete this._config.indicator_sensors[0].indicator;break;default:console.warn("Value changed of unknown config node: "+O.configValue)}var k;kt(this,"config-changed",{config:this._config})}getEditorDropDown(t,e,i,o,n){return A` <paper-dropdown-menu class="editor-entity-select" label="${ye(t)} (${ye(e)})" @value-changed=${this._valueChanged} .configValue=${i}>
      <paper-listbox slot="dropdown-content" .selected=${n.indexOf(o)}>
        ${n.map(t=>A` <paper-item>${t}</paper-item> `)}
      </paper-listbox>
    </paper-dropdown-menu>`}getEditorInput(t,e,i,o){return A`<paper-input label="${ye(t)} (${ye(e)})" .value=${o} .configValue=${i} @value-changed=${this._valueChanged}></paper-input>`}getEditorSwitch(t,e,i){return A`
      <div class="floated-label-placeholder">
          ${ye(t)}
        </div>
        <ha-switch
          aria-label=${`${ye("editor.toggle")} ${ye("directions.north")} ${ye(i?"common.off":"common.on")}`}
          .checked=${!1!==i}
          .configValue=${e}
          @change=${this._valueChanged}
          >${ye(t)}</ha-switch>
      </div>`}static get styles(){return ot`
      .editor-entity-select {
        width: 100%;
      }

      ha-switch {
        padding-bottom: 8px;
      }
      .floated-label-placeholder {
        font-family: var(--paper-font-caption_-_font-family);
        -webkit-font-smoothing: var(--paper-font-caption_-_-webkit-font-smoothing);
        white-space: var(--paper-font-caption_-_white-space);
        overflow: var(--paper-font-caption_-_overflow);
        text-overflow: var(--paper-font-caption_-_text-overflow);
        font-size: var(--paper-font-caption_-_font-size);
        font-weight: var(--paper-font-caption_-_font-weight);
        letter-spacing: var(--paper-font-caption_-_letter-spacing);
        line-height: var(--paper-font-caption_-_line-height);
        color: var(--secondary-text-color);
      }
    `}};t([G({attribute:!1})],je.prototype,"hass",void 0),t([Q()],je.prototype,"_config",void 0),je=t([K("compass-card-editor")],je);const Me=ot`
  :host ::slotted(.card-content:not(:first-child)),
  slot:not(:first-child)::slotted(.card-content) {
    padding-top: 0px;
    margin-top: -8px;
  }
  :host ::slotted(.card-content) {
    padding: 16px;
  }
  .floated-label-placeholder {
    font-family: var(--paper-font-caption_-_font-family);
    -webkit-font-smoothing: var(--paper-font-caption_-_-webkit-font-smoothing);
    white-space: var(--paper-font-caption_-_white-space);
    overflow: var(--paper-font-caption_-_overflow);
    text-overflow: var(--paper-font-caption_-_text-overflow);
    font-size: var(--paper-font-caption_-_font-size);
    font-weight: var(--paper-font-caption_-_font-weight);
    letter-spacing: var(--paper-font-caption_-_letter-spacing);
    line-height: var(--paper-font-caption_-_line-height);
    color: var(--disabled-text-color);
  }
  ha-card {
    flex-direction: column;
    flex: 1;
    position: relative;
    overflow: hidden;
  }
  .header {
    display: flex;
    justify-content: space-between;
    padding: 8px 16px 0px;
  }
  .header > .name {
    line-height: 40px;
    font-weight: 500;
    font-size: 16px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .icon {
    margin-top: 8px;
    float: right;
  }
  .compass {
    display: block;
    width: 152px;
    height: 152px;
    margin: 10px auto;
  }
  .content {
    height: 162px;
    position: relative;
    width: 100%;
    font-weight: normal;
    line-height: 28px;
  }
  .value-sensors {
    text-overflow: ellipsis;
    white-space: nowrap;
    position: absolute;
    text-align: center;
    top: 62px;
    left: 50%;
    transform: translateX(-50%);
  }
  .indicator-sensors {
    line-height: 18px;
    font-weight: 500;
    font-size: 16px;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: center;
    overflow: hidden;
    position: absolute;
    top: 32px;
    left: 50%;
    transform: translateX(-50%);
  }
  .measurement {
    font-size: 18px;
  }
  .value {
    font-size: 28px;
  }
`;var Ve;console.info(`%c  COMPASS-CARD \n%c  ${ye("common.version")} 1.0.0-dev    `,"color: orange; font-weight: bold; background: black","color: white; font-weight: bold; background: dimgray"),window.customCards=window.customCards||[],window.customCards.push({type:"compass-card",name:"Compass Card",preview:!0,description:ye("common.description")});let $e=Ve=class extends st{static async getConfigElement(){return(await window.loadCardHelpers()).createCardElement({type:"entities",entities:[]}),await customElements.get("hui-entities-card").getConfigElement(),document.createElement("compass-card-editor")}static getStubConfig(){return{type:"custom:compass-card",indicator_sensors:[{sensor:"sun.sun",attribute:"azimuth"}]}}setConfig(t){if(!t)throw new Error(ye("common.invalid_configuration"));if(!t.indicator_sensors||!t.indicator_sensors[0].sensor)throw new Error(ye("common.missing_direction_entity"));t.test_gui&&function(){var t=document.querySelector("home-assistant");if(t=(t=(t=(t=(t=(t=(t=(t=t&&t.shadowRoot)&&t.querySelector("home-assistant-main"))&&t.shadowRoot)&&t.querySelector("app-drawer-layout partial-panel-resolver"))&&t.shadowRoot||t)&&t.querySelector("ha-panel-lovelace"))&&t.shadowRoot)&&t.querySelector("hui-root")){var e=t.lovelace;return e.current_view=t.___curView,e}return null}().setEditMode(!0),this.colors={accent:getComputedStyle(document.documentElement).getPropertyValue("--accent-color").trim(),primary:getComputedStyle(document.documentElement).getPropertyValue("--primary-color").trim(),stateIcon:getComputedStyle(document.documentElement).getPropertyValue("--state-icon-color").trim(),secondaryText:getComputedStyle(document.documentElement).getPropertyValue("--secondary-text-color").trim(),primaryText:getComputedStyle(document.documentElement).getPropertyValue("--primary-text-color").trim()},this._config=Object.assign({},t),this.updateConfig(this._hass,this._config)}getCardSize(){return 5}set hass(t){this._hass=t,this.updateConfig(this._hass,this._config)}shouldUpdate(t){return t.has("_config"),!0}updateConfig(t,e){var i;t&&e&&(this.header=function(t,e,i){var o,n,s,r,a,c,d,l,u,h,p,g,f,v,m,_,y,S,w,b,N,E,O,k,W,x;return{label:(null===(n=null===(o=t.header)||void 0===o?void 0:o.title)||void 0===n?void 0:n.value)||(null===(s=null==i?void 0:i.attributes)||void 0===s?void 0:s.friendly_name)||(null==i?void 0:i.entity_id),title:{value:(null===(a=null===(r=t.header)||void 0===r?void 0:r.title)||void 0===a?void 0:a.value)||"",color:(null===(d=null===(c=t.header)||void 0===c?void 0:c.title)||void 0===d?void 0:d.color)||e.secondaryText,dynamic_style:xe(null===(u=null===(l=t.header)||void 0===l?void 0:l.title)||void 0===u?void 0:u.dynamic_style,t),show:Ce(null===(p=null===(h=t.header)||void 0===h?void 0:h.title)||void 0===p?void 0:p.show,Ce(void 0!==(null===(f=null===(g=t.header)||void 0===g?void 0:g.title)||void 0===f?void 0:f.value),!1))},icon:{value:(null===(m=null===(v=t.header)||void 0===v?void 0:v.icon)||void 0===m?void 0:m.value)||(null===(_=null==i?void 0:i.attributes)||void 0===_?void 0:_.icon)||Se,color:(null===(S=null===(y=t.header)||void 0===y?void 0:y.icon)||void 0===S?void 0:S.color)||e.stateIcon,dynamic_style:xe(null===(b=null===(w=t.header)||void 0===w?void 0:w.icon)||void 0===b?void 0:b.dynamic_style,t),show:Ce(null===(E=null===(N=t.header)||void 0===N?void 0:N.icon)||void 0===E?void 0:E.show,Ce(null===(k=null===(O=t.header)||void 0===O?void 0:O.icon)||void 0===k?void 0:k.value,!1)||Ce(null===(x=null===(W=t.header)||void 0===W?void 0:W.title)||void 0===x?void 0:x.value,!1))}}}(this._config,this.colors,this._hass.states[null===(i=this._config)||void 0===i?void 0:i.indicator_sensors[0].sensor]),this.compass=function(t,e){var i,o,n,s,r,a,c,d,l,u,h,p,g,f;return{circle:{color:(null===(o=null===(i=t.compass)||void 0===i?void 0:i.circle)||void 0===o?void 0:o.color)||e.primary,dynamic_style:xe(null===(s=null===(n=t.compass)||void 0===n?void 0:n.circle)||void 0===s?void 0:s.dynamic_style,t),show:Ce(null===(a=null===(r=t.compass)||void 0===r?void 0:r.circle)||void 0===a?void 0:a.show,!0)},north:{offset:(null===(d=null===(c=t.compass)||void 0===c?void 0:c.north)||void 0===d?void 0:d.offset)||0,color:(null===(u=null===(l=t.compass)||void 0===l?void 0:l.north)||void 0===u?void 0:u.color)||e.primary,dynamic_style:xe(null===(p=null===(h=t.compass)||void 0===h?void 0:h.north)||void 0===p?void 0:p.dynamic_style,t),show:Ce(null===(f=null===(g=t.compass)||void 0===g?void 0:g.north)||void 0===f?void 0:f.show,!1)}}}(this._config,this.colors),this.indicator_sensors=Oe(this._config,this.colors),this.value_sensors=ke(this._config,this.colors),this._config.debug&&Ce(this._config.debug,!1)&&(console.info("header",this.header),console.info("compass",this.compass),console.info("indicator sensors",this.indicator_sensors),console.info("value sensors",this.value_sensors)))}entityChanged(t,e){if(e){const i=t.get("hass");if((null==i?void 0:i.states[e])!==this._hass.states[e])return!0}return!1}render(){return this._config&&this._hass?A`
      <ha-card tabindex="0" aria-label=${"Compass: "+this.header.label} class="flex compass-card" @click=${t=>this.handlePopup(t)}>
        ${this.header.title.show||this.header.icon.show?this.renderHeader():""}
        <div class="content">
          <div class="compass">${this.svgCompass(this.compass.north.offset)}</div>
          <div class="indicator-sensors">${this.renderDirections()}</div>
          <div class="value-sensors">${this.renderValues()}</div>
        </div>
      </ha-card>
    `:A``}renderHeader(){return A`
      <div class="header">
        <div class="name" style="color:${this.header.title.color};">${this.header.title.show?this.renderTitle():A`<span>&nbsp;</span>`}</div>
        <div class="icon" style="color:${this.header.icon.color};">${this.header.icon.show?this.renderIcon():A`<span>&nbsp;</span>`}</div>
      </div>
    `}renderTitle(){return A`<span>${this.header.title.value} </span>`}renderIcon(){return A`<ha-icon .icon=${this.header.icon.value}></ha-icon>`}renderDirections(){const t=[];let e=0;return this.indicator_sensors.forEach(i=>{(i.state_abbreviation.show||i.state_value.show)&&(t.push(A`<div class="sensor-${e}">
          <span class="abbr" style="color: ${i.state_abbreviation.color};">${i.state_abbreviation.show?this.computeIndicator(i).abbreviation:""}</span>
          <span class="value" style="color: ${i.state_value.color};">${i.state_value.show?this.computeIndicator(i).degrees:""}</span>
          <span class="measurement" style="color: ${i.state_units.color}; ${i.state_units.show?"margin-left: -3px;":""}"
            >${i.state_units.show?"°":""}</span
          >
        </div>`),e++)}),t}renderValues(){const t=[];let e=0;return this.value_sensors.forEach(i=>{i.state_value.show&&(t.push(A`<div class="sensor-${e}">
          <span class="value" style="color: ${i.state_value.color};">${i.state_value.show?this.getValue(i).value:""}</span>
          <span class="measurement" style="color: ${i.state_units.color}; ${i.state_units.show?"margin-left: -3px;":""}"
            >${i.state_units.show?this.getValue(i).units:""}</span
          >
        </div>`),e++)}),t}svgCompass(t){return I`
    <svg height="152" width="152">
      ${this.compass.circle.show?this.svgCircle():""}
        <g class="indicators" transform="rotate(${t},76,76)" stroke-width=".5">
          ${this.compass.north.show?this.svgIndicatorNorth():""}
          ${this.svgIndicators()}
        </g>
    </svg>
    `}svgCircle(){return I`<circle class="circle" cx="76" cy="76" r="62" stroke="${this.compass.circle.color}" stroke-width="2" fill="white" fill-opacity="0.0" stroke-opacity="1.0" />`}svgIndicators(){const t=[];return this.indicator_sensors.forEach(e=>{e.indicator.show&&t.push(this.svgSingleIndicator(e))}),t}svgIndicator(t){switch(t.indicator.type){case"arrow_outward":return this.svgIndicatorArrowOutward(t);case"circle":return this.svgIndicatorCircle(t)}return this.svgIndicatorArrowInward(t)}svgSingleIndicator(t){const e=this.svgIndicator(t),{degrees:i}=this.computeIndicator(t);return I`
      <g class="indicator" transform="rotate(${i},76,76)">
        ${e}
      </g>
    `}svgIndicatorArrowOutward(t){return I`
      <g class="arrow-outward">
        <path d="M76 0v23l-8 7z" fill="${t.indicator.color}" stroke="${t.indicator.color}" stroke-width=".5"/>
        <path d="M76 0v23l8 7z" fill="${t.indicator.color}" stroke="${t.indicator.color}" stroke-width="0"/>
        <path d="M76 0v23l8 7z" fill="white" opacity="0.5" stroke="white" stroke-width=".5"/>
      </g>
    `}svgIndicatorArrowInward(t){return I`
      <g class="arrow-inward">
        <path d="M76 30.664v-23l-8-7z" fill="${t.indicator.color}" stroke="${t.indicator.color}" stroke-width=".5" />
        <path d="M76 30.664v-23l8-7z" fill="${t.indicator.color}" stroke="${t.indicator.color}" stroke-width="0" />
        <path d="M76 30.664v-23l8-7z" fill="white" opacity="0.5" stroke="white" stroke-width=".5" />
      </g>
    `}svgIndicatorCircle(t){return I`
      <g class="circle">
        <path d="m76 5.8262a9.1809 9.1809 0 0 0-0.0244 0 9.1809 9.1809 0 0 0-9.1813 9.18 9.1809 9.1809 0 0 0 9.1813 9.1813 9.1809 9.1809 0 0 0 0.0244 0z" fill="${t.indicator.color}"/>
        <path d="m76 5.8262v18.361a9.1809 9.1809 0 0 0 9.1556-9.1813 9.1809 9.1809 0 0 0-9.1556-9.18z" fill="${t.indicator.color}"/>
        <path d="m76 5.8262v18.361a9.1809 9.1809 0 0 0 9.1556-9.1813 9.1809 9.1809 0 0 0-9.1556-9.18z" fill="white" opacity="0.5"/>
      </g>
    `}svgIndicatorNorth(){return I`
      <g class="north">
        <text x="76" y="10.089" font-family="sans-serif" font-size="13.333" text-anchor="middle" fill="${this.compass.north.color}">
          <tspan x="76" y="11">${ye("directions.N","","",this._config.language)}</tspan>
        </text>
      </g>
    `}getSecondaryEntity(t){return A` <span class="value">${t.state}</span> <span class="measurement">${t.attributes.unit_of_measurement}</span>`}getValue(t){var e;if(t.is_attribute){const e=t.sensor.slice(0,t.sensor.lastIndexOf(".")),i=this._hass.states[e];if(i&&i.attributes){const e=t.sensor.slice(t.sensor.lastIndexOf(".")+1);return{value:i.attributes[e]||Ne,units:""}}return{value:Ne,units:""}}return this._hass.states[t.sensor]?{value:this._hass.states[t.sensor].state,units:(null===(e=this._hass.states[t.sensor].attributes)||void 0===e?void 0:e.unit_of_measurement)||""}:{value:Ne,units:""}}handlePopup(t){t.stopPropagation(),this._config.tap_action&&((t,e,i,o)=>{let n;switch(o.action||"more-info"){case"more-info":n=new Event("hass-more-info",{composed:!0}),n.detail={entityId:o.entity||(null==i?void 0:i.tap_action)},t.dispatchEvent(n);break;case"navigate":if(!o.navigation_path)return;if(o.new_tab||void 0===o.new_tab){window.open(o.navigation_path,"_blank");break}window.history.pushState(null,"",o.navigation_path),n=new Event("location-changed",{composed:!0}),n.detail={replace:!1},window.dispatchEvent(n);break;case"call-service":{if(!o.service)return;const[t,i]=o.service.split(".",2),n=o.service_data?Object.assign({},JSON.parse(o.service_data)):"";e.callService(t,i,n);break}case"url":if(!o.url)return;if(o.new_tab||void 0===o.new_tab){window.open(o.url,"_blank");break}window.location.href=o.url;break;default:;}})(this,this._hass,this._config,this._config.tap_action)}computeIndicator(t){let e=0,i=ye("common.invalid");const o=this.getValue(t);if(Number.isNaN(Number(o.value))){if(e=Ve.getDegrees(o.value),i=o.value,-1===e){const t=o.value.replace(/\s+/g,"").match(/[+-]?\d+(\.\d)?/);e=(null==t?void 0:t.length)?Ve.positiveDegrees(parseFloat(t[0])):0,i=Ve.getCompassAbbreviation(e,this._config.language)}}else e=Ve.positiveDegrees(parseFloat(o.value)),i=Ve.getCompassAbbreviation(e,this._config.language);return{abbreviation:i,degrees:Math.round(e)}}static get styles(){return Me}static getDegrees(t){return we[t]?we[t]:-1}static getCompassAbbreviation(t,e){const i=Math.round(Ve.positiveDegrees(t)/22.5);let o="N";return i>15&&(o=be[0]),o=be[i],ye("directions."+o,"","",e)}static positiveDegrees(t){return t<0?t+360*(Math.abs(Math.ceil(t/360))+1):t%360}};t([G({attribute:!1})],$e.prototype,"_hass",void 0),t([G({attribute:!1})],$e.prototype,"_config",void 0),t([Q()],$e.prototype,"colors",void 0),t([Q()],$e.prototype,"header",void 0),t([Q()],$e.prototype,"compass",void 0),t([Q()],$e.prototype,"indicator_sensors",void 0),t([Q()],$e.prototype,"value_sensors",void 0),$e=Ve=t([K("compass-card")],$e);export{$e as CompassCard};
