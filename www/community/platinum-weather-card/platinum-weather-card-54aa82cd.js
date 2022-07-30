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
var t=function(i,e){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,i){t.__proto__=i}||function(t,i){for(var e in i)Object.prototype.hasOwnProperty.call(i,e)&&(t[e]=i[e])},t(i,e)};function i(i,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function s(){this.constructor=i}t(i,e),i.prototype=null===e?Object.create(e):(s.prototype=e.prototype,new s)}var e=function(){return e=Object.assign||function(t){for(var i,e=1,s=arguments.length;e<s;e++)for(var o in i=arguments[e])Object.prototype.hasOwnProperty.call(i,o)&&(t[o]=i[o]);return t},e.apply(this,arguments)};function s(t,i,e,s){var o,n=arguments.length,a=n<3?i:null===s?s=Object.getOwnPropertyDescriptor(i,e):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,i,e,s);else for(var r=t.length-1;r>=0;r--)(o=t[r])&&(a=(n<3?o(a):n>3?o(i,e,a):o(i,e))||a);return n>3&&a&&Object.defineProperty(i,e,a),a}function o(t){var i="function"==typeof Symbol&&Symbol.iterator,e=i&&t[i],s=0;if(e)return e.call(t);if(t&&"number"==typeof t.length)return{next:function(){return t&&s>=t.length&&(t=void 0),{value:t&&t[s++],done:!t}}};throw new TypeError(i?"Object is not iterable.":"Symbol.iterator is not defined.")}
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const n=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,a=Symbol(),r=new Map;class l{constructor(t,i){if(this._$cssResult$=!0,i!==a)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){let t=r.get(this.cssText);return n&&void 0===t&&(r.set(this.cssText,t=new CSSStyleSheet),t.replaceSync(this.cssText)),t}toString(){return this.cssText}}const c=t=>new l("string"==typeof t?t:t+"",a),h=(t,...i)=>{const e=1===t.length?t[0]:i.reduce(((i,e,s)=>i+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(e)+t[s+1]),t[0]);return new l(e,a)},d=(t,i)=>{n?t.adoptedStyleSheets=i.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):i.forEach((i=>{const e=document.createElement("style"),s=window.litNonce;void 0!==s&&e.setAttribute("nonce",s),e.textContent=i.cssText,t.appendChild(e)}))},u=n?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let i="";for(const e of t.cssRules)i+=e.cssText;return c(i)})(t):t
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;var _;const g=window.trustedTypes,p=g?g.emptyScript:"",m=window.reactiveElementPolyfillSupport,f={toAttribute(t,i){switch(i){case Boolean:t=t?p:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,i){let e=t;switch(i){case Boolean:e=null!==t;break;case Number:e=null===t?null:Number(t);break;case Object:case Array:try{e=JSON.parse(t)}catch(t){e=null}}return e}},v=(t,i)=>i!==t&&(i==i||t==t),y={attribute:!0,type:String,converter:f,reflect:!1,hasChanged:v};class b extends HTMLElement{constructor(){super(),this._$Et=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Ei=null,this.o()}static addInitializer(t){var i;null!==(i=this.l)&&void 0!==i||(this.l=[]),this.l.push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((i,e)=>{const s=this._$Eh(e,i);void 0!==s&&(this._$Eu.set(s,e),t.push(s))})),t}static createProperty(t,i=y){if(i.state&&(i.attribute=!1),this.finalize(),this.elementProperties.set(t,i),!i.noAccessor&&!this.prototype.hasOwnProperty(t)){const e="symbol"==typeof t?Symbol():"__"+t,s=this.getPropertyDescriptor(t,e,i);void 0!==s&&Object.defineProperty(this.prototype,t,s)}}static getPropertyDescriptor(t,i,e){return{get(){return this[i]},set(s){const o=this[t];this[i]=s,this.requestUpdate(t,o,e)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||y}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),this.elementProperties=new Map(t.elementProperties),this._$Eu=new Map,this.hasOwnProperty("properties")){const t=this.properties,i=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const e of i)this.createProperty(e,t[e])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const i=[];if(Array.isArray(t)){const e=new Set(t.flat(1/0).reverse());for(const t of e)i.unshift(u(t))}else void 0!==t&&i.push(u(t));return i}static _$Eh(t,i){const e=i.attribute;return!1===e?void 0:"string"==typeof e?e:"string"==typeof t?t.toLowerCase():void 0}o(){var t;this._$Ep=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Em(),this.requestUpdate(),null===(t=this.constructor.l)||void 0===t||t.forEach((t=>t(this)))}addController(t){var i,e;(null!==(i=this._$Eg)&&void 0!==i?i:this._$Eg=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(e=t.hostConnected)||void 0===e||e.call(t))}removeController(t){var i;null===(i=this._$Eg)||void 0===i||i.splice(this._$Eg.indexOf(t)>>>0,1)}_$Em(){this.constructor.elementProperties.forEach(((t,i)=>{this.hasOwnProperty(i)&&(this._$Et.set(i,this[i]),delete this[i])}))}createRenderRoot(){var t;const i=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return d(i,this.constructor.elementStyles),i}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$Eg)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostConnected)||void 0===i?void 0:i.call(t)}))}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$Eg)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostDisconnected)||void 0===i?void 0:i.call(t)}))}attributeChangedCallback(t,i,e){this._$AK(t,e)}_$ES(t,i,e=y){var s,o;const n=this.constructor._$Eh(t,e);if(void 0!==n&&!0===e.reflect){const a=(null!==(o=null===(s=e.converter)||void 0===s?void 0:s.toAttribute)&&void 0!==o?o:f.toAttribute)(i,e.type);this._$Ei=t,null==a?this.removeAttribute(n):this.setAttribute(n,a),this._$Ei=null}}_$AK(t,i){var e,s,o;const n=this.constructor,a=n._$Eu.get(t);if(void 0!==a&&this._$Ei!==a){const t=n.getPropertyOptions(a),r=t.converter,l=null!==(o=null!==(s=null===(e=r)||void 0===e?void 0:e.fromAttribute)&&void 0!==s?s:"function"==typeof r?r:null)&&void 0!==o?o:f.fromAttribute;this._$Ei=a,this[a]=l(i,t.type),this._$Ei=null}}requestUpdate(t,i,e){let s=!0;void 0!==t&&(((e=e||this.constructor.getPropertyOptions(t)).hasChanged||v)(this[t],i)?(this._$AL.has(t)||this._$AL.set(t,i),!0===e.reflect&&this._$Ei!==t&&(void 0===this._$E_&&(this._$E_=new Map),this._$E_.set(t,e))):s=!1),!this.isUpdatePending&&s&&(this._$Ep=this._$EC())}async _$EC(){this.isUpdatePending=!0;try{await this._$Ep}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Et&&(this._$Et.forEach(((t,i)=>this[i]=t)),this._$Et=void 0);let i=!1;const e=this._$AL;try{i=this.shouldUpdate(e),i?(this.willUpdate(e),null===(t=this._$Eg)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostUpdate)||void 0===i?void 0:i.call(t)})),this.update(e)):this._$EU()}catch(t){throw i=!1,this._$EU(),t}i&&this._$AE(e)}willUpdate(t){}_$AE(t){var i;null===(i=this._$Eg)||void 0===i||i.forEach((t=>{var i;return null===(i=t.hostUpdated)||void 0===i?void 0:i.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Ep}shouldUpdate(t){return!0}update(t){void 0!==this._$E_&&(this._$E_.forEach(((t,i)=>this._$ES(i,this[i],t))),this._$E_=void 0),this._$EU()}updated(t){}firstUpdated(t){}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var w;b.finalized=!0,b.elementProperties=new Map,b.elementStyles=[],b.shadowRootOptions={mode:"open"},null==m||m({ReactiveElement:b}),(null!==(_=globalThis.reactiveElementVersions)&&void 0!==_?_:globalThis.reactiveElementVersions=[]).push("1.2.1");const $=globalThis.trustedTypes,x=$?$.createPolicy("lit-html",{createHTML:t=>t}):void 0,S=`lit$${(Math.random()+"").slice(9)}$`,N="?"+S,A=`<${N}>`,M=document,O=(t="")=>M.createComment(t),E=t=>null===t||"object"!=typeof t&&"function"!=typeof t,T=Array.isArray,k=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,C=/-->/g,L=/>/g,D=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,P=/'/g,F=/"/g,U=/^(?:script|style|textarea)$/i,R=(t=>(i,...e)=>({_$litType$:t,strings:i,values:e}))(1),z=Symbol.for("lit-noChange"),W=Symbol.for("lit-nothing"),H=new WeakMap,V=M.createTreeWalker(M,129,null,!1),j=(t,i)=>{const e=t.length-1,s=[];let o,n=2===i?"<svg>":"",a=k;for(let i=0;i<e;i++){const e=t[i];let r,l,c=-1,h=0;for(;h<e.length&&(a.lastIndex=h,l=a.exec(e),null!==l);)h=a.lastIndex,a===k?"!--"===l[1]?a=C:void 0!==l[1]?a=L:void 0!==l[2]?(U.test(l[2])&&(o=RegExp("</"+l[2],"g")),a=D):void 0!==l[3]&&(a=D):a===D?">"===l[0]?(a=null!=o?o:k,c=-1):void 0===l[1]?c=-2:(c=a.lastIndex-l[2].length,r=l[1],a=void 0===l[3]?D:'"'===l[3]?F:P):a===F||a===P?a=D:a===C||a===L?a=k:(a=D,o=void 0);const d=a===D&&t[i+1].startsWith("/>")?" ":"";n+=a===k?e+A:c>=0?(s.push(r),e.slice(0,c)+"$lit$"+e.slice(c)+S+d):e+S+(-2===c?(s.push(void 0),i):d)}const r=n+(t[e]||"<?>")+(2===i?"</svg>":"");if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return[void 0!==x?x.createHTML(r):r,s]};class I{constructor({strings:t,_$litType$:i},e){let s;this.parts=[];let o=0,n=0;const a=t.length-1,r=this.parts,[l,c]=j(t,i);if(this.el=I.createElement(l,e),V.currentNode=this.el.content,2===i){const t=this.el.content,i=t.firstChild;i.remove(),t.append(...i.childNodes)}for(;null!==(s=V.nextNode())&&r.length<a;){if(1===s.nodeType){if(s.hasAttributes()){const t=[];for(const i of s.getAttributeNames())if(i.endsWith("$lit$")||i.startsWith(S)){const e=c[n++];if(t.push(i),void 0!==e){const t=s.getAttribute(e.toLowerCase()+"$lit$").split(S),i=/([.?@])?(.*)/.exec(e);r.push({type:1,index:o,name:i[2],strings:t,ctor:"."===i[1]?G:"?"===i[1]?X:"@"===i[1]?Y:q})}else r.push({type:6,index:o})}for(const i of t)s.removeAttribute(i)}if(U.test(s.tagName)){const t=s.textContent.split(S),i=t.length-1;if(i>0){s.textContent=$?$.emptyScript:"";for(let e=0;e<i;e++)s.append(t[e],O()),V.nextNode(),r.push({type:2,index:++o});s.append(t[i],O())}}}else if(8===s.nodeType)if(s.data===N)r.push({type:2,index:o});else{let t=-1;for(;-1!==(t=s.data.indexOf(S,t+1));)r.push({type:7,index:o}),t+=S.length-1}o++}}static createElement(t,i){const e=M.createElement("template");return e.innerHTML=t,e}}function B(t,i,e=t,s){var o,n,a,r;if(i===z)return i;let l=void 0!==s?null===(o=e._$Cl)||void 0===o?void 0:o[s]:e._$Cu;const c=E(i)?void 0:i._$litDirective$;return(null==l?void 0:l.constructor)!==c&&(null===(n=null==l?void 0:l._$AO)||void 0===n||n.call(l,!1),void 0===c?l=void 0:(l=new c(t),l._$AT(t,e,s)),void 0!==s?(null!==(a=(r=e)._$Cl)&&void 0!==a?a:r._$Cl=[])[s]=l:e._$Cu=l),void 0!==l&&(i=B(t,l._$AS(t,i.values),l,s)),i}class K{constructor(t,i){this.v=[],this._$AN=void 0,this._$AD=t,this._$AM=i}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(t){var i;const{el:{content:e},parts:s}=this._$AD,o=(null!==(i=null==t?void 0:t.creationScope)&&void 0!==i?i:M).importNode(e,!0);V.currentNode=o;let n=V.nextNode(),a=0,r=0,l=s[0];for(;void 0!==l;){if(a===l.index){let i;2===l.type?i=new Z(n,n.nextSibling,this,t):1===l.type?i=new l.ctor(n,l.name,l.strings,this,t):6===l.type&&(i=new Q(n,this,t)),this.v.push(i),l=s[++r]}a!==(null==l?void 0:l.index)&&(n=V.nextNode(),a++)}return o}m(t){let i=0;for(const e of this.v)void 0!==e&&(void 0!==e.strings?(e._$AI(t,e,i),i+=e.strings.length-2):e._$AI(t[i])),i++}}class Z{constructor(t,i,e,s){var o;this.type=2,this._$AH=W,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=e,this.options=s,this._$Cg=null===(o=null==s?void 0:s.isConnected)||void 0===o||o}get _$AU(){var t,i;return null!==(i=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==i?i:this._$Cg}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=B(this,t,i),E(t)?t===W||null==t||""===t?(this._$AH!==W&&this._$AR(),this._$AH=W):t!==this._$AH&&t!==z&&this.$(t):void 0!==t._$litType$?this.T(t):void 0!==t.nodeType?this.S(t):(t=>{var i;return T(t)||"function"==typeof(null===(i=t)||void 0===i?void 0:i[Symbol.iterator])})(t)?this.A(t):this.$(t)}M(t,i=this._$AB){return this._$AA.parentNode.insertBefore(t,i)}S(t){this._$AH!==t&&(this._$AR(),this._$AH=this.M(t))}$(t){this._$AH!==W&&E(this._$AH)?this._$AA.nextSibling.data=t:this.S(M.createTextNode(t)),this._$AH=t}T(t){var i;const{values:e,_$litType$:s}=t,o="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=I.createElement(s.h,this.options)),s);if((null===(i=this._$AH)||void 0===i?void 0:i._$AD)===o)this._$AH.m(e);else{const t=new K(o,this),i=t.p(this.options);t.m(e),this.S(i),this._$AH=t}}_$AC(t){let i=H.get(t.strings);return void 0===i&&H.set(t.strings,i=new I(t)),i}A(t){T(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let e,s=0;for(const o of t)s===i.length?i.push(e=new Z(this.M(O()),this.M(O()),this,this.options)):e=i[s],e._$AI(o),s++;s<i.length&&(this._$AR(e&&e._$AB.nextSibling,s),i.length=s)}_$AR(t=this._$AA.nextSibling,i){var e;for(null===(e=this._$AP)||void 0===e||e.call(this,!1,!0,i);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i}}setConnected(t){var i;void 0===this._$AM&&(this._$Cg=t,null===(i=this._$AP)||void 0===i||i.call(this,t))}}class q{constructor(t,i,e,s,o){this.type=1,this._$AH=W,this._$AN=void 0,this.element=t,this.name=i,this._$AM=s,this.options=o,e.length>2||""!==e[0]||""!==e[1]?(this._$AH=Array(e.length-1).fill(new String),this.strings=e):this._$AH=W}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,i=this,e,s){const o=this.strings;let n=!1;if(void 0===o)t=B(this,t,i,0),n=!E(t)||t!==this._$AH&&t!==z,n&&(this._$AH=t);else{const s=t;let a,r;for(t=o[0],a=0;a<o.length-1;a++)r=B(this,s[e+a],i,a),r===z&&(r=this._$AH[a]),n||(n=!E(r)||r!==this._$AH[a]),r===W?t=W:t!==W&&(t+=(null!=r?r:"")+o[a+1]),this._$AH[a]=r}n&&!s&&this.k(t)}k(t){t===W?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class G extends q{constructor(){super(...arguments),this.type=3}k(t){this.element[this.name]=t===W?void 0:t}}const J=$?$.emptyScript:"";class X extends q{constructor(){super(...arguments),this.type=4}k(t){t&&t!==W?this.element.setAttribute(this.name,J):this.element.removeAttribute(this.name)}}class Y extends q{constructor(t,i,e,s,o){super(t,i,e,s,o),this.type=5}_$AI(t,i=this){var e;if((t=null!==(e=B(this,t,i,0))&&void 0!==e?e:W)===z)return;const s=this._$AH,o=t===W&&s!==W||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==W&&(s===W||o);o&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var i,e;"function"==typeof this._$AH?this._$AH.call(null!==(e=null===(i=this.options)||void 0===i?void 0:i.host)&&void 0!==e?e:this.element,t):this._$AH.handleEvent(t)}}class Q{constructor(t,i,e){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=e}get _$AU(){return this._$AM._$AU}_$AI(t){B(this,t)}}const tt=window.litHtmlPolyfillSupport;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var it,et;null==tt||tt(I,Z),(null!==(w=globalThis.litHtmlVersions)&&void 0!==w?w:globalThis.litHtmlVersions=[]).push("2.1.2");class st extends b{constructor(){super(...arguments),this.renderOptions={host:this},this._$Dt=void 0}createRenderRoot(){var t,i;const e=super.createRenderRoot();return null!==(t=(i=this.renderOptions).renderBefore)&&void 0!==t||(i.renderBefore=e.firstChild),e}update(t){const i=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Dt=((t,i,e)=>{var s,o;const n=null!==(s=null==e?void 0:e.renderBefore)&&void 0!==s?s:i;let a=n._$litPart$;if(void 0===a){const t=null!==(o=null==e?void 0:e.renderBefore)&&void 0!==o?o:null;n._$litPart$=a=new Z(i.insertBefore(O(),t),t,void 0,null!=e?e:{})}return a._$AI(t),a})(i,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Dt)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Dt)||void 0===t||t.setConnected(!1)}render(){return z}}st.finalized=!0,st._$litElement$=!0,null===(it=globalThis.litElementHydrateSupport)||void 0===it||it.call(globalThis,{LitElement:st});const ot=globalThis.litElementPolyfillSupport;null==ot||ot({LitElement:st}),(null!==(et=globalThis.litElementVersions)&&void 0!==et?et:globalThis.litElementVersions=[]).push("3.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const nt=t=>i=>"function"==typeof i?((t,i)=>(window.customElements.define(t,i),i))(t,i):((t,i)=>{const{kind:e,elements:s}=i;return{kind:e,elements:s,finisher(i){window.customElements.define(t,i)}}})(t,i)
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */,at=(t,i)=>"method"===i.kind&&i.descriptor&&!("value"in i.descriptor)?{...i,finisher(e){e.createProperty(i.key,t)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:i.key,initializer(){"function"==typeof i.initializer&&(this[i.key]=i.initializer.call(this))},finisher(e){e.createProperty(i.key,t)}};function rt(t){return(i,e)=>void 0!==e?((t,i,e)=>{i.constructor.createProperty(e,t)})(t,i,e):at(t,i)
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */}function lt(t){return rt({...t,state:!0})}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ct=({finisher:t,descriptor:i})=>(e,s)=>{var o;if(void 0===s){const s=null!==(o=e.originalKey)&&void 0!==o?o:e.key,n=null!=i?{kind:"method",placement:"prototype",key:s,descriptor:i(e.key)}:{...e,key:s};return null!=t&&(n.finisher=function(i){t(i,s)}),n}{const o=e.constructor;void 0!==i&&Object.defineProperty(e,s,i(s)),null==t||t(o,s)}}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;var ht;const dt=null!=(null===(ht=window.HTMLSlotElement)||void 0===ht?void 0:ht.prototype.assignedElements)?(t,i)=>t.assignedElements(i):(t,i)=>t.assignedNodes(i).filter((t=>t.nodeType===Node.ELEMENT_NODE));function ut(t){const{slot:i,selector:e}=null!=t?t:{};return ct({descriptor:s=>({get(){var s;const o="slot"+(i?`[name=${i}]`:":not([name])"),n=null===(s=this.renderRoot)||void 0===s?void 0:s.querySelector(o),a=null!=n?dt(n,t):[];return e?a.filter((t=>t.matches(e))):a},enumerable:!0,configurable:!0})})}var _t,gt,pt=function(t){return new Intl.DateTimeFormat(t.language,{year:"numeric",month:"long",day:"numeric"})};!function(t){t.language="language",t.system="system",t.comma_decimal="comma_decimal",t.decimal_comma="decimal_comma",t.space_comma="space_comma",t.none="none"}(_t||(_t={})),function(t){t.language="language",t.system="system",t.am_pm="12",t.twenty_four="24"}(gt||(gt={}));var mt=function(t){if(t.time_format===gt.language||t.time_format===gt.system){var i=t.time_format===gt.language?t.language:void 0,e=(new Date).toLocaleString(i);return e.includes("AM")||e.includes("PM")}return t.time_format===gt.am_pm},ft=function(t){return new Intl.DateTimeFormat(t.language,{year:"numeric",month:"long",day:"numeric",hour:mt(t)?"numeric":"2-digit",minute:"2-digit",hour12:mt(t)})},vt=function(t){return new Intl.DateTimeFormat(t.language,{hour:"numeric",minute:"2-digit",hour12:mt(t)})},yt=function(t,i,e,s){s=s||{},e=null==e?{}:e;var o=new Event(i,{bubbles:void 0===s.bubbles||s.bubbles,cancelable:Boolean(s.cancelable),composed:void 0===s.composed||s.composed});return o.detail=e,t.dispatchEvent(o),o};const bt=(t,i,e)=>{if("unknown"===i.state||"unavailable"===i.state)return t(`state.default.${i.state}`);if(i.attributes.unit_of_measurement)return`${i.state}${i.attributes.unit_of_measurement}`;const s=i.entity_id.split(".")[0];if("input_datetime"===s){let t;if(!i.attributes.has_time)return t=new Date(i.attributes.year,i.attributes.month-1,i.attributes.day),function(t,i){return pt(i).format(t)}(t,e);if(!i.attributes.has_date){const s=new Date;return t=new Date(s.getFullYear(),s.getMonth(),s.getDay(),i.attributes.hour,i.attributes.minute),function(t,i){return vt(i).format(t)}(t,e)}return t=new Date(i.attributes.year,i.attributes.month-1,i.attributes.day,i.attributes.hour,i.attributes.minute),function(t,i){return ft(i).format(t)}(t,e)}return i.attributes.device_class&&t(`component.${s}.state.${i.attributes.device_class}.${i.state}`)||t(`component.${s}.state._.${i.state}`)||i.state};console.info("%c  PLATINUM-WEATHER-CARD  \n%c  Version 0.0.4          ","color: orange; font-weight: bold; background: black","color: white; font-weight: bold; background: dimgray"),window.customCards=window.customCards||[],window.customCards.push({type:"platinum-weather-card",name:"Platinum Weather Card",description:"An fully customisable weather card with a GUI configuration"});let wt=class extends st{constructor(){super(...arguments),this._error=[]}static async getConfigElement(){return await import("./editor-5f91f6f1.js"),document.createElement("platinum-weather-card-editor")}static getStubConfig(){return{}}getCardSize(){var t=16;if(!0===this._config.show_section_title&&(t+=void 0!==this._config.text_card_title?37:0,t+=void 0!==this._config.entity_update_time?21:0),!1!==this._config.show_section_overview&&(t+=void 0!==this._config.entity_current_text?153:128),!1!==this._config.show_section_extended&&(t+=17,t+=this._config.entity_daily_summary?40:0,t+=void 0!==this._config.entity_todays_uv_forecast||void 0!==this._config.entity_todays_fire_danger?20:0),!1!==this._config.show_section_slots){var i=("remove"!==this._config.slot_l1?1:0)+("remove"!==this._config.slot_l2?1:0)+("remove"!==this._config.slot_l3?1:0)+("remove"!==this._config.slot_l4?1:0)+("remove"!==this._config.slot_l5?1:0)+(void 0!==this._config.slot_l6&&"remove"!==this._config.slot_l6?1:0)+(void 0!==this._config.slot_l7&&"remove"!==this._config.slot_l7?1:0)+(void 0!==this._config.slot_l8&&"remove"!==this._config.slot_l8?1:0),e=("remove"!==this._config.slot_r1?1:0)+("remove"!==this._config.slot_r2?1:0)+("remove"!==this._config.slot_r3?1:0)+("remove"!==this._config.slot_r4?1:0)+("remove"!==this._config.slot_r5?1:0)+(void 0!==this._config.slot_r6&&"remove"!==this._config.slot_r6?1:0)+(void 0!==this._config.slot_r7&&"remove"!==this._config.slot_r7?1:0)+(void 0!==this._config.slot_r8&&"remove"!==this._config.slot_r8?1:0);t+=16+24*Math.max(i,e)}!1!==this._config.show_section_daily_forecast&&("vertical"!==this._config.daily_forecast_layout?t+=164:(t+=18+88*(this._config.daily_forecast_days||5),0!==this._config.daily_extended_forecast_days&&(t+=49*Math.min(this._config.daily_forecast_days||5,this._config.daily_extended_forecast_days||7))));const s=Math.ceil(t/50);return console.info(`CardHeight=${t} CardSize=${s}`),s}setConfig(t){if(!t)throw new Error("Invalid configuration");t.test_gui&&function(){var t=document.querySelector("home-assistant");if(t=(t=(t=(t=(t=(t=(t=(t=t&&t.shadowRoot)&&t.querySelector("home-assistant-main"))&&t.shadowRoot)&&t.querySelector("app-drawer-layout partial-panel-resolver"))&&t.shadowRoot||t)&&t.querySelector("ha-panel-lovelace"))&&t.shadowRoot)&&t.querySelector("hui-root")){var i=t.lovelace;return i.current_view=t.___curView,i}return null}().setEditMode(!0),this._config=Object.assign({name:"Weather"},t)}shouldUpdate(t){if(!this._config)return!1;const i=t.get("hass")||void 0;if(!i||i.themes!==this.hass.themes||i.locale!==this.hass.locale)return!0;if(!1===Object.keys(this._config).every((t=>null===t.match(/^entity_/)||i.states[this._config[t]]===this.hass.states[this._config[t]])))return!0;if(this._config.show_section_daily_forecast){const t=this._config.daily_forecast_days||5;for(const s of["entity_forecast_icon_1","entity_summary_1","entity_forecast_low_temp_1","entity_forecast_high_temp_1","entity_pop_1","entity_pos_1"])if(void 0!==this._config[s]&&null===this._config[s].match("^weather.")){const o=this._config[s].match(/(\d+)(?!.*\d)/g);if(o)for(var e=1;e<t;e++){const t=this._config[s].replace(/(\d+)(?!.*\d)/g,Number(o)+e);if(i.states[t]!==this.hass.states[t])return!0}}}return t.has("config")}_checkForErrors(){this._error=[],Object.keys(this._config).forEach((t=>{null!==t.match(/^entity_/)&&void 0===this.hass.states[this._config[t]]&&this._error.push(`'${t}=${this._config[t]}' not found`)}));const t=this._config.daily_forecast_days||5;for(const e of["entity_forecast_icon_1","entity_summary_1","entity_forecast_low_temp_1","entity_forecast_high_temp_1","entity_pop_1","entity_pos_1"])if(void 0!==this._config[e]){const s=this.hass.states[this._config[e]];if(this._config[e].match("^weather."))for(var i=1;i<=t;i++)switch(e){case"entity_forecast_icon_1":s.attributes.forecast[i]&&void 0===s.attributes.forecast[i].condition&&this._error.push(`'${e} attribute forecast[${i}].condition not found`);break;case"entity_forecast_low_temp_1":s.attributes.forecast[i]&&void 0===s.attributes.forecast[i].templow&&this._error.push(`'${e} attribute forecast[${i}].templow not found`);break;case"entity_forecast_high_temp_1":s.attributes.forecast[i]&&void 0===s.attributes.forecast[i].temperature&&this._error.push(`'${e} attribute forecast[${i}].temperature not found`);break;case"entity_pop_1":s.attributes.forecast[i]&&void 0===s.attributes.forecast[i].precipitation_probability&&this._error.push(`'${e} attribute forecast[${i}].precipitation_probability not found`);break;case"entity_pos_1":s.attributes.forecast[i]&&void 0===s.attributes.forecast[i].precipitation&&this._error.push(`'${e} attribute forecast[${i}].precipitation not found`)}else{const s=this._config[e].match(/(\d+)(?!.*\d)/g);if(s)for(i=1;i<t;i++){const t=this._config[e].replace(/(\d+)(?!.*\d)/g,Number(s)+i);void 0===this.hass.states[t]&&this._error.push(`'${e}'+${i}=${t}' not found`)}else this._error.push(`'${e}=${this._config[e]}' value needs to have a number`)}}return 0!==this._error.length}_renderTitleSection(){var t,i;if(!0!==(null===(t=this._config)||void 0===t?void 0:t.show_section_title)||void 0===this._config.text_card_title&&null==this._config.entity_update_time)return R``;if(this._config.entity_update_time&&this.hass.states[this._config.entity_update_time]&&void 0!==this.hass.states[this._config.entity_update_time].state){const t=new Date(this.hass.states[this._config.entity_update_time].state);switch(this.timeFormat){case"12hour":i=t.toLocaleString(this.locale||navigator.language,{hour:"numeric",minute:"2-digit",hour12:!0}).replace(" ","")+", "+t.toLocaleDateString(this.locale,{weekday:"long",day:"numeric",month:"long",year:"numeric"}).replace(",","");break;case"24hour":i=t.toLocaleString(this.locale||navigator.language,{hour:"2-digit",minute:"2-digit",hour12:!1})+", "+t.toLocaleDateString(this.locale,{weekday:"long",day:"numeric",month:"long",year:"numeric"}).replace(",","");break;case"system":i=t.toLocaleTimeString(navigator.language,{timeStyle:"short"}).replace(" ","")+", "+t.toLocaleDateString(navigator.language).replace(",","")}}else i="---";return R`
      <div class="title-section section">
        ${this._config.text_card_title?R`<div class="card-header">${this._config.text_card_title}</div>`:R``}
        ${this._config.entity_update_time?R`<div class="updated">${this._config.text_update_time_prefix?this._config.text_update_time_prefix+" ":""}${i}</div>`:R``}
      </div>
    `}_renderOverviewSection(){var t,i;if(!1===(null===(t=this._config)||void 0===t?void 0:t.show_section_overview))return R``;const e=this._weatherIcon(this.currentConditions),s=new URL((this._config.option_static_icons?"s-":"a-")+e+".svg",import.meta.url),o="unknown"!==e?"":`Unknown condition\n${this.currentConditions}`,n="unknown"!==e?R``:R`<div class="unknown-condition">${this.currentConditions}</div>`,a=R`<div class="big-icon"><img src="${s.href}" width="100%" height="100%" title="${o}"></div>`,r=R`
      <div class="current-temp">
        <div class="temp" id="current-temp-text">${this.currentTemperature}</div>
        <div class="unit-temp-big">${this.getUOM("temperature")}</div>
      </div>
    `,l=this.currentApparentTemperature,c=""!=l?R`
      <div class="apparent-temp">
        <div class="apparent">${this.localeTextFeelsLike} <span
            id="apparent-temp-text">${l}</span>
        </div>
        <div class="unit-temp-small"> ${this.getUOM("temperature")}</div>
      </div>
    `:R``,h=!0===this._config.show_separator?R`<hr class=line>`:"",d=this._config.entity_current_text&&this.hass.states[this._config.entity_current_text]?null!==(i=R`<div class="current-text">${bt(this.hass.localize,this.hass.states[this._config.entity_current_text],(u=this.hass,u.locale||{language:u.language,number_format:_t.system}))}</div>`)&&void 0!==i?i:R`<div class="current-text">---</div>`:R``;var u;return R`
      <div class="overview-section section">
        <div class="overview-top">
          <div class="top-left">${a}${n}</div>
          <div class="currentTemps">${r}${c}</div>
        </div>
        ${d}
        ${h}
      </div>
    `}_renderExtendedSection(){var t;if(!1===(null===(t=this._config)||void 0===t?void 0:t.show_section_extended)||void 0===this._config.entity_daily_summary&&void 0===this._config.entity_todays_uv_forecast&&void 0===this._config.entity_todays_fire_danger)return R``;const i=this._config.entity_daily_summary||"";var e=[];if(void 0!==this.hass.states[i])if(!0===this._config.extended_use_attr){if(void 0!==this._config.extended_name_attr){const t=this._config.extended_name_attr.toLowerCase().split(".").reduce(((t,i)=>void 0!==t?t[i]:void 0),this.hass.states[i].attributes);void 0!==t&&e.push(R`${t}`)}}else void 0!==this.hass.states[i]&&e.push(R`${this.hass.states[i].state}`);return e.push(R`${this._config.entity_todays_uv_forecast&&this.hass.states[this._config.entity_todays_uv_forecast]&&"unknown"!==this.hass.states[this._config.entity_todays_uv_forecast].state?" "+this.hass.states[this._config.entity_todays_uv_forecast].state:""}`),e.push(R`${this._config.entity_todays_fire_danger&&this.hass.states[this._config.entity_todays_fire_danger]&&"unknown"!==this.hass.states[this._config.entity_todays_fire_danger].state?" "+this.hass.states[this._config.entity_todays_fire_danger].state:""}`),R`
      <div class="extended-section section">
        <div class="f-extended">
          ${e}
        </div>
      </div>
    `}_renderSlotsSection(){var t;if(!1===(null===(t=this._config)||void 0===t?void 0:t.show_section_slots))return R``;var i=!0===this._config.use_old_column_format?R`
      <div>
        <ul class="variations-ugly">
          <li>
            <ul class="slot-list">${this.slotL1}${this.slotL2}${this.slotL3}${this.slotL4}${this.slotL5}${this.slotL6}${this.slotL7}${this.slotL8}</ul>
          </li>
          <li>
            <ul class="slot-list">${this.slotR1}${this.slotR2}${this.slotR3}${this.slotR4}${this.slotR5}${this.slotR6}${this.slotR7}${this.slotR8}</ul>
          </li>
        </ul>
      </div>
    `:R`
      <div>
        <ul class="variations">
          <li class="slot-list-item-1">
            <ul class="slot-list">
              ${this.slotL1}${this.slotL2}${this.slotL3}${this.slotL4}${this.slotL5}${this.slotL6}${this.slotL7}${this.slotL8}
            </ul>
          </li>
          <li>
            <ul class="slot-list">
              ${this.slotR1}${this.slotR2}${this.slotR3}${this.slotR4}${this.slotR5}${this.slotR6}${this.slotR7}${this.slotR8}
            </ul>
          </li>
        </ul>
      </div>
    `;return R`
      <div class="slot-section section">${i}</div>
    `}_renderHorizontalDailyForecastSection(){var t,i,e,s,o,n;const a=[],r=this._config.daily_forecast_days||5;for(var l=0;l<r;l++){const r=new Date;var c,h,d;if(r.setDate(r.getDate()+l+1),null===(t=this._config.entity_forecast_icon_1)||void 0===t?void 0:t.match("^weather.")){const t=this._config.entity_forecast_icon_1;if(void 0===this.hass.states[t].attributes.forecast[l+1]||void 0===this.hass.states[t].attributes.forecast[l+1].condition)break;const i=new URL(((this._config.option_static_icons?"s-":"a-")+(t&&this.hass.states[t].attributes.forecast[l].condition?this._weatherIcon(this.hass.states[t].attributes.forecast[l].condition):"unknown")+".svg").replace("-night","-day"),import.meta.url);c=R`<li><i class="icon" style="background: none, url(${i.href}) no-repeat; background-size: contain;"></i></li>>`}else{var u=!!this._config.entity_forecast_icon_1&&this._config.entity_forecast_icon_1.match(/(\d+)(?!.*\d)/g);const t=this._config.entity_forecast_icon_1?this._config.entity_forecast_icon_1.replace(/(\d+)(?!.*\d)/g,String(Number(u)+l)):void 0,i=new URL(((this._config.option_static_icons?"s-":"a-")+(t&&this.hass.states[t]?this._weatherIcon(this.hass.states[t].state):"unknown")+".svg").replace("-night","-day"),import.meta.url);c=R`<i class="icon" style="background: none, url(${i.href}) no-repeat; background-size: contain;"></i>`}h=(null===(i=this._config.entity_forecast_high_temp_1)||void 0===i?void 0:i.match("^weather."))?this.hass.states[this._config.entity_forecast_high_temp_1].attributes.forecast[l+1].temperature:(u=!!this._config.entity_forecast_high_temp_1&&this._config.entity_forecast_high_temp_1.match(/(\d+)(?!.*\d)/g))&&this._config.entity_forecast_high_temp_1?this.hass.states[this._config.entity_forecast_high_temp_1.replace(/(\d+)(?!.*\d)/g,String(Number(u)+l))].state:void 0,d=(null===(e=this._config.entity_forecast_low_temp_1)||void 0===e?void 0:e.match("^weather."))?this.hass.states[this._config.entity_forecast_low_temp_1].attributes.forecast[l+1].templow:(u=!!this._config.entity_forecast_low_temp_1&&this._config.entity_forecast_low_temp_1.match(/(\d+)(?!.*\d)/g))&&this._config.entity_forecast_low_temp_1?this.hass.states[this._config.entity_forecast_low_temp_1.replace(/(\d+)(?!.*\d)/g,String(Number(u)+l))].state:void 0;const v=R`<div class="unit-temp-small">${this.getUOM("temperature")}</div>`,y=!0===this._config.old_daily_format?R`
          <li>
            <span>
              <div class="slot-text highTemp">${h?Math.round(Number(h)):"---"}</div>
              ${v}
            </span>
          </li>
          <li>
            <span>
              <div class="slot-text lowTemp">${d?Math.round(Number(d)):"---"}</div>
              ${v}
            </span>
          </li>`:"highlow"===this._config.tempformat?R`
            <li>
              <span>
                <div class="slot-text highTemp">${h?Math.round(Number(h)):"---"}</div>
                <div class="slot-text slash">/</div>
                <div class="slot-text lowTemp">${d?Math.round(Number(d)):"---"}</div>
                ${v}
              </span>
            </li>`:R`
            <li>
              <span>
                <div class="slot-text lowTemp">${d?Math.round(Number(d)):"---"}</div>
                <div class="slot-text slash">/</div>
                <div class="slot-text highTemp">${h?Math.round(Number(h)):"---"}</div>
                ${v}
              </span>
            </li>
          `;var _,g,p;if(null===(s=this._config.entity_pop_1)||void 0===s?void 0:s.match("^weather.")){const t=this._config.entity_pop_1;_=t?R`<li><div class="slot-text pop">${this.hass.states[t]&&void 0!==this.hass.states[t].attributes.forecast[l+1].precipitation_probability?Math.round(Number(this.hass.states[t].attributes.forecast[l+1].precipitation_probability)):"---"}</div><div class="unit">%</div></li>`:R``}else{const t=(u=!!this._config.entity_pop_1&&this._config.entity_pop_1.match(/(\d+)(?!.*\d)/g))&&this._config.entity_pop_1?this._config.entity_pop_1.replace(/(\d+)(?!.*\d)/g,String(Number(u)+l)):void 0;_=u?R`<li><span><div class="slot-text pop">${t&&this.hass.states[t]?Math.round(Number(this.hass.states[t].state)):"---"}</div><div class="unit">%</div></span></li>`:R``}if(null===(o=this._config.entity_pos_1)||void 0===o?void 0:o.match("^weather.")){const t=this._config.entity_pos_1;g=t?R`<li><span><div class="pos">${this.hass.states[t]&&void 0!==this.hass.states[t].attributes.forecast[l+1].precipitation?this.hass.states[t].attributes.forecast[l+1].precipitation:"---"}</div><div class="unit">${this.getUOM("precipitation")}</div></span></li>`:R``}else{const t=(u=!!this._config.entity_pos_1&&this._config.entity_pos_1.match(/(\d+)(?!.*\d)/g))&&this._config.entity_pos_1?this._config.entity_pos_1.replace(/(\d+)(?!.*\d)/g,String(Number(u)+l)):void 0;g=u?R`<li><span><div class="pos">${t&&this.hass.states[t]?this.hass.states[t].state:"---"}</div><div class="unit">${this.getUOM("precipitation")}</div></span></li>`:R``}if(null===(n=this._config.entity_summary_1)||void 0===n?void 0:n.match("^weather.")){const t=this._config.entity_summary_1;p=R`<div class="fcasttooltiptext" id="fcast-summary-${l}">${this.hass.states[t]&&void 0!==this.hass.states[t].attributes.forecast[l+1].condition?(m=this.hass.localize,f=this.hass.states[t].attributes.forecast[l+1].condition,m(`component.weather.state._.${f}`)||f):"---"}</div>`}else{const t=(u=!!this._config.entity_summary_1&&this._config.entity_summary_1.match(/(\d+)(?!.*\d)/g))&&this._config.entity_summary_1?this._config.entity_summary_1.replace(/(\d+)(?!.*\d)/g,String(Number(u)+l)):void 0;p=R`<div class="fcasttooltiptext" id="fcast-summary-${l}">${this._config.option_tooltips&&t?this.hass.states[t]?this.hass.states[t].state:"---":""}</div>`}a.push(R`
        <div class="day-horiz fcasttooltip">
          <ul class="f-slot-horiz">
            <li><span class="dayname">${r?r.toLocaleDateString(this.locale,{weekday:"short"}):"---"}</span></li>
            ${c}
            ${y}
            ${_}
            ${g}
            ${p}
          </ul>
        </div>
      `)}var m,f;return R`
      <div class="daily-forecast-horiz-section section">
        ${a}
      </div>
    `}_renderVerticalDailyForecastSection(){var t,i,e,s,o;const n=[],a=this._config.daily_forecast_days||5;for(var r=0;r<a;r++){const a=new Date;var l,c,h,d,u;if(a.setDate(a.getDate()+r+1),null===(t=this._config.entity_forecast_icon_1)||void 0===t?void 0:t.match("^weather.")){const t=this._config.entity_forecast_icon_1;if(void 0===this.hass.states[t].attributes.forecast[r+1]||void 0===this.hass.states[t].attributes.forecast[r+1].condition)break;const i=new URL(((this._config.option_static_icons?"s-":"a-")+(t&&this.hass.states[t].attributes.forecast[r].condition?this._weatherIcon(this.hass.states[t].attributes.forecast[r].condition):"unknown")+".svg").replace("-night","-day"),import.meta.url);l=R`<i class="icon" style="background: none, url(${i.href}) no-repeat; background-size: contain;"></i><br>`}else{var _=!!this._config.entity_forecast_icon_1&&this._config.entity_forecast_icon_1.match(/(\d+)(?!.*\d)/g);const t=_&&this._config.entity_forecast_icon_1?this._config.entity_forecast_icon_1.replace(/(\d+)(?!.*\d)/g,String(Number(_)+r)):void 0;if(!t||void 0===this.hass.states[t]||"unknown"===this.hass.states[t].state)break;const i=new URL(((this._config.option_static_icons?"s-":"a-")+(void 0!==this.hass.states[t]?this._weatherIcon(this.hass.states[t].state):"unknown")+".svg").replace("-night","-day"),import.meta.url);l=R`<i class="icon" style="background: none, url(${i.href}) no-repeat; background-size: contain;"></i><br>`}const p=(_=!!this._config.entity_summary_1&&this._config.entity_summary_1.match(/(\d+)(?!.*\d)/g))&&this._config.entity_summary_1?this._config.entity_summary_1.replace(/(\d+)(?!.*\d)/g,String(Number(_)+r)):void 0,m=_?R`
        <div class="f-summary-vert">${p&&this.hass.states[p]?this.hass.states[p].state:"---"}</div>`:"";c=(null===(i=this._config.entity_forecast_high_temp_1)||void 0===i?void 0:i.match("^weather."))?this.hass.states[this._config.entity_forecast_high_temp_1].attributes.forecast[r+1].temperature:(_=!!this._config.entity_forecast_high_temp_1&&this._config.entity_forecast_high_temp_1.match(/(\d+)(?!.*\d)/g))&&this._config.entity_forecast_high_temp_1?this.hass.states[this._config.entity_forecast_high_temp_1.replace(/(\d+)(?!.*\d)/g,String(Number(_)+r))].state:void 0,h=(null===(e=this._config.entity_forecast_low_temp_1)||void 0===e?void 0:e.match("^weather."))?this.hass.states[this._config.entity_forecast_low_temp_1].attributes.forecast[r+1].templow:(_=!!this._config.entity_forecast_low_temp_1&&this._config.entity_forecast_low_temp_1.match(/(\d+)(?!.*\d)/g))&&this._config.entity_forecast_low_temp_1?this.hass.states[this._config.entity_forecast_low_temp_1.replace(/(\d+)(?!.*\d)/g,String(Number(_)+r))].state:void 0;const f=R`<div class="unit-temp-small">${this.getUOM("temperature")}</div>`,v=h?R`
        <div class="temp-label">Min: </div>
        <div class="low-temp">${Math.round(Number(h))}</div>${f}`:R`---`,y=c?R`
        <div class="temp-label">Max: </div>
        <div class="high-temp">${Math.round(Number(c))}</div>${f}`:R`---`,b=R`<div class="f-slot-vert f-slot-minmax"><div class="day-vert-minmax">${v}</div><div class="day-vert-minmax">${y}</div></div>`;if(null===(s=this._config.entity_pop_1)||void 0===s?void 0:s.match("^weather.")){const t=this._config.entity_pop_1;d=t?R`<div class="f-slot-vert"><div class="f-label">Chance of rain </div>
        <div class="pop">${this.hass.states[t]&&void 0!==this.hass.states[t].attributes.forecast[r+1].precipitation_probability?Math.round(Number(this.hass.states[t].attributes.forecast[r+1].precipitation_probability)):"---"}</div><div class="unit">%</div></div>`:R``}else{const t=(_=!!this._config.entity_pop_1&&this._config.entity_pop_1.match(/(\d+)(?!.*\d)/g))&&this._config.entity_pop_1?this._config.entity_pop_1.replace(/(\d+)(?!.*\d)/g,String(Number(_)+r)):void 0;d=_?R`
          <div class="f-slot-vert"><div class="f-label">Chance of rain </div>
          <div class="pop">${t&&this.hass.states[t]?Math.round(Number(this.hass.states[t].state)):"---"}</div><div class="unit">%</div></div>`:R``}if(null===(o=this._config.entity_pos_1)||void 0===o?void 0:o.match("^weather.")){const t=this._config.entity_pos_1;u=t?R`<div class="f-slot-vert"><div class="f-label">Possible rain </div>
        <div class="pos">${this.hass.states[t]&&void 0!==this.hass.states[t].attributes.forecast[r+1].precipitation?this.hass.states[t].attributes.forecast[r+1].precipitation:"---"}</div><div class="unit">${this.getUOM("precipitation")}</div></div>`:R``}else{const t=(_=!!this._config.entity_pos_1&&this._config.entity_pos_1.match(/(\d+)(?!.*\d)/g))&&this._config.entity_pos_1?this._config.entity_pos_1.replace(/(\d+)(?!.*\d)/g,String(Number(_)+r)):void 0;u=_?R`
          <div class="f-slot-vert"><div class="f-label">Possible rain </div>
          <div class="pos">${t&&this.hass.states[t]?this.hass.states[t].state:"---"}</div>
          <div class="unit">${this.getUOM("precipitation")}</div></div>`:R``}_=!!(this._config.entity_extended_1&&r<(0!==this._config.daily_extended_forecast_days?this._config.daily_extended_forecast_days||7:0))&&this._config.entity_extended_1.match(/(\d+)(?!.*\d)/g);var g=R``;if(!0===this._config.option_daily_show_extended)if(!0===this._config.daily_extended_use_attr){const t=(_=!!this._config.entity_extended_1&&this._config.entity_extended_1.match(/(\d+)(?!.*\d)/g))&&this._config.entity_extended_1?this._config.entity_extended_1.replace(/(\d+)(?!.*\d)/g,String(Number(_)+r)):this._config.entity_extended_1;if(t&&void 0!==this.hass.states[t]){const i=null==(_=!!(this._config.daily_extended_name_attr&&r<(0!==this._config.daily_extended_forecast_days?this._config.daily_extended_forecast_days||7:0))&&this._config.daily_extended_name_attr.match(/(\d+)(?!.*\d)/g))&&t&&this._config.daily_extended_name_attr?this.hass.states[t].attributes[this._config.daily_extended_name_attr]:_&&this._config.daily_extended_name_attr&&t?this._config.daily_extended_name_attr.replace(/(\d+)(?!.*\d)/g,String(Number(_)+r)).toLowerCase().split(".").reduce(((t,i)=>void 0!==t?t[i]:void 0),this.hass.states[t].attributes):void 0;g=i?R`<div class="f-extended">${i}</div>`:R``}}else{const t=_&&this._config.entity_extended_1?this._config.entity_extended_1.replace(/(\d+)(?!.*\d)/g,String(Number(_)+r)):void 0;g=_?R`<div class="f-extended">${t&&this.hass.states[t]?this.hass.states[t].state:"---"}</div>`:R``}n.push(R`
        <div class="day-vert fcasttooltip">
          <div class="day-vert-top">
            <div class="dayname-vert">${a?a.toLocaleDateString(this.locale,{weekday:"short"}):"---"}</div>
            ${m}
          </div>
          <div class="day-vert-middle">
            <div class="day-vert-dayicon">
              ${l}
            </div>
            <div class="day-vert-values">
              ${b}
            </div>
            <div class="day-vert-values">
              ${d}
              ${u}
            </div>
          </div>
          <div class="day-vert-bottom">
            ${g}
          </div>
        </div>
      `)}return R`
      <div class="daily-forecast-vert-section section">
        ${n}
      </div>
    `}_renderDailyForecastSection(){var t;return!1===(null===(t=this._config)||void 0===t?void 0:t.show_section_daily_forecast)?R``:"vertical"!==this._config.daily_forecast_layout?this._renderHorizontalDailyForecastSection():this._renderVerticalDailyForecastSection()}render(){const t=[];this._checkForErrors()&&t.push(this._showConfigWarning(this._error));const i=[];return void 0!==this._config.section_order&&this._config.section_order.forEach((t=>{switch(t){case"title":i.push(this._renderTitleSection());break;case"overview":i.push(this._renderOverviewSection());break;case"extended":i.push(this._renderExtendedSection());break;case"slots":i.push(this._renderSlotsSection());break;case"daily_forecast":i.push(this._renderDailyForecastSection())}})),t.push(R`
      <style>
        ${this.styles}
      </style>
      <ha-card class="card">
        <div class="content">
          ${i}
        </div>
      </ha-card>
    `),R`${t}`}get slotL1(){return this.slotValue("l1",this._config.slot_l1)}get slotL2(){return this.slotValue("l2",this._config.slot_l2)}get slotL3(){return this.slotValue("l3",this._config.slot_l3)}get slotL4(){return this.slotValue("l4",this._config.slot_l4)}get slotL5(){return this.slotValue("l5",this._config.slot_l5)}get slotL6(){return this.slotValue("l6",this._config.slot_l6)}get slotL7(){return this.slotValue("l7",this._config.slot_l7)}get slotL8(){return this.slotValue("l8",this._config.slot_l8)}get slotR1(){return this.slotValue("r1",this._config.slot_r1)}get slotR2(){return this.slotValue("r2",this._config.slot_r2)}get slotR3(){return this.slotValue("r3",this._config.slot_r3)}get slotR4(){return this.slotValue("r4",this._config.slot_r4)}get slotR5(){return this.slotValue("r5",this._config.slot_r5)}get slotR6(){return this.slotValue("r6",this._config.slot_r6)}get slotR7(){return this.slotValue("r7",this._config.slot_r7)}get slotR8(){return this.slotValue("r8",this._config.slot_r8)}slotValue(t,i){switch(i){case"pop":return this.slotPop;case"popforecast":return this.slotPopForecast;case"possible_today":return this.slotPossibleToday;case"possible_tomorrow":return this.slotPossibleTomorrow;case"rainfall":return this.slotRainfall;case"humidity":return this.slotHumidity;case"pressure":return this.slotPressure;case"observed_max":return this.slotObservedMax;case"observed_min":return this.slotObservedMin;case"forecast_max":return this.slotForecastMax;case"forecast_min":return this.slotForecastMin;case"temp_next":return this.slotTempNext;case"temp_following":return this.slotTempFollowing;case"temp_maximums":return this.slotTempMaximums;case"temp_minimums":return this.slotTempMinimums;case"uv_summary":return this.slotUvSummary;case"fire_summary":return this.slotFireSummary;case"wind":return this.slotWind;case"wind_kt":return this.slotWindKt;case"visibility":return this.slotVisibility;case"sun_next":return this.slotSunNext;case"sun_following":return this.slotSunFollowing;case"custom1":return this.slotCustom1;case"custom2":return this.slotCustom2;case"custom3":return this.slotCustom3;case"custom4":return this.slotCustom4;case"empty":return this.slotEmpty;case"remove":return this.slotRemove}switch(t){case"l1":return this.slotForecastMax;case"l2":return this.slotForecastMin;case"l3":return this.slotWind;case"l4":return this.slotPressure;case"l5":return this.slotSunNext;case"l6":case"l7":case"l8":case"r6":case"r7":case"r8":return this.slotRemove;case"r1":return this.slotPopForecast;case"r2":return this.slotHumidity;case"r3":return this.slotUvSummary;case"r4":return this.slotFireSummary;case"r5":return this.slotSunFollowing}return this.slotEmpty}get slotEmpty(){return R`<li>&nbsp;</li>`}get slotRemove(){return R``}get slotPopForecast(){const t=this._config.entity_pop?null===this._config.entity_pop.match("^weather.")?Math.round(Number(this.hass.states[this._config.entity_pop].state)):void 0!==this.hass.states[this._config.entity_pop]&&void 0!==this.hass.states[this._config.entity_pop].attributes.forecast[0].precipitation_probability?Math.round(Number(this.hass.states[this._config.entity_pop].attributes.forecast[0].precipitation_probability)):"---":"---",i="---"!==t?R`<div class="slot-text unit">%</div>`:R``,e=this._config.entity_possible_today?null===this._config.entity_possible_today.match("^weather.")?this.hass.states[this._config.entity_possible_today].state:void 0!==this.hass.states[this._config.entity_possible_today]&&void 0!==this.hass.states[this._config.entity_possible_today].attributes.forecast[0].precipitation?this.hass.states[this._config.entity_possible_today].attributes.forecast[0].precipitation:"---":"---",s="---"!==e?R`<div class="slot-text unit">${this.getUOM("precipitation")}</div>`:R``;return R`
      <li>
        <div class="slot">
          <div class="slot-icon">
            <ha-icon icon="mdi:weather-rainy"></ha-icon>
          </div>
          <div class="slot-text pop-text">${t}</div>${i}<div class="slot-text">&nbsp;-&nbsp;</div>
          <div class="slot-text pop-text-today">${e}</div>${s}
        </div>
      </li>
    `}get slotPop(){const t=this._config.entity_pop?null===this._config.entity_pop.match("^weather.")?Math.round(Number(this.hass.states[this._config.entity_pop].state)):void 0!==this.hass.states[this._config.entity_pop]&&void 0!==this.hass.states[this._config.entity_pop].attributes.forecast[0].precipitation_probability?Math.round(Number(this.hass.states[this._config.entity_pop].attributes.forecast[0].precipitation_probability)):"---":"---",i="---"!==t?R`<div class="slot-text unit">%</div>`:R``;return R`
      <li>
        <div class="slot">
          <div class="slot-icon">
            <ha-icon icon="mdi:weather-rainy"></ha-icon>
          </div>
          <div class="slot-text pop-text">${t}</div>${i}<div class="slot-text"></div>
        </div>
      </li>
    `}get slotPossibleToday(){const t=this._config.entity_possible_today?null===this._config.entity_possible_today.match("^weather.")?this.hass.states[this._config.entity_possible_today].state:void 0!==this.hass.states[this._config.entity_possible_today]&&void 0!==this.hass.states[this._config.entity_possible_today].attributes.forecast[0].precipitation?this.hass.states[this._config.entity_possible_today].attributes.forecast[0].precipitation:"---":"---",i="---"!==t?R`<div class="slot-text unit">${this.getUOM("precipitation")}</div>`:R``;return R`
      <li>
        <div class="slot">
          <div class="slot-icon">
            <ha-icon icon="mdi:weather-rainy"></ha-icon>
          </div>${this.localeTextPosToday}&nbsp;<div class="slot-text possible_today-text">${t}</div>${i}
        </div>
      </li>
    `}get slotPossibleTomorrow(){const t=this._config.entity_possible_tomorrow?null===this._config.entity_possible_tomorrow.match("^weather.")?this.hass.states[this._config.entity_possible_tomorrow].state:void 0!==this.hass.states[this._config.entity_possible_tomorrow]&&void 0!==this.hass.states[this._config.entity_possible_tomorrow].attributes.forecast[1].precipitation?this.hass.states[this._config.entity_possible_tomorrow].attributes.forecast[1].precipitation:"---":"---",i="---"!==t?R`<div class="slot-text unit">${this.getUOM("precipitation")}</div>`:R``;return R`
      <li>
        <div class="slot">
          <div class="slot-icon">
            <ha-icon icon="mdi:weather-rainy"></ha-icon>
          </div>${this.localeTextPosTomorrow}&nbsp;<div class="slot-text possible_tomorrow-text">${t}</div>${i}
        </div>
      </li>
    `}get slotRainfall(){const t=this.currentRainfall,i="---"!==t?R`<div class="slot-text unit"></span>${this.getUOM("precipitation")}</div>`:R``;return R`
      <li>
        <div class="slot">
          <div class="slot-icon">
            <ha-icon icon="mdi:weather-rainy"></ha-icon>
          </div>
          <div class="slot-text rainfall-text">${t}</div>${i}
        </div>
      </li>
    `}get slotHumidity(){const t=this.currentHumidity,i="---"!==t?R`<div class="slot-text unit">%</div>`:R``;return R`
      <li>
        <div class="slot">
          <div class="slot-icon">
            <ha-icon icon="mdi:water-percent"></ha-icon>
          </div>
          <div class="slot-text humidity-text">${t}</div>${i}
        </div>
      </li>`}get slotPressure(){const t="---"!==this.currentPressure?R`<div class="slot-text unit">${this._config.pressure_units?this._config.pressure_units:this.getUOM("air_pressure")}</div>`:R``;return R`
      <li>
        <div class="slot">
          <div class="slot-icon">
            <ha-icon icon="mdi:gauge"></ha-icon>
          </div>
          <div class="slot-text pressure-text">${this.currentPressure}</div>${t}
        </div>
      </li>
    `}get slotObservedMax(){const t=!0===this._config.option_today_decimals?1:0,i=this._config.entity_observed_max?Number(this.hass.states[this._config.entity_observed_max].state).toLocaleString(this.locale,{minimumFractionDigits:t,maximumFractionDigits:t}):"---",e="---"!==i?R`<div class="unit-temp-small">${this.getUOM("temperature")}</div>`:R``;return R`
      <li>
        <div class="slot">
          <div class="slot-icon">
            <ha-icon icon="mdi:thermometer-high"></ha-icon>
          </div>
          <div class="slot-text">${this.localeTextObservedMax}&nbsp;</div>
          <div class="slot-text observed-max-text">${i}</div>${e}
        </div>
      </li>
    `}get slotObservedMin(){const t=!0===this._config.option_today_decimals?1:0,i=this._config.entity_observed_min?Number(this.hass.states[this._config.entity_observed_min].state).toLocaleString(this.locale,{minimumFractionDigits:t,maximumFractionDigits:t}):"---",e="---"!==i?R`<div class="unit-temp-small">${this.getUOM("temperature")}</div>`:R``;return R`
      <li>
        <div class="slot">
          <div class="slot-icon">
            <ha-icon icon="mdi:thermometer-low"></ha-icon>
          </div>
          <div class="slot-text">${this.localeTextObservedMin}&nbsp;</div>
          <div class="slot-text observed-min-text">${i}</div>${e}
        </div>
      </li>
    `}get slotForecastMax(){const t=!0===this._config.option_today_decimals?1:0,i=this._config.entity_forecast_max?null===this._config.entity_forecast_max.match("^weather.")?Number(this.hass.states[this._config.entity_forecast_max].state).toLocaleString(this.locale,{minimumFractionDigits:t,maximumFractionDigits:t}):void 0!==this.hass.states[this._config.entity_forecast_max]&&void 0!==this.hass.states[this._config.entity_forecast_max].attributes.forecast[0].temperature?Number(this.hass.states[this._config.entity_forecast_max].attributes.forecast[0].temperature).toLocaleString(this.locale,{minimumFractionDigits:t,maximumFractionDigits:t}):"---":"---",e="---"!==i?R`<div class="unit-temp-small">${this.getUOM("temperature")}</div>`:R``;return R`
      <li>
        <div class="slot">
          <div class="slot-icon">
            <ha-icon icon="mdi:thermometer-high"></ha-icon>
          </div>
          <div class="slot-text">${this.localeTextForecastMax}&nbsp;</div>
          <div class="slot-text forecast-max-text">${i}</div>${e}
        </div>
      </li>
    `}get slotForecastMin(){const t=!0===this._config.option_today_decimals?1:0,i=this._config.entity_forecast_min?null===this._config.entity_forecast_min.match("^weather.")?Number(this.hass.states[this._config.entity_forecast_min].state).toLocaleString(this.locale,{minimumFractionDigits:t,maximumFractionDigits:t}):void 0!==this.hass.states[this._config.entity_forecast_min]&&void 0!==this.hass.states[this._config.entity_forecast_min].attributes.forecast[0].templow?Number(this.hass.states[this._config.entity_forecast_min].attributes.forecast[0].templow).toLocaleString(this.locale,{minimumFractionDigits:t,maximumFractionDigits:t}):"---":"---",e="---"!==i?R`<div class="unit-temp-small">${this.getUOM("temperature")}</div>`:R``;return R`
      <li>
        <div class="slot">
          <div class="slot-icon">
            <ha-icon icon="mdi:thermometer-low"></ha-icon>
          </div>
          <div class="slot-text">${this.localeTextForecastMin}&nbsp;</div>
          <div class="slot-text forecast-min-text">${i}</div>${e}
        </div>
      </li>
    `}get slotTempNext(){const t=!0===this._config.option_today_decimals?1:0,i=this._config.entity_temp_next_label?this.hass.states[this._config.entity_temp_next_label].state.toLowerCase().includes("min")||this.hass.states[this._config.entity_temp_next_label].state.toLowerCase().includes("low")?"mdi:thermometer-low":"mdi:thermometer-high":"mdi:help-box",e=this._config.entity_temp_next?Number(this.hass.states[this._config.entity_temp_next].state).toLocaleString(this.locale,{minimumFractionDigits:t,maximumFractionDigits:t}):"---",s=this._config.entity_temp_next_label?this.hass.states[this._config.entity_temp_next_label].state:"",o="---"!==e?R`<div class="slot-text unit-temp-small">${this.getUOM("temperature")}</div>`:R``;return R`
      <li>
        <div class="slot">
          <div class="slot-icon">
            <ha-icon icon="${i}"></ha-icon>
          </div>
          <div class="slot-text temp-next-text">${s} ${e}</div>
          ${o}
        </div>
      </li>
    `}get slotTempFollowing(){const t=!0===this._config.option_today_decimals?1:0,i=this._config.entity_temp_following_label?this.hass.states[this._config.entity_temp_following_label].state.toLowerCase().includes("min")||this.hass.states[this._config.entity_temp_following_label].state.toLowerCase().includes("low")?"mdi:thermometer-low":"mdi:thermometer-high":"mdi:help-box",e=this._config.entity_temp_following?Number(this.hass.states[this._config.entity_temp_following].state).toLocaleString(this.locale,{minimumFractionDigits:t,maximumFractionDigits:t}):"---",s=this._config.entity_temp_following_label?this.hass.states[this._config.entity_temp_following_label].state:"",o="---"!==e?R`<div class="slot-text unit-temp-small">${this.getUOM("temperature")}</div>`:R``;return R`
      <li>
        <div class="slot">
          <div class="slot-icon">
            <ha-icon icon="${i}"></ha-icon>
          </div>
          <div class="slot-text temp-following-text">${s} ${e}</div>
          ${o}
        </div>
      </li>
    `}get slotTempMaximums(){const t=!0===this._config.option_today_decimals?1:0,i=this._config.entity_observed_max?Number(this.hass.states[this._config.entity_observed_max].state).toLocaleString(this.locale,{minimumFractionDigits:t,maximumFractionDigits:t}):"---",e=this._config.entity_forecast_max?Number(this.hass.states[this._config.entity_forecast_max].state).toLocaleString(this.locale,{minimumFractionDigits:t,maximumFractionDigits:t}):"---",s="---"!==i?R`<div class="unit-temp-small">${this.getUOM("temperature")}</div>`:R``;return R`
      <li>
        <div class="slot">
          <div class="slot-icon">
            <ha-icon icon="mdi:thermometer-high"></ha-icon>
          </div>
          <div class="slot-text">${this.localeTextObsMax}&nbsp;</div>
          <div class="slot-text observed-max-text">${i}</div>${s}
          <div class="slot-text">&nbsp;(${this.localeTextFore}&nbsp;</div>
          <div class="slot-text forecast-max-text">${e}</div>${s}
          <div class="slot-text">)</div>
        </div>
      </li>
    `}get slotTempMinimums(){const t=!0===this._config.option_today_decimals?1:0,i=this._config.entity_observed_min?Number(this.hass.states[this._config.entity_observed_min].state).toLocaleString(this.locale,{minimumFractionDigits:t,maximumFractionDigits:t}):"---",e=this._config.entity_forecast_min?Number(this.hass.states[this._config.entity_forecast_min].state).toLocaleString(this.locale,{minimumFractionDigits:t,maximumFractionDigits:t}):"---",s="---"!==i?R`<div class="unit-temp-small">${this.getUOM("temperature")}</div>`:R``;return R`
      <li>
        <div class="slot">
          <div class="slot-icon">
            <ha-icon icon="mdi:thermometer-low"></ha-icon>
          </div>
          <div class="slot-text">${this.localeTextObsMin}&nbsp;</div>
          <div class="slot-text observed-min-text">${i}</div>${s}
          <div class="slot-text">&nbsp;(${this.localeTextFore}&nbsp;</div>
          <div class="slot-text forecast-min-text">${e}</div>${s}
          <div class="slot-text">)</div>
        </div>
      </li>
    `}get slotUvSummary(){const t=this._config.entity_uv_alert_summary?"unknown"!==this.hass.states[this._config.entity_uv_alert_summary].state?this.hass.states[this._config.entity_uv_alert_summary].state:"n/a":"---";return R`
      <li>
        <div class="slot">
          <div class="slot-icon">
            <ha-icon icon="mdi:weather-sunny"></ha-icon>
          </div>
          <div class="slot-text daytime-uv-text">${this.localeTextUVRating} ${t}</div>
        </div>
      </li>
    `}get slotFireSummary(){const t=this._config.entity_fire_danger_summary?"unknown"!==this.hass.states[this._config.entity_fire_danger_summary].state?this.hass.states[this._config.entity_fire_danger_summary].state:"n/a":"---";return R`
      <li>
        <div class="slot">
          <div class="slot-icon">
            <ha-icon icon="mdi:fire"></ha-icon>
          </div>
          <div class="slot-text fire-danger-text">${this.localeTextFireDanger} ${t}</div>
        </div>
      </li>`}get slotWind(){const t=this._config.entity_wind_speed&&this._config.option_show_beaufort?R`<div class="slot-text"></div>BFT: ${this.currentBeaufort} -&nbsp;</div>`:"",i=this._config.entity_wind_bearing?R`<div class="slot-text">${this.currentWindBearing}&nbsp;</div>`:"",e=R`<div class="slot-text unit">${this.getUOM("length")}/h</div>`,s=this._config.entity_wind_speed?R`<div class="slot-text">${this.currentWindSpeed}</div>${e}&nbsp;`:"",o=this._config.entity_wind_gust?R`<div class="slot-text">(Gust ${this.currentWindGust}</div>${e})`:"";return R`
      <li>
        <div class="slot">
          <div class="slot-icon">
            <ha-icon icon="mdi:weather-windy"></ha-icon>
          </div>
          ${t}${i}${s}${o}
        </div>
      </li>
    `}get slotWindKt(){const t=this._config.entity_wind_speed_kt&&this._config.option_show_beaufort?R`<div class="slot-text"></div>BFT: ${this.currentBeaufortKt} -&nbsp;</div>`:"",i=this._config.entity_wind_bearing?R`<div class="slot-text">${this.currentWindBearing}&nbsp;</div>`:"",e=R`<div class="slot-text unit">Kt</div>`,s=this._config.entity_wind_speed_kt?R`<div class="slot-text">${this.currentWindSpeedKt}</div>${e}&nbsp;`:"",o=this._config.entity_wind_gust_kt?R`<div class="slot-text">(Gust ${this.currentWindGustKt}</div>${e})`:"";return R`
      <li>
        <div class="slot">
          <div class="slot-icon">
            <ha-icon icon="mdi:weather-windy"></ha-icon>
          </div>
          ${t}${i}${s}${o}
        </div>
      </li>
    `}get slotVisibility(){const t=this.currentVisibility,i="---"!==t?this.getUOM("length"):"";return R`
      <li>
        <div class="slot-icon">
          <ha-icon icon="mdi:weather-fog"></ha-icon>
        </div>
        <div class="slot-text visibility-text">${t}</div>
        <div class="slot-text unit"> ${i}
        </div>
      </li>
    `}get slotSunNext(){return this._config.entity_sun?this.sunSet.next:R``}get slotSunFollowing(){return this._config.entity_sun?this.sunSet.following:R``}get slotCustom1(){var t=this._config.custom1_icon?this._config.custom1_icon:"mdi:help-box",i=this._config.custom1_value?this.hass.states[this._config.custom1_value].state:"unknown",e=this._config.custom1_units?this._config.custom1_units:"";return R`
      <li>
        <div class="slot-icon">
          <ha-icon icon=${t}></ha-icon>
        </div>
        <div class="slot-text custom-1-text">${i}</div><div class="slot-text unit">${e}</div>
      </li>
    `}get slotCustom2(){var t=this._config.custom2_icon?this._config.custom2_icon:"mdi:help-box",i=this._config.custom2_value?this.hass.states[this._config.custom2_value].state:"unknown",e=this._config.custom2_units?this._config.custom2_units:"";return R`
      <li>
        <div class="slot-icon">
          <ha-icon icon=${t}></ha-icon>
        </div>
        <div class="slot-text custom-2-text">${i}</div><div class="slot-text unit">${e}</div>
      </li>
    `}get slotCustom3(){var t=this._config.custom3_icon?this._config.custom3_icon:"mdi:help-box",i=this._config.custom3_value?this.hass.states[this._config.custom3_value].state:"unknown",e=this._config.custom3_units?this._config.custom3_units:"";return R`
      <li>
        <div class="slot-icon">
          <ha-icon icon=${t}></ha-icon>
        </div>
        <div class="slot-text custom-3-text">${i}</div><div class="slot-text unit">${e}</div>
      </li>
    `}get slotCustom4(){var t=this._config.custom4_icon?this._config.custom4_icon:"mdi:help-box",i=this._config.custom4_value?this.hass.states[this._config.custom4_value].state:"unknown",e=this._config.custom4_units?this._config.custom4_units:"";return R`
      <li>
        <div class="slot-icon">
          <ha-icon icon=${t}></ha-icon>
        </div>
        <div class="slot-text custom-4-text">${i}</div><div class="slot-text unit">${e}</div>
      </li>
    `}get currentConditions(){const t=this._config.entity_current_conditions;return t&&this.hass.states[t]?this.hass.states[t].state:"---"}get currentTemperature(){const t=this._config.entity_temperature;return t&&this.hass.states[t]?null===t.match("^weather.")?!0!==this._config.show_decimals?String(Math.round(Number(this.hass.states[t].state))):Number(this.hass.states[t].state).toLocaleString(this.locale):void 0!==this.hass.states[t].attributes.temperature?!0!==this._config.show_decimals?String(Math.round(Number(this.hass.states[t].attributes.temperature))):Number(this.hass.states[t].attributes.temperature).toLocaleString(this.locale):"---":"---"}get currentApparentTemperature(){const t=this._config.entity_apparent_temp;return t&&this.hass.states[t]?!0!==this._config.show_decimals?String(Math.round(Number(this.hass.states[t].state))):Number(this.hass.states[t].state).toLocaleString(this.locale):""}get currentHumidity(){const t=this._config.entity_humidity;return t&&this.hass.states[t]?null===t.match("^weather.")?Number(this.hass.states[t].state).toLocaleString(this.locale):void 0!==this.hass.states[t].attributes.humidity?Number(this.hass.states[t].attributes.humidity).toLocaleString(this.locale):"---":"---"}get currentRainfall(){const t=this._config.entity_rainfall;return t&&this.hass.states[t]?Number(this.hass.states[t].state).toLocaleString(this.locale):"---"}get currentPressure(){const t=this._config.entity_pressure;var i=this._config.option_pressure_decimals?Math.max(Math.min(this._config.option_pressure_decimals,3),0):0;return t&&this.hass.states[t]?null===t.match("^weather.")?Number(this.hass.states[t].state).toLocaleString(this.locale,{minimumFractionDigits:i,maximumFractionDigits:i}):void 0!==this.hass.states[t].attributes.pressure?Number(this.hass.states[t].attributes.pressure).toLocaleString(this.locale):"---":"---"}get currentVisibility(){const t=this._config.entity_visibility;return t&&this.hass.states[t]?null===t.match("^weather.")?Number(this.hass.states[t].state).toLocaleString(this.locale):void 0!==this.hass.states[t].attributes.visibility?Number(this.hass.states[t].attributes.visibility).toLocaleString(this.locale):"---":"---"}get currentWindBearing(){const t=this._config.entity_wind_bearing;return t&&this.hass.states[t]?null===t.match("^weather.")?isNaN(Number(this.hass.states[t].state))?this.hass.states[t].state:this.windDirections[Math.round(Number(this.hass.states[t].state)/360*16)]:void 0!==this.hass.states[t].attributes.wind_bearing?isNaN(Number(this.hass.states[t].attributes.wind_bearing))?this.hass.states[t].attributes.wind_bearing:this.windDirections[Math.round(Number(this.hass.states[t].attributes.wind_bearing)/360*16)]:"---":"---"}get currentWindSpeed(){const t=this._config.entity_wind_speed;return t&&this.hass.states[t]?null===t.match("^weather.")?Math.round(Number(this.hass.states[t].state)).toLocaleString(this.locale):void 0!==this.hass.states[t].attributes.wind_speed?Math.round(Number(this.hass.states[t].attributes.wind_speed)).toLocaleString(this.locale):"---":"---"}get currentWindGust(){const t=this._config.entity_wind_gust;return t&&this.hass.states[t]?Math.round(Number(this.hass.states[t].state)).toLocaleString(this.locale):"---"}get currentWindSpeedKt(){const t=this._config.entity_wind_speed_kt;return t&&this.hass.states[t]?null===t.match("^weather.")?Math.round(Number(this.hass.states[t].state)).toLocaleString(this.locale):void 0!==this.hass.states[t].attributes.wind_speed?Math.round(Number(this.hass.states[t].attributes.wind_speed)).toLocaleString(this.locale):"---":"---"}get currentWindGustKt(){const t=this._config.entity_wind_gust_kt;return t&&this.hass.states[t]?Math.round(Number(this.hass.states[t].state)).toLocaleString(this.locale):"---"}get windDirections(){const t=["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW","N"],i=["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSO","SO","OSO","O","ONO","NO","NNO","N"],e=["N","NNO","NO","ONO","O","OSO","SO","SSO","S","SSW","SW","WSW","W","WNW","NW","NNW","N"],s=["N","NNO","NO","ONO","O","OZO","ZO","ZZO","Z","ZZW","ZW","WZW","W","WNW","NW","NNW","N"],o=["צפון","צ-צ-מז","צפון מזרח","מז-צ-מז","מזרח","מז-ד-מז","דרום מזרח","ד-ד-מז","דרום","ד-ד-מע","דרום מערב","מע-ד-מע","מערב","מע-צ-מע","צפון מערב","צ-צ-מע","צפון"],n=["N","NNØ","NØ","ØNØ","Ø","ØSØ","SØ","SSØ","S","SSV","SV","VSV","V","VNV","NV","NNV","N"],a=["С","ССВ","СВ","ВСВ","В","ВЮВ","ЮВ","ЮЮВ","Ю","ЮЮЗ","ЮЗ","ЗЮЗ","З","ЗСЗ","СЗ","ССЗ","С"];switch(this.locale){case"it":case"fr":return i;case"de":return e;case"nl":return s;case"he":return o;case"ru":return a;case"da":return n;default:return t}}get currentBeaufort(){const t=this._config.entity_wind_speed;if(t&&this.hass.states[t]&&!isNaN(Number(this.hass.states[t].state))){const i=Number(this.hass.states[t].state);switch(this.hass.states[t].attributes.unit_of_measurement){case"mph":return i>=73?"12":i>=64?"11":i>=55?"10":i>=47?"9":i>=39?"8":i>=32?"7":i>=25?"6":i>=19?"5":i>=13?"4":i>=8?"3":i>=4?"2":i>=1?"1":"0";case"m/s":return i>=32.7?"12":i>=28.5?"11":i>=24.5?"10":i>=20.8?"9":i>=17.2?"8":i>=13.9?"7":i>=10.8?"6":i>=8?"5":i>=5.5?"4":i>=3.4?"3":i>=1.6?"2":i>=.5?"1":"0";default:return i>=118?"12":i>=103?"11":i>=89?"10":i>=75?"9":i>=62?"8":i>=50?"7":i>=39?"6":i>=29?"5":i>=20?"4":i>=12?"3":i>=6?"2":i>=2?"1":"0"}}return"---"}get currentBeaufortKt(){const t=this._config.entity_wind_speed_kt;if(t&&this.hass.states[t]&&!isNaN(Number(this.hass.states[t].state))){const i=Number(this.hass.states[t].state);return i>=64?"12":i>=56?"11":i>=48?"10":i>=41?"9":i>=34?"8":i>=28?"7":i>=22?"6":i>=17?"5":i>=11?"4":i>=7?"3":i>=4?"2":i>=1?"1":"0"}return"---"}get sunSet(){var t,i;switch(this.timeFormat){case"12hour":t=this._config.entity_sun?new Date(this.hass.states[this._config.entity_sun].attributes.next_setting).toLocaleTimeString(this.locale,{hour:"numeric",minute:"2-digit",hour12:!0}).replace(" am","am").replace(" pm","pm"):"",i=this._config.entity_sun?new Date(this.hass.states[this._config.entity_sun].attributes.next_rising).toLocaleTimeString(this.locale,{hour:"numeric",minute:"2-digit",hour12:!0}).replace(" am","am").replace(" pm","pm"):"";break;case"24hour":t=this._config.entity_sun?new Date(this.hass.states[this._config.entity_sun].attributes.next_setting).toLocaleTimeString(this.locale,{hour:"2-digit",minute:"2-digit",hour12:!1}):"",i=this._config.entity_sun?new Date(this.hass.states[this._config.entity_sun].attributes.next_rising).toLocaleTimeString(this.locale,{hour:"2-digit",minute:"2-digit",hour12:!1}):"";break;case"system":t=this._config.entity_sun?new Date(this.hass.states[this._config.entity_sun].attributes.next_setting).toLocaleTimeString(navigator.language,{timeStyle:"short"}).replace(" am","am").replace(" pm","pm"):"",i=this._config.entity_sun?new Date(this.hass.states[this._config.entity_sun].attributes.next_rising).toLocaleTimeString(navigator.language,{timeStyle:"short"}).replace(" am","am").replace(" pm","pm"):""}var e=new Date;return e.setDate(e.getDate()+1),this._config.entity_sun?"above_horizon"==this.hass.states[this._config.entity_sun].state?(i=e.toLocaleDateString(this.locale,{weekday:"short"})+" "+i,{next:R`
            <li>
              <div class="slot-icon">
                <ha-icon id="sun-next-icon" icon="mdi:weather-sunset-down"></ha-icon>
              </div>
              <div class="slot-text sun-next-text">${t}</div>
            </li>`,following:R`
            <li>
              <div class="slot-icon">
                <ha-icon id="sun-following-icon" icon="mdi:weather-sunset-up"></ha-icon>
              </div>
              <div class="slot-text sun-following-text">${i}</div>
            </li>`,nextText:t,followingText:i,nextIcon:"mdi:weather-sunset-down",followingIcon:"mdi:weather-sunset-up"}):((new Date).getDate()!=new Date(this.hass.states[this._config.entity_sun].attributes.next_rising).getDate()&&(i=e.toLocaleDateString(this.locale,{weekday:"short"})+" "+i,t=e.toLocaleDateString(this.locale,{weekday:"short"})+" "+t),{next:R`
            <li>
              <div class="slot-icon">
                <ha-icon id="sun-next-icon" icon="mdi:weather-sunset-up"></ha-icon>
              </div>
              <div class="slot-text sun-next-text">${i}</div>
            </li>`,following:R`
            <li>
              <div class="slot-icon">
                <ha-icon id="sun-following-icon" icon="mdi:weather-sunset-down"></ha-icon>
              </div>
              <div class="slot-text sun-following-text">${t}</div>
            </li>`,nextText:i,followingText:t,nextIcon:"mdi:weather-sunset-up",followingIcon:"mdi:weather-sunset-down"}):{next:R``,following:R``,nextText:"",followingText:"",nextIcon:"",followingIcon:""}}get timeFormat(){return this._config.option_time_format?this._config.option_time_format:"system"}_weatherIcon(t){switch(t){case"sunny":return this.iconSunny;case"clear":return this.iconClear;case"mostly-sunny":case"mostly_sunny":return this.iconMostlySunny;case"partly-cloudy":case"partly_cloudy":case"partlycloudy":return this.iconPartlyCloudy;case"cloudy":return this.iconCloudy;case"hazy":case"hazey":case"haze":return this.iconHazy;case"frost":return this.iconFrost;case"light-rain":case"light_rain":return this.iconLightRain;case"wind":case"windy":return this.iconWindy;case"fog":case"foggy":return this.iconFog;case"showers":case"shower":return this.iconShowers;case"rain":case"rainy":return this.iconRain;case"dust":case"dusty":return this.iconDust;case"snow":case"snowy":return this.iconSnow;case"snowy-rainy":case"snowy_rainy":case"snowyrainy":return this.iconSnowRain;case"storm":case"stormy":return this.iconStorm;case"light-showers":case"light-shower":case"light_showers":case"light_shower":return this.iconLightShowers;case"heavy-showers":case"heavy-shower":case"heavy_showers":case"heavy_shower":case"pouring":return this.iconHeavyShowers;case"tropical-cyclone":case"tropical_cyclone":case"tropicalcyclone":return this.iconCyclone;case"clear-day":case"clear_day":return this.iconClearDay;case"clear-night":case"clear_night":return this.iconClearNight;case"sleet":return this.iconSleet;case"partly-cloudy-day":case"partly_cloudy_day":return this.iconPartlyCloudyDay;case"partly-cloudy-night":case"partly_cloudy_night":return this.iconPartlyCloudyNight;case"hail":return this.iconHail;case"lightning":case"lightning-rainy":case"lightning_rainy":case"thunderstorm":return this.iconLightning;case"windy-variant":case"windy_variant":return this.iconWindyVariant}return"unknown"}get dayOrNight(){return this._config.entity_sun&&void 0!==this.hass.states[this._config.entity_sun]?{below_horizon:"night",above_horizon:"day"}[this.hass.states[this._config.entity_sun].state]:"day"}get iconStyle(){return this._config.option_icon_set?this._config.option_icon_set:"old"}get iconSunny(){const t=this.iconStyle;return"old"===t?`${this.dayOrNight}`:`sunny-${this.dayOrNight}`}get iconClear(){const t=this.iconStyle;return"old"===t?`${this.dayOrNight}`:"hybrid"===t?`sunny-${this.dayOrNight}`:`clear-${this.dayOrNight}`}get iconMostlySunny(){this.iconStyle;return`fair-${this.dayOrNight}`}get iconPartlyCloudy(){const t=this.iconStyle;return"old"===t||"hybrid"===t?`cloudy-${this.dayOrNight}-3`:`partly-cloudy-${this.dayOrNight}`}get iconCloudy(){const t=this.iconStyle;return"old"===t||"hybrid"===t?"cloudy-original":"cloudy"}get iconHazy(){const t=this.iconStyle;return"old"===t?`cloudy-${this.dayOrNight}-1`:"haze"}get iconFrost(){this.iconStyle;return`cloudy-${this.dayOrNight}-1`}get iconLightRain(){const t=this.iconStyle;return"old"===t?"rainy-1":`rainy-1-${this.dayOrNight}`}get iconWindy(){const t=this.iconStyle;return"old"===t?"cloudy-original":"wind"}get iconFog(){const t=this.iconStyle;return"old"===t?"cloudy-original":"fog"}get iconShowers(){const t=this.iconStyle;return"old"===t?"rainy-1":`rainy-1-${this.dayOrNight}`}get iconRain(){const t=this.iconStyle;return"old"===t||"hybrid"===t?"rainy-5":"rain"}get iconDust(){const t=this.iconStyle;return"old"===t?`cloudy-${this.dayOrNight}-1`:"haze"}get iconSnow(){const t=this.iconStyle;return"old"===t||"hybrid"===t?"snowy-6":"snow"}get iconSnowRain(){const t=this.iconStyle;return"old"===t?"snowy-6":"rain-and-snow-mix"}get iconStorm(){this.iconStyle;return"scattered-thunderstorms"}get iconLightShowers(){this.iconStyle;return"rainy-2"}get iconHeavyShowers(){this.iconStyle;return"rainy-6"}get iconCyclone(){this.iconStyle;return"tornado"}get iconClearDay(){const t=this.iconStyle;return"old"===t||"hybrid"===t?"day":"clear-day"}get iconClearNight(){const t=this.iconStyle;return"old"===t||"hybrid"===t?"night":"clear-night"}get iconSleet(){const t=this.iconStyle;return"old"===t?"rainy-2":"rain-and-sleet-mix"}get iconPartlyCloudyDay(){const t=this.iconStyle;return"old"===t||"hybrid"===t?"cloudy-day-3":"partly-cloudy-day"}get iconPartlyCloudyNight(){const t=this.iconStyle;return"old"===t||"hybrid"===t?"cloudy-night-3":"partly-cloudy-night"}get iconHail(){this.iconStyle;return"rainy-7"}get iconLightning(){this.iconStyle;return"thunder"}get iconWindyVariant(){this.iconStyle;return`cloudy-${this.dayOrNight}-3`}get locale(){try{return Intl.NumberFormat(this._config.option_locale),this._config.option_locale}catch(t){return}}get localeTextFeelsLike(){switch(this.locale){case"it":return"Percepito";case"fr":return"Ressenti";case"de":return"Gefühlt";case"nl":return"Voelt als";case"pl":return"Odczuwalne";case"he":return"מרגיש כמו";case"da":return"Føles som";case"ru":return"Ощущается как";case"ua":return"Відчувається як";default:return"Feels like"}}get localeTextObservedMax(){return this.locale,"Observed Max"}get localeTextObservedMin(){return this.locale,"Observed Min"}get localeTextObsMax(){return this.locale,"Obs Max"}get localeTextObsMin(){return this.locale,"Obs Min"}get localeTextForecastMax(){switch(this.locale){case"it":return"Max oggi";case"fr":return"Max aujourd'hui";case"de":return"Max heute";case"nl":return"Max vandaag";case"pl":return"Najwyższa dziś";case"he":return"מקסימלי היום";case"da":return"Højeste i dag";case"ru":return"Макс сегодня";case"ua":return"Макс сьогодні";default:return"Forecast Max"}}get localeTextForecastMin(){switch(this.locale){case"it":return"Min oggi";case"fr":return"Min aujourd'hui";case"de":return"Min heute";case"nl":return"Min vandaag";case"pl":return"Najniższa dziś";case"he":return"דקות היום";case"da":return"Laveste i dag";case"ru":return"мин сегодня";case"ua":return"Мін сьогодні";default:return"Forecast Min"}}get localeTextPosToday(){switch(this.locale){case"it":return"Previsione";case"fr":return"Prévoir";case"de":return"Vorhersage";case"nl":return"Prognose";case"pl":return"Prognoza";case"he":return"תַחֲזִית";case"da":return"Vejrudsigt";case"ru":case"ua":return"Прогноз";default:return"Forecast"}}get localeTextPosTomorrow(){switch(this.locale){case"it":return"Prev per domani";case"fr":return"Prév demain";case"de":case"nl":return"Prog morgen";case"pl":return"Prog jutro";case"he":return"תחזית מחר";case"da":return"Prog i morgen";case"ru":case"ua":return"Прогноз на завтра";default:return"Fore Tom"}}get localeTextFore(){switch(this.locale){case"it":return"Prev";case"fr":return"Prév";case"de":case"nl":case"pl":case"da":return"Prog";case"he":return"תַחֲזִית";case"ru":case"ua":return"Прогноз";default:return"Fore"}}get localeTextUVRating(){switch(this.locale){default:return"UV";case"ru":case"ua":return"УФ"}}get localeTextFireDanger(){switch(this.locale){case"it":return"Fuoco";case"fr":return"Feu";case"de":return"Feuer";case"nl":case"da":return"Brand";case"pl":return"Ogień";case"he":return"אֵשׁ";case"ru":return"Огонь";case"ua":return"Вогонь";default:return"Fire"}}getUOM(t){const i=this.hass.config.unit_system.length;switch(t){case"air_pressure":return void 0!==this._config.entity_pressure&&void 0!==this.hass.states[this._config.entity_pressure].attributes.unit_of_measurement?this.hass.states[this._config.entity_pressure].attributes.unit_of_measurement:"km"===i?"hPa":"mbar";case"length":return i;case"precipitation":return"km"===i?"mm":"in";case"intensity":return"km"===i?"mm/h":"in/h";default:return this.hass.config.unit_system[t]||""}}_showConfigWarning(t){return R`
      <hui-warning>
        <div>Weather Card</div>
        ${t.map((t=>R`<div>${t}</div>`))}
      </hui-warning>
    `}_showWarning(t){return R`<hui-warning>${t}</hui-warning>`}_showError(t){const i=document.createElement("hui-error-card");return i.setConfig({type:"error",error:t,origConfig:this._config}),R`${i}`}get styles(){const t=this._config.tooltip_bg_color||"rgb( 75,155,239)",i=this._config.tooltip_fg_color||"#fff",e=this._config.tooltip_border_color||"rgb(255,161,0)",s=this._config.tooltip_border_width||"1",o=this._config.tooltip_caret_size||"5",n=this._config.tooltip_width||"110",a=this._config.option_tooltips?"visible":"hidden",r=this._config.temp_font_weight||"300",l=this._config.temp_font_size||"4em",d=this._config.current_text_font_size||"21px",u=this._config.current_text_alignment||"center";return h`
      .card {
        padding: 8px 16px 8px 16px;
      }
      .content {
        align-items: center;
      }
      .card-header {
        font-size: 1.5em;
        color: var(--primary-text-color);
      }
      .section {
        margin: -1px;
        border: 1px solid transparent;
        padding-top: 8px;
        padding-bottom: 8px;
      }
      .title-section {
        padding-left: 8px;
      }
      .extended-section {
        padding-left: 8px;
        padding-right: 8px;
      }
      .updated {
        font-size: 0.9em;
        font-weight: 300;
        color: var(--primary-text-color);
      }
      .overview-top {
        display: flex;
        justify-content: space-between;
        flex-wrap: nowrap;
      }
      .top-left {
        display: flex;
        flex-direction: column;
        height: 8em;
      }
      .big-icon {
        height: 140px;
        width: 140px;
        position: relative;
        left: -8px;
        top: -20px;
      }
      .unknown-condition {
        position: relative;
        top: -60px;
        left: 16px;
      }
      .currentTemps {
        display: flex;
        align-self: flex-start;
        flex-direction: column;
        padding: 0px 10px;
      }
      .current-temp {
        display: table-row;
        margin-left: auto;
        padding: 4px 0px;
      }
      .temp {
        display:table-cell;
        font-weight: ${c(r)};
        font-size: ${c(l)};
        color: var(--primary-text-color);
        position: relative;
        line-height: 74%;
      }
      .unit-temp-big {
        display: table-cell;
        vertical-align: top;
        font-weight: ${c(r)};
        font-size: 1.5em;
        color: var(--primary-text-color);
        position: relative;
        line-height: 74%;
      }
      .apparent-temp {
        display: table-row;
        margin-left: auto;
        height: 24px;
      }
      .apparent {
        display: table-cell;
        color: var(--primary-text-color);
        font-weight: 300;
        position: relative;
        line-height: 24px;
      }
      .unit-temp-small {
        display: table-cell;
        vertical-align: top;
        font-size: 0.75em;
        color: var(--primary-text-color);
        position: relative;
        line-height: 1em;
        padding-top: 6px;
      }
      .line {
        margin-top : 7px;
        margin-bottom: -9px;
        color: var(--primary-text-color);
      }
      .current-text {
        font-size: ${c(d)};
        text-align: ${c(u)};
        line-height: 25px;
      }
      .variations {
        display: flex;
        flex-flow: row wrap;
        font-weight: 300;
        color: var(--primary-text-color);
        list-style: none;
        margin-block-start: 0px;
        margin-block-end: 0px;
        padding-inline-start: 8px;
      }
      .slot-list-item-1 {
        min-width:50%;
        padding-right: 16px;
      }
      .slot-list {
        list-style: none;
        padding: 0;
      }
      .slot-list li {
        height:24px;
      }
      .variations-ugly {
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
        font-weight: 300;
        color: var(--primary-text-color);
        list-style: none;
        margin-block-start: 0px;
        margin-block-end: 0px;
        padding-inline-start: 8px;
      }
      .ha-icon {
        height: 24px;
        margin-right: 5px;
        color: var(--paper-item-icon-color);
      }
      .unit {
        font-size: 0.8em;
        display: table-cell;
      }
      .slot {
        display: table-row;
      }
      .slot-icon {
        display: table-cell;
        position: relative;
        height: 18px;
        padding-right: 5px;
        color: var(--paper-item-icon-color);
      }
      .slot-text {
        display: table-cell;
        position: relative;
      }
      .daily-forecast-horiz-section {
        display: flex;
        flex-flow: row wrap;
        width: 100%;
        margin: 0 auto;
        clear: both;
      }
      .daily-forecast-horiz-section .day-horiz:nth-last-child(1) {
        border-right: none;
      }
      .day-horiz {
        flex: 1;
        float: left;
        text-align: center;
        color: var(--primary-text-color);
        border-right: .1em solid #d9d9d9;
        box-sizing: border-box;
      }
      .daily-forecast-vert-section {
        display: flex;
        flex-flow: column nowrap;
        margin: 0 auto;
        clear: both;
      }
      .day-vert {
        flex: 1;
        color: var(--primary-text-color);
        border-top: 1px solid #d9d9d9;
        line-height: 24px;
        box-sizing: border-box;
        padding-left: 8px;
        padding-right: 8px;
        padding-bottom: 8px;
      }
      .day-vert-top {
        display: flex;
        width: 100%;
      }
      .day-vert-middle {
        display: flex;
        float: left;
        width: 100%;
      }
      .day-vert-bottom {
        text-align: left;
        float: left;
      }
      .day-vert-dayicon {
        width: 40px;
        text-align: left;
        float: left;
        margin-bottom: -8px;
      }
      .day-vert-values {
        flex: 1;
        text-align: left;
        float: left;
        padding-left: 1em;
        padding-top: 0.5em;
      }
      .day-vert-minmax {
        width: 50%;
        display: table-cell;
        float: left;
      }
      .dayname {
        text-transform: uppercase;
      }
      .dayname-vert {
        min-width: 40px;
        max-width: 40px;
        text-transform: uppercase;
      }
      .icon {
        width: 50px;
        height: 50px;
        margin: auto;
        display: inline-block;
        background-size: contain;
        background-position: center center;
        background-repeat: no-repeat;
        text-indent: -9999px;
      }
      .f-slot-horiz {
        display: inline-block;
        text-align: center;
        list-style: none;
        overflow: hidden;
        font-weight: 300;
        padding: 0;
        margin-block-start: 0;
        margin-block-end: -12px;
      }
      .f-slot-horiz li {
        height:24px;
      }
      .f-summary-vert {
        padding-left: 1em;
        font-weight: 400;
      }
      .f-slot-vert {
        display: table;
        overflow: hidden;
        height: 24px;
        font-weight: 300;
      }
      .f-slot-minmax {
        width: 100%;
      }
      .f-extended {
        display: inline-table;
        font-size: 13px;
        font-weight: 300;
        padding-top: 8px;
        line-height:20px;
      }
      .extended-section .f-extended {
        padding-top: 0;
      }
      .highTemp {
        display: table-cell;
        font-weight: bold;
      }
      .lowTemp {
        display: table-cell;
        font-weight: 300;
      }
      .slash {
        padding-left: 2px;
        padding-right: 2px;
      }
      .high-temp {
        display: table-cell;
        font-weight: bold;
        width: 1.5em;
        text-align: right;
      }
      .low-temp {
        display: table-cell;
        font-weight: 300;
        width: 1.5em;
        text-align: right;
      }
      .temp-label {
        display: table-cell;
        font-weight: 300;
      }
      .f-label {
        display: table-cell;
        white-space: nowrap;
        padding-right: 0.2em;
      }
      .pop {
        display: table-cell;
        font-weight: 300;
        color: var(--primary-text-color);
      }
      .pos {
        display: table-cell;
        font-weight: 300;
        color: var(--primary-text-color);
        white-space: nowrap;
      }
      .fcasttooltip {
        position: relative;
        display: inline-block;
      }
      .fcasttooltip .fcasttooltiptext {
        visibility: hidden;
        width: ${c(n)}px;
        background-color: ${c(t)};
        color: ${c(i)};
        text-align: center;
        border-radius: 6px;
        border-style: solid;
        border-color: ${c(e)};
        border-width: ${c(s)}px;
        padding: 5px 0;
        /* Position the tooltip */
        position: absolute;
        z-index: 1;
        bottom: 100%;
        left: 50%;
        -webkit-transform: translateX(-50%); /* Safari iOS */
        transform: translateX(-50%);
      }
      .fcasttooltip .fcasttooltiptext:after {
        content: "";
        position: absolute;
        top: 100%;
        left: 50%;
        margin-left: -${c(o)}px;
        border-width: ${c(o)}px;
        border-style: solid;
        border-color: ${c(e)} transparent transparent transparent;
      }
      .fcasttooltip:hover .fcasttooltiptext {
        visibility: ${c(a)};
      }
    `}};s([rt({attribute:!1})],wt.prototype,"hass",void 0),s([lt()],wt.prototype,"_config",void 0),wt=s([nt("platinum-weather-card")],wt);export{R as $,wt as W,i as _,e as a,s as b,z as c,o as d,rt as e,nt as f,d as i,ut as l,yt as n,ct as o,h as r,st as s,lt as t,W as w};
