"use strict";function b(t,e){var n,o="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!o){if(Array.isArray(t)||(o=s(t)
)||e&&t&&"number"==typeof t.length)return o&&(t=o),n=0,{s:e=function(){},n:function(){return n>=t.length?{done:!0}:{done:!1,value:t[n++]}},e:function(
t){throw t},f:e};throw new TypeError(
"Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var r,a=!0,
i=!1;return{s:function(){o=o.call(t)},n:function(){var t=o.next();return a=t.done,t},e:function(t){i=!0,r=t},f:function(){try{
a||null==o.return||o.return()}finally{if(i)throw r}}}}function s(t,e){if(t){if("string"==typeof t)return o(t,e);var n=Object.prototype.toString.call(t
).slice(8,-1);return"Map"===(n="Object"===n&&t.constructor?t.constructor.name:n)||"Set"===n?Array.from(t
):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?o(t,e):void 0}}function o(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,
o=new Array(e);n<e;n++)o[n]=t[n];return o}function w(t){return(w="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){
return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}var n,S,g,
M=document.querySelector("home-assistant"),e=M.shadowRoot.querySelector("home-assistant-main").shadowRoot,t=e.querySelector("partial-panel-resolver"),
E=0,q={},k=["app-header","ha-sidebar","ha-slider","hui-map-card","mushroom-slider","my-slider","#plotly g.draglayer","round-slider",
"slider-button-card","swipe-card","xiaomi-vacuum-map-card"].join(",");function l(){var t=e.querySelector("ha-panel-lovelace");t&&(q={},r(t))}
function r(e){E++;try{var t=e.lovelace.config;q=t.swipe_nav||{},n=e.shadowRoot.querySelector("hui-root"),S=n.shadowRoot.querySelector("ha-app-layout")
,g=S.querySelector('[id="view"]'),a()}catch(t){E<40&&setTimeout(function(){return r(e)},50)}}function a(){E=0;var r,a,e,n,i,s,l,o,c=S.querySelector(
"paper-tabs")||S.querySelector("ha-tabs"),u=c?Array.from(c.querySelectorAll("paper-tab")):[],t="rtl"==M.style.direction,
y=null!=q.animate?q.animate:"none",f=null==q.wrap||q.wrap,p=null!=q.prevent_default&&q.prevent_default,d=null!=q.swipe_amount?q.swipe_amount/Math.pow(
10,2):.15,m=null==q.skip_hidden||q.skip_hidden,h=null!=q.skip_tabs?String(q.skip_tabs).replace(/\s+/g,"").split(",").map(function(t){return parseInt(t
,10)}):[];function v(t){var e,n;0==i&&!f&&o||i==u.length-1&&!f&&!o||("swipe"==y?(e=(o?"":"-").concat(screen.width/1.5,"px"),n=(o?"-":"").concat(
screen.width/1.5,"px"),g.style.transitionDuration="200ms",g.style.opacity=0,g.style.transform="translate(".concat(e,", 0)"),
g.style.transition="transform 0.20s, opacity 0.18s",setTimeout(function(){u[t].dispatchEvent(new MouseEvent("click",{bubbles:!1,cancelable:!0})),
g.style.transitionDuration="0ms",g.style.transform="translate(".concat(n,", 0)"),g.style.transition="transform 0s"},210),setTimeout(function(){
g.style.transitionDuration="200ms",g.style.opacity=1,g.style.transform="translate(0px, 0)",g.style.transition="transform 0.20s, opacity 0.18s"},250)
):"fade"==y?(g.style.transitionDuration="200ms",g.style.transition="opacity 0.20s",g.style.opacity=0,setTimeout(function(){u[t].dispatchEvent(
new MouseEvent("click",{bubbles:!1,cancelable:!0})),g.style.transitionDuration="0ms",g.style.opacity=0,g.style.transition="opacity 0s"},210),
setTimeout(function(){g.style.transitionDuration="200ms",g.style.transition="opacity 0.20s",g.style.opacity=1},250)):"flip"==y?(
g.style.transitionDuration="200ms",g.style.transform="rotatey(90deg)",g.style.transition="transform 0.20s, opacity 0.20s",g.style.opacity=.25,
setTimeout(function(){u[t].dispatchEvent(new MouseEvent("click",{bubbles:!1,cancelable:!0}))},210),setTimeout(function(){
g.style.transitionDuration="200ms",g.style.transform="rotatey(0deg)",g.style.transition="transform 0.20s, opacity 0.20s",g.style.opacity=1},250)
):u[t].dispatchEvent(new MouseEvent("click",{bubbles:!1,cancelable:!0})))}c&&(S.addEventListener("touchstart",function(t){if("object"==w(
t.composedPath())){var e,n=b(t.composedPath());try{for(n.s();!(e=n.n()).done;){var o=e.value;if("HUI-VIEW"==o.nodeName)break;if(o.matches&&o.matches(k
))return}}catch(t){n.e(t)}finally{n.f()}}r=t.touches[0].clientX,a=t.touches[0].clientY,l||function(){u=m?u.filter(function(t){return!h.includes(
u.indexOf(t))&&"none"!=getComputedStyle(t,null).display}):u.filter(function(t){return!h.includes(u.indexOf(t))});s=f?0:null,l=f?u.length-1:null}();
i=u.indexOf(c.querySelector(".iron-selected"))},{passive:!0}),S.addEventListener("touchmove",function(t){r&&a&&(e=r-t.touches[0].clientX,
n=a-t.touches[0].clientY,Math.abs(e)>Math.abs(n)&&p&&t.preventDefault())},{passive:!1}),S.addEventListener("touchend",function(){r=a=e=n=(
i<0||Math.abs(e)<Math.abs(n)||((e=t?-e:e)>Math.abs(screen.width*d)?(o=!1,i==u.length-1?v(s):v(i+1)):e<-Math.abs(screen.width*d)&&(o=!0,v(0==i?l:i-1)),
t&&(o=!o)),null)},{passive:!0}),"swipe"==y&&(S.style.overflow="hidden"))}function i(t){y(t,"ha-panel-lovelace",c)}function c(t){y(t,"hui-root",u)}
function u(t){y(t,"ha-app-layout",null)}function y(t,e,n){var o,r=b(t);try{for(r.s();!(o=r.n()).done;){var a,i=b(o.value.addedNodes);try{for(i.s();!(
a=i.n()).done;){var s=a.value;if(s.localName==e)return void(n?new MutationObserver(n).observe(s.shadowRoot,{childList:!0}):l())}}catch(t){i.e(t)
}finally{i.f()}}}catch(t){r.e(t)}finally{r.f()}}l(),new MutationObserver(i).observe(t,{childList:!0}),console.info("%c↔️ Swipe navigation ↔️ - v1.5.0"
,"color: #2980b9; font-weight: 700;");