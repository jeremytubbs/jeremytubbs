var Masonry = require('masonry-layout')
var imagesLoaded = require('imagesloaded')
require('scrollreveal')
window.sr = new ScrollReveal()

var grid = document.querySelector('.masonry')
var gallery = document.querySelector('.gallery')

if (grid) {
  /* show layout animation */
  // var msnry = new Masonry( grid, {
  //     itemSelector: '.masonry-item',
  //     columnWidth: '.masonry-sizer',
  //     percentPosition: true
  // })
  // new imagesLoaded( grid, function() {
  //   // layout Masonry after each image loads
  //   msnry.layout()
  // })
  /* end show layout animation */

  /* wait for imagesloaded */
  new imagesLoaded( grid, function() {
    var msnry = new Masonry( grid, {
      itemSelector: '.masonry-item',
      columnWidth: '.masonry-sizer',
      percentPosition: true
    })
    sr.reveal('.reveal', {
      origin   : 'bottom',
      distance : '1rem',
    })
  })
  /* end wait for images loaded */
}

if (gallery) {
  new imagesLoaded( gallery, function() {
    var msnry = new Masonry( gallery, {
      itemSelector: '.gallery-item',
      columnWidth: '.gallery-sizer',
      percentPosition: true
    })
    sr.reveal('.reveal', {
      origin   : 'bottom',
      distance : '1rem',
    })
  })
}