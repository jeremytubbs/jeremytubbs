window.sr = new ScrollReveal()
var grid = document.querySelector('.masonry')
var gallery = document.querySelector('.gallery')

if (grid) {
  var msnry;
  imagesLoaded( grid, function() {
    msnry = new Masonry( grid, {
      itemSelector: '.masonry-item',
      columnWidth: '.masonry-sizer',
      gutter: 15,
      percentPosition: true
    })
    sr.reveal('.reveal', {
      origin   : 'bottom',
      distance : '1rem',
    })
  })
}

if (gallery) {
  new imagesLoaded( gallery, function() {
    var msnry = new Masonry( gallery, {
      itemSelector: '.gallery-item',
      columnWidth: '.gallery-sizer',
      gutter: 15,
      percentPosition: true,
    })
    sr.reveal('.reveal', {
      origin   : 'bottom',
      distance : '1rem',
    })
  })
}