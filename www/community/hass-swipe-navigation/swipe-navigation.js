"use strict";function S(t,e){var n,a="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!a){if(Array.isArray(t)||(a=i(t)
)||e&&t&&"number"==typeof t.length)return a&&(t=a),n=0,{s:e=function(){},n:function(){return n>=t.length?{done:!0}:{done:!1,value:t[n++]}},e:function(
t){throw t},f:e};throw new TypeError(
"Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,r=!0,
s=!1;return{s:function(){a=a.call(t)},n:function(){var t=a.next();return r=t.done,t},e:function(t){s=!0,o=t},f:function(){try{
r||null==a.return||a.return()}finally{if(s)throw o}}}}function i(t,e){if(t){if("string"==typeof t)return a(t,e);var n=Object.prototype.toString.call(t
).slice(8,-1);return"Map"===(n="Object"===n&&t.constructor?t.constructor.name:n)||"Set"===n?Array.from(t
):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?a(t,e):void 0}}function a(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,
a=new Array(e);n<e;n++)a[n]=t[n];return a}function M(t){return(M="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){
return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}var n,l,c,
u=document.querySelector("home-assistant"),e=u.shadowRoot.querySelector("home-assistant-main").shadowRoot,t=e.querySelector("partial-panel-resolver"),
E=0,L={},q=[{tagname:"app-header"},{tagname:"hui-map-card"},{tagname:"ha-sidebar"},{tagname:"ha-slider"},{tagname:"g",cssClassList:["draglayer"]},{
tagname:"mushroom-slider"},{tagname:"round-slider"},{tagname:"slider-button-card"},{tagname:"swipe-card"},{tagname:"xiaomi-vacuum-map-card"}];
function y(){var t=e.querySelector("ha-panel-lovelace");t&&(L={},o(t))}function o(e){E++;try{var t=e.lovelace.config;L=t.swipe_nav||{},
n=e.shadowRoot.querySelector("hui-root"),l=n.shadowRoot.querySelector("ha-app-layout"),c=l.querySelector('[id="view"]'),r()}catch(t){E<40&&setTimeout(
function(){return o(e)},50)}}function r(){E=0;var y,f,e,n,p,d,m,a,h=l.querySelector("paper-tabs")||l.querySelector("ha-tabs"),v=h?Array.from(
h.querySelectorAll("paper-tab")):[],t="rtl"==u.style.direction,o=null!=L.animate?L.animate:"none",b=null==L.wrap||L.wrap,
r=null!=L.prevent_default&&L.prevent_default,s=null!=L.swipe_amount?L.swipe_amount/Math.pow(10,2):.15,g=null==L.skip_hidden||L.skip_hidden,
w=null!=L.skip_tabs?String(L.skip_tabs).replace(/\s+/g,"").split(",").map(function(t){return parseInt(t,10)}):[];function i(t){var e,n;
0==p&&!b&&a||p==v.length-1&&!b&&!a||("swipe"==o?(e=(a?"":"-").concat(screen.width/1.5,"px"),n=(a?"-":"").concat(screen.width/1.5,"px"),
c.style.transitionDuration="200ms",c.style.opacity=0,c.style.transform="translate(".concat(e,", 0)"),
c.style.transition="transform 0.20s, opacity 0.18s",setTimeout(function(){v[t].dispatchEvent(new MouseEvent("click",{bubbles:!1,cancelable:!0})),
c.style.transitionDuration="0ms",c.style.transform="translate(".concat(n,", 0)"),c.style.transition="transform 0s"},210),setTimeout(function(){
c.style.transitionDuration="200ms",c.style.opacity=1,c.style.transform="translate(0px, 0)",c.style.transition="transform 0.20s, opacity 0.18s"},250)
):"fade"==o?(c.style.transitionDuration="200ms",c.style.transition="opacity 0.20s",c.style.opacity=0,setTimeout(function(){v[t].dispatchEvent(
new MouseEvent("click",{bubbles:!1,cancelable:!0})),c.style.transitionDuration="0ms",c.style.opacity=0,c.style.transition="opacity 0s"},210),
setTimeout(function(){c.style.transitionDuration="200ms",c.style.transition="opacity 0.20s",c.style.opacity=1},250)):"flip"==o?(
c.style.transitionDuration="200ms",c.style.transform="rotatey(90deg)",c.style.transition="transform 0.20s, opacity 0.20s",c.style.opacity=.25,
setTimeout(function(){v[t].dispatchEvent(new MouseEvent("click",{bubbles:!1,cancelable:!0}))},210),setTimeout(function(){
c.style.transitionDuration="200ms",c.style.transform="rotatey(0deg)",c.style.transition="transform 0.20s, opacity 0.20s",c.style.opacity=1},250)
):v[t].dispatchEvent(new MouseEvent("click",{bubbles:!1,cancelable:!0})))}h&&(l.addEventListener("touchstart",function(t){if("object"==M(
t.composedPath())){var e,n=S(t.composedPath());try{for(n.s();!(e=n.n()).done;){var a=e.value;if("HUI-VIEW"==a.nodeName)break;var o,r=S(q);try{for(r.s(
);!(o=r.n()).done;){var s=o.value,i=!0;if((i=i&&null!=s.tagname&&s.tagname!=a.nodeName.toLowerCase()?!1:i)&&null!=s.cssClassList&&Array.isArray(
s.cssClassList)&&0<s.cssClassList.length){var l,c=S(s.cssClassList);try{for(c.s();!(l=c.n()).done;){var u=l.value;if(
0==a.classList.length||!a.classList.contains(u)){i=!1;break}}}catch(t){c.e(t)}finally{c.f()}}if(i)return}}catch(t){r.e(t)}finally{r.f()}}}catch(t){
n.e(t)}finally{n.f()}}y=t.touches[0].clientX,f=t.touches[0].clientY,m||function(){v=g?v.filter(function(t){return!w.includes(v.indexOf(t)
)&&"none"!=getComputedStyle(t,null).display}):v.filter(function(t){return!w.includes(v.indexOf(t))});d=b?0:null,m=b?v.length-1:null}();p=v.indexOf(
h.querySelector(".iron-selected"))},{passive:!0}),l.addEventListener("touchmove",function(t){y&&f&&(e=y-t.touches[0].clientX,n=f-t.touches[0].clientY,
Math.abs(e)>Math.abs(n)&&r&&t.preventDefault())},{passive:!1}),l.addEventListener("touchend",function(){y=f=e=n=(p<0||Math.abs(e)<Math.abs(n)||((
e=t?-e:e)>Math.abs(screen.width*s)?(a=!1,p==v.length-1?i(d):i(p+1)):e<-Math.abs(screen.width*s)&&(a=!0,i(0==p?m:p-1)),t&&(a=!a)),null)},{passive:!0}),
"swipe"==o&&(l.style.overflow="hidden"))}function s(t){d(t,"ha-panel-lovelace",f)}function f(t){d(t,"hui-root",p)}function p(t){d(t,"ha-app-layout",
null)}function d(t,e,n){var a,o=S(t);try{for(o.s();!(a=o.n()).done;){var r,s=S(a.value.addedNodes);try{for(s.s();!(r=s.n()).done;){var i=r.value;if(
i.localName==e)return void(n?new MutationObserver(n).observe(i.shadowRoot,{childList:!0}):y())}}catch(t){s.e(t)}finally{s.f()}}}catch(t){o.e(t)
}finally{o.f()}}y(),new MutationObserver(s).observe(t,{childList:!0}),console.info("%c↔️ Swipe navigation ↔️ - v1.4.0",
"color: #2980b9; font-weight: 700;");