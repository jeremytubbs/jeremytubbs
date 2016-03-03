require('./../vendor/openseadragon/openseadragon')
require('./../vendor/openseadragon/openseadragon-viewerinputhook')

var osd_viewer = null
enableSeadragon()

var osd_thumb = document.querySelector('.osd-thumb')
if (osd_thumb) {
  osd_thumb.addEventListener('click', function(e) {
    e.preventDefault();
    var osd_source = osd_thumb.getAttribute('data-osd')
    enableSeadragon(osd_source)
  })
}

function enableSeadragon(osd_source) {
  if (! osd_viewer) {
    var container = document.querySelector('#osd-container')
    var osd_source = container.getAttribute('data-osd')
    osd_viewer = OpenSeadragon({
      id: 'osd-container',
      tileSources: osd_source,
      prefixUrl: '/images/openseadragon/images/',
      toolbar: 'osd-controls',
      zoomInButton: 'osd-in',
      zoomOutButton: 'osd-out',
      fullPageButton: 'osd-full',
      homeButton: 'osd-home',
    })
    // disable the scroll handler to enable page scrolling inside the viewer area
    osd_viewer.addViewerInputHook({hooks: [
      {tracker: 'viewer', handler: 'scrollHandler', hookHandler: onViewerScroll},
    ]})
    // zoom in a bit on image load
    osd_viewer.addHandler('open', function() {
      var zoom = osd_viewer.viewport.getZoom()
      osd_viewer.viewport.zoomTo(zoom + 0.2, null, true)
    })
  } else {
    osd_viewer.open(osd_source)
  }
}

function onViewerScroll(event) {
  // Disable mousewheel zoom on the viewer and let the original mousewheel events bubble
  if (!osd_viewer.isFullPage()) {
    event.preventDefaultAction = true
    event.stopHandlers = true
    return true
  }
}

