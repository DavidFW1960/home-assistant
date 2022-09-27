"use strict";function L(){L=function(){return a};var a={},t=Object.prototype,s=t.hasOwnProperty,e="function"==typeof Symbol?Symbol:{},
r=e.iterator||"@@iterator",n=e.asyncIterator||"@@asyncIterator",o=e.toStringTag||"@@toStringTag";function i(t,e,n){return Object.defineProperty(t,e,{
value:n,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{i({},"")}catch(t){i=function(t,e,n){return t[e]=n}}function l(t,e,n,r){var o,i,a,l,
e=e&&e.prototype instanceof h?e:h,e=Object.create(e.prototype),r=new b(r||[]);return e._invoke=(o=t,i=n,a=r,l="suspendedStart",function(t,e){if(
"executing"===l)throw new Error("Generator is already running");if("completed"===l){if("throw"===t)throw e;return E()}for(a.method=t,a.arg=e;;){
var n=a.delegate;if(n){n=function t(e,n){var r=e.iterator[n.method];if(void 0===r){if(n.delegate=null,"throw"===n.method){if(e.iterator.return&&(
n.method="return",n.arg=void 0,t(e,n),"throw"===n.method))return c;n.method="throw",n.arg=new TypeError(
"The iterator does not provide a 'throw' method")}return c}r=u(r,e.iterator,n.arg);if("throw"===r.type)return n.method="throw",n.arg=r.arg,
n.delegate=null,c;r=r.arg;return r?r.done?(n[e.resultName]=r.value,n.next=e.nextLoc,"return"!==n.method&&(n.method="next",n.arg=void 0),
n.delegate=null,c):r:(n.method="throw",n.arg=new TypeError("iterator result is not an object"),n.delegate=null,c)}(n,a);if(n){if(n===c)continue;
return n}}if("next"===a.method)a.sent=a._sent=a.arg;else if("throw"===a.method){if("suspendedStart"===l)throw l="completed",a.arg;a.dispatchException(
a.arg)}else"return"===a.method&&a.abrupt("return",a.arg);l="executing";n=u(o,i,a);if("normal"===n.type){if(l=a.done?"completed":"suspendedYield",
n.arg===c)continue;return{value:n.arg,done:a.done}}"throw"===n.type&&(l="completed",a.method="throw",a.arg=n.arg)}}),e}function u(t,e,n){try{return{
type:"normal",arg:t.call(e,n)}}catch(t){return{type:"throw",arg:t}}}a.wrap=l;var c={};function h(){}function f(){}function p(){}var e={},d=(i(e,r,
function(){return this}),Object.getPrototypeOf),d=d&&d(d(k([]))),v=(d&&d!==t&&s.call(d,r)&&(e=d),p.prototype=h.prototype=Object.create(e));function y(
t){["next","throw","return"].forEach(function(e){i(t,e,function(t){return this._invoke(e,t)})})}function m(a,l){var e;this._invoke=function(n,r){
function t(){return new l(function(t,e){!function e(t,n,r,o){var i,t=u(a[t],a,n);if("throw"!==t.type)return(n=(i=t.arg).value)&&"object"==N(n
)&&s.call(n,"__await")?l.resolve(n.__await).then(function(t){e("next",t,r,o)},function(t){e("throw",t,r,o)}):l.resolve(n).then(function(t){i.value=t,
r(i)},function(t){return e("throw",t,r,o)});o(t.arg)}(n,r,t,e)})}return e=e?e.then(t,t):t()}}function w(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1
]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function g(t){var e=t.completion||{};e.type="normal",delete e.arg,
t.completion=e}function b(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(w,this),this.reset(!0)}function k(e){if(e){var n,t=e[r];if(t)return t.call(e)
if("function"==typeof e.next)return e;if(!isNaN(e.length))return n=-1,(t=function t(){for(;++n<e.length;)if(s.call(e,n))return t.value=e[n],t.done=!1,
t;return t.value=void 0,t.done=!0,t}).next=t}return{next:E}}function E(){return{value:void 0,done:!0}}return i(v,"constructor",f.prototype=p),i(p,
"constructor",f),f.displayName=i(p,o,"GeneratorFunction"),a.isGeneratorFunction=function(t){t="function"==typeof t&&t.constructor;return!!t&&(
t===f||"GeneratorFunction"===(t.displayName||t.name))},a.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,p):(t.__proto__=p,i(t,o
,"GeneratorFunction")),t.prototype=Object.create(v),t},a.awrap=function(t){return{__await:t}},y(m.prototype),i(m.prototype,n,function(){return this}),
a.AsyncIterator=m,a.async=function(t,e,n,r,o){void 0===o&&(o=Promise);var i=new m(l(t,e,n,r),o);return a.isGeneratorFunction(e)?i:i.next().then(
function(t){return t.done?t.value:i.next()})},y(v),i(v,o,"Generator"),i(v,r,function(){return this}),i(v,"toString",function(){
return"[object Generator]"}),a.keys=function(n){var t,r=[];for(t in n)r.push(t);return r.reverse(),function t(){for(;r.length;){var e=r.pop();if(
e in n)return t.value=e,t.done=!1,t}return t.done=!0,t}},a.values=k,b.prototype={constructor:b,reset:function(t){if(this.prev=0,this.next=0,
this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(g),!t)for(var e in this
)"t"===e.charAt(0)&&s.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if(
"throw"===t.type)throw t.arg;return this.rval},dispatchException:function(n){if(this.done)throw n;var r=this;function t(t,e){return i.type="throw",
i.arg=n,r.next=t,e&&(r.method="next",r.arg=void 0),!!e}for(var e=this.tryEntries.length-1;0<=e;--e){var o=this.tryEntries[e],i=o.completion;if(
"root"===o.tryLoc)return t("end");if(o.tryLoc<=this.prev){var a=s.call(o,"catchLoc"),l=s.call(o,"finallyLoc");if(a&&l){if(this.prev<o.catchLoc
)return t(o.catchLoc,!0);if(this.prev<o.finallyLoc)return t(o.finallyLoc)}else if(a){if(this.prev<o.catchLoc)return t(o.catchLoc,!0)}else{if(!l
)throw new Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return t(o.finallyLoc)}}}},abrupt:function(t,e){for(
var n=this.tryEntries.length-1;0<=n;--n){var r=this.tryEntries[n];if(r.tryLoc<=this.prev&&s.call(r,"finallyLoc")&&this.prev<r.finallyLoc){var o=r;
break}}var i=(o=o&&("break"===t||"continue"===t)&&o.tryLoc<=e&&e<=o.finallyLoc?null:o)?o.completion:{};return i.type=t,i.arg=e,o?(this.method="next",
this.next=o.finallyLoc,c):this.complete(i)},complete:function(t,e){if("throw"===t.type)throw t.arg;
return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"
):"normal"===t.type&&e&&(this.next=e),c},finish:function(t){for(var e=this.tryEntries.length-1;0<=e;--e){var n=this.tryEntries[e];if(n.finallyLoc===t
)return this.complete(n.completion,n.afterLoc),g(n),c}},catch:function(t){for(var e=this.tryEntries.length-1;0<=e;--e){var n,r,o=this.tryEntries[e];
if(o.tryLoc===t)return"throw"===(n=o.completion).type&&(r=n.arg,g(o)),r}throw new Error("illegal catch attempt")},delegateYield:function(t,e,n){
return this.delegate={iterator:k(t),resultName:e,nextLoc:n},"next"===this.method&&(this.arg=void 0),c}},a}function N(t){return(
N="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){
return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function u(t,e){var n,r,o,i,
a="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(a)return r=!(n=!0),{s:function(){a=a.call(t)},n:function(){var t=a.next();
return n=t.done,t},e:function(t){r=!0,o=t},f:function(){try{n||null==a.return||a.return()}finally{if(r)throw o}}};if(Array.isArray(t)||(a=j(t)
)||e&&t&&"number"==typeof t.length)return a&&(t=a),i=0,{s:e=function(){},n:function(){return i>=t.length?{done:!0}:{done:!1,value:t[i++]}},e:function(
t){throw t},f:e};throw new TypeError(
"Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function j(t,
e){var n;if(t)return"string"==typeof t?T(t,e):"Map"===(n="Object"===(n=Object.prototype.toString.call(t).slice(8,-1)
)&&t.constructor?t.constructor.name:n)||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?T(t,e):void 0}
function T(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function I(t,e,n,r,o,i,a){try{var l=t[i](a),
s=l.value}catch(t){return void n(t)}l.done?e(s):Promise.resolve(s).then(r,o)}function G(l){return function(){var t=this,a=arguments;
return new Promise(function(e,n){var r=l.apply(t,a);function o(t){I(r,e,n,o,i,"next",t)}function i(t){I(r,e,n,o,i,"throw",t)}o(void 0)})}}function a(t
,e,n){return i(t,e),n}function o(t,e,n,r){return i(t,e),F(n,"set"),z(t,n,r),r}function r(t,e,n){return i(t,e),F(n,"get"),V(t,n)}function F(t,e){if(
void 0===t)throw new TypeError("attempted to "+e+" private static field before its declaration")}function i(t,e){if(t!==e)throw new TypeError(
"Private static access of wrong provenance")}function l(t,e){B(t,e),e.add(t)}function s(t,e,n){B(t,e),e.set(t,n)}function B(t,e){if(e.has(t)
)throw new TypeError("Cannot initialize the same private elements twice on an object")}function c(t,e){return V(t,U(t,e,"get"))}function V(t,e){
return e.get?e.get.call(t):e.value}function h(t,e,n){if(e.has(t))return n;throw new TypeError("attempted to get private field on non-instance")}
function f(t,e,n){return z(t,U(t,e,"set"),n),n}function U(t,e,n){if(e.has(t))return e.get(t);throw new TypeError(
"attempted to "+n+" private field on non-instance")}function z(t,e,n){if(e.set)e.set.call(t,n);else{if(!e.writable)throw new TypeError(
"attempted to set read only private field");e.value=n}}function p(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}
function Y(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),
Object.defineProperty(t,r.key,r)}}function t(t,e,n){return e&&Y(t.prototype,e),n&&Y(t,n),Object.defineProperty(t,"prototype",{writable:!1}),t}
function e(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var q=["app-header",
"ha-sidebar","ha-slider","hui-map-card","mushroom-slider","my-slider","#plotly g.draglayer","round-slider","slider-button-card","swipe-card",
"xiaomi-vacuum-map-card"].join(","),X="↔️ Swipe navigation:",d={_ALL:0,VERBOSE:1,DEBUG:2,INFO:3,WARN:4,ERROR:5};function v(t){n(t,d.VERBOSE)}
function y(t){n(t,d.DEBUG)}function H(t){n(t,d.INFO)}function $(t){n(t,d.WARN)}function J(t){n(t,d.ERROR)}function n(t,e){if(e>=m.logger_level){var n;
switch(e){case d.VERBOSE:n="[V]";break;case d.DEBUG:n="[D]";break;case d.INFO:n="[I]";break;case d.WARN:n="[W]";break;case d.ERROR:n="[E]";break;
default:n="[ ]"}t=X+" "+n+" "+t;e<d.ERROR?console.log(t):console.error(t)}}var m=function(){function e(){p(this,e)}return t(e,null,[{
key:"parseConfig",value:function(t){if(null!=t.animate&&(e.animate=t.animate),null!=t.wrap&&(e.wrap=t.wrap),null!=t.prevent_default&&(
e.prevent_default=t.prevent_default),null!=t.swipe_amount&&(e.swipe_amount=t.swipe_amount/100),null!=t.skip_hidden&&(e.skip_hidden=t.skip_hidden),
null!=t.skip_tabs&&(e.skip_tabs=String(t.skip_tabs).replace(/\s+/g,"").split(",").map(function(t){return parseInt(t,10)})),null!=t.logger_level
)switch(t.logger_level){case"verbose":e.logger_level=d.VERBOSE;break;case"debug":e.logger_level=d.DEBUG;break;case"info":e.logger_level=d.INFO;break;
case"warn":e.logger_level=d.WARN;break;case"error":e.logger_level=d.ERROR;break;default:e.logger_level=d.WARN,J(
'Unknown logger_level: "'+t.logger_level+'"')}else e.logger_level=d.WARN}}]),e}(),w=(e(m,"animate","none"),e(m,"wrap",!0),e(m,"prevent_default",!1),e(
m,"swipe_amount",.15),e(m,"skip_hidden",!0),e(m,"skip_tabs",[]),e(m,"logger_level",d._ALL),new WeakMap),g=new WeakMap,b=new WeakMap,k=new WeakMap,
E=new WeakMap,_=new WeakMap,S=new WeakMap,x=new WeakMap,D=new WeakSet,K=new WeakSet,Q=new WeakSet,Z=new WeakSet,tt=new WeakSet,et=new WeakSet,
nt=new WeakSet,rt=new WeakSet,R=function(){function r(t,e,n){p(this,r),l(this,rt),l(this,nt),l(this,et),l(this,tt),l(this,Z),l(this,Q),l(this,K),l(
this,D),s(this,w,{writable:!0,value:null}),s(this,g,{writable:!0,value:null}),s(this,b,{writable:!0,value:null}),s(this,k,{writable:!0,value:null}),s(
this,E,{writable:!0,value:!1}),s(this,_,{writable:!0,value:null}),s(this,S,{writable:!0,value:null}),s(this,x,{writable:!0,value:new Map}),f(this,g,t)
,f(this,b,e),f(this,k,n)}return t(r,[{key:"invalidateDomNode",value:function(){h(this,rt,ht).call(this),null!=c(this,S)&&c(this,S).call(this),f(this,w
,null)}},{key:"watchChanges",value:function(t){h(this,D,ot).call(this),f(this,_,t.onDomNodeRefreshedCallback),f(this,S,t.onDomNodeRemovedCallback)}},{
key:"getDomNode",value:function(){var t;return null==c(this,w)?h(this,tt,st).call(this):h(this,Z,lt).call(this,c(this,w))&&(y(
'Stale object in cache: "'+(null!=(t=null==(t=c(this,w))||null==(t=t.nodeName)?void 0:t.toLowerCase())?t:"unknown")+'". Invalidating...'),
this.invalidateDomNode(),this.getDomNode()),c(this,w)}},{key:"getParentNode",value:function(){var t=c(this,g)instanceof r?c(this,g).getDomNode():c(
this,g);return t=null!=t&&c(this,k)?t.shadowRoot:t}}]),r}();function ot(){c(this,E)||(f(this,E,!0),h(this,K,it).call(this))}function it(){var t;c(this
,E)&&null!=c(this,g)&&c(this,g)instanceof R&&h(t=c(this,g),Q,at).call(t,this)}function at(l){var s=this;c(this,x).has(l)||(c(this,x).set(l,
new MutationObserver(function(t){var e,n=u(t);try{for(n.s();!(e=n.n()).done;){var r,o,i,a=e.value;0<a.addedNodes.length&&(v(
a.addedNodes.length+' new element(s) appeared under "'+(null!=(r=null==(o=c(s,w))||null==(i=o.nodeName)?void 0:i.toLowerCase())?r:"unknown"
)+'". Checking...'),l.getDomNode())}}catch(t){n.e(t)}finally{n.f()}})),h(this,D,ot).call(this),h(this,nt,ct).call(this,l))}function lt(){var t;
return!(null!=(t=null==(t=c(this,w))?void 0:t.isConnected)&&t)}function st(){var t,o=this,i=this.getParentNode();f(this,w,null==i?null:function(){
var t,e=u(c(o,b));try{for(e.s();!(t=e.n()).done;){var n=t.value,r=i.querySelector(n);if(null!=r)return r}}catch(t){e.e(t)}finally{e.f()}return null}()
),null!=c(this,w)&&(y('Object refreshed: "'+(null!=(t=null==(t=c(this,w))||null==(t=t.nodeName)?void 0:t.toLowerCase())?t:"unknown")+'".'),h(this,K,it
).call(this),h(this,et,ut).call(this),null!=c(this,_)&&c(this,_).call(this))}function ut(){var t,n=this;null!=c(this,w)&&0<c(this,x).size&&(v(
"Reconnecting "+c(this,x).size+" observers to "+(null!=(t=null==(t=c(this,w))||null==(t=t.nodeName)?void 0:t.toLowerCase())?t:"unknown")),c(this,x
).forEach(function(t,e){h(n,nt,ct).call(n,e)}))}function ct(t){var e,n;null!=c(this,w)&&(e=c(this,x).get(t),n=t.getParentNode(),e.observe(n,{
childList:!0}),t.getDomNode())}function ht(){var t;0<c(this,x).size&&(v("Disconnecting "+c(this,x).size+' observers from "'+(null!=(t=null==(t=c(this,
w))||null==(t=t.nodeName)?void 0:t.toLowerCase())?t:"unknown")+'"'),c(this,x).forEach(function(t,e){t.disconnect()}))}var C=t(function t(){p(this,t)})
,O=(e(C,"ha",new R(document,["home-assistant"],!1)),e(C,"haMain",new R(C.ha,["home-assistant-main"],!0)),e(C,"partialPanelResolver",new R(C.haMain,[
"partial-panel-resolver"],!0)),e(C,"haPanelLovelace",new R(C.partialPanelResolver,["ha-panel-lovelace"],!1)),e(C,"huiRoot",new R(C.haPanelLovelace,[
"hui-root"],!0)),e(C,"haAppLayout",new R(C.huiRoot,["ha-app-layout"],!0)),e(C,"haAppLayoutView",new R(C.haAppLayout,['[id="view"]'],!1)),e(C,
"tabsContainer",new R(C.haAppLayout,["paper-tabs","ha-tabs"],!1)),function(){function n(){p(this,n)}return t(n,null,[{key:"init",value:function(){
var t,e=this;null!=(t=r(this,n,wt))&&t.abort(),null!=(t=r(this,n,gt))&&t.abort(),null!=(t=r(this,n,bt))&&t.abort(),o(this,n,wt,new AbortController),o(
this,n,gt,new AbortController),o(this,n,bt,new AbortController),C.tabsContainer.getDomNode()&&(y("Initializing SwipeManger..."),
C.haAppLayout.getDomNode().addEventListener("touchstart",function(t){a(e,n,ft).call(e,t)},{signal:r(this,n,wt).signal,passive:!0}),
C.haAppLayout.getDomNode().addEventListener("touchmove",function(t){a(e,n,pt).call(e,t)},{signal:r(this,n,gt).signal,passive:!1}),
C.haAppLayout.getDomNode().addEventListener("touchend",function(t){a(e,n,dt).call(e)},{signal:r(this,n,bt).signal,passive:!0}),"swipe"==m.animate&&(
C.haAppLayout.getDomNode().style.overflow="hidden"))}}]),n}());function ft(t){if("object"==N(t.composedPath())){var e,n=u(t.composedPath());try{for(
n.s();!(e=n.n()).done;){var r=e.value;if("HUI-VIEW"==r.nodeName)break;if(r.matches&&r.matches(q))return void y('Ignoring touch on "'+(
null!=r.nodeName?r.nodeName.toLowerCase():"unknown")+'".')}}catch(t){n.e(t)}finally{n.f()}}o(this,O,A,t.touches[0].clientX),o(this,O,P,t.touches[0
].clientY)}function pt(t){r(this,O,A)&&r(this,O,P)&&(o(this,O,M,r(this,O,A)-t.touches[0].clientX),o(this,O,W,r(this,O,P)-t.touches[0].clientY),
Math.abs(r(this,O,M))>Math.abs(r(this,O,W))&&m.prevent_default&&t.preventDefault())}function dt(){var t,e;null!=r(this,O,M)&&null!=r(this,O,W)&&(
Math.abs(r(this,O,M))<Math.abs(r(this,O,W))?y("Swipe ignored, vertical movement."):Math.abs(r(this,O,M))<Math.abs(screen.width*m.swipe_amount)?y(
"Swipe ignored, too short."):(H("Swipe detected, changing tab to the "+((t=r(this,O,M)<0)?"left":"right")+"."),e="rtl"==C.ha.getDomNode(
).style.direction,e=a(this,O,yt).call(this,e?!t:t),a(this,O,mt).call(this,e,t))),o(this,O,A,o(this,O,P,o(this,O,M,o(this,O,W,null))))}function vt(){
var t;return Array.from(null!=(t=null==(t=C.tabsContainer.getDomNode())?void 0:t.querySelectorAll("paper-tab"))?t:[])}function yt(t){var e=a(this,O,vt
).call(this),n=e.indexOf(C.tabsContainer.getDomNode().querySelector(".iron-selected")),r=n,o=null;if(-1==n
)o="Can't determine the active tab";else for(var i=t?-1:1;-1==(r+=i)?r=m.wrap?e.length-1:-1:r==e.length&&(r=m.wrap?0:-1),
r==n?o="Error, no viable tabs found for swiping.":-1==r&&(o="Edge has been reached and wrap is disabled."),null==o&&(m.skip_tabs.includes(r
)||m.skip_hidden&&"none"==getComputedStyle(e[r],null).display););return null!=o?($(o),-1):r}function mt(t,e){var n,r,o,i;-1!=t&&(
n=C.haAppLayoutView.getDomNode(),r=a(this,O,vt).call(this),"swipe"==m.animate?(o=(e?"":"-").concat(screen.width/1.5,"px"),i=(e?"-":"").concat(
screen.width/1.5,"px"),n.style.transitionDuration="200ms",n.style.opacity=0,n.style.transform="translate(".concat(o,", 0)"),
n.style.transition="transform 0.20s, opacity 0.18s",setTimeout(function(){r[t].dispatchEvent(new MouseEvent("click",{bubbles:!1,cancelable:!0})),
n.style.transitionDuration="0ms",n.style.transform="translate(".concat(i,", 0)"),n.style.transition="transform 0s"},210),setTimeout(function(){
n.style.transitionDuration="200ms",n.style.opacity=1,n.style.transform="translate(0px, 0)",n.style.transition="transform 0.20s, opacity 0.18s"},250)
):"fade"==m.animate?(n.style.transitionDuration="200ms",n.style.transition="opacity 0.20s",n.style.opacity=0,setTimeout(function(){r[t].dispatchEvent(
new MouseEvent("click",{bubbles:!1,cancelable:!0})),n.style.transitionDuration="0ms",n.style.opacity=0,n.style.transition="opacity 0s"},210),
setTimeout(function(){n.style.transitionDuration="200ms",n.style.transition="opacity 0.20s",n.style.opacity=1},250)):"flip"==m.animate?(
n.style.transitionDuration="200ms",n.style.transform="rotatey(90deg)",n.style.transition="transform 0.20s, opacity 0.20s",n.style.opacity=.25,
setTimeout(function(){r[t].dispatchEvent(new MouseEvent("click",{bubbles:!1,cancelable:!0}))},210),setTimeout(function(){
n.style.transitionDuration="200ms",n.style.transform="rotatey(0deg)",n.style.transition="transform 0.20s, opacity 0.20s",n.style.opacity=1},250)):r[t
].dispatchEvent(new MouseEvent("click",{bubbles:!1,cancelable:!0})))}var A={writable:!0,value:void 0},P={writable:!0,value:void 0},M={writable:!0,
value:void 0},W={writable:!0,value:void 0},wt={writable:!0,value:null},gt={writable:!0,value:null},bt={writable:!0,value:null};function kt(){
return Et.apply(this,arguments)}function Et(){return(Et=G(L().mark(function t(){var e,n,r;return L().wrap(function(t){for(;;)switch(t.prev=t.next){
case 0:if(e=!1,null==C.haPanelLovelace.getDomNode()){t.next=18;break}n=0;case 3:!e&&n<300?(n++,t.prev=5,r=C.haPanelLovelace.getDomNode(
).lovelace.config.swipe_nav||{},m.parseConfig(r),e=!0,t.next=16):t.next=18;break;case 11:return t.prev=11,t.t0=t.catch(5),$(
"Error while obtaining config: "+t.t0.message+". Retrying..."),t.next=16,new Promise(function(t){return setTimeout(t,100)});case 16:t.next=3;break;
case 18:if(e)return y("Configuration read."),t.abrupt("return",!0);t.next=23;break;case 23:return J("Can't read configuration."),t.abrupt("return",!1)
case 25:case"end":return t.stop()}},t,null,[[5,11]])}))).apply(this,arguments)}function Lt(){C.haPanelLovelace.watchChanges({
onDomNodeRefreshedCallback:function(){kt().then(function(t){t&&O.init()})},onDomNodeRemovedCallback:null}),kt().then(function(t){
C.haAppLayout.watchChanges({onDomNodeRefreshedCallback:function(){O.init()},onDomNodeRemovedCallback:null}),t&&null!=C.haAppLayout.getDomNode(
)&&O.init()})}Lt(),console.info("%c↔️ Swipe navigation ↔️ - v1.6.1","color: #2980b9; font-weight: 700;");