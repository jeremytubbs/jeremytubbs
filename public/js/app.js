!function e(r,t,n){function o(s,c){if(!t[s]){if(!r[s]){var l="function"==typeof require&&require;if(!c&&l)return l(s,!0);if(i)return i(s,!0);var a=new Error("Cannot find module '"+s+"'");throw a.code="MODULE_NOT_FOUND",a}var u=t[s]={exports:{}};r[s][0].call(u.exports,function(e){var t=r[s][1][e];return o(t?t:e)},u,u.exports,e,r,t,n)}return t[s].exports}for(var i="function"==typeof require&&require,s=0;s<n.length;s++)o(n[s]);return o}({1:[function(e,r,t){"use strict";e("./core/dependencies"),e("./components/components")},{"./components/components":3,"./core/dependencies":6}],2:[function(e,r,t){"use strict";var n=document.querySelector(".burger-box"),o=document.querySelector(".sliding-panel"),i=document.querySelector(".screen-overlay"),s=document.querySelector("body");n.addEventListener("click",function(e){e.preventDefault(),n.classList.toggle("burger--open"),o.classList.toggle("sliding-panel--open"),i.classList.toggle("screen-overlay--visible"),s.classList.toggle("disable-scroll")}),i.addEventListener("click",function(e){e.preventDefault(),n.classList.toggle("burger--open"),o.classList.toggle("sliding-panel--open"),i.classList.toggle("screen-overlay--visible"),s.classList.toggle("disable-scroll")})},{}],3:[function(e,r,t){"use strict";e("./burger"),e("./headroom"),e("./masonry")},{"./burger":2,"./headroom":4,"./masonry":5}],4:[function(e,r,t){"use strict";var n=document.querySelector("header"),o=new Headroom(n);o.init()},{}],5:[function(e,r,t){"use strict";window.sr=new ScrollReveal;var n=document.querySelector(".masonry"),o=document.querySelector(".gallery");if(n){var i;imagesLoaded(n,function(){i=new Masonry(n,{itemSelector:".masonry-item",columnWidth:".masonry-sizer",gutter:15,percentPosition:!0}),sr.reveal(".reveal",{origin:"bottom",distance:"1rem"})})}o&&new imagesLoaded(o,function(){new Masonry(o,{itemSelector:".gallery-item",columnWidth:".gallery-sizer",gutter:15,percentPosition:!0});sr.reveal(".reveal",{origin:"bottom",distance:"1rem"})})},{}],6:[function(e,r,t){"use strict"},{}]},{},[1]);