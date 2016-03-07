(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

require('./core/dependencies');
require('./components/components');

},{"./components/components":3,"./core/dependencies":6}],2:[function(require,module,exports){
'use strict';

var burgerBox = document.querySelector('.burger-box');
var slidingPanel = document.querySelector('.sliding-panel');
var screenOverlay = document.querySelector('.screen-overlay');
var body = document.querySelector('body');

burgerBox.addEventListener('click', function (e) {
  e.preventDefault();
  burgerBox.classList.toggle('burger--open');
  slidingPanel.classList.toggle('sliding-panel--open');
  screenOverlay.classList.toggle('screen-overlay--visible');
  body.classList.toggle('disable-scroll');
});

screenOverlay.addEventListener('click', function (e) {
  e.preventDefault();
  burgerBox.classList.toggle('burger--open');
  slidingPanel.classList.toggle('sliding-panel--open');
  screenOverlay.classList.toggle('screen-overlay--visible');
  body.classList.toggle('disable-scroll');
});

},{}],3:[function(require,module,exports){
'use strict';

require('./burger');
require('./headroom');
require('./masonry');
//require('./openseadragon')

},{"./burger":2,"./headroom":4,"./masonry":5}],4:[function(require,module,exports){
// grab an element
"use strict";

var myElement = document.querySelector("header");
// construct an instance of Headroom, passing the element
var headroom = new Headroom(myElement);
// initialise
headroom.init();

},{}],5:[function(require,module,exports){
'use strict';

window.sr = new ScrollReveal();

var grid = document.querySelector('.masonry');
var gallery = document.querySelector('.gallery');

if (grid) {
  /* show layout animation */
  new imagesLoaded(grid, function () {
    var msnry = new Masonry(grid, {
      itemSelector: '.masonry-item',
      columnWidth: '.masonry-sizer',
      percentPosition: true
    });

    // layout Masonry after each image loads
    // msnry.on( 'layoutComplete', function( items ) {
    //   console.log( items.length )
    // })
  });

  sr.reveal('.reveal', {
    origin: 'bottom',
    distance: '1rem'
  });

  //msnry.layout()

  /* end show layout animation */

  /* wait for imagesloaded */
  // new imagesLoaded( grid, function() {
  //   var msnry = new Masonry( grid, {
  //     itemSelector: '.masonry-item',
  //     columnWidth: '.masonry-sizer',
  //     percentPosition: true,
  //     initLayout: false,
  //   })
  //   sr.reveal('.reveal', {
  //     origin   : 'bottom',
  //     distance : '1rem',
  //   })
  //   msnry.layout()
  // })
  /* end wait for images loaded */
}

if (gallery) {
  new imagesLoaded(gallery, function () {
    var msnry = new Masonry(gallery, {
      itemSelector: '.gallery-item',
      columnWidth: '.gallery-sizer',
      percentPosition: true,
      initLayout: false
    });
    sr.reveal('.reveal', {
      origin: 'bottom',
      distance: '1rem'
    });
    msnry.layout();
  });
}

},{}],6:[function(require,module,exports){
"use strict";

},{}]},{},[1]);
