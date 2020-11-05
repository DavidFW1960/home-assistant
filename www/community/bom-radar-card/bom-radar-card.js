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
function e(e,t,n,r){var i,a=arguments.length,o=a<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(a<3?i(o):a>3?i(t,n,o):i(t,n))||o);return a>3&&o&&Object.defineProperty(t,n,o),o
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
 */}const t="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,n=(e,t,n=null)=>{for(;t!==n;){const n=t.nextSibling;e.removeChild(t),t=n}},r=`{{lit-${String(Math.random()).slice(2)}}}`,i=`\x3c!--${r}--\x3e`,a=new RegExp(`${r}|${i}`);class o{constructor(e,t){this.parts=[],this.element=t;const n=[],i=[],o=document.createTreeWalker(t.content,133,null,!1);let l=0,u=-1,p=0;const{strings:h,values:{length:m}}=e;for(;p<m;){const e=o.nextNode();if(null!==e){if(u++,1===e.nodeType){if(e.hasAttributes()){const t=e.attributes,{length:n}=t;let r=0;for(let e=0;e<n;e++)s(t[e].name,"$lit$")&&r++;for(;r-- >0;){const t=h[p],n=d.exec(t)[2],r=n.toLowerCase()+"$lit$",i=e.getAttribute(r);e.removeAttribute(r);const o=i.split(a);this.parts.push({type:"attribute",index:u,name:n,strings:o}),p+=o.length-1}}"TEMPLATE"===e.tagName&&(i.push(e),o.currentNode=e.content)}else if(3===e.nodeType){const t=e.data;if(t.indexOf(r)>=0){const r=e.parentNode,i=t.split(a),o=i.length-1;for(let t=0;t<o;t++){let n,a=i[t];if(""===a)n=c();else{const e=d.exec(a);null!==e&&s(e[2],"$lit$")&&(a=a.slice(0,e.index)+e[1]+e[2].slice(0,-"$lit$".length)+e[3]),n=document.createTextNode(a)}r.insertBefore(n,e),this.parts.push({type:"node",index:++u})}""===i[o]?(r.insertBefore(c(),e),n.push(e)):e.data=i[o],p+=o}}else if(8===e.nodeType)if(e.data===r){const t=e.parentNode;null!==e.previousSibling&&u!==l||(u++,t.insertBefore(c(),e)),l=u,this.parts.push({type:"node",index:u}),null===e.nextSibling?e.data="":(n.push(e),u--),p++}else{let t=-1;for(;-1!==(t=e.data.indexOf(r,t+1));)this.parts.push({type:"node",index:-1}),p++}}else o.currentNode=i.pop()}for(const e of n)e.parentNode.removeChild(e)}}const s=(e,t)=>{const n=e.length-t.length;return n>=0&&e.slice(n)===t},l=e=>-1!==e.index,c=()=>document.createComment(""),d=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;function u(e,t){const{element:{content:n},parts:r}=e,i=document.createTreeWalker(n,133,null,!1);let a=h(r),o=r[a],s=-1,l=0;const c=[];let d=null;for(;i.nextNode();){s++;const e=i.currentNode;for(e.previousSibling===d&&(d=null),t.has(e)&&(c.push(e),null===d&&(d=e)),null!==d&&l++;void 0!==o&&o.index===s;)o.index=null!==d?-1:o.index-l,a=h(r,a),o=r[a]}c.forEach(e=>e.parentNode.removeChild(e))}const p=e=>{let t=11===e.nodeType?0:1;const n=document.createTreeWalker(e,133,null,!1);for(;n.nextNode();)t++;return t},h=(e,t=-1)=>{for(let n=t+1;n<e.length;n++){const t=e[n];if(l(t))return n}return-1};
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
const m=new WeakMap,g=e=>"function"==typeof e&&m.has(e),f={},_={};
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
class y{constructor(e,t,n){this.__parts=[],this.template=e,this.processor=t,this.options=n}update(e){let t=0;for(const n of this.__parts)void 0!==n&&n.setValue(e[t]),t++;for(const e of this.__parts)void 0!==e&&e.commit()}_clone(){const e=t?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),n=[],r=this.template.parts,i=document.createTreeWalker(e,133,null,!1);let a,o=0,s=0,c=i.nextNode();for(;o<r.length;)if(a=r[o],l(a)){for(;s<a.index;)s++,"TEMPLATE"===c.nodeName&&(n.push(c),i.currentNode=c.content),null===(c=i.nextNode())&&(i.currentNode=n.pop(),c=i.nextNode());if("node"===a.type){const e=this.processor.handleTextExpression(this.options);e.insertAfterNode(c.previousSibling),this.__parts.push(e)}else this.__parts.push(...this.processor.handleAttributeExpressions(c,a.name,a.strings,this.options));o++}else this.__parts.push(void 0),o++;return t&&(document.adoptNode(e),customElements.upgrade(e)),e}}
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
 */const v=window.trustedTypes&&trustedTypes.createPolicy("lit-html",{createHTML:e=>e}),b=` ${r} `;class S{constructor(e,t,n,r){this.strings=e,this.values=t,this.type=n,this.processor=r}getHTML(){const e=this.strings.length-1;let t="",n=!1;for(let a=0;a<e;a++){const e=this.strings[a],o=e.lastIndexOf("\x3c!--");n=(o>-1||n)&&-1===e.indexOf("--\x3e",o+1);const s=d.exec(e);t+=null===s?e+(n?b:i):e.substr(0,s.index)+s[1]+s[2]+"$lit$"+s[3]+r}return t+=this.strings[e],t}getTemplateElement(){const e=document.createElement("template");let t=this.getHTML();return void 0!==v&&(t=v.createHTML(t)),e.innerHTML=t,e}}
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
 */const w=e=>null===e||!("object"==typeof e||"function"==typeof e),x=e=>Array.isArray(e)||!(!e||!e[Symbol.iterator]);class C{constructor(e,t,n){this.dirty=!0,this.element=e,this.name=t,this.strings=n,this.parts=[];for(let e=0;e<n.length-1;e++)this.parts[e]=this._createPart()}_createPart(){return new k(this)}_getValue(){const e=this.strings,t=e.length-1,n=this.parts;if(1===t&&""===e[0]&&""===e[1]){const e=n[0].value;if("symbol"==typeof e)return String(e);if("string"==typeof e||!x(e))return e}let r="";for(let i=0;i<t;i++){r+=e[i];const t=n[i];if(void 0!==t){const e=t.value;if(w(e)||!x(e))r+="string"==typeof e?e:String(e);else for(const t of e)r+="string"==typeof t?t:String(t)}}return r+=e[t],r}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class k{constructor(e){this.value=void 0,this.committer=e}setValue(e){e===f||w(e)&&e===this.value||(this.value=e,g(e)||(this.committer.dirty=!0))}commit(){for(;g(this.value);){const e=this.value;this.value=f,e(this)}this.value!==f&&this.committer.commit()}}class T{constructor(e){this.value=void 0,this.__pendingValue=void 0,this.options=e}appendInto(e){this.startNode=e.appendChild(c()),this.endNode=e.appendChild(c())}insertAfterNode(e){this.startNode=e,this.endNode=e.nextSibling}appendIntoPart(e){e.__insert(this.startNode=c()),e.__insert(this.endNode=c())}insertAfterPart(e){e.__insert(this.startNode=c()),this.endNode=e.endNode,e.endNode=this.startNode}setValue(e){this.__pendingValue=e}commit(){if(null===this.startNode.parentNode)return;for(;g(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=f,e(this)}const e=this.__pendingValue;e!==f&&(w(e)?e!==this.value&&this.__commitText(e):e instanceof S?this.__commitTemplateResult(e):e instanceof Node?this.__commitNode(e):x(e)?this.__commitIterable(e):e===_?(this.value=_,this.clear()):this.__commitText(e))}__insert(e){this.endNode.parentNode.insertBefore(e,this.endNode)}__commitNode(e){this.value!==e&&(this.clear(),this.__insert(e),this.value=e)}__commitText(e){const t=this.startNode.nextSibling,n="string"==typeof(e=null==e?"":e)?e:String(e);t===this.endNode.previousSibling&&3===t.nodeType?t.data=n:this.__commitNode(document.createTextNode(n)),this.value=e}__commitTemplateResult(e){const t=this.options.templateFactory(e);if(this.value instanceof y&&this.value.template===t)this.value.update(e.values);else{const n=new y(t,e.processor,this.options),r=n._clone();n.update(e.values),this.__commitNode(r),this.value=n}}__commitIterable(e){Array.isArray(this.value)||(this.value=[],this.clear());const t=this.value;let n,r=0;for(const i of e)n=t[r],void 0===n&&(n=new T(this.options),t.push(n),0===r?n.appendIntoPart(this):n.insertAfterPart(t[r-1])),n.setValue(i),n.commit(),r++;r<t.length&&(t.length=r,this.clear(n&&n.endNode))}clear(e=this.startNode){n(this.startNode.parentNode,e.nextSibling,this.endNode)}}class M{constructor(e,t,n){if(this.value=void 0,this.__pendingValue=void 0,2!==n.length||""!==n[0]||""!==n[1])throw new Error("Boolean attributes can only contain a single expression");this.element=e,this.name=t,this.strings=n}setValue(e){this.__pendingValue=e}commit(){for(;g(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=f,e(this)}if(this.__pendingValue===f)return;const e=!!this.__pendingValue;this.value!==e&&(e?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=e),this.__pendingValue=f}}class P extends C{constructor(e,t,n){super(e,t,n),this.single=2===n.length&&""===n[0]&&""===n[1]}_createPart(){return new N(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class N extends k{}let A=!1;(()=>{try{const e={get capture(){return A=!0,!1}};window.addEventListener("test",e,e),window.removeEventListener("test",e,e)}catch(e){}})();class E{constructor(e,t,n){this.value=void 0,this.__pendingValue=void 0,this.element=e,this.eventName=t,this.eventContext=n,this.__boundHandleEvent=e=>this.handleEvent(e)}setValue(e){this.__pendingValue=e}commit(){for(;g(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=f,e(this)}if(this.__pendingValue===f)return;const e=this.__pendingValue,t=this.value,n=null==e||null!=t&&(e.capture!==t.capture||e.once!==t.once||e.passive!==t.passive),r=null!=e&&(null==t||n);n&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),r&&(this.__options=L(e),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=e,this.__pendingValue=f}handleEvent(e){"function"==typeof this.value?this.value.call(this.eventContext||this.element,e):this.value.handleEvent(e)}}const L=e=>e&&(A?{capture:e.capture,passive:e.passive,once:e.once}:e.capture)
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
 */;function O(e){let t=R.get(e.type);void 0===t&&(t={stringsArray:new WeakMap,keyString:new Map},R.set(e.type,t));let n=t.stringsArray.get(e.strings);if(void 0!==n)return n;const i=e.strings.join(r);return n=t.keyString.get(i),void 0===n&&(n=new o(e,e.getTemplateElement()),t.keyString.set(i,n)),t.stringsArray.set(e.strings,n),n}const R=new Map,$=new WeakMap;
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
class{handleAttributeExpressions(e,t,n,r){const i=t[0];if("."===i){return new P(e,t.slice(1),n).parts}if("@"===i)return[new E(e,t.slice(1),r.eventContext)];if("?"===i)return[new M(e,t.slice(1),n)];return new C(e,t,n).parts}handleTextExpression(e){return new T(e)}};
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
 */"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.3.0");const I=(e,...t)=>new S(e,t,"html",D)
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
 */,z=(e,t)=>`${e}--${t}`;let U=!0;void 0===window.ShadyCSS?U=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),U=!1);const V=e=>t=>{const n=z(t.type,e);let i=R.get(n);void 0===i&&(i={stringsArray:new WeakMap,keyString:new Map},R.set(n,i));let a=i.stringsArray.get(t.strings);if(void 0!==a)return a;const s=t.strings.join(r);if(a=i.keyString.get(s),void 0===a){const n=t.getTemplateElement();U&&window.ShadyCSS.prepareTemplateDom(n,e),a=new o(t,n),i.keyString.set(s,a)}return i.stringsArray.set(t.strings,a),a},H=["html","svg"],B=new Set,Y=(e,t,n)=>{B.add(e);const r=n?n.element:document.createElement("template"),i=t.querySelectorAll("style"),{length:a}=i;if(0===a)return void window.ShadyCSS.prepareTemplateStyles(r,e);const o=document.createElement("style");for(let e=0;e<a;e++){const t=i[e];t.parentNode.removeChild(t),o.textContent+=t.textContent}(e=>{H.forEach(t=>{const n=R.get(z(t,e));void 0!==n&&n.keyString.forEach(e=>{const{element:{content:t}}=e,n=new Set;Array.from(t.querySelectorAll("style")).forEach(e=>{n.add(e)}),u(e,n)})})})(e);const s=r.content;n?function(e,t,n=null){const{element:{content:r},parts:i}=e;if(null==n)return void r.appendChild(t);const a=document.createTreeWalker(r,133,null,!1);let o=h(i),s=0,l=-1;for(;a.nextNode();){l++;for(a.currentNode===n&&(s=p(t),n.parentNode.insertBefore(t,n));-1!==o&&i[o].index===l;){if(s>0){for(;-1!==o;)i[o].index+=s,o=h(i,o);return}o=h(i,o)}}}(n,o,s.firstChild):s.insertBefore(o,s.firstChild),window.ShadyCSS.prepareTemplateStyles(r,e);const l=s.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==l)t.insertBefore(l.cloneNode(!0),t.firstChild);else if(n){s.insertBefore(o,s.firstChild);const e=new Set;e.add(o),u(n,e)}};window.JSCompiler_renameProperty=(e,t)=>e;const j={toAttribute(e,t){switch(t){case Boolean:return e?"":null;case Object:case Array:return null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){switch(t){case Boolean:return null!==e;case Number:return null===e?null:Number(e);case Object:case Array:return JSON.parse(e)}return e}},F=(e,t)=>t!==e&&(t==t||e==e),W={attribute:!0,type:String,converter:j,reflect:!1,hasChanged:F};class Z extends HTMLElement{constructor(){super(),this.initialize()}static get observedAttributes(){this.finalize();const e=[];return this._classProperties.forEach((t,n)=>{const r=this._attributeNameForProperty(n,t);void 0!==r&&(this._attributeToPropertyMap.set(r,n),e.push(r))}),e}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const e=Object.getPrototypeOf(this)._classProperties;void 0!==e&&e.forEach((e,t)=>this._classProperties.set(t,e))}}static createProperty(e,t=W){if(this._ensureClassProperties(),this._classProperties.set(e,t),t.noAccessor||this.prototype.hasOwnProperty(e))return;const n="symbol"==typeof e?Symbol():"__"+e,r=this.getPropertyDescriptor(e,n,t);void 0!==r&&Object.defineProperty(this.prototype,e,r)}static getPropertyDescriptor(e,t,n){return{get(){return this[t]},set(r){const i=this[e];this[t]=r,this.requestUpdateInternal(e,i,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this._classProperties&&this._classProperties.get(e)||W}static finalize(){const e=Object.getPrototypeOf(this);if(e.hasOwnProperty("finalized")||e.finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const e=this.properties,t=[...Object.getOwnPropertyNames(e),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(e):[]];for(const n of t)this.createProperty(n,e[n])}}static _attributeNameForProperty(e,t){const n=t.attribute;return!1===n?void 0:"string"==typeof n?n:"string"==typeof e?e.toLowerCase():void 0}static _valueHasChanged(e,t,n=F){return n(e,t)}static _propertyValueFromAttribute(e,t){const n=t.type,r=t.converter||j,i="function"==typeof r?r:r.fromAttribute;return i?i(e,n):e}static _propertyValueToAttribute(e,t){if(void 0===t.reflect)return;const n=t.type,r=t.converter;return(r&&r.toAttribute||j.toAttribute)(e,n)}initialize(){this._updateState=0,this._updatePromise=new Promise(e=>this._enableUpdatingResolver=e),this._changedProperties=new Map,this._saveInstanceProperties(),this.requestUpdateInternal()}_saveInstanceProperties(){this.constructor._classProperties.forEach((e,t)=>{if(this.hasOwnProperty(t)){const e=this[t];delete this[t],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(t,e)}})}_applyInstanceProperties(){this._instanceProperties.forEach((e,t)=>this[t]=e),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){void 0!==this._enableUpdatingResolver&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(e,t,n){t!==n&&this._attributeToProperty(e,n)}_propertyToAttribute(e,t,n=W){const r=this.constructor,i=r._attributeNameForProperty(e,n);if(void 0!==i){const e=r._propertyValueToAttribute(t,n);if(void 0===e)return;this._updateState=8|this._updateState,null==e?this.removeAttribute(i):this.setAttribute(i,e),this._updateState=-9&this._updateState}}_attributeToProperty(e,t){if(8&this._updateState)return;const n=this.constructor,r=n._attributeToPropertyMap.get(e);if(void 0!==r){const e=n.getPropertyOptions(r);this._updateState=16|this._updateState,this[r]=n._propertyValueFromAttribute(t,e),this._updateState=-17&this._updateState}}requestUpdateInternal(e,t,n){let r=!0;if(void 0!==e){const i=this.constructor;n=n||i.getPropertyOptions(e),i._valueHasChanged(this[e],t,n.hasChanged)?(this._changedProperties.has(e)||this._changedProperties.set(e,t),!0!==n.reflect||16&this._updateState||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(e,n))):r=!1}!this._hasRequestedUpdate&&r&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(e,t){return this.requestUpdateInternal(e,t),this.updateComplete}async _enqueueUpdate(){this._updateState=4|this._updateState;try{await this._updatePromise}catch(e){}const e=this.performUpdate();return null!=e&&await e,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return 4&this._updateState}get hasUpdated(){return 1&this._updateState}performUpdate(){if(!this._hasRequestedUpdate)return;this._instanceProperties&&this._applyInstanceProperties();let e=!1;const t=this._changedProperties;try{e=this.shouldUpdate(t),e?this.update(t):this._markUpdated()}catch(t){throw e=!1,this._markUpdated(),t}e&&(1&this._updateState||(this._updateState=1|this._updateState,this.firstUpdated(t)),this.updated(t))}_markUpdated(){this._changedProperties=new Map,this._updateState=-5&this._updateState}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this._updatePromise}shouldUpdate(e){return!0}update(e){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach((e,t)=>this._propertyToAttribute(t,this[t],e)),this._reflectingProperties=void 0),this._markUpdated()}updated(e){}firstUpdated(e){}}Z.finalized=!0;
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
const q=e=>t=>"function"==typeof t?((e,t)=>(window.customElements.define(e,t),t))(e,t):((e,t)=>{const{kind:n,elements:r}=t;return{kind:n,elements:r,finisher(t){window.customElements.define(e,t)}}})(e,t),J=(e,t)=>"method"===t.kind&&t.descriptor&&!("value"in t.descriptor)?Object.assign(Object.assign({},t),{finisher(n){n.createProperty(t.key,e)}}):{kind:"field",key:Symbol(),placement:"own",descriptor:{},initializer(){"function"==typeof t.initializer&&(this[t.key]=t.initializer.call(this))},finisher(n){n.createProperty(t.key,e)}};function G(e){return(t,n)=>void 0!==n?((e,t,n)=>{t.constructor.createProperty(n,e)})(e,t,n):J(e,t)}
/**
@license
Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/const K=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Q=Symbol();class X{constructor(e,t){if(t!==Q)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e}get styleSheet(){return void 0===this._styleSheet&&(K?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const ee=(e,...t)=>{const n=t.reduce((t,n,r)=>t+(e=>{if(e instanceof X)return e.cssText;if("number"==typeof e)return e;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${e}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(n)+e[r+1],e[0]);return new X(n,Q)};
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
(window.litElementVersions||(window.litElementVersions=[])).push("2.4.0");const te={};class ne extends Z{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const e=this.getStyles();if(Array.isArray(e)){const t=(e,n)=>e.reduceRight((e,n)=>Array.isArray(n)?t(n,e):(e.add(n),e),n),n=t(e,new Set),r=[];n.forEach(e=>r.unshift(e)),this._styles=r}else this._styles=void 0===e?[]:[e];this._styles=this._styles.map(e=>{if(e instanceof CSSStyleSheet&&!K){const t=Array.prototype.slice.call(e.cssRules).reduce((e,t)=>e+t.cssText,"");return new X(String(t),Q)}return e})}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const e=this.constructor._styles;0!==e.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?K?this.renderRoot.adoptedStyleSheets=e.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(e.map(e=>e.cssText),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(e){const t=this.render();super.update(e),t!==te&&this.constructor.render(t,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach(e=>{const t=document.createElement("style");t.textContent=e.cssText,this.renderRoot.appendChild(t)}))}render(){return te}}ne.finalized=!0,ne.render=(e,t,r)=>{if(!r||"object"!=typeof r||!r.scopeName)throw new Error("The `scopeName` option is required.");const i=r.scopeName,a=$.has(t),o=U&&11===t.nodeType&&!!t.host,s=o&&!B.has(i),l=s?document.createDocumentFragment():t;if(((e,t,r)=>{let i=$.get(t);void 0===i&&(n(t,t.firstChild),$.set(t,i=new T(Object.assign({templateFactory:O},r))),i.appendInto(t)),i.setValue(e),i.commit()})(e,l,Object.assign({templateFactory:V(i)},r)),s){const e=$.get(l);$.delete(l);const r=e.value instanceof y?e.value.template:void 0;Y(i,l,r),n(t,t.firstChild),t.appendChild(l),$.set(t,e)}!a&&o&&window.ShadyCSS.styleElement(t.host)};var re=/d{1,4}|M{1,4}|YY(?:YY)?|S{1,3}|Do|ZZ|Z|([HhMsDm])\1?|[aA]|"[^"]*"|'[^']*'/g,ie="[^\\s]+",ae=/\[([^]*?)\]/gm;function oe(e,t){for(var n=[],r=0,i=e.length;r<i;r++)n.push(e[r].substr(0,t));return n}var se=function(e){return function(t,n){var r=n[e].map((function(e){return e.toLowerCase()})).indexOf(t.toLowerCase());return r>-1?r:null}};function le(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];for(var r=0,i=t;r<i.length;r++){var a=i[r];for(var o in a)e[o]=a[o]}return e}var ce=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],de=["January","February","March","April","May","June","July","August","September","October","November","December"],ue=oe(de,3),pe={dayNamesShort:oe(ce,3),dayNames:ce,monthNamesShort:ue,monthNames:de,amPm:["am","pm"],DoFn:function(e){return e+["th","st","nd","rd"][e%10>3?0:(e-e%10!=10?1:0)*e%10]}},he=le({},pe),me=function(e,t){for(void 0===t&&(t=2),e=String(e);e.length<t;)e="0"+e;return e},ge={D:function(e){return String(e.getDate())},DD:function(e){return me(e.getDate())},Do:function(e,t){return t.DoFn(e.getDate())},d:function(e){return String(e.getDay())},dd:function(e){return me(e.getDay())},ddd:function(e,t){return t.dayNamesShort[e.getDay()]},dddd:function(e,t){return t.dayNames[e.getDay()]},M:function(e){return String(e.getMonth()+1)},MM:function(e){return me(e.getMonth()+1)},MMM:function(e,t){return t.monthNamesShort[e.getMonth()]},MMMM:function(e,t){return t.monthNames[e.getMonth()]},YY:function(e){return me(String(e.getFullYear()),4).substr(2)},YYYY:function(e){return me(e.getFullYear(),4)},h:function(e){return String(e.getHours()%12||12)},hh:function(e){return me(e.getHours()%12||12)},H:function(e){return String(e.getHours())},HH:function(e){return me(e.getHours())},m:function(e){return String(e.getMinutes())},mm:function(e){return me(e.getMinutes())},s:function(e){return String(e.getSeconds())},ss:function(e){return me(e.getSeconds())},S:function(e){return String(Math.round(e.getMilliseconds()/100))},SS:function(e){return me(Math.round(e.getMilliseconds()/10),2)},SSS:function(e){return me(e.getMilliseconds(),3)},a:function(e,t){return e.getHours()<12?t.amPm[0]:t.amPm[1]},A:function(e,t){return e.getHours()<12?t.amPm[0].toUpperCase():t.amPm[1].toUpperCase()},ZZ:function(e){var t=e.getTimezoneOffset();return(t>0?"-":"+")+me(100*Math.floor(Math.abs(t)/60)+Math.abs(t)%60,4)},Z:function(e){var t=e.getTimezoneOffset();return(t>0?"-":"+")+me(Math.floor(Math.abs(t)/60),2)+":"+me(Math.abs(t)%60,2)}},fe=function(e){return+e-1},_e=[null,"[1-9]\\d?"],ye=[null,ie],ve=["isPm",ie,function(e,t){var n=e.toLowerCase();return n===t.amPm[0]?0:n===t.amPm[1]?1:null}],be=["timezoneOffset","[^\\s]*?[\\+\\-]\\d\\d:?\\d\\d|[^\\s]*?Z?",function(e){var t=(e+"").match(/([+-]|\d\d)/gi);if(t){var n=60*+t[1]+parseInt(t[2],10);return"+"===t[0]?n:-n}return 0}],Se=(se("monthNamesShort"),se("monthNames"),{default:"ddd MMM DD YYYY HH:mm:ss",shortDate:"M/D/YY",mediumDate:"MMM D, YYYY",longDate:"MMMM D, YYYY",fullDate:"dddd, MMMM D, YYYY",isoDate:"YYYY-MM-DD",isoDateTime:"YYYY-MM-DDTHH:mm:ssZ",shortTime:"HH:mm",mediumTime:"HH:mm:ss",longTime:"HH:mm:ss.SSS"});var we=function(e,t,n){if(void 0===t&&(t=Se.default),void 0===n&&(n={}),"number"==typeof e&&(e=new Date(e)),"[object Date]"!==Object.prototype.toString.call(e)||isNaN(e.getTime()))throw new Error("Invalid Date pass to format");var r=[];t=(t=Se[t]||t).replace(ae,(function(e,t){return r.push(t),"@@@"}));var i=le(le({},he),n);return(t=t.replace(re,(function(t){return ge[t](e,i)}))).replace(/@@@/g,(function(){return r.shift()}))},xe=(function(){try{(new Date).toLocaleDateString("i")}catch(e){return"RangeError"===e.name}}(),function(){try{(new Date).toLocaleString("i")}catch(e){return"RangeError"===e.name}}(),function(){try{(new Date).toLocaleTimeString("i")}catch(e){return"RangeError"===e.name}}(),function(e,t,n,r){r=r||{},n=null==n?{}:n;var i=new Event(t,{bubbles:void 0===r.bubbles||r.bubbles,cancelable:Boolean(r.cancelable),composed:void 0===r.composed||r.composed});return i.detail=n,e.dispatchEvent(i),i});let Ce=class extends ne{setConfig(e){this._config=e}get _name(){return this._config&&this._config.name||""}get _entity(){return this._config&&this._config.entity||""}get _show_warning(){return this._config&&this._config.show_warning||!1}get _show_error(){return this._config&&this._config.show_error||!1}render(){if(!this.hass)return I``;let e;return e=this._config,I`
      <div class="values">
        <paper-dropdown-menu
          label="Map Style (optional)"
          .value=${e.map_style?e.map_style:""}
          editable
          .configAttribute=${"map_style"}
          .configObject=${e}
          @value-changed=${this._valueChangedString}
          ><paper-listbox
            slot="dropdown-content"
            attr-for-selected="item-name"
            selected="${e.map_style?e.map_style:""}"
          >
            <paper-item item-name="Light">Light</paper-item>
            <paper-item item-name="Voyager">Voyager</paper-item>
            <paper-item item-name="Satellite">Satellite</paper-item>
            <paper-item item-name="Dark">Dark</paper-item>
          </paper-listbox></paper-dropdown-menu
        >
        <paper-dropdown-menu
          label="Zoom Level (optional)"
          .value=${e.zoom_level?e.zoom_level:null}
          editable
          .configAttribute=${"zoom_level"}
          .configObject=${e}
          @value-changed=${this._valueChangedNumber}
          ><paper-listbox
            slot="dropdown-content"
            attr-for-selected="item-name"
            selected="${e.zoom_level?e.zoom_level:null}"
          >
            <paper-item item-name="4">4</paper-item>
            <paper-item item-name="5">5</paper-item>
            <paper-item item-name="6">6</paper-item>
            <paper-item item-name="7">7</paper-item>
            <paper-item item-name="8">8</paper-item>
            <paper-item item-name="9">9</paper-item>
            <paper-item item-name="10">10</paper-item>
          </paper-listbox></paper-dropdown-menu
        >
        <paper-input
          label="Map Centre Latitude (optional)"
          .value=${e.center_latitude?e.center_latitude:""}
          editable
          .configAttribute=${"center_latitude"}
          .configObject=${e}
          @value-changed=${this._valueChangedNumber}
        ></paper-input>
        <paper-input
          label="Map Centre Longitude (optional)"
          .value=${e.center_longitude?e.center_longitude:""}
          editable
          .configAttribute=${"center_longitude"}
          .configObject=${e}
          @value-changed=${this._valueChangedNumber}
        ></paper-input>
        <paper-input
          label="Marker Latitude (optional)"
          .value=${e.marker_latitude?e.marker_latitude:""}
          editable
          .configAttribute=${"marker_latitude"}
          .configObject=${e}
          @value-changed=${this._valueChangedNumber}
        ></paper-input>
        <paper-input
          label="Marker Longitude (optional)"
          .value=${e.marker_longitude?e.marker_longitude:""}
          editable
          .configAttribute=${"marker_longitude"}
          .configObject=${e}
          @value-changed=${this._valueChangedNumber}
        ></paper-input>
      </div>
    `}_valueChangedNumber(e){if(!this._config||!this.hass)return;const t=e.target;this["_"+t.configAttribute]!==t.value&&(t.configAttribute&&(""===t.value||null===t.value?delete this._config[t.configAttribute]:this._config=Object.assign(Object.assign({},this._config),{[t.configAttribute]:Number(t.value)})),xe(this,"config-changed",{config:this._config}))}_valueChangedString(e){if(!this._config||!this.hass)return;const t=e.target;this["_"+t.configAttribute]!==t.value&&(t.configAttribute&&(""===t.value?delete this._config[t.configAttribute]:this._config=Object.assign(Object.assign({},this._config),{[t.configAttribute]:t.value})),xe(this,"config-changed",{config:this._config}))}static get styles(){return ee`
      .option {
        padding: 4px 0px;
        cursor: pointer;
      }
      .row {
        display: flex;
        margin-bottom: -14px;
        pointer-events: none;
      }
      .title {
        padding-left: 16px;
        margin-top: -6px;
        pointer-events: none;
      }
      .secondary {
        padding-left: 40px;
        color: var(--secondary-text-color);
        pointer-events: none;
      }
      .values {
        padding-left: 16px;
        background: var(--secondary-background-color);
      }
      ha-switch {
        padding-bottom: 8px;
      }
    `}};e([G()],Ce.prototype,"hass",void 0),e([G()],Ce.prototype,"_config",void 0),Ce=e([q("bom-radar-card-editor")],Ce);var ke={version:"Version",invalid_configuration:"Invalid configuration",show_warning:"Show Warning"},Te={common:ke},Me={version:"Versjon",invalid_configuration:"Ikke gyldig konfiguration",show_warning:"Vis advarsel"},Pe={common:Me},Ne={en:Object.freeze({__proto__:null,common:ke,default:Te}),nb:Object.freeze({__proto__:null,common:Me,default:Pe})};function Ae(e,t="",n=""){const r=(localStorage.getItem("selectedLanguage")||"en").replace(/['"]+/g,"").replace("-","_");var i;try{i=e.split(".").reduce((e,t)=>e[t],Ne[r])}catch(t){i=e.split(".").reduce((e,t)=>e[t],Ne.en)}return void 0===i&&(i=e.split(".").reduce((e,t)=>e[t],Ne.en)),""!==t&&""!==n&&(i=i.replace(t,n)),i}console.info(`%c  BOM-RADAR-CARD \n%c  ${Ae("common.version")} 1.2.12    `,"color: orange; font-weight: bold; background: black","color: white; font-weight: bold; background: dimgray");let Ee=class extends ne{static async getConfigElement(){return document.createElement("bom-radar-card-editor")}static getStubConfig(){return{}}setConfig(e){this._config=e}getCardSize(){return 10}shouldUpdate(){return!0}render(){if(this._config.show_warning)return this.showWarning(Ae("common.show_warning"));console.log(this.baseURI);const e=`\n      <!DOCTYPE html>\n      <html>\n        <head>\n          <title>BOM Radar Card</title>\n          <meta charset="utf-8" />\n          <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n          <link rel="stylesheet" href="/local/community/bom-radar-card/leaflet.css"/>\n          <link rel="stylesheet" href="/hacsfiles/bom-radar-card/leaflet.toolbar.min.css"/>\n          <script src="/hacsfiles/bom-radar-card/leaflet.js"><\/script>\n          <script src="/hacsfiles/bom-radar-card/leaflet.toolbar.min.js"><\/script>\n          <style>\n            body {\n              margin: 0;\n              padding: 0;\n            }\n            .text-container {\n              font: 12px/1.5 'Helvetica Neue', Arial, Helvetica, sans-serif;\n              margin: 0px 2.5px 0px 10px;\n            }\n            .text-container-small {\n              font: 10px/1.5 'Helvetica Neue', Arial, Helvetica, sans-serif;\n              margin: 0px 10px 0px 2.5px;\n            }\n            .light-links a {\n              color: blue;\n            }\n            .dark-links a {\n              color: steelblue;\n            }\n            #timestamp {\n              margin: 0px 0px;\n            }\n            #color-bar {\n              margin: 0px 0px;\n            }\n          </style>\n        </head>\n        <body onload="resizeWindow()">\n          <span>\n            <div id="color-bar" style="height: 8px;">\n              <img id="img-color-bar" src="/hacsfiles/bom-radar-card/radar-colour-bar.png" height="8" style="vertical-align: top" />\n            </div>\n            <div id="mapid" style="height: 492px;"></div>\n            <div id="div-progress-bar" style="height: 8px; background-color: white;">\n              <div id="progress-bar" style="height:8px;width:0; background-color: #ccf2ff;"></div>\n            </div>\n            <div id="bottom-container" class="light-links" style="height: 18px; background-color: white;">\n              <div id="timestampid" class="text-container" style="width: 100px; height: 18px; float:left; position: absolute;">\n                <p id="timestamp"></p>\n              </div>\n              <div id="attribution" class="text-container-small" style="height: 18px; float:right;">\n                <span class="Map__Attribution-LjffR DKiFh" id="attribution"\n                  ></span\n                >\n              </div>\n            </div>\n            <script>\n              const radarLocations = [[-35.661387, 149.512229],[-33.700764, 151.209470],[-29.620633, 152.963328],[-29.496994, 149.850825],[-31.024219, 150.192037],[-32.729802, 152.025422],[-29.038524, 167.941679],[-35.158170, 147.456307],[-34.262389, 150.875099],[-37.855210, 144.755512],[-34.234354, 142.086133],[-37.887532, 147.575475],[-35.990000, 142.010000],[-36.029663, 146.022772],[-19.885737, 148.075693],[-27.717739, 153.240015],[-16.818145, 145.662895],[-23.549558, 148.239166],[-23.855056, 151.262567],[-25.957342, 152.576898],[-23.439783, 144.282270],[-21.117243, 149.217213],[-27.606344, 152.540084],[-16.670000, 139.170000],[-20.711204, 139.555281],[-19.419800, 146.550974],[-26.440193, 147.349130],[-12.666413, 141.924640],[-16.287199, 149.964539],[-34.617016, 138.468782],[-43.112593, 147.805241],[-41.179147, 145.579986],[-23.795064, 133.888935],[-12.455933, 130.926599],[-12.274995, 136.819911],[-14.510918, 132.447010],[-11.648500, 133.379977],[-34.941838, 117.816370],[-17.948234, 122.235334],[-24.887978, 113.669386],[-20.653613, 116.683144],[-31.777795, 117.952768],[-33.830150, 121.891734],[-28.804648, 114.697349],[-25.033225, 128.301756],[-30.784261, 121.454814],[-22.103197, 113.999698],[-33.096956, 119.008796],[-32.391761, 115.866955],[-20.371845, 118.631670],[-30.358887, 116.305769],[-15.451711, 128.120856],[-35.329531, 138.502498],[-32.129823, 133.696361],[-37.747713, 140.774605],[-31.155811, 136.804400],[-18.228916, 127.662836]];\n              const maxZoom = 10;\n              const minZoom = 4;\n              var zoomLevel = ${void 0!==this._config.zoom_level?this._config.zoom_level:4};\n              var centerLat = ${void 0!==this._config.center_latitude?this._config.center_latitude:-27.85};\n              var centerLon = ${void 0!==this._config.center_longitude?this._config.center_longitude:133.75};\n              var markerLat = (${this._config.marker_latitude}) ? ${this._config.marker_latitude} : centerLat;\n              var markerLon = (${this._config.marker_longitude}) ? ${this._config.marker_longitude} : centerLon;\n              var timeout = ${void 0!==this._config.frame_delay?this._config.frame_delay:500};\n              var frameCount = ${null!=this._config.frame_count?this._config.frame_count:10};\n              var barSize = this.frameElement.offsetWidth/frameCount;\n              var labelSize = ${void 0!==this._config.extra_labels?128:256};\n              var labelZoom = ${void 0!==this._config.extra_labels?1:0};\n              var locationRadius = '${void 0!==this._config.radar_location_radius?this._config.radar_location_radius:2}';\n              var locationLineColour = '${void 0!==this._config.radar_location_line_colour?this._config.radar_location_line_colour:"#00FF00"}';\n              var locationFillColour = '${void 0!==this._config.radar_location_fill_colour?this._config.radar_location_fill_colour:"#FF0000"}';\n              var map_style = '${void 0!==this._config.map_style?this._config.map_style.toLowerCase():"light"}';\n              switch (map_style) {\n                case "dark":\n                  var basemap_url = 'https://{s}.basemaps.cartocdn.com/{style}/{z}/{x}/{y}.png';\n                  var basemap_style = 'dark_nolabels';\n                  var label_url = 'https://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}.png';\n                  var label_style = 'dark_only_labels';\n                  var svg_icon = 'home-circle-light.svg';\n                  var attribution = '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attribution" target="_blank">CARTO</a>';\n                  break;\n                case "voyager":\n                  var basemap_url = 'https://{s}.basemaps.cartocdn.com/{style}/{z}/{x}/{y}.png';\n                  var basemap_style = 'rastertiles/voyager_nolabels';\n                  var label_url = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}.png';\n                  var label_style = 'rastertiles/voyager_only_labels';\n                  var svg_icon = 'home-circle-dark.svg';\n                  var attribution = '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attribution" target="_blank">CARTO</a>';\n                  break;\n                case 'satellite':\n                  var basemap_url = 'https://server.arcgisonline.com/ArcGIS/rest/services/{style}/MapServer/tile/{z}/{y}/{x}';\n                  var basemap_style = 'World_Imagery';\n                  var label_url = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}.png';\n                  var label_style = 'proton_labels_std';\n                  var svg_icon = 'home-circle-dark.svg';\n                  var attribution = '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors &copy; <a href="http://www.arcgis.com/home/item.html?id=10df2279f9684e4a9f6a7f08febac2a9" target="_blank">ESRI</a>';\n                  break;\n                case "light":\n                default:\n                  var basemap_url = 'https://{s}.basemaps.cartocdn.com/{style}/{z}/{x}/{y}.png';\n                  var basemap_style = 'light_nolabels';\n                  var label_url = 'https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png';\n                  var label_style = 'light_only_labels';\n                  var svg_icon = 'home-circle-dark.svg';\n                  var attribution = '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attribution" target="_blank">CARTO</a>';\n              }\n\n              var idx = 0;\n              var run = true;\n              var doRadarUpdate = false;\n              var radarMap = L.map('mapid', {\n                zoomControl: ${!0===this._config.show_zoom&&!0!==this._config.static_map?"true":"false"},\n                ${!0===this._config.static_map?"scrollWheelZoom: false,                 doubleClickZoom: false,                 boxZoom: false,                 dragging: false,                 keyboard: false,                 touchZoom: false,":""}\n                attributionControl: false,\n                minZoom: minZoom,\n                maxZoom: maxZoom,\n                maxBounds: [\n                  [0, 101.25],\n                  [-55.77657, 168.75],\n                ],\n                maxBoundsViscosity: 1.0,\n              }).setView([centerLat, centerLon], zoomLevel);\n              var radarImage = [];\n              var radarTime = [];\n              var weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];\n              var month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];\n              var d = new Date();\n              d.setTime(Math.trunc(d.valueOf() / 600000) * 600000 - frameCount * 600000);\n\n              document.getElementById("progress-bar").style.width = barSize+"px";\n              document.getElementById("attribution").innerHTML = attribution;\n\n              var t2actions = [];\n\n              if (${!0===this._config.show_recenter&&!0!==this._config.static_map}) {\n                var recenterAction = L.Toolbar2.Action.extend({\n                  options: {\n                      toolbarIcon: {\n                          html: '<img src="/hacsfiles/bom-radar-card/recenter.png" width="24" height="24">',\n                          tooltip: 'Re-center'\n                      }\n                  },\n\n                  addHooks: function () {\n                    radarMap.setView([centerLat, centerLon], zoomLevel);\n                  }\n                });\n                t2actions.push(recenterAction);\n              }\n\n              if (${!0===this._config.show_playback}) {\n                var playAction = L.Toolbar2.Action.extend({\n                  options: {\n                      toolbarIcon: {\n                          html: '<img id="playButton" src="/hacsfiles/bom-radar-card/pause.png" width="24" height="24">',\n                          tooltip: 'Pause'\n                      }\n                  },\n\n                  addHooks: function () {\n                    run = !run;\n                    if (run) {\n                      document.getElementById("playButton").src = "/hacsfiles/bom-radar-card/pause.png"\n                    } else {\n                      document.getElementById("playButton").src = "/hacsfiles/bom-radar-card/play.png"\n                    }\n                  }\n                });\n                t2actions.push(playAction);\n\n                var skipbackAction = L.Toolbar2.Action.extend({\n                  options: {\n                      toolbarIcon: {\n                          html: '<img src="/hacsfiles/bom-radar-card/skip-back.png" width="24" height="24">',\n                          tooltip: 'Previous Frame'\n                      }\n                  },\n\n                  addHooks: function () {\n                    skipBack();\n                  }\n                });\n                t2actions.push(skipbackAction);\n\n                var skipnextAction = L.Toolbar2.Action.extend({\n                  options: {\n                      toolbarIcon: {\n                          html: '<img src="/hacsfiles/bom-radar-card/skip-next.png" width="24" height="24">',\n                          tooltip: 'Next Frame'\n                      }\n                  },\n\n                  addHooks: function () {\n                    skipNext();\n                  }\n                });\n                t2actions.push(skipnextAction);\n              }\n\n              if (t2actions.length > 0) {\n                new L.Toolbar2.Control({\n                  position: 'bottomright',\n                  actions: t2actions\n                }).addTo(radarMap);\n              }\n\n              if (${!0===this._config.show_scale}) {\n                L.control.scale({\n                  position: 'bottomleft',\n                  metric: true,\n                  imperial: false,\n                  maxWidth: 100,\n                }).addTo(radarMap);\n\n                if ((map_style === "dark") || (map_style == "satellite")) {\n                  var scaleDiv = this.document.getElementsByClassName("leaflet-control-scale-line")[0];\n                  scaleDiv.style.color = "#BBB";\n                  scaleDiv.style.borderColor = "#BBB";\n                  scaleDiv.style.background = "#00000080";\n                }\n              }\n\n              if ((map_style === "dark") || (map_style == "satellite")) {\n                this.document.getElementById("div-progress-bar").style.background = "#1C1C1C";\n                this.document.getElementById("progress-bar").style.background = "steelblue";\n                this.document.getElementById("bottom-container").style.background = "#1C1C1C";\n                this.document.getElementById("bottom-container").style.color = "#DDDDDD";\n                this.document.getElementById("bottom-container").className = "dark-links";\n              }\n\n              L.tileLayer(\n                basemap_url,\n                {\n                  style: basemap_style,\n                  subdomains: 'abcd',\n                  detectRetina: true,\n                  tileSize: 256,\n                  zoomOffset: 0,\n                },\n              ).addTo(radarMap);\n\n              for (i = 0; i < frameCount; i++) {\n                radarImage[i] = L.tileLayer(\n                  'https://api.weather.bom.gov.au/v1/rainradar/tiles/{time}/{z}/{x}/{y}.png',\n                  {\n                    time: getRadarTime(d.valueOf() + i * 600000),\n                    detectRetina: true,\n                    tileSize: 256,\n                    zoomOffset: 0,\n                    opacity: 0,\n                  },\n                ).addTo(radarMap);\n                radarTime[i] = getRadarTimeString(d.valueOf() + i * 600000);\n              }\n              radarImage[idx].setOpacity(1);\n              document.getElementById('timestamp').innerHTML = radarTime[idx];\n              d.setTime(d.valueOf() + frameCount * 600000);\n\n              townLayer = L.tileLayer(\n                label_url,\n                {\n                  subdomains: 'abcd',\n                  detectRetina: false,\n                  tileSize: labelSize,\n                  zoomOffset: labelZoom,\n                },\n              ).addTo(radarMap);\n              townLayer.setZIndex(2);\n\n              ${!0===this._config.show_marker?"var myIcon = L.icon({                        iconUrl: '/hacsfiles/bom-radar-card/'+svg_icon,                        iconSize: [16, 16],                      });                      L.marker([markerLat, markerLon], { icon: myIcon, interactive: false }).addTo(radarMap);":""}\n\n              ${!0===this._config.show_range?"L.circle([markerLat, markerLon], { radius: 50000, weight: 1, fill: false, opacity: 0.3, interactive: false }).addTo(radarMap);                      L.circle([markerLat, markerLon], { radius: 100000, weight: 1, fill: false, opacity: 0.3, interactive: false }).addTo(radarMap);                      L.circle([markerLat, markerLon], { radius: 200000, weight: 1, fill: false, opacity: 0.3, interactive: false }).addTo(radarMap);":""}\n\n              ${!0===this._config.show_radar_location?"radarMap.createPane('overlayRadarLocation');                      radarMap.getPane('overlayRadarLocation').style.zIndex = 401;                      radarMap.getPane('overlayRadarLocation').style.pointerEvents = 'none';                      radarLocations.forEach(function (coords) {                        L.circleMarker([coords[0], coords[1]], { radius: locationRadius, weight: locationRadius/2, color: locationLineColour, fillColor: locationFillColour, fillOpacity: 1.0, interactive: false, pane: 'overlayRadarLocation' }).addTo(radarMap);                      });":""}\n\n              ${!0===this._config.show_radar_coverage?"radarMap.createPane('overlayRadarCoverage');                      radarMap.getPane('overlayRadarCoverage').style.opacity = 0.1;                      radarMap.getPane('overlayRadarCoverage').style.zIndex = 400;                      radarMap.getPane('overlayRadarCoverage').style.pointerEvents = 'none';                      radarLocations.forEach(function (coords) {                        L.circle([coords[0], coords[1]], { radius: 200000, weight: 1, stroke: false, fill: true, fillOpacity: 1, interactive: false, pane: 'overlayRadarCoverage' }).addTo(radarMap);                      });":""}\n\n              setTimeout(function() {\n                nextFrame();\n              }, timeout);\n              setUpdateTimeout();\n\n              function setUpdateTimeout() {\n                d.setTime(d.valueOf() + 600000);\n                x = new Date();\n                setTimeout(triggerRadarUpdate, d.valueOf() - x.valueOf());\n              }\n\n              function triggerRadarUpdate() {\n                doRadarUpdate = true;\n              }\n\n              function updateRadar() {\n                newLayer = L.tileLayer('https://api.weather.bom.gov.au/v1/rainradar/tiles/{time}/{z}/{x}/{y}.png', {\n                  time: getRadarTime(d.valueOf() - 600000),\n                  maxZoom: maxZoom,\n                  tileSize: 256,\n                  zoomOffset: 0,\n                  opacity: 0,\n                }).addTo(radarMap);\n                newTime = getRadarTimeString(d.valueOf() - 600000);\n\n                radarImage[0].remove();\n                for (i = 0; i < frameCount - 1; i++) {\n                  radarImage[i] = radarImage[i + 1];\n                  radarTime[i] = radarTime[i + 1];\n                }\n                radarImage[frameCount - 1] = newLayer;\n                radarTime[frameCount - 1] = newTime;\n                idx = 0;\n                doRadarUpdate = false;\n\n                setUpdateTimeout();\n              }\n\n              function getRadarTime(date) {\n                x = new Date(date);\n                return (\n                  x.getUTCFullYear().toString() +\n                  (x.getUTCMonth() + 1).toString().padStart(2, '0') +\n                  x\n                    .getUTCDate()\n                    .toString()\n                    .padStart(2, '0') +\n                  x\n                    .getUTCHours()\n                    .toString()\n                    .padStart(2, '0') +\n                  x\n                    .getUTCMinutes()\n                    .toString()\n                    .padStart(2, '0')\n                );\n              }\n\n              function getRadarTimeString(date) {\n                x = new Date(date);\n                return (\n                  weekday[x.getDay()] +\n                  ' ' +\n                  month[x.getMonth()] +\n                  ' ' +\n                  x\n                    .getDate()\n                    .toString()\n                    .padStart(2, '0') +\n                  ' ' +\n                  x\n                    .getHours()\n                    .toString()\n                    .padStart(2, '0') +\n                  ':' +\n                  x\n                    .getMinutes()\n                    .toString()\n                    .padStart(2, '0')\n                );\n              }\n\n              function nextFrame() {\n                if (run) {\n                  nextImage();\n                }\n                setTimeout(function() {\n                  nextFrame();\n                }, timeout);\n              }\n\n              function skipNext() {\n                if (idx == frameCount-1) {\n                  idx += 1;\n                }\n                nextImage();\n              }\n\n              function skipBack() {\n                if (idx == frameCount) {\n                  radarImage[frameCount - 1].setOpacity(0);\n                  idx -= 1;\n                } else if (idx < frameCount) {\n                  radarImage[idx].setOpacity(0);\n                }\n                idx -= 1;\n                if (doRadarUpdate && idx == 1) {\n                  updateRadar();\n                }\n                if (idx < 0) {\n                  idx = frameCount-1;\n                }\n                document.getElementById("progress-bar").style.width = (idx+1)*barSize+"px";\n                document.getElementById('timestamp').innerHTML = radarTime[idx];\n                radarImage[idx].setOpacity(1);\n              }\n\n              function nextImage() {\n                if (idx == frameCount) {\n                  radarImage[frameCount - 1].setOpacity(0);\n                } else if (idx < frameCount - 1) {\n                  radarImage[idx].setOpacity(0);\n                }\n                idx += 1;\n                if (doRadarUpdate && idx == 1) {\n                  updateRadar();\n                }\n                if (idx == frameCount + 1) {\n                  idx = 0;\n                }\n                if (idx != frameCount + 1) {\n                  document.getElementById("progress-bar").style.width = (idx+1)*barSize+"px";\n                }\n                if (idx < frameCount) {\n                  document.getElementById('timestamp').innerHTML = radarTime[idx];\n                  radarImage[idx].setOpacity(1);\n                }\n              }\n\n              function resizeWindow() {\n                this.document.getElementById("color-bar").width = this.frameElement.offsetWidth;\n                this.document.getElementById("img-color-bar").width = this.frameElement.offsetWidth;\n                this.document.getElementById("mapid").width = this.frameElement.offsetWidth;\n                this.document.getElementById("div-progress-bar").width = this.frameElement.offsetWidth;\n                this.document.getElementById("bottom-container").width = this.frameElement.offsetWidth;\n              }\n            <\/script>\n          </span>\n        </body>\n      </html>\n    `;return I`
      <ha-card class="type-iframe">
        <div id="root">
          <iframe
            srcdoc=${e}
            scrolling="no"
            height="526"
            width="100%"
            style="border:none; padding:none; border-radius: var(--ha-card-border-radius, 4px);"
          ></iframe>
        </div>
      </ha-card>
    `}showWarning(e){return I`
      <hui-warning>${e}</hui-warning>
    `}showError(e){const t=document.createElement("hui-error-card");return t.setConfig({type:"error",error:e,origConfig:this._config}),I`
      ${t}
    `}get styles(){return ee`
      .text-container {
        font: 12px/1.5 'Helvetica Neue', Arial, Helvetica, sans-serif;
      }
      #timestamp {
        margin: 2px 0px;
      }
      #color-bar {
        margin: 0px 0px;
      }
    `}};e([G()],Ee.prototype,"hass",void 0),e([G()],Ee.prototype,"_config",void 0),Ee=e([q("bom-radar-card")],Ee);export{Ee as BomRadarCard};
