var grid = document.querySelector('.masonry')
var gallery = document.querySelector('.gallery')

if (grid) {
  /* show layout animation */
  new imagesLoaded( grid, function() {
    var msnry = new Masonry( grid, {
      itemSelector: '.masonry-item',
      columnWidth: '.masonry-sizer',
      percentPosition: true,
      initLayout: false,
    })
    msnry.layout()
  })
}

if (gallery) {
  new imagesLoaded( gallery, function() {
    var msnry = new Masonry( gallery, {
      itemSelector: '.gallery-item',
      columnWidth: '.gallery-sizer',
      percentPosition: true,
      initLayout: false,
    })
    msnry.layout()
  })
}