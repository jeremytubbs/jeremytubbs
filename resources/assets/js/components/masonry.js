window.sr = new ScrollReveal()

var grid = document.querySelector('.masonry')
var gallery = document.querySelector('.gallery')

if (grid) {
  /* show layout animation */
  new imagesLoaded( grid, function() {
    var msnry = new Masonry( grid, {
      itemSelector: '.masonry-item',
      columnWidth: '.masonry-sizer',
      percentPosition: true
    })

    // layout Masonry after each image loads
    // msnry.on( 'layoutComplete', function( items ) {
    //   console.log( items.length )
    // })
  })

  sr.reveal('.reveal', {
    origin   : 'bottom',
    distance : '1rem',
  })

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
  new imagesLoaded( gallery, function() {
    var msnry = new Masonry( gallery, {
      itemSelector: '.gallery-item',
      columnWidth: '.gallery-sizer',
      percentPosition: true,
      initLayout: false,
    })
    sr.reveal('.reveal', {
      origin   : 'bottom',
      distance : '1rem',
    })
    msnry.layout()
  })
}