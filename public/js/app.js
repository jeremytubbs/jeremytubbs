(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * matchesSelector v2.0.1
 * matchesSelector( element, '.selector' )
 * MIT license
 */

/*jshint browser: true, strict: true, undef: true, unused: true */

( function( window, factory ) {
  /*global define: false, module: false */
  'use strict';
  // universal module definition
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( factory );
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory();
  } else {
    // browser global
    window.matchesSelector = factory();
  }

}( window, function factory() {
  'use strict';

  var matchesMethod = ( function() {
    var ElemProto = Element.prototype;
    // check for the standard method name first
    if ( ElemProto.matches ) {
      return 'matches';
    }
    // check un-prefixed
    if ( ElemProto.matchesSelector ) {
      return 'matchesSelector';
    }
    // check vendor prefixes
    var prefixes = [ 'webkit', 'moz', 'ms', 'o' ];

    for ( var i=0; i < prefixes.length; i++ ) {
      var prefix = prefixes[i];
      var method = prefix + 'MatchesSelector';
      if ( ElemProto[ method ] ) {
        return method;
      }
    }
  })();

  return function matchesSelector( elem, selector ) {
    return elem[ matchesMethod ]( selector );
  };

}));

},{}],2:[function(require,module,exports){
/**
 * EvEmitter v1.0.2
 * Lil' event emitter
 * MIT License
 */

/* jshint unused: true, undef: true, strict: true */

( function( global, factory ) {
  // universal module definition
  /* jshint strict: false */ /* globals define, module */
  if ( typeof define == 'function' && define.amd ) {
    // AMD - RequireJS
    define( factory );
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS - Browserify, Webpack
    module.exports = factory();
  } else {
    // Browser globals
    global.EvEmitter = factory();
  }

}( this, function() {

"use strict";

function EvEmitter() {}

var proto = EvEmitter.prototype;

proto.on = function( eventName, listener ) {
  if ( !eventName || !listener ) {
    return;
  }
  // set events hash
  var events = this._events = this._events || {};
  // set listeners array
  var listeners = events[ eventName ] = events[ eventName ] || [];
  // only add once
  if ( listeners.indexOf( listener ) == -1 ) {
    listeners.push( listener );
  }

  return this;
};

proto.once = function( eventName, listener ) {
  if ( !eventName || !listener ) {
    return;
  }
  // add event
  this.on( eventName, listener );
  // set once flag
  // set onceEvents hash
  var onceEvents = this._onceEvents = this._onceEvents || {};
  // set onceListeners object
  var onceListeners = onceEvents[ eventName ] = onceEvents[ eventName ] || {};
  // set flag
  onceListeners[ listener ] = true;

  return this;
};

proto.off = function( eventName, listener ) {
  var listeners = this._events && this._events[ eventName ];
  if ( !listeners || !listeners.length ) {
    return;
  }
  var index = listeners.indexOf( listener );
  if ( index != -1 ) {
    listeners.splice( index, 1 );
  }

  return this;
};

proto.emitEvent = function( eventName, args ) {
  var listeners = this._events && this._events[ eventName ];
  if ( !listeners || !listeners.length ) {
    return;
  }
  var i = 0;
  var listener = listeners[i];
  args = args || [];
  // once stuff
  var onceListeners = this._onceEvents && this._onceEvents[ eventName ];

  while ( listener ) {
    var isOnce = onceListeners && onceListeners[ listener ];
    if ( isOnce ) {
      // remove listener
      // remove before trigger to prevent recursion
      this.off( eventName, listener );
      // unset once flag
      delete onceListeners[ listener ];
    }
    // trigger listener
    listener.apply( this, args );
    // get next listener
    i += isOnce ? 0 : 1;
    listener = listeners[i];
  }

  return this;
};

return EvEmitter;

}));

},{}],3:[function(require,module,exports){
/**
 * Fizzy UI utils v2.0.1
 * MIT license
 */

/*jshint browser: true, undef: true, unused: true, strict: true */

( function( window, factory ) {
  // universal module definition
  /*jshint strict: false */ /*globals define, module, require */

  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( [
      'desandro-matches-selector/matches-selector'
    ], function( matchesSelector ) {
      return factory( window, matchesSelector );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('desandro-matches-selector')
    );
  } else {
    // browser global
    window.fizzyUIUtils = factory(
      window,
      window.matchesSelector
    );
  }

}( window, function factory( window, matchesSelector ) {

'use strict';

var utils = {};

// ----- extend ----- //

// extends objects
utils.extend = function( a, b ) {
  for ( var prop in b ) {
    a[ prop ] = b[ prop ];
  }
  return a;
};

// ----- modulo ----- //

utils.modulo = function( num, div ) {
  return ( ( num % div ) + div ) % div;
};

// ----- makeArray ----- //

// turn element or nodeList into an array
utils.makeArray = function( obj ) {
  var ary = [];
  if ( Array.isArray( obj ) ) {
    // use object if already an array
    ary = obj;
  } else if ( obj && typeof obj.length == 'number' ) {
    // convert nodeList to array
    for ( var i=0; i < obj.length; i++ ) {
      ary.push( obj[i] );
    }
  } else {
    // array of single index
    ary.push( obj );
  }
  return ary;
};

// ----- removeFrom ----- //

utils.removeFrom = function( ary, obj ) {
  var index = ary.indexOf( obj );
  if ( index != -1 ) {
    ary.splice( index, 1 );
  }
};

// ----- getParent ----- //

utils.getParent = function( elem, selector ) {
  while ( elem != document.body ) {
    elem = elem.parentNode;
    if ( matchesSelector( elem, selector ) ) {
      return elem;
    }
  }
};

// ----- getQueryElement ----- //

// use element as selector string
utils.getQueryElement = function( elem ) {
  if ( typeof elem == 'string' ) {
    return document.querySelector( elem );
  }
  return elem;
};

// ----- handleEvent ----- //

// enable .ontype to trigger from .addEventListener( elem, 'type' )
utils.handleEvent = function( event ) {
  var method = 'on' + event.type;
  if ( this[ method ] ) {
    this[ method ]( event );
  }
};

// ----- filterFindElements ----- //

utils.filterFindElements = function( elems, selector ) {
  // make array of elems
  elems = utils.makeArray( elems );
  var ffElems = [];

  elems.forEach( function( elem ) {
    // check that elem is an actual element
    if ( !( elem instanceof HTMLElement ) ) {
      return;
    }
    // add elem if no selector
    if ( !selector ) {
      ffElems.push( elem );
      return;
    }
    // filter & find items if we have a selector
    // filter
    if ( matchesSelector( elem, selector ) ) {
      ffElems.push( elem );
    }
    // find children
    var childElems = elem.querySelectorAll( selector );
    // concat childElems to filterFound array
    for ( var i=0; i < childElems.length; i++ ) {
      ffElems.push( childElems[i] );
    }
  });

  return ffElems;
};

// ----- debounceMethod ----- //

utils.debounceMethod = function( _class, methodName, threshold ) {
  // original method
  var method = _class.prototype[ methodName ];
  var timeoutName = methodName + 'Timeout';

  _class.prototype[ methodName ] = function() {
    var timeout = this[ timeoutName ];
    if ( timeout ) {
      clearTimeout( timeout );
    }
    var args = arguments;

    var _this = this;
    this[ timeoutName ] = setTimeout( function() {
      method.apply( _this, args );
      delete _this[ timeoutName ];
    }, threshold || 100 );
  };
};

// ----- docReady ----- //

utils.docReady = function( callback ) {
  if ( document.readyState == 'complete' ) {
    callback();
  } else {
    document.addEventListener( 'DOMContentLoaded', callback );
  }
};

// ----- htmlInit ----- //

// http://jamesroberts.name/blog/2010/02/22/string-functions-for-javascript-trim-to-camel-case-to-dashed-and-to-underscore/
utils.toDashed = function( str ) {
  return str.replace( /(.)([A-Z])/g, function( match, $1, $2 ) {
    return $1 + '-' + $2;
  }).toLowerCase();
};

var console = window.console;
/**
 * allow user to initialize classes via [data-namespace] or .js-namespace class
 * htmlInit( Widget, 'widgetName' )
 * options are parsed from data-namespace-options
 */
utils.htmlInit = function( WidgetClass, namespace ) {
  utils.docReady( function() {
    var dashedNamespace = utils.toDashed( namespace );
    var dataAttr = 'data-' + dashedNamespace;
    var dataAttrElems = document.querySelectorAll( '[' + dataAttr + ']' );
    var jsDashElems = document.querySelectorAll( '.js-' + dashedNamespace );
    var elems = utils.makeArray( dataAttrElems )
      .concat( utils.makeArray( jsDashElems ) );
    var dataOptionsAttr = dataAttr + '-options';
    var jQuery = window.jQuery;

    elems.forEach( function( elem ) {
      var attr = elem.getAttribute( dataAttr ) ||
        elem.getAttribute( dataOptionsAttr );
      var options;
      try {
        options = attr && JSON.parse( attr );
      } catch ( error ) {
        // log error, do not initialize
        if ( console ) {
          console.error( 'Error parsing ' + dataAttr + ' on ' + elem.className +
          ': ' + error );
        }
        return;
      }
      // initialize
      var instance = new WidgetClass( elem, options );
      // make available via $().data('layoutname')
      if ( jQuery ) {
        jQuery.data( elem, namespace, instance );
      }
    });

  });
};

// -----  ----- //

return utils;

}));

},{"desandro-matches-selector":1}],4:[function(require,module,exports){
/*!
 * getSize v2.0.2
 * measure size of elements
 * MIT license
 */

/*jshint browser: true, strict: true, undef: true, unused: true */
/*global define: false, module: false, console: false */

( function( window, factory ) {
  'use strict';

  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( function() {
      return factory();
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory();
  } else {
    // browser global
    window.getSize = factory();
  }

})( window, function factory() {
'use strict';

// -------------------------- helpers -------------------------- //

// get a number from a string, not a percentage
function getStyleSize( value ) {
  var num = parseFloat( value );
  // not a percent like '100%', and a number
  var isValid = value.indexOf('%') == -1 && !isNaN( num );
  return isValid && num;
}

function noop() {}

var logError = typeof console == 'undefined' ? noop :
  function( message ) {
    console.error( message );
  };

// -------------------------- measurements -------------------------- //

var measurements = [
  'paddingLeft',
  'paddingRight',
  'paddingTop',
  'paddingBottom',
  'marginLeft',
  'marginRight',
  'marginTop',
  'marginBottom',
  'borderLeftWidth',
  'borderRightWidth',
  'borderTopWidth',
  'borderBottomWidth'
];

var measurementsLength = measurements.length;

function getZeroSize() {
  var size = {
    width: 0,
    height: 0,
    innerWidth: 0,
    innerHeight: 0,
    outerWidth: 0,
    outerHeight: 0
  };
  for ( var i=0; i < measurementsLength; i++ ) {
    var measurement = measurements[i];
    size[ measurement ] = 0;
  }
  return size;
}

// -------------------------- getStyle -------------------------- //

/**
 * getStyle, get style of element, check for Firefox bug
 * https://bugzilla.mozilla.org/show_bug.cgi?id=548397
 */
function getStyle( elem ) {
  var style = getComputedStyle( elem );
  if ( !style ) {
    logError( 'Style returned ' + style +
      '. Are you running this code in a hidden iframe on Firefox? ' +
      'See http://bit.ly/getsizebug1' );
  }
  return style;
}

// -------------------------- setup -------------------------- //

var isSetup = false;

var isBoxSizeOuter;

/**
 * setup
 * check isBoxSizerOuter
 * do on first getSize() rather than on page load for Firefox bug
 */
function setup() {
  // setup once
  if ( isSetup ) {
    return;
  }
  isSetup = true;

  // -------------------------- box sizing -------------------------- //

  /**
   * WebKit measures the outer-width on style.width on border-box elems
   * IE & Firefox<29 measures the inner-width
   */
  var div = document.createElement('div');
  div.style.width = '200px';
  div.style.padding = '1px 2px 3px 4px';
  div.style.borderStyle = 'solid';
  div.style.borderWidth = '1px 2px 3px 4px';
  div.style.boxSizing = 'border-box';

  var body = document.body || document.documentElement;
  body.appendChild( div );
  var style = getStyle( div );

  getSize.isBoxSizeOuter = isBoxSizeOuter = getStyleSize( style.width ) == 200;
  body.removeChild( div );

}

// -------------------------- getSize -------------------------- //

function getSize( elem ) {
  setup();

  // use querySeletor if elem is string
  if ( typeof elem == 'string' ) {
    elem = document.querySelector( elem );
  }

  // do not proceed on non-objects
  if ( !elem || typeof elem != 'object' || !elem.nodeType ) {
    return;
  }

  var style = getStyle( elem );

  // if hidden, everything is 0
  if ( style.display == 'none' ) {
    return getZeroSize();
  }

  var size = {};
  size.width = elem.offsetWidth;
  size.height = elem.offsetHeight;

  var isBorderBox = size.isBorderBox = style.boxSizing == 'border-box';

  // get all measurements
  for ( var i=0; i < measurementsLength; i++ ) {
    var measurement = measurements[i];
    var value = style[ measurement ];
    var num = parseFloat( value );
    // any 'auto', 'medium' value will be 0
    size[ measurement ] = !isNaN( num ) ? num : 0;
  }

  var paddingWidth = size.paddingLeft + size.paddingRight;
  var paddingHeight = size.paddingTop + size.paddingBottom;
  var marginWidth = size.marginLeft + size.marginRight;
  var marginHeight = size.marginTop + size.marginBottom;
  var borderWidth = size.borderLeftWidth + size.borderRightWidth;
  var borderHeight = size.borderTopWidth + size.borderBottomWidth;

  var isBorderBoxSizeOuter = isBorderBox && isBoxSizeOuter;

  // overwrite width and height if we can get it from style
  var styleWidth = getStyleSize( style.width );
  if ( styleWidth !== false ) {
    size.width = styleWidth +
      // add padding and border unless it's already including it
      ( isBorderBoxSizeOuter ? 0 : paddingWidth + borderWidth );
  }

  var styleHeight = getStyleSize( style.height );
  if ( styleHeight !== false ) {
    size.height = styleHeight +
      // add padding and border unless it's already including it
      ( isBorderBoxSizeOuter ? 0 : paddingHeight + borderHeight );
  }

  size.innerWidth = size.width - ( paddingWidth + borderWidth );
  size.innerHeight = size.height - ( paddingHeight + borderHeight );

  size.outerWidth = size.width + marginWidth;
  size.outerHeight = size.height + marginHeight;

  return size;
}

return getSize;

});

},{}],5:[function(require,module,exports){
/*!
 * imagesLoaded v4.1.0
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

( function( window, factory ) { 'use strict';
  // universal module definition

  /*global define: false, module: false, require: false */

  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( [
      'ev-emitter/ev-emitter'
    ], function( EvEmitter ) {
      return factory( window, EvEmitter );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('ev-emitter')
    );
  } else {
    // browser global
    window.imagesLoaded = factory(
      window,
      window.EvEmitter
    );
  }

})( window,

// --------------------------  factory -------------------------- //

function factory( window, EvEmitter ) {

'use strict';

var $ = window.jQuery;
var console = window.console;

// -------------------------- helpers -------------------------- //

// extend objects
function extend( a, b ) {
  for ( var prop in b ) {
    a[ prop ] = b[ prop ];
  }
  return a;
}

// turn element or nodeList into an array
function makeArray( obj ) {
  var ary = [];
  if ( Array.isArray( obj ) ) {
    // use object if already an array
    ary = obj;
  } else if ( typeof obj.length == 'number' ) {
    // convert nodeList to array
    for ( var i=0; i < obj.length; i++ ) {
      ary.push( obj[i] );
    }
  } else {
    // array of single index
    ary.push( obj );
  }
  return ary;
}

// -------------------------- imagesLoaded -------------------------- //

/**
 * @param {Array, Element, NodeList, String} elem
 * @param {Object or Function} options - if function, use as callback
 * @param {Function} onAlways - callback function
 */
function ImagesLoaded( elem, options, onAlways ) {
  // coerce ImagesLoaded() without new, to be new ImagesLoaded()
  if ( !( this instanceof ImagesLoaded ) ) {
    return new ImagesLoaded( elem, options, onAlways );
  }
  // use elem as selector string
  if ( typeof elem == 'string' ) {
    elem = document.querySelectorAll( elem );
  }

  this.elements = makeArray( elem );
  this.options = extend( {}, this.options );

  if ( typeof options == 'function' ) {
    onAlways = options;
  } else {
    extend( this.options, options );
  }

  if ( onAlways ) {
    this.on( 'always', onAlways );
  }

  this.getImages();

  if ( $ ) {
    // add jQuery Deferred object
    this.jqDeferred = new $.Deferred();
  }

  // HACK check async to allow time to bind listeners
  setTimeout( function() {
    this.check();
  }.bind( this ));
}

ImagesLoaded.prototype = Object.create( EvEmitter.prototype );

ImagesLoaded.prototype.options = {};

ImagesLoaded.prototype.getImages = function() {
  this.images = [];

  // filter & find items if we have an item selector
  this.elements.forEach( this.addElementImages, this );
};

/**
 * @param {Node} element
 */
ImagesLoaded.prototype.addElementImages = function( elem ) {
  // filter siblings
  if ( elem.nodeName == 'IMG' ) {
    this.addImage( elem );
  }
  // get background image on element
  if ( this.options.background === true ) {
    this.addElementBackgroundImages( elem );
  }

  // find children
  // no non-element nodes, #143
  var nodeType = elem.nodeType;
  if ( !nodeType || !elementNodeTypes[ nodeType ] ) {
    return;
  }
  var childImgs = elem.querySelectorAll('img');
  // concat childElems to filterFound array
  for ( var i=0; i < childImgs.length; i++ ) {
    var img = childImgs[i];
    this.addImage( img );
  }

  // get child background images
  if ( typeof this.options.background == 'string' ) {
    var children = elem.querySelectorAll( this.options.background );
    for ( i=0; i < children.length; i++ ) {
      var child = children[i];
      this.addElementBackgroundImages( child );
    }
  }
};

var elementNodeTypes = {
  1: true,
  9: true,
  11: true
};

ImagesLoaded.prototype.addElementBackgroundImages = function( elem ) {
  var style = getComputedStyle( elem );
  if ( !style ) {
    // Firefox returns null if in a hidden iframe https://bugzil.la/548397
    return;
  }
  // get url inside url("...")
  var reURL = /url\((['"])?(.*?)\1\)/gi;
  var matches = reURL.exec( style.backgroundImage );
  while ( matches !== null ) {
    var url = matches && matches[2];
    if ( url ) {
      this.addBackground( url, elem );
    }
    matches = reURL.exec( style.backgroundImage );
  }
};

/**
 * @param {Image} img
 */
ImagesLoaded.prototype.addImage = function( img ) {
  var loadingImage = new LoadingImage( img );
  this.images.push( loadingImage );
};

ImagesLoaded.prototype.addBackground = function( url, elem ) {
  var background = new Background( url, elem );
  this.images.push( background );
};

ImagesLoaded.prototype.check = function() {
  var _this = this;
  this.progressedCount = 0;
  this.hasAnyBroken = false;
  // complete if no images
  if ( !this.images.length ) {
    this.complete();
    return;
  }

  function onProgress( image, elem, message ) {
    // HACK - Chrome triggers event before object properties have changed. #83
    setTimeout( function() {
      _this.progress( image, elem, message );
    });
  }

  this.images.forEach( function( loadingImage ) {
    loadingImage.once( 'progress', onProgress );
    loadingImage.check();
  });
};

ImagesLoaded.prototype.progress = function( image, elem, message ) {
  this.progressedCount++;
  this.hasAnyBroken = this.hasAnyBroken || !image.isLoaded;
  // progress event
  this.emitEvent( 'progress', [ this, image, elem ] );
  if ( this.jqDeferred && this.jqDeferred.notify ) {
    this.jqDeferred.notify( this, image );
  }
  // check if completed
  if ( this.progressedCount == this.images.length ) {
    this.complete();
  }

  if ( this.options.debug && console ) {
    console.log( 'progress: ' + message, image, elem );
  }
};

ImagesLoaded.prototype.complete = function() {
  var eventName = this.hasAnyBroken ? 'fail' : 'done';
  this.isComplete = true;
  this.emitEvent( eventName, [ this ] );
  this.emitEvent( 'always', [ this ] );
  if ( this.jqDeferred ) {
    var jqMethod = this.hasAnyBroken ? 'reject' : 'resolve';
    this.jqDeferred[ jqMethod ]( this );
  }
};

// --------------------------  -------------------------- //

function LoadingImage( img ) {
  this.img = img;
}

LoadingImage.prototype = Object.create( EvEmitter.prototype );

LoadingImage.prototype.check = function() {
  // If complete is true and browser supports natural sizes,
  // try to check for image status manually.
  var isComplete = this.getIsImageComplete();
  if ( isComplete ) {
    // report based on naturalWidth
    this.confirm( this.img.naturalWidth !== 0, 'naturalWidth' );
    return;
  }

  // If none of the checks above matched, simulate loading on detached element.
  this.proxyImage = new Image();
  this.proxyImage.addEventListener( 'load', this );
  this.proxyImage.addEventListener( 'error', this );
  // bind to image as well for Firefox. #191
  this.img.addEventListener( 'load', this );
  this.img.addEventListener( 'error', this );
  this.proxyImage.src = this.img.src;
};

LoadingImage.prototype.getIsImageComplete = function() {
  return this.img.complete && this.img.naturalWidth !== undefined;
};

LoadingImage.prototype.confirm = function( isLoaded, message ) {
  this.isLoaded = isLoaded;
  this.emitEvent( 'progress', [ this, this.img, message ] );
};

// ----- events ----- //

// trigger specified handler for event type
LoadingImage.prototype.handleEvent = function( event ) {
  var method = 'on' + event.type;
  if ( this[ method ] ) {
    this[ method ]( event );
  }
};

LoadingImage.prototype.onload = function() {
  this.confirm( true, 'onload' );
  this.unbindEvents();
};

LoadingImage.prototype.onerror = function() {
  this.confirm( false, 'onerror' );
  this.unbindEvents();
};

LoadingImage.prototype.unbindEvents = function() {
  this.proxyImage.removeEventListener( 'load', this );
  this.proxyImage.removeEventListener( 'error', this );
  this.img.removeEventListener( 'load', this );
  this.img.removeEventListener( 'error', this );
};

// -------------------------- Background -------------------------- //

function Background( url, element ) {
  this.url = url;
  this.element = element;
  this.img = new Image();
}

// inherit LoadingImage prototype
Background.prototype = Object.create( LoadingImage.prototype );

Background.prototype.check = function() {
  this.img.addEventListener( 'load', this );
  this.img.addEventListener( 'error', this );
  this.img.src = this.url;
  // check if image is already complete
  var isComplete = this.getIsImageComplete();
  if ( isComplete ) {
    this.confirm( this.img.naturalWidth !== 0, 'naturalWidth' );
    this.unbindEvents();
  }
};

Background.prototype.unbindEvents = function() {
  this.img.removeEventListener( 'load', this );
  this.img.removeEventListener( 'error', this );
};

Background.prototype.confirm = function( isLoaded, message ) {
  this.isLoaded = isLoaded;
  this.emitEvent( 'progress', [ this, this.element, message ] );
};

// -------------------------- jQuery -------------------------- //

ImagesLoaded.makeJQueryPlugin = function( jQuery ) {
  jQuery = jQuery || window.jQuery;
  if ( !jQuery ) {
    return;
  }
  // set local variable
  $ = jQuery;
  // $().imagesLoaded()
  $.fn.imagesLoaded = function( options, callback ) {
    var instance = new ImagesLoaded( this, options, callback );
    return instance.jqDeferred.promise( $(this) );
  };
};
// try making plugin
ImagesLoaded.makeJQueryPlugin();

// --------------------------  -------------------------- //

return ImagesLoaded;

});

},{"ev-emitter":2}],6:[function(require,module,exports){
/*!
 * Masonry v4.0.0
 * Cascading grid layout library
 * http://masonry.desandro.com
 * MIT License
 * by David DeSandro
 */

( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */ /*globals define, module, require */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( [
        'outlayer/outlayer',
        'get-size/get-size'
      ],
      factory );
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      require('outlayer'),
      require('get-size')
    );
  } else {
    // browser global
    window.Masonry = factory(
      window.Outlayer,
      window.getSize
    );
  }

}( window, function factory( Outlayer, getSize ) {

'use strict';

// -------------------------- masonryDefinition -------------------------- //

  // create an Outlayer layout class
  var Masonry = Outlayer.create('masonry');
  // isFitWidth -> fitWidth
  Masonry.compatOptions.fitWidth = 'isFitWidth';

  Masonry.prototype._resetLayout = function() {
    this.getSize();
    this._getMeasurement( 'columnWidth', 'outerWidth' );
    this._getMeasurement( 'gutter', 'outerWidth' );
    this.measureColumns();

    // reset column Y
    this.colYs = [];
    for ( var i=0; i < this.cols; i++ ) {
      this.colYs.push( 0 );
    }

    this.maxY = 0;
  };

  Masonry.prototype.measureColumns = function() {
    this.getContainerWidth();
    // if columnWidth is 0, default to outerWidth of first item
    if ( !this.columnWidth ) {
      var firstItem = this.items[0];
      var firstItemElem = firstItem && firstItem.element;
      // columnWidth fall back to item of first element
      this.columnWidth = firstItemElem && getSize( firstItemElem ).outerWidth ||
        // if first elem has no width, default to size of container
        this.containerWidth;
    }

    var columnWidth = this.columnWidth += this.gutter;

    // calculate columns
    var containerWidth = this.containerWidth + this.gutter;
    var cols = containerWidth / columnWidth;
    // fix rounding errors, typically with gutters
    var excess = columnWidth - containerWidth % columnWidth;
    // if overshoot is less than a pixel, round up, otherwise floor it
    var mathMethod = excess && excess < 1 ? 'round' : 'floor';
    cols = Math[ mathMethod ]( cols );
    this.cols = Math.max( cols, 1 );
  };

  Masonry.prototype.getContainerWidth = function() {
    // container is parent if fit width
    var isFitWidth = this._getOption('fitWidth');
    var container = isFitWidth ? this.element.parentNode : this.element;
    // check that this.size and size are there
    // IE8 triggers resize on body size change, so they might not be
    var size = getSize( container );
    this.containerWidth = size && size.innerWidth;
  };

  Masonry.prototype._getItemLayoutPosition = function( item ) {
    item.getSize();
    // how many columns does this brick span
    var remainder = item.size.outerWidth % this.columnWidth;
    var mathMethod = remainder && remainder < 1 ? 'round' : 'ceil';
    // round if off by 1 pixel, otherwise use ceil
    var colSpan = Math[ mathMethod ]( item.size.outerWidth / this.columnWidth );
    colSpan = Math.min( colSpan, this.cols );

    var colGroup = this._getColGroup( colSpan );
    // get the minimum Y value from the columns
    var minimumY = Math.min.apply( Math, colGroup );
    var shortColIndex = colGroup.indexOf( minimumY );

    // position the brick
    var position = {
      x: this.columnWidth * shortColIndex,
      y: minimumY
    };

    // apply setHeight to necessary columns
    var setHeight = minimumY + item.size.outerHeight;
    var setSpan = this.cols + 1 - colGroup.length;
    for ( var i = 0; i < setSpan; i++ ) {
      this.colYs[ shortColIndex + i ] = setHeight;
    }

    return position;
  };

  /**
   * @param {Number} colSpan - number of columns the element spans
   * @returns {Array} colGroup
   */
  Masonry.prototype._getColGroup = function( colSpan ) {
    if ( colSpan < 2 ) {
      // if brick spans only one column, use all the column Ys
      return this.colYs;
    }

    var colGroup = [];
    // how many different places could this brick fit horizontally
    var groupCount = this.cols + 1 - colSpan;
    // for each group potential horizontal position
    for ( var i = 0; i < groupCount; i++ ) {
      // make an array of colY values for that one group
      var groupColYs = this.colYs.slice( i, i + colSpan );
      // and get the max value of the array
      colGroup[i] = Math.max.apply( Math, groupColYs );
    }
    return colGroup;
  };

  Masonry.prototype._manageStamp = function( stamp ) {
    var stampSize = getSize( stamp );
    var offset = this._getElementOffset( stamp );
    // get the columns that this stamp affects
    var isOriginLeft = this._getOption('originLeft');
    var firstX = isOriginLeft ? offset.left : offset.right;
    var lastX = firstX + stampSize.outerWidth;
    var firstCol = Math.floor( firstX / this.columnWidth );
    firstCol = Math.max( 0, firstCol );
    var lastCol = Math.floor( lastX / this.columnWidth );
    // lastCol should not go over if multiple of columnWidth #425
    lastCol -= lastX % this.columnWidth ? 0 : 1;
    lastCol = Math.min( this.cols - 1, lastCol );
    // set colYs to bottom of the stamp

    var isOriginTop = this._getOption('originTop');
    var stampMaxY = ( isOriginTop ? offset.top : offset.bottom ) +
      stampSize.outerHeight;
    for ( var i = firstCol; i <= lastCol; i++ ) {
      this.colYs[i] = Math.max( stampMaxY, this.colYs[i] );
    }
  };

  Masonry.prototype._getContainerSize = function() {
    this.maxY = Math.max.apply( Math, this.colYs );
    var size = {
      height: this.maxY
    };

    if ( this._getOption('fitWidth') ) {
      size.width = this._getContainerFitWidth();
    }

    return size;
  };

  Masonry.prototype._getContainerFitWidth = function() {
    var unusedCols = 0;
    // count unused columns
    var i = this.cols;
    while ( --i ) {
      if ( this.colYs[i] !== 0 ) {
        break;
      }
      unusedCols++;
    }
    // fit container to columns that have been used
    return ( this.cols - unusedCols ) * this.columnWidth - this.gutter;
  };

  Masonry.prototype.needsResizeLayout = function() {
    var previousWidth = this.containerWidth;
    this.getContainerWidth();
    return previousWidth != this.containerWidth;
  };

  return Masonry;

}));

},{"get-size":4,"outlayer":8}],7:[function(require,module,exports){
/**
 * Outlayer Item
 */

( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */ /* globals define, module, require */
  if ( typeof define == 'function' && define.amd ) {
    // AMD - RequireJS
    define( [
        'ev-emitter/ev-emitter',
        'get-size/get-size'
      ],
      factory
    );
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS - Browserify, Webpack
    module.exports = factory(
      require('ev-emitter'),
      require('get-size')
    );
  } else {
    // browser global
    window.Outlayer = {};
    window.Outlayer.Item = factory(
      window.EvEmitter,
      window.getSize
    );
  }

}( window, function factory( EvEmitter, getSize ) {
'use strict';

// ----- helpers ----- //

function isEmptyObj( obj ) {
  for ( var prop in obj ) {
    return false;
  }
  prop = null;
  return true;
}

// -------------------------- CSS3 support -------------------------- //


var docElemStyle = document.documentElement.style;

var transitionProperty = typeof docElemStyle.transition == 'string' ?
  'transition' : 'WebkitTransition';
var transformProperty = typeof docElemStyle.transform == 'string' ?
  'transform' : 'WebkitTransform';

var transitionEndEvent = {
  WebkitTransition: 'webkitTransitionEnd',
  transition: 'transitionend'
}[ transitionProperty ];

// cache all vendor properties that could have vendor prefix
var vendorProperties = {
  transform: transformProperty,
  transition: transitionProperty,
  transitionDuration: transitionProperty + 'Duration',
  transitionProperty: transitionProperty + 'Property'
};

// -------------------------- Item -------------------------- //

function Item( element, layout ) {
  if ( !element ) {
    return;
  }

  this.element = element;
  // parent layout class, i.e. Masonry, Isotope, or Packery
  this.layout = layout;
  this.position = {
    x: 0,
    y: 0
  };

  this._create();
}

// inherit EvEmitter
var proto = Item.prototype = Object.create( EvEmitter.prototype );
proto.constructor = Item;

proto._create = function() {
  // transition objects
  this._transn = {
    ingProperties: {},
    clean: {},
    onEnd: {}
  };

  this.css({
    position: 'absolute'
  });
};

// trigger specified handler for event type
proto.handleEvent = function( event ) {
  var method = 'on' + event.type;
  if ( this[ method ] ) {
    this[ method ]( event );
  }
};

proto.getSize = function() {
  this.size = getSize( this.element );
};

/**
 * apply CSS styles to element
 * @param {Object} style
 */
proto.css = function( style ) {
  var elemStyle = this.element.style;

  for ( var prop in style ) {
    // use vendor property if available
    var supportedProp = vendorProperties[ prop ] || prop;
    elemStyle[ supportedProp ] = style[ prop ];
  }
};

 // measure position, and sets it
proto.getPosition = function() {
  var style = getComputedStyle( this.element );
  var isOriginLeft = this.layout._getOption('originLeft');
  var isOriginTop = this.layout._getOption('originTop');
  var xValue = style[ isOriginLeft ? 'left' : 'right' ];
  var yValue = style[ isOriginTop ? 'top' : 'bottom' ];
  // convert percent to pixels
  var layoutSize = this.layout.size;
  var x = xValue.indexOf('%') != -1 ?
    ( parseFloat( xValue ) / 100 ) * layoutSize.width : parseInt( xValue, 10 );
  var y = yValue.indexOf('%') != -1 ?
    ( parseFloat( yValue ) / 100 ) * layoutSize.height : parseInt( yValue, 10 );

  // clean up 'auto' or other non-integer values
  x = isNaN( x ) ? 0 : x;
  y = isNaN( y ) ? 0 : y;
  // remove padding from measurement
  x -= isOriginLeft ? layoutSize.paddingLeft : layoutSize.paddingRight;
  y -= isOriginTop ? layoutSize.paddingTop : layoutSize.paddingBottom;

  this.position.x = x;
  this.position.y = y;
};

// set settled position, apply padding
proto.layoutPosition = function() {
  var layoutSize = this.layout.size;
  var style = {};
  var isOriginLeft = this.layout._getOption('originLeft');
  var isOriginTop = this.layout._getOption('originTop');

  // x
  var xPadding = isOriginLeft ? 'paddingLeft' : 'paddingRight';
  var xProperty = isOriginLeft ? 'left' : 'right';
  var xResetProperty = isOriginLeft ? 'right' : 'left';

  var x = this.position.x + layoutSize[ xPadding ];
  // set in percentage or pixels
  style[ xProperty ] = this.getXValue( x );
  // reset other property
  style[ xResetProperty ] = '';

  // y
  var yPadding = isOriginTop ? 'paddingTop' : 'paddingBottom';
  var yProperty = isOriginTop ? 'top' : 'bottom';
  var yResetProperty = isOriginTop ? 'bottom' : 'top';

  var y = this.position.y + layoutSize[ yPadding ];
  // set in percentage or pixels
  style[ yProperty ] = this.getYValue( y );
  // reset other property
  style[ yResetProperty ] = '';

  this.css( style );
  this.emitEvent( 'layout', [ this ] );
};

proto.getXValue = function( x ) {
  var isHorizontal = this.layout._getOption('horizontal');
  return this.layout.options.percentPosition && !isHorizontal ?
    ( ( x / this.layout.size.width ) * 100 ) + '%' : x + 'px';
};

proto.getYValue = function( y ) {
  var isHorizontal = this.layout._getOption('horizontal');
  return this.layout.options.percentPosition && isHorizontal ?
    ( ( y / this.layout.size.height ) * 100 ) + '%' : y + 'px';
};

proto._transitionTo = function( x, y ) {
  this.getPosition();
  // get current x & y from top/left
  var curX = this.position.x;
  var curY = this.position.y;

  var compareX = parseInt( x, 10 );
  var compareY = parseInt( y, 10 );
  var didNotMove = compareX === this.position.x && compareY === this.position.y;

  // save end position
  this.setPosition( x, y );

  // if did not move and not transitioning, just go to layout
  if ( didNotMove && !this.isTransitioning ) {
    this.layoutPosition();
    return;
  }

  var transX = x - curX;
  var transY = y - curY;
  var transitionStyle = {};
  transitionStyle.transform = this.getTranslate( transX, transY );

  this.transition({
    to: transitionStyle,
    onTransitionEnd: {
      transform: this.layoutPosition
    },
    isCleaning: true
  });
};

proto.getTranslate = function( x, y ) {
  // flip cooridinates if origin on right or bottom
  var isOriginLeft = this.layout._getOption('originLeft');
  var isOriginTop = this.layout._getOption('originTop');
  x = isOriginLeft ? x : -x;
  y = isOriginTop ? y : -y;
  return 'translate3d(' + x + 'px, ' + y + 'px, 0)';
};

// non transition + transform support
proto.goTo = function( x, y ) {
  this.setPosition( x, y );
  this.layoutPosition();
};

proto.moveTo = proto._transitionTo;

proto.setPosition = function( x, y ) {
  this.position.x = parseInt( x, 10 );
  this.position.y = parseInt( y, 10 );
};

// ----- transition ----- //

/**
 * @param {Object} style - CSS
 * @param {Function} onTransitionEnd
 */

// non transition, just trigger callback
proto._nonTransition = function( args ) {
  this.css( args.to );
  if ( args.isCleaning ) {
    this._removeStyles( args.to );
  }
  for ( var prop in args.onTransitionEnd ) {
    args.onTransitionEnd[ prop ].call( this );
  }
};

/**
 * proper transition
 * @param {Object} args - arguments
 *   @param {Object} to - style to transition to
 *   @param {Object} from - style to start transition from
 *   @param {Boolean} isCleaning - removes transition styles after transition
 *   @param {Function} onTransitionEnd - callback
 */
proto.transition = function( args ) {
  // redirect to nonTransition if no transition duration
  if ( !parseFloat( this.layout.options.transitionDuration ) ) {
    this._nonTransition( args );
    return;
  }

  var _transition = this._transn;
  // keep track of onTransitionEnd callback by css property
  for ( var prop in args.onTransitionEnd ) {
    _transition.onEnd[ prop ] = args.onTransitionEnd[ prop ];
  }
  // keep track of properties that are transitioning
  for ( prop in args.to ) {
    _transition.ingProperties[ prop ] = true;
    // keep track of properties to clean up when transition is done
    if ( args.isCleaning ) {
      _transition.clean[ prop ] = true;
    }
  }

  // set from styles
  if ( args.from ) {
    this.css( args.from );
    // force redraw. http://blog.alexmaccaw.com/css-transitions
    var h = this.element.offsetHeight;
    // hack for JSHint to hush about unused var
    h = null;
  }
  // enable transition
  this.enableTransition( args.to );
  // set styles that are transitioning
  this.css( args.to );

  this.isTransitioning = true;

};

// dash before all cap letters, including first for
// WebkitTransform => -webkit-transform
function toDashedAll( str ) {
  return str.replace( /([A-Z])/g, function( $1 ) {
    return '-' + $1.toLowerCase();
  });
}

var transitionProps = 'opacity,' + toDashedAll( transformProperty );

proto.enableTransition = function(/* style */) {
  // HACK changing transitionProperty during a transition
  // will cause transition to jump
  if ( this.isTransitioning ) {
    return;
  }

  // make `transition: foo, bar, baz` from style object
  // HACK un-comment this when enableTransition can work
  // while a transition is happening
  // var transitionValues = [];
  // for ( var prop in style ) {
  //   // dash-ify camelCased properties like WebkitTransition
  //   prop = vendorProperties[ prop ] || prop;
  //   transitionValues.push( toDashedAll( prop ) );
  // }
  // enable transition styles
  this.css({
    transitionProperty: transitionProps,
    transitionDuration: this.layout.options.transitionDuration
  });
  // listen for transition end event
  this.element.addEventListener( transitionEndEvent, this, false );
};

// ----- events ----- //

proto.onwebkitTransitionEnd = function( event ) {
  this.ontransitionend( event );
};

proto.onotransitionend = function( event ) {
  this.ontransitionend( event );
};

// properties that I munge to make my life easier
var dashedVendorProperties = {
  '-webkit-transform': 'transform'
};

proto.ontransitionend = function( event ) {
  // disregard bubbled events from children
  if ( event.target !== this.element ) {
    return;
  }
  var _transition = this._transn;
  // get property name of transitioned property, convert to prefix-free
  var propertyName = dashedVendorProperties[ event.propertyName ] || event.propertyName;

  // remove property that has completed transitioning
  delete _transition.ingProperties[ propertyName ];
  // check if any properties are still transitioning
  if ( isEmptyObj( _transition.ingProperties ) ) {
    // all properties have completed transitioning
    this.disableTransition();
  }
  // clean style
  if ( propertyName in _transition.clean ) {
    // clean up style
    this.element.style[ event.propertyName ] = '';
    delete _transition.clean[ propertyName ];
  }
  // trigger onTransitionEnd callback
  if ( propertyName in _transition.onEnd ) {
    var onTransitionEnd = _transition.onEnd[ propertyName ];
    onTransitionEnd.call( this );
    delete _transition.onEnd[ propertyName ];
  }

  this.emitEvent( 'transitionEnd', [ this ] );
};

proto.disableTransition = function() {
  this.removeTransitionStyles();
  this.element.removeEventListener( transitionEndEvent, this, false );
  this.isTransitioning = false;
};

/**
 * removes style property from element
 * @param {Object} style
**/
proto._removeStyles = function( style ) {
  // clean up transition styles
  var cleanStyle = {};
  for ( var prop in style ) {
    cleanStyle[ prop ] = '';
  }
  this.css( cleanStyle );
};

var cleanTransitionStyle = {
  transitionProperty: '',
  transitionDuration: ''
};

proto.removeTransitionStyles = function() {
  // remove transition
  this.css( cleanTransitionStyle );
};

// ----- show/hide/remove ----- //

// remove element from DOM
proto.removeElem = function() {
  this.element.parentNode.removeChild( this.element );
  // remove display: none
  this.css({ display: '' });
  this.emitEvent( 'remove', [ this ] );
};

proto.remove = function() {
  // just remove element if no transition support or no transition
  if ( !transitionProperty || !parseFloat( this.layout.options.transitionDuration ) ) {
    this.removeElem();
    return;
  }

  // start transition
  this.once( 'transitionEnd', function() {
    this.removeElem();
  });
  this.hide();
};

proto.reveal = function() {
  delete this.isHidden;
  // remove display: none
  this.css({ display: '' });

  var options = this.layout.options;

  var onTransitionEnd = {};
  var transitionEndProperty = this.getHideRevealTransitionEndProperty('visibleStyle');
  onTransitionEnd[ transitionEndProperty ] = this.onRevealTransitionEnd;

  this.transition({
    from: options.hiddenStyle,
    to: options.visibleStyle,
    isCleaning: true,
    onTransitionEnd: onTransitionEnd
  });
};

proto.onRevealTransitionEnd = function() {
  // check if still visible
  // during transition, item may have been hidden
  if ( !this.isHidden ) {
    this.emitEvent('reveal');
  }
};

/**
 * get style property use for hide/reveal transition end
 * @param {String} styleProperty - hiddenStyle/visibleStyle
 * @returns {String}
 */
proto.getHideRevealTransitionEndProperty = function( styleProperty ) {
  var optionStyle = this.layout.options[ styleProperty ];
  // use opacity
  if ( optionStyle.opacity ) {
    return 'opacity';
  }
  // get first property
  for ( var prop in optionStyle ) {
    return prop;
  }
};

proto.hide = function() {
  // set flag
  this.isHidden = true;
  // remove display: none
  this.css({ display: '' });

  var options = this.layout.options;

  var onTransitionEnd = {};
  var transitionEndProperty = this.getHideRevealTransitionEndProperty('hiddenStyle');
  onTransitionEnd[ transitionEndProperty ] = this.onHideTransitionEnd;

  this.transition({
    from: options.visibleStyle,
    to: options.hiddenStyle,
    // keep hidden stuff hidden
    isCleaning: true,
    onTransitionEnd: onTransitionEnd
  });
};

proto.onHideTransitionEnd = function() {
  // check if still hidden
  // during transition, item may have been un-hidden
  if ( this.isHidden ) {
    this.css({ display: 'none' });
    this.emitEvent('hide');
  }
};

proto.destroy = function() {
  this.css({
    position: '',
    left: '',
    right: '',
    top: '',
    bottom: '',
    transition: '',
    transform: ''
  });
};

return Item;

}));

},{"ev-emitter":2,"get-size":4}],8:[function(require,module,exports){
/*!
 * Outlayer v2.0.1
 * the brains and guts of a layout library
 * MIT license
 */

( function( window, factory ) {
  'use strict';
  // universal module definition
  /* jshint strict: false */ /* globals define, module, require */
  if ( typeof define == 'function' && define.amd ) {
    // AMD - RequireJS
    define( [
        'ev-emitter/ev-emitter',
        'get-size/get-size',
        'fizzy-ui-utils/utils',
        './item'
      ],
      function( EvEmitter, getSize, utils, Item ) {
        return factory( window, EvEmitter, getSize, utils, Item);
      }
    );
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS - Browserify, Webpack
    module.exports = factory(
      window,
      require('ev-emitter'),
      require('get-size'),
      require('fizzy-ui-utils'),
      require('./item')
    );
  } else {
    // browser global
    window.Outlayer = factory(
      window,
      window.EvEmitter,
      window.getSize,
      window.fizzyUIUtils,
      window.Outlayer.Item
    );
  }

}( window, function factory( window, EvEmitter, getSize, utils, Item ) {
'use strict';

// ----- vars ----- //

var console = window.console;
var jQuery = window.jQuery;
var noop = function() {};

// -------------------------- Outlayer -------------------------- //

// globally unique identifiers
var GUID = 0;
// internal store of all Outlayer intances
var instances = {};


/**
 * @param {Element, String} element
 * @param {Object} options
 * @constructor
 */
function Outlayer( element, options ) {
  var queryElement = utils.getQueryElement( element );
  if ( !queryElement ) {
    if ( console ) {
      console.error( 'Bad element for ' + this.constructor.namespace +
        ': ' + ( queryElement || element ) );
    }
    return;
  }
  this.element = queryElement;
  // add jQuery
  if ( jQuery ) {
    this.$element = jQuery( this.element );
  }

  // options
  this.options = utils.extend( {}, this.constructor.defaults );
  this.option( options );

  // add id for Outlayer.getFromElement
  var id = ++GUID;
  this.element.outlayerGUID = id; // expando
  instances[ id ] = this; // associate via id

  // kick it off
  this._create();

  var isInitLayout = this._getOption('initLayout');
  if ( isInitLayout ) {
    this.layout();
  }
}

// settings are for internal use only
Outlayer.namespace = 'outlayer';
Outlayer.Item = Item;

// default options
Outlayer.defaults = {
  containerStyle: {
    position: 'relative'
  },
  initLayout: true,
  originLeft: true,
  originTop: true,
  resize: true,
  resizeContainer: true,
  // item options
  transitionDuration: '0.4s',
  hiddenStyle: {
    opacity: 0,
    transform: 'scale(0.001)'
  },
  visibleStyle: {
    opacity: 1,
    transform: 'scale(1)'
  }
};

var proto = Outlayer.prototype;
// inherit EvEmitter
utils.extend( proto, EvEmitter.prototype );

/**
 * set options
 * @param {Object} opts
 */
proto.option = function( opts ) {
  utils.extend( this.options, opts );
};

/**
 * get backwards compatible option value, check old name
 */
proto._getOption = function( option ) {
  var oldOption = this.constructor.compatOptions[ option ];
  return oldOption && this.options[ oldOption ] !== undefined ?
    this.options[ oldOption ] : this.options[ option ];
};

Outlayer.compatOptions = {
  // currentName: oldName
  initLayout: 'isInitLayout',
  horizontal: 'isHorizontal',
  layoutInstant: 'isLayoutInstant',
  originLeft: 'isOriginLeft',
  originTop: 'isOriginTop',
  resize: 'isResizeBound',
  resizeContainer: 'isResizingContainer'
};

proto._create = function() {
  // get items from children
  this.reloadItems();
  // elements that affect layout, but are not laid out
  this.stamps = [];
  this.stamp( this.options.stamp );
  // set container style
  utils.extend( this.element.style, this.options.containerStyle );

  // bind resize method
  var canBindResize = this._getOption('resize');
  if ( canBindResize ) {
    this.bindResize();
  }
};

// goes through all children again and gets bricks in proper order
proto.reloadItems = function() {
  // collection of item elements
  this.items = this._itemize( this.element.children );
};


/**
 * turn elements into Outlayer.Items to be used in layout
 * @param {Array or NodeList or HTMLElement} elems
 * @returns {Array} items - collection of new Outlayer Items
 */
proto._itemize = function( elems ) {

  var itemElems = this._filterFindItemElements( elems );
  var Item = this.constructor.Item;

  // create new Outlayer Items for collection
  var items = [];
  for ( var i=0; i < itemElems.length; i++ ) {
    var elem = itemElems[i];
    var item = new Item( elem, this );
    items.push( item );
  }

  return items;
};

/**
 * get item elements to be used in layout
 * @param {Array or NodeList or HTMLElement} elems
 * @returns {Array} items - item elements
 */
proto._filterFindItemElements = function( elems ) {
  return utils.filterFindElements( elems, this.options.itemSelector );
};

/**
 * getter method for getting item elements
 * @returns {Array} elems - collection of item elements
 */
proto.getItemElements = function() {
  return this.items.map( function( item ) {
    return item.element;
  });
};

// ----- init & layout ----- //

/**
 * lays out all items
 */
proto.layout = function() {
  this._resetLayout();
  this._manageStamps();

  // don't animate first layout
  var layoutInstant = this._getOption('layoutInstant');
  var isInstant = layoutInstant !== undefined ?
    layoutInstant : !this._isLayoutInited;
  this.layoutItems( this.items, isInstant );

  // flag for initalized
  this._isLayoutInited = true;
};

// _init is alias for layout
proto._init = proto.layout;

/**
 * logic before any new layout
 */
proto._resetLayout = function() {
  this.getSize();
};


proto.getSize = function() {
  this.size = getSize( this.element );
};

/**
 * get measurement from option, for columnWidth, rowHeight, gutter
 * if option is String -> get element from selector string, & get size of element
 * if option is Element -> get size of element
 * else use option as a number
 *
 * @param {String} measurement
 * @param {String} size - width or height
 * @private
 */
proto._getMeasurement = function( measurement, size ) {
  var option = this.options[ measurement ];
  var elem;
  if ( !option ) {
    // default to 0
    this[ measurement ] = 0;
  } else {
    // use option as an element
    if ( typeof option == 'string' ) {
      elem = this.element.querySelector( option );
    } else if ( option instanceof HTMLElement ) {
      elem = option;
    }
    // use size of element, if element
    this[ measurement ] = elem ? getSize( elem )[ size ] : option;
  }
};

/**
 * layout a collection of item elements
 * @api public
 */
proto.layoutItems = function( items, isInstant ) {
  items = this._getItemsForLayout( items );

  this._layoutItems( items, isInstant );

  this._postLayout();
};

/**
 * get the items to be laid out
 * you may want to skip over some items
 * @param {Array} items
 * @returns {Array} items
 */
proto._getItemsForLayout = function( items ) {
  return items.filter( function( item ) {
    return !item.isIgnored;
  });
};

/**
 * layout items
 * @param {Array} items
 * @param {Boolean} isInstant
 */
proto._layoutItems = function( items, isInstant ) {
  this._emitCompleteOnItems( 'layout', items );

  if ( !items || !items.length ) {
    // no items, emit event with empty array
    return;
  }

  var queue = [];

  items.forEach( function( item ) {
    // get x/y object from method
    var position = this._getItemLayoutPosition( item );
    // enqueue
    position.item = item;
    position.isInstant = isInstant || item.isLayoutInstant;
    queue.push( position );
  }, this );

  this._processLayoutQueue( queue );
};

/**
 * get item layout position
 * @param {Outlayer.Item} item
 * @returns {Object} x and y position
 */
proto._getItemLayoutPosition = function( /* item */ ) {
  return {
    x: 0,
    y: 0
  };
};

/**
 * iterate over array and position each item
 * Reason being - separating this logic prevents 'layout invalidation'
 * thx @paul_irish
 * @param {Array} queue
 */
proto._processLayoutQueue = function( queue ) {
  queue.forEach( function( obj ) {
    this._positionItem( obj.item, obj.x, obj.y, obj.isInstant );
  }, this );
};

/**
 * Sets position of item in DOM
 * @param {Outlayer.Item} item
 * @param {Number} x - horizontal position
 * @param {Number} y - vertical position
 * @param {Boolean} isInstant - disables transitions
 */
proto._positionItem = function( item, x, y, isInstant ) {
  if ( isInstant ) {
    // if not transition, just set CSS
    item.goTo( x, y );
  } else {
    item.moveTo( x, y );
  }
};

/**
 * Any logic you want to do after each layout,
 * i.e. size the container
 */
proto._postLayout = function() {
  this.resizeContainer();
};

proto.resizeContainer = function() {
  var isResizingContainer = this._getOption('resizeContainer');
  if ( !isResizingContainer ) {
    return;
  }
  var size = this._getContainerSize();
  if ( size ) {
    this._setContainerMeasure( size.width, true );
    this._setContainerMeasure( size.height, false );
  }
};

/**
 * Sets width or height of container if returned
 * @returns {Object} size
 *   @param {Number} width
 *   @param {Number} height
 */
proto._getContainerSize = noop;

/**
 * @param {Number} measure - size of width or height
 * @param {Boolean} isWidth
 */
proto._setContainerMeasure = function( measure, isWidth ) {
  if ( measure === undefined ) {
    return;
  }

  var elemSize = this.size;
  // add padding and border width if border box
  if ( elemSize.isBorderBox ) {
    measure += isWidth ? elemSize.paddingLeft + elemSize.paddingRight +
      elemSize.borderLeftWidth + elemSize.borderRightWidth :
      elemSize.paddingBottom + elemSize.paddingTop +
      elemSize.borderTopWidth + elemSize.borderBottomWidth;
  }

  measure = Math.max( measure, 0 );
  this.element.style[ isWidth ? 'width' : 'height' ] = measure + 'px';
};

/**
 * emit eventComplete on a collection of items events
 * @param {String} eventName
 * @param {Array} items - Outlayer.Items
 */
proto._emitCompleteOnItems = function( eventName, items ) {
  var _this = this;
  function onComplete() {
    _this.dispatchEvent( eventName + 'Complete', null, [ items ] );
  }

  var count = items.length;
  if ( !items || !count ) {
    onComplete();
    return;
  }

  var doneCount = 0;
  function tick() {
    doneCount++;
    if ( doneCount == count ) {
      onComplete();
    }
  }

  // bind callback
  items.forEach( function( item ) {
    item.once( eventName, tick );
  });
};

/**
 * emits events via EvEmitter and jQuery events
 * @param {String} type - name of event
 * @param {Event} event - original event
 * @param {Array} args - extra arguments
 */
proto.dispatchEvent = function( type, event, args ) {
  // add original event to arguments
  var emitArgs = event ? [ event ].concat( args ) : args;
  this.emitEvent( type, emitArgs );

  if ( jQuery ) {
    // set this.$element
    this.$element = this.$element || jQuery( this.element );
    if ( event ) {
      // create jQuery event
      var $event = jQuery.Event( event );
      $event.type = type;
      this.$element.trigger( $event, args );
    } else {
      // just trigger with type if no event available
      this.$element.trigger( type, args );
    }
  }
};

// -------------------------- ignore & stamps -------------------------- //


/**
 * keep item in collection, but do not lay it out
 * ignored items do not get skipped in layout
 * @param {Element} elem
 */
proto.ignore = function( elem ) {
  var item = this.getItem( elem );
  if ( item ) {
    item.isIgnored = true;
  }
};

/**
 * return item to layout collection
 * @param {Element} elem
 */
proto.unignore = function( elem ) {
  var item = this.getItem( elem );
  if ( item ) {
    delete item.isIgnored;
  }
};

/**
 * adds elements to stamps
 * @param {NodeList, Array, Element, or String} elems
 */
proto.stamp = function( elems ) {
  elems = this._find( elems );
  if ( !elems ) {
    return;
  }

  this.stamps = this.stamps.concat( elems );
  // ignore
  elems.forEach( this.ignore, this );
};

/**
 * removes elements to stamps
 * @param {NodeList, Array, or Element} elems
 */
proto.unstamp = function( elems ) {
  elems = this._find( elems );
  if ( !elems ){
    return;
  }

  elems.forEach( function( elem ) {
    // filter out removed stamp elements
    utils.removeFrom( this.stamps, elem );
    this.unignore( elem );
  }, this );
};

/**
 * finds child elements
 * @param {NodeList, Array, Element, or String} elems
 * @returns {Array} elems
 */
proto._find = function( elems ) {
  if ( !elems ) {
    return;
  }
  // if string, use argument as selector string
  if ( typeof elems == 'string' ) {
    elems = this.element.querySelectorAll( elems );
  }
  elems = utils.makeArray( elems );
  return elems;
};

proto._manageStamps = function() {
  if ( !this.stamps || !this.stamps.length ) {
    return;
  }

  this._getBoundingRect();

  this.stamps.forEach( this._manageStamp, this );
};

// update boundingLeft / Top
proto._getBoundingRect = function() {
  // get bounding rect for container element
  var boundingRect = this.element.getBoundingClientRect();
  var size = this.size;
  this._boundingRect = {
    left: boundingRect.left + size.paddingLeft + size.borderLeftWidth,
    top: boundingRect.top + size.paddingTop + size.borderTopWidth,
    right: boundingRect.right - ( size.paddingRight + size.borderRightWidth ),
    bottom: boundingRect.bottom - ( size.paddingBottom + size.borderBottomWidth )
  };
};

/**
 * @param {Element} stamp
**/
proto._manageStamp = noop;

/**
 * get x/y position of element relative to container element
 * @param {Element} elem
 * @returns {Object} offset - has left, top, right, bottom
 */
proto._getElementOffset = function( elem ) {
  var boundingRect = elem.getBoundingClientRect();
  var thisRect = this._boundingRect;
  var size = getSize( elem );
  var offset = {
    left: boundingRect.left - thisRect.left - size.marginLeft,
    top: boundingRect.top - thisRect.top - size.marginTop,
    right: thisRect.right - boundingRect.right - size.marginRight,
    bottom: thisRect.bottom - boundingRect.bottom - size.marginBottom
  };
  return offset;
};

// -------------------------- resize -------------------------- //

// enable event handlers for listeners
// i.e. resize -> onresize
proto.handleEvent = utils.handleEvent;

/**
 * Bind layout to window resizing
 */
proto.bindResize = function() {
  window.addEventListener( 'resize', this );
  this.isResizeBound = true;
};

/**
 * Unbind layout to window resizing
 */
proto.unbindResize = function() {
  window.removeEventListener( 'resize', this );
  this.isResizeBound = false;
};

proto.onresize = function() {
  this.resize();
};

utils.debounceMethod( Outlayer, 'onresize', 100 );

proto.resize = function() {
  // don't trigger if size did not change
  // or if resize was unbound. See #9
  if ( !this.isResizeBound || !this.needsResizeLayout() ) {
    return;
  }

  this.layout();
};

/**
 * check if layout is needed post layout
 * @returns Boolean
 */
proto.needsResizeLayout = function() {
  var size = getSize( this.element );
  // check that this.size and size are there
  // IE8 triggers resize on body size change, so they might not be
  var hasSizes = this.size && size;
  return hasSizes && size.innerWidth !== this.size.innerWidth;
};

// -------------------------- methods -------------------------- //

/**
 * add items to Outlayer instance
 * @param {Array or NodeList or Element} elems
 * @returns {Array} items - Outlayer.Items
**/
proto.addItems = function( elems ) {
  var items = this._itemize( elems );
  // add items to collection
  if ( items.length ) {
    this.items = this.items.concat( items );
  }
  return items;
};

/**
 * Layout newly-appended item elements
 * @param {Array or NodeList or Element} elems
 */
proto.appended = function( elems ) {
  var items = this.addItems( elems );
  if ( !items.length ) {
    return;
  }
  // layout and reveal just the new items
  this.layoutItems( items, true );
  this.reveal( items );
};

/**
 * Layout prepended elements
 * @param {Array or NodeList or Element} elems
 */
proto.prepended = function( elems ) {
  var items = this._itemize( elems );
  if ( !items.length ) {
    return;
  }
  // add items to beginning of collection
  var previousItems = this.items.slice(0);
  this.items = items.concat( previousItems );
  // start new layout
  this._resetLayout();
  this._manageStamps();
  // layout new stuff without transition
  this.layoutItems( items, true );
  this.reveal( items );
  // layout previous items
  this.layoutItems( previousItems );
};

/**
 * reveal a collection of items
 * @param {Array of Outlayer.Items} items
 */
proto.reveal = function( items ) {
  this._emitCompleteOnItems( 'reveal', items );
  if ( !items || !items.length ) {
    return;
  }
  items.forEach( function( item ) {
    item.reveal();
  });
};

/**
 * hide a collection of items
 * @param {Array of Outlayer.Items} items
 */
proto.hide = function( items ) {
  this._emitCompleteOnItems( 'hide', items );
  if ( !items || !items.length ) {
    return;
  }
  items.forEach( function( item ) {
    item.hide();
  });
};

/**
 * reveal item elements
 * @param {Array}, {Element}, {NodeList} items
 */
proto.revealItemElements = function( elems ) {
  var items = this.getItems( elems );
  this.reveal( items );
};

/**
 * hide item elements
 * @param {Array}, {Element}, {NodeList} items
 */
proto.hideItemElements = function( elems ) {
  var items = this.getItems( elems );
  this.hide( items );
};

/**
 * get Outlayer.Item, given an Element
 * @param {Element} elem
 * @param {Function} callback
 * @returns {Outlayer.Item} item
 */
proto.getItem = function( elem ) {
  // loop through items to get the one that matches
  for ( var i=0; i < this.items.length; i++ ) {
    var item = this.items[i];
    if ( item.element == elem ) {
      // return item
      return item;
    }
  }
};

/**
 * get collection of Outlayer.Items, given Elements
 * @param {Array} elems
 * @returns {Array} items - Outlayer.Items
 */
proto.getItems = function( elems ) {
  elems = utils.makeArray( elems );
  var items = [];
  elems.forEach( function( elem ) {
    var item = this.getItem( elem );
    if ( item ) {
      items.push( item );
    }
  }, this );

  return items;
};

/**
 * remove element(s) from instance and DOM
 * @param {Array or NodeList or Element} elems
 */
proto.remove = function( elems ) {
  var removeItems = this.getItems( elems );

  this._emitCompleteOnItems( 'remove', removeItems );

  // bail if no items to remove
  if ( !removeItems || !removeItems.length ) {
    return;
  }

  removeItems.forEach( function( item ) {
    item.remove();
    // remove item from collection
    utils.removeFrom( this.items, item );
  }, this );
};

// ----- destroy ----- //

// remove and disable Outlayer instance
proto.destroy = function() {
  // clean up dynamic styles
  var style = this.element.style;
  style.height = '';
  style.position = '';
  style.width = '';
  // destroy items
  this.items.forEach( function( item ) {
    item.destroy();
  });

  this.unbindResize();

  var id = this.element.outlayerGUID;
  delete instances[ id ]; // remove reference to instance by id
  delete this.element.outlayerGUID;
  // remove data for jQuery
  if ( jQuery ) {
    jQuery.removeData( this.element, this.constructor.namespace );
  }

};

// -------------------------- data -------------------------- //

/**
 * get Outlayer instance from element
 * @param {Element} elem
 * @returns {Outlayer}
 */
Outlayer.data = function( elem ) {
  elem = utils.getQueryElement( elem );
  var id = elem && elem.outlayerGUID;
  return id && instances[ id ];
};


// -------------------------- create Outlayer class -------------------------- //

/**
 * create a layout class
 * @param {String} namespace
 */
Outlayer.create = function( namespace, options ) {
  // sub-class Outlayer
  var Layout = subclass( Outlayer );
  // apply new options and compatOptions
  Layout.defaults = utils.extend( {}, Outlayer.defaults );
  utils.extend( Layout.defaults, options );
  Layout.compatOptions = utils.extend( {}, Outlayer.compatOptions  );

  Layout.namespace = namespace;

  Layout.data = Outlayer.data;

  // sub-class Item
  Layout.Item = subclass( Item );

  // -------------------------- declarative -------------------------- //

  utils.htmlInit( Layout, namespace );

  // -------------------------- jQuery bridge -------------------------- //

  // make into jQuery plugin
  if ( jQuery && jQuery.bridget ) {
    jQuery.bridget( namespace, Layout );
  }

  return Layout;
};

function subclass( Parent ) {
  function SubClass() {
    Parent.apply( this, arguments );
  }

  SubClass.prototype = Object.create( Parent.prototype );
  SubClass.prototype.constructor = SubClass;

  return SubClass;
}

// ----- fin ----- //

// back in global
Outlayer.Item = Item;

return Outlayer;

}));

},{"./item":7,"ev-emitter":2,"fizzy-ui-utils":3,"get-size":4}],9:[function(require,module,exports){

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require, exports, module);
  } else {
    root.ScrollReveal = factory();
  }
}(this, function(require, exports, module) {

/*
            _____                 ________                       __
           / ___/______________  / / / __ \___ _   _____  ____ _/ /
           \__ \/ ___/ ___/ __ \/ / / /_/ / _ \ | / / _ \/ __ `/ /
          ___/ / /__/ /  / /_/ / / / _, _/  __/ |/ /  __/ /_/ / /
         /____/\___/_/   \____/_/_/_/ |_|\___/|___/\___/\__,_/_/    v3.0.9

‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
   Copyright 2014–2016 Julian Lloyd (@jlmakes) Open source under MIT license
————————————————————————————————————————————————————————————————————————————————
    https://scrollrevealjs.org — https://github.com/jlmakes/scrollreveal.js
______________________________________________________________________________*/

(function(){
  var Tools, sr, _requestAnimationFrame;
  this.ScrollReveal = (function(){

    ScrollReveal.prototype.defaults = {

      // Configuration
      // -------------
      // This object signature can be passed directly to the ScrollReveal
      // constructor, or as the second argument of the reveal() method.

      //            'bottom', 'left', 'top', 'right'
      origin      : 'bottom',

      //            Can be any valid CSS distance, e.g.
      //            '5rem', '10%', '20vw', etc.
      distance    : '20px',

      //            Time in milliseconds.
      duration    : 500,
      delay       : 0,

      //            Starting angles in degrees, will transition from these
      //            values to 0 in all axes.
      rotate      : { x : 0, y : 0, z : 0 },

      //            Starting opacity value, will transition from this value to
      //            the elements computed opacity.
      opacity     : 0,

      //            Starting scale value, will transition from this value to 1
      scale       : 0.9,

      //            Accepts any valid CSS easing, e.g.
      //            'ease', 'ease-in-out', 'linear', etc.
      easing      : 'cubic-bezier( 0.6, 0.2, 0.1, 1 )',

      //            When null, `<html>` is assumed to be the reveal container.
      //            You can pass a DOM node as a custom container, e.g.
      //            document.querySelector('.fooContainer');
      container   : null,

      //            true/false to control reveal animations on mobile.
      mobile      : true,

      //            true:  reveals occur every time elements become visible
      //            false: reveals occur once as elements become visible
      reset       : false,

      //            'always' — delay for all reveal animations
      //            'once'   — delay only the first time reveals occur
      //            'onload' - delay only for animations triggered by first load
      useDelay    : 'always',

      //            Change when an element is considered in the viewport.
      //            The default value of 0.20 means 20% of an element must be
      //            visible for its reveal to occur.
      viewFactor  : 0.2,

      //            Pixel values that alter the container boundaries. e.g.
      //            Set `{ top: 48 }`, if you have a 48px tall fixed toolbar.
      //            --
      //            Visual Aid: https://scrollrevealjs.org/assets/viewoffset.png
      viewOffset  : { top : 0, right : 0, bottom : 0, left : 0 },

      //            Callbacks that fire for each completed element reveal, and
      //            if `config.reset = true`, for each completed element reset.
      //            When creating your callbacks, remember they are passed the
      //            element’s DOM node that triggered it as the first argument.
      afterReveal : function( domEl ){},
      afterReset  : function( domEl ){}
    };

    function ScrollReveal( config ){
      if ( window == this ){
        return new ScrollReveal( config );
      }
      sr = this;
      sr.tools = new Tools();
      sr.tools.extend( sr.defaults, config || {} );

      if ( !sr.supported() ){
        console.log('ScrollReveal is not supported in this browser.');
      }

      sr.store = {
        elements   : {},
        containers : []
      };
      sr.history     = [];
      sr.counter     = 0;
      sr.initialized = false;
      return sr;
    }

    ScrollReveal.prototype.supported = function(){
      var style = document.documentElement.style;
      return (
        'WebkitTransition' in style && 'WebkitTransform' in style ||
        'transition' in style && 'transform' in style ) ? true : false;
    };

    ScrollReveal.prototype.reveal = function( selector, config, sync ){
      var elements, container, elem, elemId;

      // Deduce the correct container.
      if ( config && config.container ){
        container = config.container;
      } else if ( sr.defaults.container ){
        container = sr.defaults.container;
      } else {
        container = window.document.documentElement;
      }

      // Query that container for all elements matching the selector argument.
      elements = Array.prototype.slice.call( container.querySelectorAll( selector ) );
      if ( !elements.length ){
        console.log('reveal(\'' + selector + '\') failed: no elements found.');
        return sr;
      }

      // Begin main loop to configure ScrollReveal elements.
      for ( var i = 0; i < elements.length; i++ ){
        // Check if the element has already been configured.
        elemId = elements[ i ].getAttribute('data-sr-id');
        // If so, grab it from the store.
        if ( elemId ){
          elem = sr.store.elements[ elemId ];
        }
        // Otherwise, let’s do some basic setup.
        else {
          elem = {
            id       : ++sr.counter,
            domEl    : elements[ i ],
            seen     : false,
            revealed : false
          };
          elem.domEl.setAttribute( 'data-sr-id', elem.id );
        }

        // New or existing element, it’s time to update its configuration,
        // styles, and send the updates to our store.
        _configure( elem, config || {} );
        _style( elem );
        _updateStore( elem );

        // We need to make sure elements are set to visibility: visibile,
        // even when on mobile and `config.mobile == false`, or if unsupported.
        if ( sr.tools.isMobile() && !elem.config.mobile || !sr.supported() ){
          elem.domEl.setAttribute( 'style', elem.styles.inline );
          elem.disabled = true;
        }
        // Otherwise, proceed normally.
        else if ( !elem.revealed ){
          elem.domEl.setAttribute( 'style',
              elem.styles.inline
            + elem.styles.transform.initial
          );
        }
      }

      // Each `reveal()` is recorded so that when calling `sync()` while working
      // with asynchronously loaded content, it can re-trace your steps but with
      // all your new elements now in the DOM.

      // Since `reveal()` is called internally by `sync()`, we don’t want to
      // record or intiialize each reveal during syncing.
      if ( !sync && sr.supported() ){
        _record( selector, config );
        // We push initialization to the event queue using setTimeout, so that
        // we can give ScrollReveal room to process all reveal calls before
        // putting things into motion.
        // --
        // Recommended: Philip Roberts - What the heck is the event loop anyway?
        // @ JSConf EU 2014: https://www.youtube.com/watch?v=8aGhZQkoFbQ
        if ( sr.initTimeout ){
          window.clearTimeout( sr.initTimeout );
        }
        sr.initTimeout = window.setTimeout( _init, 0 );
      }
      return sr;
    };

    ScrollReveal.prototype.sync = function(){
      if ( sr.history.length && sr.supported() ){
        // Loop through all stored recorded `reveal()` calls, and run them
        // again to make sure all elements in the DOM are properly recognized
        // by ScrollReveal.
        for ( var i = 0; i < sr.history.length; i++ ){
          var record = sr.history[ i ];
          sr.reveal( record.selector, record.config, true );
        };
        // Now that we’re done, initialize the updates.
        _init();
      } else {
        console.log('sync() failed: no reveals found.');
      }
      return sr;
    };

    // Private Methods
    // ---------------
    // Ah, the beauty of closures. These methods remain accessible ONLY to the
    // ScrollReveal instance, even though they technically only 'lived' during
    // it’s instantiation outside of the constructors scope.

    function _configure( elem, config ){
      // If the element hasn’t already been configured, let’s use a clone of the
      // defaults extended by the configuration passed as the second argument.
      if ( !elem.config ){
        elem.config = sr.tools.extendClone( sr.defaults, config );
      }
      // Otherwise, let’s use a clone of the existing element configuration
      // extended by the configuration passed as the second argument.
      else {
        elem.config = sr.tools.extendClone( elem.config, config );
      }
      // Infer CSS Transform axis from origin string.
      if ( elem.config.origin === 'top' || elem.config.origin === 'bottom' ){
        elem.config.axis = 'Y';
      } else {
        elem.config.axis = 'X';
      }
      // Let’s make sure our our pixel distances are negative for top and left.
      // e.g. config.origin = 'top' and config.distance = '25px' actually starts
      // at `top: -25px` in CSS.
      if ( elem.config.origin === 'top' || elem.config.origin === 'left' ){
        elem.config.distance = '-' + elem.config.distance;
      }
    }

    function _style( elem ){
      var config   = elem.config;
      var computed = window.getComputedStyle( elem.domEl );

      if ( !elem.styles ){
        elem.styles = {
          transition : {},
          transform  : {},
          computed   : {}
        };
        // Capture any existing inline styles, and add our visibility override.
        // --
        // See section 4.2. in the Documentation:
        // https://github.com/jlmakes/scrollreveal.js#42-improve-user-experience
        elem.styles.inline  = elem.domEl.getAttribute('style') || '';
        elem.styles.inline += '; visibility: visible; ';

        // grab the elements existing opacity.
        elem.styles.computed.opacity = computed.opacity;
        // grab the elements existing transitions.
        if ( !computed.transition || computed.transition == 'all 0s ease 0s' ){
          elem.styles.computed.transition = '';
        } else {
          elem.styles.computed.transition = computed.transition + ', ';
        }
      }
      // Create transition styles - without delay.
      elem.styles.transition.instant = '-webkit-transition: ' + elem.styles.computed.transition + '-webkit-transform ' + config.duration / 1000 + 's ' + config.easing + ' 0s, opacity ' + config.duration / 1000 + 's ' + config.easing + ' 0s; ' +
                                               'transition: ' + elem.styles.computed.transition + 'transform ' + config.duration / 1000 + 's ' + config.easing + ' 0s, opacity ' + config.duration / 1000 + 's ' + config.easing + ' 0s; ';
      // Create transition styles + with delay.
      elem.styles.transition.delayed = '-webkit-transition: ' + elem.styles.computed.transition + '-webkit-transform ' + config.duration / 1000 + 's ' + config.easing + ' ' + config.delay / 1000 + 's, opacity ' + config.duration / 1000 + 's ' + config.easing + ' ' + config.delay / 1000 + 's; ' +
                                               'transition: ' + elem.styles.computed.transition + 'transform ' + config.duration / 1000 + 's ' + config.easing + ' ' + config.delay / 1000 + 's, opacity ' + config.duration / 1000 + 's ' + config.easing + ' ' + config.delay / 1000 + 's; ';

      // Generate transform styles, first with the webkit prefix.
      elem.styles.transform.initial = ' -webkit-transform:';
      elem.styles.transform.target  = ' -webkit-transform:';
      generateTransform( elem.styles.transform );
      // And again without any prefix.
      elem.styles.transform.initial += 'transform:';
      elem.styles.transform.target  += 'transform:';
      generateTransform( elem.styles.transform );

      function generateTransform( transform ){
        if ( parseInt( config.distance ) ){
          transform.initial += ' translate' + config.axis + '(' + config.distance + ')';
          transform.target  += ' translate' + config.axis + '(0)';
        }
        if ( config.scale ){
          transform.initial += ' scale(' + config.scale + ')';
          transform.target  += ' scale(1)';
        }
        if ( config.rotate.x ){
          transform.initial += ' rotateX(' + config.rotate.x + 'deg)';
          transform.target  += ' rotateX(0)';
        }
        if ( config.rotate.y ){
          transform.initial += ' rotateY(' + config.rotate.y + 'deg)';
          transform.target  += ' rotateY(0)';
        }
        if ( config.rotate.z ){
          transform.initial += ' rotateZ(' + config.rotate.z + 'deg)';
          transform.target  += ' rotateZ(0)';
        }
        transform.initial += '; opacity: ' + config.opacity + ';';
        transform.target  += '; opacity: ' + elem.styles.computed.opacity + ';';
      }
    }

    function _updateStore( elem ){
      var container = elem.config.container;
      // If this element’s container isn’t already in the store, let’s add it.
      if ( container && sr.store.containers.indexOf( container ) == -1 ){
        sr.store.containers.push( elem.config.container );
      }
      // Update the elemented stored with our new element.
      sr.store.elements[ elem.id ] = elem;
    };

    function _record( selector, config ){
      // Save the `reveal()` arguments that triggered this `_record()` call,
      // so we can re-trace our steps when calling the `sync()` method.
      var record = {
        selector : selector,
        config   : config
      };
      sr.history.push( record );
    }

    function _init(){
      if ( sr.supported() ){
        // Initial animate call triggers valid reveal animations on first load.
        // Subsequent animate calls are made inside the event handler.
        _animate();
        // Then we loop through all container nodes in the store and bind event
        // listeners to each.
        for ( var i = 0; i < sr.store.containers.length; i++ ){
          sr.store.containers[ i ].addEventListener( 'scroll', _handler );
          sr.store.containers[ i ].addEventListener( 'resize', _handler );
        }
        // Let’s also do a one-time binding of window event listeners.
        if ( !sr.initialized ){
          window.addEventListener( 'scroll', _handler );
          window.addEventListener( 'resize', _handler );
          sr.initialized = true;
        }
      }
      return sr;
    }

    function _handler(){
      _requestAnimationFrame( _animate );
    }

    function _animate(){
      var elem, visible;
      // Loop through all elements in the store
      sr.tools.forOwn( sr.store.elements, function( elemId ){
        elem    = sr.store.elements[ elemId ];
        visible = _isElemVisible( elem );

        // Reveal
        // ------
        // Should element reveal?
        if ( visible && !elem.revealed && !elem.disabled ){
          // Should element reveal + with delay?
          if ( elem.config.useDelay === 'always'
          || ( elem.config.useDelay === 'onload' && !sr.initialized )
          || ( elem.config.useDelay === 'once'   && !elem.seen ) ){
            elem.domEl.setAttribute( 'style',
                elem.styles.inline
              + elem.styles.transform.target
              + elem.styles.transition.delayed
            );
          }
          // Otherwise use a reveal animation - without delay.
          else {
            elem.domEl.setAttribute( 'style',
                elem.styles.inline
              + elem.styles.transform.target
              + elem.styles.transition.instant
            );
          }
          // The element revealed, so let’s queue the `afterReveal` callback,
          // and mark it as `seen` for future reference.
          queueCallback( 'reveal', elem );
          return elem.seen = true;
        }

        // Reset
        // -----
        // If we got this far our element shouldn’t reveal, but should it reset?
        if ( !visible && elem.config.reset && elem.revealed && !elem.disabled ){
          elem.domEl.setAttribute( 'style',
              elem.styles.inline
            + elem.styles.transform.initial
            + elem.styles.transition.instant
          );
          queueCallback( 'reset', elem );
        }
      });

      function queueCallback( type, elem ){
        var elapsed  = 0;
        var duration = 0;
        var callback = 'after';
        // deduce the correct callback.
        switch ( type ){
          case 'reveal':
            duration = elem.config.duration + elem.config.delay;
            callback += 'Reveal';
            break;
          case 'reset':
            duration = elem.config.duration;
            callback += 'Reset';
            break;
        }
        // If a countdown timer is already running, let’s capture the elapsed
        // time and clear the clock. (i.e. animation was canceled.)
        if ( elem.timer ){
          elapsed = Math.abs( elem.timer.started - new Date() );
          window.clearTimeout( elem.timer.clock );
        }
        // Start a new timer...
        elem.timer = { started : new Date() };
        elem.timer.clock = window.setTimeout(function(){
          // The timer completed, so let’s fire the callback and kill the timer.
          elem.config[ callback ]( elem.domEl );
          elem.timer = null;
        }, duration - elapsed );
        // Update element status for future animate loops.
        return type === 'reveal' ? elem.revealed = true : elem.revealed = false;
      }
    }

    function _getContainer( container ){
      if ( !container ){
        container = window.document.documentElement;
      }
      var w = container.clientWidth;
      var h = container.clientHeight;
      return {
        width  : w,
        height : h
      };
    }

    function _getScrolled( container ){
      // Return the container scroll values, plus the offset values of it's
      // position (since element offset is relevant to the document origin.)
      if ( container ){
        var offset = _getOffset( container );
        return {
          x : container.scrollLeft + offset.left,
          y : container.scrollTop  + offset.top
        };
      }
      // Otherwise, default to the window object’s scroll values.
      else {
        return {
          x : window.pageXOffset,
          y : window.pageYOffset
        };
      }
    }

    function _getOffset( domEl ){
      var offsetTop    = 0;
      var offsetLeft   = 0;
      // Grab the element’s dimensions.
      var offsetHeight = domEl.offsetHeight;
      var offsetWidth  = domEl.offsetWidth;
      // Now calculate the distance between the element and it's parent, then
      // again for the parent to it's parent, and again etc... until we have the
      // total distance of the element to the document’s top and left origin.
      do {
        if ( !isNaN( domEl.offsetTop ) ){
          offsetTop += domEl.offsetTop;
        }
        if ( !isNaN( domEl.offsetLeft ) ){
          offsetLeft += domEl.offsetLeft;
        }
      } while ( domEl = domEl.offsetParent );

      return {
        top    : offsetTop,
        left   : offsetLeft,
        height : offsetHeight,
        width  : offsetWidth
      };
    }

    function _isElemVisible( elem ){
      var offset     = _getOffset( elem.domEl );
      var container  = _getContainer( elem.config.container );
      var scrolled   = _getScrolled( elem.config.container );
      var vF         = elem.config.viewFactor;
      // Define the element geometry.
      var elemHeight = offset.height;
      var elemWidth  = offset.width;
      var elemTop    = offset.top;
      var elemLeft   = offset.left;
      var elemBottom = elemTop  + elemHeight;
      var elemRight  = elemLeft + elemWidth;

      return ( confirmBounds() || isPositionFixed() );

      function confirmBounds(){
        // Define the element functional boundaries, including the viewFactor.
        var top        = elemTop    + elemHeight * vF;
        var left       = elemLeft   + elemWidth  * vF;
        var bottom     = elemBottom - elemHeight * vF;
        var right      = elemRight  - elemWidth  * vF;
        // Define the container boundaries.
        var viewTop    = scrolled.y + elem.config.viewOffset.top;
        var viewLeft   = scrolled.x + elem.config.viewOffset.left;
        var viewBottom = scrolled.y - elem.config.viewOffset.bottom + container.height;
        var viewRight  = scrolled.x - elem.config.viewOffset.right  + container.width;
        // Check if our element is within bounds.
        return ( top    < viewBottom )
            && ( bottom > viewTop    )
            && ( left   > viewLeft   )
            && ( right  < viewRight  );
      }

      function isPositionFixed(){
        return ( window.getComputedStyle( elem.domEl ).position === 'fixed' );
      }
    }

    return ScrollReveal;

  })();

  // helper.tools.js
  // ---------------
  // Simple deep object extend, and a few other agnostic helper methods.
  // gist: https://gist.github.com/jlmakes/9f104e3f1b4d86334987

  var Tools = (function(){

    Tools.prototype.isObject = function( object ){
      return object !== null && typeof object === 'object' && object.constructor == Object;
    };

    Tools.prototype.forOwn = function( object, callback ){
      if ( !this.isObject( object ) ){
        throw new TypeError('Expected \'object\', but received \'' + typeof object + '\'.');
      } else {
        for ( var property in object ){
          if ( object.hasOwnProperty( property ) ){
            callback( property );
          }
        }
      }
    };

    Tools.prototype.extend = function( target, source ){
      this.forOwn( source, function( property ){
        if ( this.isObject( source[ property ] ) ){
          if ( !target[ property ] || !this.isObject( target[ property ] ) ){
            target[ property ] = {};
          }
          this.extend( target[ property ], source[ property ] );
        } else {
          target[ property ] = source[ property ];
        }
      }.bind( this ));
      return target;
    };

    Tools.prototype.extendClone = function( target, source ){
      return this.extend( this.extend( {}, target ), source );
    };

    Tools.prototype.isMobile = function(){
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test( navigator.userAgent );
    };

    function Tools(){};
    return Tools;

  })();

  var _requestAnimationFrame = window.requestAnimationFrame       ||
                               window.webkitRequestAnimationFrame ||
                               window.mozRequestAnimationFrame;

}).call( this );

return this.ScrollReveal;

}));

},{}],10:[function(require,module,exports){
'use strict';

require('./core/dependencies');
require('./components/components');

},{"./components/components":12,"./core/dependencies":16}],11:[function(require,module,exports){
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

},{}],12:[function(require,module,exports){
'use strict';

require('./burger');
require('./headroom');
require('./masonry');
require('./openseadragon');

},{"./burger":11,"./headroom":13,"./masonry":14,"./openseadragon":15}],13:[function(require,module,exports){
"use strict";

require('./../vendor/headroom');

// grab an element
var myElement = document.querySelector("header");
// construct an instance of Headroom, passing the element
var headroom = new Headroom(myElement);
// initialise
headroom.init();

},{"./../vendor/headroom":17}],14:[function(require,module,exports){
'use strict';

var Masonry = require('masonry-layout');
var imagesLoaded = require('imagesloaded');
require('scrollreveal');
window.sr = new ScrollReveal();

var grid = document.querySelector('.masonry');
var gallery = document.querySelector('.gallery');

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
  new imagesLoaded(grid, function () {
    var msnry = new Masonry(grid, {
      itemSelector: '.masonry-item',
      columnWidth: '.masonry-sizer',
      percentPosition: true
    });
    sr.reveal('.reveal', {
      origin: 'bottom',
      distance: '1rem'
    });
  });
  /* end wait for images loaded */
}

if (gallery) {
  new imagesLoaded(gallery, function () {
    var msnry = new Masonry(gallery, {
      itemSelector: '.gallery-item',
      columnWidth: '.gallery-sizer',
      percentPosition: true
    });
    sr.reveal('.reveal', {
      origin: 'bottom',
      distance: '1rem'
    });
  });
}

},{"imagesloaded":5,"masonry-layout":6,"scrollreveal":9}],15:[function(require,module,exports){
'use strict';

require('./../vendor/openseadragon/openseadragon');
require('./../vendor/openseadragon/openseadragon-viewerinputhook');

var osd_viewer = null;
if (container) {
  var container = document.querySelector('#osd-container');
  enableSeadragon();
}

var osd_thumb = document.querySelector('.osd-thumb');
if (osd_thumb) {
  osd_thumb.addEventListener('click', function (e) {
    e.preventDefault();
    var osd_source = osd_thumb.getAttribute('data-osd');
    enableSeadragon(osd_source);
  });
}

function enableSeadragon(osd_source) {
  if (!osd_viewer) {
    var osd_source = container.getAttribute('data-osd');
    osd_viewer = OpenSeadragon({
      id: 'osd-container',
      tileSources: osd_source,
      prefixUrl: '/images/openseadragon/images/',
      toolbar: 'osd-controls',
      zoomInButton: 'osd-in',
      zoomOutButton: 'osd-out',
      fullPageButton: 'osd-full',
      homeButton: 'osd-home'
    });
    // disable the scroll handler to enable page scrolling inside the viewer area
    osd_viewer.addViewerInputHook({ hooks: [{ tracker: 'viewer', handler: 'scrollHandler', hookHandler: onViewerScroll }] });
    // zoom in a bit on image load
    osd_viewer.addHandler('open', function () {
      var zoom = osd_viewer.viewport.getZoom();
      osd_viewer.viewport.zoomTo(zoom + 0.2, null, true);
    });
  } else {
    osd_viewer.open(osd_source);
  }
}

function onViewerScroll(event) {
  // Disable mousewheel zoom on the viewer and let the original mousewheel events bubble
  if (!osd_viewer.isFullPage()) {
    event.preventDefaultAction = true;
    event.stopHandlers = true;
    return true;
  }
}

},{"./../vendor/openseadragon/openseadragon":19,"./../vendor/openseadragon/openseadragon-viewerinputhook":18}],16:[function(require,module,exports){
"use strict";

},{}],17:[function(require,module,exports){
/*!
 * headroom.js v0.7.0 - Give your page some headroom. Hide your header until you need it
 * Copyright (c) 2014 Nick Williams - http://wicky.nillia.ms/headroom.js
 * License: MIT
 */

'use strict';

(function (window, document) {

  'use strict';

  /* exported features */

  var features = {
    bind: !!(function () {}).bind,
    classList: 'classList' in document.documentElement,
    rAF: !!(window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame)
  };
  window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;

  /**
   * Handles debouncing of events via requestAnimationFrame
   * @see http://www.html5rocks.com/en/tutorials/speed/animations/
   * @param {Function} callback The callback to handle whichever event
   */
  function Debouncer(callback) {
    this.callback = callback;
    this.ticking = false;
  }
  Debouncer.prototype = {
    constructor: Debouncer,

    /**
     * dispatches the event to the supplied callback
     * @private
     */
    update: function update() {
      this.callback && this.callback();
      this.ticking = false;
    },

    /**
     * ensures events don't get stacked
     * @private
     */
    requestTick: function requestTick() {
      if (!this.ticking) {
        requestAnimationFrame(this.rafCallback || (this.rafCallback = this.update.bind(this)));
        this.ticking = true;
      }
    },

    /**
     * Attach this as the event listeners
     */
    handleEvent: function handleEvent() {
      this.requestTick();
    }
  };
  /**
   * Check if object is part of the DOM
   * @constructor
   * @param {Object} obj element to check
   */
  function isDOMElement(obj) {
    return obj && typeof window !== 'undefined' && (obj === window || obj.nodeType);
  }

  /**
   * Helper function for extending objects
   */
  function extend(object /*, objectN ... */) {
    if (arguments.length <= 0) {
      throw new Error('Missing arguments in extend function');
    }

    var result = object || {},
        key,
        i;

    for (i = 1; i < arguments.length; i++) {
      var replacement = arguments[i] || {};

      for (key in replacement) {
        // Recurse into object except if the object is a DOM element
        if (typeof result[key] === 'object' && !isDOMElement(result[key])) {
          result[key] = extend(result[key], replacement[key]);
        } else {
          result[key] = result[key] || replacement[key];
        }
      }
    }

    return result;
  }

  /**
   * Helper function for normalizing tolerance option to object format
   */
  function normalizeTolerance(t) {
    return t === Object(t) ? t : { down: t, up: t };
  }

  /**
   * UI enhancement for fixed headers.
   * Hides header when scrolling down
   * Shows header when scrolling up
   * @constructor
   * @param {DOMElement} elem the header element
   * @param {Object} options options for the widget
   */
  function Headroom(elem, options) {
    options = extend(options, Headroom.options);

    this.lastKnownScrollY = 0;
    this.elem = elem;
    this.debouncer = new Debouncer(this.update.bind(this));
    this.tolerance = normalizeTolerance(options.tolerance);
    this.classes = options.classes;
    this.offset = options.offset;
    this.scroller = options.scroller;
    this.initialised = false;
    this.onPin = options.onPin;
    this.onUnpin = options.onUnpin;
    this.onTop = options.onTop;
    this.onNotTop = options.onNotTop;
  }
  Headroom.prototype = {
    constructor: Headroom,

    /**
     * Initialises the widget
     */
    init: function init() {
      if (!Headroom.cutsTheMustard) {
        return;
      }

      this.elem.classList.add(this.classes.initial);

      // defer event registration to handle browser
      // potentially restoring previous scroll position
      setTimeout(this.attachEvent.bind(this), 100);

      return this;
    },

    /**
     * Unattaches events and removes any classes that were added
     */
    destroy: function destroy() {
      var classes = this.classes;

      this.initialised = false;
      this.elem.classList.remove(classes.unpinned, classes.pinned, classes.top, classes.initial);
      this.scroller.removeEventListener('scroll', this.debouncer, false);
    },

    /**
     * Attaches the scroll event
     * @private
     */
    attachEvent: function attachEvent() {
      if (!this.initialised) {
        this.lastKnownScrollY = this.getScrollY();
        this.initialised = true;
        this.scroller.addEventListener('scroll', this.debouncer, false);

        this.debouncer.handleEvent();
      }
    },

    /**
     * Unpins the header if it's currently pinned
     */
    unpin: function unpin() {
      var classList = this.elem.classList,
          classes = this.classes;

      if (classList.contains(classes.pinned) || !classList.contains(classes.unpinned)) {
        classList.add(classes.unpinned);
        classList.remove(classes.pinned);
        this.onUnpin && this.onUnpin.call(this);
      }
    },

    /**
     * Pins the header if it's currently unpinned
     */
    pin: function pin() {
      var classList = this.elem.classList,
          classes = this.classes;

      if (classList.contains(classes.unpinned)) {
        classList.remove(classes.unpinned);
        classList.add(classes.pinned);
        this.onPin && this.onPin.call(this);
      }
    },

    /**
     * Handles the top states
     */
    top: function top() {
      var classList = this.elem.classList,
          classes = this.classes;

      if (!classList.contains(classes.top)) {
        classList.add(classes.top);
        classList.remove(classes.notTop);
        this.onTop && this.onTop.call(this);
      }
    },

    /**
     * Handles the not top state
     */
    notTop: function notTop() {
      var classList = this.elem.classList,
          classes = this.classes;

      if (!classList.contains(classes.notTop)) {
        classList.add(classes.notTop);
        classList.remove(classes.top);
        this.onNotTop && this.onNotTop.call(this);
      }
    },

    /**
     * Gets the Y scroll position
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Window.scrollY
     * @return {Number} pixels the page has scrolled along the Y-axis
     */
    getScrollY: function getScrollY() {
      return this.scroller.pageYOffset !== undefined ? this.scroller.pageYOffset : this.scroller.scrollTop !== undefined ? this.scroller.scrollTop : (document.documentElement || document.body.parentNode || document.body).scrollTop;
    },

    /**
     * Gets the height of the viewport
     * @see http://andylangton.co.uk/blog/development/get-viewport-size-width-and-height-javascript
     * @return {int} the height of the viewport in pixels
     */
    getViewportHeight: function getViewportHeight() {
      return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    },

    /**
     * Gets the height of the document
     * @see http://james.padolsey.com/javascript/get-document-height-cross-browser/
     * @return {int} the height of the document in pixels
     */
    getDocumentHeight: function getDocumentHeight() {
      var body = document.body,
          documentElement = document.documentElement;

      return Math.max(body.scrollHeight, documentElement.scrollHeight, body.offsetHeight, documentElement.offsetHeight, body.clientHeight, documentElement.clientHeight);
    },

    /**
     * Gets the height of the DOM element
     * @param  {Object}  elm the element to calculate the height of which
     * @return {int}     the height of the element in pixels
     */
    getElementHeight: function getElementHeight(elm) {
      return Math.max(elm.scrollHeight, elm.offsetHeight, elm.clientHeight);
    },

    /**
     * Gets the height of the scroller element
     * @return {int} the height of the scroller element in pixels
     */
    getScrollerHeight: function getScrollerHeight() {
      return this.scroller === window || this.scroller === document.body ? this.getDocumentHeight() : this.getElementHeight(this.scroller);
    },

    /**
     * determines if the scroll position is outside of document boundaries
     * @param  {int}  currentScrollY the current y scroll position
     * @return {bool} true if out of bounds, false otherwise
     */
    isOutOfBounds: function isOutOfBounds(currentScrollY) {
      var pastTop = currentScrollY < 0,
          pastBottom = currentScrollY + this.getViewportHeight() > this.getScrollerHeight();

      return pastTop || pastBottom;
    },

    /**
     * determines if the tolerance has been exceeded
     * @param  {int} currentScrollY the current scroll y position
     * @return {bool} true if tolerance exceeded, false otherwise
     */
    toleranceExceeded: function toleranceExceeded(currentScrollY, direction) {
      return Math.abs(currentScrollY - this.lastKnownScrollY) >= this.tolerance[direction];
    },

    /**
     * determine if it is appropriate to unpin
     * @param  {int} currentScrollY the current y scroll position
     * @param  {bool} toleranceExceeded has the tolerance been exceeded?
     * @return {bool} true if should unpin, false otherwise
     */
    shouldUnpin: function shouldUnpin(currentScrollY, toleranceExceeded) {
      var scrollingDown = currentScrollY > this.lastKnownScrollY,
          pastOffset = currentScrollY >= this.offset;

      return scrollingDown && pastOffset && toleranceExceeded;
    },

    /**
     * determine if it is appropriate to pin
     * @param  {int} currentScrollY the current y scroll position
     * @param  {bool} toleranceExceeded has the tolerance been exceeded?
     * @return {bool} true if should pin, false otherwise
     */
    shouldPin: function shouldPin(currentScrollY, toleranceExceeded) {
      var scrollingUp = currentScrollY < this.lastKnownScrollY,
          pastOffset = currentScrollY <= this.offset;

      return scrollingUp && toleranceExceeded || pastOffset;
    },

    /**
     * Handles updating the state of the widget
     */
    update: function update() {
      var currentScrollY = this.getScrollY(),
          scrollDirection = currentScrollY > this.lastKnownScrollY ? 'down' : 'up',
          toleranceExceeded = this.toleranceExceeded(currentScrollY, scrollDirection);

      if (this.isOutOfBounds(currentScrollY)) {
        // Ignore bouncy scrolling in OSX
        return;
      }

      if (currentScrollY <= this.offset) {
        this.top();
      } else {
        this.notTop();
      }

      if (this.shouldUnpin(currentScrollY, toleranceExceeded)) {
        this.unpin();
      } else if (this.shouldPin(currentScrollY, toleranceExceeded)) {
        this.pin();
      }

      this.lastKnownScrollY = currentScrollY;
    }
  };
  /**
   * Default options
   * @type {Object}
   */
  Headroom.options = {
    tolerance: {
      up: 0,
      down: 0
    },
    offset: 0,
    scroller: window,
    classes: {
      pinned: 'headroom--pinned',
      unpinned: 'headroom--unpinned',
      top: 'headroom--top',
      notTop: 'headroom--not-top',
      initial: 'headroom'
    }
  };
  Headroom.cutsTheMustard = typeof features !== 'undefined' && features.rAF && features.bind && features.classList;

  window.Headroom = Headroom;
})(window, document);

},{}],18:[function(require,module,exports){
//! OpenSeadragonViewerInputHook 1.1.0
//! Build date: 2014-01-13
//! Git commit: v1.0.0-13-g7e47873
//! https://github.com/msalsbery/OpenSeadragonViewerInputHook
/* 
 * Copyright (c) 2013-2014 Mark Salsbery
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

/**
 * @file
 * @version  OpenSeadragonViewerInputHook 1.1.0
 * @author Mark Salsbery <msalsbery@hotmail.com>
 *
 */

'use strict';

(function (OSD, $, undefined) {

    if (!OSD.version || OSD.version.major < 1) {
        throw new Error('OpenSeadragonViewerInputHook requires OpenSeadragon version 1.0.0+');
    }

    /**
     * Creates a new ViewerInputHook attached to the viewer.
     *
     * @method addViewerInputHook
     * @memberof external:"OpenSeadragon.Viewer"#
     * @param {Object} options
     * @param {Object[]} [options.hooks]
     * @returns {OpenSeadragonImaging.ViewerInputHook}
     *
     **/
    OSD.Viewer.prototype.addViewerInputHook = function (options) {
        options = options || {};
        options.viewer = this;
        return new $.ViewerInputHook(options);
    };

    /**
     * Creates a new ViewerInputHook attached (optionally) to the viewer instance passed in the options parameter.
     *
     * @class ViewerInputHook
     * @classdesc Provides hooks into the OpenSeadragon viewer event pipeline.
     * @memberof OpenSeadragonImaging
     * @param {Object} options
     * @param {external:"OpenSeadragon.Viewer"} [options.viewer] - Reference to OpenSeadragon viewer to attach to.
     * @param {Object[]} options.hooks
     *
     **/
    $.ViewerInputHook = function (options) {

        var curHook, curTracker;

        options = options || {};
        options.hooks = options.hooks || [];

        this.viewerTrackers = {};

        if (options.viewer) {
            this.viewerTrackers.viewer = options.viewer.innerTracker;
            this.viewerTrackers.viewer_outer = options.viewer.outerTracker;
        }

        for (curHook = 0; curHook < options.hooks.length; curHook++) {
            if (typeof options.hooks[curHook].tracker === 'string') {
                if (!options.viewer) {
                    throw new Error('A viewer must be specified.');
                }
                curTracker = this.viewerTrackers[options.hooks[curHook].tracker];
                if (curTracker === undefined) {
                    throw new Error('Unknown tracker specified: ' + options.hooks[curHook].tracker);
                }
            } else {
                curTracker = options.hooks[curHook].tracker;
            }
            /*jshint loopfunc:true*/
            (function (_this, tracker, handler, hookHandler) {
                var origHandler = tracker[handler];
                tracker[handler] = function (event) {
                    return _this.callHandlers(hookHandler, origHandler, event);
                };
            })(this, curTracker, options.hooks[curHook].handler, options.hooks[curHook].hookHandler);
            /*jshint loopfunc:false*/
        }
    };

    /**
     * ViewerInputHook version.
     * @member {Object} OpenSeadragonImaging.ViewerInputHook.version
     * @property {String} versionStr - The version number as a string ('major.minor.revision').
     * @property {Number} major - The major version number.
     * @property {Number} minor - The minor version number.
     * @property {Number} revision - The revision number.
     */
    /* jshint ignore:start */
    $.ViewerInputHook.version = {
        versionStr: '1.1.0',
        major: 1,
        minor: 1,
        revision: 0
    };
    /* jshint ignore:end */

    $.ViewerInputHook.prototype.callHandlers = function (hookHandler, origHandler, event) {
        var ret = hookHandler(event);
        if (origHandler && !event.stopHandlers) {
            ret = origHandler(event);
        }
        return event.stopBubbling ? false : ret;
    };
})(OpenSeadragon, window.OpenSeadragonImaging = window.OpenSeadragonImaging || {});
/**
 * @module openseadragon-viewerinputhook
 * @version  OpenSeadragonViewerInputHook 1.1.0
 *
 */

},{}],19:[function(require,module,exports){
//! OpenSeadragon 2.1.0
//! Built on 2015-11-12
//! Git commit: v2.1.0-3-b2c17b5
//! http://openseadragon.github.io
//! License: http://openseadragon.github.io/license/

/*
 * OpenSeadragon
 *
 * Copyright (C) 2009 CodePlex Foundation
 * Copyright (C) 2010-2013 OpenSeadragon contributors
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 * - Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 *
 * - Neither the name of CodePlex Foundation nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/*
 * Portions of this source file taken from jQuery:
 *
 * Copyright 2011 John Resig
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

/*
 * Portions of this source file taken from mattsnider.com:
 *
 * Copyright (c) 2006-2013 Matt Snider
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
 * CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT
 * OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR
 * THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

/**
 * @version  OpenSeadragon 2.1.0
 *
 * @file
 * <h2><strong>OpenSeadragon - Javascript Deep Zooming</strong></h2>
 * <p>
 * OpenSeadragon provides an html interface for creating
 * deep zoom user interfaces.  The simplest examples include deep
 * zoom for large resolution images, and complex examples include
 * zoomable map interfaces driven by SVG files.
 * </p>
 *
 */

/**
 * @module OpenSeadragon
 *
 */

/**
 * @namespace OpenSeadragon
 *
 * @classdesc The root namespace for OpenSeadragon.  All utility methods
 * and classes are defined on or below this namespace.
 *
 */

// Typedefs

/**
 * All required and optional settings for instantiating a new instance of an OpenSeadragon image viewer.
 *
 * @typedef {Object} Options
 * @memberof OpenSeadragon
 *
 * @property {String} id
 *     Id of the element to append the viewer's container element to. If not provided, the 'element' property must be provided.
 *     If both the element and id properties are specified, the viewer is appended to the element provided in the element property.
 *
 * @property {Element} element
 *     The element to append the viewer's container element to. If not provided, the 'id' property must be provided.
 *     If both the element and id properties are specified, the viewer is appended to the element provided in the element property.
 *
 * @property {Array|String|Function|Object} [tileSources=null]
 *     Tile source(s) to open initially. This is a complex parameter; see
 *     {@link OpenSeadragon.Viewer#open} for details.
 *
 * @property {Number} [tabIndex=0]
 *     Tabbing order index to assign to the viewer element. Positive values are selected in increasing order. When tabIndex is 0
 *     source order is used. A negative value omits the viewer from the tabbing order.
 *
 * @property {Array} overlays Array of objects defining permanent overlays of
 *     the viewer. The overlays added via this option and later removed with
 *     {@link OpenSeadragon.Viewer#removeOverlay} will be added back when a new
 *     image is opened.
 *     To add overlays which can be definitively removed, one must use
 *     {@link OpenSeadragon.Viewer#addOverlay}
 *     If displaying a sequence of images, the overlays can be associated
 *     with a specific page by passing the overlays array to the page's
 *     tile source configuration.
 *     Expected properties:
 *     * x, y, (or px, py for pixel coordinates) to define the location.
 *     * width, height in point if using x,y or in pixels if using px,py. If width
 *       and height are specified, the overlay size is adjusted when zooming,
 *       otherwise the size stays the size of the content (or the size defined by CSS).
 *     * className to associate a class to the overlay
 *     * id to set the overlay element. If an element with this id already exists,
 *       it is reused, otherwise it is created. If not specified, a new element is
 *       created.
 *     * placement a string to define the relative position to the viewport.
 *       Only used if no width and height are specified. Default: 'TOP_LEFT'.
 *       See {@link OpenSeadragon.OverlayPlacement} for possible values.
 *
 * @property {String} [xmlPath=null]
 *     <strong>DEPRECATED</strong>. A relative path to load a DZI file from the server.
 *     Prefer the newer Options.tileSources.
 *
 * @property {String} [prefixUrl='/images/']
 *     Prepends the prefixUrl to navImages paths, which is very useful
 *     since the default paths are rarely useful for production
 *     environments.
 *
 * @property {OpenSeadragon.NavImages} [navImages]
 *     An object with a property for each button or other built-in navigation
 *     control, eg the current 'zoomIn', 'zoomOut', 'home', and 'fullpage'.
 *     Each of those in turn provides an image path for each state of the button
 *     or navigation control, eg 'REST', 'GROUP', 'HOVER', 'PRESS'. Finally the
 *     image paths, by default assume there is a folder on the servers root path
 *     called '/images', eg '/images/zoomin_rest.png'.  If you need to adjust
 *     these paths, prefer setting the option.prefixUrl rather than overriding
 *     every image path directly through this setting.
 *
 * @property {Boolean} [debugMode=false]
 *     TODO: provide an in-screen panel providing event detail feedback.
 *
 * @property {String} [debugGridColor='#437AB2']
 *
 * @property {Number} [blendTime=0]
 *     Specifies the duration of animation as higher or lower level tiles are
 *     replacing the existing tile.
 *
 * @property {Boolean} [alwaysBlend=false]
 *     Forces the tile to always blend.  By default the tiles skip blending
 *     when the blendTime is surpassed and the current animation frame would
 *     not complete the blend.
 *
 * @property {Boolean} [autoHideControls=true]
 *     If the user stops interacting with the viewport, fade the navigation
 *     controls.  Useful for presentation since the controls are by default
 *     floated on top of the image the user is viewing.
 *
 * @property {Boolean} [immediateRender=false]
 *     Render the best closest level first, ignoring the lowering levels which
 *     provide the effect of very blurry to sharp. It is recommended to change
 *     setting to true for mobile devices.
 *
 * @property {Number} [defaultZoomLevel=0]
 *     Zoom level to use when image is first opened or the home button is clicked.
 *     If 0, adjusts to fit viewer.
 *
 * @property {Number} [opacity=1]
 *     Default opacity of the tiled images (1=opaque, 0=transparent)
 *
 * @property {String|CanvasGradient|CanvasPattern|Function} [placeholderFillStyle=null]
 *     Draws a colored rectangle behind the tile if it is not loaded yet.
 *     You can pass a CSS color value like "#FF8800".
 *     When passing a function the tiledImage and canvas context are available as argument which is useful when you draw a gradient or pattern.
 *
 * @property {Number} [degrees=0]
 *     Initial rotation.
 *
 * @property {Number} [minZoomLevel=null]
 *
 * @property {Number} [maxZoomLevel=null]
 *
 * @property {Boolean} [homeFillsViewer=false]
 *     Make the 'home' button fill the viewer and clip the image, instead
 *     of fitting the image to the viewer and letterboxing.
 *
 * @property {Boolean} [panHorizontal=true]
 *     Allow horizontal pan.
 *
 * @property {Boolean} [panVertical=true]
 *     Allow vertical pan.
 *
 * @property {Boolean} [constrainDuringPan=false]
 *
 * @property {Boolean} [wrapHorizontal=false]
 *     Set to true to force the image to wrap horizontally within the viewport.
 *     Useful for maps or images representing the surface of a sphere or cylinder.
 *
 * @property {Boolean} [wrapVertical=false]
 *     Set to true to force the image to wrap vertically within the viewport.
 *     Useful for maps or images representing the surface of a sphere or cylinder.
 *
 * @property {Number} [minZoomImageRatio=0.9]
 *     The minimum percentage ( expressed as a number between 0 and 1 ) of
 *     the viewport height or width at which the zoom out will be constrained.
 *     Setting it to 0, for example will allow you to zoom out infinity.
 *
 * @property {Number} [maxZoomPixelRatio=1.1]
 *     The maximum ratio to allow a zoom-in to affect the highest level pixel
 *     ratio. This can be set to Infinity to allow 'infinite' zooming into the
 *     image though it is less effective visually if the HTML5 Canvas is not
 *     availble on the viewing device.
 *
 * @property {Boolean} [autoResize=true]
 *     Set to false to prevent polling for viewer size changes. Useful for providing custom resize behavior.
 *
 * @property {Boolean} [preserveImageSizeOnResize=false]
 *     Set to true to have the image size preserved when the viewer is resized. This requires autoResize=true (default).
 *
 * @property {Number} [minScrollDeltaTime=50]
 *     Number of milliseconds between canvas-scroll events. This value helps normalize the rate of canvas-scroll
 *     events between different devices, causing the faster devices to slow down enough to make the zoom control
 *     more manageable.
 *
 * @property {Number} [pixelsPerWheelLine=40]
 *     For pixel-resolution scrolling devices, the number of pixels equal to one scroll line.
 *
 * @property {Number} [visibilityRatio=0.5]
 *     The percentage ( as a number from 0 to 1 ) of the source image which
 *     must be kept within the viewport.  If the image is dragged beyond that
 *     limit, it will 'bounce' back until the minimum visibility ratio is
 *     achieved.  Setting this to 0 and wrapHorizontal ( or wrapVertical ) to
 *     true will provide the effect of an infinitely scrolling viewport.
 *
 * @property {Object} [viewportMargins={}]
 *     Pushes the "home" region in from the sides by the specified amounts.
 *     Possible subproperties (Numbers, in screen coordinates): left, top, right, bottom.
 *
 * @property {Number} [imageLoaderLimit=0]
 *     The maximum number of image requests to make concurrently. By default
 *     it is set to 0 allowing the browser to make the maximum number of
 *     image requests in parallel as allowed by the browsers policy.
 *
 * @property {Number} [clickTimeThreshold=300]
 *      The number of milliseconds within which a pointer down-up event combination
 *      will be treated as a click gesture.
 *
 * @property {Number} [clickDistThreshold=5]
 *      The maximum distance allowed between a pointer down event and a pointer up event
 *      to be treated as a click gesture.
 *
 * @property {Number} [dblClickTimeThreshold=300]
 *      The number of milliseconds within which two pointer down-up event combinations
 *      will be treated as a double-click gesture.
 *
 * @property {Number} [dblClickDistThreshold=20]
 *      The maximum distance allowed between two pointer click events
 *      to be treated as a double-click gesture.
 *
 * @property {Number} [springStiffness=6.5]
 *
 * @property {Number} [animationTime=1.2]
 *     Specifies the animation duration per each {@link OpenSeadragon.Spring}
 *     which occur when the image is dragged or zoomed.
 *
 * @property {OpenSeadragon.GestureSettings} [gestureSettingsMouse]
 *     Settings for gestures generated by a mouse pointer device. (See {@link OpenSeadragon.GestureSettings})
 * @property {Boolean} [gestureSettingsMouse.scrollToZoom=true] - Zoom on scroll gesture
 * @property {Boolean} [gestureSettingsMouse.clickToZoom=true] - Zoom on click gesture
 * @property {Boolean} [gestureSettingsMouse.dblClickToZoom=false] - Zoom on double-click gesture. Note: If set to true
 *     then clickToZoom should be set to false to prevent multiple zooms.
 * @property {Boolean} [gestureSettingsMouse.pinchToZoom=false] - Zoom on pinch gesture
 * @property {Boolean} [gestureSettingsMouse.flickEnabled=false] - Enable flick gesture
 * @property {Number} [gestureSettingsMouse.flickMinSpeed=120] - If flickEnabled is true, the minimum speed to initiate a flick gesture (pixels-per-second)
 * @property {Number} [gestureSettingsMouse.flickMomentum=0.25] - If flickEnabled is true, the momentum factor for the flick gesture
 * @property {Boolean} [gestureSettingsMouse.pinchRotate=false] - If pinchRotate is true, the user will have the ability to rotate the image using their fingers.
 *
 * @property {OpenSeadragon.GestureSettings} [gestureSettingsTouch]
 *     Settings for gestures generated by a touch pointer device. (See {@link OpenSeadragon.GestureSettings})
 * @property {Boolean} [gestureSettingsTouch.scrollToZoom=false] - Zoom on scroll gesture
 * @property {Boolean} [gestureSettingsTouch.clickToZoom=false] - Zoom on click gesture
 * @property {Boolean} [gestureSettingsTouch.dblClickToZoom=true] - Zoom on double-click gesture. Note: If set to true
 *     then clickToZoom should be set to false to prevent multiple zooms.
 * @property {Boolean} [gestureSettingsTouch.pinchToZoom=true] - Zoom on pinch gesture
 * @property {Boolean} [gestureSettingsTouch.flickEnabled=true] - Enable flick gesture
 * @property {Number} [gestureSettingsTouch.flickMinSpeed=120] - If flickEnabled is true, the minimum speed to initiate a flick gesture (pixels-per-second)
 * @property {Number} [gestureSettingsTouch.flickMomentum=0.25] - If flickEnabled is true, the momentum factor for the flick gesture
 * @property {Boolean} [gestureSettingsTouch.pinchRotate=false] - If pinchRotate is true, the user will have the ability to rotate the image using their fingers.
 *
 * @property {OpenSeadragon.GestureSettings} [gestureSettingsPen]
 *     Settings for gestures generated by a pen pointer device. (See {@link OpenSeadragon.GestureSettings})
 * @property {Boolean} [gestureSettingsPen.scrollToZoom=false] - Zoom on scroll gesture
 * @property {Boolean} [gestureSettingsPen.clickToZoom=true] - Zoom on click gesture
 * @property {Boolean} [gestureSettingsPen.dblClickToZoom=false] - Zoom on double-click gesture. Note: If set to true
 *     then clickToZoom should be set to false to prevent multiple zooms.
 * @property {Boolean} [gestureSettingsPen.pinchToZoom=false] - Zoom on pinch gesture
 * @property {Boolean} [gestureSettingsPen.flickEnabled=false] - Enable flick gesture
 * @property {Number} [gestureSettingsPen.flickMinSpeed=120] - If flickEnabled is true, the minimum speed to initiate a flick gesture (pixels-per-second)
 * @property {Number} [gestureSettingsPen.flickMomentum=0.25] - If flickEnabled is true, the momentum factor for the flick gesture
 * @property {Boolean} [gestureSettingsPen.pinchRotate=false] - If pinchRotate is true, the user will have the ability to rotate the image using their fingers.
 *
 * @property {OpenSeadragon.GestureSettings} [gestureSettingsUnknown]
 *     Settings for gestures generated by unknown pointer devices. (See {@link OpenSeadragon.GestureSettings})
 * @property {Boolean} [gestureSettingsUnknown.scrollToZoom=true] - Zoom on scroll gesture
 * @property {Boolean} [gestureSettingsUnknown.clickToZoom=false] - Zoom on click gesture
 * @property {Boolean} [gestureSettingsUnknown.dblClickToZoom=true] - Zoom on double-click gesture. Note: If set to true
 *     then clickToZoom should be set to false to prevent multiple zooms.
 * @property {Boolean} [gestureSettingsUnknown.pinchToZoom=true] - Zoom on pinch gesture
 * @property {Boolean} [gestureSettingsUnknown.flickEnabled=true] - Enable flick gesture
 * @property {Number} [gestureSettingsUnknown.flickMinSpeed=120] - If flickEnabled is true, the minimum speed to initiate a flick gesture (pixels-per-second)
 * @property {Number} [gestureSettingsUnknown.flickMomentum=0.25] - If flickEnabled is true, the momentum factor for the flick gesture
 * @property {Boolean} [gestureSettingsUnknown.pinchRotate=false] - If pinchRotate is true, the user will have the ability to rotate the image using their fingers.
 *
 * @property {Number} [zoomPerClick=2.0]
 *     The "zoom distance" per mouse click or touch tap. <em><strong>Note:</strong> Setting this to 1.0 effectively disables the click-to-zoom feature (also see gestureSettings[Mouse|Touch|Pen].clickToZoom/dblClickToZoom).</em>
 *
 * @property {Number} [zoomPerScroll=1.2]
 *     The "zoom distance" per mouse scroll or touch pinch. <em><strong>Note:</strong> Setting this to 1.0 effectively disables the mouse-wheel zoom feature (also see gestureSettings[Mouse|Touch|Pen].scrollToZoom}).</em>
 *
 * @property {Number} [zoomPerSecond=1.0]
 *     The number of seconds to animate a single zoom event over.
 *
 * @property {Boolean} [showNavigator=false]
 *     Set to true to make the navigator minimap appear.
 *
 * @property {String} [navigatorId=navigator-GENERATED DATE]
 *     The ID of a div to hold the navigator minimap.
 *     If an ID is specified, the navigatorPosition, navigatorSizeRatio, navigatorMaintainSizeRatio, and navigatorTop|Left|Height|Width options will be ignored.
 *     If an ID is not specified, a div element will be generated and placed on top of the main image.
 *
 * @property {String} [navigatorPosition='TOP_RIGHT']
 *     Valid values are 'TOP_LEFT', 'TOP_RIGHT', 'BOTTOM_LEFT', 'BOTTOM_RIGHT', or 'ABSOLUTE'.<br>
 *     If 'ABSOLUTE' is specified, then navigatorTop|Left|Height|Width determines the size and position of the navigator minimap in the viewer, and navigatorSizeRatio and navigatorMaintainSizeRatio are ignored.<br>
 *     For 'TOP_LEFT', 'TOP_RIGHT', 'BOTTOM_LEFT', and 'BOTTOM_RIGHT', the navigatorSizeRatio or navigatorHeight|Width values determine the size of the navigator minimap.
 *
 * @property {Number} [navigatorSizeRatio=0.2]
 *     Ratio of navigator size to viewer size. Ignored if navigatorHeight|Width are specified.
 *
 * @property {Boolean} [navigatorMaintainSizeRatio=false]
 *     If true, the navigator minimap is resized (using navigatorSizeRatio) when the viewer size changes.
 *
 * @property {Number|String} [navigatorTop=null]
 *     Specifies the location of the navigator minimap (see navigatorPosition).
 *
 * @property {Number|String} [navigatorLeft=null]
 *     Specifies the location of the navigator minimap (see navigatorPosition).
 *
 * @property {Number|String} [navigatorHeight=null]
 *     Specifies the size of the navigator minimap (see navigatorPosition).
 *     If specified, navigatorSizeRatio and navigatorMaintainSizeRatio are ignored.
 *
 * @property {Number|String} [navigatorWidth=null]
 *     Specifies the size of the navigator minimap (see navigatorPosition).
 *     If specified, navigatorSizeRatio and navigatorMaintainSizeRatio are ignored.
 *
 * @property {Boolean} [navigatorAutoResize=true]
 *     Set to false to prevent polling for navigator size changes. Useful for providing custom resize behavior.
 *     Setting to false can also improve performance when the navigator is configured to a fixed size.
 *
 * @property {Boolean} [navigatorRotate=true]
 *     If true, the navigator will be rotated together with the viewer.
 *
 * @property {Number} [controlsFadeDelay=2000]
 *     The number of milliseconds to wait once the user has stopped interacting
 *     with the interface before begining to fade the controls. Assumes
 *     showNavigationControl and autoHideControls are both true.
 *
 * @property {Number} [controlsFadeLength=1500]
 *     The number of milliseconds to animate the controls fading out.
 *
 * @property {Number} [maxImageCacheCount=200]
 *     The max number of images we should keep in memory (per drawer).
 *
 * @property {Number} [timeout=30000]
 *
 * @property {Boolean} [useCanvas=true]
 *     Set to false to not use an HTML canvas element for image rendering even if canvas is supported.
 *
 * @property {Number} [minPixelRatio=0.5]
 *     The higher the minPixelRatio, the lower the quality of the image that
 *     is considered sufficient to stop rendering a given zoom level.  For
 *     example, if you are targeting mobile devices with less bandwith you may
 *     try setting this to 1.5 or higher.
 *
 * @property {Boolean} [mouseNavEnabled=true]
 *     Is the user able to interact with the image via mouse or touch. Default
 *     interactions include draging the image in a plane, and zooming in toward
 *     and away from the image.
 *
 * @property {Boolean} [showNavigationControl=true]
 *     Set to false to prevent the appearance of the default navigation controls.<br>
 *     Note that if set to false, the customs buttons set by the options
 *     zoomInButton, zoomOutButton etc, are rendered inactive.
 *
 * @property {OpenSeadragon.ControlAnchor} [navigationControlAnchor=TOP_LEFT]
 *     Placement of the default navigation controls.
 *     To set the placement of the sequence controls, see the
 *     sequenceControlAnchor option.
 *
 * @property {Boolean} [showZoomControl=true]
 *     If true then + and - buttons to zoom in and out are displayed.<br>
 *     Note: {@link OpenSeadragon.Options.showNavigationControl} is overriding
 *     this setting when set to false.
 *
 * @property {Boolean} [showHomeControl=true]
 *     If true then the 'Go home' button is displayed to go back to the original
 *     zoom and pan.<br>
 *     Note: {@link OpenSeadragon.Options.showNavigationControl} is overriding
 *     this setting when set to false.
 *
 * @property {Boolean} [showFullPageControl=true]
 *     If true then the 'Toggle full page' button is displayed to switch
 *     between full page and normal mode.<br>
 *     Note: {@link OpenSeadragon.Options.showNavigationControl} is overriding
 *     this setting when set to false.
 *
 * @property {Boolean} [showRotationControl=false]
 *     If true then the rotate left/right controls will be displayed as part of the
 *     standard controls. This is also subject to the browser support for rotate
 *     (e.g. viewer.drawer.canRotate()).<br>
 *     Note: {@link OpenSeadragon.Options.showNavigationControl} is overriding
 *     this setting when set to false.
 *
 * @property {Boolean} [showSequenceControl=true]
 *     If sequenceMode is true, then provide buttons for navigating forward and
 *     backward through the images.
 *
 * @property {OpenSeadragon.ControlAnchor} [sequenceControlAnchor=TOP_LEFT]
 *     Placement of the default sequence controls.
 *
 * @property {Boolean} [navPrevNextWrap=false]
 *     If true then the 'previous' button will wrap to the last image when
 *     viewing the first image and the 'next' button will wrap to the first
 *     image when viewing the last image.
 *
 * @property {String} zoomInButton
 *     Set the id of the custom 'Zoom in' button to use.
 *     This is useful to have a custom button anywhere in the web page.<br>
 *     To only change the button images, consider using
 *     {@link OpenSeadragon.Options.navImages}
 *
 * @property {String} zoomOutButton
 *     Set the id of the custom 'Zoom out' button to use.
 *     This is useful to have a custom button anywhere in the web page.<br>
 *     To only change the button images, consider using
 *     {@link OpenSeadragon.Options.navImages}
 *
 * @property {String} homeButton
 *     Set the id of the custom 'Go home' button to use.
 *     This is useful to have a custom button anywhere in the web page.<br>
 *     To only change the button images, consider using
 *     {@link OpenSeadragon.Options.navImages}
 *
 * @property {String} fullPageButton
 *     Set the id of the custom 'Toggle full page' button to use.
 *     This is useful to have a custom button anywhere in the web page.<br>
 *     To only change the button images, consider using
 *     {@link OpenSeadragon.Options.navImages}
 *
 * @property {String} rotateLeftButton
 *     Set the id of the custom 'Rotate left' button to use.
 *     This is useful to have a custom button anywhere in the web page.<br>
 *     To only change the button images, consider using
 *     {@link OpenSeadragon.Options.navImages}
 *
 * @property {String} rotateRightButton
 *     Set the id of the custom 'Rotate right' button to use.
 *     This is useful to have a custom button anywhere in the web page.<br>
 *     To only change the button images, consider using
 *     {@link OpenSeadragon.Options.navImages}
 *
 * @property {String} previousButton
 *     Set the id of the custom 'Previous page' button to use.
 *     This is useful to have a custom button anywhere in the web page.<br>
 *     To only change the button images, consider using
 *     {@link OpenSeadragon.Options.navImages}
 *
 * @property {String} nextButton
 *     Set the id of the custom 'Next page' button to use.
 *     This is useful to have a custom button anywhere in the web page.<br>
 *     To only change the button images, consider using
 *     {@link OpenSeadragon.Options.navImages}
 *
 * @property {Boolean} [sequenceMode=false]
 *     Set to true to have the viewer treat your tilesources as a sequence of images to
 *     be opened one at a time rather than all at once.
 *
 * @property {Number} [initialPage=0]
 *     If sequenceMode is true, display this page initially.
 *
 * @property {Boolean} [preserveViewport=false]
 *     If sequenceMode is true, then normally navigating through each image resets the
 *     viewport to 'home' position.  If preserveViewport is set to true, then the viewport
 *     position is preserved when navigating between images in the sequence.
 *
 * @property {Boolean} [preserveOverlays=false]
 *     If sequenceMode is true, then normally navigating through each image
 *     resets the overlays.
 *     If preserveOverlays is set to true, then the overlays added with {@link OpenSeadragon.Viewer#addOverlay}
 *     are preserved when navigating between images in the sequence.
 *     Note: setting preserveOverlays overrides any overlays specified in the global
 *     "overlays" option for the Viewer. It's also not compatible with specifying
 *     per-tileSource overlays via the options, as those overlays will persist
 *     even after the tileSource is closed.
 *
 * @property {Boolean} [showReferenceStrip=false]
 *     If sequenceMode is true, then display a scrolling strip of image thumbnails for
 *     navigating through the images.
 *
 * @property {String} [referenceStripScroll='horizontal']
 *
 * @property {Element} [referenceStripElement=null]
 *
 * @property {Number} [referenceStripHeight=null]
 *
 * @property {Number} [referenceStripWidth=null]
 *
 * @property {String} [referenceStripPosition='BOTTOM_LEFT']
 *
 * @property {Number} [referenceStripSizeRatio=0.2]
 *
 * @property {Boolean} [collectionMode=false]
 *     Set to true to have the viewer arrange your TiledImages in a grid or line.
 *
 * @property {Number} [collectionRows=3]
 *     If collectionMode is true, specifies how many rows the grid should have. Use 1 to make a line.
 *     If collectionLayout is 'vertical', specifies how many columns instead.
 *
 * @property {Number} [collectionColumns=0]
 *     If collectionMode is true, specifies how many columns the grid should have. Use 1 to make a line.
 *     If collectionLayout is 'vertical', specifies how many rows instead. Ignored if collectionRows is not set to a falsy value.
 *
 * @property {String} [collectionLayout='horizontal']
 *     If collectionMode is true, specifies whether to arrange vertically or horizontally.
 *
 * @property {Number} [collectionTileSize=800]
 *     If collectionMode is true, specifies the size, in viewport coordinates, for each TiledImage to fit into.
 *     The TiledImage will be centered within a square of the specified size.
 *
 * @property {Number} [collectionTileMargin=80]
 *     If collectionMode is true, specifies the margin, in viewport coordinates, between each TiledImage.
 *
 * @property {String|Boolean} [crossOriginPolicy=false]
 *     Valid values are 'Anonymous', 'use-credentials', and false. If false, canvas requests will
 *     not use CORS, and the canvas will be tainted.
 *
 * @property {Boolean} [ajaxWithCredentials=false]
 *     Whether to set the withCredentials XHR flag for AJAX requests (when loading tile sources).
 *     Note that this can be overridden at the {@link OpenSeadragon.TileSource} level.
 *
 */

/**
 * Settings for gestures generated by a pointer device.
 *
 * @typedef {Object} GestureSettings
 * @memberof OpenSeadragon
 *
 * @property {Boolean} scrollToZoom
 *     Set to false to disable zooming on scroll gestures.
 *
 * @property {Boolean} clickToZoom
 *     Set to false to disable zooming on click gestures.
 *
 * @property {Boolean} dblClickToZoom
 *     Set to false to disable zooming on double-click gestures. Note: If set to true
 *     then clickToZoom should be set to false to prevent multiple zooms.
 *
 * @property {Boolean} pinchToZoom
 *     Set to false to disable zooming on pinch gestures.
 *
 * @property {Boolean} flickEnabled
 *     Set to false to disable the kinetic panning effect (flick) at the end of a drag gesture.
 *
 * @property {Number} flickMinSpeed
 *     If flickEnabled is true, the minimum speed (in pixels-per-second) required to cause the kinetic panning effect (flick) at the end of a drag gesture.
 *
 * @property {Number} flickMomentum
 *     If flickEnabled is true, a constant multiplied by the velocity to determine the distance of the kinetic panning effect (flick) at the end of a drag gesture.
 *     A larger value will make the flick feel "lighter", while a smaller value will make the flick feel "heavier".
 *     Note: springStiffness and animationTime also affect the "spring" used to stop the flick animation.
 *
 */

/**
  * The names for the image resources used for the image navigation buttons.
  *
  * @typedef {Object} NavImages
  * @memberof OpenSeadragon
  *
  * @property {Object} zoomIn - Images for the zoom-in button.
  * @property {String} zoomIn.REST
  * @property {String} zoomIn.GROUP
  * @property {String} zoomIn.HOVER
  * @property {String} zoomIn.DOWN
  *
  * @property {Object} zoomOut - Images for the zoom-out button.
  * @property {String} zoomOut.REST
  * @property {String} zoomOut.GROUP
  * @property {String} zoomOut.HOVER
  * @property {String} zoomOut.DOWN
  *
  * @property {Object} home - Images for the home button.
  * @property {String} home.REST
  * @property {String} home.GROUP
  * @property {String} home.HOVER
  * @property {String} home.DOWN
  *
  * @property {Object} fullpage - Images for the full-page button.
  * @property {String} fullpage.REST
  * @property {String} fullpage.GROUP
  * @property {String} fullpage.HOVER
  * @property {String} fullpage.DOWN
  *
  * @property {Object} rotateleft - Images for the rotate left button.
  * @property {String} rotateleft.REST
  * @property {String} rotateleft.GROUP
  * @property {String} rotateleft.HOVER
  * @property {String} rotateleft.DOWN
  *
  * @property {Object} rotateright - Images for the rotate right button.
  * @property {String} rotateright.REST
  * @property {String} rotateright.GROUP
  * @property {String} rotateright.HOVER
  * @property {String} rotateright.DOWN
  *
  * @property {Object} previous - Images for the previous button.
  * @property {String} previous.REST
  * @property {String} previous.GROUP
  * @property {String} previous.HOVER
  * @property {String} previous.DOWN
  *
  * @property {Object} next - Images for the next button.
  * @property {String} next.REST
  * @property {String} next.GROUP
  * @property {String} next.HOVER
  * @property {String} next.DOWN
  *
  */

/**
 * This function serves as a single point of instantiation for an {@link OpenSeadragon.Viewer}, including all
 * combinations of out-of-the-box configurable features.
 *
 * @function OpenSeadragon
 * @memberof module:OpenSeadragon
 * @param {OpenSeadragon.Options} options - Viewer options.
 * @returns {OpenSeadragon.Viewer}
 */
'use strict';

window.OpenSeadragon = window.OpenSeadragon || function (options) {

    return new OpenSeadragon.Viewer(options);
};

if (typeof define === 'function' && define.amd) {
    define(function () {
        return window.OpenSeadragon;
    });
}

(function ($) {

    /**
     * The OpenSeadragon version.
     *
     * @member {Object} OpenSeadragon.version
     * @property {String} versionStr - The version number as a string ('major.minor.revision').
     * @property {Number} major - The major version number.
     * @property {Number} minor - The minor version number.
     * @property {Number} revision - The revision number.
     * @since 1.0.0
     */
    $.version = {
        versionStr: '2.1.0',
        major: parseInt('2', 10),
        minor: parseInt('1', 10),
        revision: parseInt('0', 10)
    };

    /**
     * Taken from jquery 1.6.1
     * [[Class]] -> type pairs
     * @private
     */
    var class2type = {
        '[object Boolean]': 'boolean',
        '[object Number]': 'number',
        '[object String]': 'string',
        '[object Function]': 'function',
        '[object Array]': 'array',
        '[object Date]': 'date',
        '[object RegExp]': 'regexp',
        '[object Object]': 'object'
    },

    // Save a reference to some core methods
    toString = Object.prototype.toString,
        hasOwn = Object.prototype.hasOwnProperty;

    /**
     * Taken from jQuery 1.6.1
     * @function isFunction
     * @memberof OpenSeadragon
     * @see {@link http://www.jquery.com/ jQuery}
     */
    $.isFunction = function (obj) {
        return $.type(obj) === "function";
    };

    /**
     * Taken from jQuery 1.6.1
     * @function isArray
     * @memberof OpenSeadragon
     * @see {@link http://www.jquery.com/ jQuery}
     */
    $.isArray = Array.isArray || function (obj) {
        return $.type(obj) === "array";
    };

    /**
     * A crude way of determining if an object is a window.
     * Taken from jQuery 1.6.1
     * @function isWindow
     * @memberof OpenSeadragon
     * @see {@link http://www.jquery.com/ jQuery}
     */
    $.isWindow = function (obj) {
        return obj && typeof obj === "object" && "setInterval" in obj;
    };

    /**
     * Taken from jQuery 1.6.1
     * @function type
     * @memberof OpenSeadragon
     * @see {@link http://www.jquery.com/ jQuery}
     */
    $.type = function (obj) {
        return obj === null || obj === undefined ? String(obj) : class2type[toString.call(obj)] || "object";
    };

    /**
     * Taken from jQuery 1.6.1
     * @function isPlainObject
     * @memberof OpenSeadragon
     * @see {@link http://www.jquery.com/ jQuery}
     */
    $.isPlainObject = function (obj) {
        // Must be an Object.
        // Because of IE, we also have to check the presence of the constructor property.
        // Make sure that DOM nodes and window objects don't pass through, as well
        if (!obj || OpenSeadragon.type(obj) !== "object" || obj.nodeType || $.isWindow(obj)) {
            return false;
        }

        // Not own constructor property must be Object
        if (obj.constructor && !hasOwn.call(obj, "constructor") && !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
            return false;
        }

        // Own properties are enumerated firstly, so to speed up,
        // if last one is own, then all properties are own.

        var lastKey;
        for (var key in obj) {
            lastKey = key;
        }

        return lastKey === undefined || hasOwn.call(obj, lastKey);
    };

    /**
     * Taken from jQuery 1.6.1
     * @function isEmptyObject
     * @memberof OpenSeadragon
     * @see {@link http://www.jquery.com/ jQuery}
     */
    $.isEmptyObject = function (obj) {
        for (var name in obj) {
            return false;
        }
        return true;
    };

    /**
     * True if the browser supports the HTML5 canvas element
     * @member {Boolean} supportsCanvas
     * @memberof OpenSeadragon
     */
    $.supportsCanvas = (function () {
        var canvasElement = document.createElement('canvas');
        return !!($.isFunction(canvasElement.getContext) && canvasElement.getContext('2d'));
    })();

    /**
     * Test whether the submitted canvas is tainted or not.
     * @argument {Canvas} canvas The canvas to test.
     * @returns {Boolean} True if the canvas is tainted.
     */
    $.isCanvasTainted = function (canvas) {
        var isTainted = false;
        try {
            // We test if the canvas is tainted by retrieving data from it.
            // An exception will be raised if the canvas is tainted.
            var data = canvas.getContext('2d').getImageData(0, 0, 1, 1);
        } catch (e) {
            isTainted = true;
        }
        return isTainted;
    };

    /**
     * A ratio comparing the device screen's pixel density to the canvas's backing store pixel density. Defaults to 1 if canvas isn't supported by the browser.
     * @member {Number} pixelDensityRatio
     * @memberof OpenSeadragon
     */
    $.pixelDensityRatio = (function () {
        if ($.supportsCanvas) {
            var context = document.createElement('canvas').getContext('2d');
            var devicePixelRatio = window.devicePixelRatio || 1;
            var backingStoreRatio = context.webkitBackingStorePixelRatio || context.mozBackingStorePixelRatio || context.msBackingStorePixelRatio || context.oBackingStorePixelRatio || context.backingStorePixelRatio || 1;
            return devicePixelRatio / backingStoreRatio;
        } else {
            return 1;
        }
    })();
})(OpenSeadragon);

/**
 *  This closure defines all static methods available to the OpenSeadragon
 *  namespace.  Many, if not most, are taked directly from jQuery for use
 *  to simplify and reduce common programming patterns.  More static methods
 *  from jQuery may eventually make their way into this though we are
 *  attempting to avoid an explicit dependency on jQuery only because
 *  OpenSeadragon is a broadly useful code base and would be made less broad
 *  by requiring jQuery fully.
 *
 *  Some static methods have also been refactored from the original OpenSeadragon
 *  project.
 */
(function ($) {

    /**
     * Taken from jQuery 1.6.1
     * @function extend
     * @memberof OpenSeadragon
     * @see {@link http://www.jquery.com/ jQuery}
     */
    $.extend = function () {
        var options,
            name,
            src,
            copy,
            copyIsArray,
            clone,
            target = arguments[0] || {},
            length = arguments.length,
            deep = false,
            i = 1;

        // Handle a deep copy situation
        if (typeof target === "boolean") {
            deep = target;
            target = arguments[1] || {};
            // skip the boolean and the target
            i = 2;
        }

        // Handle case when target is a string or something (possible in deep copy)
        if (typeof target !== "object" && !OpenSeadragon.isFunction(target)) {
            target = {};
        }

        // extend jQuery itself if only one argument is passed
        if (length === i) {
            target = this;
            --i;
        }

        for (; i < length; i++) {
            // Only deal with non-null/undefined values
            options = arguments[i];
            if (options !== null || options !== undefined) {
                // Extend the base object
                for (name in options) {
                    src = target[name];
                    copy = options[name];

                    // Prevent never-ending loop
                    if (target === copy) {
                        continue;
                    }

                    // Recurse if we're merging plain objects or arrays
                    if (deep && copy && (OpenSeadragon.isPlainObject(copy) || (copyIsArray = OpenSeadragon.isArray(copy)))) {
                        if (copyIsArray) {
                            copyIsArray = false;
                            clone = src && OpenSeadragon.isArray(src) ? src : [];
                        } else {
                            clone = src && OpenSeadragon.isPlainObject(src) ? src : {};
                        }

                        // Never move original objects, clone them
                        target[name] = OpenSeadragon.extend(deep, clone, copy);

                        // Don't bring in undefined values
                    } else if (copy !== undefined) {
                            target[name] = copy;
                        }
                }
            }
        }

        // Return the modified object
        return target;
    };

    $.extend($, /** @lends OpenSeadragon */{
        /**
         * The default values for the optional settings documented at {@link OpenSeadragon.Options}.
         * @static
         * @type {Object}
         */
        DEFAULT_SETTINGS: {
            //DATA SOURCE DETAILS
            xmlPath: null,
            tileSources: null,
            tileHost: null,
            initialPage: 0,
            crossOriginPolicy: false,
            ajaxWithCredentials: false,

            //PAN AND ZOOM SETTINGS AND CONSTRAINTS
            panHorizontal: true,
            panVertical: true,
            constrainDuringPan: false,
            wrapHorizontal: false,
            wrapVertical: false,
            visibilityRatio: 0.5, //-> how much of the viewer can be negative space
            minPixelRatio: 0.5, //->closer to 0 draws tiles meant for a higher zoom at this zoom
            defaultZoomLevel: 0,
            minZoomLevel: null,
            maxZoomLevel: null,
            homeFillsViewer: false,

            //UI RESPONSIVENESS AND FEEL
            clickTimeThreshold: 300,
            clickDistThreshold: 5,
            dblClickTimeThreshold: 300,
            dblClickDistThreshold: 20,
            springStiffness: 6.5,
            animationTime: 1.2,
            gestureSettingsMouse: { scrollToZoom: true, clickToZoom: true, dblClickToZoom: false, pinchToZoom: false, flickEnabled: false, flickMinSpeed: 120, flickMomentum: 0.25, pinchRotate: false },
            gestureSettingsTouch: { scrollToZoom: false, clickToZoom: false, dblClickToZoom: true, pinchToZoom: true, flickEnabled: true, flickMinSpeed: 120, flickMomentum: 0.25, pinchRotate: false },
            gestureSettingsPen: { scrollToZoom: false, clickToZoom: true, dblClickToZoom: false, pinchToZoom: false, flickEnabled: false, flickMinSpeed: 120, flickMomentum: 0.25, pinchRotate: false },
            gestureSettingsUnknown: { scrollToZoom: false, clickToZoom: false, dblClickToZoom: true, pinchToZoom: true, flickEnabled: true, flickMinSpeed: 120, flickMomentum: 0.25, pinchRotate: false },
            zoomPerClick: 2,
            zoomPerScroll: 1.2,
            zoomPerSecond: 1.0,
            blendTime: 0,
            alwaysBlend: false,
            autoHideControls: true,
            immediateRender: false,
            minZoomImageRatio: 0.9, //-> closer to 0 allows zoom out to infinity
            maxZoomPixelRatio: 1.1, //-> higher allows 'over zoom' into pixels
            pixelsPerWheelLine: 40,
            autoResize: true,
            preserveImageSizeOnResize: false, // requires autoResize=true
            minScrollDeltaTime: 50,

            //DEFAULT CONTROL SETTINGS
            showSequenceControl: true, //SEQUENCE
            sequenceControlAnchor: null, //SEQUENCE
            preserveViewport: false, //SEQUENCE
            preserveOverlays: false, //SEQUENCE
            navPrevNextWrap: false, //SEQUENCE
            showNavigationControl: true, //ZOOM/HOME/FULL/ROTATION
            navigationControlAnchor: null, //ZOOM/HOME/FULL/ROTATION
            showZoomControl: true, //ZOOM
            showHomeControl: true, //HOME
            showFullPageControl: true, //FULL
            showRotationControl: false, //ROTATION
            controlsFadeDelay: 2000, //ZOOM/HOME/FULL/SEQUENCE
            controlsFadeLength: 1500, //ZOOM/HOME/FULL/SEQUENCE
            mouseNavEnabled: true, //GENERAL MOUSE INTERACTIVITY

            //VIEWPORT NAVIGATOR SETTINGS
            showNavigator: false,
            navigatorId: null,
            navigatorPosition: null,
            navigatorSizeRatio: 0.2,
            navigatorMaintainSizeRatio: false,
            navigatorTop: null,
            navigatorLeft: null,
            navigatorHeight: null,
            navigatorWidth: null,
            navigatorAutoResize: true,
            navigatorRotate: true,

            // INITIAL ROTATION
            degrees: 0,

            // APPEARANCE
            opacity: 1,
            placeholderFillStyle: null,

            //REFERENCE STRIP SETTINGS
            showReferenceStrip: false,
            referenceStripScroll: 'horizontal',
            referenceStripElement: null,
            referenceStripHeight: null,
            referenceStripWidth: null,
            referenceStripPosition: 'BOTTOM_LEFT',
            referenceStripSizeRatio: 0.2,

            //COLLECTION VISUALIZATION SETTINGS
            collectionRows: 3, //or columns depending on layout
            collectionColumns: 0, //columns in horizontal layout, rows in vertical layout
            collectionLayout: 'horizontal', //vertical
            collectionMode: false,
            collectionTileSize: 800,
            collectionTileMargin: 80,

            //PERFORMANCE SETTINGS
            imageLoaderLimit: 0,
            maxImageCacheCount: 200,
            timeout: 30000,
            useCanvas: true, // Use canvas element for drawing if available

            //INTERFACE RESOURCE SETTINGS
            prefixUrl: "/images/",
            navImages: {
                zoomIn: {
                    REST: 'zoomin_rest.png',
                    GROUP: 'zoomin_grouphover.png',
                    HOVER: 'zoomin_hover.png',
                    DOWN: 'zoomin_pressed.png'
                },
                zoomOut: {
                    REST: 'zoomout_rest.png',
                    GROUP: 'zoomout_grouphover.png',
                    HOVER: 'zoomout_hover.png',
                    DOWN: 'zoomout_pressed.png'
                },
                home: {
                    REST: 'home_rest.png',
                    GROUP: 'home_grouphover.png',
                    HOVER: 'home_hover.png',
                    DOWN: 'home_pressed.png'
                },
                fullpage: {
                    REST: 'fullpage_rest.png',
                    GROUP: 'fullpage_grouphover.png',
                    HOVER: 'fullpage_hover.png',
                    DOWN: 'fullpage_pressed.png'
                },
                rotateleft: {
                    REST: 'rotateleft_rest.png',
                    GROUP: 'rotateleft_grouphover.png',
                    HOVER: 'rotateleft_hover.png',
                    DOWN: 'rotateleft_pressed.png'
                },
                rotateright: {
                    REST: 'rotateright_rest.png',
                    GROUP: 'rotateright_grouphover.png',
                    HOVER: 'rotateright_hover.png',
                    DOWN: 'rotateright_pressed.png'
                },
                previous: {
                    REST: 'previous_rest.png',
                    GROUP: 'previous_grouphover.png',
                    HOVER: 'previous_hover.png',
                    DOWN: 'previous_pressed.png'
                },
                next: {
                    REST: 'next_rest.png',
                    GROUP: 'next_grouphover.png',
                    HOVER: 'next_hover.png',
                    DOWN: 'next_pressed.png'
                }
            },

            //DEVELOPER SETTINGS
            debugMode: false,
            debugGridColor: '#437AB2'
        },

        /**
         * TODO: get rid of this.  I can't see how it's required at all.  Looks
         *       like an early legacy code artifact.
         * @static
         * @ignore
         */
        SIGNAL: "----seadragon----",

        /**
         * Returns a function which invokes the method as if it were a method belonging to the object.
         * @function
         * @param {Object} object
         * @param {Function} method
         * @returns {Function}
         */
        delegate: function delegate(object, method) {
            return function () {
                var args = arguments;
                if (args === undefined) {
                    args = [];
                }
                return method.apply(object, args);
            };
        },

        /**
         * An enumeration of Browser vendors.
         * @static
         * @type {Object}
         * @property {Number} UNKNOWN
         * @property {Number} IE
         * @property {Number} FIREFOX
         * @property {Number} SAFARI
         * @property {Number} CHROME
         * @property {Number} OPERA
         */
        BROWSERS: {
            UNKNOWN: 0,
            IE: 1,
            FIREFOX: 2,
            SAFARI: 3,
            CHROME: 4,
            OPERA: 5
        },

        /**
         * Returns a DOM Element for the given id or element.
         * @function
         * @param {String|Element} element Accepts an id or element.
         * @returns {Element} The element with the given id, null, or the element itself.
         */
        getElement: function getElement(element) {
            if (typeof element == "string") {
                element = document.getElementById(element);
            }
            return element;
        },

        /**
         * Determines the position of the upper-left corner of the element.
         * @function
         * @param {Element|String} element - the elemenet we want the position for.
         * @returns {OpenSeadragon.Point} - the position of the upper left corner of the element.
         */
        getElementPosition: function getElementPosition(element) {
            var result = new $.Point(),
                isFixed,
                offsetParent;

            element = $.getElement(element);
            isFixed = $.getElementStyle(element).position == "fixed";
            offsetParent = getOffsetParent(element, isFixed);

            while (offsetParent) {

                result.x += element.offsetLeft;
                result.y += element.offsetTop;

                if (isFixed) {
                    result = result.plus($.getPageScroll());
                }

                element = offsetParent;
                isFixed = $.getElementStyle(element).position == "fixed";
                offsetParent = getOffsetParent(element, isFixed);
            }

            return result;
        },

        /**
         * Determines the position of the upper-left corner of the element adjusted for current page and/or element scroll.
         * @function
         * @param {Element|String} element - the element we want the position for.
         * @returns {OpenSeadragon.Point} - the position of the upper left corner of the element adjusted for current page and/or element scroll.
         */
        getElementOffset: function getElementOffset(element) {
            element = $.getElement(element);

            var doc = element && element.ownerDocument,
                docElement,
                win,
                boundingRect = { top: 0, left: 0 };

            if (!doc) {
                return new $.Point();
            }

            docElement = doc.documentElement;

            if (typeof element.getBoundingClientRect !== typeof undefined) {
                boundingRect = element.getBoundingClientRect();
            }

            win = doc == doc.window ? doc : doc.nodeType === 9 ? doc.defaultView || doc.parentWindow : false;

            return new $.Point(boundingRect.left + (win.pageXOffset || docElement.scrollLeft) - (docElement.clientLeft || 0), boundingRect.top + (win.pageYOffset || docElement.scrollTop) - (docElement.clientTop || 0));
        },

        /**
         * Determines the height and width of the given element.
         * @function
         * @param {Element|String} element
         * @returns {OpenSeadragon.Point}
         */
        getElementSize: function getElementSize(element) {
            element = $.getElement(element);

            return new $.Point(element.clientWidth, element.clientHeight);
        },

        /**
         * Returns the CSSStyle object for the given element.
         * @function
         * @param {Element|String} element
         * @returns {CSSStyle}
         */
        getElementStyle: document.documentElement.currentStyle ? function (element) {
            element = $.getElement(element);
            return element.currentStyle;
        } : function (element) {
            element = $.getElement(element);
            return window.getComputedStyle(element, "");
        },

        /**
         * Determines if a point is within the bounding rectangle of the given element (hit-test).
         * @function
         * @param {Element|String} element
         * @param {OpenSeadragon.Point} point
         * @returns {Boolean}
         */
        pointInElement: function pointInElement(element, point) {
            element = $.getElement(element);
            var offset = $.getElementOffset(element),
                size = $.getElementSize(element);
            return point.x >= offset.x && point.x < offset.x + size.x && point.y < offset.y + size.y && point.y >= offset.y;
        },

        /**
         * Gets the latest event, really only useful internally since its
         * specific to IE behavior.
         * @function
         * @param {Event} [event]
         * @returns {Event}
         * @deprecated For internal use only
         * @private
         */
        getEvent: function getEvent(event) {
            if (event) {
                $.getEvent = function (event) {
                    return event;
                };
            } else {
                $.getEvent = function () {
                    return window.event;
                };
            }
            return $.getEvent(event);
        },

        /**
         * Gets the position of the mouse on the screen for a given event.
         * @function
         * @param {Event} [event]
         * @returns {OpenSeadragon.Point}
         */
        getMousePosition: function getMousePosition(event) {

            if (typeof event.pageX == "number") {
                $.getMousePosition = function (event) {
                    var result = new $.Point();

                    event = $.getEvent(event);
                    result.x = event.pageX;
                    result.y = event.pageY;

                    return result;
                };
            } else if (typeof event.clientX == "number") {
                $.getMousePosition = function (event) {
                    var result = new $.Point();

                    event = $.getEvent(event);
                    result.x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
                    result.y = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;

                    return result;
                };
            } else {
                throw new Error("Unknown event mouse position, no known technique.");
            }

            return $.getMousePosition(event);
        },

        /**
         * Determines the page's current scroll position.
         * @function
         * @returns {OpenSeadragon.Point}
         */
        getPageScroll: function getPageScroll() {
            var docElement = document.documentElement || {},
                body = document.body || {};

            if (typeof window.pageXOffset == "number") {
                $.getPageScroll = function () {
                    return new $.Point(window.pageXOffset, window.pageYOffset);
                };
            } else if (body.scrollLeft || body.scrollTop) {
                $.getPageScroll = function () {
                    return new $.Point(document.body.scrollLeft, document.body.scrollTop);
                };
            } else if (docElement.scrollLeft || docElement.scrollTop) {
                $.getPageScroll = function () {
                    return new $.Point(document.documentElement.scrollLeft, document.documentElement.scrollTop);
                };
            } else {
                // We can't reassign the function yet, as there was no scroll.
                return new $.Point(0, 0);
            }

            return $.getPageScroll();
        },

        /**
         * Set the page scroll position.
         * @function
         * @returns {OpenSeadragon.Point}
         */
        setPageScroll: function setPageScroll(scroll) {
            if (typeof window.scrollTo !== "undefined") {
                $.setPageScroll = function (scroll) {
                    window.scrollTo(scroll.x, scroll.y);
                };
            } else {
                var originalScroll = $.getPageScroll();
                if (originalScroll.x === scroll.x && originalScroll.y === scroll.y) {
                    // We are already correctly positioned and there
                    // is no way to detect the correct method.
                    return;
                }

                document.body.scrollLeft = scroll.x;
                document.body.scrollTop = scroll.y;
                var currentScroll = $.getPageScroll();
                if (currentScroll.x !== originalScroll.x && currentScroll.y !== originalScroll.y) {
                    $.setPageScroll = function (scroll) {
                        document.body.scrollLeft = scroll.x;
                        document.body.scrollTop = scroll.y;
                    };
                    return;
                }

                document.documentElement.scrollLeft = scroll.x;
                document.documentElement.scrollTop = scroll.y;
                currentScroll = $.getPageScroll();
                if (currentScroll.x !== originalScroll.x && currentScroll.y !== originalScroll.y) {
                    $.setPageScroll = function (scroll) {
                        document.documentElement.scrollLeft = scroll.x;
                        document.documentElement.scrollTop = scroll.y;
                    };
                    return;
                }

                // We can't find anything working, so we do nothing.
                $.setPageScroll = function (scroll) {};
            }

            return $.setPageScroll(scroll);
        },

        /**
         * Determines the size of the browsers window.
         * @function
         * @returns {OpenSeadragon.Point}
         */
        getWindowSize: function getWindowSize() {
            var docElement = document.documentElement || {},
                body = document.body || {};

            if (typeof window.innerWidth == 'number') {
                $.getWindowSize = function () {
                    return new $.Point(window.innerWidth, window.innerHeight);
                };
            } else if (docElement.clientWidth || docElement.clientHeight) {
                $.getWindowSize = function () {
                    return new $.Point(document.documentElement.clientWidth, document.documentElement.clientHeight);
                };
            } else if (body.clientWidth || body.clientHeight) {
                $.getWindowSize = function () {
                    return new $.Point(document.body.clientWidth, document.body.clientHeight);
                };
            } else {
                throw new Error("Unknown window size, no known technique.");
            }

            return $.getWindowSize();
        },

        /**
         * Wraps the given element in a nest of divs so that the element can
         * be easily centered using CSS tables
         * @function
         * @param {Element|String} element
         * @returns {Element} outermost wrapper element
         */
        makeCenteredNode: function makeCenteredNode(element) {
            // Convert a possible ID to an actual HTMLElement
            element = $.getElement(element);

            /*
                CSS tables require you to have a display:table/row/cell hierarchy so we need to create
                three nested wrapper divs:
             */

            var wrappers = [$.makeNeutralElement('div'), $.makeNeutralElement('div'), $.makeNeutralElement('div')];

            // It feels like we should be able to pass style dicts to makeNeutralElement:
            $.extend(wrappers[0].style, {
                display: "table",
                height: "100%",
                width: "100%"
            });

            $.extend(wrappers[1].style, {
                display: "table-row"
            });

            $.extend(wrappers[2].style, {
                display: "table-cell",
                verticalAlign: "middle",
                textAlign: "center"
            });

            wrappers[0].appendChild(wrappers[1]);
            wrappers[1].appendChild(wrappers[2]);
            wrappers[2].appendChild(element);

            return wrappers[0];
        },

        /**
         * Creates an easily positionable element of the given type that therefor
         * serves as an excellent container element.
         * @function
         * @param {String} tagName
         * @returns {Element}
         */
        makeNeutralElement: function makeNeutralElement(tagName) {
            var element = document.createElement(tagName),
                style = element.style;

            style.background = "transparent none";
            style.border = "none";
            style.margin = "0px";
            style.padding = "0px";
            style.position = "static";

            return element;
        },

        /**
         * Returns the current milliseconds, using Date.now() if available
         * @function
         */
        now: function now() {
            if (Date.now) {
                $.now = Date.now;
            } else {
                $.now = function () {
                    return new Date().getTime();
                };
            }

            return $.now();
        },

        /**
         * Ensures an image is loaded correctly to support alpha transparency.
         * Generally only IE has issues doing this correctly for formats like
         * png.
         * @function
         * @param {String} src
         * @returns {Element}
         */
        makeTransparentImage: function makeTransparentImage(src) {

            $.makeTransparentImage = function (src) {
                var img = $.makeNeutralElement("img");

                img.src = src;

                return img;
            };

            if ($.Browser.vendor == $.BROWSERS.IE && $.Browser.version < 7) {

                $.makeTransparentImage = function (src) {
                    var img = $.makeNeutralElement("img"),
                        element = null;

                    element = $.makeNeutralElement("span");
                    element.style.display = "inline-block";

                    img.onload = function () {
                        element.style.width = element.style.width || img.width + "px";
                        element.style.height = element.style.height || img.height + "px";

                        img.onload = null;
                        img = null; // to prevent memory leaks in IE
                    };

                    img.src = src;
                    element.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + src + "', sizingMethod='scale')";

                    return element;
                };
            }

            return $.makeTransparentImage(src);
        },

        /**
         * Sets the opacity of the specified element.
         * @function
         * @param {Element|String} element
         * @param {Number} opacity
         * @param {Boolean} [usesAlpha]
         */
        setElementOpacity: function setElementOpacity(element, opacity, usesAlpha) {

            var ieOpacity, ieFilter;

            element = $.getElement(element);

            if (usesAlpha && !$.Browser.alpha) {
                opacity = Math.round(opacity);
            }

            if ($.Browser.opacity) {
                element.style.opacity = opacity < 1 ? opacity : "";
            } else {
                if (opacity < 1) {
                    ieOpacity = Math.round(100 * opacity);
                    ieFilter = "alpha(opacity=" + ieOpacity + ")";
                    element.style.filter = ieFilter;
                } else {
                    element.style.filter = "";
                }
            }
        },

        /**
         * Sets the specified element's touch-action style attribute to 'none'.
         * @function
         * @param {Element|String} element
         */
        setElementTouchActionNone: function setElementTouchActionNone(element) {
            element = $.getElement(element);
            if (typeof element.style.touchAction !== 'undefined') {
                element.style.touchAction = 'none';
            } else if (typeof element.style.msTouchAction !== 'undefined') {
                element.style.msTouchAction = 'none';
            }
        },

        /**
         * Add the specified CSS class to the element if not present.
         * @function
         * @param {Element|String} element
         * @param {String} className
         */
        addClass: function addClass(element, className) {
            element = $.getElement(element);

            if (!element.className) {
                element.className = className;
            } else if ((' ' + element.className + ' ').indexOf(' ' + className + ' ') === -1) {
                element.className += ' ' + className;
            }
        },

        /**
         * Find the first index at which an element is found in an array or -1
         * if not present.
         *
         * Code taken and adapted from
         * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf#Compatibility
         *
         * @function
         * @param {Array} array The array from which to find the element
         * @param {Object} searchElement The element to find
         * @param {Number} [fromIndex=0] Index to start research.
         * @returns {Number} The index of the element in the array.
         */
        indexOf: function indexOf(array, searchElement, fromIndex) {
            if (Array.prototype.indexOf) {
                this.indexOf = function (array, searchElement, fromIndex) {
                    return array.indexOf(searchElement, fromIndex);
                };
            } else {
                this.indexOf = function (array, searchElement, fromIndex) {
                    var i,
                        pivot = fromIndex ? fromIndex : 0,
                        length;
                    if (!array) {
                        throw new TypeError();
                    }

                    length = array.length;
                    if (length === 0 || pivot >= length) {
                        return -1;
                    }

                    if (pivot < 0) {
                        pivot = length - Math.abs(pivot);
                    }

                    for (i = pivot; i < length; i++) {
                        if (array[i] === searchElement) {
                            return i;
                        }
                    }
                    return -1;
                };
            }
            return this.indexOf(array, searchElement, fromIndex);
        },

        /**
         * Remove the specified CSS class from the element.
         * @function
         * @param {Element|String} element
         * @param {String} className
         */
        removeClass: function removeClass(element, className) {
            var oldClasses,
                newClasses = [],
                i;

            element = $.getElement(element);
            oldClasses = element.className.split(/\s+/);
            for (i = 0; i < oldClasses.length; i++) {
                if (oldClasses[i] && oldClasses[i] !== className) {
                    newClasses.push(oldClasses[i]);
                }
            }
            element.className = newClasses.join(' ');
        },

        /**
         * Adds an event listener for the given element, eventName and handler.
         * @function
         * @param {Element|String} element
         * @param {String} eventName
         * @param {Function} handler
         * @param {Boolean} [useCapture]
         */
        addEvent: (function () {
            if (window.addEventListener) {
                return function (element, eventName, handler, useCapture) {
                    element = $.getElement(element);
                    element.addEventListener(eventName, handler, useCapture);
                };
            } else if (window.attachEvent) {
                return function (element, eventName, handler, useCapture) {
                    element = $.getElement(element);
                    element.attachEvent('on' + eventName, handler);
                };
            } else {
                throw new Error("No known event model.");
            }
        })(),

        /**
         * Remove a given event listener for the given element, event type and
         * handler.
         * @function
         * @param {Element|String} element
         * @param {String} eventName
         * @param {Function} handler
         * @param {Boolean} [useCapture]
         */
        removeEvent: (function () {
            if (window.removeEventListener) {
                return function (element, eventName, handler, useCapture) {
                    element = $.getElement(element);
                    element.removeEventListener(eventName, handler, useCapture);
                };
            } else if (window.detachEvent) {
                return function (element, eventName, handler, useCapture) {
                    element = $.getElement(element);
                    element.detachEvent('on' + eventName, handler);
                };
            } else {
                throw new Error("No known event model.");
            }
        })(),

        /**
         * Cancels the default browser behavior had the event propagated all
         * the way up the DOM to the window object.
         * @function
         * @param {Event} [event]
         */
        cancelEvent: function cancelEvent(event) {
            event = $.getEvent(event);

            if (event.preventDefault) {
                $.cancelEvent = function (event) {
                    // W3C for preventing default
                    event.preventDefault();
                };
            } else {
                $.cancelEvent = function (event) {
                    event = $.getEvent(event);
                    // legacy for preventing default
                    event.cancel = true;
                    // IE for preventing default
                    event.returnValue = false;
                };
            }
            $.cancelEvent(event);
        },

        /**
         * Stops the propagation of the event up the DOM.
         * @function
         * @param {Event} [event]
         */
        stopEvent: function stopEvent(event) {
            event = $.getEvent(event);

            if (event.stopPropagation) {
                // W3C for stopping propagation
                $.stopEvent = function (event) {
                    event.stopPropagation();
                };
            } else {
                // IE for stopping propagation
                $.stopEvent = function (event) {
                    event = $.getEvent(event);
                    event.cancelBubble = true;
                };
            }

            $.stopEvent(event);
        },

        /**
         * Similar to OpenSeadragon.delegate, but it does not immediately call
         * the method on the object, returning a function which can be called
         * repeatedly to delegate the method. It also allows additonal arguments
         * to be passed during construction which will be added during each
         * invocation, and each invocation can add additional arguments as well.
         *
         * @function
         * @param {Object} object
         * @param {Function} method
         * @param [args] any additional arguments are passed as arguments to the
         *  created callback
         * @returns {Function}
         */
        createCallback: function createCallback(object, method) {
            //TODO: This pattern is painful to use and debug.  It's much cleaner
            //      to use pinning plus anonymous functions.  Get rid of this
            //      pattern!
            var initialArgs = [],
                i;
            for (i = 2; i < arguments.length; i++) {
                initialArgs.push(arguments[i]);
            }

            return function () {
                var args = initialArgs.concat([]),
                    i;
                for (i = 0; i < arguments.length; i++) {
                    args.push(arguments[i]);
                }

                return method.apply(object, args);
            };
        },

        /**
         * Retreives the value of a url parameter from the window.location string.
         * @function
         * @param {String} key
         * @returns {String} The value of the url parameter or null if no param matches.
         */
        getUrlParameter: function getUrlParameter(key) {
            var value = URLPARAMS[key];
            return value ? value : null;
        },

        /**
         * Retrieves the protocol used by the url. The url can either be absolute
         * or relative.
         * @function
         * @private
         * @param {String} url The url to retrieve the protocol from.
         * @return {String} The protocol (http:, https:, file:, ftp: ...)
         */
        getUrlProtocol: function getUrlProtocol(url) {
            var match = url.match(/^([a-z]+:)\/\//i);
            if (match === null) {
                // Relative URL, retrive the protocol from window.location
                return window.location.protocol;
            }
            return match[1].toLowerCase();
        },

        /**
         * Create an XHR object
         * @private
         * @param {type} [local] If set to true, the XHR will be file: protocol
         * compatible if possible (but may raise a warning in the browser).
         * @returns {XMLHttpRequest}
         */
        createAjaxRequest: function createAjaxRequest(local) {
            // IE11 does not support window.ActiveXObject so we just try to
            // create one to see if it is supported.
            // See: http://msdn.microsoft.com/en-us/library/ie/dn423948%28v=vs.85%29.aspx
            var supportActiveX;
            try {
                /* global ActiveXObject:true */
                supportActiveX = !!new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {
                supportActiveX = false;
            }

            if (supportActiveX) {
                if (window.XMLHttpRequest) {
                    $.createAjaxRequest = function (local) {
                        if (local) {
                            return new ActiveXObject("Microsoft.XMLHTTP");
                        }
                        return new XMLHttpRequest();
                    };
                } else {
                    $.createAjaxRequest = function () {
                        return new ActiveXObject("Microsoft.XMLHTTP");
                    };
                }
            } else if (window.XMLHttpRequest) {
                $.createAjaxRequest = function () {
                    return new XMLHttpRequest();
                };
            } else {
                throw new Error("Browser doesn't support XMLHttpRequest.");
            }
            return $.createAjaxRequest(local);
        },

        /**
         * Makes an AJAX request.
         * @param {Object} options
         * @param {String} options.url - the url to request
         * @param {Function} options.success - a function to call on a successful response
         * @param {Function} options.error - a function to call on when an error occurs
         * @param {Boolean} [options.withCredentials=false] - whether to set the XHR's withCredentials
         * @throws {Error}
         */
        makeAjaxRequest: function makeAjaxRequest(url, onSuccess, onError) {
            var withCredentials;

            // Note that our preferred API is that you pass in a single object; the named
            // arguments are for legacy support.
            if ($.isPlainObject(url)) {
                onSuccess = url.success;
                onError = url.error;
                withCredentials = url.withCredentials;
                url = url.url;
            }

            var protocol = $.getUrlProtocol(url);
            var request = $.createAjaxRequest(protocol === "file:");

            if (!$.isFunction(onSuccess)) {
                throw new Error("makeAjaxRequest requires a success callback");
            }

            request.onreadystatechange = function () {
                // 4 = DONE (https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest#Properties)
                if (request.readyState == 4) {
                    request.onreadystatechange = function () {};

                    // With protocols other than http/https, the status is 200
                    // on Firefox and 0 on other browsers
                    if (request.status === 200 || request.status === 0 && protocol !== "http:" && protocol !== "https:") {
                        onSuccess(request);
                    } else {
                        $.console.log("AJAX request returned %d: %s", request.status, url);

                        if ($.isFunction(onError)) {
                            onError(request);
                        }
                    }
                }
            };

            if (withCredentials) {
                request.withCredentials = true;
            }

            try {
                request.open("GET", url, true);
                request.send(null);
            } catch (e) {
                var msg = e.message;

                /*
                    IE < 10 does not support CORS and an XHR request to a different origin will fail as soon
                    as send() is called. This is particularly easy to miss during development and appear in
                    production if you use a CDN or domain sharding and the security policy is likely to break
                    exception handlers since any attempt to access a property of the request object will
                    raise an access denied TypeError inside the catch block.
                     To be friendlier, we'll check for this specific error and add a documentation pointer
                    to point developers in the right direction. We test the exception number because IE's
                    error messages are localized.
                */
                var oldIE = $.Browser.vendor == $.BROWSERS.IE && $.Browser.version < 10;
                if (oldIE && typeof e.number != "undefined" && e.number == -2147024891) {
                    msg += "\nSee http://msdn.microsoft.com/en-us/library/ms537505(v=vs.85).aspx#xdomain";
                }

                $.console.log("%s while making AJAX request: %s", e.name, msg);

                request.onreadystatechange = function () {};

                if (window.XDomainRequest) {
                    // IE9 or IE8 might as well try to use XDomainRequest
                    var xdr = new XDomainRequest();
                    if (xdr) {
                        xdr.onload = function (e) {
                            if ($.isFunction(onSuccess)) {
                                onSuccess({ // Faking an xhr object
                                    responseText: xdr.responseText,
                                    status: 200, // XDomainRequest doesn't support status codes, so we just fake one! :/
                                    statusText: 'OK'
                                });
                            }
                        };
                        xdr.onerror = function (e) {
                            if ($.isFunction(onError)) {
                                onError({ // Faking an xhr object
                                    responseText: xdr.responseText,
                                    status: 444, // 444 No Response
                                    statusText: 'An error happened. Due to an XDomainRequest deficiency we can not extract any information about this error. Upgrade your browser.'
                                });
                            }
                        };
                        try {
                            xdr.open('GET', url);
                            xdr.send();
                        } catch (e2) {
                            if ($.isFunction(onError)) {
                                onError(request, e);
                            }
                        }
                    }
                } else {
                    if ($.isFunction(onError)) {
                        onError(request, e);
                    }
                }
            }
        },

        /**
         * Taken from jQuery 1.6.1
         * @function
         * @param {Object} options
         * @param {String} options.url
         * @param {Function} options.callback
         * @param {String} [options.param='callback'] The name of the url parameter
         *      to request the jsonp provider with.
         * @param {String} [options.callbackName=] The name of the callback to
         *      request the jsonp provider with.
         */
        jsonp: function jsonp(options) {
            var script,
                url = options.url,
                head = document.head || document.getElementsByTagName("head")[0] || document.documentElement,
                jsonpCallback = options.callbackName || 'openseadragon' + $.now(),
                previous = window[jsonpCallback],
                replace = "$1" + jsonpCallback + "$2",
                callbackParam = options.param || 'callback',
                callback = options.callback;

            url = url.replace(/(\=)\?(&|$)|\?\?/i, replace);
            // Add callback manually
            url += (/\?/.test(url) ? "&" : "?") + callbackParam + "=" + jsonpCallback;

            // Install callback
            window[jsonpCallback] = function (response) {
                if (!previous) {
                    try {
                        delete window[jsonpCallback];
                    } catch (e) {
                        //swallow
                    }
                } else {
                        window[jsonpCallback] = previous;
                    }
                if (callback && $.isFunction(callback)) {
                    callback(response);
                }
            };

            script = document.createElement("script");

            //TODO: having an issue with async info requests
            if (undefined !== options.async || false !== options.async) {
                script.async = "async";
            }

            if (options.scriptCharset) {
                script.charset = options.scriptCharset;
            }

            script.src = url;

            // Attach handlers for all browsers
            script.onload = script.onreadystatechange = function (_, isAbort) {

                if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {

                    // Handle memory leak in IE
                    script.onload = script.onreadystatechange = null;

                    // Remove the script
                    if (head && script.parentNode) {
                        head.removeChild(script);
                    }

                    // Dereference the script
                    script = undefined;
                }
            };
            // Use insertBefore instead of appendChild  to circumvent an IE6 bug.
            // This arises when a base node is used (#2709 and #4378).
            head.insertBefore(script, head.firstChild);
        },

        /**
         * Fully deprecated. Will throw an error.
         * @function
         * @deprecated use {@link OpenSeadragon.Viewer#open}
         */
        createFromDZI: function createFromDZI() {
            throw "OpenSeadragon.createFromDZI is deprecated, use Viewer.open.";
        },

        /**
         * Parses an XML string into a DOM Document.
         * @function
         * @param {String} string
         * @returns {Document}
         */
        parseXml: function parseXml(string) {
            if (window.DOMParser) {

                $.parseXml = function (string) {
                    var xmlDoc = null,
                        parser;

                    parser = new DOMParser();
                    xmlDoc = parser.parseFromString(string, "text/xml");
                    return xmlDoc;
                };
            } else if (window.ActiveXObject) {

                $.parseXml = function (string) {
                    var xmlDoc = null;

                    xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
                    xmlDoc.async = false;
                    xmlDoc.loadXML(string);
                    return xmlDoc;
                };
            } else {
                throw new Error("Browser doesn't support XML DOM.");
            }

            return $.parseXml(string);
        },

        /**
         * Parses a JSON string into a Javascript object.
         * @function
         * @param {String} string
         * @returns {Object}
         */
        parseJSON: function parseJSON(string) {
            if (window.JSON && window.JSON.parse) {
                $.parseJSON = window.JSON.parse;
            } else {
                // Should only be used by IE8 in non standards mode
                $.parseJSON = function (string) {
                    /*jshint evil:true*/
                    return eval('(' + string + ')');
                };
            }
            return $.parseJSON(string);
        },

        /**
         * Reports whether the image format is supported for tiling in this
         * version.
         * @function
         * @param {String} [extension]
         * @returns {Boolean}
         */
        imageFormatSupported: function imageFormatSupported(extension) {
            extension = extension ? extension : "";
            return !!FILEFORMATS[extension.toLowerCase()];
        }

    });

    /**
     * The current browser vendor, version, and related information regarding detected features.
     * @member {Object} Browser
     * @memberof OpenSeadragon
     * @static
     * @type {Object}
     * @property {OpenSeadragon.BROWSERS} vendor - One of the {@link OpenSeadragon.BROWSERS} enumeration values.
     * @property {Number} version
     * @property {Boolean} alpha - Does the browser support image alpha transparency.
     */
    $.Browser = {
        vendor: $.BROWSERS.UNKNOWN,
        version: 0,
        alpha: true
    };

    var FILEFORMATS = {
        "bmp": false,
        "jpeg": true,
        "jpg": true,
        "png": true,
        "tif": false,
        "wdp": false
    },
        URLPARAMS = {};

    (function () {
        //A small auto-executing routine to determine the browser vendor,
        //version and supporting feature sets.
        var app = navigator.appName,
            ver = navigator.appVersion,
            ua = navigator.userAgent,
            regex;

        //console.error( 'appName: ' + navigator.appName );
        //console.error( 'appVersion: ' + navigator.appVersion );
        //console.error( 'userAgent: ' + navigator.userAgent );

        switch (navigator.appName) {
            case "Microsoft Internet Explorer":
                if (!!window.attachEvent && !!window.ActiveXObject) {

                    $.Browser.vendor = $.BROWSERS.IE;
                    $.Browser.version = parseFloat(ua.substring(ua.indexOf("MSIE") + 5, ua.indexOf(";", ua.indexOf("MSIE"))));
                }
                break;
            case "Netscape":
                if (!!window.addEventListener) {
                    if (ua.indexOf("Firefox") >= 0) {
                        $.Browser.vendor = $.BROWSERS.FIREFOX;
                        $.Browser.version = parseFloat(ua.substring(ua.indexOf("Firefox") + 8));
                    } else if (ua.indexOf("Safari") >= 0) {
                        $.Browser.vendor = ua.indexOf("Chrome") >= 0 ? $.BROWSERS.CHROME : $.BROWSERS.SAFARI;
                        $.Browser.version = parseFloat(ua.substring(ua.substring(0, ua.indexOf("Safari")).lastIndexOf("/") + 1, ua.indexOf("Safari")));
                    } else {
                        regex = new RegExp("Trident/.*rv:([0-9]{1,}[.0-9]{0,})");
                        if (regex.exec(ua) !== null) {
                            $.Browser.vendor = $.BROWSERS.IE;
                            $.Browser.version = parseFloat(RegExp.$1);
                        }
                    }
                }
                break;
            case "Opera":
                $.Browser.vendor = $.BROWSERS.OPERA;
                $.Browser.version = parseFloat(ver);
                break;
        }

        // ignore '?' portion of query string
        var query = window.location.search.substring(1),
            parts = query.split('&'),
            part,
            sep,
            i;

        for (i = 0; i < parts.length; i++) {
            part = parts[i];
            sep = part.indexOf('=');

            if (sep > 0) {
                URLPARAMS[part.substring(0, sep)] = decodeURIComponent(part.substring(sep + 1));
            }
        }

        //determine if this browser supports image alpha transparency
        $.Browser.alpha = !($.Browser.vendor == $.BROWSERS.IE && $.Browser.version < 9 || $.Browser.vendor == $.BROWSERS.CHROME && $.Browser.version < 2);

        //determine if this browser supports element.style.opacity
        $.Browser.opacity = !($.Browser.vendor == $.BROWSERS.IE && $.Browser.version < 9);
    })();

    //TODO: $.console is often used inside a try/catch block which generally
    //      prevents allowings errors to occur with detection until a debugger
    //      is attached.  Although I've been guilty of the same anti-pattern
    //      I eventually was convinced that errors should naturally propogate in
    //      all but the most special cases.
    /**
     * A convenient alias for console when available, and a simple null
     * function when console is unavailable.
     * @static
     * @private
     */
    var nullfunction = function nullfunction(msg) {
        //document.location.hash = msg;
    };

    $.console = window.console || {
        log: nullfunction,
        debug: nullfunction,
        info: nullfunction,
        warn: nullfunction,
        error: nullfunction,
        assert: nullfunction
    };

    // Adding support for HTML5's requestAnimationFrame as suggested by acdha.
    // Implementation taken from matt synder's post here:
    // http://mattsnider.com/cross-browser-and-legacy-supported-requestframeanimation/
    (function (w) {

        // most browsers have an implementation
        var requestAnimationFrame = w.requestAnimationFrame || w.mozRequestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame;

        var cancelAnimationFrame = w.cancelAnimationFrame || w.mozCancelAnimationFrame || w.webkitCancelAnimationFrame || w.msCancelAnimationFrame;

        // polyfill, when necessary
        if (requestAnimationFrame && cancelAnimationFrame) {
            // We can't assign these window methods directly to $ because they
            // expect their "this" to be "window", so we call them in wrappers.
            $.requestAnimationFrame = function () {
                return requestAnimationFrame.apply(w, arguments);
            };
            $.cancelAnimationFrame = function () {
                return cancelAnimationFrame.apply(w, arguments);
            };
        } else {
            var aAnimQueue = [],
                processing = [],
                iRequestId = 0,
                iIntervalId;

            // create a mock requestAnimationFrame function
            $.requestAnimationFrame = function (callback) {
                aAnimQueue.push([++iRequestId, callback]);

                if (!iIntervalId) {
                    iIntervalId = setInterval(function () {
                        if (aAnimQueue.length) {
                            var time = $.now();
                            // Process all of the currently outstanding frame
                            // requests, but none that get added during the
                            // processing.
                            // Swap the arrays so we don't have to create a new
                            // array every frame.
                            var temp = processing;
                            processing = aAnimQueue;
                            aAnimQueue = temp;
                            while (processing.length) {
                                processing.shift()[1](time);
                            }
                        } else {
                            // don't continue the interval, if unnecessary
                            clearInterval(iIntervalId);
                            iIntervalId = undefined;
                        }
                    }, 1000 / 50); // estimating support for 50 frames per second
                }

                return iRequestId;
            };

            // create a mock cancelAnimationFrame function
            $.cancelAnimationFrame = function (requestId) {
                // find the request ID and remove it
                var i, j;
                for (i = 0, j = aAnimQueue.length; i < j; i += 1) {
                    if (aAnimQueue[i][0] === requestId) {
                        aAnimQueue.splice(i, 1);
                        return;
                    }
                }

                // If it's not in the queue, it may be in the set we're currently
                // processing (if cancelAnimationFrame is called from within a
                // requestAnimationFrame callback).
                for (i = 0, j = processing.length; i < j; i += 1) {
                    if (processing[i][0] === requestId) {
                        processing.splice(i, 1);
                        return;
                    }
                }
            };
        }
    })(window);

    /**
     * @private
     * @inner
     * @function
     * @param {Element} element
     * @param {Boolean} [isFixed]
     * @returns {Element}
     */
    function getOffsetParent(element, isFixed) {
        if (isFixed && element != document.body) {
            return document.body;
        } else {
            return element.offsetParent;
        }
    }

    /**
     * @private
     * @inner
     * @function
     * @param {XMLHttpRequest} xhr
     * @param {String} tilesUrl
     * @deprecated
     */
    function processDZIResponse(xhr, tilesUrl) {
        var status,
            statusText,
            doc = null;

        if (!xhr) {
            throw new Error($.getString("Errors.Security"));
        } else if (xhr.status !== 200 && xhr.status !== 0) {
            status = xhr.status;
            statusText = status == 404 ? "Not Found" : xhr.statusText;
            throw new Error($.getString("Errors.Status", status, statusText));
        }

        if (xhr.responseXML && xhr.responseXML.documentElement) {
            doc = xhr.responseXML;
        } else if (xhr.responseText) {
            doc = $.parseXml(xhr.responseText);
        }

        return processDZIXml(doc, tilesUrl);
    }

    /**
     * @private
     * @inner
     * @function
     * @param {Document} xmlDoc
     * @param {String} tilesUrl
     * @deprecated
     */
    function processDZIXml(xmlDoc, tilesUrl) {

        if (!xmlDoc || !xmlDoc.documentElement) {
            throw new Error($.getString("Errors.Xml"));
        }

        var root = xmlDoc.documentElement,
            rootName = root.tagName;

        if (rootName == "Image") {
            try {
                return processDZI(root, tilesUrl);
            } catch (e) {
                throw e instanceof Error ? e : new Error($.getString("Errors.Dzi"));
            }
        } else if (rootName == "Collection") {
            throw new Error($.getString("Errors.Dzc"));
        } else if (rootName == "Error") {
            return $._processDZIError(root);
        }

        throw new Error($.getString("Errors.Dzi"));
    }

    /**
     * @private
     * @inner
     * @function
     * @param {Element} imageNode
     * @param {String} tilesUrl
     * @deprecated
     */
    function processDZI(imageNode, tilesUrl) {
        var fileFormat = imageNode.getAttribute("Format"),
            sizeNode = imageNode.getElementsByTagName("Size")[0],
            dispRectNodes = imageNode.getElementsByTagName("DisplayRect"),
            width = parseInt(sizeNode.getAttribute("Width"), 10),
            height = parseInt(sizeNode.getAttribute("Height"), 10),
            tileSize = parseInt(imageNode.getAttribute("TileSize"), 10),
            tileOverlap = parseInt(imageNode.getAttribute("Overlap"), 10),
            dispRects = [],
            dispRectNode,
            rectNode,
            i;

        if (!$.imageFormatSupported(fileFormat)) {
            throw new Error($.getString("Errors.ImageFormat", fileFormat.toUpperCase()));
        }

        for (i = 0; i < dispRectNodes.length; i++) {
            dispRectNode = dispRectNodes[i];
            rectNode = dispRectNode.getElementsByTagName("Rect")[0];

            dispRects.push(new $.DisplayRect(parseInt(rectNode.getAttribute("X"), 10), parseInt(rectNode.getAttribute("Y"), 10), parseInt(rectNode.getAttribute("Width"), 10), parseInt(rectNode.getAttribute("Height"), 10), 0, // ignore MinLevel attribute, bug in Deep Zoom Composer
            parseInt(dispRectNode.getAttribute("MaxLevel"), 10)));
        }
        return new $.DziTileSource(width, height, tileSize, tileOverlap, tilesUrl, fileFormat, dispRects);
    }

    /**
     * @private
     * @inner
     * @function
     * @param {Element} imageNode
     * @param {String} tilesUrl
     * @deprecated
     */
    function processDZIJSON(imageData, tilesUrl) {
        var fileFormat = imageData.Format,
            sizeData = imageData.Size,
            dispRectData = imageData.DisplayRect || [],
            width = parseInt(sizeData.Width, 10),
            height = parseInt(sizeData.Height, 10),
            tileSize = parseInt(imageData.TileSize, 10),
            tileOverlap = parseInt(imageData.Overlap, 10),
            dispRects = [],
            rectData,
            i;

        if (!$.imageFormatSupported(fileFormat)) {
            throw new Error($.getString("Errors.ImageFormat", fileFormat.toUpperCase()));
        }

        for (i = 0; i < dispRectData.length; i++) {
            rectData = dispRectData[i].Rect;

            dispRects.push(new $.DisplayRect(parseInt(rectData.X, 10), parseInt(rectData.Y, 10), parseInt(rectData.Width, 10), parseInt(rectData.Height, 10), 0, // ignore MinLevel attribute, bug in Deep Zoom Composer
            parseInt(rectData.MaxLevel, 10)));
        }
        return new $.DziTileSource(width, height, tileSize, tileOverlap, tilesUrl, fileFormat, dispRects);
    }

    /**
     * @private
     * @inner
     * @function
     * @param {Document} errorNode
     * @throws {Error}
     * @deprecated
     */
    $._processDZIError = function (errorNode) {
        var messageNode = errorNode.getElementsByTagName("Message")[0],
            message = messageNode.firstChild.nodeValue;

        throw new Error(message);
    };
})(OpenSeadragon);

/*
 * OpenSeadragon - full-screen support functions
 *
 * Copyright (C) 2009 CodePlex Foundation
 * Copyright (C) 2010-2013 OpenSeadragon contributors
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 * - Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 *
 * - Neither the name of CodePlex Foundation nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

(function ($) {
    /**
     * Determine native full screen support we can get from the browser.
     * @member fullScreenApi
     * @memberof OpenSeadragon
     * @type {object}
     * @property {Boolean} supportsFullScreen Return true if full screen API is supported.
     * @property {Function} isFullScreen Return true if currently in full screen mode.
     * @property {Function} getFullScreenElement Return the element currently in full screen mode.
     * @property {Function} requestFullScreen Make a request to go in full screen mode.
     * @property {Function} exitFullScreen Make a request to exit full screen mode.
     * @property {Function} cancelFullScreen Deprecated, use exitFullScreen instead.
     * @property {String} fullScreenEventName Event fired when the full screen mode change.
     * @property {String} fullScreenErrorEventName Event fired when a request to go
     * in full screen mode failed.
     */
    var fullScreenApi = {
        supportsFullScreen: false,
        isFullScreen: function isFullScreen() {
            return false;
        },
        getFullScreenElement: function getFullScreenElement() {
            return null;
        },
        requestFullScreen: function requestFullScreen() {},
        exitFullScreen: function exitFullScreen() {},
        cancelFullScreen: function cancelFullScreen() {},
        fullScreenEventName: '',
        fullScreenErrorEventName: ''
    };

    // check for native support
    if (document.exitFullscreen) {
        // W3C standard
        fullScreenApi.supportsFullScreen = true;
        fullScreenApi.getFullScreenElement = function () {
            return document.fullscreenElement;
        };
        fullScreenApi.requestFullScreen = function (element) {
            return element.requestFullscreen();
        };
        fullScreenApi.exitFullScreen = function () {
            document.exitFullscreen();
        };
        fullScreenApi.fullScreenEventName = "fullscreenchange";
        fullScreenApi.fullScreenErrorEventName = "fullscreenerror";
    } else if (document.msExitFullscreen) {
        // IE 11
        fullScreenApi.supportsFullScreen = true;
        fullScreenApi.getFullScreenElement = function () {
            return document.msFullscreenElement;
        };
        fullScreenApi.requestFullScreen = function (element) {
            return element.msRequestFullscreen();
        };
        fullScreenApi.exitFullScreen = function () {
            document.msExitFullscreen();
        };
        fullScreenApi.fullScreenEventName = "MSFullscreenChange";
        fullScreenApi.fullScreenErrorEventName = "MSFullscreenError";
    } else if (document.webkitExitFullscreen) {
        // Recent webkit
        fullScreenApi.supportsFullScreen = true;
        fullScreenApi.getFullScreenElement = function () {
            return document.webkitFullscreenElement;
        };
        fullScreenApi.requestFullScreen = function (element) {
            return element.webkitRequestFullscreen();
        };
        fullScreenApi.exitFullScreen = function () {
            document.webkitExitFullscreen();
        };
        fullScreenApi.fullScreenEventName = "webkitfullscreenchange";
        fullScreenApi.fullScreenErrorEventName = "webkitfullscreenerror";
    } else if (document.webkitCancelFullScreen) {
        // Old webkit
        fullScreenApi.supportsFullScreen = true;
        fullScreenApi.getFullScreenElement = function () {
            return document.webkitCurrentFullScreenElement;
        };
        fullScreenApi.requestFullScreen = function (element) {
            return element.webkitRequestFullScreen();
        };
        fullScreenApi.exitFullScreen = function () {
            document.webkitCancelFullScreen();
        };
        fullScreenApi.fullScreenEventName = "webkitfullscreenchange";
        fullScreenApi.fullScreenErrorEventName = "webkitfullscreenerror";
    } else if (document.mozCancelFullScreen) {
        // Firefox
        fullScreenApi.supportsFullScreen = true;
        fullScreenApi.getFullScreenElement = function () {
            return document.mozFullScreenElement;
        };
        fullScreenApi.requestFullScreen = function (element) {
            return element.mozRequestFullScreen();
        };
        fullScreenApi.exitFullScreen = function () {
            document.mozCancelFullScreen();
        };
        fullScreenApi.fullScreenEventName = "mozfullscreenchange";
        fullScreenApi.fullScreenErrorEventName = "mozfullscreenerror";
    }
    fullScreenApi.isFullScreen = function () {
        return fullScreenApi.getFullScreenElement() !== null;
    };
    fullScreenApi.cancelFullScreen = function () {
        $.console.error("cancelFullScreen is deprecated. Use exitFullScreen instead.");
        fullScreenApi.exitFullScreen();
    };

    // export api
    $.extend($, fullScreenApi);
})(OpenSeadragon);

/*
 * OpenSeadragon - EventSource
 *
 * Copyright (C) 2009 CodePlex Foundation
 * Copyright (C) 2010-2013 OpenSeadragon contributors
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 * - Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 *
 * - Neither the name of CodePlex Foundation nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

(function ($) {

    /**
     * Event handler method signature used by all OpenSeadragon events.
     *
     * @callback EventHandler
     * @memberof OpenSeadragon
     * @param {Object} event - See individual events for event-specific properties.
     */

    /**
     * @class EventSource
     * @classdesc For use by classes which want to support custom, non-browser events.
     *
     * @memberof OpenSeadragon
     */
    $.EventSource = function () {
        this.events = {};
    };

    $.EventSource.prototype = /** @lends OpenSeadragon.EventSource.prototype */{

        // TODO: Add a method 'one' which automatically unbinds a listener after the first triggered event that matches.

        /**
         * Add an event handler for a given event.
         * @function
         * @param {String} eventName - Name of event to register.
         * @param {OpenSeadragon.EventHandler} handler - Function to call when event is triggered.
         * @param {Object} [userData=null] - Arbitrary object to be passed unchanged to the handler.
         */
        addHandler: function addHandler(eventName, handler, userData) {
            var events = this.events[eventName];
            if (!events) {
                this.events[eventName] = events = [];
            }
            if (handler && $.isFunction(handler)) {
                events[events.length] = { handler: handler, userData: userData || null };
            }
        },

        /**
         * Remove a specific event handler for a given event.
         * @function
         * @param {String} eventName - Name of event for which the handler is to be removed.
         * @param {OpenSeadragon.EventHandler} handler - Function to be removed.
         */
        removeHandler: function removeHandler(eventName, handler) {
            var events = this.events[eventName],
                handlers = [],
                i;
            if (!events) {
                return;
            }
            if ($.isArray(events)) {
                for (i = 0; i < events.length; i++) {
                    if (events[i].handler !== handler) {
                        handlers.push(events[i]);
                    }
                }
                this.events[eventName] = handlers;
            }
        },

        /**
         * Remove all event handlers for a given event type. If no type is given all
         * event handlers for every event type are removed.
         * @function
         * @param {String} eventName - Name of event for which all handlers are to be removed.
         */
        removeAllHandlers: function removeAllHandlers(eventName) {
            if (eventName) {
                this.events[eventName] = [];
            } else {
                for (var eventType in this.events) {
                    this.events[eventType] = [];
                }
            }
        },

        /**
         * Get a function which iterates the list of all handlers registered for a given event, calling the handler for each.
         * @function
         * @param {String} eventName - Name of event to get handlers for.
         */
        getHandler: function getHandler(eventName) {
            var events = this.events[eventName];
            if (!events || !events.length) {
                return null;
            }
            events = events.length === 1 ? [events[0]] : Array.apply(null, events);
            return function (source, args) {
                var i,
                    length = events.length;
                for (i = 0; i < length; i++) {
                    if (events[i]) {
                        args.eventSource = source;
                        args.userData = events[i].userData;
                        events[i].handler(args);
                    }
                }
            };
        },

        /**
         * Trigger an event, optionally passing additional information.
         * @function
         * @param {String} eventName - Name of event to register.
         * @param {Object} eventArgs - Event-specific data.
         */
        raiseEvent: function raiseEvent(eventName, eventArgs) {
            //uncomment if you want to get a log of all events
            //$.console.log( eventName );
            var handler = this.getHandler(eventName);

            if (handler) {
                if (!eventArgs) {
                    eventArgs = {};
                }

                handler(this, eventArgs);
            }
        }
    };
})(OpenSeadragon);

/*
 * OpenSeadragon - MouseTracker
 *
 * Copyright (C) 2009 CodePlex Foundation
 * Copyright (C) 2010-2013 OpenSeadragon contributors
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 * - Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 *
 * - Neither the name of CodePlex Foundation nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

(function ($) {

    // All MouseTracker instances
    var MOUSETRACKERS = [];

    // dictionary from hash to private properties
    var THIS = {};

    /**
     * @class MouseTracker
     * @classdesc Provides simplified handling of common pointer device (mouse, touch, pen, etc.) gestures
     *            and keyboard events on a specified element.
     * @memberof OpenSeadragon
     * @param {Object} options
     *      Allows configurable properties to be entirely specified by passing
     *      an options object to the constructor.  The constructor also supports
     *      the original positional arguments 'element', 'clickTimeThreshold',
     *      and 'clickDistThreshold' in that order.
     * @param {Element|String} options.element
     *      A reference to an element or an element id for which the pointer/key
     *      events will be monitored.
     * @param {Boolean} [options.startDisabled=false]
     *      If true, event tracking on the element will not start until
     *      {@link OpenSeadragon.MouseTracker.setTracking|setTracking} is called.
     * @param {Number} options.clickTimeThreshold
     *      The number of milliseconds within which a pointer down-up event combination
     *      will be treated as a click gesture.
     * @param {Number} options.clickDistThreshold
     *      The maximum distance allowed between a pointer down event and a pointer up event
     *      to be treated as a click gesture.
     * @param {Number} options.dblClickTimeThreshold
     *      The number of milliseconds within which two pointer down-up event combinations
     *      will be treated as a double-click gesture.
     * @param {Number} options.dblClickDistThreshold
     *      The maximum distance allowed between two pointer click events
     *      to be treated as a click gesture.
     * @param {Number} [options.stopDelay=50]
     *      The number of milliseconds without pointer move before the stop
     *      event is fired.
     * @param {OpenSeadragon.EventHandler} [options.enterHandler=null]
     *      An optional handler for pointer enter.
     * @param {OpenSeadragon.EventHandler} [options.exitHandler=null]
     *      An optional handler for pointer exit.
     * @param {OpenSeadragon.EventHandler} [options.pressHandler=null]
     *      An optional handler for pointer press.
     * @param {OpenSeadragon.EventHandler} [options.nonPrimaryPressHandler=null]
     *      An optional handler for pointer non-primary button press.
     * @param {OpenSeadragon.EventHandler} [options.releaseHandler=null]
     *      An optional handler for pointer release.
     * @param {OpenSeadragon.EventHandler} [options.nonPrimaryReleaseHandler=null]
     *      An optional handler for pointer non-primary button release.
     * @param {OpenSeadragon.EventHandler} [options.moveHandler=null]
     *      An optional handler for pointer move.
     * @param {OpenSeadragon.EventHandler} [options.scrollHandler=null]
     *      An optional handler for mouse wheel scroll.
     * @param {OpenSeadragon.EventHandler} [options.clickHandler=null]
     *      An optional handler for pointer click.
     * @param {OpenSeadragon.EventHandler} [options.dblClickHandler=null]
     *      An optional handler for pointer double-click.
     * @param {OpenSeadragon.EventHandler} [options.dragHandler=null]
     *      An optional handler for the drag gesture.
     * @param {OpenSeadragon.EventHandler} [options.dragEndHandler=null]
     *      An optional handler for after a drag gesture.
     * @param {OpenSeadragon.EventHandler} [options.pinchHandler=null]
     *      An optional handler for the pinch gesture.
     * @param {OpenSeadragon.EventHandler} [options.keyDownHandler=null]
     *      An optional handler for keydown.
     * @param {OpenSeadragon.EventHandler} [options.keyUpHandler=null]
     *      An optional handler for keyup.
     * @param {OpenSeadragon.EventHandler} [options.keyHandler=null]
     *      An optional handler for keypress.
     * @param {OpenSeadragon.EventHandler} [options.focusHandler=null]
     *      An optional handler for focus.
     * @param {OpenSeadragon.EventHandler} [options.blurHandler=null]
     *      An optional handler for blur.
     * @param {Object} [options.userData=null]
     *      Arbitrary object to be passed unchanged to any attached handler methods.
     */
    $.MouseTracker = function (options) {

        MOUSETRACKERS.push(this);

        var args = arguments;

        if (!$.isPlainObject(options)) {
            options = {
                element: args[0],
                clickTimeThreshold: args[1],
                clickDistThreshold: args[2]
            };
        }

        this.hash = Math.random(); // An unique hash for this tracker.
        /**
         * The element for which pointer events are being monitored.
         * @member {Element} element
         * @memberof OpenSeadragon.MouseTracker#
         */
        this.element = $.getElement(options.element);
        /**
         * The number of milliseconds within which a pointer down-up event combination
         * will be treated as a click gesture.
         * @member {Number} clickTimeThreshold
         * @memberof OpenSeadragon.MouseTracker#
         */
        this.clickTimeThreshold = options.clickTimeThreshold || $.DEFAULT_SETTINGS.clickTimeThreshold;
        /**
         * The maximum distance allowed between a pointer down event and a pointer up event
         * to be treated as a click gesture.
         * @member {Number} clickDistThreshold
         * @memberof OpenSeadragon.MouseTracker#
         */
        this.clickDistThreshold = options.clickDistThreshold || $.DEFAULT_SETTINGS.clickDistThreshold;
        /**
         * The number of milliseconds within which two pointer down-up event combinations
         * will be treated as a double-click gesture.
         * @member {Number} dblClickTimeThreshold
         * @memberof OpenSeadragon.MouseTracker#
         */
        this.dblClickTimeThreshold = options.dblClickTimeThreshold || $.DEFAULT_SETTINGS.dblClickTimeThreshold;
        /**
         * The maximum distance allowed between two pointer click events
         * to be treated as a click gesture.
         * @member {Number} clickDistThreshold
         * @memberof OpenSeadragon.MouseTracker#
         */
        this.dblClickDistThreshold = options.dblClickDistThreshold || $.DEFAULT_SETTINGS.dblClickDistThreshold;
        this.userData = options.userData || null;
        this.stopDelay = options.stopDelay || 50;

        this.enterHandler = options.enterHandler || null;
        this.exitHandler = options.exitHandler || null;
        this.pressHandler = options.pressHandler || null;
        this.nonPrimaryPressHandler = options.nonPrimaryPressHandler || null;
        this.releaseHandler = options.releaseHandler || null;
        this.nonPrimaryReleaseHandler = options.nonPrimaryReleaseHandler || null;
        this.moveHandler = options.moveHandler || null;
        this.scrollHandler = options.scrollHandler || null;
        this.clickHandler = options.clickHandler || null;
        this.dblClickHandler = options.dblClickHandler || null;
        this.dragHandler = options.dragHandler || null;
        this.dragEndHandler = options.dragEndHandler || null;
        this.pinchHandler = options.pinchHandler || null;
        this.stopHandler = options.stopHandler || null;
        this.keyDownHandler = options.keyDownHandler || null;
        this.keyUpHandler = options.keyUpHandler || null;
        this.keyHandler = options.keyHandler || null;
        this.focusHandler = options.focusHandler || null;
        this.blurHandler = options.blurHandler || null;

        //Store private properties in a scope sealed hash map
        var _this = this;

        /**
         * @private
         * @property {Boolean} tracking
         *      Are we currently tracking pointer events for this element.
         */
        THIS[this.hash] = {
            click: function click(event) {
                onClick(_this, event);
            },
            dblclick: function dblclick(event) {
                onDblClick(_this, event);
            },
            keydown: function keydown(event) {
                onKeyDown(_this, event);
            },
            keyup: function keyup(event) {
                onKeyUp(_this, event);
            },
            keypress: function keypress(event) {
                onKeyPress(_this, event);
            },
            focus: function focus(event) {
                onFocus(_this, event);
            },
            blur: function blur(event) {
                onBlur(_this, event);
            },

            wheel: function wheel(event) {
                onWheel(_this, event);
            },
            mousewheel: function mousewheel(event) {
                onMouseWheel(_this, event);
            },
            DOMMouseScroll: function DOMMouseScroll(event) {
                onMouseWheel(_this, event);
            },
            MozMousePixelScroll: function MozMousePixelScroll(event) {
                onMouseWheel(_this, event);
            },

            mouseenter: function mouseenter(event) {
                onMouseEnter(_this, event);
            }, // Used on IE8 only
            mouseleave: function mouseleave(event) {
                onMouseLeave(_this, event);
            }, // Used on IE8 only
            mouseover: function mouseover(event) {
                onMouseOver(_this, event);
            },
            mouseout: function mouseout(event) {
                onMouseOut(_this, event);
            },
            mousedown: function mousedown(event) {
                onMouseDown(_this, event);
            },
            mouseup: function mouseup(event) {
                onMouseUp(_this, event);
            },
            mouseupcaptured: function mouseupcaptured(event) {
                onMouseUpCaptured(_this, event);
            },
            mousemove: function mousemove(event) {
                onMouseMove(_this, event);
            },
            mousemovecaptured: function mousemovecaptured(event) {
                onMouseMoveCaptured(_this, event);
            },

            touchstart: function touchstart(event) {
                onTouchStart(_this, event);
            },
            touchend: function touchend(event) {
                onTouchEnd(_this, event);
            },
            touchendcaptured: function touchendcaptured(event) {
                onTouchEndCaptured(_this, event);
            },
            touchmove: function touchmove(event) {
                onTouchMove(_this, event);
            },
            touchmovecaptured: function touchmovecaptured(event) {
                onTouchMoveCaptured(_this, event);
            },
            touchcancel: function touchcancel(event) {
                onTouchCancel(_this, event);
            },

            gesturestart: function gesturestart(event) {
                onGestureStart(_this, event);
            },
            gesturechange: function gesturechange(event) {
                onGestureChange(_this, event);
            },

            pointerover: function pointerover(event) {
                onPointerOver(_this, event);
            },
            MSPointerOver: function MSPointerOver(event) {
                onPointerOver(_this, event);
            },
            pointerout: function pointerout(event) {
                onPointerOut(_this, event);
            },
            MSPointerOut: function MSPointerOut(event) {
                onPointerOut(_this, event);
            },
            pointerdown: function pointerdown(event) {
                onPointerDown(_this, event);
            },
            MSPointerDown: function MSPointerDown(event) {
                onPointerDown(_this, event);
            },
            pointerup: function pointerup(event) {
                onPointerUp(_this, event);
            },
            MSPointerUp: function MSPointerUp(event) {
                onPointerUp(_this, event);
            },
            pointermove: function pointermove(event) {
                onPointerMove(_this, event);
            },
            MSPointerMove: function MSPointerMove(event) {
                onPointerMove(_this, event);
            },
            pointercancel: function pointercancel(event) {
                onPointerCancel(_this, event);
            },
            MSPointerCancel: function MSPointerCancel(event) {
                onPointerCancel(_this, event);
            },
            pointerupcaptured: function pointerupcaptured(event) {
                onPointerUpCaptured(_this, event);
            },
            pointermovecaptured: function pointermovecaptured(event) {
                onPointerMoveCaptured(_this, event);
            },

            tracking: false,

            // Active pointers lists. Array of GesturePointList objects, one for each pointer device type.
            // GesturePointList objects are added each time a pointer is tracked by a new pointer device type (see getActivePointersListByType()).
            // Active pointers are any pointer being tracked for this element which are in the hit-test area
            //     of the element (for hover-capable devices) and/or have contact or a button press initiated in the element.
            activePointersLists: [],

            // Tracking for double-click gesture
            lastClickPos: null,
            dblClickTimeOut: null,

            // Tracking for pinch gesture
            pinchGPoints: [],
            lastPinchDist: 0,
            currentPinchDist: 0,
            lastPinchCenter: null,
            currentPinchCenter: null
        };

        if (!options.startDisabled) {
            this.setTracking(true);
        }
    };

    $.MouseTracker.prototype = /** @lends OpenSeadragon.MouseTracker.prototype */{

        /**
         * Clean up any events or objects created by the tracker.
         * @function
         */
        destroy: function destroy() {
            var i;

            stopTracking(this);
            this.element = null;

            for (i = 0; i < MOUSETRACKERS.length; i++) {
                if (MOUSETRACKERS[i] === this) {
                    MOUSETRACKERS.splice(i, 1);
                    break;
                }
            }

            THIS[this.hash] = null;
            delete THIS[this.hash];
        },

        /**
         * Are we currently tracking events on this element.
         * @deprecated Just use this.tracking
         * @function
         * @returns {Boolean} Are we currently tracking events on this element.
         */
        isTracking: function isTracking() {
            return THIS[this.hash].tracking;
        },

        /**
         * Enable or disable whether or not we are tracking events on this element.
         * @function
         * @param {Boolean} track True to start tracking, false to stop tracking.
         * @returns {OpenSeadragon.MouseTracker} Chainable.
         */
        setTracking: function setTracking(track) {
            if (track) {
                startTracking(this);
            } else {
                stopTracking(this);
            }
            //chain
            return this;
        },

        /**
         * Returns the {@link OpenSeadragon.MouseTracker.GesturePointList|GesturePointList} for the given pointer device type,
         * creating and caching a new {@link OpenSeadragon.MouseTracker.GesturePointList|GesturePointList} if one doesn't already exist for the type.
         * @function
         * @param {String} type - The pointer device type: "mouse", "touch", "pen", etc.
         * @returns {OpenSeadragon.MouseTracker.GesturePointList}
         */
        getActivePointersListByType: function getActivePointersListByType(type) {
            var delegate = THIS[this.hash],
                i,
                len = delegate.activePointersLists.length,
                list;

            for (i = 0; i < len; i++) {
                if (delegate.activePointersLists[i].type === type) {
                    return delegate.activePointersLists[i];
                }
            }

            list = new $.MouseTracker.GesturePointList(type);
            delegate.activePointersLists.push(list);
            return list;
        },

        /**
         * Returns the total number of pointers currently active on the tracked element.
         * @function
         * @returns {Number}
         */
        getActivePointerCount: function getActivePointerCount() {
            var delegate = THIS[this.hash],
                i,
                len = delegate.activePointersLists.length,
                count = 0;

            for (i = 0; i < len; i++) {
                count += delegate.activePointersLists[i].getLength();
            }

            return count;
        },

        /**
         * Implement or assign implementation to these handlers during or after
         * calling the constructor.
         * @function
         * @param {Object} event
         * @param {OpenSeadragon.MouseTracker} event.eventSource
         *      A reference to the tracker instance.
         * @param {String} event.pointerType
         *     "mouse", "touch", "pen", etc.
         * @param {OpenSeadragon.Point} event.position
         *      The position of the event relative to the tracked element.
         * @param {Number} event.buttons
         *      Current buttons pressed.
         *      Combination of bit flags 0: none, 1: primary (or touch contact), 2: secondary, 4: aux (often middle), 8: X1 (often back), 16: X2 (often forward), 32: pen eraser.
         * @param {Number} event.pointers
         *      Number of pointers (all types) active in the tracked element.
         * @param {Boolean} event.insideElementPressed
         *      True if the left mouse button is currently being pressed and was
         *      initiated inside the tracked element, otherwise false.
         * @param {Boolean} event.buttonDownAny
         *      Was the button down anywhere in the screen during the event. <span style="color:red;">Deprecated. Use buttons instead.</span>
         * @param {Boolean} event.isTouchEvent
         *      True if the original event is a touch event, otherwise false. <span style="color:red;">Deprecated. Use pointerType and/or originalEvent instead.</span>
         * @param {Object} event.originalEvent
         *      The original event object.
         * @param {Boolean} event.preventDefaultAction
         *      Set to true to prevent the tracker subscriber from performing its default action (subscriber implementation dependent). Default: false.
         * @param {Object} event.userData
         *      Arbitrary user-defined object.
         */
        enterHandler: function enterHandler() {},

        /**
         * Implement or assign implementation to these handlers during or after
         * calling the constructor.
         * @function
         * @param {Object} event
         * @param {OpenSeadragon.MouseTracker} event.eventSource
         *      A reference to the tracker instance.
         * @param {String} event.pointerType
         *     "mouse", "touch", "pen", etc.
         * @param {OpenSeadragon.Point} event.position
         *      The position of the event relative to the tracked element.
         * @param {Number} event.buttons
         *      Current buttons pressed.
         *      Combination of bit flags 0: none, 1: primary (or touch contact), 2: secondary, 4: aux (often middle), 8: X1 (often back), 16: X2 (often forward), 32: pen eraser.
         * @param {Number} event.pointers
         *      Number of pointers (all types) active in the tracked element.
         * @param {Boolean} event.insideElementPressed
         *      True if the left mouse button is currently being pressed and was
         *      initiated inside the tracked element, otherwise false.
         * @param {Boolean} event.buttonDownAny
         *      Was the button down anywhere in the screen during the event. <span style="color:red;">Deprecated. Use buttons instead.</span>
         * @param {Boolean} event.isTouchEvent
         *      True if the original event is a touch event, otherwise false. <span style="color:red;">Deprecated. Use pointerType and/or originalEvent instead.</span>
         * @param {Object} event.originalEvent
         *      The original event object.
         * @param {Boolean} event.preventDefaultAction
         *      Set to true to prevent the tracker subscriber from performing its default action (subscriber implementation dependent). Default: false.
         * @param {Object} event.userData
         *      Arbitrary user-defined object.
         */
        exitHandler: function exitHandler() {},

        /**
         * Implement or assign implementation to these handlers during or after
         * calling the constructor.
         * @function
         * @param {Object} event
         * @param {OpenSeadragon.MouseTracker} event.eventSource
         *      A reference to the tracker instance.
         * @param {String} event.pointerType
         *     "mouse", "touch", "pen", etc.
         * @param {OpenSeadragon.Point} event.position
         *      The position of the event relative to the tracked element.
         * @param {Number} event.buttons
         *      Current buttons pressed.
         *      Combination of bit flags 0: none, 1: primary (or touch contact), 2: secondary, 4: aux (often middle), 8: X1 (often back), 16: X2 (often forward), 32: pen eraser.
         * @param {Boolean} event.isTouchEvent
         *      True if the original event is a touch event, otherwise false. <span style="color:red;">Deprecated. Use pointerType and/or originalEvent instead.</span>
         * @param {Object} event.originalEvent
         *      The original event object.
         * @param {Boolean} event.preventDefaultAction
         *      Set to true to prevent the tracker subscriber from performing its default action (subscriber implementation dependent). Default: false.
         * @param {Object} event.userData
         *      Arbitrary user-defined object.
         */
        pressHandler: function pressHandler() {},

        /**
         * Implement or assign implementation to these handlers during or after
         * calling the constructor.
         * @function
         * @param {Object} event
         * @param {OpenSeadragon.MouseTracker} event.eventSource
         *      A reference to the tracker instance.
         * @param {String} event.pointerType
         *     "mouse", "touch", "pen", etc.
         * @param {OpenSeadragon.Point} event.position
         *      The position of the event relative to the tracked element.
         * @param {Number} event.button
         *      Button which caused the event.
         *      -1: none, 0: primary/left, 1: aux/middle, 2: secondary/right, 3: X1/back, 4: X2/forward, 5: pen eraser.
         * @param {Number} event.buttons
         *      Current buttons pressed.
         *      Combination of bit flags 0: none, 1: primary (or touch contact), 2: secondary, 4: aux (often middle), 8: X1 (often back), 16: X2 (often forward), 32: pen eraser.
         * @param {Boolean} event.isTouchEvent
         *      True if the original event is a touch event, otherwise false. <span style="color:red;">Deprecated. Use pointerType and/or originalEvent instead.</span>
         * @param {Object} event.originalEvent
         *      The original event object.
         * @param {Boolean} event.preventDefaultAction
         *      Set to true to prevent the tracker subscriber from performing its default action (subscriber implementation dependent). Default: false.
         * @param {Object} event.userData
         *      Arbitrary user-defined object.
         */
        nonPrimaryPressHandler: function nonPrimaryPressHandler() {},

        /**
         * Implement or assign implementation to these handlers during or after
         * calling the constructor.
         * @function
         * @param {Object} event
         * @param {OpenSeadragon.MouseTracker} event.eventSource
         *      A reference to the tracker instance.
         * @param {String} event.pointerType
         *     "mouse", "touch", "pen", etc.
         * @param {OpenSeadragon.Point} event.position
         *      The position of the event relative to the tracked element.
         * @param {Number} event.buttons
         *      Current buttons pressed.
         *      Combination of bit flags 0: none, 1: primary (or touch contact), 2: secondary, 4: aux (often middle), 8: X1 (often back), 16: X2 (often forward), 32: pen eraser.
         * @param {Boolean} event.insideElementPressed
         *      True if the left mouse button is currently being pressed and was
         *      initiated inside the tracked element, otherwise false.
         * @param {Boolean} event.insideElementReleased
         *      True if the cursor inside the tracked element when the button was released.
         * @param {Boolean} event.isTouchEvent
         *      True if the original event is a touch event, otherwise false. <span style="color:red;">Deprecated. Use pointerType and/or originalEvent instead.</span>
         * @param {Object} event.originalEvent
         *      The original event object.
         * @param {Boolean} event.preventDefaultAction
         *      Set to true to prevent the tracker subscriber from performing its default action (subscriber implementation dependent). Default: false.
         * @param {Object} event.userData
         *      Arbitrary user-defined object.
         */
        releaseHandler: function releaseHandler() {},

        /**
         * Implement or assign implementation to these handlers during or after
         * calling the constructor.
         * @function
         * @param {Object} event
         * @param {OpenSeadragon.MouseTracker} event.eventSource
         *      A reference to the tracker instance.
         * @param {String} event.pointerType
         *     "mouse", "touch", "pen", etc.
         * @param {OpenSeadragon.Point} event.position
         *      The position of the event relative to the tracked element.
         * @param {Number} event.button
         *      Button which caused the event.
         *      -1: none, 0: primary/left, 1: aux/middle, 2: secondary/right, 3: X1/back, 4: X2/forward, 5: pen eraser.
         * @param {Number} event.buttons
         *      Current buttons pressed.
         *      Combination of bit flags 0: none, 1: primary (or touch contact), 2: secondary, 4: aux (often middle), 8: X1 (often back), 16: X2 (often forward), 32: pen eraser.
         * @param {Boolean} event.isTouchEvent
         *      True if the original event is a touch event, otherwise false. <span style="color:red;">Deprecated. Use pointerType and/or originalEvent instead.</span>
         * @param {Object} event.originalEvent
         *      The original event object.
         * @param {Boolean} event.preventDefaultAction
         *      Set to true to prevent the tracker subscriber from performing its default action (subscriber implementation dependent). Default: false.
         * @param {Object} event.userData
         *      Arbitrary user-defined object.
         */
        nonPrimaryReleaseHandler: function nonPrimaryReleaseHandler() {},

        /**
         * Implement or assign implementation to these handlers during or after
         * calling the constructor.
         * @function
         * @param {Object} event
         * @param {OpenSeadragon.MouseTracker} event.eventSource
         *      A reference to the tracker instance.
         * @param {String} event.pointerType
         *     "mouse", "touch", "pen", etc.
         * @param {OpenSeadragon.Point} event.position
         *      The position of the event relative to the tracked element.
         * @param {Number} event.buttons
         *      Current buttons pressed.
         *      Combination of bit flags 0: none, 1: primary (or touch contact), 2: secondary, 4: aux (often middle), 8: X1 (often back), 16: X2 (often forward), 32: pen eraser.
         * @param {Boolean} event.isTouchEvent
         *      True if the original event is a touch event, otherwise false. <span style="color:red;">Deprecated. Use pointerType and/or originalEvent instead.</span>
         * @param {Object} event.originalEvent
         *      The original event object.
         * @param {Boolean} event.preventDefaultAction
         *      Set to true to prevent the tracker subscriber from performing its default action (subscriber implementation dependent). Default: false.
         * @param {Object} event.userData
         *      Arbitrary user-defined object.
         */
        moveHandler: function moveHandler() {},

        /**
         * Implement or assign implementation to these handlers during or after
         * calling the constructor.
         * @function
         * @param {Object} event
         * @param {OpenSeadragon.MouseTracker} event.eventSource
         *      A reference to the tracker instance.
         * @param {String} event.pointerType
         *     "mouse", "touch", "pen", etc.
         * @param {OpenSeadragon.Point} event.position
         *      The position of the event relative to the tracked element.
         * @param {Number} event.scroll
         *      The scroll delta for the event.
         * @param {Boolean} event.shift
         *      True if the shift key was pressed during this event.
         * @param {Boolean} event.isTouchEvent
         *      True if the original event is a touch event, otherwise false. <span style="color:red;">Deprecated. Use pointerType and/or originalEvent instead. Touch devices no longer generate scroll event.</span>
         * @param {Object} event.originalEvent
         *      The original event object.
         * @param {Boolean} event.preventDefaultAction
         *      Set to true to prevent the tracker subscriber from performing its default action (subscriber implementation dependent). Default: false.
         * @param {Object} event.userData
         *      Arbitrary user-defined object.
         */
        scrollHandler: function scrollHandler() {},

        /**
         * Implement or assign implementation to these handlers during or after
         * calling the constructor.
         * @function
         * @param {Object} event
         * @param {OpenSeadragon.MouseTracker} event.eventSource
         *      A reference to the tracker instance.
         * @param {String} event.pointerType
         *     "mouse", "touch", "pen", etc.
         * @param {OpenSeadragon.Point} event.position
         *      The position of the event relative to the tracked element.
         * @param {Boolean} event.quick
         *      True only if the clickDistThreshold and clickTimeThreshold are both passed. Useful for ignoring drag events.
         * @param {Boolean} event.shift
         *      True if the shift key was pressed during this event.
         * @param {Boolean} event.isTouchEvent
         *      True if the original event is a touch event, otherwise false. <span style="color:red;">Deprecated. Use pointerType and/or originalEvent instead.</span>
         * @param {Object} event.originalEvent
         *      The original event object.
         * @param {Boolean} event.preventDefaultAction
         *      Set to true to prevent the tracker subscriber from performing its default action (subscriber implementation dependent). Default: false.
         * @param {Object} event.userData
         *      Arbitrary user-defined object.
         */
        clickHandler: function clickHandler() {},

        /**
         * Implement or assign implementation to these handlers during or after
         * calling the constructor.
         * @function
         * @param {Object} event
         * @param {OpenSeadragon.MouseTracker} event.eventSource
         *      A reference to the tracker instance.
         * @param {String} event.pointerType
         *     "mouse", "touch", "pen", etc.
         * @param {OpenSeadragon.Point} event.position
         *      The position of the event relative to the tracked element.
         * @param {Boolean} event.shift
         *      True if the shift key was pressed during this event.
         * @param {Boolean} event.isTouchEvent
         *      True if the original event is a touch event, otherwise false. <span style="color:red;">Deprecated. Use pointerType and/or originalEvent instead.</span>
         * @param {Object} event.originalEvent
         *      The original event object.
         * @param {Boolean} event.preventDefaultAction
         *      Set to true to prevent the tracker subscriber from performing its default action (subscriber implementation dependent). Default: false.
         * @param {Object} event.userData
         *      Arbitrary user-defined object.
         */
        dblClickHandler: function dblClickHandler() {},

        /**
         * Implement or assign implementation to these handlers during or after
         * calling the constructor.
         * @function
         * @param {Object} event
         * @param {OpenSeadragon.MouseTracker} event.eventSource
         *      A reference to the tracker instance.
         * @param {String} event.pointerType
         *     "mouse", "touch", "pen", etc.
         * @param {OpenSeadragon.Point} event.position
         *      The position of the event relative to the tracked element.
         * @param {Number} event.buttons
         *      Current buttons pressed.
         *      Combination of bit flags 0: none, 1: primary (or touch contact), 2: secondary, 4: aux (often middle), 8: X1 (often back), 16: X2 (often forward), 32: pen eraser.
         * @param {OpenSeadragon.Point} event.delta
         *      The x,y components of the difference between the current position and the last drag event position.  Useful for ignoring or weighting the events.
         * @param {Number} event.speed
         *     Current computed speed, in pixels per second.
         * @param {Number} event.direction
         *     Current computed direction, expressed as an angle counterclockwise relative to the positive X axis (-pi to pi, in radians). Only valid if speed > 0.
         * @param {Boolean} event.shift
         *      True if the shift key was pressed during this event.
         * @param {Boolean} event.isTouchEvent
         *      True if the original event is a touch event, otherwise false. <span style="color:red;">Deprecated. Use pointerType and/or originalEvent instead.</span>
         * @param {Object} event.originalEvent
         *      The original event object.
         * @param {Boolean} event.preventDefaultAction
         *      Set to true to prevent the tracker subscriber from performing its default action (subscriber implementation dependent). Default: false.
         * @param {Object} event.userData
         *      Arbitrary user-defined object.
         */
        dragHandler: function dragHandler() {},

        /**
         * Implement or assign implementation to these handlers during or after
         * calling the constructor.
         * @function
         * @param {Object} event
         * @param {OpenSeadragon.MouseTracker} event.eventSource
         *      A reference to the tracker instance.
         * @param {String} event.pointerType
         *     "mouse", "touch", "pen", etc.
         * @param {OpenSeadragon.Point} event.position
         *      The position of the event relative to the tracked element.
         * @param {Number} event.speed
         *     Speed at the end of a drag gesture, in pixels per second.
         * @param {Number} event.direction
         *     Direction at the end of a drag gesture, expressed as an angle counterclockwise relative to the positive X axis (-pi to pi, in radians). Only valid if speed > 0.
         * @param {Boolean} event.shift
         *      True if the shift key was pressed during this event.
         * @param {Boolean} event.isTouchEvent
         *      True if the original event is a touch event, otherwise false. <span style="color:red;">Deprecated. Use pointerType and/or originalEvent instead.</span>
         * @param {Object} event.originalEvent
         *      The original event object.
         * @param {Boolean} event.preventDefaultAction
         *      Set to true to prevent the tracker subscriber from performing its default action (subscriber implementation dependent). Default: false.
         * @param {Object} event.userData
         *      Arbitrary user-defined object.
         */
        dragEndHandler: function dragEndHandler() {},

        /**
         * Implement or assign implementation to these handlers during or after
         * calling the constructor.
         * @function
         * @param {Object} event
         * @param {OpenSeadragon.MouseTracker} event.eventSource
         *      A reference to the tracker instance.
         * @param {String} event.pointerType
         *     "mouse", "touch", "pen", etc.
         * @param {Array.<OpenSeadragon.MouseTracker.GesturePoint>} event.gesturePoints
         *      Gesture points associated with the gesture. Velocity data can be found here.
         * @param {OpenSeadragon.Point} event.lastCenter
         *      The previous center point of the two pinch contact points relative to the tracked element.
         * @param {OpenSeadragon.Point} event.center
         *      The center point of the two pinch contact points relative to the tracked element.
         * @param {Number} event.lastDistance
         *      The previous distance between the two pinch contact points in CSS pixels.
         * @param {Number} event.distance
         *      The distance between the two pinch contact points in CSS pixels.
         * @param {Boolean} event.shift
         *      True if the shift key was pressed during this event.
         * @param {Object} event.originalEvent
         *      The original event object.
         * @param {Boolean} event.preventDefaultAction
         *      Set to true to prevent the tracker subscriber from performing its default action (subscriber implementation dependent). Default: false.
         * @param {Object} event.userData
         *      Arbitrary user-defined object.
         */
        pinchHandler: function pinchHandler() {},

        /**
         * Implement or assign implementation to these handlers during or after
         * calling the constructor.
         * @function
         * @param {Object} event
         * @param {OpenSeadragon.MouseTracker} event.eventSource
         *      A reference to the tracker instance.
         * @param {String} event.pointerType
         *     "mouse", "touch", "pen", etc.
         * @param {OpenSeadragon.Point} event.position
         *      The position of the event relative to the tracked element.
         * @param {Number} event.buttons
         *      Current buttons pressed.
         *      Combination of bit flags 0: none, 1: primary (or touch contact), 2: secondary, 4: aux (often middle), 8: X1 (often back), 16: X2 (often forward), 32: pen eraser.
         * @param {Boolean} event.isTouchEvent
         *      True if the original event is a touch event, otherwise false. <span style="color:red;">Deprecated. Use pointerType and/or originalEvent instead.</span>
         * @param {Object} event.originalEvent
         *      The original event object.
         * @param {Boolean} event.preventDefaultAction
         *      Set to true to prevent the tracker subscriber from performing its default action (subscriber implementation dependent). Default: false.
         * @param {Object} event.userData
         *      Arbitrary user-defined object.
         */
        stopHandler: function stopHandler() {},

        /**
         * Implement or assign implementation to these handlers during or after
         * calling the constructor.
         * @function
         * @param {Object} event
         * @param {OpenSeadragon.MouseTracker} event.eventSource
         *      A reference to the tracker instance.
         * @param {Number} event.keyCode
         *      The key code that was pressed.
         * @param {Boolean} event.ctrl
         *      True if the ctrl key was pressed during this event.
         * @param {Boolean} event.shift
         *      True if the shift key was pressed during this event.
         * @param {Boolean} event.alt
         *      True if the alt key was pressed during this event.
         * @param {Boolean} event.meta
         *      True if the meta key was pressed during this event.
         * @param {Object} event.originalEvent
         *      The original event object.
         * @param {Boolean} event.preventDefaultAction
         *      Set to true to prevent the tracker subscriber from performing its default action (subscriber implementation dependent). Default: false.
         * @param {Object} event.userData
         *      Arbitrary user-defined object.
         */
        keyDownHandler: function keyDownHandler() {},

        /**
         * Implement or assign implementation to these handlers during or after
         * calling the constructor.
         * @function
         * @param {Object} event
         * @param {OpenSeadragon.MouseTracker} event.eventSource
         *      A reference to the tracker instance.
         * @param {Number} event.keyCode
         *      The key code that was pressed.
         * @param {Boolean} event.ctrl
         *      True if the ctrl key was pressed during this event.
         * @param {Boolean} event.shift
         *      True if the shift key was pressed during this event.
         * @param {Boolean} event.alt
         *      True if the alt key was pressed during this event.
         * @param {Boolean} event.meta
         *      True if the meta key was pressed during this event.
         * @param {Object} event.originalEvent
         *      The original event object.
         * @param {Boolean} event.preventDefaultAction
         *      Set to true to prevent the tracker subscriber from performing its default action (subscriber implementation dependent). Default: false.
         * @param {Object} event.userData
         *      Arbitrary user-defined object.
         */
        keyUpHandler: function keyUpHandler() {},

        /**
         * Implement or assign implementation to these handlers during or after
         * calling the constructor.
         * @function
         * @param {Object} event
         * @param {OpenSeadragon.MouseTracker} event.eventSource
         *      A reference to the tracker instance.
         * @param {Number} event.keyCode
         *      The key code that was pressed.
         * @param {Boolean} event.ctrl
         *      True if the ctrl key was pressed during this event.
         * @param {Boolean} event.shift
         *      True if the shift key was pressed during this event.
         * @param {Boolean} event.alt
         *      True if the alt key was pressed during this event.
         * @param {Boolean} event.meta
         *      True if the meta key was pressed during this event.
         * @param {Object} event.originalEvent
         *      The original event object.
         * @param {Boolean} event.preventDefaultAction
         *      Set to true to prevent the tracker subscriber from performing its default action (subscriber implementation dependent). Default: false.
         * @param {Object} event.userData
         *      Arbitrary user-defined object.
         */
        keyHandler: function keyHandler() {},

        /**
         * Implement or assign implementation to these handlers during or after
         * calling the constructor.
         * @function
         * @param {Object} event
         * @param {OpenSeadragon.MouseTracker} event.eventSource
         *      A reference to the tracker instance.
         * @param {Object} event.originalEvent
         *      The original event object.
         * @param {Boolean} event.preventDefaultAction
         *      Set to true to prevent the tracker subscriber from performing its default action (subscriber implementation dependent). Default: false.
         * @param {Object} event.userData
         *      Arbitrary user-defined object.
         */
        focusHandler: function focusHandler() {},

        /**
         * Implement or assign implementation to these handlers during or after
         * calling the constructor.
         * @function
         * @param {Object} event
         * @param {OpenSeadragon.MouseTracker} event.eventSource
         *      A reference to the tracker instance.
         * @param {Object} event.originalEvent
         *      The original event object.
         * @param {Boolean} event.preventDefaultAction
         *      Set to true to prevent the tracker subscriber from performing its default action (subscriber implementation dependent). Default: false.
         * @param {Object} event.userData
         *      Arbitrary user-defined object.
         */
        blurHandler: function blurHandler() {}
    };

    /**
     * Provides continuous computation of velocity (speed and direction) of active pointers.
     * This is a singleton, used by all MouseTracker instances, as it is unlikely there will ever be more than
     * two active gesture pointers at a time.
     *
     * @private
     * @member gesturePointVelocityTracker
     * @memberof OpenSeadragon.MouseTracker
     */
    $.MouseTracker.gesturePointVelocityTracker = (function () {
        var trackerPoints = [],
            intervalId = 0,
            lastTime = 0;

        // Generates a unique identifier for a tracked gesture point
        var _generateGuid = function _generateGuid(tracker, gPoint) {
            return tracker.hash.toString() + gPoint.type + gPoint.id.toString();
        };

        // Interval timer callback. Computes velocity for all tracked gesture points.
        var _doTracking = function _doTracking() {
            var i,
                len = trackerPoints.length,
                trackPoint,
                gPoint,
                now = $.now(),
                elapsedTime,
                distance,
                speed;

            elapsedTime = now - lastTime;
            lastTime = now;

            for (i = 0; i < len; i++) {
                trackPoint = trackerPoints[i];
                gPoint = trackPoint.gPoint;
                // Math.atan2 gives us just what we need for a velocity vector, as we can simply
                //   use cos()/sin() to extract the x/y velocity components.
                gPoint.direction = Math.atan2(gPoint.currentPos.y - trackPoint.lastPos.y, gPoint.currentPos.x - trackPoint.lastPos.x);
                // speed = distance / elapsed time
                distance = trackPoint.lastPos.distanceTo(gPoint.currentPos);
                trackPoint.lastPos = gPoint.currentPos;
                speed = 1000 * distance / (elapsedTime + 1);
                // Simple biased average, favors the most recent speed computation. Smooths out erratic gestures a bit.
                gPoint.speed = 0.75 * speed + 0.25 * gPoint.speed;
            }
        };

        // Public. Add a gesture point to be tracked
        var addPoint = function addPoint(tracker, gPoint) {
            var guid = _generateGuid(tracker, gPoint);

            trackerPoints.push({
                guid: guid,
                gPoint: gPoint,
                lastPos: gPoint.currentPos
            });

            // Only fire up the interval timer when there's gesture pointers to track
            if (trackerPoints.length === 1) {
                lastTime = $.now();
                intervalId = window.setInterval(_doTracking, 50);
            }
        };

        // Public. Stop tracking a gesture point
        var removePoint = function removePoint(tracker, gPoint) {
            var guid = _generateGuid(tracker, gPoint),
                i,
                len = trackerPoints.length;
            for (i = 0; i < len; i++) {
                if (trackerPoints[i].guid === guid) {
                    trackerPoints.splice(i, 1);
                    // Only run the interval timer if theres gesture pointers to track
                    len--;
                    if (len === 0) {
                        window.clearInterval(intervalId);
                    }
                    break;
                }
            }
        };

        return {
            addPoint: addPoint,
            removePoint: removePoint
        };
    })();

    ///////////////////////////////////////////////////////////////////////////////
    // Pointer event model and feature detection
    ///////////////////////////////////////////////////////////////////////////////

    $.MouseTracker.captureElement = document;

    /**
     * Detect available mouse wheel event name.
     */
    $.MouseTracker.wheelEventName = $.Browser.vendor == $.BROWSERS.IE && $.Browser.version > 8 || 'onwheel' in document.createElement('div') ? 'wheel' : // Modern browsers support 'wheel'
    document.onmousewheel !== undefined ? 'mousewheel' : // Webkit and IE support at least 'mousewheel'
    'DOMMouseScroll'; // Assume old Firefox

    /**
     * Detect legacy mouse capture support.
     */
    $.MouseTracker.supportsMouseCapture = (function () {
        var divElement = document.createElement('div');
        return $.isFunction(divElement.setCapture) && $.isFunction(divElement.releaseCapture);
    })();

    /**
     * Detect browser pointer device event model(s) and build appropriate list of events to subscribe to.
     */
    $.MouseTracker.subscribeEvents = ["click", "dblclick", "keydown", "keyup", "keypress", "focus", "blur", $.MouseTracker.wheelEventName];

    if ($.MouseTracker.wheelEventName == "DOMMouseScroll") {
        // Older Firefox
        $.MouseTracker.subscribeEvents.push("MozMousePixelScroll");
    }

    // Note: window.navigator.pointerEnable is deprecated on IE 11 and not part of W3C spec.
    if (window.PointerEvent && (window.navigator.pointerEnabled || $.Browser.vendor !== $.BROWSERS.IE)) {
        // IE11 and other W3C Pointer Event implementations (see http://www.w3.org/TR/pointerevents)
        $.MouseTracker.havePointerEvents = true;
        $.MouseTracker.subscribeEvents.push("pointerover", "pointerout", "pointerdown", "pointerup", "pointermove", "pointercancel");
        $.MouseTracker.unprefixedPointerEvents = true;
        if (navigator.maxTouchPoints) {
            $.MouseTracker.maxTouchPoints = navigator.maxTouchPoints;
        } else {
            $.MouseTracker.maxTouchPoints = 0;
        }
        $.MouseTracker.haveMouseEnter = false;
    } else if (window.MSPointerEvent && window.navigator.msPointerEnabled) {
        // IE10
        $.MouseTracker.havePointerEvents = true;
        $.MouseTracker.subscribeEvents.push("MSPointerOver", "MSPointerOut", "MSPointerDown", "MSPointerUp", "MSPointerMove", "MSPointerCancel");
        $.MouseTracker.unprefixedPointerEvents = false;
        if (navigator.msMaxTouchPoints) {
            $.MouseTracker.maxTouchPoints = navigator.msMaxTouchPoints;
        } else {
            $.MouseTracker.maxTouchPoints = 0;
        }
        $.MouseTracker.haveMouseEnter = false;
    } else {
        // Legacy W3C mouse events
        $.MouseTracker.havePointerEvents = false;
        if ($.Browser.vendor === $.BROWSERS.IE && $.Browser.version < 9) {
            $.MouseTracker.subscribeEvents.push("mouseenter", "mouseleave");
            $.MouseTracker.haveMouseEnter = true;
        } else {
            $.MouseTracker.subscribeEvents.push("mouseover", "mouseout");
            $.MouseTracker.haveMouseEnter = false;
        }
        $.MouseTracker.subscribeEvents.push("mousedown", "mouseup", "mousemove");
        if ('ontouchstart' in window) {
            // iOS, Android, and other W3c Touch Event implementations
            //    (see http://www.w3.org/TR/touch-events/)
            //    (see https://developer.apple.com/library/ios/documentation/AppleApplications/Reference/SafariWebContent/HandlingEvents/HandlingEvents.html)
            //    (see https://developer.apple.com/library/safari/documentation/AppleApplications/Reference/SafariWebContent/HandlingEvents/HandlingEvents.html)
            $.MouseTracker.subscribeEvents.push("touchstart", "touchend", "touchmove", "touchcancel");
        }
        if ('ongesturestart' in window) {
            // iOS (see https://developer.apple.com/library/ios/documentation/AppleApplications/Reference/SafariWebContent/HandlingEvents/HandlingEvents.html)
            //   Subscribe to these to prevent default gesture handling
            $.MouseTracker.subscribeEvents.push("gesturestart", "gesturechange");
        }
        $.MouseTracker.mousePointerId = "legacy-mouse";
        $.MouseTracker.maxTouchPoints = 10;
    }

    ///////////////////////////////////////////////////////////////////////////////
    // Classes and typedefs
    ///////////////////////////////////////////////////////////////////////////////

    /**
     * Represents a point of contact on the screen made by a mouse cursor, pen, touch, or other pointer device.
     *
     * @typedef {Object} GesturePoint
     * @memberof OpenSeadragon.MouseTracker
     *
     * @property {Number} id
     *     Identifier unique from all other active GesturePoints for a given pointer device.
     * @property {String} type
     *     The pointer device type: "mouse", "touch", "pen", etc.
     * @property {Boolean} captured
     *     True if events for the gesture point are captured to the tracked element.
     * @property {Boolean} isPrimary
     *     True if the gesture point is a master pointer amongst the set of active pointers for each pointer type. True for mouse and primary (first) touch/pen pointers.
     * @property {Boolean} insideElementPressed
     *     True if button pressed or contact point initiated inside the screen area of the tracked element.
     * @property {Boolean} insideElement
     *     True if pointer or contact point is currently inside the bounds of the tracked element.
     * @property {Number} speed
     *     Current computed speed, in pixels per second.
     * @property {Number} direction
     *     Current computed direction, expressed as an angle counterclockwise relative to the positive X axis (-pi to pi, in radians). Only valid if speed > 0.
     * @property {OpenSeadragon.Point} contactPos
     *     The initial pointer contact position, relative to the page including any scrolling. Only valid if the pointer has contact (pressed, touch contact, pen contact).
     * @property {Number} contactTime
     *     The initial pointer contact time, in milliseconds. Only valid if the pointer has contact (pressed, touch contact, pen contact).
     * @property {OpenSeadragon.Point} lastPos
     *     The last pointer position, relative to the page including any scrolling.
     * @property {Number} lastTime
     *     The last pointer contact time, in milliseconds.
     * @property {OpenSeadragon.Point} currentPos
     *     The current pointer position, relative to the page including any scrolling.
     * @property {Number} currentTime
     *     The current pointer contact time, in milliseconds.
     */

    /**
     * @class GesturePointList
     * @classdesc Provides an abstraction for a set of active {@link OpenSeadragon.MouseTracker.GesturePoint|GesturePoint} objects for a given pointer device type.
     *            Active pointers are any pointer being tracked for this element which are in the hit-test area
     *            of the element (for hover-capable devices) and/or have contact or a button press initiated in the element.
     * @memberof OpenSeadragon.MouseTracker
     * @param {String} type - The pointer device type: "mouse", "touch", "pen", etc.
     */
    $.MouseTracker.GesturePointList = function (type) {
        this._gPoints = [];
        /**
         * The pointer device type: "mouse", "touch", "pen", etc.
         * @member {String} type
         * @memberof OpenSeadragon.MouseTracker.GesturePointList#
         */
        this.type = type;
        /**
         * Current buttons pressed for the device.
         * Combination of bit flags 0: none, 1: primary (or touch contact), 2: secondary, 4: aux (often middle), 8: X1 (often back), 16: X2 (often forward), 32: pen eraser.
         * @member {Number} buttons
         * @memberof OpenSeadragon.MouseTracker.GesturePointList#
         */
        this.buttons = 0;
        /**
         * Current number of contact points (touch points, mouse down, etc.) for the device.
         * @member {Number} contacts
         * @memberof OpenSeadragon.MouseTracker.GesturePointList#
         */
        this.contacts = 0;
        /**
         * Current number of clicks for the device. Used for multiple click gesture tracking.
         * @member {Number} clicks
         * @memberof OpenSeadragon.MouseTracker.GesturePointList#
         */
        this.clicks = 0;
        /**
         * Current number of captured pointers for the device.
         * @member {Number} captureCount
         * @memberof OpenSeadragon.MouseTracker.GesturePointList#
         */
        this.captureCount = 0;
    };
    $.MouseTracker.GesturePointList.prototype = /** @lends OpenSeadragon.MouseTracker.GesturePointList.prototype */{
        /**
         * @function
         * @returns {Number} Number of gesture points in the list.
         */
        getLength: function getLength() {
            return this._gPoints.length;
        },
        /**
         * @function
         * @returns {Array.<OpenSeadragon.MouseTracker.GesturePoint>} The list of gesture points in the list as an array (read-only).
         */
        asArray: function asArray() {
            return this._gPoints;
        },
        /**
         * @function
         * @param {OpenSeadragon.MouseTracker.GesturePoint} gesturePoint - A gesture point to add to the list.
         * @returns {Number} Number of gesture points in the list.
         */
        add: function add(gp) {
            return this._gPoints.push(gp);
        },
        /**
         * @function
         * @param {Number} id - The id of the gesture point to remove from the list.
         * @returns {Number} Number of gesture points in the list.
         */
        removeById: function removeById(id) {
            var i,
                len = this._gPoints.length;
            for (i = 0; i < len; i++) {
                if (this._gPoints[i].id === id) {
                    this._gPoints.splice(i, 1);
                    break;
                }
            }
            return this._gPoints.length;
        },
        /**
         * @function
         * @param {Number} index - The index of the gesture point to retrieve from the list.
         * @returns {OpenSeadragon.MouseTracker.GesturePoint|null} The gesture point at the given index, or null if not found.
         */
        getByIndex: function getByIndex(index) {
            if (index < this._gPoints.length) {
                return this._gPoints[index];
            }

            return null;
        },
        /**
         * @function
         * @param {Number} id - The id of the gesture point to retrieve from the list.
         * @returns {OpenSeadragon.MouseTracker.GesturePoint|null} The gesture point with the given id, or null if not found.
         */
        getById: function getById(id) {
            var i,
                len = this._gPoints.length;
            for (i = 0; i < len; i++) {
                if (this._gPoints[i].id === id) {
                    return this._gPoints[i];
                }
            }
            return null;
        },
        /**
         * @function
         * @returns {OpenSeadragon.MouseTracker.GesturePoint|null} The primary gesture point in the list, or null if not found.
         */
        getPrimary: function getPrimary(id) {
            var i,
                len = this._gPoints.length;
            for (i = 0; i < len; i++) {
                if (this._gPoints[i].isPrimary) {
                    return this._gPoints[i];
                }
            }
            return null;
        }
    };

    ///////////////////////////////////////////////////////////////////////////////
    // Utility functions
    ///////////////////////////////////////////////////////////////////////////////

    /**
     * Removes all tracked pointers.
     * @private
     * @inner
     */
    function clearTrackedPointers(tracker) {
        var delegate = THIS[tracker.hash],
            i,
            pointerListCount = delegate.activePointersLists.length;

        for (i = 0; i < pointerListCount; i++) {
            if (delegate.activePointersLists[i].captureCount > 0) {
                $.removeEvent($.MouseTracker.captureElement, 'mousemove', delegate.mousemovecaptured, true);
                $.removeEvent($.MouseTracker.captureElement, 'mouseup', delegate.mouseupcaptured, true);
                $.removeEvent($.MouseTracker.captureElement, $.MouseTracker.unprefixedPointerEvents ? 'pointermove' : 'MSPointerMove', delegate.pointermovecaptured, true);
                $.removeEvent($.MouseTracker.captureElement, $.MouseTracker.unprefixedPointerEvents ? 'pointerup' : 'MSPointerUp', delegate.pointerupcaptured, true);
                $.removeEvent($.MouseTracker.captureElement, 'touchmove', delegate.touchmovecaptured, true);
                $.removeEvent($.MouseTracker.captureElement, 'touchend', delegate.touchendcaptured, true);

                delegate.activePointersLists[i].captureCount = 0;
            }
        }

        for (i = 0; i < pointerListCount; i++) {
            delegate.activePointersLists.pop();
        }
    }

    /**
     * Starts tracking pointer events on the tracked element.
     * @private
     * @inner
     */
    function startTracking(tracker) {
        var delegate = THIS[tracker.hash],
            event,
            i;

        if (!delegate.tracking) {
            for (i = 0; i < $.MouseTracker.subscribeEvents.length; i++) {
                event = $.MouseTracker.subscribeEvents[i];
                $.addEvent(tracker.element, event, delegate[event], false);
            }

            clearTrackedPointers(tracker);

            delegate.tracking = true;
        }
    }

    /**
     * Stops tracking pointer events on the tracked element.
     * @private
     * @inner
     */
    function stopTracking(tracker) {
        var delegate = THIS[tracker.hash],
            event,
            i;

        if (delegate.tracking) {
            for (i = 0; i < $.MouseTracker.subscribeEvents.length; i++) {
                event = $.MouseTracker.subscribeEvents[i];
                $.removeEvent(tracker.element, event, delegate[event], false);
            }

            clearTrackedPointers(tracker);

            delegate.tracking = false;
        }
    }

    /**
     * @private
     * @inner
     */
    function getCaptureEventParams(tracker, pointerType) {
        var delegate = THIS[tracker.hash];

        if (pointerType === 'pointerevent') {
            return {
                upName: $.MouseTracker.unprefixedPointerEvents ? 'pointerup' : 'MSPointerUp',
                upHandler: delegate.pointerupcaptured,
                moveName: $.MouseTracker.unprefixedPointerEvents ? 'pointermove' : 'MSPointerMove',
                moveHandler: delegate.pointermovecaptured
            };
        } else if (pointerType === 'mouse') {
            return {
                upName: 'mouseup',
                upHandler: delegate.mouseupcaptured,
                moveName: 'mousemove',
                moveHandler: delegate.mousemovecaptured
            };
        } else if (pointerType === 'touch') {
            return {
                upName: 'touchend',
                upHandler: delegate.touchendcaptured,
                moveName: 'touchmove',
                moveHandler: delegate.touchmovecaptured
            };
        } else {
            throw new Error("MouseTracker.getCaptureEventParams: Unknown pointer type.");
        }
    }

    /**
     * Begin capturing pointer events to the tracked element.
     * @private
     * @inner
     */
    function capturePointer(tracker, pointerType) {
        var pointsList = tracker.getActivePointersListByType(pointerType),
            eventParams;

        pointsList.captureCount++;

        if (pointsList.captureCount === 1) {
            if ($.Browser.vendor === $.BROWSERS.IE && $.Browser.version < 9) {
                tracker.element.setCapture(true);
            } else {
                eventParams = getCaptureEventParams(tracker, $.MouseTracker.havePointerEvents ? 'pointerevent' : pointerType);
                // We emulate mouse capture by hanging listeners on the document object.
                //    (Note we listen on the capture phase so the captured handlers will get called first)
                $.addEvent($.MouseTracker.captureElement, eventParams.upName, eventParams.upHandler, true);
                $.addEvent($.MouseTracker.captureElement, eventParams.moveName, eventParams.moveHandler, true);
            }
        }
    }

    /**
     * Stop capturing pointer events to the tracked element.
     * @private
     * @inner
     */
    function releasePointer(tracker, pointerType) {
        var pointsList = tracker.getActivePointersListByType(pointerType),
            eventParams;

        pointsList.captureCount--;

        if (pointsList.captureCount === 0) {
            if ($.Browser.vendor === $.BROWSERS.IE && $.Browser.version < 9) {
                tracker.element.releaseCapture();
            } else {
                eventParams = getCaptureEventParams(tracker, $.MouseTracker.havePointerEvents ? 'pointerevent' : pointerType);
                // We emulate mouse capture by hanging listeners on the document object.
                //    (Note we listen on the capture phase so the captured handlers will get called first)
                $.removeEvent($.MouseTracker.captureElement, eventParams.moveName, eventParams.moveHandler, true);
                $.removeEvent($.MouseTracker.captureElement, eventParams.upName, eventParams.upHandler, true);
            }
        }
    }

    /**
     * Gets a W3C Pointer Events model compatible pointer type string from a DOM pointer event.
     * IE10 used a long integer value, but the W3C specification (and IE11+) use a string "mouse", "touch", "pen", etc.
     * @private
     * @inner
     */
    function getPointerType(event) {
        var pointerTypeStr;
        if ($.MouseTracker.unprefixedPointerEvents) {
            pointerTypeStr = event.pointerType;
        } else {
            // IE10
            //  MSPOINTER_TYPE_TOUCH: 0x00000002
            //  MSPOINTER_TYPE_PEN:   0x00000003
            //  MSPOINTER_TYPE_MOUSE: 0x00000004
            switch (event.pointerType) {
                case 0x00000002:
                    pointerTypeStr = 'touch';
                    break;
                case 0x00000003:
                    pointerTypeStr = 'pen';
                    break;
                case 0x00000004:
                    pointerTypeStr = 'mouse';
                    break;
                default:
                    pointerTypeStr = '';
            }
        }
        return pointerTypeStr;
    }

    /**
     * @private
     * @inner
     */
    function getMouseAbsolute(event) {
        return $.getMousePosition(event);
    }

    /**
     * @private
     * @inner
     */
    function getMouseRelative(event, element) {
        return getPointRelativeToAbsolute(getMouseAbsolute(event), element);
    }

    /**
     * @private
     * @inner
     */
    function getPointRelativeToAbsolute(point, element) {
        var offset = $.getElementOffset(element);
        return point.minus(offset);
    }

    /**
     * @private
     * @inner
     */
    function getCenterPoint(point1, point2) {
        return new $.Point((point1.x + point2.x) / 2, (point1.y + point2.y) / 2);
    }

    ///////////////////////////////////////////////////////////////////////////////
    // Device-specific DOM event handlers
    ///////////////////////////////////////////////////////////////////////////////

    /**
     * @private
     * @inner
     */
    function onClick(tracker, event) {
        if (tracker.clickHandler) {
            $.cancelEvent(event);
        }
    }

    /**
     * @private
     * @inner
     */
    function onDblClick(tracker, event) {
        if (tracker.dblClickHandler) {
            $.cancelEvent(event);
        }
    }

    /**
     * @private
     * @inner
     */
    function onKeyDown(tracker, event) {
        //$.console.log( "keydown %s %s %s %s %s", event.keyCode, event.charCode, event.ctrlKey, event.shiftKey, event.altKey );
        var propagate;
        if (tracker.keyDownHandler) {
            event = $.getEvent(event);
            propagate = tracker.keyDownHandler({
                eventSource: tracker,
                keyCode: event.keyCode ? event.keyCode : event.charCode,
                ctrl: event.ctrlKey,
                shift: event.shiftKey,
                alt: event.altKey,
                meta: event.metaKey,
                originalEvent: event,
                preventDefaultAction: false,
                userData: tracker.userData
            });
            if (!propagate) {
                $.cancelEvent(event);
            }
        }
    }

    /**
     * @private
     * @inner
     */
    function onKeyUp(tracker, event) {
        //$.console.log( "keyup %s %s %s %s %s", event.keyCode, event.charCode, event.ctrlKey, event.shiftKey, event.altKey );
        var propagate;
        if (tracker.keyUpHandler) {
            event = $.getEvent(event);
            propagate = tracker.keyUpHandler({
                eventSource: tracker,
                keyCode: event.keyCode ? event.keyCode : event.charCode,
                ctrl: event.ctrlKey,
                shift: event.shiftKey,
                alt: event.altKey,
                meta: event.metaKey,
                originalEvent: event,
                preventDefaultAction: false,
                userData: tracker.userData
            });
            if (!propagate) {
                $.cancelEvent(event);
            }
        }
    }

    /**
     * @private
     * @inner
     */
    function onKeyPress(tracker, event) {
        //$.console.log( "keypress %s %s %s %s %s", event.keyCode, event.charCode, event.ctrlKey, event.shiftKey, event.altKey );
        var propagate;
        if (tracker.keyHandler) {
            event = $.getEvent(event);
            propagate = tracker.keyHandler({
                eventSource: tracker,
                keyCode: event.keyCode ? event.keyCode : event.charCode,
                ctrl: event.ctrlKey,
                shift: event.shiftKey,
                alt: event.altKey,
                meta: event.metaKey,
                originalEvent: event,
                preventDefaultAction: false,
                userData: tracker.userData
            });
            if (!propagate) {
                $.cancelEvent(event);
            }
        }
    }

    /**
     * @private
     * @inner
     */
    function onFocus(tracker, event) {
        //console.log( "focus %s", event );
        var propagate;
        if (tracker.focusHandler) {
            event = $.getEvent(event);
            propagate = tracker.focusHandler({
                eventSource: tracker,
                originalEvent: event,
                preventDefaultAction: false,
                userData: tracker.userData
            });
            if (propagate === false) {
                $.cancelEvent(event);
            }
        }
    }

    /**
     * @private
     * @inner
     */
    function onBlur(tracker, event) {
        //console.log( "blur %s", event );
        var propagate;
        if (tracker.blurHandler) {
            event = $.getEvent(event);
            propagate = tracker.blurHandler({
                eventSource: tracker,
                originalEvent: event,
                preventDefaultAction: false,
                userData: tracker.userData
            });
            if (propagate === false) {
                $.cancelEvent(event);
            }
        }
    }

    /**
     * Handler for 'wheel' events
     *
     * @private
     * @inner
     */
    function onWheel(tracker, event) {
        handleWheelEvent(tracker, event, event);
    }

    /**
     * Handler for 'mousewheel', 'DOMMouseScroll', and 'MozMousePixelScroll' events
     *
     * @private
     * @inner
     */
    function onMouseWheel(tracker, event) {
        event = $.getEvent(event);

        // Simulate a 'wheel' event
        var simulatedEvent = {
            target: event.target || event.srcElement,
            type: "wheel",
            shiftKey: event.shiftKey || false,
            clientX: event.clientX,
            clientY: event.clientY,
            pageX: event.pageX ? event.pageX : event.clientX,
            pageY: event.pageY ? event.pageY : event.clientY,
            deltaMode: event.type == "MozMousePixelScroll" ? 0 : 1, // 0=pixel, 1=line, 2=page
            deltaX: 0,
            deltaZ: 0
        };

        // Calculate deltaY
        if ($.MouseTracker.wheelEventName == "mousewheel") {
            simulatedEvent.deltaY = -1 / $.DEFAULT_SETTINGS.pixelsPerWheelLine * event.wheelDelta;
        } else {
            simulatedEvent.deltaY = event.detail;
        }

        handleWheelEvent(tracker, simulatedEvent, event);
    }

    /**
     * Handles 'wheel' events.
     * The event may be simulated by the legacy mouse wheel event handler (onMouseWheel()).
     *
     * @private
     * @inner
     */
    function handleWheelEvent(tracker, event, originalEvent) {
        var nDelta = 0,
            propagate;

        // The nDelta variable is gated to provide smooth z-index scrolling
        //   since the mouse wheel allows for substantial deltas meant for rapid
        //   y-index scrolling.
        // event.deltaMode: 0=pixel, 1=line, 2=page
        // TODO: Deltas in pixel mode should be accumulated then a scroll value computed after $.DEFAULT_SETTINGS.pixelsPerWheelLine threshold reached
        nDelta = event.deltaY < 0 ? 1 : -1;

        if (tracker.scrollHandler) {
            propagate = tracker.scrollHandler({
                eventSource: tracker,
                pointerType: 'mouse',
                position: getMouseRelative(event, tracker.element),
                scroll: nDelta,
                shift: event.shiftKey,
                isTouchEvent: false,
                originalEvent: originalEvent,
                preventDefaultAction: false,
                userData: tracker.userData
            });
            if (propagate === false) {
                $.cancelEvent(originalEvent);
            }
        }
    }

    /**
     * @private
     * @inner
     */
    function isParentChild(parent, child) {
        if (parent === child) {
            return false;
        }
        while (child && child !== parent) {
            child = child.parentNode;
        }
        return child === parent;
    }

    /**
     * Only used on IE 8
     *
     * @private
     * @inner
     */
    function onMouseEnter(tracker, event) {
        event = $.getEvent(event);

        handleMouseEnter(tracker, event);
    }

    /**
     * @private
     * @inner
     */
    function onMouseOver(tracker, event) {
        event = $.getEvent(event);

        if (event.currentTarget === event.relatedTarget || isParentChild(event.currentTarget, event.relatedTarget)) {
            return;
        }

        handleMouseEnter(tracker, event);
    }

    /**
     * @private
     * @inner
     */
    function handleMouseEnter(tracker, event) {
        var gPoint = {
            id: $.MouseTracker.mousePointerId,
            type: 'mouse',
            isPrimary: true,
            currentPos: getMouseAbsolute(event),
            currentTime: $.now()
        };

        updatePointersEnter(tracker, event, [gPoint]);
    }

    /**
     * Only used on IE 8
     *
     * @private
     * @inner
     */
    function onMouseLeave(tracker, event) {
        event = $.getEvent(event);

        handleMouseExit(tracker, event);
    }

    /**
     * @private
     * @inner
     */
    function onMouseOut(tracker, event) {
        event = $.getEvent(event);

        if (event.currentTarget === event.relatedTarget || isParentChild(event.currentTarget, event.relatedTarget)) {
            return;
        }

        handleMouseExit(tracker, event);
    }

    /**
     * @private
     * @inner
     */
    function handleMouseExit(tracker, event) {
        var gPoint = {
            id: $.MouseTracker.mousePointerId,
            type: 'mouse',
            isPrimary: true,
            currentPos: getMouseAbsolute(event),
            currentTime: $.now()
        };

        updatePointersExit(tracker, event, [gPoint]);
    }

    /**
     * Returns a W3C DOM level 3 standard button value given an event.button property:
     *   -1 == none, 0 == primary/left, 1 == middle, 2 == secondary/right, 3 == X1/back, 4 == X2/forward, 5 == eraser (pen)
     * @private
     * @inner
     */
    function getStandardizedButton(button) {
        if ($.Browser.vendor === $.BROWSERS.IE && $.Browser.version < 9) {
            // On IE 8, 0 == none, 1 == left, 2 == right, 3 == left and right, 4 == middle, 5 == left and middle, 6 == right and middle, 7 == all three
            // TODO: Support chorded (multiple) button presses on IE 8?
            if (button === 1) {
                return 0;
            } else if (button === 2) {
                return 2;
            } else if (button === 4) {
                return 1;
            } else {
                return -1;
            }
        } else {
            return button;
        }
    }

    /**
     * @private
     * @inner
     */
    function onMouseDown(tracker, event) {
        var gPoint;

        event = $.getEvent(event);

        gPoint = {
            id: $.MouseTracker.mousePointerId,
            type: 'mouse',
            isPrimary: true,
            currentPos: getMouseAbsolute(event),
            currentTime: $.now()
        };

        if (updatePointersDown(tracker, event, [gPoint], getStandardizedButton(event.button))) {
            $.stopEvent(event);
            capturePointer(tracker, 'mouse');
        }

        if (tracker.clickHandler || tracker.dblClickHandler || tracker.pressHandler || tracker.dragHandler || tracker.dragEndHandler) {
            $.cancelEvent(event);
        }
    }

    /**
     * @private
     * @inner
     */
    function onMouseUp(tracker, event) {
        handleMouseUp(tracker, event);
    }

    /**
     * This handler is attached to the window object (on the capture phase) to emulate mouse capture.
     * onMouseUp is still attached to the tracked element, so stop propagation to avoid processing twice.
     *
     * @private
     * @inner
     */
    function onMouseUpCaptured(tracker, event) {
        handleMouseUp(tracker, event);
        $.stopEvent(event);
    }

    /**
     * @private
     * @inner
     */
    function handleMouseUp(tracker, event) {
        var gPoint;

        event = $.getEvent(event);

        gPoint = {
            id: $.MouseTracker.mousePointerId,
            type: 'mouse',
            isPrimary: true,
            currentPos: getMouseAbsolute(event),
            currentTime: $.now()
        };

        if (updatePointersUp(tracker, event, [gPoint], getStandardizedButton(event.button))) {
            releasePointer(tracker, 'mouse');
        }
    }

    /**
     * @private
     * @inner
     */
    function onMouseMove(tracker, event) {
        handleMouseMove(tracker, event);
    }

    /**
     * This handler is attached to the window object (on the capture phase) to emulate mouse capture.
     * onMouseMove is still attached to the tracked element, so stop propagation to avoid processing twice.
     *
     * @private
     * @inner
     */
    function onMouseMoveCaptured(tracker, event) {
        handleMouseMove(tracker, event);
        $.stopEvent(event);
    }

    /**
     * @private
     * @inner
     */
    function handleMouseMove(tracker, event) {
        var gPoint;

        event = $.getEvent(event);

        gPoint = {
            id: $.MouseTracker.mousePointerId,
            type: 'mouse',
            isPrimary: true,
            currentPos: getMouseAbsolute(event),
            currentTime: $.now()
        };

        updatePointersMove(tracker, event, [gPoint]);
    }

    /**
     * @private
     * @inner
     */
    function abortTouchContacts(tracker, event, pointsList) {
        var i,
            gPointCount = pointsList.getLength(),
            abortGPoints = [];

        for (i = 0; i < gPointCount; i++) {
            abortGPoints.push(pointsList.getByIndex(i));
        }

        if (abortGPoints.length > 0) {
            // simulate touchend
            updatePointersUp(tracker, event, abortGPoints, 0); // 0 means primary button press/release or touch contact
            // release pointer capture
            pointsList.captureCount = 1;
            releasePointer(tracker, 'touch');
            // simulate touchleave
            updatePointersExit(tracker, event, abortGPoints);
        }
    }

    /**
     * @private
     * @inner
     */
    function onTouchStart(tracker, event) {
        var time,
            i,
            j,
            touchCount = event.changedTouches.length,
            gPoints = [],
            parentGPoints,
            pointsList = tracker.getActivePointersListByType('touch');

        time = $.now();

        if (pointsList.getLength() > event.touches.length - touchCount) {
            $.console.warn('Tracked touch contact count doesn\'t match event.touches.length. Removing all tracked touch pointers.');
            abortTouchContacts(tracker, event, pointsList);
        }

        for (i = 0; i < touchCount; i++) {
            gPoints.push({
                id: event.changedTouches[i].identifier,
                type: 'touch',
                // isPrimary not set - let the updatePointers functions determine it
                currentPos: getMouseAbsolute(event.changedTouches[i]),
                currentTime: time
            });
        }

        // simulate touchenter on our tracked element
        updatePointersEnter(tracker, event, gPoints);

        // simulate touchenter on our tracked element's tracked ancestor elements
        for (i = 0; i < MOUSETRACKERS.length; i++) {
            if (MOUSETRACKERS[i] !== tracker && MOUSETRACKERS[i].isTracking() && isParentChild(MOUSETRACKERS[i].element, tracker.element)) {
                parentGPoints = [];
                for (j = 0; j < touchCount; j++) {
                    parentGPoints.push({
                        id: event.changedTouches[j].identifier,
                        type: 'touch',
                        // isPrimary not set - let the updatePointers functions determine it
                        currentPos: getMouseAbsolute(event.changedTouches[j]),
                        currentTime: time
                    });
                }
                updatePointersEnter(MOUSETRACKERS[i], event, parentGPoints);
            }
        }

        if (updatePointersDown(tracker, event, gPoints, 0)) {
            // 0 means primary button press/release or touch contact
            $.stopEvent(event);
            capturePointer(tracker, 'touch');
        }

        $.cancelEvent(event);
    }

    /**
     * @private
     * @inner
     */
    function onTouchEnd(tracker, event) {
        handleTouchEnd(tracker, event);
    }

    /**
     * This handler is attached to the window object (on the capture phase) to emulate pointer capture.
     * onTouchEnd is still attached to the tracked element, so stop propagation to avoid processing twice.
     *
     * @private
     * @inner
     */
    function onTouchEndCaptured(tracker, event) {
        handleTouchEnd(tracker, event);
        $.stopEvent(event);
    }

    /**
     * @private
     * @inner
     */
    function handleTouchEnd(tracker, event) {
        var time,
            i,
            j,
            touchCount = event.changedTouches.length,
            gPoints = [],
            parentGPoints;

        time = $.now();

        for (i = 0; i < touchCount; i++) {
            gPoints.push({
                id: event.changedTouches[i].identifier,
                type: 'touch',
                // isPrimary not set - let the updatePointers functions determine it
                currentPos: getMouseAbsolute(event.changedTouches[i]),
                currentTime: time
            });
        }

        if (updatePointersUp(tracker, event, gPoints, 0)) {
            releasePointer(tracker, 'touch');
        }

        // simulate touchleave on our tracked element
        updatePointersExit(tracker, event, gPoints);

        // simulate touchleave on our tracked element's tracked ancestor elements
        for (i = 0; i < MOUSETRACKERS.length; i++) {
            if (MOUSETRACKERS[i] !== tracker && MOUSETRACKERS[i].isTracking() && isParentChild(MOUSETRACKERS[i].element, tracker.element)) {
                parentGPoints = [];
                for (j = 0; j < touchCount; j++) {
                    parentGPoints.push({
                        id: event.changedTouches[j].identifier,
                        type: 'touch',
                        // isPrimary not set - let the updatePointers functions determine it
                        currentPos: getMouseAbsolute(event.changedTouches[j]),
                        currentTime: time
                    });
                }
                updatePointersExit(MOUSETRACKERS[i], event, parentGPoints);
            }
        }

        $.cancelEvent(event);
    }

    /**
     * @private
     * @inner
     */
    function onTouchMove(tracker, event) {
        handleTouchMove(tracker, event);
    }

    /**
     * This handler is attached to the window object (on the capture phase) to emulate pointer capture.
     * onTouchMove is still attached to the tracked element, so stop propagation to avoid processing twice.
     *
     * @private
     * @inner
     */
    function onTouchMoveCaptured(tracker, event) {
        handleTouchMove(tracker, event);
        $.stopEvent(event);
    }

    /**
     * @private
     * @inner
     */
    function handleTouchMove(tracker, event) {
        var i,
            touchCount = event.changedTouches.length,
            gPoints = [];

        for (i = 0; i < touchCount; i++) {
            gPoints.push({
                id: event.changedTouches[i].identifier,
                type: 'touch',
                // isPrimary not set - let the updatePointers functions determine it
                currentPos: getMouseAbsolute(event.changedTouches[i]),
                currentTime: $.now()
            });
        }

        updatePointersMove(tracker, event, gPoints);

        $.cancelEvent(event);
    }

    /**
     * @private
     * @inner
     */
    function onTouchCancel(tracker, event) {
        var i,
            touchCount = event.changedTouches.length,
            gPoints = [],
            pointsList = tracker.getActivePointersListByType('touch');

        abortTouchContacts(tracker, event, pointsList);
    }

    /**
     * @private
     * @inner
     */
    function onGestureStart(tracker, event) {
        event.stopPropagation();
        event.preventDefault();
        return false;
    }

    /**
     * @private
     * @inner
     */
    function onGestureChange(tracker, event) {
        event.stopPropagation();
        event.preventDefault();
        return false;
    }

    /**
     * @private
     * @inner
     */
    function onPointerOver(tracker, event) {
        var gPoint;

        if (event.currentTarget === event.relatedTarget || isParentChild(event.currentTarget, event.relatedTarget)) {
            return;
        }

        gPoint = {
            id: event.pointerId,
            type: getPointerType(event),
            isPrimary: event.isPrimary,
            currentPos: getMouseAbsolute(event),
            currentTime: $.now()
        };

        updatePointersEnter(tracker, event, [gPoint]);
    }

    /**
     * @private
     * @inner
     */
    function onPointerOut(tracker, event) {
        var gPoint;

        if (event.currentTarget === event.relatedTarget || isParentChild(event.currentTarget, event.relatedTarget)) {
            return;
        }

        gPoint = {
            id: event.pointerId,
            type: getPointerType(event),
            isPrimary: event.isPrimary,
            currentPos: getMouseAbsolute(event),
            currentTime: $.now()
        };

        updatePointersExit(tracker, event, [gPoint]);
    }

    /**
     * @private
     * @inner
     */
    function onPointerDown(tracker, event) {
        var gPoint;

        gPoint = {
            id: event.pointerId,
            type: getPointerType(event),
            isPrimary: event.isPrimary,
            currentPos: getMouseAbsolute(event),
            currentTime: $.now()
        };

        if (updatePointersDown(tracker, event, [gPoint], event.button)) {
            $.stopEvent(event);
            capturePointer(tracker, gPoint.type);
        }

        if (tracker.clickHandler || tracker.dblClickHandler || tracker.pressHandler || tracker.dragHandler || tracker.dragEndHandler || tracker.pinchHandler) {
            $.cancelEvent(event);
        }
    }

    /**
     * @private
     * @inner
     */
    function onPointerUp(tracker, event) {
        handlePointerUp(tracker, event);
    }

    /**
     * This handler is attached to the window object (on the capture phase) to emulate mouse capture.
     * onPointerUp is still attached to the tracked element, so stop propagation to avoid processing twice.
     *
     * @private
     * @inner
     */
    function onPointerUpCaptured(tracker, event) {
        var pointsList = tracker.getActivePointersListByType(getPointerType(event));
        if (pointsList.getById(event.pointerId)) {
            handlePointerUp(tracker, event);
        }
        $.stopEvent(event);
    }

    /**
     * @private
     * @inner
     */
    function handlePointerUp(tracker, event) {
        var gPoint;

        gPoint = {
            id: event.pointerId,
            type: getPointerType(event),
            isPrimary: event.isPrimary,
            currentPos: getMouseAbsolute(event),
            currentTime: $.now()
        };

        if (updatePointersUp(tracker, event, [gPoint], event.button)) {
            releasePointer(tracker, gPoint.type);
        }
    }

    /**
     * @private
     * @inner
     */
    function onPointerMove(tracker, event) {
        handlePointerMove(tracker, event);
    }

    /**
     * This handler is attached to the window object (on the capture phase) to emulate mouse capture.
     * onPointerMove is still attached to the tracked element, so stop propagation to avoid processing twice.
     *
     * @private
     * @inner
     */
    function onPointerMoveCaptured(tracker, event) {
        var pointsList = tracker.getActivePointersListByType(getPointerType(event));
        if (pointsList.getById(event.pointerId)) {
            handlePointerMove(tracker, event);
        }
        $.stopEvent(event);
    }

    /**
     * @private
     * @inner
     */
    function handlePointerMove(tracker, event) {
        // Pointer changed coordinates, button state, pressure, tilt, or contact geometry (e.g. width and height)
        var gPoint;

        gPoint = {
            id: event.pointerId,
            type: getPointerType(event),
            isPrimary: event.isPrimary,
            currentPos: getMouseAbsolute(event),
            currentTime: $.now()
        };

        updatePointersMove(tracker, event, [gPoint]);
    }

    /**
     * @private
     * @inner
     */
    function onPointerCancel(tracker, event) {
        var gPoint;

        gPoint = {
            id: event.pointerId,
            type: getPointerType(event)
        };

        updatePointersCancel(tracker, event, [gPoint]);
    }

    ///////////////////////////////////////////////////////////////////////////////
    // Device-agnostic DOM event handlers
    ///////////////////////////////////////////////////////////////////////////////

    /**
     * @function
     * @private
     * @inner
     * @param {OpenSeadragon.MouseTracker.GesturePointList} pointsList
     *     The GesturePointList to track the pointer in.
     * @param {OpenSeadragon.MouseTracker.GesturePoint} gPoint
     *      Gesture point to track.
     * @returns {Number} Number of gesture points in pointsList.
     */
    function startTrackingPointer(pointsList, gPoint) {

        // If isPrimary is not known for the pointer then set it according to our rules:
        //    true if the first pointer in the gesture, otherwise false
        if (!gPoint.hasOwnProperty('isPrimary')) {
            if (pointsList.getLength() === 0) {
                gPoint.isPrimary = true;
            } else {
                gPoint.isPrimary = false;
            }
        }
        gPoint.speed = 0;
        gPoint.direction = 0;
        gPoint.contactPos = gPoint.currentPos;
        gPoint.contactTime = gPoint.currentTime;
        gPoint.lastPos = gPoint.currentPos;
        gPoint.lastTime = gPoint.currentTime;

        return pointsList.add(gPoint);
    }

    /**
     * @function
     * @private
     * @inner
     * @param {OpenSeadragon.MouseTracker.GesturePointList} pointsList
     *     The GesturePointList to stop tracking the pointer on.
     * @param {OpenSeadragon.MouseTracker.GesturePoint} gPoint
     *      Gesture point to stop tracking.
     * @returns {Number} Number of gesture points in pointsList.
     */
    function stopTrackingPointer(pointsList, gPoint) {
        var listLength, primaryPoint;

        if (pointsList.getById(gPoint.id)) {
            listLength = pointsList.removeById(gPoint.id);

            // If isPrimary is not known for the pointer and we just removed the primary pointer from the list then we need to set another pointer as primary
            if (!gPoint.hasOwnProperty('isPrimary')) {
                primaryPoint = pointsList.getPrimary();
                if (!primaryPoint) {
                    primaryPoint = pointsList.getByIndex(0);
                    if (primaryPoint) {
                        primaryPoint.isPrimary = true;
                    }
                }
            }
        } else {
            listLength = pointsList.getLength();
        }

        return listLength;
    }

    /**
     * @function
     * @private
     * @inner
     * @param {OpenSeadragon.MouseTracker} tracker
     *     A reference to the MouseTracker instance.
     * @param {Object} event
     *     A reference to the originating DOM event.
     * @param {Array.<OpenSeadragon.MouseTracker.GesturePoint>} gPoints
     *      Gesture points associated with the event.
     */
    function updatePointersEnter(tracker, event, gPoints) {
        var pointsList = tracker.getActivePointersListByType(gPoints[0].type),
            i,
            gPointCount = gPoints.length,
            curGPoint,
            updateGPoint,
            propagate;

        for (i = 0; i < gPointCount; i++) {
            curGPoint = gPoints[i];
            updateGPoint = pointsList.getById(curGPoint.id);

            if (updateGPoint) {
                // Already tracking the pointer...update it
                updateGPoint.insideElement = true;
                updateGPoint.lastPos = updateGPoint.currentPos;
                updateGPoint.lastTime = updateGPoint.currentTime;
                updateGPoint.currentPos = curGPoint.currentPos;
                updateGPoint.currentTime = curGPoint.currentTime;

                curGPoint = updateGPoint;
            } else {
                // Initialize for tracking and add to the tracking list
                curGPoint.captured = false;
                curGPoint.insideElementPressed = false;
                curGPoint.insideElement = true;
                startTrackingPointer(pointsList, curGPoint);
            }

            // Enter
            if (tracker.enterHandler) {
                propagate = tracker.enterHandler({
                    eventSource: tracker,
                    pointerType: curGPoint.type,
                    position: getPointRelativeToAbsolute(curGPoint.currentPos, tracker.element),
                    buttons: pointsList.buttons,
                    pointers: tracker.getActivePointerCount(),
                    insideElementPressed: curGPoint.insideElementPressed,
                    buttonDownAny: pointsList.buttons !== 0,
                    isTouchEvent: curGPoint.type === 'touch',
                    originalEvent: event,
                    preventDefaultAction: false,
                    userData: tracker.userData
                });
                if (propagate === false) {
                    $.cancelEvent(event);
                }
            }
        }
    }

    /**
     * @function
     * @private
     * @inner
     * @param {OpenSeadragon.MouseTracker} tracker
     *     A reference to the MouseTracker instance.
     * @param {Object} event
     *     A reference to the originating DOM event.
     * @param {Array.<OpenSeadragon.MouseTracker.GesturePoint>} gPoints
     *      Gesture points associated with the event.
     */
    function updatePointersExit(tracker, event, gPoints) {
        var delegate = THIS[tracker.hash],
            pointsList = tracker.getActivePointersListByType(gPoints[0].type),
            i,
            gPointCount = gPoints.length,
            curGPoint,
            updateGPoint,
            propagate;

        for (i = 0; i < gPointCount; i++) {
            curGPoint = gPoints[i];
            updateGPoint = pointsList.getById(curGPoint.id);

            if (updateGPoint) {
                // Already tracking the pointer. If captured then update it, else stop tracking it
                if (updateGPoint.captured) {
                    updateGPoint.insideElement = false;
                    updateGPoint.lastPos = updateGPoint.currentPos;
                    updateGPoint.lastTime = updateGPoint.currentTime;
                    updateGPoint.currentPos = curGPoint.currentPos;
                    updateGPoint.currentTime = curGPoint.currentTime;
                } else {
                    stopTrackingPointer(pointsList, updateGPoint);
                }

                curGPoint = updateGPoint;
            }

            // Exit
            if (tracker.exitHandler) {
                propagate = tracker.exitHandler({
                    eventSource: tracker,
                    pointerType: curGPoint.type,
                    position: getPointRelativeToAbsolute(curGPoint.currentPos, tracker.element),
                    buttons: pointsList.buttons,
                    pointers: tracker.getActivePointerCount(),
                    insideElementPressed: updateGPoint ? updateGPoint.insideElementPressed : false,
                    buttonDownAny: pointsList.buttons !== 0,
                    isTouchEvent: curGPoint.type === 'touch',
                    originalEvent: event,
                    preventDefaultAction: false,
                    userData: tracker.userData
                });

                if (propagate === false) {
                    $.cancelEvent(event);
                }
            }
        }
    }

    /**
     * @function
     * @private
     * @inner
     * @param {OpenSeadragon.MouseTracker} tracker
     *     A reference to the MouseTracker instance.
     * @param {Object} event
     *     A reference to the originating DOM event.
     * @param {Array.<OpenSeadragon.MouseTracker.GesturePoint>} gPoints
     *      Gesture points associated with the event.
     * @param {Number} buttonChanged
     *      The button involved in the event: -1: none, 0: primary/left, 1: aux/middle, 2: secondary/right, 3: X1/back, 4: X2/forward, 5: pen eraser.
     *      Note on chorded button presses (a button pressed when another button is already pressed): In the W3C Pointer Events model,
     *      only one pointerdown/pointerup event combo is fired. Chorded button state changes instead fire pointermove events.
     *
     * @returns {Boolean} True if pointers should be captured to the tracked element, otherwise false.
     */
    function updatePointersDown(tracker, event, gPoints, buttonChanged) {
        var delegate = THIS[tracker.hash],
            propagate,
            pointsList = tracker.getActivePointersListByType(gPoints[0].type),
            i,
            gPointCount = gPoints.length,
            curGPoint,
            updateGPoint;

        if (typeof event.buttons !== 'undefined') {
            pointsList.buttons = event.buttons;
        } else {
            if ($.Browser.vendor === $.BROWSERS.IE && $.Browser.version < 9) {
                if (buttonChanged === 0) {
                    // Primary
                    pointsList.buttons += 1;
                } else if (buttonChanged === 1) {
                    // Aux
                    pointsList.buttons += 4;
                } else if (buttonChanged === 2) {
                    // Secondary
                    pointsList.buttons += 2;
                } else if (buttonChanged === 3) {
                    // X1 (Back)
                    pointsList.buttons += 8;
                } else if (buttonChanged === 4) {
                    // X2 (Forward)
                    pointsList.buttons += 16;
                } else if (buttonChanged === 5) {
                    // Pen Eraser
                    pointsList.buttons += 32;
                }
            } else {
                if (buttonChanged === 0) {
                    // Primary
                    pointsList.buttons |= 1;
                } else if (buttonChanged === 1) {
                    // Aux
                    pointsList.buttons |= 4;
                } else if (buttonChanged === 2) {
                    // Secondary
                    pointsList.buttons |= 2;
                } else if (buttonChanged === 3) {
                    // X1 (Back)
                    pointsList.buttons |= 8;
                } else if (buttonChanged === 4) {
                    // X2 (Forward)
                    pointsList.buttons |= 16;
                } else if (buttonChanged === 5) {
                    // Pen Eraser
                    pointsList.buttons |= 32;
                }
            }
        }

        // Only capture and track primary button, pen, and touch contacts
        if (buttonChanged !== 0) {
            // Aux Press
            if (tracker.nonPrimaryPressHandler) {
                propagate = tracker.nonPrimaryPressHandler({
                    eventSource: tracker,
                    pointerType: gPoints[0].type,
                    position: getPointRelativeToAbsolute(gPoints[0].currentPos, tracker.element),
                    button: buttonChanged,
                    buttons: pointsList.buttons,
                    isTouchEvent: gPoints[0].type === 'touch',
                    originalEvent: event,
                    preventDefaultAction: false,
                    userData: tracker.userData
                });
                if (propagate === false) {
                    $.cancelEvent(event);
                }
            }

            return false;
        }

        for (i = 0; i < gPointCount; i++) {
            curGPoint = gPoints[i];
            updateGPoint = pointsList.getById(curGPoint.id);

            if (updateGPoint) {
                // Already tracking the pointer...update it
                updateGPoint.captured = true;
                updateGPoint.insideElementPressed = true;
                updateGPoint.insideElement = true;
                updateGPoint.contactPos = curGPoint.currentPos;
                updateGPoint.contactTime = curGPoint.currentTime;
                updateGPoint.lastPos = updateGPoint.currentPos;
                updateGPoint.lastTime = updateGPoint.currentTime;
                updateGPoint.currentPos = curGPoint.currentPos;
                updateGPoint.currentTime = curGPoint.currentTime;

                curGPoint = updateGPoint;
            } else {
                // Initialize for tracking and add to the tracking list (no pointerover or pointermove event occurred before this)
                curGPoint.captured = true;
                curGPoint.insideElementPressed = true;
                curGPoint.insideElement = true;
                startTrackingPointer(pointsList, curGPoint);
            }

            pointsList.contacts++;
            //$.console.log('contacts++ ', pointsList.contacts);

            if (tracker.dragHandler || tracker.dragEndHandler || tracker.pinchHandler) {
                $.MouseTracker.gesturePointVelocityTracker.addPoint(tracker, curGPoint);
            }

            if (pointsList.contacts === 1) {
                // Press
                if (tracker.pressHandler) {
                    propagate = tracker.pressHandler({
                        eventSource: tracker,
                        pointerType: curGPoint.type,
                        position: getPointRelativeToAbsolute(curGPoint.contactPos, tracker.element),
                        buttons: pointsList.buttons,
                        isTouchEvent: curGPoint.type === 'touch',
                        originalEvent: event,
                        preventDefaultAction: false,
                        userData: tracker.userData
                    });
                    if (propagate === false) {
                        $.cancelEvent(event);
                    }
                }
            } else if (pointsList.contacts === 2) {
                if (tracker.pinchHandler && curGPoint.type === 'touch') {
                    // Initialize for pinch
                    delegate.pinchGPoints = pointsList.asArray();
                    delegate.lastPinchDist = delegate.currentPinchDist = delegate.pinchGPoints[0].currentPos.distanceTo(delegate.pinchGPoints[1].currentPos);
                    delegate.lastPinchCenter = delegate.currentPinchCenter = getCenterPoint(delegate.pinchGPoints[0].currentPos, delegate.pinchGPoints[1].currentPos);
                }
            }
        }

        return true;
    }

    /**
     * @function
     * @private
     * @inner
     * @param {OpenSeadragon.MouseTracker} tracker
     *     A reference to the MouseTracker instance.
     * @param {Object} event
     *     A reference to the originating DOM event.
     * @param {Array.<OpenSeadragon.MouseTracker.GesturePoint>} gPoints
     *      Gesture points associated with the event.
     * @param {Number} buttonChanged
     *      The button involved in the event: -1: none, 0: primary/left, 1: aux/middle, 2: secondary/right, 3: X1/back, 4: X2/forward, 5: pen eraser.
     *      Note on chorded button presses (a button pressed when another button is already pressed): In the W3C Pointer Events model,
     *      only one pointerdown/pointerup event combo is fired. Chorded button state changes instead fire pointermove events.
     *
     * @returns {Boolean} True if pointer capture should be released from the tracked element, otherwise false.
     */
    function updatePointersUp(tracker, event, gPoints, buttonChanged) {
        var delegate = THIS[tracker.hash],
            pointsList = tracker.getActivePointersListByType(gPoints[0].type),
            propagate,
            insideElementReleased,
            releasePoint,
            releaseTime,
            i,
            gPointCount = gPoints.length,
            curGPoint,
            updateGPoint,
            releaseCapture = false,
            wasCaptured = false,
            quick;

        if (typeof event.buttons !== 'undefined') {
            pointsList.buttons = event.buttons;
        } else {
            if ($.Browser.vendor === $.BROWSERS.IE && $.Browser.version < 9) {
                if (buttonChanged === 0) {
                    // Primary
                    pointsList.buttons -= 1;
                } else if (buttonChanged === 1) {
                    // Aux
                    pointsList.buttons -= 4;
                } else if (buttonChanged === 2) {
                    // Secondary
                    pointsList.buttons -= 2;
                } else if (buttonChanged === 3) {
                    // X1 (Back)
                    pointsList.buttons -= 8;
                } else if (buttonChanged === 4) {
                    // X2 (Forward)
                    pointsList.buttons -= 16;
                } else if (buttonChanged === 5) {
                    // Pen Eraser
                    pointsList.buttons -= 32;
                }
            } else {
                if (buttonChanged === 0) {
                    // Primary
                    pointsList.buttons ^= ~1;
                } else if (buttonChanged === 1) {
                    // Aux
                    pointsList.buttons ^= ~4;
                } else if (buttonChanged === 2) {
                    // Secondary
                    pointsList.buttons ^= ~2;
                } else if (buttonChanged === 3) {
                    // X1 (Back)
                    pointsList.buttons ^= ~8;
                } else if (buttonChanged === 4) {
                    // X2 (Forward)
                    pointsList.buttons ^= ~16;
                } else if (buttonChanged === 5) {
                    // Pen Eraser
                    pointsList.buttons ^= ~32;
                }
            }
        }

        // Only capture and track primary button, pen, and touch contacts
        if (buttonChanged !== 0) {
            // Aux Release
            if (tracker.nonPrimaryReleaseHandler) {
                propagate = tracker.nonPrimaryReleaseHandler({
                    eventSource: tracker,
                    pointerType: gPoints[0].type,
                    position: getPointRelativeToAbsolute(gPoints[0].currentPos, tracker.element),
                    button: buttonChanged,
                    buttons: pointsList.buttons,
                    isTouchEvent: gPoints[0].type === 'touch',
                    originalEvent: event,
                    preventDefaultAction: false,
                    userData: tracker.userData
                });
                if (propagate === false) {
                    $.cancelEvent(event);
                }
            }

            return false;
        }

        for (i = 0; i < gPointCount; i++) {
            curGPoint = gPoints[i];
            updateGPoint = pointsList.getById(curGPoint.id);

            if (updateGPoint) {
                // Update the pointer, stop tracking it if not still in this element
                if (updateGPoint.captured) {
                    updateGPoint.captured = false;
                    releaseCapture = true;
                    wasCaptured = true;
                }
                updateGPoint.lastPos = updateGPoint.currentPos;
                updateGPoint.lastTime = updateGPoint.currentTime;
                updateGPoint.currentPos = curGPoint.currentPos;
                updateGPoint.currentTime = curGPoint.currentTime;
                if (!updateGPoint.insideElement) {
                    stopTrackingPointer(pointsList, updateGPoint);
                }

                releasePoint = updateGPoint.currentPos;
                releaseTime = updateGPoint.currentTime;

                if (wasCaptured) {
                    // Pointer was activated in our element but could have been removed in any element since events are captured to our element

                    pointsList.contacts--;
                    //$.console.log('contacts-- ', pointsList.contacts);

                    if (tracker.dragHandler || tracker.dragEndHandler || tracker.pinchHandler) {
                        $.MouseTracker.gesturePointVelocityTracker.removePoint(tracker, updateGPoint);
                    }

                    if (pointsList.contacts === 0) {

                        // Release (pressed in our element)
                        if (tracker.releaseHandler) {
                            propagate = tracker.releaseHandler({
                                eventSource: tracker,
                                pointerType: updateGPoint.type,
                                position: getPointRelativeToAbsolute(releasePoint, tracker.element),
                                buttons: pointsList.buttons,
                                insideElementPressed: updateGPoint.insideElementPressed,
                                insideElementReleased: updateGPoint.insideElement,
                                isTouchEvent: updateGPoint.type === 'touch',
                                originalEvent: event,
                                preventDefaultAction: false,
                                userData: tracker.userData
                            });
                            if (propagate === false) {
                                $.cancelEvent(event);
                            }
                        }

                        // Drag End
                        if (tracker.dragEndHandler && !updateGPoint.currentPos.equals(updateGPoint.contactPos)) {
                            propagate = tracker.dragEndHandler({
                                eventSource: tracker,
                                pointerType: updateGPoint.type,
                                position: getPointRelativeToAbsolute(updateGPoint.currentPos, tracker.element),
                                speed: updateGPoint.speed,
                                direction: updateGPoint.direction,
                                shift: event.shiftKey,
                                isTouchEvent: updateGPoint.type === 'touch',
                                originalEvent: event,
                                preventDefaultAction: false,
                                userData: tracker.userData
                            });
                            if (propagate === false) {
                                $.cancelEvent(event);
                            }
                        }

                        // Click / Double-Click
                        if ((tracker.clickHandler || tracker.dblClickHandler) && updateGPoint.insideElement) {
                            quick = releaseTime - updateGPoint.contactTime <= tracker.clickTimeThreshold && updateGPoint.contactPos.distanceTo(releasePoint) <= tracker.clickDistThreshold;

                            // Click
                            if (tracker.clickHandler) {
                                propagate = tracker.clickHandler({
                                    eventSource: tracker,
                                    pointerType: updateGPoint.type,
                                    position: getPointRelativeToAbsolute(updateGPoint.currentPos, tracker.element),
                                    quick: quick,
                                    shift: event.shiftKey,
                                    isTouchEvent: updateGPoint.type === 'touch',
                                    originalEvent: event,
                                    preventDefaultAction: false,
                                    userData: tracker.userData
                                });
                                if (propagate === false) {
                                    $.cancelEvent(event);
                                }
                            }

                            // Double-Click
                            if (tracker.dblClickHandler && quick) {
                                pointsList.clicks++;
                                if (pointsList.clicks === 1) {
                                    delegate.lastClickPos = releasePoint;
                                    /*jshint loopfunc:true*/
                                    delegate.dblClickTimeOut = setTimeout(function () {
                                        pointsList.clicks = 0;
                                    }, tracker.dblClickTimeThreshold);
                                    /*jshint loopfunc:false*/
                                } else if (pointsList.clicks === 2) {
                                        clearTimeout(delegate.dblClickTimeOut);
                                        pointsList.clicks = 0;
                                        if (delegate.lastClickPos.distanceTo(releasePoint) <= tracker.dblClickDistThreshold) {
                                            propagate = tracker.dblClickHandler({
                                                eventSource: tracker,
                                                pointerType: updateGPoint.type,
                                                position: getPointRelativeToAbsolute(updateGPoint.currentPos, tracker.element),
                                                shift: event.shiftKey,
                                                isTouchEvent: updateGPoint.type === 'touch',
                                                originalEvent: event,
                                                preventDefaultAction: false,
                                                userData: tracker.userData
                                            });
                                            if (propagate === false) {
                                                $.cancelEvent(event);
                                            }
                                        }
                                        delegate.lastClickPos = null;
                                    }
                            }
                        }
                    } else if (pointsList.contacts === 2) {
                        if (tracker.pinchHandler && updateGPoint.type === 'touch') {
                            // Reset for pinch
                            delegate.pinchGPoints = pointsList.asArray();
                            delegate.lastPinchDist = delegate.currentPinchDist = delegate.pinchGPoints[0].currentPos.distanceTo(delegate.pinchGPoints[1].currentPos);
                            delegate.lastPinchCenter = delegate.currentPinchCenter = getCenterPoint(delegate.pinchGPoints[0].currentPos, delegate.pinchGPoints[1].currentPos);
                        }
                    }
                } else {
                    // Pointer was activated in another element but removed in our element

                    // Release (pressed in another element)
                    if (tracker.releaseHandler) {
                        propagate = tracker.releaseHandler({
                            eventSource: tracker,
                            pointerType: updateGPoint.type,
                            position: getPointRelativeToAbsolute(releasePoint, tracker.element),
                            buttons: pointsList.buttons,
                            insideElementPressed: updateGPoint.insideElementPressed,
                            insideElementReleased: updateGPoint.insideElement,
                            isTouchEvent: updateGPoint.type === 'touch',
                            originalEvent: event,
                            preventDefaultAction: false,
                            userData: tracker.userData
                        });
                        if (propagate === false) {
                            $.cancelEvent(event);
                        }
                    }
                }
            }
        }

        return releaseCapture;
    }

    /**
     * Call when pointer(s) change coordinates, button state, pressure, tilt, or contact geometry (e.g. width and height)
     *
     * @function
     * @private
     * @inner
     * @param {OpenSeadragon.MouseTracker} tracker
     *     A reference to the MouseTracker instance.
     * @param {Object} event
     *     A reference to the originating DOM event.
     * @param {Array.<OpenSeadragon.MouseTracker.GesturePoint>} gPoints
     *      Gesture points associated with the event.
     */
    function updatePointersMove(tracker, event, gPoints) {
        var delegate = THIS[tracker.hash],
            pointsList = tracker.getActivePointersListByType(gPoints[0].type),
            i,
            gPointCount = gPoints.length,
            curGPoint,
            updateGPoint,
            gPointArray,
            delta,
            propagate;

        if (typeof event.buttons !== 'undefined') {
            pointsList.buttons = event.buttons;
        }

        for (i = 0; i < gPointCount; i++) {
            curGPoint = gPoints[i];
            updateGPoint = pointsList.getById(curGPoint.id);

            if (updateGPoint) {
                // Already tracking the pointer...update it
                if (curGPoint.hasOwnProperty('isPrimary')) {
                    updateGPoint.isPrimary = curGPoint.isPrimary;
                }
                updateGPoint.lastPos = updateGPoint.currentPos;
                updateGPoint.lastTime = updateGPoint.currentTime;
                updateGPoint.currentPos = curGPoint.currentPos;
                updateGPoint.currentTime = curGPoint.currentTime;
            } else {
                // Initialize for tracking and add to the tracking list (no pointerover or pointerdown event occurred before this)
                curGPoint.captured = false;
                curGPoint.insideElementPressed = false;
                curGPoint.insideElement = true;
                startTrackingPointer(pointsList, curGPoint);
            }
        }

        // Stop (mouse only)
        if (tracker.stopHandler && gPoints[0].type === 'mouse') {
            clearTimeout(tracker.stopTimeOut);
            tracker.stopTimeOut = setTimeout(function () {
                handlePointerStop(tracker, event, gPoints[0].type);
            }, tracker.stopDelay);
        }

        if (pointsList.contacts === 0) {
            // Move (no contacts: hovering mouse or other hover-capable device)
            if (tracker.moveHandler) {
                propagate = tracker.moveHandler({
                    eventSource: tracker,
                    pointerType: gPoints[0].type,
                    position: getPointRelativeToAbsolute(gPoints[0].currentPos, tracker.element),
                    buttons: pointsList.buttons,
                    isTouchEvent: gPoints[0].type === 'touch',
                    originalEvent: event,
                    preventDefaultAction: false,
                    userData: tracker.userData
                });
                if (propagate === false) {
                    $.cancelEvent(event);
                }
            }
        } else if (pointsList.contacts === 1) {
            // Move (1 contact)
            if (tracker.moveHandler) {
                updateGPoint = pointsList.asArray()[0];
                propagate = tracker.moveHandler({
                    eventSource: tracker,
                    pointerType: updateGPoint.type,
                    position: getPointRelativeToAbsolute(updateGPoint.currentPos, tracker.element),
                    buttons: pointsList.buttons,
                    isTouchEvent: updateGPoint.type === 'touch',
                    originalEvent: event,
                    preventDefaultAction: false,
                    userData: tracker.userData
                });
                if (propagate === false) {
                    $.cancelEvent(event);
                }
            }

            // Drag
            if (tracker.dragHandler) {
                updateGPoint = pointsList.asArray()[0];
                delta = updateGPoint.currentPos.minus(updateGPoint.lastPos);
                propagate = tracker.dragHandler({
                    eventSource: tracker,
                    pointerType: updateGPoint.type,
                    position: getPointRelativeToAbsolute(updateGPoint.currentPos, tracker.element),
                    buttons: pointsList.buttons,
                    delta: delta,
                    speed: updateGPoint.speed,
                    direction: updateGPoint.direction,
                    shift: event.shiftKey,
                    isTouchEvent: updateGPoint.type === 'touch',
                    originalEvent: event,
                    preventDefaultAction: false,
                    userData: tracker.userData
                });
                if (propagate === false) {
                    $.cancelEvent(event);
                }
            }
        } else if (pointsList.contacts === 2) {
            // Move (2 contacts, use center)
            if (tracker.moveHandler) {
                gPointArray = pointsList.asArray();
                propagate = tracker.moveHandler({
                    eventSource: tracker,
                    pointerType: gPointArray[0].type,
                    position: getPointRelativeToAbsolute(getCenterPoint(gPointArray[0].currentPos, gPointArray[1].currentPos), tracker.element),
                    buttons: pointsList.buttons,
                    isTouchEvent: gPointArray[0].type === 'touch',
                    originalEvent: event,
                    preventDefaultAction: false,
                    userData: tracker.userData
                });
                if (propagate === false) {
                    $.cancelEvent(event);
                }
            }

            // Pinch
            if (tracker.pinchHandler && gPoints[0].type === 'touch') {
                delta = delegate.pinchGPoints[0].currentPos.distanceTo(delegate.pinchGPoints[1].currentPos);
                if (delta != delegate.currentPinchDist) {
                    delegate.lastPinchDist = delegate.currentPinchDist;
                    delegate.currentPinchDist = delta;
                    delegate.lastPinchCenter = delegate.currentPinchCenter;
                    delegate.currentPinchCenter = getCenterPoint(delegate.pinchGPoints[0].currentPos, delegate.pinchGPoints[1].currentPos);
                    propagate = tracker.pinchHandler({
                        eventSource: tracker,
                        pointerType: 'touch',
                        gesturePoints: delegate.pinchGPoints,
                        lastCenter: getPointRelativeToAbsolute(delegate.lastPinchCenter, tracker.element),
                        center: getPointRelativeToAbsolute(delegate.currentPinchCenter, tracker.element),
                        lastDistance: delegate.lastPinchDist,
                        distance: delegate.currentPinchDist,
                        shift: event.shiftKey,
                        originalEvent: event,
                        preventDefaultAction: false,
                        userData: tracker.userData
                    });
                    if (propagate === false) {
                        $.cancelEvent(event);
                    }
                }
            }
        }
    }

    /**
     * @function
     * @private
     * @inner
     * @param {OpenSeadragon.MouseTracker} tracker
     *     A reference to the MouseTracker instance.
     * @param {Object} event
     *     A reference to the originating DOM event.
     * @param {Array.<OpenSeadragon.MouseTracker.GesturePoint>} gPoints
     *      Gesture points associated with the event.
     */
    function updatePointersCancel(tracker, event, gPoints) {
        updatePointersUp(tracker, event, gPoints, 0);
        updatePointersExit(tracker, event, gPoints);
    }

    /**
     * @private
     * @inner
     */
    function handlePointerStop(tracker, originalMoveEvent, pointerType) {
        if (tracker.stopHandler) {
            tracker.stopHandler({
                eventSource: tracker,
                pointerType: pointerType,
                position: getMouseRelative(originalMoveEvent, tracker.element),
                buttons: tracker.getActivePointersListByType(pointerType).buttons,
                isTouchEvent: pointerType === 'touch',
                originalEvent: originalMoveEvent,
                preventDefaultAction: false,
                userData: tracker.userData
            });
        }
    }
})(OpenSeadragon);

/*
 * OpenSeadragon - Control
 *
 * Copyright (C) 2009 CodePlex Foundation
 * Copyright (C) 2010-2013 OpenSeadragon contributors
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 * - Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 *
 * - Neither the name of CodePlex Foundation nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

(function ($) {

    /**
     * An enumeration of supported locations where controls can be anchored.
     * The anchoring is always relative to the container.
     * @member ControlAnchor
     * @memberof OpenSeadragon
     * @static
     * @type {Object}
     * @property {Number} NONE
     * @property {Number} TOP_LEFT
     * @property {Number} TOP_RIGHT
     * @property {Number} BOTTOM_LEFT
     * @property {Number} BOTTOM_RIGHT
     * @property {Number} ABSOLUTE
     */
    $.ControlAnchor = {
        NONE: 0,
        TOP_LEFT: 1,
        TOP_RIGHT: 2,
        BOTTOM_RIGHT: 3,
        BOTTOM_LEFT: 4,
        ABSOLUTE: 5
    };

    /**
     * @class Control
     * @classdesc A Control represents any interface element which is meant to allow the user
     * to interact with the zoomable interface. Any control can be anchored to any
     * element.
     *
     * @memberof OpenSeadragon
     * @param {Element} element - the control element to be anchored in the container.
     * @param {Object } options - All required and optional settings for configuring a control element.
     * @param {OpenSeadragon.ControlAnchor} [options.anchor=OpenSeadragon.ControlAnchor.NONE] - the position of the control
     *  relative to the container.
     * @param {Boolean} [options.attachToViewer=true] - Whether the control should be added directly to the viewer, or
     *  directly to the container
     * @param {Boolean} [options.autoFade=true] - Whether the control should have the autofade behavior
     * @param {Element} container - the element to control will be anchored too.
     */
    $.Control = function (element, options, container) {
        var parent = element.parentNode;
        if (typeof options === 'number') {
            $.console.error("Passing an anchor directly into the OpenSeadragon.Control constructor is deprecated; " + "please use an options object instead.  " + "Support for this deprecated variant is scheduled for removal in December 2013");
            options = { anchor: options };
        }
        options.attachToViewer = typeof options.attachToViewer === 'undefined' ? true : options.attachToViewer;
        /**
         * True if the control should have autofade behavior.
         * @member {Boolean} autoFade
         * @memberof OpenSeadragon.Control#
         */
        this.autoFade = typeof options.autoFade === 'undefined' ? true : options.autoFade;
        /**
         * The element providing the user interface with some type of control (e.g. a zoom-in button).
         * @member {Element} element
         * @memberof OpenSeadragon.Control#
         */
        this.element = element;
        /**
         * The position of the Control relative to its container.
         * @member {OpenSeadragon.ControlAnchor} anchor
         * @memberof OpenSeadragon.Control#
         */
        this.anchor = options.anchor;
        /**
         * The Control's containing element.
         * @member {Element} container
         * @memberof OpenSeadragon.Control#
         */
        this.container = container;
        /**
         * A neutral element surrounding the control element.
         * @member {Element} wrapper
         * @memberof OpenSeadragon.Control#
         */
        if (this.anchor == $.ControlAnchor.ABSOLUTE) {
            this.wrapper = $.makeNeutralElement("div");
            this.wrapper.style.position = "absolute";
            this.wrapper.style.top = typeof options.top == "number" ? options.top + 'px' : options.top;
            this.wrapper.style.left = typeof options.left == "number" ? options.left + 'px' : options.left;
            this.wrapper.style.height = typeof options.height == "number" ? options.height + 'px' : options.height;
            this.wrapper.style.width = typeof options.width == "number" ? options.width + 'px' : options.width;
            this.wrapper.style.margin = "0px";
            this.wrapper.style.padding = "0px";

            this.element.style.position = "relative";
            this.element.style.top = "0px";
            this.element.style.left = "0px";
            this.element.style.height = "100%";
            this.element.style.width = "100%";
        } else {
            this.wrapper = $.makeNeutralElement("div");
            this.wrapper.style.display = "inline-block";
            if (this.anchor == $.ControlAnchor.NONE) {
                // IE6 fix
                this.wrapper.style.width = this.wrapper.style.height = "100%";
            }
        }
        this.wrapper.appendChild(this.element);

        if (options.attachToViewer) {
            if (this.anchor == $.ControlAnchor.TOP_RIGHT || this.anchor == $.ControlAnchor.BOTTOM_RIGHT) {
                this.container.insertBefore(this.wrapper, this.container.firstChild);
            } else {
                this.container.appendChild(this.wrapper);
            }
        } else {
            parent.appendChild(this.wrapper);
        }
    };

    $.Control.prototype = /** @lends OpenSeadragon.Control.prototype */{

        /**
         * Removes the control from the container.
         * @function
         */
        destroy: function destroy() {
            this.wrapper.removeChild(this.element);
            this.container.removeChild(this.wrapper);
        },

        /**
         * Determines if the control is currently visible.
         * @function
         * @return {Boolean} true if currenly visible, false otherwise.
         */
        isVisible: function isVisible() {
            return this.wrapper.style.display != "none";
        },

        /**
         * Toggles the visibility of the control.
         * @function
         * @param {Boolean} visible - true to make visible, false to hide.
         */
        setVisible: function setVisible(visible) {
            this.wrapper.style.display = visible ? this.anchor == $.ControlAnchor.ABSOLUTE ? 'block' : 'inline-block' : "none";
        },

        /**
         * Sets the opacity level for the control.
         * @function
         * @param {Number} opactiy - a value between 1 and 0 inclusively.
         */
        setOpacity: function setOpacity(opacity) {
            if (this.element[$.SIGNAL] && $.Browser.vendor == $.BROWSERS.IE) {
                $.setElementOpacity(this.element, opacity, true);
            } else {
                $.setElementOpacity(this.wrapper, opacity, true);
            }
        }
    };
})(OpenSeadragon);

/*
 * OpenSeadragon - ControlDock
 *
 * Copyright (C) 2009 CodePlex Foundation
 * Copyright (C) 2010-2013 OpenSeadragon contributors
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 * - Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 *
 * - Neither the name of CodePlex Foundation nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

(function ($) {
    /**
     * @class ControlDock
     * @classdesc Provides a container element (a &lt;form&gt; element) with support for the layout of control elements.
     *
     * @memberof OpenSeadragon
     */
    $.ControlDock = function (options) {
        var layouts = ['topleft', 'topright', 'bottomright', 'bottomleft'],
            layout,
            i;

        $.extend(true, this, {
            id: 'controldock-' + $.now() + '-' + Math.floor(Math.random() * 1000000),
            container: $.makeNeutralElement('div'),
            controls: []
        }, options);

        // Disable the form's submit; otherwise button clicks and return keys
        // can trigger it.
        this.container.onsubmit = function () {
            return false;
        };

        if (this.element) {
            this.element = $.getElement(this.element);
            this.element.appendChild(this.container);
            this.element.style.position = 'relative';
            this.container.style.width = '100%';
            this.container.style.height = '100%';
        }

        for (i = 0; i < layouts.length; i++) {
            layout = layouts[i];
            this.controls[layout] = $.makeNeutralElement("div");
            this.controls[layout].style.position = 'absolute';
            if (layout.match('left')) {
                this.controls[layout].style.left = '0px';
            }
            if (layout.match('right')) {
                this.controls[layout].style.right = '0px';
            }
            if (layout.match('top')) {
                this.controls[layout].style.top = '0px';
            }
            if (layout.match('bottom')) {
                this.controls[layout].style.bottom = '0px';
            }
        }

        this.container.appendChild(this.controls.topleft);
        this.container.appendChild(this.controls.topright);
        this.container.appendChild(this.controls.bottomright);
        this.container.appendChild(this.controls.bottomleft);
    };

    $.ControlDock.prototype = /** @lends OpenSeadragon.ControlDock.prototype */{

        /**
         * @function
         */
        addControl: function addControl(element, controlOptions) {
            element = $.getElement(element);
            var div = null;

            if (getControlIndex(this, element) >= 0) {
                return; // they're trying to add a duplicate control
            }

            switch (controlOptions.anchor) {
                case $.ControlAnchor.TOP_RIGHT:
                    div = this.controls.topright;
                    element.style.position = "relative";
                    element.style.paddingRight = "0px";
                    element.style.paddingTop = "0px";
                    break;
                case $.ControlAnchor.BOTTOM_RIGHT:
                    div = this.controls.bottomright;
                    element.style.position = "relative";
                    element.style.paddingRight = "0px";
                    element.style.paddingBottom = "0px";
                    break;
                case $.ControlAnchor.BOTTOM_LEFT:
                    div = this.controls.bottomleft;
                    element.style.position = "relative";
                    element.style.paddingLeft = "0px";
                    element.style.paddingBottom = "0px";
                    break;
                case $.ControlAnchor.TOP_LEFT:
                    div = this.controls.topleft;
                    element.style.position = "relative";
                    element.style.paddingLeft = "0px";
                    element.style.paddingTop = "0px";
                    break;
                case $.ControlAnchor.ABSOLUTE:
                    div = this.container;
                    element.style.margin = "0px";
                    element.style.padding = "0px";
                    break;
                default:
                case $.ControlAnchor.NONE:
                    div = this.container;
                    element.style.margin = "0px";
                    element.style.padding = "0px";
                    break;
            }

            this.controls.push(new $.Control(element, controlOptions, div));
            element.style.display = "inline-block";
        },

        /**
         * @function
         * @return {OpenSeadragon.ControlDock} Chainable.
         */
        removeControl: function removeControl(element) {
            element = $.getElement(element);
            var i = getControlIndex(this, element);

            if (i >= 0) {
                this.controls[i].destroy();
                this.controls.splice(i, 1);
            }

            return this;
        },

        /**
         * @function
         * @return {OpenSeadragon.ControlDock} Chainable.
         */
        clearControls: function clearControls() {
            while (this.controls.length > 0) {
                this.controls.pop().destroy();
            }

            return this;
        },

        /**
         * @function
         * @return {Boolean}
         */
        areControlsEnabled: function areControlsEnabled() {
            var i;

            for (i = this.controls.length - 1; i >= 0; i--) {
                if (this.controls[i].isVisible()) {
                    return true;
                }
            }

            return false;
        },

        /**
         * @function
         * @return {OpenSeadragon.ControlDock} Chainable.
         */
        setControlsEnabled: function setControlsEnabled(enabled) {
            var i;

            for (i = this.controls.length - 1; i >= 0; i--) {
                this.controls[i].setVisible(enabled);
            }

            return this;
        }

    };

    ///////////////////////////////////////////////////////////////////////////////
    // Utility methods
    ///////////////////////////////////////////////////////////////////////////////
    function getControlIndex(dock, element) {
        var controls = dock.controls,
            i;

        for (i = controls.length - 1; i >= 0; i--) {
            if (controls[i].element == element) {
                return i;
            }
        }

        return -1;
    }
})(OpenSeadragon);

/*
 * OpenSeadragon - Viewer
 *
 * Copyright (C) 2009 CodePlex Foundation
 * Copyright (C) 2010-2013 OpenSeadragon contributors
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 * - Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 *
 * - Neither the name of CodePlex Foundation nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

(function ($) {

    // dictionary from hash to private properties
    var THIS = {};
    var nextHash = 1;

    /**
     *
     * The main point of entry into creating a zoomable image on the page.
     *
     * We have provided an idiomatic javascript constructor which takes
     * a single object, but still support the legacy positional arguments.
     *
     * The options below are given in order that they appeared in the constructor
     * as arguments and we translate a positional call into an idiomatic call.
     *
     * @class Viewer
     * @classdesc The main OpenSeadragon viewer class.
     *
     * @memberof OpenSeadragon
     * @extends OpenSeadragon.EventSource
     * @extends OpenSeadragon.ControlDock
     * @param {OpenSeadragon.Options} options - Viewer options.
     *
     **/
    $.Viewer = function (options) {

        var args = arguments,
            _this = this,
            i;

        //backward compatibility for positional args while prefering more
        //idiomatic javascript options object as the only argument
        if (!$.isPlainObject(options)) {
            options = {
                id: args[0],
                xmlPath: args.length > 1 ? args[1] : undefined,
                prefixUrl: args.length > 2 ? args[2] : undefined,
                controls: args.length > 3 ? args[3] : undefined,
                overlays: args.length > 4 ? args[4] : undefined
            };
        }

        //options.config and the general config argument are deprecated
        //in favor of the more direct specification of optional settings
        //being pass directly on the options object
        if (options.config) {
            $.extend(true, options, options.config);
            delete options.config;
        }

        //Public properties
        //Allow the options object to override global defaults
        $.extend(true, this, {

            //internal state and dom identifiers
            id: options.id,
            hash: options.hash || nextHash++,

            //dom nodes
            /**
             * The parent element of this Viewer instance, passed in when the Viewer was created.
             * @member {Element} element
             * @memberof OpenSeadragon.Viewer#
             */
            element: null,
            /**
             * A &lt;div&gt; element (provided by {@link OpenSeadragon.ControlDock}), the base element of this Viewer instance.<br><br>
             * Child element of {@link OpenSeadragon.Viewer#element}.
             * @member {Element} container
             * @memberof OpenSeadragon.Viewer#
             */
            container: null,
            /**
             * A &lt;div&gt; element, the element where user-input events are handled for panning and zooming.<br><br>
             * Child element of {@link OpenSeadragon.Viewer#container},
             * positioned on top of {@link OpenSeadragon.Viewer#keyboardCommandArea}.<br><br>
             * The parent of {@link OpenSeadragon.Drawer#canvas} instances.
             * @member {Element} canvas
             * @memberof OpenSeadragon.Viewer#
             */
            canvas: null,

            // Overlays list. An overlay allows to add html on top of the viewer.
            overlays: [],
            // Container inside the canvas where overlays are drawn.
            overlaysContainer: null,

            //private state properties
            previousBody: [],

            //This was originally initialized in the constructor and so could never
            //have anything in it.  now it can because we allow it to be specified
            //in the options and is only empty by default if not specified. Also
            //this array was returned from get_controls which I find confusing
            //since this object has a controls property which is treated in other
            //functions like clearControls.  I'm removing the accessors.
            customControls: [],

            //These are originally not part options but declared as members
            //in initialize.  It's still considered idiomatic to put them here
            source: null,
            /**
             * Handles rendering of tiles in the viewer. Created for each TileSource opened.
             * @member {OpenSeadragon.Drawer} drawer
             * @memberof OpenSeadragon.Viewer#
             */
            drawer: null,
            world: null,
            /**
             * Handles coordinate-related functionality - zoom, pan, rotation, etc. Created for each TileSource opened.
             * @member {OpenSeadragon.Viewport} viewport
             * @memberof OpenSeadragon.Viewer#
             */
            viewport: null,
            /**
             * @member {OpenSeadragon.Navigator} navigator
             * @memberof OpenSeadragon.Viewer#
             */
            navigator: null,

            //A collection viewport is a separate viewport used to provide
            //simultaneous rendering of sets of tiles
            collectionViewport: null,
            collectionDrawer: null,

            //UI image resources
            //TODO: rename navImages to uiImages
            navImages: null,

            //interface button controls
            buttons: null,

            //TODO: this is defunct so safely remove it
            profiler: null

        }, $.DEFAULT_SETTINGS, options);

        if (typeof this.hash === "undefined") {
            throw new Error("A hash must be defined, either by specifying options.id or options.hash.");
        }
        if (typeof THIS[this.hash] !== "undefined") {
            // We don't want to throw an error here, as the user might have discarded
            // the previous viewer with the same hash and now want to recreate it.
            $.console.warn("Hash " + this.hash + " has already been used.");
        }

        //Private state properties
        THIS[this.hash] = {
            "fsBoundsDelta": new $.Point(1, 1),
            "prevContainerSize": null,
            "animating": false,
            "forceRedraw": false,
            "mouseInside": false,
            "group": null,
            // whether we should be continuously zooming
            "zooming": false,
            // how much we should be continuously zooming by
            "zoomFactor": null,
            "lastZoomTime": null,
            "fullPage": false,
            "onfullscreenchange": null
        };

        this._sequenceIndex = 0;
        this._firstOpen = true;
        this._updateRequestId = null;
        this._loadQueue = [];
        this.currentOverlays = [];

        this._lastScrollTime = $.now(); // variable used to help normalize the scroll event speed of different devices

        //Inherit some behaviors and properties
        $.EventSource.call(this);

        this.addHandler('open-failed', function (event) {
            var msg = $.getString("Errors.OpenFailed", event.eventSource, event.message);
            _this._showMessage(msg);
        });

        $.ControlDock.call(this, options);

        //Deal with tile sources
        if (this.xmlPath) {
            //Deprecated option.  Now it is preferred to use the tileSources option
            this.tileSources = [this.xmlPath];
        }

        this.element = this.element || document.getElementById(this.id);
        this.canvas = $.makeNeutralElement("div");

        this.canvas.className = "openseadragon-canvas";
        (function (style) {
            style.width = "100%";
            style.height = "100%";
            style.overflow = "hidden";
            style.position = "absolute";
            style.top = "0px";
            style.left = "0px";
        })(this.canvas.style);
        $.setElementTouchActionNone(this.canvas);
        this.canvas.tabIndex = options.tabIndex || 0;

        //the container is created through applying the ControlDock constructor above
        this.container.className = "openseadragon-container";
        (function (style) {
            style.width = "100%";
            style.height = "100%";
            style.position = "relative";
            style.overflow = "hidden";
            style.left = "0px";
            style.top = "0px";
            style.textAlign = "left"; // needed to protect against
        })(this.container.style);

        this.container.insertBefore(this.canvas, this.container.firstChild);
        this.element.appendChild(this.container);

        //Used for toggling between fullscreen and default container size
        //TODO: these can be closure private and shared across Viewer
        //      instances.
        this.bodyWidth = document.body.style.width;
        this.bodyHeight = document.body.style.height;
        this.bodyOverflow = document.body.style.overflow;
        this.docOverflow = document.documentElement.style.overflow;

        this.innerTracker = new $.MouseTracker({
            element: this.canvas,
            startDisabled: this.mouseNavEnabled ? false : true,
            clickTimeThreshold: this.clickTimeThreshold,
            clickDistThreshold: this.clickDistThreshold,
            dblClickTimeThreshold: this.dblClickTimeThreshold,
            dblClickDistThreshold: this.dblClickDistThreshold,
            keyDownHandler: $.delegate(this, onCanvasKeyDown),
            keyHandler: $.delegate(this, onCanvasKeyPress),
            clickHandler: $.delegate(this, onCanvasClick),
            dblClickHandler: $.delegate(this, onCanvasDblClick),
            dragHandler: $.delegate(this, onCanvasDrag),
            dragEndHandler: $.delegate(this, onCanvasDragEnd),
            enterHandler: $.delegate(this, onCanvasEnter),
            exitHandler: $.delegate(this, onCanvasExit),
            pressHandler: $.delegate(this, onCanvasPress),
            releaseHandler: $.delegate(this, onCanvasRelease),
            nonPrimaryPressHandler: $.delegate(this, onCanvasNonPrimaryPress),
            nonPrimaryReleaseHandler: $.delegate(this, onCanvasNonPrimaryRelease),
            scrollHandler: $.delegate(this, onCanvasScroll),
            pinchHandler: $.delegate(this, onCanvasPinch)
        });

        this.outerTracker = new $.MouseTracker({
            element: this.container,
            startDisabled: this.mouseNavEnabled ? false : true,
            clickTimeThreshold: this.clickTimeThreshold,
            clickDistThreshold: this.clickDistThreshold,
            dblClickTimeThreshold: this.dblClickTimeThreshold,
            dblClickDistThreshold: this.dblClickDistThreshold,
            enterHandler: $.delegate(this, onContainerEnter),
            exitHandler: $.delegate(this, onContainerExit)
        });

        if (this.toolbar) {
            this.toolbar = new $.ControlDock({ element: this.toolbar });
        }

        this.bindStandardControls();

        THIS[this.hash].prevContainerSize = _getSafeElemSize(this.container);

        // Create the world
        this.world = new $.World({
            viewer: this
        });

        this.world.addHandler('add-item', function (event) {
            // For backwards compatibility, we maintain the source property
            _this.source = _this.world.getItemAt(0).source;

            THIS[_this.hash].forceRedraw = true;

            if (!_this._updateRequestId) {
                _this._updateRequestId = scheduleUpdate(_this, updateMulti);
            }
        });

        this.world.addHandler('remove-item', function (event) {
            // For backwards compatibility, we maintain the source property
            if (_this.world.getItemCount()) {
                _this.source = _this.world.getItemAt(0).source;
            } else {
                _this.source = null;
            }

            THIS[_this.hash].forceRedraw = true;
        });

        this.world.addHandler('metrics-change', function (event) {
            if (_this.viewport) {
                _this.viewport.setHomeBounds(_this.world.getHomeBounds(), _this.world.getContentFactor());
            }
        });

        this.world.addHandler('item-index-change', function (event) {
            // For backwards compatibility, we maintain the source property
            _this.source = _this.world.getItemAt(0).source;
        });

        // Create the viewport
        this.viewport = new $.Viewport({
            containerSize: THIS[this.hash].prevContainerSize,
            springStiffness: this.springStiffness,
            animationTime: this.animationTime,
            minZoomImageRatio: this.minZoomImageRatio,
            maxZoomPixelRatio: this.maxZoomPixelRatio,
            visibilityRatio: this.visibilityRatio,
            wrapHorizontal: this.wrapHorizontal,
            wrapVertical: this.wrapVertical,
            defaultZoomLevel: this.defaultZoomLevel,
            minZoomLevel: this.minZoomLevel,
            maxZoomLevel: this.maxZoomLevel,
            viewer: this,
            degrees: this.degrees,
            navigatorRotate: this.navigatorRotate,
            homeFillsViewer: this.homeFillsViewer,
            margins: this.viewportMargins
        });

        this.viewport.setHomeBounds(this.world.getHomeBounds(), this.world.getContentFactor());

        // Create the image loader
        this.imageLoader = new $.ImageLoader({
            jobLimit: this.imageLoaderLimit
        });

        // Create the tile cache
        this.tileCache = new $.TileCache({
            maxImageCacheCount: this.maxImageCacheCount
        });

        // Create the drawer
        this.drawer = new $.Drawer({
            viewer: this,
            viewport: this.viewport,
            element: this.canvas,
            debugGridColor: this.debugGridColor
        });

        // Overlay container
        this.overlaysContainer = $.makeNeutralElement("div");
        this.canvas.appendChild(this.overlaysContainer);

        // Now that we have a drawer, see if it supports rotate. If not we need to remove the rotate buttons
        if (!this.drawer.canRotate()) {
            // Disable/remove the rotate left/right buttons since they aren't supported
            if (this.rotateLeft) {
                i = this.buttons.buttons.indexOf(this.rotateLeft);
                this.buttons.buttons.splice(i, 1);
                this.buttons.element.removeChild(this.rotateLeft.element);
            }
            if (this.rotateRight) {
                i = this.buttons.buttons.indexOf(this.rotateRight);
                this.buttons.buttons.splice(i, 1);
                this.buttons.element.removeChild(this.rotateRight.element);
            }
        }

        //Instantiate a navigator if configured
        if (this.showNavigator) {
            this.navigator = new $.Navigator({
                id: this.navigatorId,
                position: this.navigatorPosition,
                sizeRatio: this.navigatorSizeRatio,
                maintainSizeRatio: this.navigatorMaintainSizeRatio,
                top: this.navigatorTop,
                left: this.navigatorLeft,
                width: this.navigatorWidth,
                height: this.navigatorHeight,
                autoResize: this.navigatorAutoResize,
                prefixUrl: this.prefixUrl,
                viewer: this,
                navigatorRotate: this.navigatorRotate,
                crossOriginPolicy: this.crossOriginPolicy
            });
        }

        // Sequence mode
        if (this.sequenceMode) {
            this.bindSequenceControls();
        }

        // Open initial tilesources
        if (this.tileSources) {
            this.open(this.tileSources);
        }

        // Add custom controls
        for (i = 0; i < this.customControls.length; i++) {
            this.addControl(this.customControls[i].id, { anchor: this.customControls[i].anchor });
        }

        // Initial fade out
        $.requestAnimationFrame(function () {
            beginControlsAutoHide(_this);
        });
    };

    $.extend($.Viewer.prototype, $.EventSource.prototype, $.ControlDock.prototype, /** @lends OpenSeadragon.Viewer.prototype */{

        /**
         * @function
         * @return {Boolean}
         */
        isOpen: function isOpen() {
            return !!this.world.getItemCount();
        },

        // deprecated
        openDzi: function openDzi(dzi) {
            $.console.error("[Viewer.openDzi] this function is deprecated; use Viewer.open() instead.");
            return this.open(dzi);
        },

        // deprecated
        openTileSource: function openTileSource(tileSource) {
            $.console.error("[Viewer.openTileSource] this function is deprecated; use Viewer.open() instead.");
            return this.open(tileSource);
        },

        /**
         * Open tiled images into the viewer, closing any others.
         * @function
         * @param {Array|String|Object|Function} tileSources - This can be a TiledImage
         * specifier, a TileSource specifier, or an array of either. A TiledImage specifier
         * is the same as the options parameter for {@link OpenSeadragon.Viewer#addTiledImage},
         * except for the index property; images are added in sequence.
         * A TileSource specifier is anything you could pass as the tileSource property
         * of the options parameter for {@link OpenSeadragon.Viewer#addTiledImage}.
         * @return {OpenSeadragon.Viewer} Chainable.
         * @fires OpenSeadragon.Viewer.event:open
         * @fires OpenSeadragon.Viewer.event:open-failed
         */
        open: function open(tileSources) {
            var _this = this;

            this.close();

            if (!tileSources) {
                return;
            }

            if (this.sequenceMode && $.isArray(tileSources)) {
                if (this.referenceStrip) {
                    this.referenceStrip.destroy();
                    this.referenceStrip = null;
                }

                this.tileSources = tileSources;
                this._sequenceIndex = Math.max(0, Math.min(this.tileSources.length - 1, this.initialPage));
                if (this.tileSources.length) {
                    this.open(this.tileSources[this._sequenceIndex]);

                    if (this.showReferenceStrip) {
                        this.referenceStrip = new $.ReferenceStrip({
                            id: this.referenceStripElement,
                            position: this.referenceStripPosition,
                            sizeRatio: this.referenceStripSizeRatio,
                            scroll: this.referenceStripScroll,
                            height: this.referenceStripHeight,
                            width: this.referenceStripWidth,
                            tileSources: this.tileSources,
                            prefixUrl: this.prefixUrl,
                            viewer: this
                        });
                    }
                }

                this._updateSequenceButtons(this._sequenceIndex);
                return;
            }

            if (!$.isArray(tileSources)) {
                tileSources = [tileSources];
            }

            if (!tileSources.length) {
                return;
            }

            this._opening = true;

            var expected = tileSources.length;
            var successes = 0;
            var failures = 0;
            var failEvent;

            var checkCompletion = function checkCompletion() {
                if (successes + failures === expected) {
                    if (successes) {
                        if (_this._firstOpen || !_this.preserveViewport) {
                            _this.viewport.goHome(true);
                            _this.viewport.update();
                        }

                        _this._firstOpen = false;

                        var source = tileSources[0];
                        if (source.tileSource) {
                            source = source.tileSource;
                        }

                        // Global overlays
                        if (_this.overlays && !_this.preserveOverlays) {
                            for (var i = 0; i < _this.overlays.length; i++) {
                                _this.currentOverlays[i] = getOverlayObject(_this, _this.overlays[i]);
                            }
                        }

                        _this._drawOverlays();
                        _this._opening = false;

                        /**
                         * Raised when the viewer has opened and loaded one or more TileSources.
                         *
                         * @event open
                         * @memberof OpenSeadragon.Viewer
                         * @type {object}
                         * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised the event.
                         * @property {OpenSeadragon.TileSource} source - The tile source that was opened.
                         * @property {?Object} userData - Arbitrary subscriber-defined object.
                         */
                        // TODO: what if there are multiple sources?
                        _this.raiseEvent('open', { source: source });
                    } else {
                        _this._opening = false;

                        /**
                         * Raised when an error occurs loading a TileSource.
                         *
                         * @event open-failed
                         * @memberof OpenSeadragon.Viewer
                         * @type {object}
                         * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised the event.
                         * @property {String} message - Information about what failed.
                         * @property {String} source - The tile source that failed.
                         * @property {?Object} userData - Arbitrary subscriber-defined object.
                         */
                        _this.raiseEvent('open-failed', failEvent);
                    }
                }
            };

            var doOne = function doOne(options) {
                if (!$.isPlainObject(options) || !options.tileSource) {
                    options = {
                        tileSource: options
                    };
                }

                if (options.index !== undefined) {
                    $.console.error('[Viewer.open] setting indexes here is not supported; use addTiledImage instead');
                    delete options.index;
                }

                if (options.collectionImmediately === undefined) {
                    options.collectionImmediately = true;
                }

                var originalSuccess = options.success;
                options.success = function (event) {
                    successes++;

                    // TODO: now that options has other things besides tileSource, the overlays
                    // should probably be at the options level, not the tileSource level.
                    if (options.tileSource.overlays) {
                        for (var i = 0; i < options.tileSource.overlays.length; i++) {
                            _this.addOverlay(options.tileSource.overlays[i]);
                        }
                    }

                    if (originalSuccess) {
                        originalSuccess(event);
                    }

                    checkCompletion();
                };

                var originalError = options.error;
                options.error = function (event) {
                    failures++;

                    if (!failEvent) {
                        failEvent = event;
                    }

                    if (originalError) {
                        originalError(event);
                    }

                    checkCompletion();
                };

                _this.addTiledImage(options);
            };

            // TileSources
            for (var i = 0; i < tileSources.length; i++) {
                doOne(tileSources[i]);
            }

            return this;
        },

        /**
         * @function
         * @return {OpenSeadragon.Viewer} Chainable.
         * @fires OpenSeadragon.Viewer.event:close
         */
        close: function close() {
            if (!THIS[this.hash]) {
                //this viewer has already been destroyed: returning immediately
                return this;
            }

            this._opening = false;

            if (this.navigator) {
                this.navigator.close();
            }

            if (!this.preserveOverlays) {
                this.clearOverlays();
                this.overlaysContainer.innerHTML = "";
            }

            THIS[this.hash].animating = false;
            this.world.removeAll();
            this.imageLoader.clear();

            /**
             * Raised when the viewer is closed (see {@link OpenSeadragon.Viewer#close}).
             *
             * @event close
             * @memberof OpenSeadragon.Viewer
             * @type {object}
             * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised the event.
             * @property {?Object} userData - Arbitrary subscriber-defined object.
             */
            this.raiseEvent('close');

            return this;
        },

        /**
         * Function to destroy the viewer and clean up everything created by OpenSeadragon.
         *
         * Example:
         * var viewer = OpenSeadragon({
         *   [...]
         * });
         *
         * //when you are done with the viewer:
         * viewer.destroy();
         * viewer = null; //important
         *
         * @function
         */
        destroy: function destroy() {
            if (!THIS[this.hash]) {
                //this viewer has already been destroyed: returning immediately
                return;
            }

            this.close();

            this.clearOverlays();
            this.overlaysContainer.innerHTML = "";

            //TODO: implement this...
            //this.unbindSequenceControls()
            //this.unbindStandardControls()

            if (this.referenceStrip) {
                this.referenceStrip.destroy();
                this.referenceStrip = null;
            }

            if (this._updateRequestId !== null) {
                $.cancelAnimationFrame(this._updateRequestId);
                this._updateRequestId = null;
            }

            if (this.drawer) {
                this.drawer.destroy();
            }

            this.removeAllHandlers();

            // Go through top element (passed to us) and remove all children
            // Use removeChild to make sure it handles SVG or any non-html
            // also it performs better - http://jsperf.com/innerhtml-vs-removechild/15
            if (this.element) {
                while (this.element.firstChild) {
                    this.element.removeChild(this.element.firstChild);
                }
            }

            // destroy the mouse trackers
            if (this.innerTracker) {
                this.innerTracker.destroy();
            }
            if (this.outerTracker) {
                this.outerTracker.destroy();
            }

            THIS[this.hash] = null;
            delete THIS[this.hash];

            // clear all our references to dom objects
            this.canvas = null;
            this.container = null;

            // clear our reference to the main element - they will need to pass it in again, creating a new viewer
            this.element = null;
        },

        /**
         * @function
         * @return {Boolean}
         */
        isMouseNavEnabled: function isMouseNavEnabled() {
            return this.innerTracker.isTracking();
        },

        /**
         * @function
         * @param {Boolean} enabled - true to enable, false to disable
         * @return {OpenSeadragon.Viewer} Chainable.
         * @fires OpenSeadragon.Viewer.event:mouse-enabled
         */
        setMouseNavEnabled: function setMouseNavEnabled(enabled) {
            this.innerTracker.setTracking(enabled);
            /**
             * Raised when mouse/touch navigation is enabled or disabled (see {@link OpenSeadragon.Viewer#setMouseNavEnabled}).
             *
             * @event mouse-enabled
             * @memberof OpenSeadragon.Viewer
             * @type {object}
             * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised the event.
             * @property {Boolean} enabled
             * @property {?Object} userData - Arbitrary subscriber-defined object.
             */
            this.raiseEvent('mouse-enabled', { enabled: enabled });
            return this;
        },

        /**
         * @function
         * @return {Boolean}
         */
        areControlsEnabled: function areControlsEnabled() {
            var enabled = this.controls.length,
                i;
            for (i = 0; i < this.controls.length; i++) {
                enabled = enabled && this.controls[i].isVisibile();
            }
            return enabled;
        },

        /**
         * Shows or hides the controls (e.g. the default navigation buttons).
         *
         * @function
         * @param {Boolean} true to show, false to hide.
         * @return {OpenSeadragon.Viewer} Chainable.
         * @fires OpenSeadragon.Viewer.event:controls-enabled
         */
        setControlsEnabled: function setControlsEnabled(enabled) {
            if (enabled) {
                abortControlsAutoHide(this);
            } else {
                beginControlsAutoHide(this);
            }
            /**
             * Raised when the navigation controls are shown or hidden (see {@link OpenSeadragon.Viewer#setControlsEnabled}).
             *
             * @event controls-enabled
             * @memberof OpenSeadragon.Viewer
             * @type {object}
             * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised the event.
             * @property {Boolean} enabled
             * @property {?Object} userData - Arbitrary subscriber-defined object.
             */
            this.raiseEvent('controls-enabled', { enabled: enabled });
            return this;
        },

        /**
         * @function
         * @return {Boolean}
         */
        isFullPage: function isFullPage() {
            return THIS[this.hash].fullPage;
        },

        /**
         * Toggle full page mode.
         * @function
         * @param {Boolean} fullPage
         *      If true, enter full page mode.  If false, exit full page mode.
         * @return {OpenSeadragon.Viewer} Chainable.
         * @fires OpenSeadragon.Viewer.event:pre-full-page
         * @fires OpenSeadragon.Viewer.event:full-page
         */
        setFullPage: function setFullPage(fullPage) {

            var body = document.body,
                bodyStyle = body.style,
                docStyle = document.documentElement.style,
                _this = this,
                hash,
                nodes,
                i;

            //dont bother modifying the DOM if we are already in full page mode.
            if (fullPage == this.isFullPage()) {
                return this;
            }

            var fullPageEventArgs = {
                fullPage: fullPage,
                preventDefaultAction: false
            };
            /**
             * Raised when the viewer is about to change to/from full-page mode (see {@link OpenSeadragon.Viewer#setFullPage}).
             *
             * @event pre-full-page
             * @memberof OpenSeadragon.Viewer
             * @type {object}
             * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised the event.
             * @property {Boolean} fullPage - True if entering full-page mode, false if exiting full-page mode.
             * @property {Boolean} preventDefaultAction - Set to true to prevent full-page mode change. Default: false.
             * @property {?Object} userData - Arbitrary subscriber-defined object.
             */
            this.raiseEvent('pre-full-page', fullPageEventArgs);
            if (fullPageEventArgs.preventDefaultAction) {
                return this;
            }

            if (fullPage) {

                this.elementSize = $.getElementSize(this.element);
                this.pageScroll = $.getPageScroll();

                this.elementMargin = this.element.style.margin;
                this.element.style.margin = "0";
                this.elementPadding = this.element.style.padding;
                this.element.style.padding = "0";

                this.bodyMargin = bodyStyle.margin;
                this.docMargin = docStyle.margin;
                bodyStyle.margin = "0";
                docStyle.margin = "0";

                this.bodyPadding = bodyStyle.padding;
                this.docPadding = docStyle.padding;
                bodyStyle.padding = "0";
                docStyle.padding = "0";

                this.bodyWidth = bodyStyle.width;
                this.bodyHeight = bodyStyle.height;
                bodyStyle.width = "100%";
                bodyStyle.height = "100%";

                //when entering full screen on the ipad it wasnt sufficient to leave
                //the body intact as only only the top half of the screen would
                //respond to touch events on the canvas, while the bottom half treated
                //them as touch events on the document body.  Thus we remove and store
                //the bodies elements and replace them when we leave full screen.
                this.previousBody = [];
                THIS[this.hash].prevElementParent = this.element.parentNode;
                THIS[this.hash].prevNextSibling = this.element.nextSibling;
                THIS[this.hash].prevElementWidth = this.element.style.width;
                THIS[this.hash].prevElementHeight = this.element.style.height;
                nodes = body.childNodes.length;
                for (i = 0; i < nodes; i++) {
                    this.previousBody.push(body.childNodes[0]);
                    body.removeChild(body.childNodes[0]);
                }

                //If we've got a toolbar, we need to enable the user to use css to
                //preserve it in fullpage mode
                if (this.toolbar && this.toolbar.element) {
                    //save a reference to the parent so we can put it back
                    //in the long run we need a better strategy
                    this.toolbar.parentNode = this.toolbar.element.parentNode;
                    this.toolbar.nextSibling = this.toolbar.element.nextSibling;
                    body.appendChild(this.toolbar.element);

                    //Make sure the user has some ability to style the toolbar based
                    //on the mode
                    $.addClass(this.toolbar.element, 'fullpage');
                }

                $.addClass(this.element, 'fullpage');
                body.appendChild(this.element);

                this.element.style.height = $.getWindowSize().y + 'px';
                this.element.style.width = $.getWindowSize().x + 'px';

                if (this.toolbar && this.toolbar.element) {
                    this.element.style.height = $.getElementSize(this.element).y - $.getElementSize(this.toolbar.element).y + 'px';
                }

                THIS[this.hash].fullPage = true;

                // mouse will be inside container now
                $.delegate(this, onContainerEnter)({});
            } else {

                this.element.style.margin = this.elementMargin;
                this.element.style.padding = this.elementPadding;

                bodyStyle.margin = this.bodyMargin;
                docStyle.margin = this.docMargin;

                bodyStyle.padding = this.bodyPadding;
                docStyle.padding = this.docPadding;

                bodyStyle.width = this.bodyWidth;
                bodyStyle.height = this.bodyHeight;

                body.removeChild(this.element);
                nodes = this.previousBody.length;
                for (i = 0; i < nodes; i++) {
                    body.appendChild(this.previousBody.shift());
                }

                $.removeClass(this.element, 'fullpage');
                THIS[this.hash].prevElementParent.insertBefore(this.element, THIS[this.hash].prevNextSibling);

                //If we've got a toolbar, we need to enable the user to use css to
                //reset it to its original state
                if (this.toolbar && this.toolbar.element) {
                    body.removeChild(this.toolbar.element);

                    //Make sure the user has some ability to style the toolbar based
                    //on the mode
                    $.removeClass(this.toolbar.element, 'fullpage');

                    this.toolbar.parentNode.insertBefore(this.toolbar.element, this.toolbar.nextSibling);
                    delete this.toolbar.parentNode;
                    delete this.toolbar.nextSibling;
                }

                this.element.style.width = THIS[this.hash].prevElementWidth;
                this.element.style.height = THIS[this.hash].prevElementHeight;

                // After exiting fullPage or fullScreen, it can take some time
                // before the browser can actually set the scroll.
                var restoreScrollCounter = 0;
                var restoreScroll = function restoreScroll() {
                    $.setPageScroll(_this.pageScroll);
                    var pageScroll = $.getPageScroll();
                    restoreScrollCounter++;
                    if (restoreScrollCounter < 10 && pageScroll.x !== _this.pageScroll.x || pageScroll.y !== _this.pageScroll.y) {
                        $.requestAnimationFrame(restoreScroll);
                    }
                };
                $.requestAnimationFrame(restoreScroll);

                THIS[this.hash].fullPage = false;

                // mouse will likely be outside now
                $.delegate(this, onContainerExit)({});
            }

            if (this.navigator && this.viewport) {
                this.navigator.update(this.viewport);
            }

            /**
             * Raised when the viewer has changed to/from full-page mode (see {@link OpenSeadragon.Viewer#setFullPage}).
             *
             * @event full-page
             * @memberof OpenSeadragon.Viewer
             * @type {object}
             * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised the event.
             * @property {Boolean} fullPage - True if changed to full-page mode, false if exited full-page mode.
             * @property {?Object} userData - Arbitrary subscriber-defined object.
             */
            this.raiseEvent('full-page', { fullPage: fullPage });

            return this;
        },

        /**
         * Toggle full screen mode if supported. Toggle full page mode otherwise.
         * @function
         * @param {Boolean} fullScreen
         *      If true, enter full screen mode.  If false, exit full screen mode.
         * @return {OpenSeadragon.Viewer} Chainable.
         * @fires OpenSeadragon.Viewer.event:pre-full-screen
         * @fires OpenSeadragon.Viewer.event:full-screen
         */
        setFullScreen: function setFullScreen(fullScreen) {
            var _this = this;

            if (!$.supportsFullScreen) {
                return this.setFullPage(fullScreen);
            }

            if ($.isFullScreen() === fullScreen) {
                return this;
            }

            var fullScreeEventArgs = {
                fullScreen: fullScreen,
                preventDefaultAction: false
            };
            /**
             * Raised when the viewer is about to change to/from full-screen mode (see {@link OpenSeadragon.Viewer#setFullScreen}).
             * Note: the pre-full-screen event is not raised when the user is exiting
             * full-screen mode by pressing the Esc key. In that case, consider using
             * the full-screen, pre-full-page or full-page events.
             *
             * @event pre-full-screen
             * @memberof OpenSeadragon.Viewer
             * @type {object}
             * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised the event.
             * @property {Boolean} fullScreen - True if entering full-screen mode, false if exiting full-screen mode.
             * @property {Boolean} preventDefaultAction - Set to true to prevent full-screen mode change. Default: false.
             * @property {?Object} userData - Arbitrary subscriber-defined object.
             */
            this.raiseEvent('pre-full-screen', fullScreeEventArgs);
            if (fullScreeEventArgs.preventDefaultAction) {
                return this;
            }

            if (fullScreen) {

                this.setFullPage(true);
                // If the full page mode is not actually entered, we need to prevent
                // the full screen mode.
                if (!this.isFullPage()) {
                    return this;
                }

                this.fullPageStyleWidth = this.element.style.width;
                this.fullPageStyleHeight = this.element.style.height;
                this.element.style.width = '100%';
                this.element.style.height = '100%';

                var onFullScreenChange = function onFullScreenChange() {
                    var isFullScreen = $.isFullScreen();
                    if (!isFullScreen) {
                        $.removeEvent(document, $.fullScreenEventName, onFullScreenChange);
                        $.removeEvent(document, $.fullScreenErrorEventName, onFullScreenChange);

                        _this.setFullPage(false);
                        if (_this.isFullPage()) {
                            _this.element.style.width = _this.fullPageStyleWidth;
                            _this.element.style.height = _this.fullPageStyleHeight;
                        }
                    }
                    if (_this.navigator && _this.viewport) {
                        _this.navigator.update(_this.viewport);
                    }
                    /**
                     * Raised when the viewer has changed to/from full-screen mode (see {@link OpenSeadragon.Viewer#setFullScreen}).
                     *
                     * @event full-screen
                     * @memberof OpenSeadragon.Viewer
                     * @type {object}
                     * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised the event.
                     * @property {Boolean} fullScreen - True if changed to full-screen mode, false if exited full-screen mode.
                     * @property {?Object} userData - Arbitrary subscriber-defined object.
                     */
                    _this.raiseEvent('full-screen', { fullScreen: isFullScreen });
                };
                $.addEvent(document, $.fullScreenEventName, onFullScreenChange);
                $.addEvent(document, $.fullScreenErrorEventName, onFullScreenChange);

                $.requestFullScreen(document.body);
            } else {
                $.exitFullScreen();
            }
            return this;
        },

        /**
         * @function
         * @return {Boolean}
         */
        isVisible: function isVisible() {
            return this.container.style.visibility != "hidden";
        },

        /**
         * @function
         * @param {Boolean} visible
         * @return {OpenSeadragon.Viewer} Chainable.
         * @fires OpenSeadragon.Viewer.event:visible
         */
        setVisible: function setVisible(visible) {
            this.container.style.visibility = visible ? "" : "hidden";
            /**
             * Raised when the viewer is shown or hidden (see {@link OpenSeadragon.Viewer#setVisible}).
             *
             * @event visible
             * @memberof OpenSeadragon.Viewer
             * @type {object}
             * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised the event.
             * @property {Boolean} visible
             * @property {?Object} userData - Arbitrary subscriber-defined object.
             */
            this.raiseEvent('visible', { visible: visible });
            return this;
        },

        /**
         * Add a tiled image to the viewer.
         * options.tileSource can be anything that {@link OpenSeadragon.Viewer#open}
         *  supports except arrays of images.
         * Note that you can specify options.width or options.height, but not both.
         * The other dimension will be calculated according to the item's aspect ratio.
         * If collectionMode is on (see {@link OpenSeadragon.Options}), the new image is
         * automatically arranged with the others.
         * @function
         * @param {Object} options
         * @param {String|Object|Function} options.tileSource - The TileSource specifier.
         * A String implies a url used to determine the tileSource implementation
         *      based on the file extension of url. JSONP is implied by *.js,
         *      otherwise the url is retrieved as text and the resulting text is
         *      introspected to determine if its json, xml, or text and parsed.
         * An Object implies an inline configuration which has a single
         *      property sufficient for being able to determine tileSource
         *      implementation. If the object has a property which is a function
         *      named 'getTileUrl', it is treated as a custom TileSource.
         * @param {Number} [options.index] The index of the item. Added on top of
         * all other items if not specified.
         * @param {Boolean} [options.replace=false] If true, the item at options.index will be
         * removed and the new item is added in its place. options.tileSource will be
         * interpreted and fetched if necessary before the old item is removed to avoid leaving
         * a gap in the world.
         * @param {Number} [options.x=0] The X position for the image in viewport coordinates.
         * @param {Number} [options.y=0] The Y position for the image in viewport coordinates.
         * @param {Number} [options.width=1] The width for the image in viewport coordinates.
         * @param {Number} [options.height] The height for the image in viewport coordinates.
         * @param {OpenSeadragon.Rect} [options.clip] - An area, in image pixels, to clip to
         * (portions of the image outside of this area will not be visible). Only works on
         * browsers that support the HTML5 canvas.
         * @param {Number} [options.opacity] Opacity the tiled image should be drawn at by default.
         * @param {Function} [options.success] A function that gets called when the image is
         * successfully added. It's passed the event object which contains a single property:
         * "item", the resulting TiledImage.
         * @param {Function} [options.error] A function that gets called if the image is
         * unable to be added. It's passed the error event object, which contains "message"
         * and "source" properties.
         * @param {Boolean} [options.collectionImmediately=false] If collectionMode is on,
         * specifies whether to snap to the new arrangement immediately or to animate to it.
         * @param {String|CanvasGradient|CanvasPattern|Function} [options.placeholderFillStyle] - See {@link OpenSeadragon.Options}.
         * @fires OpenSeadragon.World.event:add-item
         * @fires OpenSeadragon.Viewer.event:add-item-failed
         */
        addTiledImage: function addTiledImage(options) {
            $.console.assert(options, "[Viewer.addTiledImage] options is required");
            $.console.assert(options.tileSource, "[Viewer.addTiledImage] options.tileSource is required");
            $.console.assert(!options.replace || options.index > -1 && options.index < this.world.getItemCount(), "[Viewer.addTiledImage] if options.replace is used, options.index must be a valid index in Viewer.world");

            var _this = this;

            if (options.replace) {
                options.replaceItem = _this.world.getItemAt(options.index);
            }

            this._hideMessage();

            if (options.placeholderFillStyle === undefined) {
                options.placeholderFillStyle = this.placeholderFillStyle;
            }
            if (options.opacity === undefined) {
                options.opacity = this.opacity;
            }

            var myQueueItem = {
                options: options
            };

            function raiseAddItemFailed(event) {
                for (var i = 0; i < _this._loadQueue.length; i++) {
                    if (_this._loadQueue[i] === myQueueItem) {
                        _this._loadQueue.splice(i, 1);
                        break;
                    }
                }

                if (_this._loadQueue.length === 0) {
                    refreshWorld(myQueueItem);
                }

                /**
                * Raised when an error occurs while adding a item.
                * @event add-item-failed
                * @memberOf OpenSeadragon.Viewer
                * @type {object}
                * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised the event.
                * @property {String} message
                * @property {String} source
                * @property {Object} options The options passed to the addTiledImage method.
                * @property {?Object} userData - Arbitrary subscriber-defined object.
                */
                _this.raiseEvent('add-item-failed', event);

                if (options.error) {
                    options.error(event);
                }
            }

            function refreshWorld(theItem) {
                if (_this.collectionMode) {
                    _this.world.arrange({
                        immediately: theItem.options.collectionImmediately,
                        rows: _this.collectionRows,
                        columns: _this.collectionColumns,
                        layout: _this.collectionLayout,
                        tileSize: _this.collectionTileSize,
                        tileMargin: _this.collectionTileMargin
                    });
                    _this.world.setAutoRefigureSizes(true);
                }
            }

            if ($.isArray(options.tileSource)) {
                setTimeout(function () {
                    raiseAddItemFailed({
                        message: "[Viewer.addTiledImage] Sequences can not be added; add them one at a time instead.",
                        source: options.tileSource,
                        options: options
                    });
                });
                return;
            }

            this._loadQueue.push(myQueueItem);

            getTileSourceImplementation(this, options.tileSource, function (tileSource) {

                myQueueItem.tileSource = tileSource;

                // add everybody at the front of the queue that's ready to go
                var queueItem, tiledImage, optionsClone;
                while (_this._loadQueue.length) {
                    queueItem = _this._loadQueue[0];
                    if (!queueItem.tileSource) {
                        break;
                    }

                    _this._loadQueue.splice(0, 1);

                    if (queueItem.options.replace) {
                        var newIndex = _this.world.getIndexOfItem(queueItem.options.replaceItem);
                        if (newIndex != -1) {
                            queueItem.options.index = newIndex;
                        }
                        _this.world.removeItem(queueItem.options.replaceItem);
                    }

                    tiledImage = new $.TiledImage({
                        viewer: _this,
                        source: queueItem.tileSource,
                        viewport: _this.viewport,
                        drawer: _this.drawer,
                        tileCache: _this.tileCache,
                        imageLoader: _this.imageLoader,
                        x: queueItem.options.x,
                        y: queueItem.options.y,
                        width: queueItem.options.width,
                        height: queueItem.options.height,
                        clip: queueItem.options.clip,
                        placeholderFillStyle: queueItem.options.placeholderFillStyle,
                        opacity: queueItem.options.opacity,
                        springStiffness: _this.springStiffness,
                        animationTime: _this.animationTime,
                        minZoomImageRatio: _this.minZoomImageRatio,
                        wrapHorizontal: _this.wrapHorizontal,
                        wrapVertical: _this.wrapVertical,
                        immediateRender: _this.immediateRender,
                        blendTime: _this.blendTime,
                        alwaysBlend: _this.alwaysBlend,
                        minPixelRatio: _this.minPixelRatio,
                        crossOriginPolicy: _this.crossOriginPolicy,
                        debugMode: _this.debugMode
                    });

                    if (_this.collectionMode) {
                        _this.world.setAutoRefigureSizes(false);
                    }
                    _this.world.addItem(tiledImage, {
                        index: queueItem.options.index
                    });

                    if (_this._loadQueue.length === 0) {
                        //this restores the autoRefigureSizes flag to true.
                        refreshWorld(queueItem);
                    }

                    if (_this.world.getItemCount() === 1 && !_this.preserveViewport) {
                        _this.viewport.goHome(true);
                    }

                    if (_this.navigator) {
                        optionsClone = $.extend({}, queueItem.options, {
                            originalTiledImage: tiledImage,
                            tileSource: queueItem.tileSource
                        });

                        _this.navigator.addTiledImage(optionsClone);
                    }

                    if (queueItem.options.success) {
                        queueItem.options.success({
                            item: tiledImage
                        });
                    }
                }
            }, function (event) {
                event.options = options;
                raiseAddItemFailed(event);
            });
        },

        // deprecated
        addLayer: function addLayer(options) {
            var _this = this;

            $.console.error("[Viewer.addLayer] this function is deprecated; use Viewer.addTiledImage() instead.");

            var optionsClone = $.extend({}, options, {
                success: function success(event) {
                    _this.raiseEvent("add-layer", {
                        options: options,
                        drawer: event.item
                    });
                },
                error: function error(event) {
                    _this.raiseEvent("add-layer-failed", event);
                }
            });

            this.addTiledImage(optionsClone);
            return this;
        },

        // deprecated
        getLayerAtLevel: function getLayerAtLevel(level) {
            $.console.error("[Viewer.getLayerAtLevel] this function is deprecated; use World.getItemAt() instead.");
            return this.world.getItemAt(level);
        },

        // deprecated
        getLevelOfLayer: function getLevelOfLayer(drawer) {
            $.console.error("[Viewer.getLevelOfLayer] this function is deprecated; use World.getIndexOfItem() instead.");
            return this.world.getIndexOfItem(drawer);
        },

        // deprecated
        getLayersCount: function getLayersCount() {
            $.console.error("[Viewer.getLayersCount] this function is deprecated; use World.getItemCount() instead.");
            return this.world.getItemCount();
        },

        // deprecated
        setLayerLevel: function setLayerLevel(drawer, level) {
            $.console.error("[Viewer.setLayerLevel] this function is deprecated; use World.setItemIndex() instead.");
            return this.world.setItemIndex(drawer, level);
        },

        // deprecated
        removeLayer: function removeLayer(drawer) {
            $.console.error("[Viewer.removeLayer] this function is deprecated; use World.removeItem() instead.");
            return this.world.removeItem(drawer);
        },

        /**
         * Force the viewer to redraw its contents.
         * @returns {OpenSeadragon.Viewer} Chainable.
         */
        forceRedraw: function forceRedraw() {
            THIS[this.hash].forceRedraw = true;
            return this;
        },

        /**
         * @function
         * @return {OpenSeadragon.Viewer} Chainable.
         */
        bindSequenceControls: function bindSequenceControls() {

            //////////////////////////////////////////////////////////////////////////
            // Image Sequence Controls
            //////////////////////////////////////////////////////////////////////////
            var onFocusHandler = $.delegate(this, onFocus),
                onBlurHandler = $.delegate(this, onBlur),
                onNextHandler = $.delegate(this, onNext),
                onPreviousHandler = $.delegate(this, onPrevious),
                navImages = this.navImages,
                useGroup = true;

            if (this.showSequenceControl) {

                if (this.previousButton || this.nextButton) {
                    //if we are binding to custom buttons then layout and
                    //grouping is the responsibility of the page author
                    useGroup = false;
                }

                this.previousButton = new $.Button({
                    element: this.previousButton ? $.getElement(this.previousButton) : null,
                    clickTimeThreshold: this.clickTimeThreshold,
                    clickDistThreshold: this.clickDistThreshold,
                    tooltip: $.getString("Tooltips.PreviousPage"),
                    srcRest: resolveUrl(this.prefixUrl, navImages.previous.REST),
                    srcGroup: resolveUrl(this.prefixUrl, navImages.previous.GROUP),
                    srcHover: resolveUrl(this.prefixUrl, navImages.previous.HOVER),
                    srcDown: resolveUrl(this.prefixUrl, navImages.previous.DOWN),
                    onRelease: onPreviousHandler,
                    onFocus: onFocusHandler,
                    onBlur: onBlurHandler
                });

                this.nextButton = new $.Button({
                    element: this.nextButton ? $.getElement(this.nextButton) : null,
                    clickTimeThreshold: this.clickTimeThreshold,
                    clickDistThreshold: this.clickDistThreshold,
                    tooltip: $.getString("Tooltips.NextPage"),
                    srcRest: resolveUrl(this.prefixUrl, navImages.next.REST),
                    srcGroup: resolveUrl(this.prefixUrl, navImages.next.GROUP),
                    srcHover: resolveUrl(this.prefixUrl, navImages.next.HOVER),
                    srcDown: resolveUrl(this.prefixUrl, navImages.next.DOWN),
                    onRelease: onNextHandler,
                    onFocus: onFocusHandler,
                    onBlur: onBlurHandler
                });

                if (!this.navPrevNextWrap) {
                    this.previousButton.disable();
                }

                if (!this.tileSources || !this.tileSources.length) {
                    this.nextButton.disable();
                }

                if (useGroup) {
                    this.paging = new $.ButtonGroup({
                        buttons: [this.previousButton, this.nextButton],
                        clickTimeThreshold: this.clickTimeThreshold,
                        clickDistThreshold: this.clickDistThreshold
                    });

                    this.pagingControl = this.paging.element;

                    if (this.toolbar) {
                        this.toolbar.addControl(this.pagingControl, { anchor: $.ControlAnchor.BOTTOM_RIGHT });
                    } else {
                        this.addControl(this.pagingControl, { anchor: this.sequenceControlAnchor || $.ControlAnchor.TOP_LEFT });
                    }
                }
            }
            return this;
        },

        /**
         * @function
         * @return {OpenSeadragon.Viewer} Chainable.
         */
        bindStandardControls: function bindStandardControls() {
            //////////////////////////////////////////////////////////////////////////
            // Navigation Controls
            //////////////////////////////////////////////////////////////////////////
            var beginZoomingInHandler = $.delegate(this, beginZoomingIn),
                endZoomingHandler = $.delegate(this, endZooming),
                doSingleZoomInHandler = $.delegate(this, doSingleZoomIn),
                beginZoomingOutHandler = $.delegate(this, beginZoomingOut),
                doSingleZoomOutHandler = $.delegate(this, doSingleZoomOut),
                onHomeHandler = $.delegate(this, onHome),
                onFullScreenHandler = $.delegate(this, onFullScreen),
                onRotateLeftHandler = $.delegate(this, onRotateLeft),
                onRotateRightHandler = $.delegate(this, onRotateRight),
                onFocusHandler = $.delegate(this, onFocus),
                onBlurHandler = $.delegate(this, onBlur),
                navImages = this.navImages,
                buttons = [],
                useGroup = true;

            if (this.showNavigationControl) {

                if (this.zoomInButton || this.zoomOutButton || this.homeButton || this.fullPageButton || this.rotateLeftButton || this.rotateRightButton) {
                    //if we are binding to custom buttons then layout and
                    //grouping is the responsibility of the page author
                    useGroup = false;
                }

                if (this.showZoomControl) {
                    buttons.push(this.zoomInButton = new $.Button({
                        element: this.zoomInButton ? $.getElement(this.zoomInButton) : null,
                        clickTimeThreshold: this.clickTimeThreshold,
                        clickDistThreshold: this.clickDistThreshold,
                        tooltip: $.getString("Tooltips.ZoomIn"),
                        srcRest: resolveUrl(this.prefixUrl, navImages.zoomIn.REST),
                        srcGroup: resolveUrl(this.prefixUrl, navImages.zoomIn.GROUP),
                        srcHover: resolveUrl(this.prefixUrl, navImages.zoomIn.HOVER),
                        srcDown: resolveUrl(this.prefixUrl, navImages.zoomIn.DOWN),
                        onPress: beginZoomingInHandler,
                        onRelease: endZoomingHandler,
                        onClick: doSingleZoomInHandler,
                        onEnter: beginZoomingInHandler,
                        onExit: endZoomingHandler,
                        onFocus: onFocusHandler,
                        onBlur: onBlurHandler
                    }));

                    buttons.push(this.zoomOutButton = new $.Button({
                        element: this.zoomOutButton ? $.getElement(this.zoomOutButton) : null,
                        clickTimeThreshold: this.clickTimeThreshold,
                        clickDistThreshold: this.clickDistThreshold,
                        tooltip: $.getString("Tooltips.ZoomOut"),
                        srcRest: resolveUrl(this.prefixUrl, navImages.zoomOut.REST),
                        srcGroup: resolveUrl(this.prefixUrl, navImages.zoomOut.GROUP),
                        srcHover: resolveUrl(this.prefixUrl, navImages.zoomOut.HOVER),
                        srcDown: resolveUrl(this.prefixUrl, navImages.zoomOut.DOWN),
                        onPress: beginZoomingOutHandler,
                        onRelease: endZoomingHandler,
                        onClick: doSingleZoomOutHandler,
                        onEnter: beginZoomingOutHandler,
                        onExit: endZoomingHandler,
                        onFocus: onFocusHandler,
                        onBlur: onBlurHandler
                    }));
                }

                if (this.showHomeControl) {
                    buttons.push(this.homeButton = new $.Button({
                        element: this.homeButton ? $.getElement(this.homeButton) : null,
                        clickTimeThreshold: this.clickTimeThreshold,
                        clickDistThreshold: this.clickDistThreshold,
                        tooltip: $.getString("Tooltips.Home"),
                        srcRest: resolveUrl(this.prefixUrl, navImages.home.REST),
                        srcGroup: resolveUrl(this.prefixUrl, navImages.home.GROUP),
                        srcHover: resolveUrl(this.prefixUrl, navImages.home.HOVER),
                        srcDown: resolveUrl(this.prefixUrl, navImages.home.DOWN),
                        onRelease: onHomeHandler,
                        onFocus: onFocusHandler,
                        onBlur: onBlurHandler
                    }));
                }

                if (this.showFullPageControl) {
                    buttons.push(this.fullPageButton = new $.Button({
                        element: this.fullPageButton ? $.getElement(this.fullPageButton) : null,
                        clickTimeThreshold: this.clickTimeThreshold,
                        clickDistThreshold: this.clickDistThreshold,
                        tooltip: $.getString("Tooltips.FullPage"),
                        srcRest: resolveUrl(this.prefixUrl, navImages.fullpage.REST),
                        srcGroup: resolveUrl(this.prefixUrl, navImages.fullpage.GROUP),
                        srcHover: resolveUrl(this.prefixUrl, navImages.fullpage.HOVER),
                        srcDown: resolveUrl(this.prefixUrl, navImages.fullpage.DOWN),
                        onRelease: onFullScreenHandler,
                        onFocus: onFocusHandler,
                        onBlur: onBlurHandler
                    }));
                }

                if (this.showRotationControl) {
                    buttons.push(this.rotateLeftButton = new $.Button({
                        element: this.rotateLeftButton ? $.getElement(this.rotateLeftButton) : null,
                        clickTimeThreshold: this.clickTimeThreshold,
                        clickDistThreshold: this.clickDistThreshold,
                        tooltip: $.getString("Tooltips.RotateLeft"),
                        srcRest: resolveUrl(this.prefixUrl, navImages.rotateleft.REST),
                        srcGroup: resolveUrl(this.prefixUrl, navImages.rotateleft.GROUP),
                        srcHover: resolveUrl(this.prefixUrl, navImages.rotateleft.HOVER),
                        srcDown: resolveUrl(this.prefixUrl, navImages.rotateleft.DOWN),
                        onRelease: onRotateLeftHandler,
                        onFocus: onFocusHandler,
                        onBlur: onBlurHandler
                    }));

                    buttons.push(this.rotateRightButton = new $.Button({
                        element: this.rotateRightButton ? $.getElement(this.rotateRightButton) : null,
                        clickTimeThreshold: this.clickTimeThreshold,
                        clickDistThreshold: this.clickDistThreshold,
                        tooltip: $.getString("Tooltips.RotateRight"),
                        srcRest: resolveUrl(this.prefixUrl, navImages.rotateright.REST),
                        srcGroup: resolveUrl(this.prefixUrl, navImages.rotateright.GROUP),
                        srcHover: resolveUrl(this.prefixUrl, navImages.rotateright.HOVER),
                        srcDown: resolveUrl(this.prefixUrl, navImages.rotateright.DOWN),
                        onRelease: onRotateRightHandler,
                        onFocus: onFocusHandler,
                        onBlur: onBlurHandler
                    }));
                }

                if (useGroup) {
                    this.buttons = new $.ButtonGroup({
                        buttons: buttons,
                        clickTimeThreshold: this.clickTimeThreshold,
                        clickDistThreshold: this.clickDistThreshold
                    });

                    this.navControl = this.buttons.element;
                    this.addHandler('open', $.delegate(this, lightUp));

                    if (this.toolbar) {
                        this.toolbar.addControl(this.navControl, { anchor: $.ControlAnchor.TOP_LEFT });
                    } else {
                        this.addControl(this.navControl, { anchor: this.navigationControlAnchor || $.ControlAnchor.TOP_LEFT });
                    }
                }
            }
            return this;
        },

        /**
         * Gets the active page of a sequence
         * @function
         * @return {Number}
         */
        currentPage: function currentPage() {
            return this._sequenceIndex;
        },

        /**
         * @function
         * @return {OpenSeadragon.Viewer} Chainable.
         * @fires OpenSeadragon.Viewer.event:page
         */
        goToPage: function goToPage(page) {
            if (this.tileSources && page >= 0 && page < this.tileSources.length) {
                /**
                 * Raised when the page is changed on a viewer configured with multiple image sources (see {@link OpenSeadragon.Viewer#goToPage}).
                 *
                 * @event page
                 * @memberof OpenSeadragon.Viewer
                 * @type {Object}
                 * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised the event.
                 * @property {Number} page - The page index.
                 * @property {?Object} userData - Arbitrary subscriber-defined object.
                 */
                this.raiseEvent('page', { page: page });

                this._sequenceIndex = page;

                this._updateSequenceButtons(page);

                this.open(this.tileSources[page]);

                if (this.referenceStrip) {
                    this.referenceStrip.setFocus(page);
                }
            }

            return this;
        },

        /**
          * Adds an html element as an overlay to the current viewport.  Useful for
          * highlighting words or areas of interest on an image or other zoomable
          * interface. The overlays added via this method are removed when the viewport
          * is closed which include when changing page.
          * @method
          * @param {Element|String|Object} element - A reference to an element or an id for
          *      the element which will be overlayed. Or an Object specifying the configuration for the overlay
          * @param {OpenSeadragon.Point|OpenSeadragon.Rect} location - The point or
          *      rectangle which will be overlayed.
          * @param {OpenSeadragon.OverlayPlacement} placement - The position of the
          *      viewport which the location coordinates will be treated as relative
          *      to.
          * @param {function} onDraw - If supplied the callback is called when the overlay
          *      needs to be drawn. It it the responsibility of the callback to do any drawing/positioning.
          *      It is passed position, size and element.
          * @return {OpenSeadragon.Viewer} Chainable.
          * @fires OpenSeadragon.Viewer.event:add-overlay
          */
        addOverlay: function addOverlay(element, location, placement, onDraw) {
            var options;
            if ($.isPlainObject(element)) {
                options = element;
            } else {
                options = {
                    element: element,
                    location: location,
                    placement: placement,
                    onDraw: onDraw
                };
            }

            element = $.getElement(options.element);

            if (getOverlayIndex(this.currentOverlays, element) >= 0) {
                // they're trying to add a duplicate overlay
                return this;
            }

            var overlay = getOverlayObject(this, options);
            this.currentOverlays.push(overlay);
            overlay.drawHTML(this.overlaysContainer, this.viewport);

            /**
             * Raised when an overlay is added to the viewer (see {@link OpenSeadragon.Viewer#addOverlay}).
             *
             * @event add-overlay
             * @memberof OpenSeadragon.Viewer
             * @type {object}
             * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised the event.
             * @property {Element} element - The overlay element.
             * @property {OpenSeadragon.Point|OpenSeadragon.Rect} location
             * @property {OpenSeadragon.OverlayPlacement} placement
             * @property {?Object} userData - Arbitrary subscriber-defined object.
             */
            this.raiseEvent('add-overlay', {
                element: element,
                location: options.location,
                placement: options.placement
            });
            return this;
        },

        /**
         * Updates the overlay represented by the reference to the element or
         * element id moving it to the new location, relative to the new placement.
         * @method
         * @param {Element|String} element - A reference to an element or an id for
         *      the element which is overlayed.
         * @param {OpenSeadragon.Point|OpenSeadragon.Rect} location - The point or
         *      rectangle which will be overlayed.
         * @param {OpenSeadragon.OverlayPlacement} placement - The position of the
         *      viewport which the location coordinates will be treated as relative
         *      to.
         * @return {OpenSeadragon.Viewer} Chainable.
         * @fires OpenSeadragon.Viewer.event:update-overlay
         */
        updateOverlay: function updateOverlay(element, location, placement) {
            var i;

            element = $.getElement(element);
            i = getOverlayIndex(this.currentOverlays, element);

            if (i >= 0) {
                this.currentOverlays[i].update(location, placement);
                THIS[this.hash].forceRedraw = true;
                /**
                 * Raised when an overlay's location or placement changes
                 * (see {@link OpenSeadragon.Viewer#updateOverlay}).
                 *
                 * @event update-overlay
                 * @memberof OpenSeadragon.Viewer
                 * @type {object}
                 * @property {OpenSeadragon.Viewer} eventSource - A reference to the
                 * Viewer which raised the event.
                 * @property {Element} element
                 * @property {OpenSeadragon.Point|OpenSeadragon.Rect} location
                 * @property {OpenSeadragon.OverlayPlacement} placement
                 * @property {?Object} userData - Arbitrary subscriber-defined object.
                 */
                this.raiseEvent('update-overlay', {
                    element: element,
                    location: location,
                    placement: placement
                });
            }
            return this;
        },

        /**
         * Removes an overlay identified by the reference element or element id
         * and schedules an update.
         * @method
         * @param {Element|String} element - A reference to the element or an
         *      element id which represent the ovelay content to be removed.
         * @return {OpenSeadragon.Viewer} Chainable.
         * @fires OpenSeadragon.Viewer.event:remove-overlay
         */
        removeOverlay: function removeOverlay(element) {
            var i;

            element = $.getElement(element);
            i = getOverlayIndex(this.currentOverlays, element);

            if (i >= 0) {
                this.currentOverlays[i].destroy();
                this.currentOverlays.splice(i, 1);
                THIS[this.hash].forceRedraw = true;
                /**
                 * Raised when an overlay is removed from the viewer
                 * (see {@link OpenSeadragon.Viewer#removeOverlay}).
                 *
                 * @event remove-overlay
                 * @memberof OpenSeadragon.Viewer
                 * @type {object}
                 * @property {OpenSeadragon.Viewer} eventSource - A reference to the
                 * Viewer which raised the event.
                 * @property {Element} element - The overlay element.
                 * @property {?Object} userData - Arbitrary subscriber-defined object.
                 */
                this.raiseEvent('remove-overlay', {
                    element: element
                });
            }
            return this;
        },

        /**
         * Removes all currently configured Overlays from this Viewer and schedules
         * an update.
         * @method
         * @return {OpenSeadragon.Viewer} Chainable.
         * @fires OpenSeadragon.Viewer.event:clear-overlay
         */
        clearOverlays: function clearOverlays() {
            while (this.currentOverlays.length > 0) {
                this.currentOverlays.pop().destroy();
            }
            THIS[this.hash].forceRedraw = true;
            /**
             * Raised when all overlays are removed from the viewer (see {@link OpenSeadragon.Drawer#clearOverlays}).
             *
             * @event clear-overlay
             * @memberof OpenSeadragon.Viewer
             * @type {object}
             * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised the event.
             * @property {?Object} userData - Arbitrary subscriber-defined object.
             */
            this.raiseEvent('clear-overlay', {});
            return this;
        },

        /**
         * Updates the sequence buttons.
         * @function OpenSeadragon.Viewer.prototype._updateSequenceButtons
         * @private
         * @param {Number} Sequence Value
         */
        _updateSequenceButtons: function _updateSequenceButtons(page) {

            if (this.nextButton) {
                if (!this.tileSources || this.tileSources.length - 1 === page) {
                    //Disable next button
                    if (!this.navPrevNextWrap) {
                        this.nextButton.disable();
                    }
                } else {
                    this.nextButton.enable();
                }
            }
            if (this.previousButton) {
                if (page > 0) {
                    //Enable previous button
                    this.previousButton.enable();
                } else {
                    if (!this.navPrevNextWrap) {
                        this.previousButton.disable();
                    }
                }
            }
        },

        /**
         * Display a message in the viewport
         * @function OpenSeadragon.Viewer.prototype._showMessage
         * @private
         * @param {String} text message
         */
        _showMessage: function _showMessage(message) {
            this._hideMessage();

            var div = $.makeNeutralElement("div");
            div.appendChild(document.createTextNode(message));

            this.messageDiv = $.makeCenteredNode(div);

            $.addClass(this.messageDiv, "openseadragon-message");

            this.container.appendChild(this.messageDiv);
        },

        /**
         * Hide any currently displayed viewport message
         * @function OpenSeadragon.Viewer.prototype._hideMessage
         * @private
         */
        _hideMessage: function _hideMessage() {
            var div = this.messageDiv;
            if (div) {
                div.parentNode.removeChild(div);
                delete this.messageDiv;
            }
        },

        /**
         * Gets this viewer's gesture settings for the given pointer device type.
         * @method
         * @param {String} type - The pointer device type to get the gesture settings for ("mouse", "touch", "pen", etc.).
         * @return {OpenSeadragon.GestureSettings}
         */
        gestureSettingsByDeviceType: function gestureSettingsByDeviceType(type) {
            switch (type) {
                case 'mouse':
                    return this.gestureSettingsMouse;
                case 'touch':
                    return this.gestureSettingsTouch;
                case 'pen':
                    return this.gestureSettingsPen;
                default:
                    return this.gestureSettingsUnknown;
            }
        },

        // private
        _drawOverlays: function _drawOverlays() {
            var i,
                length = this.currentOverlays.length;
            for (i = 0; i < length; i++) {
                this.currentOverlays[i].drawHTML(this.overlaysContainer, this.viewport);
            }
        },

        /**
         * Cancel the "in flight" images.
         */
        _cancelPendingImages: function _cancelPendingImages() {
            this._loadQueue = [];
        }
    });

    /**
     * _getSafeElemSize is like getElementSize(), but refuses to return 0 for x or y,
     * which was causing some calling operations to return NaN.
     * @returns {Point}
     * @private
     */
    function _getSafeElemSize(oElement) {
        oElement = $.getElement(oElement);

        return new $.Point(oElement.clientWidth === 0 ? 1 : oElement.clientWidth, oElement.clientHeight === 0 ? 1 : oElement.clientHeight);
    }

    /**
     * @function
     * @private
     */
    function getTileSourceImplementation(viewer, tileSource, successCallback, failCallback) {
        var _this = viewer;

        //allow plain xml strings or json strings to be parsed here
        if ($.type(tileSource) == 'string') {
            if (tileSource.match(/\s*<.*/)) {
                tileSource = $.parseXml(tileSource);
            } else if (tileSource.match(/\s*[\{\[].*/)) {
                tileSource = $.parseJSON(tileSource);
            }
        }

        function waitUntilReady(tileSource, originalTileSource) {
            if (tileSource.ready) {
                successCallback(tileSource);
            } else {
                tileSource.addHandler('ready', function () {
                    successCallback(tileSource);
                });
                tileSource.addHandler('open-failed', function (event) {
                    failCallback({
                        message: event.message,
                        source: originalTileSource
                    });
                });
            }
        }

        setTimeout(function () {
            if ($.type(tileSource) == 'string') {
                //If its still a string it means it must be a url at this point
                tileSource = new $.TileSource({
                    url: tileSource,
                    crossOriginPolicy: viewer.crossOriginPolicy,
                    ajaxWithCredentials: viewer.ajaxWithCredentials,
                    useCanvas: viewer.useCanvas,
                    success: function success(event) {
                        successCallback(event.tileSource);
                    }
                });
                tileSource.addHandler('open-failed', function (event) {
                    failCallback(event);
                });
            } else if ($.isPlainObject(tileSource) || tileSource.nodeType) {
                if (!tileSource.crossOriginPolicy && viewer.crossOriginPolicy) {
                    tileSource.crossOriginPolicy = viewer.crossOriginPolicy;
                }
                if (tileSource.ajaxWithCredentials === undefined) {
                    tileSource.ajaxWithCredentials = viewer.ajaxWithCredentials;
                }
                if (tileSource.useCanvas === undefined) {
                    tileSource.useCanvas = viewer.useCanvas;
                }

                if ($.isFunction(tileSource.getTileUrl)) {
                    //Custom tile source
                    var customTileSource = new $.TileSource(tileSource);
                    customTileSource.getTileUrl = tileSource.getTileUrl;
                    successCallback(customTileSource);
                } else {
                    //inline configuration
                    var $TileSource = $.TileSource.determineType(_this, tileSource);
                    if (!$TileSource) {
                        failCallback({
                            message: "Unable to load TileSource",
                            source: tileSource
                        });
                        return;
                    }
                    var options = $TileSource.prototype.configure.apply(_this, [tileSource]);
                    waitUntilReady(new $TileSource(options), tileSource);
                }
            } else {
                //can assume it's already a tile source implementation
                waitUntilReady(tileSource, tileSource);
            }
        });
    }

    function getOverlayObject(viewer, overlay) {
        if (overlay instanceof $.Overlay) {
            return overlay;
        }

        var element = null;
        if (overlay.element) {
            element = $.getElement(overlay.element);
        } else {
            var id = overlay.id ? overlay.id : "openseadragon-overlay-" + Math.floor(Math.random() * 10000000);

            element = $.getElement(overlay.id);
            if (!element) {
                element = document.createElement("a");
                element.href = "#/overlay/" + id;
            }
            element.id = id;
            $.addClass(element, overlay.className ? overlay.className : "openseadragon-overlay");
        }

        var location = overlay.location;
        if (!location) {
            if (overlay.width && overlay.height) {
                location = overlay.px !== undefined ? viewer.viewport.imageToViewportRectangle(new $.Rect(overlay.px, overlay.py, overlay.width, overlay.height)) : new $.Rect(overlay.x, overlay.y, overlay.width, overlay.height);
            } else {
                location = overlay.px !== undefined ? viewer.viewport.imageToViewportCoordinates(new $.Point(overlay.px, overlay.py)) : new $.Point(overlay.x, overlay.y);
            }
        }

        var placement = overlay.placement;
        if (placement && $.type(placement) === "string") {
            placement = $.OverlayPlacement[overlay.placement.toUpperCase()];
        }

        return new $.Overlay({
            element: element,
            location: location,
            placement: placement,
            onDraw: overlay.onDraw,
            checkResize: overlay.checkResize
        });
    }

    /**
     * @private
     * @inner
     * Determines the index of the given overlay in the given overlays array.
     */
    function getOverlayIndex(overlays, element) {
        var i;
        for (i = overlays.length - 1; i >= 0; i--) {
            if (overlays[i].element === element) {
                return i;
            }
        }

        return -1;
    }

    ///////////////////////////////////////////////////////////////////////////////
    // Schedulers provide the general engine for animation
    ///////////////////////////////////////////////////////////////////////////////
    function scheduleUpdate(viewer, updateFunc) {
        return $.requestAnimationFrame(function () {
            updateFunc(viewer);
        });
    }

    //provides a sequence in the fade animation
    function scheduleControlsFade(viewer) {
        $.requestAnimationFrame(function () {
            updateControlsFade(viewer);
        });
    }

    //initiates an animation to hide the controls
    function beginControlsAutoHide(viewer) {
        if (!viewer.autoHideControls) {
            return;
        }
        viewer.controlsShouldFade = true;
        viewer.controlsFadeBeginTime = $.now() + viewer.controlsFadeDelay;

        window.setTimeout(function () {
            scheduleControlsFade(viewer);
        }, viewer.controlsFadeDelay);
    }

    //determines if fade animation is done or continues the animation
    function updateControlsFade(viewer) {
        var currentTime, deltaTime, opacity, i;
        if (viewer.controlsShouldFade) {
            currentTime = $.now();
            deltaTime = currentTime - viewer.controlsFadeBeginTime;
            opacity = 1.0 - deltaTime / viewer.controlsFadeLength;

            opacity = Math.min(1.0, opacity);
            opacity = Math.max(0.0, opacity);

            for (i = viewer.controls.length - 1; i >= 0; i--) {
                if (viewer.controls[i].autoFade) {
                    viewer.controls[i].setOpacity(opacity);
                }
            }

            if (opacity > 0) {
                // fade again
                scheduleControlsFade(viewer);
            }
        }
    }

    //stop the fade animation on the controls and show them
    function abortControlsAutoHide(viewer) {
        var i;
        viewer.controlsShouldFade = false;
        for (i = viewer.controls.length - 1; i >= 0; i--) {
            viewer.controls[i].setOpacity(1.0);
        }
    }

    ///////////////////////////////////////////////////////////////////////////////
    // Default view event handlers.
    ///////////////////////////////////////////////////////////////////////////////
    function onFocus() {
        abortControlsAutoHide(this);
    }

    function onBlur() {
        beginControlsAutoHide(this);
    }

    function onCanvasKeyDown(event) {
        if (!event.preventDefaultAction && !event.ctrl && !event.alt && !event.meta) {
            switch (event.keyCode) {
                case 38:
                    //up arrow
                    if (event.shift) {
                        this.viewport.zoomBy(1.1);
                    } else {
                        this.viewport.panBy(this.viewport.deltaPointsFromPixels(new $.Point(0, -40)));
                    }
                    this.viewport.applyConstraints();
                    return false;
                case 40:
                    //down arrow
                    if (event.shift) {
                        this.viewport.zoomBy(0.9);
                    } else {
                        this.viewport.panBy(this.viewport.deltaPointsFromPixels(new $.Point(0, 40)));
                    }
                    this.viewport.applyConstraints();
                    return false;
                case 37:
                    //left arrow
                    this.viewport.panBy(this.viewport.deltaPointsFromPixels(new $.Point(-40, 0)));
                    this.viewport.applyConstraints();
                    return false;
                case 39:
                    //right arrow
                    this.viewport.panBy(this.viewport.deltaPointsFromPixels(new $.Point(40, 0)));
                    this.viewport.applyConstraints();
                    return false;
                default:
                    //console.log( 'navigator keycode %s', event.keyCode );
                    return true;
            }
        } else {
            return true;
        }
    }

    function onCanvasKeyPress(event) {
        if (!event.preventDefaultAction && !event.ctrl && !event.alt && !event.meta) {
            switch (event.keyCode) {
                case 43: //=|+
                case 61:
                    //=|+
                    this.viewport.zoomBy(1.1);
                    this.viewport.applyConstraints();
                    return false;
                case 45:
                    //-|_
                    this.viewport.zoomBy(0.9);
                    this.viewport.applyConstraints();
                    return false;
                case 48:
                    //0|)
                    this.viewport.goHome();
                    this.viewport.applyConstraints();
                    return false;
                case 119: //w
                case 87:
                    //W
                    if (event.shift) {
                        this.viewport.zoomBy(1.1);
                    } else {
                        this.viewport.panBy(this.viewport.deltaPointsFromPixels(new $.Point(0, -40)));
                    }
                    this.viewport.applyConstraints();
                    return false;
                case 115: //s
                case 83:
                    //S
                    if (event.shift) {
                        this.viewport.zoomBy(0.9);
                    } else {
                        this.viewport.panBy(this.viewport.deltaPointsFromPixels(new $.Point(0, 40)));
                    }
                    this.viewport.applyConstraints();
                    return false;
                case 97:
                    //a
                    this.viewport.panBy(this.viewport.deltaPointsFromPixels(new $.Point(-40, 0)));
                    this.viewport.applyConstraints();
                    return false;
                case 100:
                    //d
                    this.viewport.panBy(this.viewport.deltaPointsFromPixels(new $.Point(40, 0)));
                    this.viewport.applyConstraints();
                    return false;
                default:
                    //console.log( 'navigator keycode %s', event.keyCode );
                    return true;
            }
        } else {
            return true;
        }
    }

    function onCanvasClick(event) {
        var gestureSettings;

        var haveKeyboardFocus = document.activeElement == this.canvas;

        // If we don't have keyboard focus, request it.
        if (!haveKeyboardFocus) {
            this.canvas.focus();
        }

        if (!event.preventDefaultAction && this.viewport && event.quick) {
            gestureSettings = this.gestureSettingsByDeviceType(event.pointerType);
            if (gestureSettings.clickToZoom) {
                this.viewport.zoomBy(event.shift ? 1.0 / this.zoomPerClick : this.zoomPerClick, this.viewport.pointFromPixel(event.position, true));
                this.viewport.applyConstraints();
            }
        }
        /**
         * Raised when a mouse press/release or touch/remove occurs on the {@link OpenSeadragon.Viewer#canvas} element.
         *
         * @event canvas-click
         * @memberof OpenSeadragon.Viewer
         * @type {object}
         * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised this event.
         * @property {OpenSeadragon.MouseTracker} tracker - A reference to the MouseTracker which originated this event.
         * @property {OpenSeadragon.Point} position - The position of the event relative to the tracked element.
         * @property {Boolean} quick - True only if the clickDistThreshold and clickTimeThreshold are both passed. Useful for differentiating between clicks and drags.
         * @property {Boolean} shift - True if the shift key was pressed during this event.
         * @property {Object} originalEvent - The original DOM event.
         * @property {?Object} userData - Arbitrary subscriber-defined object.
         */
        this.raiseEvent('canvas-click', {
            tracker: event.eventSource,
            position: event.position,
            quick: event.quick,
            shift: event.shift,
            originalEvent: event.originalEvent
        });
    }

    function onCanvasDblClick(event) {
        var gestureSettings;

        if (!event.preventDefaultAction && this.viewport) {
            gestureSettings = this.gestureSettingsByDeviceType(event.pointerType);
            if (gestureSettings.dblClickToZoom) {
                this.viewport.zoomBy(event.shift ? 1.0 / this.zoomPerClick : this.zoomPerClick, this.viewport.pointFromPixel(event.position, true));
                this.viewport.applyConstraints();
            }
        }
        /**
         * Raised when a double mouse press/release or touch/remove occurs on the {@link OpenSeadragon.Viewer#canvas} element.
         *
         * @event canvas-double-click
         * @memberof OpenSeadragon.Viewer
         * @type {object}
         * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised this event.
         * @property {OpenSeadragon.MouseTracker} tracker - A reference to the MouseTracker which originated this event.
         * @property {OpenSeadragon.Point} position - The position of the event relative to the tracked element.
         * @property {Boolean} shift - True if the shift key was pressed during this event.
         * @property {Object} originalEvent - The original DOM event.
         * @property {?Object} userData - Arbitrary subscriber-defined object.
         */
        this.raiseEvent('canvas-double-click', {
            tracker: event.eventSource,
            position: event.position,
            shift: event.shift,
            originalEvent: event.originalEvent
        });
    }

    function onCanvasDrag(event) {
        var gestureSettings;

        if (!event.preventDefaultAction && this.viewport) {
            gestureSettings = this.gestureSettingsByDeviceType(event.pointerType);
            if (!this.panHorizontal) {
                event.delta.x = 0;
            }
            if (!this.panVertical) {
                event.delta.y = 0;
            }
            this.viewport.panBy(this.viewport.deltaPointsFromPixels(event.delta.negate()), gestureSettings.flickEnabled);
            if (this.constrainDuringPan) {
                this.viewport.applyConstraints();
            }
        }
        /**
         * Raised when a mouse or touch drag operation occurs on the {@link OpenSeadragon.Viewer#canvas} element.
         *
         * @event canvas-drag
         * @memberof OpenSeadragon.Viewer
         * @type {object}
         * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised this event.
         * @property {OpenSeadragon.MouseTracker} tracker - A reference to the MouseTracker which originated this event.
         * @property {OpenSeadragon.Point} position - The position of the event relative to the tracked element.
         * @property {OpenSeadragon.Point} delta - The x,y components of the difference between start drag and end drag.
         * @property {Number} speed - Current computed speed, in pixels per second.
         * @property {Number} direction - Current computed direction, expressed as an angle counterclockwise relative to the positive X axis (-pi to pi, in radians). Only valid if speed > 0.
         * @property {Boolean} shift - True if the shift key was pressed during this event.
         * @property {Object} originalEvent - The original DOM event.
         * @property {?Object} userData - Arbitrary subscriber-defined object.
         */
        this.raiseEvent('canvas-drag', {
            tracker: event.eventSource,
            position: event.position,
            delta: event.delta,
            speed: event.speed,
            direction: event.direction,
            shift: event.shift,
            originalEvent: event.originalEvent
        });
    }

    function onCanvasDragEnd(event) {
        var gestureSettings;

        if (!event.preventDefaultAction && this.viewport) {
            gestureSettings = this.gestureSettingsByDeviceType(event.pointerType);
            if (gestureSettings.flickEnabled && event.speed >= gestureSettings.flickMinSpeed) {
                var amplitudeX = gestureSettings.flickMomentum * (event.speed * Math.cos(event.direction - Math.PI / 180 * this.viewport.degrees)),
                    amplitudeY = gestureSettings.flickMomentum * (event.speed * Math.sin(event.direction - Math.PI / 180 * this.viewport.degrees)),
                    center = this.viewport.pixelFromPoint(this.viewport.getCenter(true)),
                    target = this.viewport.pointFromPixel(new $.Point(center.x - amplitudeX, center.y - amplitudeY));
                if (!this.panHorizontal) {
                    target.x = center.x;
                }
                if (!this.panVertical) {
                    target.y = center.y;
                }
                this.viewport.panTo(target, false);
            }
            this.viewport.applyConstraints();
        }
        /**
         * Raised when a mouse or touch drag operation ends on the {@link OpenSeadragon.Viewer#canvas} element.
         *
         * @event canvas-drag-end
         * @memberof OpenSeadragon.Viewer
         * @type {object}
         * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised this event.
         * @property {OpenSeadragon.MouseTracker} tracker - A reference to the MouseTracker which originated this event.
         * @property {OpenSeadragon.Point} position - The position of the event relative to the tracked element.
         * @property {Number} speed - Speed at the end of a drag gesture, in pixels per second.
         * @property {Number} direction - Direction at the end of a drag gesture, expressed as an angle counterclockwise relative to the positive X axis (-pi to pi, in radians). Only valid if speed > 0.
         * @property {Boolean} shift - True if the shift key was pressed during this event.
         * @property {Object} originalEvent - The original DOM event.
         * @property {?Object} userData - Arbitrary subscriber-defined object.
         */
        this.raiseEvent('canvas-drag-end', {
            tracker: event.eventSource,
            position: event.position,
            speed: event.speed,
            direction: event.direction,
            shift: event.shift,
            originalEvent: event.originalEvent
        });
    }

    function onCanvasEnter(event) {
        /**
         * Raised when a pointer enters the {@link OpenSeadragon.Viewer#canvas} element.
         *
         * @event canvas-enter
         * @memberof OpenSeadragon.Viewer
         * @type {object}
         * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised this event.
         * @property {OpenSeadragon.MouseTracker} tracker - A reference to the MouseTracker which originated this event.
         * @property {String} pointerType - "mouse", "touch", "pen", etc.
         * @property {OpenSeadragon.Point} position - The position of the event relative to the tracked element.
         * @property {Number} buttons - Current buttons pressed. A combination of bit flags 0: none, 1: primary (or touch contact), 2: secondary, 4: aux (often middle), 8: X1 (often back), 16: X2 (often forward), 32: pen eraser.
         * @property {Number} pointers - Number of pointers (all types) active in the tracked element.
         * @property {Boolean} insideElementPressed - True if the left mouse button is currently being pressed and was initiated inside the tracked element, otherwise false.
         * @property {Boolean} buttonDownAny - Was the button down anywhere in the screen during the event. <span style="color:red;">Deprecated. Use buttons instead.</span>
         * @property {Object} originalEvent - The original DOM event.
         * @property {?Object} userData - Arbitrary subscriber-defined object.
         */
        this.raiseEvent('canvas-enter', {
            tracker: event.eventSource,
            pointerType: event.pointerType,
            position: event.position,
            buttons: event.buttons,
            pointers: event.pointers,
            insideElementPressed: event.insideElementPressed,
            buttonDownAny: event.buttonDownAny,
            originalEvent: event.originalEvent
        });
    }

    function onCanvasExit(event) {
        /**
         * Raised when a pointer leaves the {@link OpenSeadragon.Viewer#canvas} element.
         *
         * @event canvas-exit
         * @memberof OpenSeadragon.Viewer
         * @type {object}
         * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised this event.
         * @property {OpenSeadragon.MouseTracker} tracker - A reference to the MouseTracker which originated this event.
         * @property {String} pointerType - "mouse", "touch", "pen", etc.
         * @property {OpenSeadragon.Point} position - The position of the event relative to the tracked element.
         * @property {Number} buttons - Current buttons pressed. A combination of bit flags 0: none, 1: primary (or touch contact), 2: secondary, 4: aux (often middle), 8: X1 (often back), 16: X2 (often forward), 32: pen eraser.
         * @property {Number} pointers - Number of pointers (all types) active in the tracked element.
         * @property {Boolean} insideElementPressed - True if the left mouse button is currently being pressed and was initiated inside the tracked element, otherwise false.
         * @property {Boolean} buttonDownAny - Was the button down anywhere in the screen during the event. <span style="color:red;">Deprecated. Use buttons instead.</span>
         * @property {Object} originalEvent - The original DOM event.
         * @property {?Object} userData - Arbitrary subscriber-defined object.
         */
        this.raiseEvent('canvas-exit', {
            tracker: event.eventSource,
            pointerType: event.pointerType,
            position: event.position,
            buttons: event.buttons,
            pointers: event.pointers,
            insideElementPressed: event.insideElementPressed,
            buttonDownAny: event.buttonDownAny,
            originalEvent: event.originalEvent
        });
    }

    function onCanvasPress(event) {
        /**
         * Raised when the primary mouse button is pressed or touch starts on the {@link OpenSeadragon.Viewer#canvas} element.
         *
         * @event canvas-press
         * @memberof OpenSeadragon.Viewer
         * @type {object}
         * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised this event.
         * @property {OpenSeadragon.MouseTracker} tracker - A reference to the MouseTracker which originated this event.
         * @property {String} pointerType - "mouse", "touch", "pen", etc.
         * @property {OpenSeadragon.Point} position - The position of the event relative to the tracked element.
         * @property {Boolean} insideElementPressed - True if the left mouse button is currently being pressed and was initiated inside the tracked element, otherwise false.
         * @property {Boolean} insideElementReleased - True if the cursor still inside the tracked element when the button was released.
         * @property {Object} originalEvent - The original DOM event.
         * @property {?Object} userData - Arbitrary subscriber-defined object.
         */
        this.raiseEvent('canvas-press', {
            tracker: event.eventSource,
            pointerType: event.pointerType,
            position: event.position,
            insideElementPressed: event.insideElementPressed,
            insideElementReleased: event.insideElementReleased,
            originalEvent: event.originalEvent
        });
    }

    function onCanvasRelease(event) {
        /**
         * Raised when the primary mouse button is released or touch ends on the {@link OpenSeadragon.Viewer#canvas} element.
         *
         * @event canvas-release
         * @memberof OpenSeadragon.Viewer
         * @type {object}
         * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised this event.
         * @property {OpenSeadragon.MouseTracker} tracker - A reference to the MouseTracker which originated this event.
         * @property {String} pointerType - "mouse", "touch", "pen", etc.
         * @property {OpenSeadragon.Point} position - The position of the event relative to the tracked element.
         * @property {Boolean} insideElementPressed - True if the left mouse button is currently being pressed and was initiated inside the tracked element, otherwise false.
         * @property {Boolean} insideElementReleased - True if the cursor still inside the tracked element when the button was released.
         * @property {Object} originalEvent - The original DOM event.
         * @property {?Object} userData - Arbitrary subscriber-defined object.
         */
        this.raiseEvent('canvas-release', {
            tracker: event.eventSource,
            pointerType: event.pointerType,
            position: event.position,
            insideElementPressed: event.insideElementPressed,
            insideElementReleased: event.insideElementReleased,
            originalEvent: event.originalEvent
        });
    }

    function onCanvasNonPrimaryPress(event) {
        /**
         * Raised when any non-primary pointer button is pressed on the {@link OpenSeadragon.Viewer#canvas} element.
         *
         * @event canvas-nonprimary-press
         * @memberof OpenSeadragon.Viewer
         * @type {object}
         * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised this event.
         * @property {OpenSeadragon.MouseTracker} tracker - A reference to the MouseTracker which originated this event.
         * @property {OpenSeadragon.Point} position - The position of the event relative to the tracked element.
         * @property {String} pointerType - "mouse", "touch", "pen", etc.
         * @property {Number} button - Button which caused the event.
         *      -1: none, 0: primary/left, 1: aux/middle, 2: secondary/right, 3: X1/back, 4: X2/forward, 5: pen eraser.
         * @property {Number} buttons - Current buttons pressed.
         *      Combination of bit flags 0: none, 1: primary (or touch contact), 2: secondary, 4: aux (often middle), 8: X1 (often back), 16: X2 (often forward), 32: pen eraser.
         * @property {Object} originalEvent - The original DOM event.
         * @property {?Object} userData - Arbitrary subscriber-defined object.
         */
        this.raiseEvent('canvas-nonprimary-press', {
            tracker: event.eventSource,
            position: event.position,
            pointerType: event.pointerType,
            button: event.button,
            buttons: event.buttons,
            originalEvent: event.originalEvent
        });
    }

    function onCanvasNonPrimaryRelease(event) {
        /**
         * Raised when any non-primary pointer button is released on the {@link OpenSeadragon.Viewer#canvas} element.
         *
         * @event canvas-nonprimary-release
         * @memberof OpenSeadragon.Viewer
         * @type {object}
         * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised this event.
         * @property {OpenSeadragon.MouseTracker} tracker - A reference to the MouseTracker which originated this event.
         * @property {OpenSeadragon.Point} position - The position of the event relative to the tracked element.
         * @property {String} pointerType - "mouse", "touch", "pen", etc.
         * @property {Number} button - Button which caused the event.
         *      -1: none, 0: primary/left, 1: aux/middle, 2: secondary/right, 3: X1/back, 4: X2/forward, 5: pen eraser.
         * @property {Number} buttons - Current buttons pressed.
         *      Combination of bit flags 0: none, 1: primary (or touch contact), 2: secondary, 4: aux (often middle), 8: X1 (often back), 16: X2 (often forward), 32: pen eraser.
         * @property {Object} originalEvent - The original DOM event.
         * @property {?Object} userData - Arbitrary subscriber-defined object.
         */
        this.raiseEvent('canvas-nonprimary-release', {
            tracker: event.eventSource,
            position: event.position,
            pointerType: event.pointerType,
            button: event.button,
            buttons: event.buttons,
            originalEvent: event.originalEvent
        });
    }

    function onCanvasPinch(event) {
        var gestureSettings, centerPt, lastCenterPt, panByPt;

        if (!event.preventDefaultAction && this.viewport) {
            gestureSettings = this.gestureSettingsByDeviceType(event.pointerType);
            if (gestureSettings.pinchToZoom) {
                centerPt = this.viewport.pointFromPixel(event.center, true);
                lastCenterPt = this.viewport.pointFromPixel(event.lastCenter, true);
                panByPt = lastCenterPt.minus(centerPt);
                if (!this.panHorizontal) {
                    panByPt.x = 0;
                }
                if (!this.panVertical) {
                    panByPt.y = 0;
                }
                this.viewport.zoomBy(event.distance / event.lastDistance, centerPt, true);
                this.viewport.panBy(panByPt, true);
                this.viewport.applyConstraints();
            }
            if (gestureSettings.pinchRotate) {
                // Pinch rotate
                var angle1 = Math.atan2(event.gesturePoints[0].currentPos.y - event.gesturePoints[1].currentPos.y, event.gesturePoints[0].currentPos.x - event.gesturePoints[1].currentPos.x);
                var angle2 = Math.atan2(event.gesturePoints[0].lastPos.y - event.gesturePoints[1].lastPos.y, event.gesturePoints[0].lastPos.x - event.gesturePoints[1].lastPos.x);
                this.viewport.setRotation(this.viewport.getRotation() + (angle1 - angle2) * (180 / Math.PI));
            }
        }
        /**
         * Raised when a pinch event occurs on the {@link OpenSeadragon.Viewer#canvas} element.
         *
         * @event canvas-pinch
         * @memberof OpenSeadragon.Viewer
         * @type {object}
         * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised this event.
         * @property {OpenSeadragon.MouseTracker} tracker - A reference to the MouseTracker which originated this event.
         * @property {Array.<OpenSeadragon.MouseTracker.GesturePoint>} gesturePoints - Gesture points associated with the gesture. Velocity data can be found here.
         * @property {OpenSeadragon.Point} lastCenter - The previous center point of the two pinch contact points relative to the tracked element.
         * @property {OpenSeadragon.Point} center - The center point of the two pinch contact points relative to the tracked element.
         * @property {Number} lastDistance - The previous distance between the two pinch contact points in CSS pixels.
         * @property {Number} distance - The distance between the two pinch contact points in CSS pixels.
         * @property {Boolean} shift - True if the shift key was pressed during this event.
         * @property {Object} originalEvent - The original DOM event.
         * @property {?Object} userData - Arbitrary subscriber-defined object.
         */
        this.raiseEvent('canvas-pinch', {
            tracker: event.eventSource,
            gesturePoints: event.gesturePoints,
            lastCenter: event.lastCenter,
            center: event.center,
            lastDistance: event.lastDistance,
            distance: event.distance,
            shift: event.shift,
            originalEvent: event.originalEvent
        });
        //cancels event
        return false;
    }

    function onCanvasScroll(event) {
        var gestureSettings, factor, thisScrollTime, deltaScrollTime;

        /* Certain scroll devices fire the scroll event way too fast so we are injecting a simple adjustment to keep things
         * partially normalized. If we have already fired an event within the last 'minScrollDelta' milliseconds we skip
         * this one and wait for the next event. */
        thisScrollTime = $.now();
        deltaScrollTime = thisScrollTime - this._lastScrollTime;
        if (deltaScrollTime > this.minScrollDeltaTime) {
            this._lastScrollTime = thisScrollTime;

            if (!event.preventDefaultAction && this.viewport) {
                gestureSettings = this.gestureSettingsByDeviceType(event.pointerType);
                if (gestureSettings.scrollToZoom) {
                    factor = Math.pow(this.zoomPerScroll, event.scroll);
                    this.viewport.zoomBy(factor, this.viewport.pointFromPixel(event.position, true));
                    this.viewport.applyConstraints();
                }
            }
            /**
             * Raised when a scroll event occurs on the {@link OpenSeadragon.Viewer#canvas} element (mouse wheel).
             *
             * @event canvas-scroll
             * @memberof OpenSeadragon.Viewer
             * @type {object}
             * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised this event.
             * @property {OpenSeadragon.MouseTracker} tracker - A reference to the MouseTracker which originated this event.
             * @property {OpenSeadragon.Point} position - The position of the event relative to the tracked element.
             * @property {Number} scroll - The scroll delta for the event.
             * @property {Boolean} shift - True if the shift key was pressed during this event.
             * @property {Object} originalEvent - The original DOM event.
             * @property {?Object} userData - Arbitrary subscriber-defined object.
             */
            this.raiseEvent('canvas-scroll', {
                tracker: event.eventSource,
                position: event.position,
                scroll: event.scroll,
                shift: event.shift,
                originalEvent: event.originalEvent
            });
            if (gestureSettings && gestureSettings.scrollToZoom) {
                //cancels event
                return false;
            }
        } else {
            return false; // We are swallowing this event
        }
    }

    function onContainerEnter(event) {
        THIS[this.hash].mouseInside = true;
        abortControlsAutoHide(this);
        /**
         * Raised when the cursor enters the {@link OpenSeadragon.Viewer#container} element.
         *
         * @event container-enter
         * @memberof OpenSeadragon.Viewer
         * @type {object}
         * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised this event.
         * @property {OpenSeadragon.MouseTracker} tracker - A reference to the MouseTracker which originated this event.
         * @property {OpenSeadragon.Point} position - The position of the event relative to the tracked element.
         * @property {Number} buttons - Current buttons pressed. A combination of bit flags 0: none, 1: primary (or touch contact), 2: secondary, 4: aux (often middle), 8: X1 (often back), 16: X2 (often forward), 32: pen eraser.
         * @property {Number} pointers - Number of pointers (all types) active in the tracked element.
         * @property {Boolean} insideElementPressed - True if the left mouse button is currently being pressed and was initiated inside the tracked element, otherwise false.
         * @property {Boolean} buttonDownAny - Was the button down anywhere in the screen during the event. <span style="color:red;">Deprecated. Use buttons instead.</span>
         * @property {Object} originalEvent - The original DOM event.
         * @property {?Object} userData - Arbitrary subscriber-defined object.
         */
        this.raiseEvent('container-enter', {
            tracker: event.eventSource,
            position: event.position,
            buttons: event.buttons,
            pointers: event.pointers,
            insideElementPressed: event.insideElementPressed,
            buttonDownAny: event.buttonDownAny,
            originalEvent: event.originalEvent
        });
    }

    function onContainerExit(event) {
        if (event.pointers < 1) {
            THIS[this.hash].mouseInside = false;
            if (!THIS[this.hash].animating) {
                beginControlsAutoHide(this);
            }
        }
        /**
         * Raised when the cursor leaves the {@link OpenSeadragon.Viewer#container} element.
         *
         * @event container-exit
         * @memberof OpenSeadragon.Viewer
         * @type {object}
         * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised this event.
         * @property {OpenSeadragon.MouseTracker} tracker - A reference to the MouseTracker which originated this event.
         * @property {OpenSeadragon.Point} position - The position of the event relative to the tracked element.
         * @property {Number} buttons - Current buttons pressed. A combination of bit flags 0: none, 1: primary (or touch contact), 2: secondary, 4: aux (often middle), 8: X1 (often back), 16: X2 (often forward), 32: pen eraser.
         * @property {Number} pointers - Number of pointers (all types) active in the tracked element.
         * @property {Boolean} insideElementPressed - True if the left mouse button is currently being pressed and was initiated inside the tracked element, otherwise false.
         * @property {Boolean} buttonDownAny - Was the button down anywhere in the screen during the event. <span style="color:red;">Deprecated. Use buttons instead.</span>
         * @property {Object} originalEvent - The original DOM event.
         * @property {?Object} userData - Arbitrary subscriber-defined object.
         */
        this.raiseEvent('container-exit', {
            tracker: event.eventSource,
            position: event.position,
            buttons: event.buttons,
            pointers: event.pointers,
            insideElementPressed: event.insideElementPressed,
            buttonDownAny: event.buttonDownAny,
            originalEvent: event.originalEvent
        });
    }

    ///////////////////////////////////////////////////////////////////////////////
    // Page update routines ( aka Views - for future reference )
    ///////////////////////////////////////////////////////////////////////////////

    function updateMulti(viewer) {
        updateOnce(viewer);

        // Request the next frame, unless we've been closed
        if (viewer.isOpen()) {
            viewer._updateRequestId = scheduleUpdate(viewer, updateMulti);
        } else {
            viewer._updateRequestId = false;
        }
    }

    function updateOnce(viewer) {

        //viewer.profiler.beginUpdate();

        if (viewer._opening) {
            return;
        }

        var containerSize;
        if (viewer.autoResize) {
            containerSize = _getSafeElemSize(viewer.container);
            if (!containerSize.equals(THIS[viewer.hash].prevContainerSize)) {
                if (viewer.preserveImageSizeOnResize) {
                    var prevContainerSize = THIS[viewer.hash].prevContainerSize;
                    var bounds = viewer.viewport.getBounds(true);
                    var deltaX = containerSize.x - prevContainerSize.x;
                    var deltaY = containerSize.y - prevContainerSize.y;
                    var viewportDiff = viewer.viewport.deltaPointsFromPixels(new OpenSeadragon.Point(deltaX, deltaY), true);
                    viewer.viewport.resize(new OpenSeadragon.Point(containerSize.x, containerSize.y), false);

                    // Keep the center of the image in the center and just adjust the amount of image shown
                    bounds.width += viewportDiff.x;
                    bounds.height += viewportDiff.y;
                    bounds.x -= viewportDiff.x / 2;
                    bounds.y -= viewportDiff.y / 2;
                    viewer.viewport.fitBoundsWithConstraints(bounds, true);
                } else {
                    // maintain image position
                    var oldBounds = viewer.viewport.getBounds();
                    var oldCenter = viewer.viewport.getCenter();
                    resizeViewportAndRecenter(viewer, containerSize, oldBounds, oldCenter);
                }
                THIS[viewer.hash].prevContainerSize = containerSize;
                THIS[viewer.hash].forceRedraw = true;
            }
        }

        var viewportChange = viewer.viewport.update();
        var animated = viewer.world.update() || viewportChange;

        if (viewportChange) {
            /**
             * Raised when any spring animation update occurs (zoom, pan, etc.),
             * before the viewer has drawn the new location.
             *
             * @event viewport-change
             * @memberof OpenSeadragon.Viewer
             * @type {object}
             * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised this event.
             * @property {?Object} userData - Arbitrary subscriber-defined object.
             */
            viewer.raiseEvent('viewport-change');
        }

        if (viewer.referenceStrip) {
            animated = viewer.referenceStrip.update(viewer.viewport) || animated;
        }

        if (!THIS[viewer.hash].animating && animated) {
            /**
             * Raised when any spring animation starts (zoom, pan, etc.).
             *
             * @event animation-start
             * @memberof OpenSeadragon.Viewer
             * @type {object}
             * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised this event.
             * @property {?Object} userData - Arbitrary subscriber-defined object.
             */
            viewer.raiseEvent("animation-start");
            abortControlsAutoHide(viewer);
        }

        if (animated || THIS[viewer.hash].forceRedraw || viewer.world.needsDraw()) {
            drawWorld(viewer);
            viewer._drawOverlays();
            if (viewer.navigator) {
                viewer.navigator.update(viewer.viewport);
            }

            THIS[viewer.hash].forceRedraw = false;

            if (animated) {
                /**
                 * Raised when any spring animation update occurs (zoom, pan, etc.),
                 * after the viewer has drawn the new location.
                 *
                 * @event animation
                 * @memberof OpenSeadragon.Viewer
                 * @type {object}
                 * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised this event.
                 * @property {?Object} userData - Arbitrary subscriber-defined object.
                 */
                viewer.raiseEvent("animation");
            }
        }

        if (THIS[viewer.hash].animating && !animated) {
            /**
             * Raised when any spring animation ends (zoom, pan, etc.).
             *
             * @event animation-finish
             * @memberof OpenSeadragon.Viewer
             * @type {object}
             * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised this event.
             * @property {?Object} userData - Arbitrary subscriber-defined object.
             */
            viewer.raiseEvent("animation-finish");

            if (!THIS[viewer.hash].mouseInside) {
                beginControlsAutoHide(viewer);
            }
        }

        THIS[viewer.hash].animating = animated;

        //viewer.profiler.endUpdate();
    }

    // This function resizes the viewport and recenters the image
    // as it was before resizing.
    // TODO: better adjust width and height. The new width and height
    // should depend on the image dimensions and on the dimensions
    // of the viewport before and after switching mode.
    function resizeViewportAndRecenter(viewer, containerSize, oldBounds, oldCenter) {
        var viewport = viewer.viewport;

        viewport.resize(containerSize, true);

        var newBounds = new $.Rect(oldCenter.x - oldBounds.width / 2.0, oldCenter.y - oldBounds.height / 2.0, oldBounds.width, oldBounds.height);

        // let the viewport decide if the bounds are too big or too small
        viewport.fitBoundsWithConstraints(newBounds, true);
    }

    function drawWorld(viewer) {
        viewer.imageLoader.clear();
        viewer.drawer.clear();
        viewer.world.draw();

        /**
         * <em>- Needs documentation -</em>
         *
         * @event update-viewport
         * @memberof OpenSeadragon.Viewer
         * @type {object}
         * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised the event.
         * @property {?Object} userData - Arbitrary subscriber-defined object.
         */
        viewer.raiseEvent('update-viewport', {});
    }

    ///////////////////////////////////////////////////////////////////////////////
    // Navigation Controls
    ///////////////////////////////////////////////////////////////////////////////
    function resolveUrl(prefix, url) {
        return prefix ? prefix + url : url;
    }

    function beginZoomingIn() {
        THIS[this.hash].lastZoomTime = $.now();
        THIS[this.hash].zoomFactor = this.zoomPerSecond;
        THIS[this.hash].zooming = true;
        scheduleZoom(this);
    }

    function beginZoomingOut() {
        THIS[this.hash].lastZoomTime = $.now();
        THIS[this.hash].zoomFactor = 1.0 / this.zoomPerSecond;
        THIS[this.hash].zooming = true;
        scheduleZoom(this);
    }

    function endZooming() {
        THIS[this.hash].zooming = false;
    }

    function scheduleZoom(viewer) {
        $.requestAnimationFrame($.delegate(viewer, doZoom));
    }

    function doZoom() {
        var currentTime, deltaTime, adjustedFactor;

        if (THIS[this.hash].zooming && this.viewport) {
            currentTime = $.now();
            deltaTime = currentTime - THIS[this.hash].lastZoomTime;
            adjustedFactor = Math.pow(THIS[this.hash].zoomFactor, deltaTime / 1000);

            this.viewport.zoomBy(adjustedFactor);
            this.viewport.applyConstraints();
            THIS[this.hash].lastZoomTime = currentTime;
            scheduleZoom(this);
        }
    }

    function doSingleZoomIn() {
        if (this.viewport) {
            THIS[this.hash].zooming = false;
            this.viewport.zoomBy(this.zoomPerClick / 1.0);
            this.viewport.applyConstraints();
        }
    }

    function doSingleZoomOut() {
        if (this.viewport) {
            THIS[this.hash].zooming = false;
            this.viewport.zoomBy(1.0 / this.zoomPerClick);
            this.viewport.applyConstraints();
        }
    }

    function lightUp() {
        this.buttons.emulateEnter();
        this.buttons.emulateExit();
    }

    function onHome() {
        if (this.viewport) {
            this.viewport.goHome();
        }
    }

    function onFullScreen() {
        if (this.isFullPage() && !$.isFullScreen()) {
            // Is fullPage but not fullScreen
            this.setFullPage(false);
        } else {
            this.setFullScreen(!this.isFullPage());
        }
        // correct for no mouseout event on change
        if (this.buttons) {
            this.buttons.emulateExit();
        }
        this.fullPageButton.element.focus();
        if (this.viewport) {
            this.viewport.applyConstraints();
        }
    }

    /**
     * Note: The current rotation feature is limited to 90 degree turns.
     */
    function onRotateLeft() {
        if (this.viewport) {
            var currRotation = this.viewport.getRotation();
            if (currRotation === 0) {
                currRotation = 270;
            } else {
                currRotation -= 90;
            }
            this.viewport.setRotation(currRotation);
        }
    }

    /**
     * Note: The current rotation feature is limited to 90 degree turns.
     */
    function onRotateRight() {
        if (this.viewport) {
            var currRotation = this.viewport.getRotation();
            if (currRotation === 270) {
                currRotation = 0;
            } else {
                currRotation += 90;
            }
            this.viewport.setRotation(currRotation);
        }
    }

    function onPrevious() {
        var previous = this._sequenceIndex - 1;
        if (this.navPrevNextWrap && previous < 0) {
            previous += this.tileSources.length;
        }
        this.goToPage(previous);
    }

    function onNext() {
        var next = this._sequenceIndex + 1;
        if (this.navPrevNextWrap && next >= this.tileSources.length) {
            next = 0;
        }
        this.goToPage(next);
    }
})(OpenSeadragon);

/*
 * OpenSeadragon - Navigator
 *
 * Copyright (C) 2009 CodePlex Foundation
 * Copyright (C) 2010-2013 OpenSeadragon contributors
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 * - Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 *
 * - Neither the name of CodePlex Foundation nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

(function ($) {

    /**
     * @class Navigator
     * @classdesc The Navigator provides a small view of the current image as fixed
     * while representing the viewport as a moving box serving as a frame
     * of reference in the larger viewport as to which portion of the image
     * is currently being examined.  The navigator's viewport can be interacted
     * with using the keyboard or the mouse.
     *
     * @memberof OpenSeadragon
     * @extends OpenSeadragon.Viewer
     * @extends OpenSeadragon.EventSource
     * @param {Object} options
     */
    $.Navigator = function (options) {

        var viewer = options.viewer,
            _this = this,
            viewerSize,
            navigatorSize;

        //We may need to create a new element and id if they did not
        //provide the id for the existing element
        if (!options.id) {
            options.id = 'navigator-' + $.now();
            this.element = $.makeNeutralElement("div");
            options.controlOptions = {
                anchor: $.ControlAnchor.TOP_RIGHT,
                attachToViewer: true,
                autoFade: true
            };

            if (options.position) {
                if ('BOTTOM_RIGHT' == options.position) {
                    options.controlOptions.anchor = $.ControlAnchor.BOTTOM_RIGHT;
                } else if ('BOTTOM_LEFT' == options.position) {
                    options.controlOptions.anchor = $.ControlAnchor.BOTTOM_LEFT;
                } else if ('TOP_RIGHT' == options.position) {
                    options.controlOptions.anchor = $.ControlAnchor.TOP_RIGHT;
                } else if ('TOP_LEFT' == options.position) {
                    options.controlOptions.anchor = $.ControlAnchor.TOP_LEFT;
                } else if ('ABSOLUTE' == options.position) {
                    options.controlOptions.anchor = $.ControlAnchor.ABSOLUTE;
                    options.controlOptions.top = options.top;
                    options.controlOptions.left = options.left;
                    options.controlOptions.height = options.height;
                    options.controlOptions.width = options.width;
                }
            }
        } else {
            this.element = document.getElementById(options.id);
            options.controlOptions = {
                anchor: $.ControlAnchor.NONE,
                attachToViewer: false,
                autoFade: false
            };
        }
        this.element.id = options.id;
        this.element.className += ' navigator';

        options = $.extend(true, {
            sizeRatio: $.DEFAULT_SETTINGS.navigatorSizeRatio
        }, options, {
            element: this.element,
            tabIndex: -1, // No keyboard navigation, omit from tab order
            //These need to be overridden to prevent recursion since
            //the navigator is a viewer and a viewer has a navigator
            showNavigator: false,
            mouseNavEnabled: false,
            showNavigationControl: false,
            showSequenceControl: false,
            immediateRender: true,
            blendTime: 0,
            animationTime: 0,
            autoResize: options.autoResize,
            // prevent resizing the navigator from adding unwanted space around the image
            minZoomImageRatio: 1.0
        });

        options.minPixelRatio = this.minPixelRatio = viewer.minPixelRatio;

        $.setElementTouchActionNone(this.element);

        this.borderWidth = 2;
        //At some browser magnification levels the display regions lines up correctly, but at some there appears to
        //be a one pixel gap.
        this.fudge = new $.Point(1, 1);
        this.totalBorderWidths = new $.Point(this.borderWidth * 2, this.borderWidth * 2).minus(this.fudge);

        if (options.controlOptions.anchor != $.ControlAnchor.NONE) {
            (function (style, borderWidth) {
                style.margin = '0px';
                style.border = borderWidth + 'px solid #555';
                style.padding = '0px';
                style.background = '#000';
                style.opacity = 0.8;
                style.overflow = 'hidden';
            })(this.element.style, this.borderWidth);
        }

        this.displayRegion = $.makeNeutralElement("div");
        this.displayRegion.id = this.element.id + '-displayregion';
        this.displayRegion.className = 'displayregion';

        (function (style, borderWidth) {
            style.position = 'relative';
            style.top = '0px';
            style.left = '0px';
            style.fontSize = '0px';
            style.overflow = 'hidden';
            style.border = borderWidth + 'px solid #900';
            style.margin = '0px';
            style.padding = '0px';
            //TODO: IE doesnt like this property being set
            //try{ style.outline  = '2px auto #909'; }catch(e){/*ignore*/}

            style.background = 'transparent';

            // We use square bracket notation on the statement below, because float is a keyword.
            // This is important for the Google Closure compiler, if nothing else.
            /*jshint sub:true */
            style['float'] = 'left'; //Webkit

            style.cssFloat = 'left'; //Firefox
            style.styleFloat = 'left'; //IE
            style.zIndex = 999999999;
            style.cursor = 'default';
        })(this.displayRegion.style, this.borderWidth);

        this.displayRegionContainer = $.makeNeutralElement("div");
        this.displayRegionContainer.id = this.element.id + '-displayregioncontainer';
        this.displayRegionContainer.className = "displayregioncontainer";
        this.displayRegionContainer.style.width = "100%";
        this.displayRegionContainer.style.height = "100%";

        viewer.addControl(this.element, options.controlOptions);

        this._resizeWithViewer = options.controlOptions.anchor != $.ControlAnchor.ABSOLUTE && options.controlOptions.anchor != $.ControlAnchor.NONE;

        if (this._resizeWithViewer) {
            if (options.width && options.height) {
                this.element.style.height = typeof options.height == "number" ? options.height + 'px' : options.height;
                this.element.style.width = typeof options.width == "number" ? options.width + 'px' : options.width;
            } else {
                viewerSize = $.getElementSize(viewer.element);
                this.element.style.height = Math.round(viewerSize.y * options.sizeRatio) + 'px';
                this.element.style.width = Math.round(viewerSize.x * options.sizeRatio) + 'px';
                this.oldViewerSize = viewerSize;
            }
            navigatorSize = $.getElementSize(this.element);
            this.elementArea = navigatorSize.x * navigatorSize.y;
        }

        this.oldContainerSize = new $.Point(0, 0);

        $.Viewer.apply(this, [options]);

        this.displayRegionContainer.appendChild(this.displayRegion);
        this.element.getElementsByTagName('div')[0].appendChild(this.displayRegionContainer);

        if (options.navigatorRotate) {
            options.viewer.addHandler("rotate", function (args) {
                _setTransformRotate(_this.displayRegionContainer, args.degrees);
                _setTransformRotate(_this.displayRegion, -args.degrees);
                _this.viewport.setRotation(args.degrees);
            });
        }

        // Remove the base class' (Viewer's) innerTracker and replace it with our own
        this.innerTracker.destroy();
        this.innerTracker = new $.MouseTracker({
            element: this.element,
            dragHandler: $.delegate(this, onCanvasDrag),
            clickHandler: $.delegate(this, onCanvasClick),
            releaseHandler: $.delegate(this, onCanvasRelease),
            scrollHandler: $.delegate(this, onCanvasScroll)
        });

        this.addHandler("reset-size", function () {
            if (_this.viewport) {
                _this.viewport.goHome(true);
            }
        });

        this.addHandler("reset-size", function () {
            if (_this.viewport) {
                _this.viewport.goHome(true);
            }
        });

        viewer.world.addHandler("item-index-change", function (event) {
            var item = _this.world.getItemAt(event.previousIndex);
            _this.world.setItemIndex(item, event.newIndex);
        });

        viewer.world.addHandler("remove-item", function (event) {
            var theirItem = event.item;
            var myItem = _this._getMatchingItem(theirItem);
            if (myItem) {
                _this.world.removeItem(myItem);
            }
        });

        this.update(viewer.viewport);
    };

    $.extend($.Navigator.prototype, $.EventSource.prototype, $.Viewer.prototype, /** @lends OpenSeadragon.Navigator.prototype */{

        /**
         * Used to notify the navigator when its size has changed.
         * Especially useful when {@link OpenSeadragon.Options}.navigatorAutoResize is set to false and the navigator is resizable.
         * @function
         */
        updateSize: function updateSize() {
            if (this.viewport) {
                var containerSize = new $.Point(this.container.clientWidth === 0 ? 1 : this.container.clientWidth, this.container.clientHeight === 0 ? 1 : this.container.clientHeight);

                if (!containerSize.equals(this.oldContainerSize)) {
                    this.viewport.resize(containerSize, true);
                    this.viewport.goHome(true);
                    this.oldContainerSize = containerSize;
                    this.drawer.clear();
                    this.world.draw();
                }
            }
        },

        /**
         * Used to update the navigator minimap's viewport rectangle when a change in the viewer's viewport occurs.
         * @function
         * @param {OpenSeadragon.Viewport} The viewport this navigator is tracking.
         */
        update: function update(viewport) {

            var viewerSize, newWidth, newHeight, bounds, topleft, bottomright;

            viewerSize = $.getElementSize(this.viewer.element);
            if (this._resizeWithViewer && viewerSize.x && viewerSize.y && !viewerSize.equals(this.oldViewerSize)) {
                this.oldViewerSize = viewerSize;

                if (this.maintainSizeRatio || !this.elementArea) {
                    newWidth = viewerSize.x * this.sizeRatio;
                    newHeight = viewerSize.y * this.sizeRatio;
                } else {
                    newWidth = Math.sqrt(this.elementArea * (viewerSize.x / viewerSize.y));
                    newHeight = this.elementArea / newWidth;
                }

                this.element.style.width = Math.round(newWidth) + 'px';
                this.element.style.height = Math.round(newHeight) + 'px';

                if (!this.elementArea) {
                    this.elementArea = newWidth * newHeight;
                }

                this.updateSize();
            }

            if (viewport && this.viewport) {
                bounds = viewport.getBounds(true);
                topleft = this.viewport.pixelFromPoint(bounds.getTopLeft(), false);
                bottomright = this.viewport.pixelFromPoint(bounds.getBottomRight(), false).minus(this.totalBorderWidths);

                //update style for navigator-box
                var style = this.displayRegion.style;
                style.display = this.world.getItemCount() ? 'block' : 'none';

                style.top = Math.round(topleft.y) + 'px';
                style.left = Math.round(topleft.x) + 'px';

                var width = Math.abs(topleft.x - bottomright.x);
                var height = Math.abs(topleft.y - bottomright.y);
                // make sure width and height are non-negative so IE doesn't throw
                style.width = Math.round(Math.max(width, 0)) + 'px';
                style.height = Math.round(Math.max(height, 0)) + 'px';
            }
        },

        // overrides Viewer.addTiledImage
        addTiledImage: function addTiledImage(options) {
            var _this = this;

            var original = options.originalTiledImage;
            delete options.original;

            var optionsClone = $.extend({}, options, {
                success: function success(event) {
                    var myItem = event.item;
                    myItem._originalForNavigator = original;
                    _this._matchBounds(myItem, original, true);

                    original.addHandler('bounds-change', function () {
                        _this._matchBounds(myItem, original);
                    });
                }
            });

            return $.Viewer.prototype.addTiledImage.apply(this, [optionsClone]);
        },

        // private
        _getMatchingItem: function _getMatchingItem(theirItem) {
            var count = this.world.getItemCount();
            var item;
            for (var i = 0; i < count; i++) {
                item = this.world.getItemAt(i);
                if (item._originalForNavigator === theirItem) {
                    return item;
                }
            }

            return null;
        },

        // private
        _matchBounds: function _matchBounds(myItem, theirItem, immediately) {
            var bounds = theirItem.getBounds();
            myItem.setPosition(bounds.getTopLeft(), immediately);
            myItem.setWidth(bounds.width, immediately);
        }
    });

    /**
     * @private
     * @inner
     * @function
     */
    function onCanvasClick(event) {
        if (event.quick && this.viewer.viewport) {
            this.viewer.viewport.panTo(this.viewport.pointFromPixel(event.position).rotate(-this.viewer.viewport.degrees, this.viewer.viewport.getHomeBounds().getCenter()));
            this.viewer.viewport.applyConstraints();
        }
    }

    /**
     * @private
     * @inner
     * @function
     */
    function onCanvasDrag(event) {
        if (this.viewer.viewport) {
            if (!this.panHorizontal) {
                event.delta.x = 0;
            }
            if (!this.panVertical) {
                event.delta.y = 0;
            }
            this.viewer.viewport.panBy(this.viewport.deltaPointsFromPixels(event.delta));
        }
    }

    /**
     * @private
     * @inner
     * @function
     */
    function onCanvasRelease(event) {
        if (event.insideElementPressed && this.viewer.viewport) {
            this.viewer.viewport.applyConstraints();
        }
    }

    /**
     * @private
     * @inner
     * @function
     */
    function onCanvasScroll(event) {
        /**
         * Raised when a scroll event occurs on the {@link OpenSeadragon.Viewer#navigator} element (mouse wheel, touch pinch, etc.).
         *
         * @event navigator-scroll
         * @memberof OpenSeadragon.Viewer
         * @type {object}
         * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised this event.
         * @property {OpenSeadragon.MouseTracker} tracker - A reference to the MouseTracker which originated this event.
         * @property {OpenSeadragon.Point} position - The position of the event relative to the tracked element.
         * @property {Number} scroll - The scroll delta for the event.
         * @property {Boolean} shift - True if the shift key was pressed during this event.
         * @property {Object} originalEvent - The original DOM event.
         * @property {?Object} userData - Arbitrary subscriber-defined object.
         */
        this.viewer.raiseEvent('navigator-scroll', {
            tracker: event.eventSource,
            position: event.position,
            scroll: event.scroll,
            shift: event.shift,
            originalEvent: event.originalEvent
        });

        //dont scroll the page up and down if the user is scrolling
        //in the navigator
        return false;
    }

    /**
        * @function
        * @private
        * @param {Object} element
        * @param {Number} degrees
        */
    function _setTransformRotate(element, degrees) {
        element.style.webkitTransform = "rotate(" + degrees + "deg)";
        element.style.mozTransform = "rotate(" + degrees + "deg)";
        element.style.msTransform = "rotate(" + degrees + "deg)";
        element.style.oTransform = "rotate(" + degrees + "deg)";
        element.style.transform = "rotate(" + degrees + "deg)";
    }
})(OpenSeadragon);

/*
 * OpenSeadragon - getString/setString
 *
 * Copyright (C) 2009 CodePlex Foundation
 * Copyright (C) 2010-2013 OpenSeadragon contributors
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 * - Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 *
 * - Neither the name of CodePlex Foundation nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

(function ($) {

    //TODO: I guess this is where the i18n needs to be reimplemented.  I'll look
    //      into existing patterns for i18n in javascript but i think that mimicking
    //      pythons gettext might be a reasonable approach.
    var I18N = {
        Errors: {
            Dzc: "Sorry, we don't support Deep Zoom Collections!",
            Dzi: "Hmm, this doesn't appear to be a valid Deep Zoom Image.",
            Xml: "Hmm, this doesn't appear to be a valid Deep Zoom Image.",
            ImageFormat: "Sorry, we don't support {0}-based Deep Zoom Images.",
            Security: "It looks like a security restriction stopped us from " + "loading this Deep Zoom Image.",
            Status: "This space unintentionally left blank ({0} {1}).",
            OpenFailed: "Unable to open {0}: {1}"
        },

        Tooltips: {
            FullPage: "Toggle full page",
            Home: "Go home",
            ZoomIn: "Zoom in",
            ZoomOut: "Zoom out",
            NextPage: "Next page",
            PreviousPage: "Previous page",
            RotateLeft: "Rotate left",
            RotateRight: "Rotate right"
        }
    };

    $.extend($, /** @lends OpenSeadragon */{

        /**
         * @function
         * @param {String} property
         */
        getString: function getString(prop) {

            var props = prop.split('.'),
                string = null,
                args = arguments,
                container = I18N,
                i;

            for (i = 0; i < props.length - 1; i++) {
                // in case not a subproperty
                container = container[props[i]] || {};
            }
            string = container[props[i]];

            if (typeof string != "string") {
                $.console.debug("Untranslated source string:", prop);
                string = ""; // FIXME: this breaks gettext()-style convention, which would return source
            }

            return string.replace(/\{\d+\}/g, function (capture) {
                var i = parseInt(capture.match(/\d+/), 10) + 1;
                return i < args.length ? args[i] : "";
            });
        },

        /**
         * @function
         * @param {String} property
         * @param {*} value
         */
        setString: function setString(prop, value) {

            var props = prop.split('.'),
                container = I18N,
                i;

            for (i = 0; i < props.length - 1; i++) {
                if (!container[props[i]]) {
                    container[props[i]] = {};
                }
                container = container[props[i]];
            }

            container[props[i]] = value;
        }

    });
})(OpenSeadragon);

/*
 * OpenSeadragon - Point
 *
 * Copyright (C) 2009 CodePlex Foundation
 * Copyright (C) 2010-2013 OpenSeadragon contributors
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 * - Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 *
 * - Neither the name of CodePlex Foundation nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

(function ($) {

    /**
     * @class Point
     * @classdesc A Point is really used as a 2-dimensional vector, equally useful for
     * representing a point on a plane, or the height and width of a plane
     * not requiring any other frame of reference.
     *
     * @memberof OpenSeadragon
     * @param {Number} [x] The vector component 'x'. Defaults to the origin at 0.
     * @param {Number} [y] The vector component 'y'. Defaults to the origin at 0.
     */
    $.Point = function (x, y) {
        /**
         * The vector component 'x'.
         * @member {Number} x
         * @memberof OpenSeadragon.Point#
         */
        this.x = typeof x == "number" ? x : 0;
        /**
         * The vector component 'y'.
         * @member {Number} y
         * @memberof OpenSeadragon.Point#
         */
        this.y = typeof y == "number" ? y : 0;
    };

    $.Point.prototype = /** @lends OpenSeadragon.Point.prototype */{
        /**
         * @function
         * @returns {OpenSeadragon.Point} a duplicate of this Point
         */
        clone: function clone() {
            return new $.Point(this.x, this.y);
        },

        /**
         * Add another Point to this point and return a new Point.
         * @function
         * @param {OpenSeadragon.Point} point The point to add vector components.
         * @returns {OpenSeadragon.Point} A new point representing the sum of the
         *  vector components
         */
        plus: function plus(point) {
            return new $.Point(this.x + point.x, this.y + point.y);
        },

        /**
         * Substract another Point to this point and return a new Point.
         * @function
         * @param {OpenSeadragon.Point} point The point to substract vector components.
         * @returns {OpenSeadragon.Point} A new point representing the substraction of the
         *  vector components
         */
        minus: function minus(point) {
            return new $.Point(this.x - point.x, this.y - point.y);
        },

        /**
         * Multiply this point by a factor and return a new Point.
         * @function
         * @param {Number} factor The factor to multiply vector components.
         * @returns {OpenSeadragon.Point} A new point representing the multiplication
         *  of the vector components by the factor
         */
        times: function times(factor) {
            return new $.Point(this.x * factor, this.y * factor);
        },

        /**
         * Divide this point by a factor and return a new Point.
         * @function
         * @param {Number} factor The factor to divide vector components.
         * @returns {OpenSeadragon.Point} A new point representing the division of the
         *  vector components by the factor
         */
        divide: function divide(factor) {
            return new $.Point(this.x / factor, this.y / factor);
        },

        /**
         * Compute the opposite of this point and return a new Point.
         * @function
         * @returns {OpenSeadragon.Point} A new point representing the opposite of the
         *  vector components
         */
        negate: function negate() {
            return new $.Point(-this.x, -this.y);
        },

        /**
         * Compute the distance between this point and another point.
         * @function
         * @param {OpenSeadragon.Point} point The point to compute the distance with.
         * @returns {Number} The distance between the 2 points
         */
        distanceTo: function distanceTo(point) {
            return Math.sqrt(Math.pow(this.x - point.x, 2) + Math.pow(this.y - point.y, 2));
        },

        /**
         * Apply a function to each coordinate of this point and return a new point.
         * @function
         * @param {function} func The function to apply to each coordinate.
         * @returns {OpenSeadragon.Point} A new point with the coordinates computed
         * by the specified function
         */
        apply: function apply(func) {
            return new $.Point(func(this.x), func(this.y));
        },

        /**
         * Check if this point is equal to another one.
         * @function
         * @param {OpenSeadragon.Point} point The point to compare this point with.
         * @returns {Boolean} true if they are equal, false otherwise.
         */
        equals: function equals(point) {
            return point instanceof $.Point && this.x === point.x && this.y === point.y;
        },

        /**
         * Rotates the point around the specified pivot
         * From http://stackoverflow.com/questions/4465931/rotate-rectangle-around-a-point
         * @function
         * @param {Number} degress to rotate around the pivot.
         * @param {OpenSeadragon.Point} pivot Point about which to rotate.
         * @returns {OpenSeadragon.Point}. A new point representing the point rotated around the specified pivot
         */
        rotate: function rotate(degrees, pivot) {
            var angle = degrees * Math.PI / 180.0,
                x = Math.cos(angle) * (this.x - pivot.x) - Math.sin(angle) * (this.y - pivot.y) + pivot.x,
                y = Math.sin(angle) * (this.x - pivot.x) + Math.cos(angle) * (this.y - pivot.y) + pivot.y;
            return new $.Point(x, y);
        },

        /**
         * Convert this point to a string in the format (x,y) where x and y are
         * rounded to the nearest integer.
         * @function
         * @returns {String} A string representation of this point.
         */
        toString: function toString() {
            return "(" + Math.round(this.x * 100) / 100 + "," + Math.round(this.y * 100) / 100 + ")";
        }
    };
})(OpenSeadragon);

/*
 * OpenSeadragon - TileSource
 *
 * Copyright (C) 2009 CodePlex Foundation
 * Copyright (C) 2010-2013 OpenSeadragon contributors
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 * - Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 *
 * - Neither the name of CodePlex Foundation nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

(function ($) {

    /**
     * @class TileSource
     * @classdesc The TileSource contains the most basic implementation required to create a
     * smooth transition between layers in an image pyramid. It has only a single key
     * interface that must be implemented to complete its key functionality:
     * 'getTileUrl'.  It also has several optional interfaces that can be
     * implemented if a new TileSource wishes to support configuration via a simple
     * object or array ('configure') and if the tile source supports or requires
     * configuration via retrieval of a document on the network ala AJAX or JSONP,
     * ('getImageInfo').
     * <br/>
     * By default the image pyramid is split into N layers where the image's longest
     * side in M (in pixels), where N is the smallest integer which satisfies
     *      <strong>2^(N+1) >= M</strong>.
     *
     * @memberof OpenSeadragon
     * @extends OpenSeadragon.EventSource
     * @param {Object} options
     *      You can either specify a URL, or literally define the TileSource (by specifying
     *      width, height, tileSize, tileOverlap, minLevel, and maxLevel). For the former,
     *      the extending class is expected to implement 'getImageInfo' and 'configure'.
     *      For the latter, the construction is assumed to occur through
     *      the extending classes implementation of 'configure'.
     * @param {String} [options.url]
     *      The URL for the data necessary for this TileSource.
     * @param {Function} [options.success]
     *      A function to be called upon successful creation.
     * @param {Boolean} [options.ajaxWithCredentials]
     *      If this TileSource needs to make an AJAX call, this specifies whether to set
     *      the XHR's withCredentials (for accessing secure data).
     * @param {Number} [options.width]
     *      Width of the source image at max resolution in pixels.
     * @param {Number} [options.height]
     *      Height of the source image at max resolution in pixels.
     * @param {Number} [options.tileSize]
     *      The size of the tiles to assumed to make up each pyramid layer in pixels.
     *      Tile size determines the point at which the image pyramid must be
     *      divided into a matrix of smaller images.
     *      Use options.tileWidth and options.tileHeight to support non-square tiles.
     * @param {Number} [options.tileWidth]
     *      The width of the tiles to assumed to make up each pyramid layer in pixels.
     * @param {Number} [options.tileHeight]
     *      The height of the tiles to assumed to make up each pyramid layer in pixels.
     * @param {Number} [options.tileOverlap]
     *      The number of pixels each tile is expected to overlap touching tiles.
     * @param {Number} [options.minLevel]
     *      The minimum level to attempt to load.
     * @param {Number} [options.maxLevel]
     *      The maximum level to attempt to load.
     */
    $.TileSource = function (width, height, tileSize, tileOverlap, minLevel, maxLevel) {
        var _this = this;

        var args = arguments,
            options,
            i;

        if ($.isPlainObject(width)) {
            options = width;
        } else {
            options = {
                width: args[0],
                height: args[1],
                tileSize: args[2],
                tileOverlap: args[3],
                minLevel: args[4],
                maxLevel: args[5]
            };
        }

        //Tile sources supply some events, namely 'ready' when they must be configured
        //by asynchronously fetching their configuration data.
        $.EventSource.call(this);

        //we allow options to override anything we dont treat as
        //required via idiomatic options or which is functionally
        //set depending on the state of the readiness of this tile
        //source
        $.extend(true, this, options);

        if (!this.success) {
            //Any functions that are passed as arguments are bound to the ready callback
            for (i = 0; i < arguments.length; i++) {
                if ($.isFunction(arguments[i])) {
                    this.success = arguments[i];
                    //only one callback per constructor
                    break;
                }
            }
        }

        if (this.success) {
            this.addHandler('ready', function (event) {
                _this.success(event);
            });
        }

        /**
         * Ratio of width to height
         * @member {Number} aspectRatio
         * @memberof OpenSeadragon.TileSource#
         */
        /**
         * Vector storing x and y dimensions ( width and height respectively ).
         * @member {OpenSeadragon.Point} dimensions
         * @memberof OpenSeadragon.TileSource#
         */
        /**
         * The overlap in pixels each tile shares with its adjacent neighbors.
         * @member {Number} tileOverlap
         * @memberof OpenSeadragon.TileSource#
         */
        /**
         * The minimum pyramid level this tile source supports or should attempt to load.
         * @member {Number} minLevel
         * @memberof OpenSeadragon.TileSource#
         */
        /**
         * The maximum pyramid level this tile source supports or should attempt to load.
         * @member {Number} maxLevel
         * @memberof OpenSeadragon.TileSource#
         */
        /**
         *
         * @member {Boolean} ready
         * @memberof OpenSeadragon.TileSource#
         */

        if ('string' == $.type(arguments[0])) {
            this.url = arguments[0];
        }

        if (this.url) {
            //in case the getImageInfo method is overriden and/or implies an
            //async mechanism set some safe defaults first
            this.aspectRatio = 1;
            this.dimensions = new $.Point(10, 10);
            this._tileWidth = 0;
            this._tileHeight = 0;
            this.tileOverlap = 0;
            this.minLevel = 0;
            this.maxLevel = 0;
            this.ready = false;
            //configuration via url implies the extending class
            //implements and 'configure'
            this.getImageInfo(this.url);
        } else {

            //explicit configuration via positional args in constructor
            //or the more idiomatic 'options' object
            this.ready = true;
            this.aspectRatio = options.width && options.height ? options.width / options.height : 1;
            this.dimensions = new $.Point(options.width, options.height);

            if (this.tileSize) {
                this._tileWidth = this._tileHeight = this.tileSize;
                delete this.tileSize;
            } else {
                if (this.tileWidth) {
                    // We were passed tileWidth in options, but we want to rename it
                    // with a leading underscore to make clear that it is not safe to directly modify it
                    this._tileWidth = this.tileWidth;
                    delete this.tileWidth;
                } else {
                    this._tileWidth = 0;
                }

                if (this.tileHeight) {
                    // See note above about renaming this.tileWidth
                    this._tileHeight = this.tileHeight;
                    delete this.tileHeight;
                } else {
                    this._tileHeight = 0;
                }
            }

            this.tileOverlap = options.tileOverlap ? options.tileOverlap : 0;
            this.minLevel = options.minLevel ? options.minLevel : 0;
            this.maxLevel = undefined !== options.maxLevel && null !== options.maxLevel ? options.maxLevel : options.width && options.height ? Math.ceil(Math.log(Math.max(options.width, options.height)) / Math.log(2)) : 0;
            if (this.success && $.isFunction(this.success)) {
                this.success(this);
            }
        }
    };

    $.TileSource.prototype = /** @lends OpenSeadragon.TileSource.prototype */{

        getTileSize: function getTileSize(level) {
            $.console.error("[TileSource.getTileSize] is deprecated." + "Use TileSource.getTileWidth() and TileSource.getTileHeight() instead");
            return this._tileWidth;
        },

        /**
         * Return the tileWidth for a given level.
         * Subclasses should override this if tileWidth can be different at different levels
         *   such as in IIIFTileSource.  Code should use this function rather than reading
         *   from ._tileWidth directly.
         * @function
         * @param {Number} level
         */
        getTileWidth: function getTileWidth(level) {
            if (!this._tileWidth) {
                return this.getTileSize(level);
            }
            return this._tileWidth;
        },

        /**
         * Return the tileHeight for a given level.
         * Subclasses should override this if tileHeight can be different at different levels
         *   such as in IIIFTileSource.  Code should use this function rather than reading
         *   from ._tileHeight directly.
         * @function
         * @param {Number} level
         */
        getTileHeight: function getTileHeight(level) {
            if (!this._tileHeight) {
                return this.getTileSize(level);
            }
            return this._tileHeight;
        },

        /**
         * @function
         * @param {Number} level
         */
        getLevelScale: function getLevelScale(level) {

            // see https://github.com/openseadragon/openseadragon/issues/22
            // we use the tilesources implementation of getLevelScale to generate
            // a memoized re-implementation
            var levelScaleCache = {},
                i;
            for (i = 0; i <= this.maxLevel; i++) {
                levelScaleCache[i] = 1 / Math.pow(2, this.maxLevel - i);
            }
            this.getLevelScale = function (_level) {
                return levelScaleCache[_level];
            };
            return this.getLevelScale(level);
        },

        /**
         * @function
         * @param {Number} level
         */
        getNumTiles: function getNumTiles(level) {
            var scale = this.getLevelScale(level),
                x = Math.ceil(scale * this.dimensions.x / this.getTileWidth(level)),
                y = Math.ceil(scale * this.dimensions.y / this.getTileHeight(level));

            return new $.Point(x, y);
        },

        /**
         * @function
         * @param {Number} level
         */
        getPixelRatio: function getPixelRatio(level) {
            var imageSizeScaled = this.dimensions.times(this.getLevelScale(level)),
                rx = 1.0 / imageSizeScaled.x,
                ry = 1.0 / imageSizeScaled.y;

            return new $.Point(rx, ry);
        },

        /**
         * @function
         * @param {Number} level
         */
        getClosestLevel: function getClosestLevel(rect) {
            var i, tilesPerSide, tiles;

            for (i = this.minLevel; i < this.maxLevel; i++) {
                tiles = this.getNumTiles(i);
                tilesPerSide = new $.Point(Math.floor(rect.x / this.getTileWidth(i)), Math.floor(rect.y / this.getTileHeight(i)));

                if (tiles.x + 1 >= tilesPerSide.x && tiles.y + 1 >= tilesPerSide.y) {
                    break;
                }
            }
            return Math.max(0, i - 1);
        },

        /**
         * @function
         * @param {Number} level
         * @param {OpenSeadragon.Point} point
         */
        getTileAtPoint: function getTileAtPoint(level, point) {
            var pixel = point.times(this.dimensions.x).times(this.getLevelScale(level)),
                tx = Math.floor(pixel.x / this.getTileWidth(level)),
                ty = Math.floor(pixel.y / this.getTileHeight(level));

            return new $.Point(tx, ty);
        },

        /**
         * @function
         * @param {Number} level
         * @param {Number} x
         * @param {Number} y
         */
        getTileBounds: function getTileBounds(level, x, y) {
            var dimensionsScaled = this.dimensions.times(this.getLevelScale(level)),
                tileWidth = this.getTileWidth(level),
                tileHeight = this.getTileHeight(level),
                px = x === 0 ? 0 : tileWidth * x - this.tileOverlap,
                py = y === 0 ? 0 : tileHeight * y - this.tileOverlap,
                sx = tileWidth + (x === 0 ? 1 : 2) * this.tileOverlap,
                sy = tileHeight + (y === 0 ? 1 : 2) * this.tileOverlap,
                scale = 1.0 / dimensionsScaled.x;

            sx = Math.min(sx, dimensionsScaled.x - px);
            sy = Math.min(sy, dimensionsScaled.y - py);

            return new $.Rect(px * scale, py * scale, sx * scale, sy * scale);
        },

        /**
         * Responsible for retrieving, and caching the
         * image metadata pertinent to this TileSources implementation.
         * @function
         * @param {String} url
         * @throws {Error}
         */
        getImageInfo: function getImageInfo(url) {
            var _this = this,
                callbackName,
                callback,
                readySource,
                options,
                urlParts,
                filename,
                lastDot;

            if (url) {
                urlParts = url.split('/');
                filename = urlParts[urlParts.length - 1];
                lastDot = filename.lastIndexOf('.');
                if (lastDot > -1) {
                    urlParts[urlParts.length - 1] = filename.slice(0, lastDot);
                }
            }

            callback = function (data) {
                if (typeof data === "string") {
                    data = $.parseXml(data);
                }
                var $TileSource = $.TileSource.determineType(_this, data, url);
                if (!$TileSource) {
                    /**
                     * Raised when an error occurs loading a TileSource.
                     *
                     * @event open-failed
                     * @memberof OpenSeadragon.TileSource
                     * @type {object}
                     * @property {OpenSeadragon.TileSource} eventSource - A reference to the TileSource which raised the event.
                     * @property {String} message
                     * @property {String} source
                     * @property {?Object} userData - Arbitrary subscriber-defined object.
                     */
                    _this.raiseEvent('open-failed', { message: "Unable to load TileSource", source: url });
                    return;
                }

                options = $TileSource.prototype.configure.apply(_this, [data, url]);
                if (options.ajaxWithCredentials === undefined) {
                    options.ajaxWithCredentials = _this.ajaxWithCredentials;
                }

                readySource = new $TileSource(options);
                _this.ready = true;
                /**
                 * Raised when a TileSource is opened and initialized.
                 *
                 * @event ready
                 * @memberof OpenSeadragon.TileSource
                 * @type {object}
                 * @property {OpenSeadragon.TileSource} eventSource - A reference to the TileSource which raised the event.
                 * @property {Object} tileSource
                 * @property {?Object} userData - Arbitrary subscriber-defined object.
                 */
                _this.raiseEvent('ready', { tileSource: readySource });
            };

            if (url.match(/\.js$/)) {
                //TODO: Its not very flexible to require tile sources to end jsonp
                //      request for info  with a url that ends with '.js' but for
                //      now it's the only way I see to distinguish uniformly.
                callbackName = url.split('/').pop().replace('.js', '');
                $.jsonp({
                    url: url,
                    async: false,
                    callbackName: callbackName,
                    callback: callback
                });
            } else {
                // request info via xhr asynchronously.
                $.makeAjaxRequest({
                    url: url,
                    withCredentials: this.ajaxWithCredentials,
                    success: function success(xhr) {
                        var data = processResponse(xhr);
                        callback(data);
                    },
                    error: function error(xhr, exc) {
                        var msg;

                        /*
                            IE < 10 will block XHR requests to different origins. Any property access on the request
                            object will raise an exception which we'll attempt to handle by formatting the original
                            exception rather than the second one raised when we try to access xhr.status
                         */
                        try {
                            msg = "HTTP " + xhr.status + " attempting to load TileSource";
                        } catch (e) {
                            var formattedExc;
                            if (typeof exc == "undefined" || !exc.toString) {
                                formattedExc = "Unknown error";
                            } else {
                                formattedExc = exc.toString();
                            }

                            msg = formattedExc + " attempting to load TileSource";
                        }

                        /***
                         * Raised when an error occurs loading a TileSource.
                         *
                         * @event open-failed
                         * @memberof OpenSeadragon.TileSource
                         * @type {object}
                         * @property {OpenSeadragon.TileSource} eventSource - A reference to the TileSource which raised the event.
                         * @property {String} message
                         * @property {String} source
                         * @property {?Object} userData - Arbitrary subscriber-defined object.
                         */
                        _this.raiseEvent('open-failed', {
                            message: msg,
                            source: url
                        });
                    }
                });
            }
        },

        /**
         * Responsible determining if a the particular TileSource supports the
         * data format ( and allowed to apply logic against the url the data was
         * loaded from, if any ). Overriding implementations are expected to do
         * something smart with data and / or url to determine support.  Also
         * understand that iteration order of TileSources is not guarunteed so
         * please make sure your data or url is expressive enough to ensure a simple
         * and sufficient mechanisim for clear determination.
         * @function
         * @param {String|Object|Array|Document} data
         * @param {String} url - the url the data was loaded
         *      from if any.
         * @return {Boolean}
         */
        supports: function supports(data, url) {
            return false;
        },

        /**
         * Responsible for parsing and configuring the
         * image metadata pertinent to this TileSources implementation.
         * This method is not implemented by this class other than to throw an Error
         * announcing you have to implement it.  Because of the variety of tile
         * server technologies, and various specifications for building image
         * pyramids, this method is here to allow easy integration.
         * @function
         * @param {String|Object|Array|Document} data
         * @param {String} url - the url the data was loaded
         *      from if any.
         * @return {Object} options - A dictionary of keyword arguments sufficient
         *      to configure this tile sources constructor.
         * @throws {Error}
         */
        configure: function configure(data, url) {
            throw new Error("Method not implemented.");
        },

        /**
         * Responsible for retriving the url which will return an image for the
         * region speified by the given x, y, and level components.
         * This method is not implemented by this class other than to throw an Error
         * announcing you have to implement it.  Because of the variety of tile
         * server technologies, and various specifications for building image
         * pyramids, this method is here to allow easy integration.
         * @function
         * @param {Number} level
         * @param {Number} x
         * @param {Number} y
         * @throws {Error}
         */
        getTileUrl: function getTileUrl(level, x, y) {
            throw new Error("Method not implemented.");
        },

        /**
         * @function
         * @param {Number} level
         * @param {Number} x
         * @param {Number} y
         */
        tileExists: function tileExists(level, x, y) {
            var numTiles = this.getNumTiles(level);
            return level >= this.minLevel && level <= this.maxLevel && x >= 0 && y >= 0 && x < numTiles.x && y < numTiles.y;
        }
    };

    $.extend(true, $.TileSource.prototype, $.EventSource.prototype);

    /**
     * Decides whether to try to process the response as xml, json, or hand back
     * the text
     * @private
     * @inner
     * @function
     * @param {XMLHttpRequest} xhr - the completed network request
     */
    function processResponse(xhr) {
        var responseText = xhr.responseText,
            status = xhr.status,
            statusText,
            data;

        if (!xhr) {
            throw new Error($.getString("Errors.Security"));
        } else if (xhr.status !== 200 && xhr.status !== 0) {
            status = xhr.status;
            statusText = status == 404 ? "Not Found" : xhr.statusText;
            throw new Error($.getString("Errors.Status", status, statusText));
        }

        if (responseText.match(/\s*<.*/)) {
            try {
                data = xhr.responseXML && xhr.responseXML.documentElement ? xhr.responseXML : $.parseXml(responseText);
            } catch (e) {
                data = xhr.responseText;
            }
        } else if (responseText.match(/\s*[\{\[].*/)) {
            data = $.parseJSON(responseText);
        } else {
            data = responseText;
        }
        return data;
    }

    /**
     * Determines the TileSource Implementation by introspection of OpenSeadragon
     * namespace, calling each TileSource implementation of 'isType'
     * @private
     * @inner
     * @function
     * @param {Object|Array|Document} data - the tile source configuration object
     * @param {String} url - the url where the tile source configuration object was
     *      loaded from, if any.
     */
    $.TileSource.determineType = function (tileSource, data, url) {
        var property;
        for (property in OpenSeadragon) {
            if (property.match(/.+TileSource$/) && $.isFunction(OpenSeadragon[property]) && $.isFunction(OpenSeadragon[property].prototype.supports) && OpenSeadragon[property].prototype.supports.call(tileSource, data, url)) {
                return OpenSeadragon[property];
            }
        }

        $.console.error("No TileSource was able to open %s %s", url, data);
    };
})(OpenSeadragon);

/*
 * OpenSeadragon - DziTileSource
 *
 * Copyright (C) 2009 CodePlex Foundation
 * Copyright (C) 2010-2013 OpenSeadragon contributors
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 * - Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 *
 * - Neither the name of CodePlex Foundation nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

(function ($) {

    /**
     * @class DziTileSource
     * @memberof OpenSeadragon
     * @extends OpenSeadragon.TileSource
     * @param {Number|Object} width - the pixel width of the image or the idiomatic
     *      options object which is used instead of positional arguments.
     * @param {Number} height
     * @param {Number} tileSize
     * @param {Number} tileOverlap
     * @param {String} tilesUrl
     * @param {String} fileFormat
     * @param {OpenSeadragon.DisplayRect[]} displayRects
     * @property {String} tilesUrl
     * @property {String} fileFormat
     * @property {OpenSeadragon.DisplayRect[]} displayRects
     */
    $.DziTileSource = function (width, height, tileSize, tileOverlap, tilesUrl, fileFormat, displayRects, minLevel, maxLevel) {
        var i, rect, level, options;

        if ($.isPlainObject(width)) {
            options = width;
        } else {
            options = {
                width: arguments[0],
                height: arguments[1],
                tileSize: arguments[2],
                tileOverlap: arguments[3],
                tilesUrl: arguments[4],
                fileFormat: arguments[5],
                displayRects: arguments[6],
                minLevel: arguments[7],
                maxLevel: arguments[8]
            };
        }

        this._levelRects = {};
        this.tilesUrl = options.tilesUrl;
        this.fileFormat = options.fileFormat;
        this.displayRects = options.displayRects;

        if (this.displayRects) {
            for (i = this.displayRects.length - 1; i >= 0; i--) {
                rect = this.displayRects[i];
                for (level = rect.minLevel; level <= rect.maxLevel; level++) {
                    if (!this._levelRects[level]) {
                        this._levelRects[level] = [];
                    }
                    this._levelRects[level].push(rect);
                }
            }
        }

        $.TileSource.apply(this, [options]);
    };

    $.extend($.DziTileSource.prototype, $.TileSource.prototype, /** @lends OpenSeadragon.DziTileSource.prototype */{

        /**
         * Determine if the data and/or url imply the image service is supported by
         * this tile source.
         * @function
         * @param {Object|Array} data
         * @param {String} optional - url
         */
        supports: function supports(data, url) {
            var ns;
            if (data.Image) {
                ns = data.Image.xmlns;
            } else if (data.documentElement) {
                if ("Image" == data.documentElement.localName || "Image" == data.documentElement.tagName) {
                    ns = data.documentElement.namespaceURI;
                }
            }

            return "http://schemas.microsoft.com/deepzoom/2008" == ns || "http://schemas.microsoft.com/deepzoom/2009" == ns;
        },

        /**
         *
         * @function
         * @param {Object|XMLDocument} data - the raw configuration
         * @param {String} url - the url the data was retreived from if any.
         * @return {Object} options - A dictionary of keyword arguments sufficient
         *      to configure this tile sources constructor.
         */
        configure: function configure(data, url) {

            var options;

            if (!$.isPlainObject(data)) {

                options = configureFromXML(this, data);
            } else {

                options = configureFromObject(this, data);
            }

            if (url && !options.tilesUrl) {
                options.tilesUrl = url.replace(/([^\/]+)\.(dzi|xml|js)(\?.*|$)/, '$1_files/');

                if (url.search(/\.(dzi|xml|js)\?/) != -1) {
                    options.queryParams = url.match(/\?.*/);
                } else {
                    options.queryParams = '';
                }
            }

            return options;
        },

        /**
         * @function
         * @param {Number} level
         * @param {Number} x
         * @param {Number} y
         */
        getTileUrl: function getTileUrl(level, x, y) {
            return [this.tilesUrl, level, '/', x, '_', y, '.', this.fileFormat, this.queryParams].join('');
        },

        /**
         * @function
         * @param {Number} level
         * @param {Number} x
         * @param {Number} y
         */
        tileExists: function tileExists(level, x, y) {
            var rects = this._levelRects[level],
                rect,
                scale,
                xMin,
                yMin,
                xMax,
                yMax,
                i;

            if (!rects || !rects.length) {
                return true;
            }

            for (i = rects.length - 1; i >= 0; i--) {
                rect = rects[i];

                if (level < rect.minLevel || level > rect.maxLevel) {
                    continue;
                }

                scale = this.getLevelScale(level);
                xMin = rect.x * scale;
                yMin = rect.y * scale;
                xMax = xMin + rect.width * scale;
                yMax = yMin + rect.height * scale;

                xMin = Math.floor(xMin / this.tileSize);
                yMin = Math.floor(yMin / this.tileSize);
                xMax = Math.ceil(xMax / this.tileSize);
                yMax = Math.ceil(yMax / this.tileSize);

                if (xMin <= x && x < xMax && yMin <= y && y < yMax) {
                    return true;
                }
            }

            return false;
        }
    });

    /**
     * @private
     * @inner
     * @function
     */
    function configureFromXML(tileSource, xmlDoc) {

        if (!xmlDoc || !xmlDoc.documentElement) {
            throw new Error($.getString("Errors.Xml"));
        }

        var root = xmlDoc.documentElement,
            rootName = root.localName || root.tagName,
            ns = xmlDoc.documentElement.namespaceURI,
            configuration = null,
            displayRects = [],
            dispRectNodes,
            dispRectNode,
            rectNode,
            sizeNode,
            i;

        if (rootName == "Image") {

            try {
                sizeNode = root.getElementsByTagName("Size")[0];
                if (sizeNode === undefined) {
                    sizeNode = root.getElementsByTagNameNS(ns, "Size")[0];
                }

                configuration = {
                    Image: {
                        xmlns: "http://schemas.microsoft.com/deepzoom/2008",
                        Url: root.getAttribute("Url"),
                        Format: root.getAttribute("Format"),
                        DisplayRect: null,
                        Overlap: parseInt(root.getAttribute("Overlap"), 10),
                        TileSize: parseInt(root.getAttribute("TileSize"), 10),
                        Size: {
                            Height: parseInt(sizeNode.getAttribute("Height"), 10),
                            Width: parseInt(sizeNode.getAttribute("Width"), 10)
                        }
                    }
                };

                if (!$.imageFormatSupported(configuration.Image.Format)) {
                    throw new Error($.getString("Errors.ImageFormat", configuration.Image.Format.toUpperCase()));
                }

                dispRectNodes = root.getElementsByTagName("DisplayRect");
                if (dispRectNodes === undefined) {
                    dispRectNodes = root.getElementsByTagNameNS(ns, "DisplayRect")[0];
                }

                for (i = 0; i < dispRectNodes.length; i++) {
                    dispRectNode = dispRectNodes[i];
                    rectNode = dispRectNode.getElementsByTagName("Rect")[0];
                    if (rectNode === undefined) {
                        rectNode = dispRectNode.getElementsByTagNameNS(ns, "Rect")[0];
                    }

                    displayRects.push({
                        Rect: {
                            X: parseInt(rectNode.getAttribute("X"), 10),
                            Y: parseInt(rectNode.getAttribute("Y"), 10),
                            Width: parseInt(rectNode.getAttribute("Width"), 10),
                            Height: parseInt(rectNode.getAttribute("Height"), 10),
                            MinLevel: parseInt(dispRectNode.getAttribute("MinLevel"), 10),
                            MaxLevel: parseInt(dispRectNode.getAttribute("MaxLevel"), 10)
                        }
                    });
                }

                if (displayRects.length) {
                    configuration.Image.DisplayRect = displayRects;
                }

                return configureFromObject(tileSource, configuration);
            } catch (e) {
                throw e instanceof Error ? e : new Error($.getString("Errors.Dzi"));
            }
        } else if (rootName == "Collection") {
            throw new Error($.getString("Errors.Dzc"));
        } else if (rootName == "Error") {
            return $._processDZIError(root);
        }

        throw new Error($.getString("Errors.Dzi"));
    }

    /**
     * @private
     * @inner
     * @function
     */
    function configureFromObject(tileSource, configuration) {
        var imageData = configuration.Image,
            tilesUrl = imageData.Url,
            fileFormat = imageData.Format,
            sizeData = imageData.Size,
            dispRectData = imageData.DisplayRect || [],
            width = parseInt(sizeData.Width, 10),
            height = parseInt(sizeData.Height, 10),
            tileSize = parseInt(imageData.TileSize, 10),
            tileOverlap = parseInt(imageData.Overlap, 10),
            displayRects = [],
            rectData,
            i;

        //TODO: need to figure out out to better handle image format compatibility
        //      which actually includes additional file formats like xml and pdf
        //      and plain text for various tilesource implementations to avoid low
        //      level errors.
        //
        //      For now, just don't perform the check.
        //
        /*if ( !imageFormatSupported( fileFormat ) ) {
            throw new Error(
                $.getString( "Errors.ImageFormat", fileFormat.toUpperCase() )
            );
        }*/

        for (i = 0; i < dispRectData.length; i++) {
            rectData = dispRectData[i].Rect;

            displayRects.push(new $.DisplayRect(parseInt(rectData.X, 10), parseInt(rectData.Y, 10), parseInt(rectData.Width, 10), parseInt(rectData.Height, 10), parseInt(rectData.MinLevel, 10), parseInt(rectData.MaxLevel, 10)));
        }

        return $.extend(true, {
            width: width, /* width *required */
            height: height, /* height *required */
            tileSize: tileSize, /* tileSize *required */
            tileOverlap: tileOverlap, /* tileOverlap *required */
            minLevel: null, /* minLevel */
            maxLevel: null, /* maxLevel */
            tilesUrl: tilesUrl, /* tilesUrl */
            fileFormat: fileFormat, /* fileFormat */
            displayRects: displayRects /* displayRects */
        }, configuration);
    }
})(OpenSeadragon);

/*
 * OpenSeadragon - IIIFTileSource
 *
 * Copyright (C) 2009 CodePlex Foundation
 * Copyright (C) 2010-2013 OpenSeadragon contributors
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 * - Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 *
 * - Neither the name of CodePlex Foundation nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

(function ($) {

    /**
     * @class IIIFTileSource
     * @classdesc A client implementation of the International Image Interoperability
     * Format: Image API 1.0 - 2.0
     *
     * @memberof OpenSeadragon
     * @extends OpenSeadragon.TileSource
     * @see http://iiif.io/api/image/
     */
    $.IIIFTileSource = function (options) {

        $.extend(true, this, options);

        if (!(this.height && this.width && this['@id'])) {
            throw new Error('IIIF required parameters not provided.');
        }

        options.tileSizePerScaleFactor = {};

        // N.B. 2.0 renamed scale_factors to scaleFactors
        if (this.tile_width && this.tile_height) {
            options.tileWidth = this.tile_width;
            options.tileHeight = this.tile_height;
        } else if (this.tile_width) {
            options.tileSize = this.tile_width;
        } else if (this.tile_height) {
            options.tileSize = this.tile_height;
        } else if (this.tiles) {
            // Version 2.0 forwards
            if (this.tiles.length == 1) {
                options.tileWidth = this.tiles[0].width;
                // Use height if provided, otherwise assume square tiles and use width.
                options.tileHeight = this.tiles[0].height || this.tiles[0].width;
                this.scale_factors = this.tiles[0].scaleFactors;
            } else {
                // Multiple tile sizes at different levels
                this.scale_factors = [];
                for (var t = 0; t < this.tiles.length; t++) {
                    for (var sf = 0; sf < this.tiles[t].scaleFactors.length; sf++) {
                        var scaleFactor = this.tiles[t].scaleFactors[sf];
                        this.scale_factors.push(scaleFactor);
                        options.tileSizePerScaleFactor[scaleFactor] = {
                            width: this.tiles[t].width,
                            height: this.tiles[t].height || this.tiles[t].width
                        };
                    }
                }
            }
        } else {
            // use the largest of tileOptions that is smaller than the short dimension
            var shortDim = Math.min(this.height, this.width),
                tileOptions = [256, 512, 1024],
                smallerTiles = [];

            for (var c = 0; c < tileOptions.length; c++) {
                if (tileOptions[c] <= shortDim) {
                    smallerTiles.push(tileOptions[c]);
                }
            }

            if (smallerTiles.length > 0) {
                options.tileSize = Math.max.apply(null, smallerTiles);
            } else {
                // If we're smaller than 256, just use the short side.
                options.tileSize = shortDim;
            }
        }

        if (!options.maxLevel) {
            if (!this.scale_factors) {
                options.maxLevel = Number(Math.ceil(Math.log(Math.max(this.width, this.height), 2)));
            } else {
                options.maxLevel = Math.floor(Math.pow(Math.max.apply(null, this.scale_factors), 0.5));
            }
        }

        $.TileSource.apply(this, [options]);
    };

    $.extend($.IIIFTileSource.prototype, $.TileSource.prototype, /** @lends OpenSeadragon.IIIFTileSource.prototype */{
        /**
         * Determine if the data and/or url imply the image service is supported by
         * this tile source.
         * @function
         * @param {Object|Array} data
         * @param {String} optional - url
         */

        supports: function supports(data, url) {
            // Version 2.0 and forwards
            if (data.protocol && data.protocol == 'http://iiif.io/api/image') {
                return true;
                // Version 1.1
            } else if (data['@context'] && (data['@context'] == "http://library.stanford.edu/iiif/image-api/1.1/context.json" || data['@context'] == "http://iiif.io/api/image/1/context.json")) {
                    // N.B. the iiif.io context is wrong, but where the representation lives so likely to be used
                    return true;

                    // Version 1.0
                } else if (data.profile && data.profile.indexOf("http://library.stanford.edu/iiif/image-api/compliance.html") === 0) {
                        return true;
                    } else if (data.identifier && data.width && data.height) {
                        return true;
                    } else if (data.documentElement && "info" == data.documentElement.tagName && "http://library.stanford.edu/iiif/image-api/ns/" == data.documentElement.namespaceURI) {
                        return true;

                        // Not IIIF
                    } else {
                            return false;
                        }
        },

        /**
         *
         * @function
         * @param {Object} data - the raw configuration
         * @example <caption>IIIF 1.1 Info Looks like this</caption>
         * {
         *   "@context" : "http://library.stanford.edu/iiif/image-api/1.1/context.json",
         *   "@id" : "http://iiif.example.com/prefix/1E34750D-38DB-4825-A38A-B60A345E591C",
         *   "width" : 6000,
         *   "height" : 4000,
         *   "scale_factors" : [ 1, 2, 4 ],
         *   "tile_width" : 1024,
         *   "tile_height" : 1024,
         *   "formats" : [ "jpg", "png" ],
         *   "qualities" : [ "native", "grey" ],
         *   "profile" : "http://library.stanford.edu/iiif/image-api/1.1/compliance.html#level0"
         * }
         */
        configure: function configure(data, url) {
            // Try to deduce our version and fake it upwards if needed
            if (!$.isPlainObject(data)) {
                var options = configureFromXml10(data);
                options['@context'] = "http://iiif.io/api/image/1.0/context.json";
                options['@id'] = url.replace('/info.xml', '');
                return options;
            } else if (!data['@context']) {
                data['@context'] = 'http://iiif.io/api/image/1.0/context.json';
                data['@id'] = url.replace('/info.json', '');
                return data;
            } else {
                return data;
            }
        },

        /**
         * Return the tileWidth for the given level.
         * @function
         * @param {Number} level
         */
        getTileWidth: function getTileWidth(level) {
            var scaleFactor = Math.pow(2, this.maxLevel - level);

            if (this.tileSizePerScaleFactor && this.tileSizePerScaleFactor[scaleFactor]) {
                return this.tileSizePerScaleFactor[scaleFactor].width;
            }
            return this._tileWidth;
        },

        /**
         * Return the tileHeight for the given level.
         * @function
         * @param {Number} level
         */
        getTileHeight: function getTileHeight(level) {
            var scaleFactor = Math.pow(2, this.maxLevel - level);

            if (this.tileSizePerScaleFactor && this.tileSizePerScaleFactor[scaleFactor]) {
                return this.tileSizePerScaleFactor[scaleFactor].height;
            }
            return this._tileHeight;
        },

        /**
         * Responsible for retreiving the url which will return an image for the
         * region specified by the given x, y, and level components.
         * @function
         * @param {Number} level - z index
         * @param {Number} x
         * @param {Number} y
         * @throws {Error}
         */
        getTileUrl: function getTileUrl(level, x, y) {

            //# constants
            var IIIF_ROTATION = '0',

            //## get the scale (level as a decimal)
            scale = Math.pow(0.5, this.maxLevel - level),

            //# image dimensions at this level
            levelWidth = Math.ceil(this.width * scale),
                levelHeight = Math.ceil(this.height * scale),

            //## iiif region
            tileWidth,
                tileHeight,
                iiifTileSizeWidth,
                iiifTileSizeHeight,
                iiifRegion,
                iiifTileX,
                iiifTileY,
                iiifTileW,
                iiifTileH,
                iiifSize,
                iiifQuality,
                uri;

            tileWidth = this.getTileWidth(level);
            tileHeight = this.getTileHeight(level);
            iiifTileSizeWidth = Math.ceil(tileWidth / scale);
            iiifTileSizeHeight = Math.ceil(tileHeight / scale);

            if (this['@context'].indexOf('/1.0/context.json') > -1 || this['@context'].indexOf('/1.1/context.json') > -1 || this['@context'].indexOf('/1/context.json') > -1) {
                iiifQuality = "native.jpg";
            } else {
                iiifQuality = "default.jpg";
            }

            if (levelWidth < tileWidth && levelHeight < tileHeight) {
                iiifSize = levelWidth + ",";
                iiifRegion = 'full';
            } else {
                iiifTileX = x * iiifTileSizeWidth;
                iiifTileY = y * iiifTileSizeHeight;
                iiifTileW = Math.min(iiifTileSizeWidth, this.width - iiifTileX);
                iiifTileH = Math.min(iiifTileSizeHeight, this.height - iiifTileY);
                iiifSize = Math.ceil(iiifTileW * scale) + ",";
                iiifRegion = [iiifTileX, iiifTileY, iiifTileW, iiifTileH].join(',');
            }
            uri = [this['@id'], iiifRegion, iiifSize, IIIF_ROTATION, iiifQuality].join('/');

            return uri;
        }

    });

    function configureFromXml10(xmlDoc) {
        //parse the xml
        if (!xmlDoc || !xmlDoc.documentElement) {
            throw new Error($.getString("Errors.Xml"));
        }

        var root = xmlDoc.documentElement,
            rootName = root.tagName,
            configuration = null;

        if (rootName == "info") {
            try {
                configuration = {};
                parseXML10(root, configuration);
                return configuration;
            } catch (e) {
                throw e instanceof Error ? e : new Error($.getString("Errors.IIIF"));
            }
        }
        throw new Error($.getString("Errors.IIIF"));
    }

    function parseXML10(node, configuration, property) {
        var i, value;
        if (node.nodeType == 3 && property) {
            //text node
            value = node.nodeValue.trim();
            if (value.match(/^\d*$/)) {
                value = Number(value);
            }
            if (!configuration[property]) {
                configuration[property] = value;
            } else {
                if (!$.isArray(configuration[property])) {
                    configuration[property] = [configuration[property]];
                }
                configuration[property].push(value);
            }
        } else if (node.nodeType == 1) {
            for (i = 0; i < node.childNodes.length; i++) {
                parseXML10(node.childNodes[i], configuration, node.nodeName);
            }
        }
    }
})(OpenSeadragon);

/*
 * OpenSeadragon - OsmTileSource
 *
 * Copyright (C) 2009 CodePlex Foundation
 * Copyright (C) 2010-2013 OpenSeadragon contributors
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 * - Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 *
 * - Neither the name of CodePlex Foundation nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/*
 * Derived from the OSM tile source in Rainer Simon's seajax-utils project
 * <http://github.com/rsimon/seajax-utils>.  Rainer Simon has contributed
 * the included code to the OpenSeadragon project under the New BSD license;
 * see <https://github.com/openseadragon/openseadragon/issues/58>.
 */

(function ($) {

    /**
     * @class OsmTileSource
     * @classdesc A tilesource implementation for OpenStreetMap.<br><br>
     *
     * Note 1. Zoomlevels. Deep Zoom and OSM define zoom levels differently. In  Deep
     * Zoom, level 0 equals an image of 1x1 pixels. In OSM, level 0 equals an image of
     * 256x256 levels (see http://gasi.ch/blog/inside-deep-zoom-2). I.e. there is a
     * difference of log2(256)=8 levels.<br><br>
     *
     * Note 2. Image dimension. According to the OSM Wiki
     * (http://wiki.openstreetmap.org/wiki/Slippy_map_tilenames#Zoom_levels)
     * the highest Mapnik zoom level has 256.144x256.144 tiles, with a 256x256
     * pixel size. I.e. the Deep Zoom image dimension is 65.572.864x65.572.864
     * pixels.
     *
     * @memberof OpenSeadragon
     * @extends OpenSeadragon.TileSource
     * @param {Number|Object} width - the pixel width of the image or the idiomatic
     *      options object which is used instead of positional arguments.
     * @param {Number} height
     * @param {Number} tileSize
     * @param {Number} tileOverlap
     * @param {String} tilesUrl
     */
    $.OsmTileSource = function (width, height, tileSize, tileOverlap, tilesUrl) {
        var options;

        if ($.isPlainObject(width)) {
            options = width;
        } else {
            options = {
                width: arguments[0],
                height: arguments[1],
                tileSize: arguments[2],
                tileOverlap: arguments[3],
                tilesUrl: arguments[4]
            };
        }
        //apply default setting for standard public OpenStreatMaps service
        //but allow them to be specified so fliks can host there own instance
        //or apply against other services supportting the same standard
        if (!options.width || !options.height) {
            options.width = 65572864;
            options.height = 65572864;
        }
        if (!options.tileSize) {
            options.tileSize = 256;
            options.tileOverlap = 0;
        }
        if (!options.tilesUrl) {
            options.tilesUrl = "http://tile.openstreetmap.org/";
        }
        options.minLevel = 8;

        $.TileSource.apply(this, [options]);
    };

    $.extend($.OsmTileSource.prototype, $.TileSource.prototype, /** @lends OpenSeadragon.OsmTileSource.prototype */{

        /**
         * Determine if the data and/or url imply the image service is supported by
         * this tile source.
         * @function
         * @param {Object|Array} data
         * @param {String} optional - url
         */
        supports: function supports(data, url) {
            return data.type && "openstreetmaps" == data.type;
        },

        /**
         *
         * @function
         * @param {Object} data - the raw configuration
         * @param {String} url - the url the data was retreived from if any.
         * @return {Object} options - A dictionary of keyword arguments sufficient
         *      to configure this tile sources constructor.
         */
        configure: function configure(data, url) {
            return data;
        },

        /**
         * @function
         * @param {Number} level
         * @param {Number} x
         * @param {Number} y
         */
        getTileUrl: function getTileUrl(level, x, y) {
            return this.tilesUrl + (level - 8) + "/" + x + "/" + y + ".png";
        }
    });
})(OpenSeadragon);

/*
 * OpenSeadragon - TmsTileSource
 *
 * Copyright (C) 2009 CodePlex Foundation
 * Copyright (C) 2010-2013 OpenSeadragon contributors
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 * - Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 *
 * - Neither the name of CodePlex Foundation nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/*
 * Derived from the TMS tile source in Rainer Simon's seajax-utils project
 * <http://github.com/rsimon/seajax-utils>.  Rainer Simon has contributed
 * the included code to the OpenSeadragon project under the New BSD license;
 * see <https://github.com/openseadragon/openseadragon/issues/58>.
 */

(function ($) {

    /**
     * @class TmsTileSource
     * @classdesc A tilesource implementation for Tiled Map Services (TMS).
     * TMS tile scheme ( [ as supported by OpenLayers ] is described here
     * ( http://openlayers.org/dev/examples/tms.html ).
     *
     * @memberof OpenSeadragon
     * @extends OpenSeadragon.TileSource
     * @param {Number|Object} width - the pixel width of the image or the idiomatic
     *      options object which is used instead of positional arguments.
     * @param {Number} height
     * @param {Number} tileSize
     * @param {Number} tileOverlap
     * @param {String} tilesUrl
     */
    $.TmsTileSource = function (width, height, tileSize, tileOverlap, tilesUrl) {
        var options;

        if ($.isPlainObject(width)) {
            options = width;
        } else {
            options = {
                width: arguments[0],
                height: arguments[1],
                tileSize: arguments[2],
                tileOverlap: arguments[3],
                tilesUrl: arguments[4]
            };
        }
        // TMS has integer multiples of 256 for width/height and adds buffer
        // if necessary -> account for this!
        var bufferedWidth = Math.ceil(options.width / 256) * 256,
            bufferedHeight = Math.ceil(options.height / 256) * 256,
            max;

        // Compute number of zoomlevels in this tileset
        if (bufferedWidth > bufferedHeight) {
            max = bufferedWidth / 256;
        } else {
            max = bufferedHeight / 256;
        }
        options.maxLevel = Math.ceil(Math.log(max) / Math.log(2)) - 1;
        options.tileSize = 256;
        options.width = bufferedWidth;
        options.height = bufferedHeight;

        $.TileSource.apply(this, [options]);
    };

    $.extend($.TmsTileSource.prototype, $.TileSource.prototype, /** @lends OpenSeadragon.TmsTileSource.prototype */{

        /**
         * Determine if the data and/or url imply the image service is supported by
         * this tile source.
         * @function
         * @param {Object|Array} data
         * @param {String} optional - url
         */
        supports: function supports(data, url) {
            return data.type && "tiledmapservice" == data.type;
        },

        /**
         *
         * @function
         * @param {Object} data - the raw configuration
         * @param {String} url - the url the data was retreived from if any.
         * @return {Object} options - A dictionary of keyword arguments sufficient
         *      to configure this tile sources constructor.
         */
        configure: function configure(data, url) {
            return data;
        },

        /**
         * @function
         * @param {Number} level
         * @param {Number} x
         * @param {Number} y
         */
        getTileUrl: function getTileUrl(level, x, y) {
            // Convert from Deep Zoom definition to TMS zoom definition
            var yTiles = this.getNumTiles(level).y - 1;

            return this.tilesUrl + level + "/" + x + "/" + (yTiles - y) + ".png";
        }
    });
})(OpenSeadragon);

/*
 * OpenSeadragon - LegacyTileSource
 *
 * Copyright (C) 2009 CodePlex Foundation
 * Copyright (C) 2010-2013 OpenSeadragon contributors
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 * - Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 *
 * - Neither the name of CodePlex Foundation nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

(function ($) {

    /**
     * @class LegacyTileSource
     * @classdesc The LegacyTileSource allows simple, traditional image pyramids to be loaded
     * into an OpenSeadragon Viewer.  Basically, this translates to the historically
     * common practice of starting with a 'master' image, maybe a tiff for example,
     * and generating a set of 'service' images like one or more thumbnails, a medium
     * resolution image and a high resolution image in standard web formats like
     * png or jpg.
     *
     * @memberof OpenSeadragon
     * @extends OpenSeadragon.TileSource
     * @param {Array} levels An array of file descriptions, each is an object with
     *      a 'url', a 'width', and a 'height'.  Overriding classes can expect more
     *      properties but these properties are sufficient for this implementation.
     *      Additionally, the levels are required to be listed in order from
     *      smallest to largest.
     * @property {Number} aspectRatio
     * @property {Number} dimensions
     * @property {Number} tileSize
     * @property {Number} tileOverlap
     * @property {Number} minLevel
     * @property {Number} maxLevel
     * @property {Array}  levels
     */
    $.LegacyTileSource = function (levels) {

        var options, width, height;

        if ($.isArray(levels)) {
            options = {
                type: 'legacy-image-pyramid',
                levels: levels
            };
        }

        //clean up the levels to make sure we support all formats
        options.levels = filterFiles(options.levels);

        if (options.levels.length > 0) {
            width = options.levels[options.levels.length - 1].width;
            height = options.levels[options.levels.length - 1].height;
        } else {
            width = 0;
            height = 0;
            $.console.error("No supported image formats found");
        }

        $.extend(true, options, {
            width: width,
            height: height,
            tileSize: Math.max(height, width),
            tileOverlap: 0,
            minLevel: 0,
            maxLevel: options.levels.length > 0 ? options.levels.length - 1 : 0
        });

        $.TileSource.apply(this, [options]);

        this.levels = options.levels;
    };

    $.extend($.LegacyTileSource.prototype, $.TileSource.prototype, /** @lends OpenSeadragon.LegacyTileSource.prototype */{
        /**
         * Determine if the data and/or url imply the image service is supported by
         * this tile source.
         * @function
         * @param {Object|Array} data
         * @param {String} optional - url
         */
        supports: function supports(data, url) {
            return data.type && "legacy-image-pyramid" == data.type || data.documentElement && "legacy-image-pyramid" == data.documentElement.getAttribute('type');
        },

        /**
         *
         * @function
         * @param {Object|XMLDocument} configuration - the raw configuration
         * @param {String} dataUrl - the url the data was retreived from if any.
         * @return {Object} options - A dictionary of keyword arguments sufficient
         *      to configure this tile sources constructor.
         */
        configure: function configure(configuration, dataUrl) {

            var options;

            if (!$.isPlainObject(configuration)) {

                options = configureFromXML(this, configuration);
            } else {

                options = configureFromObject(this, configuration);
            }

            return options;
        },

        /**
         * @function
         * @param {Number} level
         */
        getLevelScale: function getLevelScale(level) {
            var levelScale = NaN;
            if (this.levels.length > 0 && level >= this.minLevel && level <= this.maxLevel) {
                levelScale = this.levels[level].width / this.levels[this.maxLevel].width;
            }
            return levelScale;
        },

        /**
         * @function
         * @param {Number} level
         */
        getNumTiles: function getNumTiles(level) {
            var scale = this.getLevelScale(level);
            if (scale) {
                return new $.Point(1, 1);
            } else {
                return new $.Point(0, 0);
            }
        },

        /**
         * @function
         * @param {Number} level
         * @param {OpenSeadragon.Point} point
         */
        getTileAtPoint: function getTileAtPoint(level, point) {
            return new $.Point(0, 0);
        },

        /**
         * This method is not implemented by this class other than to throw an Error
         * announcing you have to implement it.  Because of the variety of tile
         * server technologies, and various specifications for building image
         * pyramids, this method is here to allow easy integration.
         * @function
         * @param {Number} level
         * @param {Number} x
         * @param {Number} y
         * @throws {Error}
         */
        getTileUrl: function getTileUrl(level, x, y) {
            var url = null;
            if (this.levels.length > 0 && level >= this.minLevel && level <= this.maxLevel) {
                url = this.levels[level].url;
            }
            return url;
        }
    });

    /**
     * This method removes any files from the Array which dont conform to our
     * basic requirements for a 'level' in the LegacyTileSource.
     * @private
     * @inner
     * @function
     */
    function filterFiles(files) {
        var filtered = [],
            file,
            i;
        for (i = 0; i < files.length; i++) {
            file = files[i];
            if (file.height && file.width && file.url && (file.url.toLowerCase().match(/^.*\.(png|jpg|jpeg|gif)$/) || file.mimetype && file.mimetype.toLowerCase().match(/^.*\/(png|jpg|jpeg|gif)$/))) {
                //This is sufficient to serve as a level
                filtered.push({
                    url: file.url,
                    width: Number(file.width),
                    height: Number(file.height)
                });
            } else {
                $.console.error('Unsupported image format: %s', file.url ? file.url : '<no URL>');
            }
        }

        return filtered.sort(function (a, b) {
            return a.height - b.height;
        });
    }

    /**
     * @private
     * @inner
     * @function
     */
    function configureFromXML(tileSource, xmlDoc) {

        if (!xmlDoc || !xmlDoc.documentElement) {
            throw new Error($.getString("Errors.Xml"));
        }

        var root = xmlDoc.documentElement,
            rootName = root.tagName,
            conf = null,
            levels = [],
            level,
            i;

        if (rootName == "image") {

            try {
                conf = {
                    type: root.getAttribute("type"),
                    levels: []
                };

                levels = root.getElementsByTagName("level");
                for (i = 0; i < levels.length; i++) {
                    level = levels[i];

                    conf.levels.push({
                        url: level.getAttribute("url"),
                        width: parseInt(level.getAttribute("width"), 10),
                        height: parseInt(level.getAttribute("height"), 10)
                    });
                }

                return configureFromObject(tileSource, conf);
            } catch (e) {
                throw e instanceof Error ? e : new Error('Unknown error parsing Legacy Image Pyramid XML.');
            }
        } else if (rootName == "collection") {
            throw new Error('Legacy Image Pyramid Collections not yet supported.');
        } else if (rootName == "error") {
            throw new Error('Error: ' + xmlDoc);
        }

        throw new Error('Unknown element ' + rootName);
    }

    /**
     * @private
     * @inner
     * @function
     */
    function configureFromObject(tileSource, configuration) {

        return configuration.levels;
    }
})(OpenSeadragon);

/*
 * OpenSeadragon - ImageTileSource
 *
 * Copyright (C) 2009 CodePlex Foundation
 * Copyright (C) 2010-2013 OpenSeadragon contributors
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 * - Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 *
 * - Neither the name of CodePlex Foundation nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

(function ($) {

    /**
     * @class ImageTileSource
     * @classdesc The ImageTileSource allows a simple image to be loaded
     * into an OpenSeadragon Viewer.
     * There are 2 ways to open an ImageTileSource:
     * 1. viewer.open({type: 'image', url: fooUrl});
     * 2. viewer.open(new OpenSeadragon.ImageTileSource({url: fooUrl}));
     *
     * With the first syntax, the crossOriginPolicy, ajaxWithCredentials and
     * useCanvas options are inherited from the viewer if they are not
     * specified directly in the options object.
     *
     * @memberof OpenSeadragon
     * @extends OpenSeadragon.TileSource
     * @param {Object} options Options object.
     * @param {String} options.url URL of the image
     * @param {Boolean} [options.buildPyramid=true] If set to true (default), a
     * pyramid will be built internally to provide a better downsampling.
     * @param {String|Boolean} [options.crossOriginPolicy=false] Valid values are
     * 'Anonymous', 'use-credentials', and false. If false, image requests will
     * not use CORS preventing internal pyramid building for images from other
     * domains.
     * @param {String|Boolean} [options.ajaxWithCredentials=false] Whether to set
     * the withCredentials XHR flag for AJAX requests (when loading tile sources).
     * @param {Boolean} [options.useCanvas=true] Set to false to prevent any use
     * of the canvas API.
     */
    $.ImageTileSource = function (options) {

        options = $.extend({
            buildPyramid: true,
            crossOriginPolicy: false,
            ajaxWithCredentials: false,
            useCanvas: true
        }, options);
        $.TileSource.apply(this, [options]);
    };

    $.extend($.ImageTileSource.prototype, $.TileSource.prototype, /** @lends OpenSeadragon.ImageTileSource.prototype */{
        /**
         * Determine if the data and/or url imply the image service is supported by
         * this tile source.
         * @function
         * @param {Object|Array} data
         * @param {String} optional - url
         */
        supports: function supports(data, url) {
            return data.type && data.type === "image";
        },
        /**
         *
         * @function
         * @param {Object} options - the options
         * @param {String} dataUrl - the url the image was retreived from, if any.
         * @return {Object} options - A dictionary of keyword arguments sufficient
         *      to configure this tile sources constructor.
         */
        configure: function configure(options, dataUrl) {
            return options;
        },
        /**
         * Responsible for retrieving, and caching the
         * image metadata pertinent to this TileSources implementation.
         * @function
         * @param {String} url
         * @throws {Error}
         */
        getImageInfo: function getImageInfo(url) {
            var image = this._image = new Image();
            var _this = this;

            if (this.crossOriginPolicy) {
                image.crossOrigin = this.crossOriginPolicy;
            }
            if (this.ajaxWithCredentials) {
                image.useCredentials = this.ajaxWithCredentials;
            }

            $.addEvent(image, 'load', function () {
                _this.width = image.naturalWidth;
                _this.height = image.naturalHeight;
                _this.aspectRatio = _this.width / _this.height;
                _this.dimensions = new $.Point(_this.width, _this.height);
                _this._tileWidth = _this.width;
                _this._tileHeight = _this.height;
                _this.tileOverlap = 0;
                _this.minLevel = 0;
                _this.levels = _this._buildLevels();
                _this.maxLevel = _this.levels.length - 1;

                _this.ready = true;
                /**
                 * Raised when a TileSource is opened and initialized.
                 *
                 * @event ready
                 * @memberof OpenSeadragon.TileSource
                 * @type {object}
                 * @property {OpenSeadragon.TileSource} eventSource - A reference
                 * to the TileSource which raised the event.
                 * @property {Object} tileSource
                 * @property {?Object} userData - Arbitrary subscriber-defined object.
                 */
                _this.raiseEvent('ready', { tileSource: _this });
            });

            $.addEvent(image, 'error', function () {
                /***
                 * Raised when an error occurs loading a TileSource.
                 *
                 * @event open-failed
                 * @memberof OpenSeadragon.TileSource
                 * @type {object}
                 * @property {OpenSeadragon.TileSource} eventSource - A reference
                 * to the TileSource which raised the event.
                 * @property {String} message
                 * @property {String} source
                 * @property {?Object} userData - Arbitrary subscriber-defined object.
                 */
                _this.raiseEvent('open-failed', {
                    message: "Error loading image at " + url,
                    source: url
                });
            });

            image.src = url;
        },
        /**
         * @function
         * @param {Number} level
         */
        getLevelScale: function getLevelScale(level) {
            var levelScale = NaN;
            if (level >= this.minLevel && level <= this.maxLevel) {
                levelScale = this.levels[level].width / this.levels[this.maxLevel].width;
            }
            return levelScale;
        },
        /**
         * @function
         * @param {Number} level
         */
        getNumTiles: function getNumTiles(level) {
            var scale = this.getLevelScale(level);
            if (scale) {
                return new $.Point(1, 1);
            } else {
                return new $.Point(0, 0);
            }
        },
        /**
         * @function
         * @param {Number} level
         * @param {OpenSeadragon.Point} point
         */
        getTileAtPoint: function getTileAtPoint(level, point) {
            return new $.Point(0, 0);
        },
        /**
         * Retrieves a tile url
         * @function
         * @param {Number} level Level of the tile
         * @param {Number} x x coordinate of the tile
         * @param {Number} y y coordinate of the tile
         */
        getTileUrl: function getTileUrl(level, x, y) {
            var url = null;
            if (level >= this.minLevel && level <= this.maxLevel) {
                url = this.levels[level].url;
            }
            return url;
        },
        /**
         * Retrieves a tile context 2D
         * @function
         * @param {Number} level Level of the tile
         * @param {Number} x x coordinate of the tile
         * @param {Number} y y coordinate of the tile
         */
        getContext2D: function getContext2D(level, x, y) {
            var context = null;
            if (level >= this.minLevel && level <= this.maxLevel) {
                context = this.levels[level].context2D;
            }
            return context;
        },

        // private
        //
        // Builds the differents levels of the pyramid if possible
        // (i.e. if canvas API enabled and no canvas tainting issue).
        _buildLevels: function _buildLevels() {
            var levels = [{
                url: this._image.src,
                width: this._image.naturalWidth,
                height: this._image.naturalHeight
            }];

            if (!this.buildPyramid || !$.supportsCanvas || !this.useCanvas) {
                // We don't need the image anymore. Allows it to be GC.
                delete this._image;
                return levels;
            }

            var currentWidth = this._image.naturalWidth;
            var currentHeight = this._image.naturalHeight;

            var bigCanvas = document.createElement("canvas");
            var bigContext = bigCanvas.getContext("2d");

            bigCanvas.width = currentWidth;
            bigCanvas.height = currentHeight;
            bigContext.drawImage(this._image, 0, 0, currentWidth, currentHeight);
            // We cache the context of the highest level because the browser
            // is a lot faster at downsampling something it already has
            // downsampled before.
            levels[0].context2D = bigContext;
            // We don't need the image anymore. Allows it to be GC.
            delete this._image;

            if ($.isCanvasTainted(bigCanvas)) {
                // If the canvas is tainted, we can't compute the pyramid.
                return levels;
            }

            // We build smaller levels until either width or height becomes
            // 1 pixel wide.
            while (currentWidth >= 2 && currentHeight >= 2) {
                currentWidth = Math.floor(currentWidth / 2);
                currentHeight = Math.floor(currentHeight / 2);
                var smallCanvas = document.createElement("canvas");
                var smallContext = smallCanvas.getContext("2d");
                smallCanvas.width = currentWidth;
                smallCanvas.height = currentHeight;
                smallContext.drawImage(bigCanvas, 0, 0, currentWidth, currentHeight);

                levels.splice(0, 0, {
                    context2D: smallContext,
                    width: currentWidth,
                    height: currentHeight
                });

                bigCanvas = smallCanvas;
                bigContext = smallContext;
            }
            return levels;
        }
    });
})(OpenSeadragon);

/*
 * OpenSeadragon - TileSourceCollection
 *
 * Copyright (C) 2009 CodePlex Foundation
 * Copyright (C) 2010-2013 OpenSeadragon contributors
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 * - Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 *
 * - Neither the name of CodePlex Foundation nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

(function ($) {

    // deprecated
    $.TileSourceCollection = function (tileSize, tileSources, rows, layout) {
        $.console.error('TileSourceCollection is deprecated; use World instead');
    };
})(OpenSeadragon);

/*
 * OpenSeadragon - Button
 *
 * Copyright (C) 2009 CodePlex Foundation
 * Copyright (C) 2010-2013 OpenSeadragon contributors
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 * - Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 *
 * - Neither the name of CodePlex Foundation nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

(function ($) {

    /**
     * An enumeration of button states
     * @member ButtonState
     * @memberof OpenSeadragon
     * @static
     * @type {Object}
     * @property {Number} REST
     * @property {Number} GROUP
     * @property {Number} HOVER
     * @property {Number} DOWN
     */
    $.ButtonState = {
        REST: 0,
        GROUP: 1,
        HOVER: 2,
        DOWN: 3
    };

    /**
     * @class Button
     * @classdesc Manages events, hover states for individual buttons, tool-tips, as well
     * as fading the buttons out when the user has not interacted with them
     * for a specified period.
     *
     * @memberof OpenSeadragon
     * @extends OpenSeadragon.EventSource
     * @param {Object} options
     * @param {Element} [options.element=null] Element to use as the button. If not specified, an HTML &lt;button&gt; element is created.
     * @param {String} [options.tooltip=null] Provides context help for the button when the
     *  user hovers over it.
     * @param {String} [options.srcRest=null] URL of image to use in 'rest' state.
     * @param {String} [options.srcGroup=null] URL of image to use in 'up' state.
     * @param {String} [options.srcHover=null] URL of image to use in 'hover' state.
     * @param {String} [options.srcDown=null] URL of image to use in 'down' state.
     * @param {Number} [options.fadeDelay=0] How long to wait before fading.
     * @param {Number} [options.fadeLength=2000] How long should it take to fade the button.
     * @param {OpenSeadragon.EventHandler} [options.onPress=null] Event handler callback for {@link OpenSeadragon.Button.event:press}.
     * @param {OpenSeadragon.EventHandler} [options.onRelease=null] Event handler callback for {@link OpenSeadragon.Button.event:release}.
     * @param {OpenSeadragon.EventHandler} [options.onClick=null] Event handler callback for {@link OpenSeadragon.Button.event:click}.
     * @param {OpenSeadragon.EventHandler} [options.onEnter=null] Event handler callback for {@link OpenSeadragon.Button.event:enter}.
     * @param {OpenSeadragon.EventHandler} [options.onExit=null] Event handler callback for {@link OpenSeadragon.Button.event:exit}.
     * @param {OpenSeadragon.EventHandler} [options.onFocus=null] Event handler callback for {@link OpenSeadragon.Button.event:focus}.
     * @param {OpenSeadragon.EventHandler} [options.onBlur=null] Event handler callback for {@link OpenSeadragon.Button.event:blur}.
     */
    $.Button = function (options) {

        var _this = this;

        $.EventSource.call(this);

        $.extend(true, this, {

            tooltip: null,
            srcRest: null,
            srcGroup: null,
            srcHover: null,
            srcDown: null,
            clickTimeThreshold: $.DEFAULT_SETTINGS.clickTimeThreshold,
            clickDistThreshold: $.DEFAULT_SETTINGS.clickDistThreshold,
            /**
             * How long to wait before fading.
             * @member {Number} fadeDelay
             * @memberof OpenSeadragon.Button#
             */
            fadeDelay: 0,
            /**
             * How long should it take to fade the button.
             * @member {Number} fadeLength
             * @memberof OpenSeadragon.Button#
             */
            fadeLength: 2000,
            onPress: null,
            onRelease: null,
            onClick: null,
            onEnter: null,
            onExit: null,
            onFocus: null,
            onBlur: null

        }, options);

        /**
         * The button element.
         * @member {Element} element
         * @memberof OpenSeadragon.Button#
         */
        this.element = options.element || $.makeNeutralElement("div");

        //if the user has specified the element to bind the control to explicitly
        //then do not add the default control images
        if (!options.element) {
            this.imgRest = $.makeTransparentImage(this.srcRest);
            this.imgGroup = $.makeTransparentImage(this.srcGroup);
            this.imgHover = $.makeTransparentImage(this.srcHover);
            this.imgDown = $.makeTransparentImage(this.srcDown);

            this.imgRest.alt = this.imgGroup.alt = this.imgHover.alt = this.imgDown.alt = this.tooltip;

            this.element.style.position = "relative";
            $.setElementTouchActionNone(this.element);

            this.imgGroup.style.position = this.imgHover.style.position = this.imgDown.style.position = "absolute";

            this.imgGroup.style.top = this.imgHover.style.top = this.imgDown.style.top = "0px";

            this.imgGroup.style.left = this.imgHover.style.left = this.imgDown.style.left = "0px";

            this.imgHover.style.visibility = this.imgDown.style.visibility = "hidden";

            if ($.Browser.vendor == $.BROWSERS.FIREFOX && $.Browser.version < 3) {
                this.imgGroup.style.top = this.imgHover.style.top = this.imgDown.style.top = "";
            }

            this.element.appendChild(this.imgRest);
            this.element.appendChild(this.imgGroup);
            this.element.appendChild(this.imgHover);
            this.element.appendChild(this.imgDown);
        }

        this.addHandler("press", this.onPress);
        this.addHandler("release", this.onRelease);
        this.addHandler("click", this.onClick);
        this.addHandler("enter", this.onEnter);
        this.addHandler("exit", this.onExit);
        this.addHandler("focus", this.onFocus);
        this.addHandler("blur", this.onBlur);

        /**
         * The button's current state.
         * @member {OpenSeadragon.ButtonState} currentState
         * @memberof OpenSeadragon.Button#
         */
        this.currentState = $.ButtonState.GROUP;

        // When the button last began to fade.
        this.fadeBeginTime = null;
        // Whether this button should fade after user stops interacting with the viewport.
        this.shouldFade = false;

        this.element.style.display = "inline-block";
        this.element.style.position = "relative";
        this.element.title = this.tooltip;

        /**
         * Tracks mouse/touch/key events on the button.
         * @member {OpenSeadragon.MouseTracker} tracker
         * @memberof OpenSeadragon.Button#
         */
        this.tracker = new $.MouseTracker({

            element: this.element,
            clickTimeThreshold: this.clickTimeThreshold,
            clickDistThreshold: this.clickDistThreshold,

            enterHandler: function enterHandler(event) {
                if (event.insideElementPressed) {
                    inTo(_this, $.ButtonState.DOWN);
                    /**
                     * Raised when the cursor enters the Button element.
                     *
                     * @event enter
                     * @memberof OpenSeadragon.Button
                     * @type {object}
                     * @property {OpenSeadragon.Button} eventSource - A reference to the Button which raised the event.
                     * @property {Object} originalEvent - The original DOM event.
                     * @property {?Object} userData - Arbitrary subscriber-defined object.
                     */
                    _this.raiseEvent("enter", { originalEvent: event.originalEvent });
                } else if (!event.buttonDownAny) {
                    inTo(_this, $.ButtonState.HOVER);
                }
            },

            focusHandler: function focusHandler(event) {
                this.enterHandler(event);
                /**
                 * Raised when the Button element receives focus.
                 *
                 * @event focus
                 * @memberof OpenSeadragon.Button
                 * @type {object}
                 * @property {OpenSeadragon.Button} eventSource - A reference to the Button which raised the event.
                 * @property {Object} originalEvent - The original DOM event.
                 * @property {?Object} userData - Arbitrary subscriber-defined object.
                 */
                _this.raiseEvent("focus", { originalEvent: event.originalEvent });
            },

            exitHandler: function exitHandler(event) {
                outTo(_this, $.ButtonState.GROUP);
                if (event.insideElementPressed) {
                    /**
                     * Raised when the cursor leaves the Button element.
                     *
                     * @event exit
                     * @memberof OpenSeadragon.Button
                     * @type {object}
                     * @property {OpenSeadragon.Button} eventSource - A reference to the Button which raised the event.
                     * @property {Object} originalEvent - The original DOM event.
                     * @property {?Object} userData - Arbitrary subscriber-defined object.
                     */
                    _this.raiseEvent("exit", { originalEvent: event.originalEvent });
                }
            },

            blurHandler: function blurHandler(event) {
                this.exitHandler(event);
                /**
                 * Raised when the Button element loses focus.
                 *
                 * @event blur
                 * @memberof OpenSeadragon.Button
                 * @type {object}
                 * @property {OpenSeadragon.Button} eventSource - A reference to the Button which raised the event.
                 * @property {Object} originalEvent - The original DOM event.
                 * @property {?Object} userData - Arbitrary subscriber-defined object.
                 */
                _this.raiseEvent("blur", { originalEvent: event.originalEvent });
            },

            pressHandler: function pressHandler(event) {
                inTo(_this, $.ButtonState.DOWN);
                /**
                 * Raised when a mouse button is pressed or touch occurs in the Button element.
                 *
                 * @event press
                 * @memberof OpenSeadragon.Button
                 * @type {object}
                 * @property {OpenSeadragon.Button} eventSource - A reference to the Button which raised the event.
                 * @property {Object} originalEvent - The original DOM event.
                 * @property {?Object} userData - Arbitrary subscriber-defined object.
                 */
                _this.raiseEvent("press", { originalEvent: event.originalEvent });
            },

            releaseHandler: function releaseHandler(event) {
                if (event.insideElementPressed && event.insideElementReleased) {
                    outTo(_this, $.ButtonState.HOVER);
                    /**
                     * Raised when the mouse button is released or touch ends in the Button element.
                     *
                     * @event release
                     * @memberof OpenSeadragon.Button
                     * @type {object}
                     * @property {OpenSeadragon.Button} eventSource - A reference to the Button which raised the event.
                     * @property {Object} originalEvent - The original DOM event.
                     * @property {?Object} userData - Arbitrary subscriber-defined object.
                     */
                    _this.raiseEvent("release", { originalEvent: event.originalEvent });
                } else if (event.insideElementPressed) {
                    outTo(_this, $.ButtonState.GROUP);
                } else {
                    inTo(_this, $.ButtonState.HOVER);
                }
            },

            clickHandler: function clickHandler(event) {
                if (event.quick) {
                    /**
                     * Raised when a mouse button is pressed and released or touch is initiated and ended in the Button element within the time and distance threshold.
                     *
                     * @event click
                     * @memberof OpenSeadragon.Button
                     * @type {object}
                     * @property {OpenSeadragon.Button} eventSource - A reference to the Button which raised the event.
                     * @property {Object} originalEvent - The original DOM event.
                     * @property {?Object} userData - Arbitrary subscriber-defined object.
                     */
                    _this.raiseEvent("click", { originalEvent: event.originalEvent });
                }
            },

            keyHandler: function keyHandler(event) {
                //console.log( "%s : handling key %s!", _this.tooltip, event.keyCode);
                if (13 === event.keyCode) {
                    /***
                     * Raised when a mouse button is pressed and released or touch is initiated and ended in the Button element within the time and distance threshold.
                     *
                     * @event click
                     * @memberof OpenSeadragon.Button
                     * @type {object}
                     * @property {OpenSeadragon.Button} eventSource - A reference to the Button which raised the event.
                     * @property {Object} originalEvent - The original DOM event.
                     * @property {?Object} userData - Arbitrary subscriber-defined object.
                     */
                    _this.raiseEvent("click", { originalEvent: event.originalEvent });
                    /***
                     * Raised when the mouse button is released or touch ends in the Button element.
                     *
                     * @event release
                     * @memberof OpenSeadragon.Button
                     * @type {object}
                     * @property {OpenSeadragon.Button} eventSource - A reference to the Button which raised the event.
                     * @property {Object} originalEvent - The original DOM event.
                     * @property {?Object} userData - Arbitrary subscriber-defined object.
                     */
                    _this.raiseEvent("release", { originalEvent: event.originalEvent });
                    return false;
                }
                return true;
            }

        });

        outTo(this, $.ButtonState.REST);
    };

    $.extend($.Button.prototype, $.EventSource.prototype, /** @lends OpenSeadragon.Button.prototype */{

        /**
         * TODO: Determine what this function is intended to do and if it's actually
         * useful as an API point.
         * @function
         */
        notifyGroupEnter: function notifyGroupEnter() {
            inTo(this, $.ButtonState.GROUP);
        },

        /**
         * TODO: Determine what this function is intended to do and if it's actually
         * useful as an API point.
         * @function
         */
        notifyGroupExit: function notifyGroupExit() {
            outTo(this, $.ButtonState.REST);
        },

        /**
         * @function
         */
        disable: function disable() {
            this.notifyGroupExit();
            this.element.disabled = true;
            $.setElementOpacity(this.element, 0.2, true);
        },

        /**
         * @function
         */
        enable: function enable() {
            this.element.disabled = false;
            $.setElementOpacity(this.element, 1.0, true);
            this.notifyGroupEnter();
        }

    });

    function scheduleFade(button) {
        $.requestAnimationFrame(function () {
            updateFade(button);
        });
    }

    function updateFade(button) {
        var currentTime, deltaTime, opacity;

        if (button.shouldFade) {
            currentTime = $.now();
            deltaTime = currentTime - button.fadeBeginTime;
            opacity = 1.0 - deltaTime / button.fadeLength;
            opacity = Math.min(1.0, opacity);
            opacity = Math.max(0.0, opacity);

            if (button.imgGroup) {
                $.setElementOpacity(button.imgGroup, opacity, true);
            }
            if (opacity > 0) {
                // fade again
                scheduleFade(button);
            }
        }
    }

    function beginFading(button) {
        button.shouldFade = true;
        button.fadeBeginTime = $.now() + button.fadeDelay;
        window.setTimeout(function () {
            scheduleFade(button);
        }, button.fadeDelay);
    }

    function stopFading(button) {
        button.shouldFade = false;
        if (button.imgGroup) {
            $.setElementOpacity(button.imgGroup, 1.0, true);
        }
    }

    function inTo(button, newState) {

        if (button.element.disabled) {
            return;
        }

        if (newState >= $.ButtonState.GROUP && button.currentState == $.ButtonState.REST) {
            stopFading(button);
            button.currentState = $.ButtonState.GROUP;
        }

        if (newState >= $.ButtonState.HOVER && button.currentState == $.ButtonState.GROUP) {
            if (button.imgHover) {
                button.imgHover.style.visibility = "";
            }
            button.currentState = $.ButtonState.HOVER;
        }

        if (newState >= $.ButtonState.DOWN && button.currentState == $.ButtonState.HOVER) {
            if (button.imgDown) {
                button.imgDown.style.visibility = "";
            }
            button.currentState = $.ButtonState.DOWN;
        }
    }

    function outTo(button, newState) {

        if (button.element.disabled) {
            return;
        }

        if (newState <= $.ButtonState.HOVER && button.currentState == $.ButtonState.DOWN) {
            if (button.imgDown) {
                button.imgDown.style.visibility = "hidden";
            }
            button.currentState = $.ButtonState.HOVER;
        }

        if (newState <= $.ButtonState.GROUP && button.currentState == $.ButtonState.HOVER) {
            if (button.imgHover) {
                button.imgHover.style.visibility = "hidden";
            }
            button.currentState = $.ButtonState.GROUP;
        }

        if (newState <= $.ButtonState.REST && button.currentState == $.ButtonState.GROUP) {
            beginFading(button);
            button.currentState = $.ButtonState.REST;
        }
    }
})(OpenSeadragon);

/*
 * OpenSeadragon - ButtonGroup
 *
 * Copyright (C) 2009 CodePlex Foundation
 * Copyright (C) 2010-2013 OpenSeadragon contributors
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 * - Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 *
 * - Neither the name of CodePlex Foundation nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

(function ($) {
    /**
     * @class ButtonGroup
     * @classdesc Manages events on groups of buttons.
     *
     * @memberof OpenSeadragon
     * @param {Object} options - A dictionary of settings applied against the entire group of buttons.
     * @param {Array} options.buttons Array of buttons
     * @param {Element} [options.element] Element to use as the container
     **/
    $.ButtonGroup = function (options) {

        $.extend(true, this, {
            /**
             * An array containing the buttons themselves.
             * @member {Array} buttons
             * @memberof OpenSeadragon.ButtonGroup#
             */
            buttons: [],
            clickTimeThreshold: $.DEFAULT_SETTINGS.clickTimeThreshold,
            clickDistThreshold: $.DEFAULT_SETTINGS.clickDistThreshold,
            labelText: ""
        }, options);

        // copy the button elements  TODO: Why?
        var buttons = this.buttons.concat([]),
            _this = this,
            i;

        /**
         * The shared container for the buttons.
         * @member {Element} element
         * @memberof OpenSeadragon.ButtonGroup#
         */
        this.element = options.element || $.makeNeutralElement("div");

        // TODO What if there IS an options.group specified?
        if (!options.group) {
            this.label = $.makeNeutralElement("label");
            //TODO: support labels for ButtonGroups
            //this.label.innerHTML = this.labelText;
            this.element.style.display = "inline-block";
            this.element.appendChild(this.label);
            for (i = 0; i < buttons.length; i++) {
                this.element.appendChild(buttons[i].element);
            }
        }

        $.setElementTouchActionNone(this.element);

        /**
         * Tracks mouse/touch/key events accross the group of buttons.
         * @member {OpenSeadragon.MouseTracker} tracker
         * @memberof OpenSeadragon.ButtonGroup#
         */
        this.tracker = new $.MouseTracker({
            element: this.element,
            clickTimeThreshold: this.clickTimeThreshold,
            clickDistThreshold: this.clickDistThreshold,
            enterHandler: function enterHandler(event) {
                var i;
                for (i = 0; i < _this.buttons.length; i++) {
                    _this.buttons[i].notifyGroupEnter();
                }
            },
            exitHandler: function exitHandler(event) {
                var i;
                if (!event.insideElementPressed) {
                    for (i = 0; i < _this.buttons.length; i++) {
                        _this.buttons[i].notifyGroupExit();
                    }
                }
            }
        });
    };

    $.ButtonGroup.prototype = /** @lends OpenSeadragon.ButtonGroup.prototype */{

        /**
         * TODO: Figure out why this is used on the public API and if a more useful
         * api can be created.
         * @function
         * @private
         */
        emulateEnter: function emulateEnter() {
            this.tracker.enterHandler({ eventSource: this.tracker });
        },

        /**
         * TODO: Figure out why this is used on the public API and if a more useful
         * api can be created.
         * @function
         * @private
         */
        emulateExit: function emulateExit() {
            this.tracker.exitHandler({ eventSource: this.tracker });
        }
    };
})(OpenSeadragon);

/*
 * OpenSeadragon - Rect
 *
 * Copyright (C) 2009 CodePlex Foundation
 * Copyright (C) 2010-2013 OpenSeadragon contributors
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 * - Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 *
 * - Neither the name of CodePlex Foundation nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

(function ($) {

    /**
     * @class Rect
     * @classdesc A Rectangle really represents a 2x2 matrix where each row represents a
     * 2 dimensional vector component, the first is (x,y) and the second is
     * (width, height).  The latter component implies the equation of a simple
     * plane.
     *
     * @memberof OpenSeadragon
     * @param {Number} x The vector component 'x'.
     * @param {Number} y The vector component 'y'.
     * @param {Number} width The vector component 'height'.
     * @param {Number} height The vector component 'width'.
     */
    $.Rect = function (x, y, width, height) {
        /**
         * The vector component 'x'.
         * @member {Number} x
         * @memberof OpenSeadragon.Rect#
         */
        this.x = typeof x == "number" ? x : 0;
        /**
         * The vector component 'y'.
         * @member {Number} y
         * @memberof OpenSeadragon.Rect#
         */
        this.y = typeof y == "number" ? y : 0;
        /**
         * The vector component 'width'.
         * @member {Number} width
         * @memberof OpenSeadragon.Rect#
         */
        this.width = typeof width == "number" ? width : 0;
        /**
         * The vector component 'height'.
         * @member {Number} height
         * @memberof OpenSeadragon.Rect#
         */
        this.height = typeof height == "number" ? height : 0;
    };

    $.Rect.prototype = /** @lends OpenSeadragon.Rect.prototype */{
        /**
         * @function
         * @returns {OpenSeadragon.Rect} a duplicate of this Rect
         */
        clone: function clone() {
            return new $.Rect(this.x, this.y, this.width, this.height);
        },

        /**
         * The aspect ratio is simply the ratio of width to height.
         * @function
         * @returns {Number} The ratio of width to height.
         */
        getAspectRatio: function getAspectRatio() {
            return this.width / this.height;
        },

        /**
         * Provides the coordinates of the upper-left corner of the rectangle as a
         * point.
         * @function
         * @returns {OpenSeadragon.Point} The coordinate of the upper-left corner of
         *  the rectangle.
         */
        getTopLeft: function getTopLeft() {
            return new $.Point(this.x, this.y);
        },

        /**
         * Provides the coordinates of the bottom-right corner of the rectangle as a
         * point.
         * @function
         * @returns {OpenSeadragon.Point} The coordinate of the bottom-right corner of
         *  the rectangle.
         */
        getBottomRight: function getBottomRight() {
            return new $.Point(this.x + this.width, this.y + this.height);
        },

        /**
         * Provides the coordinates of the top-right corner of the rectangle as a
         * point.
         * @function
         * @returns {OpenSeadragon.Point} The coordinate of the top-right corner of
         *  the rectangle.
         */
        getTopRight: function getTopRight() {
            return new $.Point(this.x + this.width, this.y);
        },

        /**
         * Provides the coordinates of the bottom-left corner of the rectangle as a
         * point.
         * @function
         * @returns {OpenSeadragon.Point} The coordinate of the bottom-left corner of
         *  the rectangle.
         */
        getBottomLeft: function getBottomLeft() {
            return new $.Point(this.x, this.y + this.height);
        },

        /**
         * Computes the center of the rectangle.
         * @function
         * @returns {OpenSeadragon.Point} The center of the rectangle as represented
         *  as represented by a 2-dimensional vector (x,y)
         */
        getCenter: function getCenter() {
            return new $.Point(this.x + this.width / 2.0, this.y + this.height / 2.0);
        },

        /**
         * Returns the width and height component as a vector OpenSeadragon.Point
         * @function
         * @returns {OpenSeadragon.Point} The 2 dimensional vector representing the
         *  the width and height of the rectangle.
         */
        getSize: function getSize() {
            return new $.Point(this.width, this.height);
        },

        /**
         * Determines if two Rectangles have equivalent components.
         * @function
         * @param {OpenSeadragon.Rect} rectangle The Rectangle to compare to.
         * @return {Boolean} 'true' if all components are equal, otherwise 'false'.
         */
        equals: function equals(other) {
            return other instanceof $.Rect && this.x === other.x && this.y === other.y && this.width === other.width && this.height === other.height;
        },

        /**
        * Multiply all dimensions in this Rect by a factor and return a new Rect.
        * @function
        * @param {Number} factor The factor to multiply vector components.
        * @returns {OpenSeadragon.Rect} A new rect representing the multiplication
        *  of the vector components by the factor
        */
        times: function times(factor) {
            return new OpenSeadragon.Rect(this.x * factor, this.y * factor, this.width * factor, this.height * factor);
        },

        /**
         * Returns the smallest rectangle that will contain this and the given rectangle.
         * @param {OpenSeadragon.Rect} rect
         * @return {OpenSeadragon.Rect} The new rectangle.
         */
        // ----------
        union: function union(rect) {
            var left = Math.min(this.x, rect.x);
            var top = Math.min(this.y, rect.y);
            var right = Math.max(this.x + this.width, rect.x + rect.width);
            var bottom = Math.max(this.y + this.height, rect.y + rect.height);

            return new OpenSeadragon.Rect(left, top, right - left, bottom - top);
        },

        /**
         * Rotates a rectangle around a point. Currently only 90, 180, and 270
         * degrees are supported.
         * @function
         * @param {Number} degrees The angle in degrees to rotate.
         * @param {OpenSeadragon.Point} pivot The point about which to rotate.
         * Defaults to the center of the rectangle.
         * @return {OpenSeadragon.Rect}
         */
        rotate: function rotate(degrees, pivot) {
            // TODO support arbitrary rotation
            var width = this.width,
                height = this.height,
                newTopLeft;

            degrees = (degrees + 360) % 360;
            if (degrees % 90 !== 0) {
                throw new Error('Currently only 0, 90, 180, and 270 degrees are supported.');
            }

            if (degrees === 0) {
                return new $.Rect(this.x, this.y, this.width, this.height);
            }

            pivot = pivot || this.getCenter();

            switch (degrees) {
                case 90:
                    newTopLeft = this.getBottomLeft();
                    width = this.height;
                    height = this.width;
                    break;
                case 180:
                    newTopLeft = this.getBottomRight();
                    break;
                case 270:
                    newTopLeft = this.getTopRight();
                    width = this.height;
                    height = this.width;
                    break;
                default:
                    newTopLeft = this.getTopLeft();
                    break;
            }

            newTopLeft = newTopLeft.rotate(degrees, pivot);

            return new $.Rect(newTopLeft.x, newTopLeft.y, width, height);
        },

        /**
         * Provides a string representation of the rectangle which is useful for
         * debugging.
         * @function
         * @returns {String} A string representation of the rectangle.
         */
        toString: function toString() {
            return "[" + Math.round(this.x * 100) / 100 + "," + Math.round(this.y * 100) / 100 + "," + Math.round(this.width * 100) / 100 + "x" + Math.round(this.height * 100) / 100 + "]";
        }
    };
})(OpenSeadragon);

/*
 * OpenSeadragon - ReferenceStrip
 *
 * Copyright (C) 2009 CodePlex Foundation
 * Copyright (C) 2010-2013 OpenSeadragon contributors
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 * - Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 *
 * - Neither the name of CodePlex Foundation nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

(function ($) {

    // dictionary from id to private properties
    var THIS = {};

    /**
     *  The CollectionDrawer is a reimplementation if the Drawer API that
     *  focuses on allowing a viewport to be redefined as a collection
     *  of smaller viewports, defined by a clear number of rows and / or
     *  columns of which each item in the matrix of viewports has its own
     *  source.
     *
     *  This idea is a reexpression of the idea of dzi collections
     *  which allows a clearer algorithm to reuse the tile sources already
     *  supported by OpenSeadragon, in heterogenious or homogenious
     *  sequences just like mixed groups already supported by the viewer
     *  for the purpose of image sequnces.
     *
     *  TODO:   The difficult part of this feature is figuring out how to express
     *          this functionality as a combination of the functionality already
     *          provided by Drawer, Viewport, TileSource, and Navigator.  It may
     *          require better abstraction at those points in order to effeciently
     *          reuse those paradigms.
     */
    /**
     * @class ReferenceStrip
     * @memberof OpenSeadragon
     * @param {Object} options
     */
    $.ReferenceStrip = function (options) {

        var _this = this,
            viewer = options.viewer,
            viewerSize = $.getElementSize(viewer.element),
            element,
            style,
            i;

        //We may need to create a new element and id if they did not
        //provide the id for the existing element
        if (!options.id) {
            options.id = 'referencestrip-' + $.now();
            this.element = $.makeNeutralElement("div");
            this.element.id = options.id;
            this.element.className = 'referencestrip';
        }

        options = $.extend(true, {
            sizeRatio: $.DEFAULT_SETTINGS.referenceStripSizeRatio,
            position: $.DEFAULT_SETTINGS.referenceStripPosition,
            scroll: $.DEFAULT_SETTINGS.referenceStripScroll,
            clickTimeThreshold: $.DEFAULT_SETTINGS.clickTimeThreshold
        }, options, {
            //required overrides
            element: this.element,
            //These need to be overridden to prevent recursion since
            //the navigator is a viewer and a viewer has a navigator
            showNavigator: false,
            mouseNavEnabled: false,
            showNavigationControl: false,
            showSequenceControl: false
        });

        $.extend(this, options);
        //Private state properties
        THIS[this.id] = {
            "animating": false
        };

        this.minPixelRatio = this.viewer.minPixelRatio;

        style = this.element.style;
        style.marginTop = '0px';
        style.marginRight = '0px';
        style.marginBottom = '0px';
        style.marginLeft = '0px';
        style.left = '0px';
        style.bottom = '0px';
        style.border = '0px';
        style.background = '#000';
        style.position = 'relative';

        $.setElementTouchActionNone(this.element);

        $.setElementOpacity(this.element, 0.8);

        this.viewer = viewer;
        this.innerTracker = new $.MouseTracker({
            element: this.element,
            dragHandler: $.delegate(this, onStripDrag),
            scrollHandler: $.delegate(this, onStripScroll),
            enterHandler: $.delegate(this, onStripEnter),
            exitHandler: $.delegate(this, onStripExit),
            keyDownHandler: $.delegate(this, onKeyDown),
            keyHandler: $.delegate(this, onKeyPress)
        });

        //Controls the position and orientation of the reference strip and sets the
        //appropriate width and height
        if (options.width && options.height) {
            this.element.style.width = options.width + 'px';
            this.element.style.height = options.height + 'px';
            viewer.addControl(this.element, { anchor: $.ControlAnchor.BOTTOM_LEFT });
        } else {
            if ("horizontal" == options.scroll) {
                this.element.style.width = viewerSize.x * options.sizeRatio * viewer.tileSources.length + 12 * viewer.tileSources.length + 'px';

                this.element.style.height = viewerSize.y * options.sizeRatio + 'px';

                viewer.addControl(this.element, { anchor: $.ControlAnchor.BOTTOM_LEFT });
            } else {
                this.element.style.height = viewerSize.y * options.sizeRatio * viewer.tileSources.length + 12 * viewer.tileSources.length + 'px';

                this.element.style.width = viewerSize.x * options.sizeRatio + 'px';

                viewer.addControl(this.element, { anchor: $.ControlAnchor.TOP_LEFT });
            }
        }

        this.panelWidth = viewerSize.x * this.sizeRatio + 8;
        this.panelHeight = viewerSize.y * this.sizeRatio + 8;
        this.panels = [];

        /*jshint loopfunc:true*/
        for (i = 0; i < viewer.tileSources.length; i++) {

            element = $.makeNeutralElement('div');
            element.id = this.element.id + "-" + i;

            element.style.width = _this.panelWidth + 'px';
            element.style.height = _this.panelHeight + 'px';
            element.style.display = 'inline';
            element.style.float = 'left'; //Webkit
            element.style.cssFloat = 'left'; //Firefox
            element.style.styleFloat = 'left'; //IE
            element.style.padding = '2px';
            $.setElementTouchActionNone(element);

            element.innerTracker = new $.MouseTracker({
                element: element,
                clickTimeThreshold: this.clickTimeThreshold,
                clickDistThreshold: this.clickDistThreshold,
                pressHandler: function pressHandler(event) {
                    event.eventSource.dragging = $.now();
                },
                releaseHandler: function releaseHandler(event) {
                    var tracker = event.eventSource,
                        id = tracker.element.id,
                        page = Number(id.split('-')[2]),
                        now = $.now();

                    if (event.insideElementPressed && event.insideElementReleased && tracker.dragging && now - tracker.dragging < tracker.clickTimeThreshold) {
                        tracker.dragging = null;
                        viewer.goToPage(page);
                    }
                }
            });

            this.element.appendChild(element);

            element.activePanel = false;

            this.panels.push(element);
        }
        loadPanels(this, this.scroll == 'vertical' ? viewerSize.y : viewerSize.x, 0);
        this.setFocus(0);
    };

    $.extend($.ReferenceStrip.prototype, $.EventSource.prototype, $.Viewer.prototype, /** @lends OpenSeadragon.ReferenceStrip.prototype */{

        /**
         * @function
         */
        setFocus: function setFocus(page) {
            var element = $.getElement(this.element.id + '-' + page),
                viewerSize = $.getElementSize(this.viewer.canvas),
                scrollWidth = Number(this.element.style.width.replace('px', '')),
                scrollHeight = Number(this.element.style.height.replace('px', '')),
                offsetLeft = -Number(this.element.style.marginLeft.replace('px', '')),
                offsetTop = -Number(this.element.style.marginTop.replace('px', '')),
                offset;

            if (this.currentSelected !== element) {
                if (this.currentSelected) {
                    this.currentSelected.style.background = '#000';
                }
                this.currentSelected = element;
                this.currentSelected.style.background = '#999';

                if ('horizontal' == this.scroll) {
                    //right left
                    offset = Number(page) * (this.panelWidth + 3);
                    if (offset > offsetLeft + viewerSize.x - this.panelWidth) {
                        offset = Math.min(offset, scrollWidth - viewerSize.x);
                        this.element.style.marginLeft = -offset + 'px';
                        loadPanels(this, viewerSize.x, -offset);
                    } else if (offset < offsetLeft) {
                        offset = Math.max(0, offset - viewerSize.x / 2);
                        this.element.style.marginLeft = -offset + 'px';
                        loadPanels(this, viewerSize.x, -offset);
                    }
                } else {
                    offset = Number(page) * (this.panelHeight + 3);
                    if (offset > offsetTop + viewerSize.y - this.panelHeight) {
                        offset = Math.min(offset, scrollHeight - viewerSize.y);
                        this.element.style.marginTop = -offset + 'px';
                        loadPanels(this, viewerSize.y, -offset);
                    } else if (offset < offsetTop) {
                        offset = Math.max(0, offset - viewerSize.y / 2);
                        this.element.style.marginTop = -offset + 'px';
                        loadPanels(this, viewerSize.y, -offset);
                    }
                }

                this.currentPage = page;
                $.getElement(element.id + '-displayregion').focus();
                onStripEnter.call(this, { eventSource: this.innerTracker });
            }
        },

        /**
         * @function
         */
        update: function update() {
            if (THIS[this.id].animating) {
                $.console.log('image reference strip update');
                return true;
            }
            return false;
        },

        // Overrides Viewer.destroy
        destroy: function destroy() {
            if (this.element) {
                this.element.parentNode.removeChild(this.element);
            }
        }

    });

    /**
     * @private
     * @inner
     * @function
     */
    function onStripDrag(event) {

        var offsetLeft = Number(this.element.style.marginLeft.replace('px', '')),
            offsetTop = Number(this.element.style.marginTop.replace('px', '')),
            scrollWidth = Number(this.element.style.width.replace('px', '')),
            scrollHeight = Number(this.element.style.height.replace('px', '')),
            viewerSize = $.getElementSize(this.viewer.canvas);
        this.dragging = true;
        if (this.element) {
            if ('horizontal' == this.scroll) {
                if (-event.delta.x > 0) {
                    //forward
                    if (offsetLeft > -(scrollWidth - viewerSize.x)) {
                        this.element.style.marginLeft = offsetLeft + event.delta.x * 2 + 'px';
                        loadPanels(this, viewerSize.x, offsetLeft + event.delta.x * 2);
                    }
                } else if (-event.delta.x < 0) {
                    //reverse
                    if (offsetLeft < 0) {
                        this.element.style.marginLeft = offsetLeft + event.delta.x * 2 + 'px';
                        loadPanels(this, viewerSize.x, offsetLeft + event.delta.x * 2);
                    }
                }
            } else {
                if (-event.delta.y > 0) {
                    //forward
                    if (offsetTop > -(scrollHeight - viewerSize.y)) {
                        this.element.style.marginTop = offsetTop + event.delta.y * 2 + 'px';
                        loadPanels(this, viewerSize.y, offsetTop + event.delta.y * 2);
                    }
                } else if (-event.delta.y < 0) {
                    //reverse
                    if (offsetTop < 0) {
                        this.element.style.marginTop = offsetTop + event.delta.y * 2 + 'px';
                        loadPanels(this, viewerSize.y, offsetTop + event.delta.y * 2);
                    }
                }
            }
        }
        return false;
    }

    /**
     * @private
     * @inner
     * @function
     */
    function onStripScroll(event) {
        var offsetLeft = Number(this.element.style.marginLeft.replace('px', '')),
            offsetTop = Number(this.element.style.marginTop.replace('px', '')),
            scrollWidth = Number(this.element.style.width.replace('px', '')),
            scrollHeight = Number(this.element.style.height.replace('px', '')),
            viewerSize = $.getElementSize(this.viewer.canvas);
        if (this.element) {
            if ('horizontal' == this.scroll) {
                if (event.scroll > 0) {
                    //forward
                    if (offsetLeft > -(scrollWidth - viewerSize.x)) {
                        this.element.style.marginLeft = offsetLeft - event.scroll * 60 + 'px';
                        loadPanels(this, viewerSize.x, offsetLeft - event.scroll * 60);
                    }
                } else if (event.scroll < 0) {
                    //reverse
                    if (offsetLeft < 0) {
                        this.element.style.marginLeft = offsetLeft - event.scroll * 60 + 'px';
                        loadPanels(this, viewerSize.x, offsetLeft - event.scroll * 60);
                    }
                }
            } else {
                if (event.scroll < 0) {
                    //scroll up
                    if (offsetTop > viewerSize.y - scrollHeight) {
                        this.element.style.marginTop = offsetTop + event.scroll * 60 + 'px';
                        loadPanels(this, viewerSize.y, offsetTop + event.scroll * 60);
                    }
                } else if (event.scroll > 0) {
                    //scroll dowm
                    if (offsetTop < 0) {
                        this.element.style.marginTop = offsetTop + event.scroll * 60 + 'px';
                        loadPanels(this, viewerSize.y, offsetTop + event.scroll * 60);
                    }
                }
            }
        }
        //cancels event
        return false;
    }

    function loadPanels(strip, viewerSize, scroll) {
        var panelSize, activePanelsStart, activePanelsEnd, miniViewer, style, i, element;
        if ('horizontal' == strip.scroll) {
            panelSize = strip.panelWidth;
        } else {
            panelSize = strip.panelHeight;
        }
        activePanelsStart = Math.ceil(viewerSize / panelSize) + 5;
        activePanelsEnd = Math.ceil((Math.abs(scroll) + viewerSize) / panelSize) + 1;
        activePanelsStart = activePanelsEnd - activePanelsStart;
        activePanelsStart = activePanelsStart < 0 ? 0 : activePanelsStart;

        for (i = activePanelsStart; i < activePanelsEnd && i < strip.panels.length; i++) {
            element = strip.panels[i];
            if (!element.activePanel) {
                miniViewer = new $.Viewer({
                    id: element.id,
                    tileSources: [strip.viewer.tileSources[i]],
                    element: element,
                    navigatorSizeRatio: strip.sizeRatio,
                    showNavigator: false,
                    mouseNavEnabled: false,
                    showNavigationControl: false,
                    showSequenceControl: false,
                    immediateRender: true,
                    blendTime: 0,
                    animationTime: 0
                });

                miniViewer.displayRegion = $.makeNeutralElement("textarea");
                miniViewer.displayRegion.id = element.id + '-displayregion';
                miniViewer.displayRegion.className = 'displayregion';

                style = miniViewer.displayRegion.style;
                style.position = 'relative';
                style.top = '0px';
                style.left = '0px';
                style.fontSize = '0px';
                style.overflow = 'hidden';
                style.float = 'left'; //Webkit
                style.cssFloat = 'left'; //Firefox
                style.styleFloat = 'left'; //IE
                style.zIndex = 999999999;
                style.cursor = 'default';
                style.width = strip.panelWidth - 4 + 'px';
                style.height = strip.panelHeight - 4 + 'px';

                // TODO: What is this for? Future keyboard navigation support?
                miniViewer.displayRegion.innerTracker = new $.MouseTracker({
                    element: miniViewer.displayRegion,
                    startDisabled: true
                });

                element.getElementsByTagName('div')[0].appendChild(miniViewer.displayRegion);

                element.activePanel = true;
            }
        }
    }

    /**
     * @private
     * @inner
     * @function
     */
    function onStripEnter(event) {
        var element = event.eventSource.element;

        //$.setElementOpacity(element, 0.8);

        //element.style.border = '1px solid #555';
        //element.style.background = '#000';

        if ('horizontal' == this.scroll) {

            //element.style.paddingTop = "0px";
            element.style.marginBottom = "0px";
        } else {

            //element.style.paddingRight = "0px";
            element.style.marginLeft = "0px";
        }
        return false;
    }

    /**
     * @private
     * @inner
     * @function
     */
    function onStripExit(event) {
        var element = event.eventSource.element;

        if ('horizontal' == this.scroll) {

            //element.style.paddingTop = "10px";
            element.style.marginBottom = "-" + $.getElementSize(element).y / 2 + "px";
        } else {

            //element.style.paddingRight = "10px";
            element.style.marginLeft = "-" + $.getElementSize(element).x / 2 + "px";
        }
        return false;
    }

    /**
     * @private
     * @inner
     * @function
     */
    function onKeyDown(event) {
        //console.log( event.keyCode );

        if (!event.preventDefaultAction && !event.ctrl && !event.alt && !event.meta) {
            switch (event.keyCode) {
                case 38:
                    //up arrow
                    onStripScroll.call(this, { eventSource: this.tracker, position: null, scroll: 1, shift: null });
                    return false;
                case 40:
                    //down arrow
                    onStripScroll.call(this, { eventSource: this.tracker, position: null, scroll: -1, shift: null });
                    return false;
                case 37:
                    //left arrow
                    onStripScroll.call(this, { eventSource: this.tracker, position: null, scroll: -1, shift: null });
                    return false;
                case 39:
                    //right arrow
                    onStripScroll.call(this, { eventSource: this.tracker, position: null, scroll: 1, shift: null });
                    return false;
                default:
                    //console.log( 'navigator keycode %s', event.keyCode );
                    return true;
            }
        } else {
            return true;
        }
    }

    /**
     * @private
     * @inner
     * @function
     */
    function onKeyPress(event) {
        //console.log( event.keyCode );

        if (!event.preventDefaultAction && !event.ctrl && !event.alt && !event.meta) {
            switch (event.keyCode) {
                case 61:
                    //=|+
                    onStripScroll.call(this, { eventSource: this.tracker, position: null, scroll: 1, shift: null });
                    return false;
                case 45:
                    //-|_
                    onStripScroll.call(this, { eventSource: this.tracker, position: null, scroll: -1, shift: null });
                    return false;
                case 48: //0|)
                case 119: //w
                case 87:
                    //W
                    onStripScroll.call(this, { eventSource: this.tracker, position: null, scroll: 1, shift: null });
                    return false;
                case 115: //s
                case 83:
                    //S
                    onStripScroll.call(this, { eventSource: this.tracker, position: null, scroll: -1, shift: null });
                    return false;
                case 97:
                    //a
                    onStripScroll.call(this, { eventSource: this.tracker, position: null, scroll: -1, shift: null });
                    return false;
                case 100:
                    //d
                    onStripScroll.call(this, { eventSource: this.tracker, position: null, scroll: 1, shift: null });
                    return false;
                default:
                    //console.log( 'navigator keycode %s', event.keyCode );
                    return true;
            }
        } else {
            return true;
        }
    }
})(OpenSeadragon);

/*
 * OpenSeadragon - DisplayRect
 *
 * Copyright (C) 2009 CodePlex Foundation
 * Copyright (C) 2010-2013 OpenSeadragon contributors
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 * - Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 *
 * - Neither the name of CodePlex Foundation nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

(function ($) {

    /**
     * @class DisplayRect
     * @classdesc A display rectangle is very similar to {@link OpenSeadragon.Rect} but adds two
     * fields, 'minLevel' and 'maxLevel' which denote the supported zoom levels
     * for this rectangle.
     *
     * @memberof OpenSeadragon
     * @extends OpenSeadragon.Rect
     * @param {Number} x The vector component 'x'.
     * @param {Number} y The vector component 'y'.
     * @param {Number} width The vector component 'height'.
     * @param {Number} height The vector component 'width'.
     * @param {Number} minLevel The lowest zoom level supported.
     * @param {Number} maxLevel The highest zoom level supported.
     */
    $.DisplayRect = function (x, y, width, height, minLevel, maxLevel) {
        $.Rect.apply(this, [x, y, width, height]);

        /**
         * The lowest zoom level supported.
         * @member {Number} minLevel
         * @memberof OpenSeadragon.DisplayRect#
         */
        this.minLevel = minLevel;
        /**
         * The highest zoom level supported.
         * @member {Number} maxLevel
         * @memberof OpenSeadragon.DisplayRect#
         */
        this.maxLevel = maxLevel;
    };

    $.extend($.DisplayRect.prototype, $.Rect.prototype);
})(OpenSeadragon);

/*
 * OpenSeadragon - Spring
 *
 * Copyright (C) 2009 CodePlex Foundation
 * Copyright (C) 2010-2013 OpenSeadragon contributors
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 * - Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 *
 * - Neither the name of CodePlex Foundation nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

(function ($) {

    /**
     * @class Spring
     * @memberof OpenSeadragon
     * @param {Object} options - Spring configuration settings.
     * @param {Number} options.springStiffness - Spring stiffness. Must be greater than zero.
     * The closer to zero, the closer to linear animation.
     * @param {Number} options.animationTime - Animation duration per spring, in seconds.
     * Must be greater than zero.
     * @param {Number} [options.initial=0] - Initial value of spring.
     * @param {Boolean} [options.exponential=false] - Whether this spring represents
     * an exponential scale (such as zoom) and should be animated accordingly. Note that
     * exponential springs must have non-zero values.
     */
    $.Spring = function (options) {
        var args = arguments;

        if (typeof options != 'object') {
            //allows backward compatible use of ( initialValue, config ) as
            //constructor parameters
            options = {
                initial: args.length && typeof args[0] == "number" ? args[0] : undefined,
                /**
                 * Spring stiffness.
                 * @member {Number} springStiffness
                 * @memberof OpenSeadragon.Spring#
                 */
                springStiffness: args.length > 1 ? args[1].springStiffness : 5.0,
                /**
                 * Animation duration per spring.
                 * @member {Number} animationTime
                 * @memberof OpenSeadragon.Spring#
                 */
                animationTime: args.length > 1 ? args[1].animationTime : 1.5
            };
        }

        $.console.assert(typeof options.springStiffness === "number" && options.springStiffness !== 0, "[OpenSeadragon.Spring] options.springStiffness must be a non-zero number");

        $.console.assert(typeof options.animationTime === "number" && options.springStiffness !== 0, "[OpenSeadragon.Spring] options.animationTime must be a non-zero number");

        if (options.exponential) {
            this._exponential = true;
            delete options.exponential;
        }

        $.extend(true, this, options);

        /**
         * @member {Object} current
         * @memberof OpenSeadragon.Spring#
         * @property {Number} value
         * @property {Number} time
         */
        this.current = {
            value: typeof this.initial == "number" ? this.initial : this._exponential ? 0 : 1,
            time: $.now() // always work in milliseconds
        };

        $.console.assert(!this._exponential || this.current.value !== 0, "[OpenSeadragon.Spring] value must be non-zero for exponential springs");

        /**
         * @member {Object} start
         * @memberof OpenSeadragon.Spring#
         * @property {Number} value
         * @property {Number} time
         */
        this.start = {
            value: this.current.value,
            time: this.current.time
        };

        /**
         * @member {Object} target
         * @memberof OpenSeadragon.Spring#
         * @property {Number} value
         * @property {Number} time
         */
        this.target = {
            value: this.current.value,
            time: this.current.time
        };

        if (this._exponential) {
            this.start._logValue = Math.log(this.start.value);
            this.target._logValue = Math.log(this.target.value);
            this.current._logValue = Math.log(this.current.value);
        }
    };

    $.Spring.prototype = /** @lends OpenSeadragon.Spring.prototype */{

        /**
         * @function
         * @param {Number} target
         */
        resetTo: function resetTo(target) {
            $.console.assert(!this._exponential || target !== 0, "[OpenSeadragon.Spring.resetTo] target must be non-zero for exponential springs");

            this.start.value = this.target.value = this.current.value = target;
            this.start.time = this.target.time = this.current.time = $.now();

            if (this._exponential) {
                this.start._logValue = Math.log(this.start.value);
                this.target._logValue = Math.log(this.target.value);
                this.current._logValue = Math.log(this.current.value);
            }
        },

        /**
         * @function
         * @param {Number} target
         */
        springTo: function springTo(target) {
            $.console.assert(!this._exponential || target !== 0, "[OpenSeadragon.Spring.springTo] target must be non-zero for exponential springs");

            this.start.value = this.current.value;
            this.start.time = this.current.time;
            this.target.value = target;
            this.target.time = this.start.time + 1000 * this.animationTime;

            if (this._exponential) {
                this.start._logValue = Math.log(this.start.value);
                this.target._logValue = Math.log(this.target.value);
            }
        },

        /**
         * @function
         * @param {Number} delta
         */
        shiftBy: function shiftBy(delta) {
            this.start.value += delta;
            this.target.value += delta;

            if (this._exponential) {
                $.console.assert(this.target.value !== 0 && this.start.value !== 0, "[OpenSeadragon.Spring.shiftBy] spring value must be non-zero for exponential springs");

                this.start._logValue = Math.log(this.start.value);
                this.target._logValue = Math.log(this.target.value);
            }
        },

        setExponential: function setExponential(value) {
            this._exponential = value;

            if (this._exponential) {
                $.console.assert(this.current.value !== 0 && this.target.value !== 0 && this.start.value !== 0, "[OpenSeadragon.Spring.setExponential] spring value must be non-zero for exponential springs");

                this.start._logValue = Math.log(this.start.value);
                this.target._logValue = Math.log(this.target.value);
                this.current._logValue = Math.log(this.current.value);
            }
        },

        /**
         * @function
         */
        update: function update() {
            this.current.time = $.now();

            var startValue, targetValue;
            if (this._exponential) {
                startValue = this.start._logValue;
                targetValue = this.target._logValue;
            } else {
                startValue = this.start.value;
                targetValue = this.target.value;
            }

            var currentValue = this.current.time >= this.target.time ? targetValue : startValue + (targetValue - startValue) * transform(this.springStiffness, (this.current.time - this.start.time) / (this.target.time - this.start.time));

            if (this._exponential) {
                this.current.value = Math.exp(currentValue);
            } else {
                this.current.value = currentValue;
            }
        }
    };

    /**
     * @private
     */
    function transform(stiffness, x) {
        return (1.0 - Math.exp(stiffness * -x)) / (1.0 - Math.exp(-stiffness));
    }
})(OpenSeadragon);

/*
 * OpenSeadragon - ImageLoader
 *
 * Copyright (C) 2009 CodePlex Foundation
 * Copyright (C) 2010-2013 OpenSeadragon contributors

 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 * - Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 *
 * - Neither the name of CodePlex Foundation nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

(function ($) {

    // private class
    function ImageJob(options) {

        $.extend(true, this, {
            timeout: $.DEFAULT_SETTINGS.timeout,
            jobId: null
        }, options);

        /**
         * Image object which will contain downloaded image.
         * @member {Image} image
         * @memberof OpenSeadragon.ImageJob#
         */
        this.image = null;
    }

    ImageJob.prototype = {
        errorMsg: null,
        start: function start() {
            var _this = this;

            this.image = new Image();

            if (this.crossOriginPolicy !== false) {
                this.image.crossOrigin = this.crossOriginPolicy;
            }

            this.image.onload = function () {
                _this.finish(true);
            };
            this.image.onabort = this.image.onerror = function () {
                _this.errorMsg = "Image load aborted";
                _this.finish(false);
            };

            this.jobId = window.setTimeout(function () {
                _this.errorMsg = "Image load exceeded timeout";
                _this.finish(false);
            }, this.timeout);

            this.image.src = this.src;
        },

        finish: function finish(successful) {
            this.image.onload = this.image.onerror = this.image.onabort = null;
            if (!successful) {
                this.image = null;
            }

            if (this.jobId) {
                window.clearTimeout(this.jobId);
            }

            this.callback(this);
        }

    };

    /**
     * @class ImageLoader
     * @memberof OpenSeadragon
     * @classdesc Handles downloading of a set of images using asynchronous queue pattern.
     * You generally won't have to interact with the ImageLoader directly.
     * @param {Object} options - Options for this ImageLoader.
     * @param {Number} [options.jobLimit] - The number of concurrent image requests. See imageLoaderLimit in {@link OpenSeadragon.Options} for details.
     */
    $.ImageLoader = function (options) {

        $.extend(true, this, {
            jobLimit: $.DEFAULT_SETTINGS.imageLoaderLimit,
            jobQueue: [],
            jobsInProgress: 0
        }, options);
    };

    $.ImageLoader.prototype = /** @lends OpenSeadragon.ImageLoader.prototype */{

        /**
         * Add an unloaded image to the loader queue.
         * @method
         * @param {String} src - URL of image to download.
         * @param {String} crossOriginPolicy - CORS policy to use for downloads
         * @param {Function} callback - Called once image has been downloaded.
         */
        addJob: function addJob(options) {
            var _this = this,
                complete = function complete(job) {
                completeJob(_this, job, options.callback);
            },
                jobOptions = {
                src: options.src,
                crossOriginPolicy: options.crossOriginPolicy,
                callback: complete,
                abort: options.abort
            },
                newJob = new ImageJob(jobOptions);

            if (!this.jobLimit || this.jobsInProgress < this.jobLimit) {
                newJob.start();
                this.jobsInProgress++;
            } else {
                this.jobQueue.push(newJob);
            }
        },

        /**
         * Clear any unstarted image loading jobs from the queue.
         * @method
         */
        clear: function clear() {
            for (var i = 0; i < this.jobQueue.length; i++) {
                var job = this.jobQueue[i];
                if (typeof job.abort === "function") {
                    job.abort();
                }
            }

            this.jobQueue = [];
        }
    };

    /**
     * Cleans up ImageJob once completed.
     * @method
     * @private
     * @param loader - ImageLoader used to start job.
     * @param job - The ImageJob that has completed.
     * @param callback - Called once cleanup is finished.
     */
    function completeJob(loader, job, callback) {
        var nextJob;

        loader.jobsInProgress--;

        if ((!loader.jobLimit || loader.jobsInProgress < loader.jobLimit) && loader.jobQueue.length > 0) {
            nextJob = loader.jobQueue.shift();
            nextJob.start();
            loader.jobsInProgress++;
        }

        callback(job.image, job.errorMsg);
    }
})(OpenSeadragon);

/*
 * OpenSeadragon - Tile
 *
 * Copyright (C) 2009 CodePlex Foundation
 * Copyright (C) 2010-2013 OpenSeadragon contributors
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 * - Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 *
 * - Neither the name of CodePlex Foundation nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

(function ($) {

    /**
     * @class Tile
     * @memberof OpenSeadragon
     * @param {Number} level The zoom level this tile belongs to.
     * @param {Number} x The vector component 'x'.
     * @param {Number} y The vector component 'y'.
     * @param {OpenSeadragon.Point} bounds Where this tile fits, in normalized
     *      coordinates.
     * @param {Boolean} exists Is this tile a part of a sparse image? ( Also has
     *      this tile failed to load? )
     * @param {String} url The URL of this tile's image.
     * @param {CanvasRenderingContext2D} context2D The context2D of this tile if it
     * is provided directly by the tile source.
     */
    $.Tile = function (level, x, y, bounds, exists, url, context2D) {
        /**
         * The zoom level this tile belongs to.
         * @member {Number} level
         * @memberof OpenSeadragon.Tile#
         */
        this.level = level;
        /**
         * The vector component 'x'.
         * @member {Number} x
         * @memberof OpenSeadragon.Tile#
         */
        this.x = x;
        /**
         * The vector component 'y'.
         * @member {Number} y
         * @memberof OpenSeadragon.Tile#
         */
        this.y = y;
        /**
         * Where this tile fits, in normalized coordinates
         * @member {OpenSeadragon.Rect} bounds
         * @memberof OpenSeadragon.Tile#
         */
        this.bounds = bounds;
        /**
         * Is this tile a part of a sparse image? Also has this tile failed to load?
         * @member {Boolean} exists
         * @memberof OpenSeadragon.Tile#
         */
        this.exists = exists;
        /**
         * The URL of this tile's image.
         * @member {String} url
         * @memberof OpenSeadragon.Tile#
         */
        this.url = url;
        /**
         * The context2D of this tile if it is provided directly by the tile source.
         * @member {CanvasRenderingContext2D} context2D
         * @memberOf OpenSeadragon.Tile#
         */
        this.context2D = context2D;
        /**
         * Is this tile loaded?
         * @member {Boolean} loaded
         * @memberof OpenSeadragon.Tile#
         */
        this.loaded = false;
        /**
         * Is this tile loading?
         * @member {Boolean} loading
         * @memberof OpenSeadragon.Tile#
         */
        this.loading = false;

        /**
         * The HTML div element for this tile
         * @member {Element} element
         * @memberof OpenSeadragon.Tile#
         */
        this.element = null;
        /**
         * The HTML img element for this tile.
         * @member {Element} imgElement
         * @memberof OpenSeadragon.Tile#
         */
        this.imgElement = null;
        /**
         * The Image object for this tile.
         * @member {Object} image
         * @memberof OpenSeadragon.Tile#
         */
        this.image = null;

        /**
         * The alias of this.element.style.
         * @member {String} style
         * @memberof OpenSeadragon.Tile#
         */
        this.style = null;
        /**
         * This tile's position on screen, in pixels.
         * @member {OpenSeadragon.Point} position
         * @memberof OpenSeadragon.Tile#
         */
        this.position = null;
        /**
         * This tile's size on screen, in pixels.
         * @member {OpenSeadragon.Point} size
         * @memberof OpenSeadragon.Tile#
         */
        this.size = null;
        /**
         * The start time of this tile's blending.
         * @member {Number} blendStart
         * @memberof OpenSeadragon.Tile#
         */
        this.blendStart = null;
        /**
         * The current opacity this tile should be.
         * @member {Number} opacity
         * @memberof OpenSeadragon.Tile#
         */
        this.opacity = null;
        /**
         * The distance of this tile to the viewport center.
         * @member {Number} distance
         * @memberof OpenSeadragon.Tile#
         */
        this.distance = null;
        /**
         * The visibility score of this tile.
         * @member {Number} visibility
         * @memberof OpenSeadragon.Tile#
         */
        this.visibility = null;

        /**
         * Whether this tile is currently being drawn.
         * @member {Boolean} beingDrawn
         * @memberof OpenSeadragon.Tile#
         */
        this.beingDrawn = false;
        /**
         * Timestamp the tile was last touched.
         * @member {Number} lastTouchTime
         * @memberof OpenSeadragon.Tile#
         */
        this.lastTouchTime = 0;
    };

    $.Tile.prototype = /** @lends OpenSeadragon.Tile.prototype */{

        /**
         * Provides a string representation of this tiles level and (x,y)
         * components.
         * @function
         * @returns {String}
         */
        toString: function toString() {
            return this.level + "/" + this.x + "_" + this.y;
        },

        /**
         * Renders the tile in an html container.
         * @function
         * @param {Element} container
         */
        drawHTML: function drawHTML(container) {
            if (!this.cacheImageRecord) {
                $.console.warn('[Tile.drawHTML] attempting to draw tile %s when it\'s not cached', this.toString());
                return;
            }

            if (!this.loaded) {
                $.console.warn("Attempting to draw tile %s when it's not yet loaded.", this.toString());
                return;
            }

            //EXPERIMENTAL - trying to figure out how to scale the container
            //               content during animation of the container size.

            if (!this.element) {
                this.element = $.makeNeutralElement("div");
                this.imgElement = this.cacheImageRecord.getImage().cloneNode();
                this.imgElement.style.msInterpolationMode = "nearest-neighbor";
                this.imgElement.style.width = "100%";
                this.imgElement.style.height = "100%";

                this.style = this.element.style;
                this.style.position = "absolute";
            }
            if (this.element.parentNode != container) {
                container.appendChild(this.element);
            }
            if (this.imgElement.parentNode != this.element) {
                this.element.appendChild(this.imgElement);
            }

            this.style.top = this.position.y + "px";
            this.style.left = this.position.x + "px";
            this.style.height = this.size.y + "px";
            this.style.width = this.size.x + "px";

            $.setElementOpacity(this.element, this.opacity);
        },

        /**
         * Renders the tile in a canvas-based context.
         * @function
         * @param {Canvas} context
         * @param {Function} drawingHandler - Method for firing the drawing event.
         * drawingHandler({context, tile, rendered})
         * where <code>rendered</code> is the context with the pre-drawn image.
         */
        drawCanvas: function drawCanvas(context, drawingHandler) {

            var position = this.position,
                size = this.size,
                rendered;

            if (!this.context2D && !this.cacheImageRecord) {
                $.console.warn('[Tile.drawCanvas] attempting to draw tile %s when it\'s not cached', this.toString());
                return;
            }

            rendered = this.context2D || this.cacheImageRecord.getRenderedContext();

            if (!this.loaded || !rendered) {
                $.console.warn("Attempting to draw tile %s when it's not yet loaded.", this.toString());

                return;
            }

            context.save();

            context.globalAlpha = this.opacity;

            //if we are supposed to be rendering fully opaque rectangle,
            //ie its done fading or fading is turned off, and if we are drawing
            //an image with an alpha channel, then the only way
            //to avoid seeing the tile underneath is to clear the rectangle
            if (context.globalAlpha === 1 && (this.context2D || this.url.match('.png'))) {
                //clearing only the inside of the rectangle occupied
                //by the png prevents edge flikering
                context.clearRect(position.x * $.pixelDensityRatio + 1, position.y * $.pixelDensityRatio + 1, size.x * $.pixelDensityRatio - 2, size.y * $.pixelDensityRatio - 2);
            }

            // This gives the application a chance to make image manipulation
            // changes as we are rendering the image
            drawingHandler({ context: context, tile: this, rendered: rendered });

            context.drawImage(rendered.canvas, 0, 0, rendered.canvas.width, rendered.canvas.height, position.x * $.pixelDensityRatio, position.y * $.pixelDensityRatio, size.x * $.pixelDensityRatio, size.y * $.pixelDensityRatio);

            context.restore();
        },

        /**
         * Removes tile from its container.
         * @function
         */
        unload: function unload() {
            if (this.imgElement && this.imgElement.parentNode) {
                this.imgElement.parentNode.removeChild(this.imgElement);
            }
            if (this.element && this.element.parentNode) {
                this.element.parentNode.removeChild(this.element);
            }

            this.element = null;
            this.imgElement = null;
            this.loaded = false;
            this.loading = false;
        }
    };
})(OpenSeadragon);

/*
 * OpenSeadragon - Overlay
 *
 * Copyright (C) 2009 CodePlex Foundation
 * Copyright (C) 2010-2013 OpenSeadragon contributors
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 * - Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 *
 * - Neither the name of CodePlex Foundation nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

(function ($) {

    /**
     * An enumeration of positions that an overlay may be assigned relative to
     * the viewport.
     * @member OverlayPlacement
     * @memberof OpenSeadragon
     * @static
     * @type {Object}
     * @property {Number} CENTER
     * @property {Number} TOP_LEFT
     * @property {Number} TOP
     * @property {Number} TOP_RIGHT
     * @property {Number} RIGHT
     * @property {Number} BOTTOM_RIGHT
     * @property {Number} BOTTOM
     * @property {Number} BOTTOM_LEFT
     * @property {Number} LEFT
     */
    $.OverlayPlacement = {
        CENTER: 0,
        TOP_LEFT: 1,
        TOP: 2,
        TOP_RIGHT: 3,
        RIGHT: 4,
        BOTTOM_RIGHT: 5,
        BOTTOM: 6,
        BOTTOM_LEFT: 7,
        LEFT: 8
    };

    /**
     * @class Overlay
     * @classdesc Provides a way to float an HTML element on top of the viewer element.
     *
     * @memberof OpenSeadragon
     * @param {Object} options
     * @param {Element} options.element
     * @param {OpenSeadragon.Point|OpenSeadragon.Rect} options.location - The
     * location of the overlay on the image. If a {@link OpenSeadragon.Point}
     * is specified, the overlay will keep a constant size independently of the
     * zoom. If a {@link OpenSeadragon.Rect} is specified, the overlay size will
     * be adjusted when the zoom changes.
     * @param {OpenSeadragon.OverlayPlacement} [options.placement=OpenSeadragon.OverlayPlacement.TOP_LEFT]
     * Relative position to the viewport.
     * Only used if location is a {@link OpenSeadragon.Point}.
     * @param {OpenSeadragon.Overlay.OnDrawCallback} [options.onDraw]
     * @param {Boolean} [options.checkResize=true] Set to false to avoid to
     * check the size of the overlay everytime it is drawn when using a
     * {@link OpenSeadragon.Point} as options.location. It will improve
     * performances but will cause a misalignment if the overlay size changes.
     */
    $.Overlay = function (element, location, placement) {

        /**
         * onDraw callback signature used by {@link OpenSeadragon.Overlay}.
         *
         * @callback OnDrawCallback
         * @memberof OpenSeadragon.Overlay
         * @param {OpenSeadragon.Point} position
         * @param {OpenSeadragon.Point} size
         * @param {Element} element
         */

        var options;
        if ($.isPlainObject(element)) {
            options = element;
        } else {
            options = {
                element: element,
                location: location,
                placement: placement
            };
        }

        this.element = options.element;
        this.scales = options.location instanceof $.Rect;
        this.bounds = new $.Rect(options.location.x, options.location.y, options.location.width, options.location.height);
        this.position = new $.Point(options.location.x, options.location.y);
        this.size = new $.Point(options.location.width, options.location.height);
        this.style = options.element.style;
        // rects are always top-left
        this.placement = options.location instanceof $.Point ? options.placement : $.OverlayPlacement.TOP_LEFT;
        this.onDraw = options.onDraw;
        this.checkResize = options.checkResize === undefined ? true : options.checkResize;
    };

    $.Overlay.prototype = /** @lends OpenSeadragon.Overlay.prototype */{

        /**
         * @function
         * @param {OpenSeadragon.OverlayPlacement} position
         * @param {OpenSeadragon.Point} size
         */
        adjust: function adjust(position, size) {
            switch (this.placement) {
                case $.OverlayPlacement.TOP_LEFT:
                    break;
                case $.OverlayPlacement.TOP:
                    position.x -= size.x / 2;
                    break;
                case $.OverlayPlacement.TOP_RIGHT:
                    position.x -= size.x;
                    break;
                case $.OverlayPlacement.RIGHT:
                    position.x -= size.x;
                    position.y -= size.y / 2;
                    break;
                case $.OverlayPlacement.BOTTOM_RIGHT:
                    position.x -= size.x;
                    position.y -= size.y;
                    break;
                case $.OverlayPlacement.BOTTOM:
                    position.x -= size.x / 2;
                    position.y -= size.y;
                    break;
                case $.OverlayPlacement.BOTTOM_LEFT:
                    position.y -= size.y;
                    break;
                case $.OverlayPlacement.LEFT:
                    position.y -= size.y / 2;
                    break;
                default:
                case $.OverlayPlacement.CENTER:
                    position.x -= size.x / 2;
                    position.y -= size.y / 2;
                    break;
            }
        },

        /**
         * @function
         */
        destroy: function destroy() {
            var element = this.element,
                style = this.style;

            if (element.parentNode) {
                element.parentNode.removeChild(element);
                //this should allow us to preserve overlays when required between
                //pages
                if (element.prevElementParent) {
                    style.display = 'none';
                    //element.prevElementParent.insertBefore(
                    //    element,
                    //    element.prevNextSibling
                    //);
                    document.body.appendChild(element);
                }
            }

            // clear the onDraw callback
            this.onDraw = null;

            style.top = "";
            style.left = "";
            style.position = "";

            if (this.scales) {
                style.width = "";
                style.height = "";
            }
        },

        /**
         * @function
         * @param {Element} container
         */
        drawHTML: function drawHTML(container, viewport) {
            var element = this.element,
                style = this.style,
                scales = this.scales,
                degrees = viewport.degrees,
                position = viewport.pixelFromPoint(this.bounds.getTopLeft(), true),
                size,
                overlayCenter;

            if (element.parentNode != container) {
                //save the source parent for later if we need it
                element.prevElementParent = element.parentNode;
                element.prevNextSibling = element.nextSibling;
                container.appendChild(element);
                this.size = $.getElementSize(element);
            }

            if (scales) {
                size = viewport.deltaPixelsFromPoints(this.bounds.getSize(), true);
            } else if (this.checkResize) {
                size = $.getElementSize(element);
            } else {
                size = this.size;
            }

            this.position = position;
            this.size = size;

            this.adjust(position, size);

            position = position.apply(Math.round);
            size = size.apply(Math.round);

            // rotate the position of the overlay
            // TODO only rotate overlays if in canvas mode
            // TODO replace the size rotation with CSS3 transforms
            // TODO add an option to overlays to not rotate with the image
            // Currently only rotates position and size
            if (degrees !== 0 && this.scales) {
                overlayCenter = new $.Point(size.x / 2, size.y / 2);

                var drawerCenter = new $.Point(viewport.viewer.drawer.canvas.width / 2, viewport.viewer.drawer.canvas.height / 2);
                position = position.plus(overlayCenter).rotate(degrees, drawerCenter).minus(overlayCenter);

                size = size.rotate(degrees, new $.Point(0, 0));
                size = new $.Point(Math.abs(size.x), Math.abs(size.y));
            }

            // call the onDraw callback if it exists to allow one to overwrite
            // the drawing/positioning/sizing of the overlay
            if (this.onDraw) {
                this.onDraw(position, size, element);
            } else {
                style.left = position.x + "px";
                style.top = position.y + "px";
                style.position = "absolute";

                if (style.display != 'none') {
                    style.display = 'block';
                }

                if (scales) {
                    style.width = size.x + "px";
                    style.height = size.y + "px";
                }
            }
        },

        /**
         * @function
         * @param {OpenSeadragon.Point|OpenSeadragon.Rect} location
         * @param {OpenSeadragon.OverlayPlacement} position
         */
        update: function update(location, placement) {
            this.scales = location instanceof $.Rect;
            this.bounds = new $.Rect(location.x, location.y, location.width, location.height);
            // rects are always top-left
            this.placement = location instanceof $.Point ? placement : $.OverlayPlacement.TOP_LEFT;
        }

    };
})(OpenSeadragon);

/*
 * OpenSeadragon - Drawer
 *
 * Copyright (C) 2009 CodePlex Foundation
 * Copyright (C) 2010-2013 OpenSeadragon contributors
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 * - Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 *
 * - Neither the name of CodePlex Foundation nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

(function ($) {

    /**
     * @class Drawer
     * @memberof OpenSeadragon
     * @classdesc Handles rendering of tiles for an {@link OpenSeadragon.Viewer}.
     * @param {Object} options - Options for this Drawer.
     * @param {OpenSeadragon.Viewer} options.viewer - The Viewer that owns this Drawer.
     * @param {OpenSeadragon.Viewport} options.viewport - Reference to Viewer viewport.
     * @param {Element} options.element - Parent element.
     * @param {Number} [options.debugGridColor] - See debugGridColor in {@link OpenSeadragon.Options} for details.
     */
    $.Drawer = function (options) {

        $.console.assert(options.viewer, "[Drawer] options.viewer is required");

        //backward compatibility for positional args while prefering more
        //idiomatic javascript options object as the only argument
        var args = arguments;

        if (!$.isPlainObject(options)) {
            options = {
                source: args[0], // Reference to Viewer tile source.
                viewport: args[1], // Reference to Viewer viewport.
                element: args[2] // Parent element.
            };
        }

        $.console.assert(options.viewport, "[Drawer] options.viewport is required");
        $.console.assert(options.element, "[Drawer] options.element is required");

        if (options.source) {
            $.console.error("[Drawer] options.source is no longer accepted; use TiledImage instead");
        }

        this.viewer = options.viewer;
        this.viewport = options.viewport;
        this.debugGridColor = options.debugGridColor || $.DEFAULT_SETTINGS.debugGridColor;
        if (options.opacity) {
            $.console.error("[Drawer] options.opacity is no longer accepted; set the opacity on the TiledImage instead");
        }

        this.useCanvas = $.supportsCanvas && (this.viewer ? this.viewer.useCanvas : true);
        /**
         * The parent element of this Drawer instance, passed in when the Drawer was created.
         * The parent of {@link OpenSeadragon.Drawer#canvas}.
         * @member {Element} container
         * @memberof OpenSeadragon.Drawer#
         */
        this.container = $.getElement(options.element);
        /**
         * A &lt;canvas&gt; element if the browser supports them, otherwise a &lt;div&gt; element.
         * Child element of {@link OpenSeadragon.Drawer#container}.
         * @member {Element} canvas
         * @memberof OpenSeadragon.Drawer#
         */
        this.canvas = $.makeNeutralElement(this.useCanvas ? "canvas" : "div");
        /**
         * 2d drawing context for {@link OpenSeadragon.Drawer#canvas} if it's a &lt;canvas&gt; element, otherwise null.
         * @member {Object} context
         * @memberof OpenSeadragon.Drawer#
         */
        this.context = this.useCanvas ? this.canvas.getContext("2d") : null;

        /**
         * Sketch canvas used to temporarily draw tiles which cannot be drawn directly
         * to the main canvas due to opacity. Lazily initialized.
         */
        this.sketchCanvas = null;
        this.sketchContext = null;

        /**
         * @member {Element} element
         * @memberof OpenSeadragon.Drawer#
         * @deprecated Alias for {@link OpenSeadragon.Drawer#container}.
         */
        this.element = this.container;

        // We force our container to ltr because our drawing math doesn't work in rtl.
        // This issue only affects our canvas renderer, but we do it always for consistency.
        // Note that this means overlays you want to be rtl need to be explicitly set to rtl.
        this.container.dir = 'ltr';

        // check canvas available width and height, set canvas width and height such that the canvas backing store is set to the proper pixel density
        if (this.useCanvas) {
            var viewportSize = this._calculateCanvasSize();
            this.canvas.width = viewportSize.x;
            this.canvas.height = viewportSize.y;
        }

        this.canvas.style.width = "100%";
        this.canvas.style.height = "100%";
        this.canvas.style.position = "absolute";
        $.setElementOpacity(this.canvas, this.opacity, true);

        // explicit left-align
        this.container.style.textAlign = "left";
        this.container.appendChild(this.canvas);
    };

    $.Drawer.prototype = /** @lends OpenSeadragon.Drawer.prototype */{
        // deprecated
        addOverlay: function addOverlay(element, location, placement, onDraw) {
            $.console.error("drawer.addOverlay is deprecated. Use viewer.addOverlay instead.");
            this.viewer.addOverlay(element, location, placement, onDraw);
            return this;
        },

        // deprecated
        updateOverlay: function updateOverlay(element, location, placement) {
            $.console.error("drawer.updateOverlay is deprecated. Use viewer.updateOverlay instead.");
            this.viewer.updateOverlay(element, location, placement);
            return this;
        },

        // deprecated
        removeOverlay: function removeOverlay(element) {
            $.console.error("drawer.removeOverlay is deprecated. Use viewer.removeOverlay instead.");
            this.viewer.removeOverlay(element);
            return this;
        },

        // deprecated
        clearOverlays: function clearOverlays() {
            $.console.error("drawer.clearOverlays is deprecated. Use viewer.clearOverlays instead.");
            this.viewer.clearOverlays();
            return this;
        },

        /**
         * Set the opacity of the drawer.
         * @param {Number} opacity
         * @return {OpenSeadragon.Drawer} Chainable.
         */
        setOpacity: function setOpacity(opacity) {
            $.console.error("drawer.setOpacity is deprecated. Use tiledImage.setOpacity instead.");
            var world = this.viewer.world;
            for (var i = 0; i < world.getItemCount(); i++) {
                world.getItemAt(i).setOpacity(opacity);
            }
            return this;
        },

        /**
         * Get the opacity of the drawer.
         * @returns {Number}
         */
        getOpacity: function getOpacity() {
            $.console.error("drawer.getOpacity is deprecated. Use tiledImage.getOpacity instead.");
            var world = this.viewer.world;
            var maxOpacity = 0;
            for (var i = 0; i < world.getItemCount(); i++) {
                var opacity = world.getItemAt(i).getOpacity();
                if (opacity > maxOpacity) {
                    maxOpacity = opacity;
                }
            }
            return maxOpacity;
        },

        // deprecated
        needsUpdate: function needsUpdate() {
            $.console.error("[Drawer.needsUpdate] this function is deprecated. Use World.needsDraw instead.");
            return this.viewer.world.needsDraw();
        },

        // deprecated
        numTilesLoaded: function numTilesLoaded() {
            $.console.error("[Drawer.numTilesLoaded] this function is deprecated. Use TileCache.numTilesLoaded instead.");
            return this.viewer.tileCache.numTilesLoaded();
        },

        // deprecated
        reset: function reset() {
            $.console.error("[Drawer.reset] this function is deprecated. Use World.resetItems instead.");
            this.viewer.world.resetItems();
            return this;
        },

        // deprecated
        update: function update() {
            $.console.error("[Drawer.update] this function is deprecated. Use Drawer.clear and World.draw instead.");
            this.clear();
            this.viewer.world.draw();
            return this;
        },

        /**
         * @return {Boolean} True if rotation is supported.
         */
        canRotate: function canRotate() {
            return this.useCanvas;
        },

        /**
         * Destroy the drawer (unload current loaded tiles)
         */
        destroy: function destroy() {
            //force unloading of current canvas (1x1 will be gc later, trick not necessarily needed)
            this.canvas.width = 1;
            this.canvas.height = 1;
            this.sketchCanvas = null;
            this.sketchContext = null;
        },

        /**
         * Clears the Drawer so it's ready to draw another frame.
         */
        clear: function clear() {
            this.canvas.innerHTML = "";
            if (this.useCanvas) {
                var viewportSize = this._calculateCanvasSize();
                if (this.canvas.width != viewportSize.x || this.canvas.height != viewportSize.y) {
                    this.canvas.width = viewportSize.x;
                    this.canvas.height = viewportSize.y;
                    if (this.sketchCanvas !== null) {
                        this.sketchCanvas.width = this.canvas.width;
                        this.sketchCanvas.height = this.canvas.height;
                    }
                }
                this._clear();
            }
        },

        _clear: function _clear(useSketch) {
            if (!this.useCanvas) {
                return;
            }
            var context = this._getContext(useSketch);
            var canvas = context.canvas;
            context.clearRect(0, 0, canvas.width, canvas.height);
        },

        /**
         * Translates from OpenSeadragon viewer rectangle to drawer rectangle.
         * @param {OpenSeadragon.Rect} rectangle - The rectangle in viewport coordinate system.
         * @return {OpenSeadragon.Rect} Rectangle in drawer coordinate system.
         */
        viewportToDrawerRectangle: function viewportToDrawerRectangle(rectangle) {
            var topLeft = this.viewport.pixelFromPoint(rectangle.getTopLeft(), true);
            var size = this.viewport.deltaPixelsFromPoints(rectangle.getSize(), true);

            return new $.Rect(topLeft.x * $.pixelDensityRatio, topLeft.y * $.pixelDensityRatio, size.x * $.pixelDensityRatio, size.y * $.pixelDensityRatio);
        },

        /**
         * Draws the given tile.
         * @param {OpenSeadragon.Tile} tile - The tile to draw.
         * @param {Function} drawingHandler - Method for firing the drawing event if using canvas.
         * drawingHandler({context, tile, rendered})
         * @param {Boolean} useSketch - Whether to use the sketch canvas or not.
         * where <code>rendered</code> is the context with the pre-drawn image.
         */
        drawTile: function drawTile(tile, drawingHandler, useSketch) {
            $.console.assert(tile, '[Drawer.drawTile] tile is required');
            $.console.assert(drawingHandler, '[Drawer.drawTile] drawingHandler is required');

            if (this.useCanvas) {
                var context = this._getContext(useSketch);
                // TODO do this in a more performant way
                // specifically, don't save,rotate,restore every time we draw a tile
                if (this.viewport.degrees !== 0) {
                    this._offsetForRotation(tile, this.viewport.degrees, useSketch);
                    tile.drawCanvas(context, drawingHandler);
                    this._restoreRotationChanges(tile, useSketch);
                } else {
                    tile.drawCanvas(context, drawingHandler);
                }
            } else {
                tile.drawHTML(this.canvas);
            }
        },

        _getContext: function _getContext(useSketch) {
            var context = this.context;
            if (useSketch) {
                if (this.sketchCanvas === null) {
                    this.sketchCanvas = document.createElement("canvas");
                    this.sketchCanvas.width = this.canvas.width;
                    this.sketchCanvas.height = this.canvas.height;
                    this.sketchContext = this.sketchCanvas.getContext("2d");
                }
                context = this.sketchContext;
            }
            return context;
        },

        // private
        saveContext: function saveContext(useSketch) {
            if (!this.useCanvas) {
                return;
            }

            this._getContext(useSketch).save();
        },

        // private
        restoreContext: function restoreContext(useSketch) {
            if (!this.useCanvas) {
                return;
            }

            this._getContext(useSketch).restore();
        },

        // private
        setClip: function setClip(rect, useSketch) {
            if (!this.useCanvas) {
                return;
            }

            var context = this._getContext(useSketch);
            context.beginPath();
            context.rect(rect.x, rect.y, rect.width, rect.height);
            context.clip();
        },

        // private
        drawRectangle: function drawRectangle(rect, fillStyle, useSketch) {
            if (!this.useCanvas) {
                return;
            }

            var context = this._getContext(useSketch);
            context.save();
            context.fillStyle = fillStyle;
            context.fillRect(rect.x, rect.y, rect.width, rect.height);
            context.restore();
        },

        /**
         * Blends the sketch canvas in the main canvas.
         * @param {Float} opacity The opacity of the blending.
         * @returns {undefined}
         */
        blendSketch: function blendSketch(opacity) {
            if (!this.useCanvas || !this.sketchCanvas) {
                return;
            }

            this.context.save();
            this.context.globalAlpha = opacity;
            this.context.drawImage(this.sketchCanvas, 0, 0);
            this.context.restore();
        },

        // private
        drawDebugInfo: function drawDebugInfo(tile, count, i) {
            if (!this.useCanvas) {
                return;
            }

            var context = this.context;
            context.save();
            context.lineWidth = 2 * $.pixelDensityRatio;
            context.font = 'small-caps bold ' + 13 * $.pixelDensityRatio + 'px arial';
            context.strokeStyle = this.debugGridColor;
            context.fillStyle = this.debugGridColor;

            if (this.viewport.degrees !== 0) {
                this._offsetForRotation(tile, this.viewport.degrees);
            }

            context.strokeRect(tile.position.x * $.pixelDensityRatio, tile.position.y * $.pixelDensityRatio, tile.size.x * $.pixelDensityRatio, tile.size.y * $.pixelDensityRatio);

            var tileCenterX = (tile.position.x + tile.size.x / 2) * $.pixelDensityRatio;
            var tileCenterY = (tile.position.y + tile.size.y / 2) * $.pixelDensityRatio;

            // Rotate the text the right way around.
            context.translate(tileCenterX, tileCenterY);
            context.rotate(Math.PI / 180 * -this.viewport.degrees);
            context.translate(-tileCenterX, -tileCenterY);

            if (tile.x === 0 && tile.y === 0) {
                context.fillText("Zoom: " + this.viewport.getZoom(), tile.position.x * $.pixelDensityRatio, (tile.position.y - 30) * $.pixelDensityRatio);
                context.fillText("Pan: " + this.viewport.getBounds().toString(), tile.position.x * $.pixelDensityRatio, (tile.position.y - 20) * $.pixelDensityRatio);
            }
            context.fillText("Level: " + tile.level, (tile.position.x + 10) * $.pixelDensityRatio, (tile.position.y + 20) * $.pixelDensityRatio);
            context.fillText("Column: " + tile.x, (tile.position.x + 10) * $.pixelDensityRatio, (tile.position.y + 30) * $.pixelDensityRatio);
            context.fillText("Row: " + tile.y, (tile.position.x + 10) * $.pixelDensityRatio, (tile.position.y + 40) * $.pixelDensityRatio);
            context.fillText("Order: " + i + " of " + count, (tile.position.x + 10) * $.pixelDensityRatio, (tile.position.y + 50) * $.pixelDensityRatio);
            context.fillText("Size: " + tile.size.toString(), (tile.position.x + 10) * $.pixelDensityRatio, (tile.position.y + 60) * $.pixelDensityRatio);
            context.fillText("Position: " + tile.position.toString(), (tile.position.x + 10) * $.pixelDensityRatio, (tile.position.y + 70) * $.pixelDensityRatio);

            if (this.viewport.degrees !== 0) {
                this._restoreRotationChanges(tile);
            }
            context.restore();
        },

        // private
        debugRect: function debugRect(rect) {
            if (this.useCanvas) {
                var context = this.context;
                context.save();
                context.lineWidth = 2 * $.pixelDensityRatio;
                context.strokeStyle = this.debugGridColor;
                context.fillStyle = this.debugGridColor;

                context.strokeRect(rect.x * $.pixelDensityRatio, rect.y * $.pixelDensityRatio, rect.width * $.pixelDensityRatio, rect.height * $.pixelDensityRatio);

                context.restore();
            }
        },

        // private
        _offsetForRotation: function _offsetForRotation(tile, degrees, useSketch) {
            var cx = this.canvas.width / 2,
                cy = this.canvas.height / 2;

            var context = this._getContext(useSketch);
            context.save();

            context.translate(cx, cy);
            context.rotate(Math.PI / 180 * degrees);
            context.translate(-cx, -cy);
        },

        // private
        _restoreRotationChanges: function _restoreRotationChanges(tile, useSketch) {
            var context = this._getContext(useSketch);
            context.restore();
        },

        // private
        _calculateCanvasSize: function _calculateCanvasSize() {
            var pixelDensityRatio = $.pixelDensityRatio;
            var viewportSize = this.viewport.getContainerSize();
            return {
                x: viewportSize.x * pixelDensityRatio,
                y: viewportSize.y * pixelDensityRatio
            };
        }
    };
})(OpenSeadragon);

/*
 * OpenSeadragon - Viewport
 *
 * Copyright (C) 2009 CodePlex Foundation
 * Copyright (C) 2010-2013 OpenSeadragon contributors
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 * - Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 *
 * - Neither the name of CodePlex Foundation nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

(function ($) {

    /**
     * @class Viewport
     * @memberof OpenSeadragon
     * @classdesc Handles coordinate-related functionality (zoom, pan, rotation, etc.)
     * for an {@link OpenSeadragon.Viewer}.
     * @param {Object} options - Options for this Viewport.
     * @param {Object} [options.margins] - See viewportMargins in {@link OpenSeadragon.Options}.
     * @param {Number} [options.springStiffness] - See springStiffness in {@link OpenSeadragon.Options}.
     * @param {Number} [options.animationTime] - See animationTime in {@link OpenSeadragon.Options}.
     * @param {Number} [options.minZoomImageRatio] - See minZoomImageRatio in {@link OpenSeadragon.Options}.
     * @param {Number} [options.maxZoomPixelRatio] - See maxZoomPixelRatio in {@link OpenSeadragon.Options}.
     * @param {Number} [options.visibilityRatio] - See visibilityRatio in {@link OpenSeadragon.Options}.
     * @param {Boolean} [options.wrapHorizontal] - See wrapHorizontal in {@link OpenSeadragon.Options}.
     * @param {Boolean} [options.wrapVertical] - See wrapVertical in {@link OpenSeadragon.Options}.
     * @param {Number} [options.defaultZoomLevel] - See defaultZoomLevel in {@link OpenSeadragon.Options}.
     * @param {Number} [options.minZoomLevel] - See minZoomLevel in {@link OpenSeadragon.Options}.
     * @param {Number} [options.maxZoomLevel] - See maxZoomLevel in {@link OpenSeadragon.Options}.
     * @param {Number} [options.degrees] - See degrees in {@link OpenSeadragon.Options}.
     * @param {Boolean} [options.homeFillsViewer] - See homeFillsViewer in {@link OpenSeadragon.Options}.
     */
    $.Viewport = function (options) {

        //backward compatibility for positional args while prefering more
        //idiomatic javascript options object as the only argument
        var args = arguments;
        if (args.length && args[0] instanceof $.Point) {
            options = {
                containerSize: args[0],
                contentSize: args[1],
                config: args[2]
            };
        }

        //options.config and the general config argument are deprecated
        //in favor of the more direct specification of optional settings
        //being passed directly on the options object
        if (options.config) {
            $.extend(true, options, options.config);
            delete options.config;
        }

        this._margins = $.extend({
            left: 0,
            top: 0,
            right: 0,
            bottom: 0
        }, options.margins || {});

        delete options.margins;

        $.extend(true, this, {

            //required settings
            containerSize: null,
            contentSize: null,

            //internal state properties
            zoomPoint: null,
            viewer: null,

            //configurable options
            springStiffness: $.DEFAULT_SETTINGS.springStiffness,
            animationTime: $.DEFAULT_SETTINGS.animationTime,
            minZoomImageRatio: $.DEFAULT_SETTINGS.minZoomImageRatio,
            maxZoomPixelRatio: $.DEFAULT_SETTINGS.maxZoomPixelRatio,
            visibilityRatio: $.DEFAULT_SETTINGS.visibilityRatio,
            wrapHorizontal: $.DEFAULT_SETTINGS.wrapHorizontal,
            wrapVertical: $.DEFAULT_SETTINGS.wrapVertical,
            defaultZoomLevel: $.DEFAULT_SETTINGS.defaultZoomLevel,
            minZoomLevel: $.DEFAULT_SETTINGS.minZoomLevel,
            maxZoomLevel: $.DEFAULT_SETTINGS.maxZoomLevel,
            degrees: $.DEFAULT_SETTINGS.degrees,
            homeFillsViewer: $.DEFAULT_SETTINGS.homeFillsViewer

        }, options);

        this._updateContainerInnerSize();

        this.centerSpringX = new $.Spring({
            initial: 0,
            springStiffness: this.springStiffness,
            animationTime: this.animationTime
        });
        this.centerSpringY = new $.Spring({
            initial: 0,
            springStiffness: this.springStiffness,
            animationTime: this.animationTime
        });
        this.zoomSpring = new $.Spring({
            exponential: true,
            initial: 1,
            springStiffness: this.springStiffness,
            animationTime: this.animationTime
        });

        this._oldCenterX = this.centerSpringX.current.value;
        this._oldCenterY = this.centerSpringY.current.value;
        this._oldZoom = this.zoomSpring.current.value;

        if (this.contentSize) {
            this.resetContentSize(this.contentSize);
        } else {
            this.setHomeBounds(new $.Rect(0, 0, 1, 1), 1);
        }

        this.goHome(true);
        this.update();
    };

    $.Viewport.prototype = /** @lends OpenSeadragon.Viewport.prototype */{
        /**
         * Updates the viewport's home bounds and constraints for the given content size.
         * @function
         * @param {OpenSeadragon.Point} contentSize - size of the content in content units
         * @return {OpenSeadragon.Viewport} Chainable.
         * @fires OpenSeadragon.Viewer.event:reset-size
         */
        resetContentSize: function resetContentSize(contentSize) {
            $.console.assert(contentSize, "[Viewport.resetContentSize] contentSize is required");
            $.console.assert(contentSize instanceof $.Point, "[Viewport.resetContentSize] contentSize must be an OpenSeadragon.Point");
            $.console.assert(contentSize.x > 0, "[Viewport.resetContentSize] contentSize.x must be greater than 0");
            $.console.assert(contentSize.y > 0, "[Viewport.resetContentSize] contentSize.y must be greater than 0");

            this.setHomeBounds(new $.Rect(0, 0, 1, contentSize.y / contentSize.x), contentSize.x);
            return this;
        },

        /**
         * Updates the viewport's home bounds and constraints.
         * @function
         * @param {OpenSeadragon.Rect} bounds - the new bounds in viewport coordinates
         * @param {Number} contentFactor - how many content units per viewport unit
         * @fires OpenSeadragon.Viewer.event:reset-size
         */
        setHomeBounds: function setHomeBounds(bounds, contentFactor) {
            $.console.assert(bounds, "[Viewport.setHomeBounds] bounds is required");
            $.console.assert(bounds instanceof $.Rect, "[Viewport.setHomeBounds] bounds must be an OpenSeadragon.Rect");
            $.console.assert(bounds.width > 0, "[Viewport.setHomeBounds] bounds.width must be greater than 0");
            $.console.assert(bounds.height > 0, "[Viewport.setHomeBounds] bounds.height must be greater than 0");

            this.homeBounds = bounds.clone();
            this.contentSize = this.homeBounds.getSize().times(contentFactor);
            this.contentAspectX = this.contentSize.x / this.contentSize.y;
            this.contentAspectY = this.contentSize.y / this.contentSize.x;

            if (this.viewer) {
                /**
                 * Raised when the viewer's content size or home bounds are reset
                 * (see {@link OpenSeadragon.Viewport#resetContentSize},
                 * {@link OpenSeadragon.Viewport#setHomeBounds}).
                 *
                 * @event reset-size
                 * @memberof OpenSeadragon.Viewer
                 * @type {object}
                 * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised this event.
                 * @property {OpenSeadragon.Point} contentSize
                 * @property {OpenSeadragon.Rect} homeBounds
                 * @property {Number} contentFactor
                 * @property {?Object} userData - Arbitrary subscriber-defined object.
                 */
                this.viewer.raiseEvent('reset-size', {
                    contentSize: this.contentSize.clone(),
                    contentFactor: contentFactor,
                    homeBounds: this.homeBounds.clone()
                });
            }
        },

        /**
         * @function
         */
        getHomeZoom: function getHomeZoom() {
            if (this.defaultZoomLevel) {
                return this.defaultZoomLevel;
            } else {
                var aspectFactor = this.contentAspectX / this.getAspectRatio();

                var output;
                if (this.homeFillsViewer) {
                    // fill the viewer and clip the image
                    output = aspectFactor >= 1 ? aspectFactor : 1;
                } else {
                    output = aspectFactor >= 1 ? 1 : aspectFactor;
                }

                return output / this.homeBounds.width;
            }
        },

        /**
         * @function
         */
        getHomeBounds: function getHomeBounds() {
            var center = this.homeBounds.getCenter(),
                width = 1.0 / this.getHomeZoom(),
                height = width / this.getAspectRatio();

            return new $.Rect(center.x - width / 2.0, center.y - height / 2.0, width, height);
        },

        /**
         * @function
         * @param {Boolean} immediately
         * @fires OpenSeadragon.Viewer.event:home
         */
        goHome: function goHome(immediately) {
            if (this.viewer) {
                /**
                 * Raised when the "home" operation occurs (see {@link OpenSeadragon.Viewport#goHome}).
                 *
                 * @event home
                 * @memberof OpenSeadragon.Viewer
                 * @type {object}
                 * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised this event.
                 * @property {Boolean} immediately
                 * @property {?Object} userData - Arbitrary subscriber-defined object.
                 */
                this.viewer.raiseEvent('home', {
                    immediately: immediately
                });
            }
            return this.fitBounds(this.getHomeBounds(), immediately);
        },

        /**
         * @function
         */
        getMinZoom: function getMinZoom() {
            var homeZoom = this.getHomeZoom(),
                zoom = this.minZoomLevel ? this.minZoomLevel : this.minZoomImageRatio * homeZoom;

            return zoom;
        },

        /**
         * @function
         */
        getMaxZoom: function getMaxZoom() {
            var zoom = this.maxZoomLevel;
            if (!zoom) {
                zoom = this.contentSize.x * this.maxZoomPixelRatio / this._containerInnerSize.x;
                zoom /= this.homeBounds.width;
            }

            return Math.max(zoom, this.getHomeZoom());
        },

        /**
         * @function
         */
        getAspectRatio: function getAspectRatio() {
            return this._containerInnerSize.x / this._containerInnerSize.y;
        },

        /**
         * @function
         * @returns {OpenSeadragon.Point} The size of the container, in screen coordinates.
         */
        getContainerSize: function getContainerSize() {
            return new $.Point(this.containerSize.x, this.containerSize.y);
        },

        /**
         * @function
         * The margins push the "home" region in from the sides by the specified amounts.
         * @returns {Object} Properties (Numbers, in screen coordinates): left, top, right, bottom.
         */
        getMargins: function getMargins() {
            return $.extend({}, this._margins); // Make a copy so we are not returning our original
        },

        /**
         * @function
         * The margins push the "home" region in from the sides by the specified amounts.
         * @param {Object} margins - Properties (Numbers, in screen coordinates): left, top, right, bottom.
         */
        setMargins: function setMargins(margins) {
            $.console.assert($.type(margins) === 'object', '[Viewport.setMargins] margins must be an object');

            this._margins = $.extend({
                left: 0,
                top: 0,
                right: 0,
                bottom: 0
            }, margins);

            this._updateContainerInnerSize();
            this.viewer.forceRedraw();
        },

        /**
         * @function
         * @param {Boolean} current - Pass true for the current location; defaults to false (target location).
         * @returns {OpenSeadragon.Rect} The location you are zoomed/panned to, in viewport coordinates.
         */
        getBounds: function getBounds(current) {
            var center = this.getCenter(current),
                width = 1.0 / this.getZoom(current),
                height = width / this.getAspectRatio();

            return new $.Rect(center.x - width / 2.0, center.y - height / 2.0, width, height);
        },

        /**
         * @function
         * @param {Boolean} current - Pass true for the current location; defaults to false (target location).
         * @returns {OpenSeadragon.Rect} The location you are zoomed/panned to,
         * including the space taken by margins, in viewport coordinates.
         */
        getBoundsWithMargins: function getBoundsWithMargins(current) {
            var bounds = this.getBounds(current);
            var factor = this._containerInnerSize.x * this.getZoom(current);
            bounds.x -= this._margins.left / factor;
            bounds.y -= this._margins.top / factor;
            bounds.width += (this._margins.left + this._margins.right) / factor;
            bounds.height += (this._margins.top + this._margins.bottom) / factor;
            return bounds;
        },

        /**
         * @function
         * @param {Boolean} current - Pass true for the current location; defaults to false (target location).
         */
        getCenter: function getCenter(current) {
            var centerCurrent = new $.Point(this.centerSpringX.current.value, this.centerSpringY.current.value),
                centerTarget = new $.Point(this.centerSpringX.target.value, this.centerSpringY.target.value),
                oldZoomPixel,
                zoom,
                width,
                height,
                bounds,
                newZoomPixel,
                deltaZoomPixels,
                deltaZoomPoints;

            if (current) {
                return centerCurrent;
            } else if (!this.zoomPoint) {
                return centerTarget;
            }

            oldZoomPixel = this.pixelFromPoint(this.zoomPoint, true);

            zoom = this.getZoom();
            width = 1.0 / zoom;
            height = width / this.getAspectRatio();
            bounds = new $.Rect(centerCurrent.x - width / 2.0, centerCurrent.y - height / 2.0, width, height);

            newZoomPixel = this._pixelFromPoint(this.zoomPoint, bounds);
            deltaZoomPixels = newZoomPixel.minus(oldZoomPixel);
            deltaZoomPoints = deltaZoomPixels.divide(this._containerInnerSize.x * zoom);

            return centerTarget.plus(deltaZoomPoints);
        },

        /**
         * @function
         * @param {Boolean} current - Pass true for the current location; defaults to false (target location).
         */
        getZoom: function getZoom(current) {
            if (current) {
                return this.zoomSpring.current.value;
            } else {
                return this.zoomSpring.target.value;
            }
        },

        /**
         * @function
         * @private
         * @param {OpenSeadragon.Rect} bounds
         * @param {Boolean} immediately
         * @return {OpenSeadragon.Rect} constrained bounds.
         */
        _applyBoundaryConstraints: function _applyBoundaryConstraints(bounds, immediately) {
            var dx = 0,
                dy = 0,
                newBounds = new $.Rect(bounds.x, bounds.y, bounds.width, bounds.height);

            var horizontalThreshold = this.visibilityRatio * newBounds.width;
            var verticalThreshold = this.visibilityRatio * newBounds.height;

            if (this.wrapHorizontal) {
                //do nothing
            } else {
                    var thresholdLeft = newBounds.x + (newBounds.width - horizontalThreshold);
                    if (this.homeBounds.x > thresholdLeft) {
                        dx = this.homeBounds.x - thresholdLeft;
                    }

                    var homeRight = this.homeBounds.x + this.homeBounds.width;
                    var thresholdRight = newBounds.x + horizontalThreshold;
                    if (homeRight < thresholdRight) {
                        var newDx = homeRight - thresholdRight;
                        if (dx) {
                            dx = (dx + newDx) / 2;
                        } else {
                            dx = newDx;
                        }
                    }
                }

            if (this.wrapVertical) {
                //do nothing
            } else {
                    var thresholdTop = newBounds.y + (newBounds.height - verticalThreshold);
                    if (this.homeBounds.y > thresholdTop) {
                        dy = this.homeBounds.y - thresholdTop;
                    }

                    var homeBottom = this.homeBounds.y + this.homeBounds.height;
                    var thresholdBottom = newBounds.y + verticalThreshold;
                    if (homeBottom < thresholdBottom) {
                        var newDy = homeBottom - thresholdBottom;
                        if (dy) {
                            dy = (dy + newDy) / 2;
                        } else {
                            dy = newDy;
                        }
                    }
                }

            if (dx || dy) {
                newBounds.x += dx;
                newBounds.y += dy;
            }

            if (this.viewer) {
                /**
                 * Raised when the viewport constraints are applied (see {@link OpenSeadragon.Viewport#applyConstraints}).
                 *
                 * @event constrain
                 * @memberof OpenSeadragon.Viewer
                 * @type {object}
                 * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised this event.
                 * @property {Boolean} immediately
                 * @property {?Object} userData - Arbitrary subscriber-defined object.
                 */
                this.viewer.raiseEvent('constrain', {
                    immediately: immediately
                });
            }

            return newBounds;
        },

        /**
         * @function
         * @return {OpenSeadragon.Viewport} Chainable.
         * @fires OpenSeadragon.Viewer.event:constrain
         */
        applyConstraints: function applyConstraints(immediately) {
            var actualZoom = this.getZoom(),
                constrainedZoom = Math.max(Math.min(actualZoom, this.getMaxZoom()), this.getMinZoom()),
                bounds,
                constrainedBounds;

            if (actualZoom != constrainedZoom) {
                this.zoomTo(constrainedZoom, this.zoomPoint, immediately);
            }

            bounds = this.getBounds();

            constrainedBounds = this._applyBoundaryConstraints(bounds, immediately);

            if (bounds.x !== constrainedBounds.x || bounds.y !== constrainedBounds.y || immediately) {
                this.fitBounds(constrainedBounds, immediately);
            }

            return this;
        },

        /**
         * @function
         * @param {Boolean} immediately
         */
        ensureVisible: function ensureVisible(immediately) {
            return this.applyConstraints(immediately);
        },

        /**
         * @function
         * @private
         * @param {OpenSeadragon.Rect} bounds
         * @param {Object} options (immediately=false, constraints=false)
         * @return {OpenSeadragon.Viewport} Chainable.
         */
        _fitBounds: function _fitBounds(bounds, options) {
            options = options || {};
            var immediately = options.immediately || false;
            var constraints = options.constraints || false;

            var aspect = this.getAspectRatio(),
                center = bounds.getCenter(),
                newBounds = new $.Rect(bounds.x, bounds.y, bounds.width, bounds.height),
                oldBounds,
                oldZoom,
                newZoom,
                referencePoint,
                newBoundsAspectRatio,
                newConstrainedZoom;

            if (newBounds.getAspectRatio() >= aspect) {
                newBounds.height = bounds.width / aspect;
                newBounds.y = center.y - newBounds.height / 2;
            } else {
                newBounds.width = bounds.height * aspect;
                newBounds.x = center.x - newBounds.width / 2;
            }

            if (constraints) {
                newBoundsAspectRatio = newBounds.getAspectRatio();
            }

            this.panTo(this.getCenter(true), true);
            this.zoomTo(this.getZoom(true), null, true);

            oldBounds = this.getBounds();
            oldZoom = this.getZoom();
            newZoom = 1.0 / newBounds.width;

            if (constraints) {
                newConstrainedZoom = Math.max(Math.min(newZoom, this.getMaxZoom()), this.getMinZoom());

                if (newZoom !== newConstrainedZoom) {
                    newZoom = newConstrainedZoom;
                    newBounds.width = 1.0 / newZoom;
                    newBounds.x = center.x - newBounds.width / 2;
                    newBounds.height = newBounds.width / newBoundsAspectRatio;
                    newBounds.y = center.y - newBounds.height / 2;
                }

                newBounds = this._applyBoundaryConstraints(newBounds, immediately);
                center = newBounds.getCenter();
            }

            if (immediately) {
                this.panTo(center, true);
                return this.zoomTo(newZoom, null, true);
            }

            if (Math.abs(newZoom - oldZoom) < 0.00000001 || Math.abs(newBounds.width - oldBounds.width) < 0.00000001) {
                return this.panTo(center, immediately);
            }

            referencePoint = oldBounds.getTopLeft().times(this._containerInnerSize.x / oldBounds.width).minus(newBounds.getTopLeft().times(this._containerInnerSize.x / newBounds.width)).divide(this._containerInnerSize.x / oldBounds.width - this._containerInnerSize.x / newBounds.width);

            return this.zoomTo(newZoom, referencePoint, immediately);
        },

        /**
         * @function
         * @param {OpenSeadragon.Rect} bounds
         * @param {Boolean} immediately
         * @return {OpenSeadragon.Viewport} Chainable.
         */
        fitBounds: function fitBounds(bounds, immediately) {
            return this._fitBounds(bounds, {
                immediately: immediately,
                constraints: false
            });
        },

        /**
         * @function
         * @param {OpenSeadragon.Rect} bounds
         * @param {Boolean} immediately
         * @return {OpenSeadragon.Viewport} Chainable.
         */
        fitBoundsWithConstraints: function fitBoundsWithConstraints(bounds, immediately) {
            return this._fitBounds(bounds, {
                immediately: immediately,
                constraints: true
            });
        },

        /**
         * Zooms so the image just fills the viewer vertically.
         * @param {Boolean} immediately
         * @return {OpenSeadragon.Viewport} Chainable.
         */
        fitVertically: function fitVertically(immediately) {
            var box = new $.Rect(this.homeBounds.x + this.homeBounds.width / 2, this.homeBounds.y, 0, this.homeBounds.height);

            return this.fitBounds(box, immediately);
        },

        /**
         * Zooms so the image just fills the viewer horizontally.
         * @param {Boolean} immediately
         * @return {OpenSeadragon.Viewport} Chainable.
         */
        fitHorizontally: function fitHorizontally(immediately) {
            var box = new $.Rect(this.homeBounds.x, this.homeBounds.y + this.homeBounds.height / 2, this.homeBounds.width, 0);

            return this.fitBounds(box, immediately);
        },

        /**
         * @function
         * @param {OpenSeadragon.Point} delta
         * @param {Boolean} immediately
         * @return {OpenSeadragon.Viewport} Chainable.
         * @fires OpenSeadragon.Viewer.event:pan
         */
        panBy: function panBy(delta, immediately) {
            var center = new $.Point(this.centerSpringX.target.value, this.centerSpringY.target.value);
            delta = delta.rotate(-this.degrees, new $.Point(0, 0));
            return this.panTo(center.plus(delta), immediately);
        },

        /**
         * @function
         * @param {OpenSeadragon.Point} center
         * @param {Boolean} immediately
         * @return {OpenSeadragon.Viewport} Chainable.
         * @fires OpenSeadragon.Viewer.event:pan
         */
        panTo: function panTo(center, immediately) {
            if (immediately) {
                this.centerSpringX.resetTo(center.x);
                this.centerSpringY.resetTo(center.y);
            } else {
                this.centerSpringX.springTo(center.x);
                this.centerSpringY.springTo(center.y);
            }

            if (this.viewer) {
                /**
                 * Raised when the viewport is panned (see {@link OpenSeadragon.Viewport#panBy} and {@link OpenSeadragon.Viewport#panTo}).
                 *
                 * @event pan
                 * @memberof OpenSeadragon.Viewer
                 * @type {object}
                 * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised this event.
                 * @property {OpenSeadragon.Point} center
                 * @property {Boolean} immediately
                 * @property {?Object} userData - Arbitrary subscriber-defined object.
                 */
                this.viewer.raiseEvent('pan', {
                    center: center,
                    immediately: immediately
                });
            }

            return this;
        },

        /**
         * @function
         * @return {OpenSeadragon.Viewport} Chainable.
         * @fires OpenSeadragon.Viewer.event:zoom
         */
        zoomBy: function zoomBy(factor, refPoint, immediately) {
            if (refPoint instanceof $.Point && !isNaN(refPoint.x) && !isNaN(refPoint.y)) {
                refPoint = refPoint.rotate(-this.degrees, new $.Point(this.centerSpringX.target.value, this.centerSpringY.target.value));
            }
            return this.zoomTo(this.zoomSpring.target.value * factor, refPoint, immediately);
        },

        /**
         * @function
         * @return {OpenSeadragon.Viewport} Chainable.
         * @fires OpenSeadragon.Viewer.event:zoom
         */
        zoomTo: function zoomTo(zoom, refPoint, immediately) {

            this.zoomPoint = refPoint instanceof $.Point && !isNaN(refPoint.x) && !isNaN(refPoint.y) ? refPoint : null;

            if (immediately) {
                this.zoomSpring.resetTo(zoom);
            } else {
                this.zoomSpring.springTo(zoom);
            }

            if (this.viewer) {
                /**
                 * Raised when the viewport zoom level changes (see {@link OpenSeadragon.Viewport#zoomBy} and {@link OpenSeadragon.Viewport#zoomTo}).
                 *
                 * @event zoom
                 * @memberof OpenSeadragon.Viewer
                 * @type {object}
                 * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised this event.
                 * @property {Number} zoom
                 * @property {OpenSeadragon.Point} refPoint
                 * @property {Boolean} immediately
                 * @property {?Object} userData - Arbitrary subscriber-defined object.
                 */
                this.viewer.raiseEvent('zoom', {
                    zoom: zoom,
                    refPoint: refPoint,
                    immediately: immediately
                });
            }

            return this;
        },

        /**
         * Rotates this viewport to the angle specified.
         * @function
         * @return {OpenSeadragon.Viewport} Chainable.
         */
        setRotation: function setRotation(degrees) {
            if (!(this.viewer && this.viewer.drawer.canRotate())) {
                return this;
            }

            degrees = (degrees + 360) % 360;
            this.degrees = degrees;
            this.viewer.forceRedraw();

            /**
             * Raised when rotation has been changed.
             *
             * @event rotate
             * @memberof OpenSeadragon.Viewer
             * @type {object}
             * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised the event.
             * @property {Number} degrees - The number of degrees the rotation was set to.
             * @property {?Object} userData - Arbitrary subscriber-defined object.
             */
            if (this.viewer !== null) {
                this.viewer.raiseEvent('rotate', { "degrees": degrees });
            }
            return this;
        },

        /**
         * Gets the current rotation in degrees.
         * @function
         * @return {Number} The current rotation in degrees.
         */
        getRotation: function getRotation() {
            return this.degrees;
        },

        /**
         * @function
         * @return {OpenSeadragon.Viewport} Chainable.
         * @fires OpenSeadragon.Viewer.event:resize
         */
        resize: function resize(newContainerSize, maintain) {
            var oldBounds = this.getBounds(),
                newBounds = oldBounds,
                widthDeltaFactor;

            this.containerSize.x = newContainerSize.x;
            this.containerSize.y = newContainerSize.y;

            this._updateContainerInnerSize();

            if (maintain) {
                // TODO: widthDeltaFactor will always be 1; probably not what's intended
                widthDeltaFactor = newContainerSize.x / this.containerSize.x;
                newBounds.width = oldBounds.width * widthDeltaFactor;
                newBounds.height = newBounds.width / this.getAspectRatio();
            }

            if (this.viewer) {
                /**
                 * Raised when the viewer is resized (see {@link OpenSeadragon.Viewport#resize}).
                 *
                 * @event resize
                 * @memberof OpenSeadragon.Viewer
                 * @type {object}
                 * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised this event.
                 * @property {OpenSeadragon.Point} newContainerSize
                 * @property {Boolean} maintain
                 * @property {?Object} userData - Arbitrary subscriber-defined object.
                 */
                this.viewer.raiseEvent('resize', {
                    newContainerSize: newContainerSize,
                    maintain: maintain
                });
            }

            return this.fitBounds(newBounds, true);
        },

        // private
        _updateContainerInnerSize: function _updateContainerInnerSize() {
            this._containerInnerSize = new $.Point(Math.max(1, this.containerSize.x - (this._margins.left + this._margins.right)), Math.max(1, this.containerSize.y - (this._margins.top + this._margins.bottom)));
        },

        /**
         * @function
         */
        update: function update() {
            var oldZoomPixel, newZoomPixel, deltaZoomPixels, deltaZoomPoints;

            if (this.zoomPoint) {
                oldZoomPixel = this.pixelFromPoint(this.zoomPoint, true);
            }

            this.zoomSpring.update();

            if (this.zoomPoint && this.zoomSpring.current.value != this._oldZoom) {
                newZoomPixel = this.pixelFromPoint(this.zoomPoint, true);
                deltaZoomPixels = newZoomPixel.minus(oldZoomPixel);
                deltaZoomPoints = this.deltaPointsFromPixels(deltaZoomPixels, true);

                this.centerSpringX.shiftBy(deltaZoomPoints.x);
                this.centerSpringY.shiftBy(deltaZoomPoints.y);
            } else {
                this.zoomPoint = null;
            }

            this.centerSpringX.update();
            this.centerSpringY.update();

            var changed = this.centerSpringX.current.value != this._oldCenterX || this.centerSpringY.current.value != this._oldCenterY || this.zoomSpring.current.value != this._oldZoom;

            this._oldCenterX = this.centerSpringX.current.value;
            this._oldCenterY = this.centerSpringY.current.value;
            this._oldZoom = this.zoomSpring.current.value;

            return changed;
        },

        /**
         * Convert a delta (translation vector) from pixels coordinates to viewport coordinates
         * @function
         * @param {Boolean} current - Pass true for the current location; defaults to false (target location).
         */
        deltaPixelsFromPoints: function deltaPixelsFromPoints(deltaPoints, current) {
            return deltaPoints.times(this._containerInnerSize.x * this.getZoom(current));
        },

        /**
         * Convert a delta (translation vector) from viewport coordinates to pixels coordinates.
         * @function
         * @param {Boolean} current - Pass true for the current location; defaults to false (target location).
         */
        deltaPointsFromPixels: function deltaPointsFromPixels(deltaPixels, current) {
            return deltaPixels.divide(this._containerInnerSize.x * this.getZoom(current));
        },

        /**
         * Convert image pixel coordinates to viewport coordinates.
         * @function
         * @param {Boolean} current - Pass true for the current location; defaults to false (target location).
         */
        pixelFromPoint: function pixelFromPoint(point, current) {
            return this._pixelFromPoint(point, this.getBounds(current));
        },

        // private
        _pixelFromPoint: function _pixelFromPoint(point, bounds) {
            return point.minus(bounds.getTopLeft()).times(this._containerInnerSize.x / bounds.width).plus(new $.Point(this._margins.left, this._margins.top));
        },

        /**
         * Convert viewport coordinates to image pixel coordinates.
         * @function
         * @param {Boolean} current - Pass true for the current location; defaults to false (target location).
         */
        pointFromPixel: function pointFromPixel(pixel, current) {
            var bounds = this.getBounds(current);
            return pixel.minus(new $.Point(this._margins.left, this._margins.top)).divide(this._containerInnerSize.x / bounds.width).plus(bounds.getTopLeft());
        },

        // private
        _viewportToImageDelta: function _viewportToImageDelta(viewerX, viewerY) {
            var scale = this.homeBounds.width;
            return new $.Point(viewerX * (this.contentSize.x / scale), viewerY * (this.contentSize.y * this.contentAspectX / scale));
        },

        /**
         * Translates from OpenSeadragon viewer coordinate system to image coordinate system.
         * This method can be called either by passing X,Y coordinates or an
         * OpenSeadragon.Point
         * Note: not accurate with multi-image; use TiledImage.viewportToImageCoordinates instead.
         * @function
         * @param {OpenSeadragon.Point} viewerX the point in viewport coordinate system.
         * @param {Number} viewerX X coordinate in viewport coordinate system.
         * @param {Number} viewerY Y coordinate in viewport coordinate system.
         * @return {OpenSeadragon.Point} a point representing the coordinates in the image.
         */
        viewportToImageCoordinates: function viewportToImageCoordinates(viewerX, viewerY) {
            if (arguments.length == 1) {
                //they passed a point instead of individual components
                return this.viewportToImageCoordinates(viewerX.x, viewerX.y);
            }

            if (this.viewer && this.viewer.world.getItemCount() > 1) {
                $.console.error('[Viewport.viewportToImageCoordinates] is not accurate with multi-image; use TiledImage.viewportToImageCoordinates instead.');
            }

            return this._viewportToImageDelta(viewerX - this.homeBounds.x, viewerY - this.homeBounds.y);
        },

        // private
        _imageToViewportDelta: function _imageToViewportDelta(imageX, imageY) {
            var scale = this.homeBounds.width;
            return new $.Point(imageX / this.contentSize.x * scale, imageY / this.contentSize.y / this.contentAspectX * scale);
        },

        /**
         * Translates from image coordinate system to OpenSeadragon viewer coordinate system
         * This method can be called either by passing X,Y coordinates or an
         * OpenSeadragon.Point
         * Note: not accurate with multi-image; use TiledImage.imageToViewportCoordinates instead.
         * @function
         * @param {OpenSeadragon.Point} imageX the point in image coordinate system.
         * @param {Number} imageX X coordinate in image coordinate system.
         * @param {Number} imageY Y coordinate in image coordinate system.
         * @return {OpenSeadragon.Point} a point representing the coordinates in the viewport.
         */
        imageToViewportCoordinates: function imageToViewportCoordinates(imageX, imageY) {
            if (arguments.length == 1) {
                //they passed a point instead of individual components
                return this.imageToViewportCoordinates(imageX.x, imageX.y);
            }

            if (this.viewer && this.viewer.world.getItemCount() > 1) {
                $.console.error('[Viewport.imageToViewportCoordinates] is not accurate with multi-image; use TiledImage.imageToViewportCoordinates instead.');
            }

            var point = this._imageToViewportDelta(imageX, imageY);
            point.x += this.homeBounds.x;
            point.y += this.homeBounds.y;
            return point;
        },

        /**
         * Translates from a rectangle which describes a portion of the image in
         * pixel coordinates to OpenSeadragon viewport rectangle coordinates.
         * This method can be called either by passing X,Y,width,height or an
         * OpenSeadragon.Rect
         * Note: not accurate with multi-image; use TiledImage.imageToViewportRectangle instead.
         * @function
         * @param {OpenSeadragon.Rect} imageX the rectangle in image coordinate system.
         * @param {Number} imageX the X coordinate of the top left corner of the rectangle
         * in image coordinate system.
         * @param {Number} imageY the Y coordinate of the top left corner of the rectangle
         * in image coordinate system.
         * @param {Number} pixelWidth the width in pixel of the rectangle.
         * @param {Number} pixelHeight the height in pixel of the rectangle.
         */
        imageToViewportRectangle: function imageToViewportRectangle(imageX, imageY, pixelWidth, pixelHeight) {
            var coordA, coordB, rect;
            if (arguments.length == 1) {
                //they passed a rectangle instead of individual components
                rect = imageX;
                return this.imageToViewportRectangle(rect.x, rect.y, rect.width, rect.height);
            }

            coordA = this.imageToViewportCoordinates(imageX, imageY);
            coordB = this._imageToViewportDelta(pixelWidth, pixelHeight);
            return new $.Rect(coordA.x, coordA.y, coordB.x, coordB.y);
        },

        /**
         * Translates from a rectangle which describes a portion of
         * the viewport in point coordinates to image rectangle coordinates.
         * This method can be called either by passing X,Y,width,height or an
         * OpenSeadragon.Rect
         * Note: not accurate with multi-image; use TiledImage.viewportToImageRectangle instead.
         * @function
         * @param {OpenSeadragon.Rect} viewerX the rectangle in viewport coordinate system.
         * @param {Number} viewerX the X coordinate of the top left corner of the rectangle
         * in viewport coordinate system.
         * @param {Number} imageY the Y coordinate of the top left corner of the rectangle
         * in viewport coordinate system.
         * @param {Number} pointWidth the width of the rectangle in viewport coordinate system.
         * @param {Number} pointHeight the height of the rectangle in viewport coordinate system.
         */
        viewportToImageRectangle: function viewportToImageRectangle(viewerX, viewerY, pointWidth, pointHeight) {
            var coordA, coordB, rect;
            if (arguments.length == 1) {
                //they passed a rectangle instead of individual components
                rect = viewerX;
                return this.viewportToImageRectangle(rect.x, rect.y, rect.width, rect.height);
            }

            coordA = this.viewportToImageCoordinates(viewerX, viewerY);
            coordB = this._viewportToImageDelta(pointWidth, pointHeight);
            return new $.Rect(coordA.x, coordA.y, coordB.x, coordB.y);
        },

        /**
         * Convert pixel coordinates relative to the viewer element to image
         * coordinates.
         * Note: not accurate with multi-image.
         * @param {OpenSeadragon.Point} pixel
         * @returns {OpenSeadragon.Point}
         */
        viewerElementToImageCoordinates: function viewerElementToImageCoordinates(pixel) {
            var point = this.pointFromPixel(pixel, true);
            return this.viewportToImageCoordinates(point);
        },

        /**
         * Convert pixel coordinates relative to the image to
         * viewer element coordinates.
         * Note: not accurate with multi-image.
         * @param {OpenSeadragon.Point} pixel
         * @returns {OpenSeadragon.Point}
         */
        imageToViewerElementCoordinates: function imageToViewerElementCoordinates(pixel) {
            var point = this.imageToViewportCoordinates(pixel);
            return this.pixelFromPoint(point, true);
        },

        /**
         * Convert pixel coordinates relative to the window to image coordinates.
         * Note: not accurate with multi-image.
         * @param {OpenSeadragon.Point} pixel
         * @returns {OpenSeadragon.Point}
         */
        windowToImageCoordinates: function windowToImageCoordinates(pixel) {
            var viewerCoordinates = pixel.minus(OpenSeadragon.getElementPosition(this.viewer.element));
            return this.viewerElementToImageCoordinates(viewerCoordinates);
        },

        /**
         * Convert image coordinates to pixel coordinates relative to the window.
         * Note: not accurate with multi-image.
         * @param {OpenSeadragon.Point} pixel
         * @returns {OpenSeadragon.Point}
         */
        imageToWindowCoordinates: function imageToWindowCoordinates(pixel) {
            var viewerCoordinates = this.imageToViewerElementCoordinates(pixel);
            return viewerCoordinates.plus(OpenSeadragon.getElementPosition(this.viewer.element));
        },

        /**
         * Convert pixel coordinates relative to the viewer element to viewport
         * coordinates.
         * @param {OpenSeadragon.Point} pixel
         * @returns {OpenSeadragon.Point}
         */
        viewerElementToViewportCoordinates: function viewerElementToViewportCoordinates(pixel) {
            return this.pointFromPixel(pixel, true);
        },

        /**
         * Convert viewport coordinates to pixel coordinates relative to the
         * viewer element.
         * @param {OpenSeadragon.Point} point
         * @returns {OpenSeadragon.Point}
         */
        viewportToViewerElementCoordinates: function viewportToViewerElementCoordinates(point) {
            return this.pixelFromPoint(point, true);
        },

        /**
         * Convert pixel coordinates relative to the window to viewport coordinates.
         * @param {OpenSeadragon.Point} pixel
         * @returns {OpenSeadragon.Point}
         */
        windowToViewportCoordinates: function windowToViewportCoordinates(pixel) {
            var viewerCoordinates = pixel.minus(OpenSeadragon.getElementPosition(this.viewer.element));
            return this.viewerElementToViewportCoordinates(viewerCoordinates);
        },

        /**
         * Convert viewport coordinates to pixel coordinates relative to the window.
         * @param {OpenSeadragon.Point} point
         * @returns {OpenSeadragon.Point}
         */
        viewportToWindowCoordinates: function viewportToWindowCoordinates(point) {
            var viewerCoordinates = this.viewportToViewerElementCoordinates(point);
            return viewerCoordinates.plus(OpenSeadragon.getElementPosition(this.viewer.element));
        },

        /**
         * Convert a viewport zoom to an image zoom.
         * Image zoom: ratio of the original image size to displayed image size.
         * 1 means original image size, 0.5 half size...
         * Viewport zoom: ratio of the displayed image's width to viewport's width.
         * 1 means identical width, 2 means image's width is twice the viewport's width...
         * Note: not accurate with multi-image.
         * @function
         * @param {Number} viewportZoom The viewport zoom
         * target zoom.
         * @returns {Number} imageZoom The image zoom
         */
        viewportToImageZoom: function viewportToImageZoom(viewportZoom) {
            if (this.viewer && this.viewer.world.getItemCount() > 1) {
                $.console.error('[Viewport.viewportToImageZoom] is not accurate with multi-image.');
            }

            var imageWidth = this.contentSize.x;
            var containerWidth = this._containerInnerSize.x;
            var scale = this.homeBounds.width;
            var viewportToImageZoomRatio = containerWidth / imageWidth * scale;
            return viewportZoom * viewportToImageZoomRatio;
        },

        /**
         * Convert an image zoom to a viewport zoom.
         * Image zoom: ratio of the original image size to displayed image size.
         * 1 means original image size, 0.5 half size...
         * Viewport zoom: ratio of the displayed image's width to viewport's width.
         * 1 means identical width, 2 means image's width is twice the viewport's width...
         * Note: not accurate with multi-image.
         * @function
         * @param {Number} imageZoom The image zoom
         * target zoom.
         * @returns {Number} viewportZoom The viewport zoom
         */
        imageToViewportZoom: function imageToViewportZoom(imageZoom) {
            if (this.viewer && this.viewer.world.getItemCount() > 1) {
                $.console.error('[Viewport.imageToViewportZoom] is not accurate with multi-image.');
            }

            var imageWidth = this.contentSize.x;
            var containerWidth = this._containerInnerSize.x;
            var scale = this.homeBounds.width;
            var viewportToImageZoomRatio = imageWidth / containerWidth / scale;
            return imageZoom * viewportToImageZoomRatio;
        }
    };
})(OpenSeadragon);

/*
 * OpenSeadragon - TiledImage
 *
 * Copyright (C) 2009 CodePlex Foundation
 * Copyright (C) 2010-2013 OpenSeadragon contributors
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 * - Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 *
 * - Neither the name of CodePlex Foundation nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

(function ($) {

    /**
     * You shouldn't have to create a TiledImage directly; use {@link OpenSeadragon.Viewer#open}
     * or {@link OpenSeadragon.Viewer#addTiledImage} instead.
     * @class TiledImage
     * @memberof OpenSeadragon
     * @extends OpenSeadragon.EventSource
     * @classdesc Handles rendering of tiles for an {@link OpenSeadragon.Viewer}.
     * A new instance is created for each TileSource opened.
     * @param {Object} options - Configuration for this TiledImage.
     * @param {OpenSeadragon.TileSource} options.source - The TileSource that defines this TiledImage.
     * @param {OpenSeadragon.Viewer} options.viewer - The Viewer that owns this TiledImage.
     * @param {OpenSeadragon.TileCache} options.tileCache - The TileCache for this TiledImage to use.
     * @param {OpenSeadragon.Drawer} options.drawer - The Drawer for this TiledImage to draw onto.
     * @param {OpenSeadragon.ImageLoader} options.imageLoader - The ImageLoader for this TiledImage to use.
     * @param {Number} [options.x=0] - Left position, in viewport coordinates.
     * @param {Number} [options.y=0] - Top position, in viewport coordinates.
     * @param {Number} [options.width=1] - Width, in viewport coordinates.
     * @param {Number} [options.height] - Height, in viewport coordinates.
     * @param {OpenSeadragon.Rect} [options.clip] - An area, in image pixels, to clip to
     * (portions of the image outside of this area will not be visible). Only works on
     * browsers that support the HTML5 canvas.
     * @param {Number} [options.springStiffness] - See {@link OpenSeadragon.Options}.
     * @param {Boolean} [options.animationTime] - See {@link OpenSeadragon.Options}.
     * @param {Number} [options.minZoomImageRatio] - See {@link OpenSeadragon.Options}.
     * @param {Boolean} [options.wrapHorizontal] - See {@link OpenSeadragon.Options}.
     * @param {Boolean} [options.wrapVertical] - See {@link OpenSeadragon.Options}.
     * @param {Boolean} [options.immediateRender] - See {@link OpenSeadragon.Options}.
     * @param {Number} [options.blendTime] - See {@link OpenSeadragon.Options}.
     * @param {Boolean} [options.alwaysBlend] - See {@link OpenSeadragon.Options}.
     * @param {Number} [options.minPixelRatio] - See {@link OpenSeadragon.Options}.
     * @param {Number} [options.opacity=1] - Opacity the tiled image should be drawn at.
     * @param {Boolean} [options.debugMode] - See {@link OpenSeadragon.Options}.
     * @param {String|CanvasGradient|CanvasPattern|Function} [options.placeholderFillStyle] - See {@link OpenSeadragon.Options}.
     * @param {String|Boolean} [options.crossOriginPolicy] - See {@link OpenSeadragon.Options}.
     */
    $.TiledImage = function (options) {
        var _this = this;

        $.console.assert(options.tileCache, "[TiledImage] options.tileCache is required");
        $.console.assert(options.drawer, "[TiledImage] options.drawer is required");
        $.console.assert(options.viewer, "[TiledImage] options.viewer is required");
        $.console.assert(options.imageLoader, "[TiledImage] options.imageLoader is required");
        $.console.assert(options.source, "[TiledImage] options.source is required");
        $.console.assert(!options.clip || options.clip instanceof $.Rect, "[TiledImage] options.clip must be an OpenSeadragon.Rect if present");

        $.EventSource.call(this);

        this._tileCache = options.tileCache;
        delete options.tileCache;

        this._drawer = options.drawer;
        delete options.drawer;

        this._imageLoader = options.imageLoader;
        delete options.imageLoader;

        if (options.clip instanceof $.Rect) {
            this._clip = options.clip.clone();
        }

        delete options.clip;

        var x = options.x || 0;
        delete options.x;
        var y = options.y || 0;
        delete options.y;

        // Ratio of zoomable image height to width.
        this.normHeight = options.source.dimensions.y / options.source.dimensions.x;
        this.contentAspectX = options.source.dimensions.x / options.source.dimensions.y;

        var scale = 1;
        if (options.width) {
            scale = options.width;
            delete options.width;

            if (options.height) {
                $.console.error("specifying both width and height to a tiledImage is not supported");
                delete options.height;
            }
        } else if (options.height) {
            scale = options.height / this.normHeight;
            delete options.height;
        }

        $.extend(true, this, {

            //internal state properties
            viewer: null,
            tilesMatrix: {}, // A '3d' dictionary [level][x][y] --> Tile.
            coverage: {}, // A '3d' dictionary [level][x][y] --> Boolean.
            lastDrawn: [], // An unordered list of Tiles drawn last frame.
            lastResetTime: 0, // Last time for which the tiledImage was reset.
            _midDraw: false, // Is the tiledImage currently updating the viewport?
            _needsDraw: true, // Does the tiledImage need to update the viewport again?
            _hasOpaqueTile: false, // Do we have even one fully opaque tile?

            //configurable settings
            springStiffness: $.DEFAULT_SETTINGS.springStiffness,
            animationTime: $.DEFAULT_SETTINGS.animationTime,
            minZoomImageRatio: $.DEFAULT_SETTINGS.minZoomImageRatio,
            wrapHorizontal: $.DEFAULT_SETTINGS.wrapHorizontal,
            wrapVertical: $.DEFAULT_SETTINGS.wrapVertical,
            immediateRender: $.DEFAULT_SETTINGS.immediateRender,
            blendTime: $.DEFAULT_SETTINGS.blendTime,
            alwaysBlend: $.DEFAULT_SETTINGS.alwaysBlend,
            minPixelRatio: $.DEFAULT_SETTINGS.minPixelRatio,
            debugMode: $.DEFAULT_SETTINGS.debugMode,
            crossOriginPolicy: $.DEFAULT_SETTINGS.crossOriginPolicy,
            placeholderFillStyle: $.DEFAULT_SETTINGS.placeholderFillStyle,
            opacity: $.DEFAULT_SETTINGS.opacity

        }, options);

        this._xSpring = new $.Spring({
            initial: x,
            springStiffness: this.springStiffness,
            animationTime: this.animationTime
        });

        this._ySpring = new $.Spring({
            initial: y,
            springStiffness: this.springStiffness,
            animationTime: this.animationTime
        });

        this._scaleSpring = new $.Spring({
            initial: scale,
            springStiffness: this.springStiffness,
            animationTime: this.animationTime
        });

        this._updateForScale();

        // We need a callback to give image manipulation a chance to happen
        this._drawingHandler = function (args) {
            /**
             * This event is fired just before the tile is drawn giving the application a chance to alter the image.
             *
             * NOTE: This event is only fired when the drawer is using a <canvas>.
             *
             * @event tile-drawing
             * @memberof OpenSeadragon.Viewer
             * @type {object}
             * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised the event.
             * @property {OpenSeadragon.Tile} tile - The Tile being drawn.
             * @property {OpenSeadragon.TiledImage} tiledImage - Which TiledImage is being drawn.
             * @property {OpenSeadragon.Tile} context - The HTML canvas context being drawn into.
             * @property {OpenSeadragon.Tile} rendered - The HTML canvas context containing the tile imagery.
             * @property {?Object} userData - Arbitrary subscriber-defined object.
             */
            _this.viewer.raiseEvent('tile-drawing', $.extend({
                tiledImage: _this
            }, args));
        };
    };

    $.extend($.TiledImage.prototype, $.EventSource.prototype, /** @lends OpenSeadragon.TiledImage.prototype */{
        /**
         * @returns {Boolean} Whether the TiledImage needs to be drawn.
         */
        needsDraw: function needsDraw() {
            return this._needsDraw;
        },

        /**
         * Clears all tiles and triggers an update on the next call to
         * {@link OpenSeadragon.TiledImage#update}.
         */
        reset: function reset() {
            this._tileCache.clearTilesFor(this);
            this.lastResetTime = $.now();
            this._needsDraw = true;
        },

        /**
         * Updates the TiledImage's bounds, animating if needed.
         * @returns {Boolean} Whether the TiledImage animated.
         */
        update: function update() {
            var oldX = this._xSpring.current.value;
            var oldY = this._ySpring.current.value;
            var oldScale = this._scaleSpring.current.value;

            this._xSpring.update();
            this._ySpring.update();
            this._scaleSpring.update();

            if (this._xSpring.current.value !== oldX || this._ySpring.current.value !== oldY || this._scaleSpring.current.value !== oldScale) {
                this._updateForScale();
                this._needsDraw = true;
                return true;
            }

            return false;
        },

        /**
         * Draws the TiledImage to its Drawer.
         */
        draw: function draw() {
            this._midDraw = true;
            updateViewport(this);
            this._midDraw = false;
        },

        /**
         * Destroy the TiledImage (unload current loaded tiles).
         */
        destroy: function destroy() {
            this.reset();
        },

        /**
         * @returns {OpenSeadragon.Rect} This TiledImage's bounds in viewport coordinates.
         * @param {Boolean} [current=false] - Pass true for the current location; false for target location.
         */
        getBounds: function getBounds(current) {
            if (current) {
                return new $.Rect(this._xSpring.current.value, this._ySpring.current.value, this._worldWidthCurrent, this._worldHeightCurrent);
            }

            return new $.Rect(this._xSpring.target.value, this._ySpring.target.value, this._worldWidthTarget, this._worldHeightTarget);
        },

        // deprecated
        getWorldBounds: function getWorldBounds() {
            $.console.error('[TiledImage.getWorldBounds] is deprecated; use TiledImage.getBounds instead');
            return this.getBounds();
        },

        /**
         * @returns {OpenSeadragon.Point} This TiledImage's content size, in original pixels.
         */
        getContentSize: function getContentSize() {
            return new $.Point(this.source.dimensions.x, this.source.dimensions.y);
        },

        // private
        _viewportToImageDelta: function _viewportToImageDelta(viewerX, viewerY, current) {
            var scale = current ? this._scaleSpring.current.value : this._scaleSpring.target.value;
            return new $.Point(viewerX * (this.source.dimensions.x / scale), viewerY * (this.source.dimensions.y * this.contentAspectX / scale));
        },

        /**
         * Translates from OpenSeadragon viewer coordinate system to image coordinate system.
         * This method can be called either by passing X,Y coordinates or an {@link OpenSeadragon.Point}.
         * @param {Number|OpenSeadragon.Point} viewerX - The X coordinate or point in viewport coordinate system.
         * @param {Number} [viewerY] - The Y coordinate in viewport coordinate system.
         * @param {Boolean} [current=false] - Pass true to use the current location; false for target location.
         * @return {OpenSeadragon.Point} A point representing the coordinates in the image.
         */
        viewportToImageCoordinates: function viewportToImageCoordinates(viewerX, viewerY, current) {
            if (viewerX instanceof $.Point) {
                //they passed a point instead of individual components
                current = viewerY;
                viewerY = viewerX.y;
                viewerX = viewerX.x;
            }

            if (current) {
                return this._viewportToImageDelta(viewerX - this._xSpring.current.value, viewerY - this._ySpring.current.value);
            }

            return this._viewportToImageDelta(viewerX - this._xSpring.target.value, viewerY - this._ySpring.target.value);
        },

        // private
        _imageToViewportDelta: function _imageToViewportDelta(imageX, imageY, current) {
            var scale = current ? this._scaleSpring.current.value : this._scaleSpring.target.value;
            return new $.Point(imageX / this.source.dimensions.x * scale, imageY / this.source.dimensions.y / this.contentAspectX * scale);
        },

        /**
         * Translates from image coordinate system to OpenSeadragon viewer coordinate system
         * This method can be called either by passing X,Y coordinates or an {@link OpenSeadragon.Point}.
         * @param {Number|OpenSeadragon.Point} imageX - The X coordinate or point in image coordinate system.
         * @param {Number} [imageY] - The Y coordinate in image coordinate system.
         * @param {Boolean} [current=false] - Pass true to use the current location; false for target location.
         * @return {OpenSeadragon.Point} A point representing the coordinates in the viewport.
         */
        imageToViewportCoordinates: function imageToViewportCoordinates(imageX, imageY, current) {
            if (imageX instanceof $.Point) {
                //they passed a point instead of individual components
                current = imageY;
                imageY = imageX.y;
                imageX = imageX.x;
            }

            var point = this._imageToViewportDelta(imageX, imageY);
            if (current) {
                point.x += this._xSpring.current.value;
                point.y += this._ySpring.current.value;
            } else {
                point.x += this._xSpring.target.value;
                point.y += this._ySpring.target.value;
            }

            return point;
        },

        /**
         * Translates from a rectangle which describes a portion of the image in
         * pixel coordinates to OpenSeadragon viewport rectangle coordinates.
         * This method can be called either by passing X,Y,width,height or an {@link OpenSeadragon.Rect}.
         * @param {Number|OpenSeadragon.Rect} imageX - The left coordinate or rectangle in image coordinate system.
         * @param {Number} [imageY] - The top coordinate in image coordinate system.
         * @param {Number} [pixelWidth] - The width in pixel of the rectangle.
         * @param {Number} [pixelHeight] - The height in pixel of the rectangle.
         * @param {Boolean} [current=false] - Pass true to use the current location; false for target location.
         * @return {OpenSeadragon.Rect} A rect representing the coordinates in the viewport.
         */
        imageToViewportRectangle: function imageToViewportRectangle(imageX, imageY, pixelWidth, pixelHeight, current) {
            if (imageX instanceof $.Rect) {
                //they passed a rect instead of individual components
                current = imageY;
                pixelWidth = imageX.width;
                pixelHeight = imageX.height;
                imageY = imageX.y;
                imageX = imageX.x;
            }

            var coordA = this.imageToViewportCoordinates(imageX, imageY, current);
            var coordB = this._imageToViewportDelta(pixelWidth, pixelHeight, current);

            return new $.Rect(coordA.x, coordA.y, coordB.x, coordB.y);
        },

        /**
         * Translates from a rectangle which describes a portion of
         * the viewport in point coordinates to image rectangle coordinates.
         * This method can be called either by passing X,Y,width,height or an {@link OpenSeadragon.Rect}.
         * @param {Number|OpenSeadragon.Rect} viewerX - The left coordinate or rectangle in viewport coordinate system.
         * @param {Number} [viewerY] - The top coordinate in viewport coordinate system.
         * @param {Number} [pointWidth] - The width in viewport coordinate system.
         * @param {Number} [pointHeight] - The height in viewport coordinate system.
         * @param {Boolean} [current=false] - Pass true to use the current location; false for target location.
         * @return {OpenSeadragon.Rect} A rect representing the coordinates in the image.
         */
        viewportToImageRectangle: function viewportToImageRectangle(viewerX, viewerY, pointWidth, pointHeight, current) {
            if (viewerX instanceof $.Rect) {
                //they passed a rect instead of individual components
                current = viewerY;
                pointWidth = viewerX.width;
                pointHeight = viewerX.height;
                viewerY = viewerX.y;
                viewerX = viewerX.x;
            }

            var coordA = this.viewportToImageCoordinates(viewerX, viewerY, current);
            var coordB = this._viewportToImageDelta(pointWidth, pointHeight, current);

            return new $.Rect(coordA.x, coordA.y, coordB.x, coordB.y);
        },

        /**
         * Convert pixel coordinates relative to the viewer element to image
         * coordinates.
         * @param {OpenSeadragon.Point} pixel
         * @returns {OpenSeadragon.Point}
         */
        viewerElementToImageCoordinates: function viewerElementToImageCoordinates(pixel) {
            var point = this.viewport.pointFromPixel(pixel, true);
            return this.viewportToImageCoordinates(point);
        },

        /**
         * Convert pixel coordinates relative to the image to
         * viewer element coordinates.
         * @param {OpenSeadragon.Point} pixel
         * @returns {OpenSeadragon.Point}
         */
        imageToViewerElementCoordinates: function imageToViewerElementCoordinates(pixel) {
            var point = this.imageToViewportCoordinates(pixel);
            return this.viewport.pixelFromPoint(point, true);
        },

        /**
         * Convert pixel coordinates relative to the window to image coordinates.
         * @param {OpenSeadragon.Point} pixel
         * @returns {OpenSeadragon.Point}
         */
        windowToImageCoordinates: function windowToImageCoordinates(pixel) {
            var viewerCoordinates = pixel.minus(OpenSeadragon.getElementPosition(this.viewer.element));
            return this.viewerElementToImageCoordinates(viewerCoordinates);
        },

        /**
         * Convert image coordinates to pixel coordinates relative to the window.
         * @param {OpenSeadragon.Point} pixel
         * @returns {OpenSeadragon.Point}
         */
        imageToWindowCoordinates: function imageToWindowCoordinates(pixel) {
            var viewerCoordinates = this.imageToViewerElementCoordinates(pixel);
            return viewerCoordinates.plus(OpenSeadragon.getElementPosition(this.viewer.element));
        },

        /**
         * Convert a viewport zoom to an image zoom.
         * Image zoom: ratio of the original image size to displayed image size.
         * 1 means original image size, 0.5 half size...
         * Viewport zoom: ratio of the displayed image's width to viewport's width.
         * 1 means identical width, 2 means image's width is twice the viewport's width...
         * @function
         * @param {Number} viewportZoom The viewport zoom
         * @returns {Number} imageZoom The image zoom
         */
        viewportToImageZoom: function viewportToImageZoom(viewportZoom) {
            var ratio = this._scaleSpring.current.value * this.viewport._containerInnerSize.x / this.source.dimensions.x;
            return ratio * viewportZoom;
        },

        /**
         * Convert an image zoom to a viewport zoom.
         * Image zoom: ratio of the original image size to displayed image size.
         * 1 means original image size, 0.5 half size...
         * Viewport zoom: ratio of the displayed image's width to viewport's width.
         * 1 means identical width, 2 means image's width is twice the viewport's width...
         * Note: not accurate with multi-image.
         * @function
         * @param {Number} imageZoom The image zoom
         * @returns {Number} viewportZoom The viewport zoom
         */
        imageToViewportZoom: function imageToViewportZoom(imageZoom) {
            var ratio = this._scaleSpring.current.value * this.viewport._containerInnerSize.x / this.source.dimensions.x;
            return imageZoom / ratio;
        },

        /**
         * Sets the TiledImage's position in the world.
         * @param {OpenSeadragon.Point} position - The new position, in viewport coordinates.
         * @param {Boolean} [immediately=false] - Whether to animate to the new position or snap immediately.
         * @fires OpenSeadragon.TiledImage.event:bounds-change
         */
        setPosition: function setPosition(position, immediately) {
            var sameTarget = this._xSpring.target.value === position.x && this._ySpring.target.value === position.y;

            if (immediately) {
                if (sameTarget && this._xSpring.current.value === position.x && this._ySpring.current.value === position.y) {
                    return;
                }

                this._xSpring.resetTo(position.x);
                this._ySpring.resetTo(position.y);
                this._needsDraw = true;
            } else {
                if (sameTarget) {
                    return;
                }

                this._xSpring.springTo(position.x);
                this._ySpring.springTo(position.y);
                this._needsDraw = true;
            }

            if (!sameTarget) {
                this._raiseBoundsChange();
            }
        },

        /**
         * Sets the TiledImage's width in the world, adjusting the height to match based on aspect ratio.
         * @param {Number} width - The new width, in viewport coordinates.
         * @param {Boolean} [immediately=false] - Whether to animate to the new size or snap immediately.
         * @fires OpenSeadragon.TiledImage.event:bounds-change
         */
        setWidth: function setWidth(width, immediately) {
            this._setScale(width, immediately);
        },

        /**
         * Sets the TiledImage's height in the world, adjusting the width to match based on aspect ratio.
         * @param {Number} height - The new height, in viewport coordinates.
         * @param {Boolean} [immediately=false] - Whether to animate to the new size or snap immediately.
         * @fires OpenSeadragon.TiledImage.event:bounds-change
         */
        setHeight: function setHeight(height, immediately) {
            this._setScale(height / this.normHeight, immediately);
        },

        /**
         * @returns {OpenSeadragon.Rect|null} The TiledImage's current clip rectangle,
         * in image pixels, or null if none.
         */
        getClip: function getClip() {
            if (this._clip) {
                return this._clip.clone();
            }

            return null;
        },

        /**
         * @param {OpenSeadragon.Rect|null} newClip - An area, in image pixels, to clip to
         * (portions of the image outside of this area will not be visible). Only works on
         * browsers that support the HTML5 canvas.
         */
        setClip: function setClip(newClip) {
            $.console.assert(!newClip || newClip instanceof $.Rect, "[TiledImage.setClip] newClip must be an OpenSeadragon.Rect or null");

            if (newClip instanceof $.Rect) {
                this._clip = newClip.clone();
            } else {
                this._clip = null;
            }

            this._needsDraw = true;
        },

        /**
         * @returns {Number} The TiledImage's current opacity.
         */
        getOpacity: function getOpacity() {
            return this.opacity;
        },

        /**
         * @param {Number} opacity Opacity the tiled image should be drawn at.
         */
        setOpacity: function setOpacity(opacity) {
            this.opacity = opacity;
            this._needsDraw = true;
        },

        // private
        _setScale: function _setScale(scale, immediately) {
            var sameTarget = this._scaleSpring.target.value === scale;
            if (immediately) {
                if (sameTarget && this._scaleSpring.current.value === scale) {
                    return;
                }

                this._scaleSpring.resetTo(scale);
                this._updateForScale();
                this._needsDraw = true;
            } else {
                if (sameTarget) {
                    return;
                }

                this._scaleSpring.springTo(scale);
                this._updateForScale();
                this._needsDraw = true;
            }

            if (!sameTarget) {
                this._raiseBoundsChange();
            }
        },

        // private
        _updateForScale: function _updateForScale() {
            this._worldWidthTarget = this._scaleSpring.target.value;
            this._worldHeightTarget = this.normHeight * this._scaleSpring.target.value;
            this._worldWidthCurrent = this._scaleSpring.current.value;
            this._worldHeightCurrent = this.normHeight * this._scaleSpring.current.value;
        },

        // private
        _raiseBoundsChange: function _raiseBoundsChange() {
            /**
             * Raised when the TiledImage's bounds are changed.
             * Note that this event is triggered only when the animation target is changed;
             * not for every frame of animation.
             * @event bounds-change
             * @memberOf OpenSeadragon.TiledImage
             * @type {object}
             * @property {OpenSeadragon.World} eventSource - A reference to the TiledImage which raised the event.
             * @property {?Object} userData - Arbitrary subscriber-defined object.
             */
            this.raiseEvent('bounds-change');
        }
    });

    /**
     * @private
     * @inner
     * Pretty much every other line in this needs to be documented so it's clear
     * how each piece of this routine contributes to the drawing process.  That's
     * why there are so many TODO's inside this function.
     */
    function updateViewport(tiledImage) {

        tiledImage._needsDraw = false;

        var tile,
            level,
            best = null,
            haveDrawn = false,
            currentTime = $.now(),
            viewportBounds = tiledImage.viewport.getBoundsWithMargins(true),
            zeroRatioC = tiledImage.viewport.deltaPixelsFromPoints(tiledImage.source.getPixelRatio(0), true).x * tiledImage._scaleSpring.current.value,
            lowestLevel = Math.max(tiledImage.source.minLevel, Math.floor(Math.log(tiledImage.minZoomImageRatio) / Math.log(2))),
            highestLevel = Math.min(Math.abs(tiledImage.source.maxLevel), Math.abs(Math.floor(Math.log(zeroRatioC / tiledImage.minPixelRatio) / Math.log(2)))),
            degrees = tiledImage.viewport.degrees,
            renderPixelRatioC,
            renderPixelRatioT,
            zeroRatioT,
            optimalRatio,
            levelOpacity,
            levelVisibility;

        viewportBounds.x -= tiledImage._xSpring.current.value;
        viewportBounds.y -= tiledImage._ySpring.current.value;

        // Reset tile's internal drawn state
        while (tiledImage.lastDrawn.length > 0) {
            tile = tiledImage.lastDrawn.pop();
            tile.beingDrawn = false;
        }

        //Change bounds for rotation
        if (degrees === 90 || degrees === 270) {
            viewportBounds = viewportBounds.rotate(degrees);
        } else if (degrees !== 0 && degrees !== 180) {
            // This is just an approximation.
            var orthBounds = viewportBounds.rotate(90);
            viewportBounds.x -= orthBounds.width / 2;
            viewportBounds.y -= orthBounds.height / 2;
            viewportBounds.width += orthBounds.width;
            viewportBounds.height += orthBounds.height;
        }

        var viewportTL = viewportBounds.getTopLeft();
        var viewportBR = viewportBounds.getBottomRight();

        //Don't draw if completely outside of the viewport
        if (!tiledImage.wrapHorizontal && (viewportBR.x < 0 || viewportTL.x > tiledImage._worldWidthCurrent)) {
            return;
        }

        if (!tiledImage.wrapVertical && (viewportBR.y < 0 || viewportTL.y > tiledImage._worldHeightCurrent)) {
            return;
        }

        // Calculate viewport rect / bounds
        if (!tiledImage.wrapHorizontal) {
            viewportTL.x = Math.max(viewportTL.x, 0);
            viewportBR.x = Math.min(viewportBR.x, tiledImage._worldWidthCurrent);
        }

        if (!tiledImage.wrapVertical) {
            viewportTL.y = Math.max(viewportTL.y, 0);
            viewportBR.y = Math.min(viewportBR.y, tiledImage._worldHeightCurrent);
        }

        // Calculations for the interval of levels to draw
        // (above in initial var statement)
        // can return invalid intervals; fix that here if necessary
        lowestLevel = Math.min(lowestLevel, highestLevel);

        // Update any level that will be drawn
        var drawLevel; // FIXME: drawLevel should have a more explanatory name
        for (level = highestLevel; level >= lowestLevel; level--) {
            drawLevel = false;

            //Avoid calculations for draw if we have already drawn this
            renderPixelRatioC = tiledImage.viewport.deltaPixelsFromPoints(tiledImage.source.getPixelRatio(level), true).x * tiledImage._scaleSpring.current.value;

            if (!haveDrawn && renderPixelRatioC >= tiledImage.minPixelRatio || level == lowestLevel) {
                drawLevel = true;
                haveDrawn = true;
            } else if (!haveDrawn) {
                continue;
            }

            //Perform calculations for draw if we haven't drawn this
            renderPixelRatioT = tiledImage.viewport.deltaPixelsFromPoints(tiledImage.source.getPixelRatio(level), false).x * tiledImage._scaleSpring.current.value;

            zeroRatioT = tiledImage.viewport.deltaPixelsFromPoints(tiledImage.source.getPixelRatio(Math.max(tiledImage.source.getClosestLevel(tiledImage.viewport.containerSize) - 1, 0)), false).x * tiledImage._scaleSpring.current.value;

            optimalRatio = tiledImage.immediateRender ? 1 : zeroRatioT;

            levelOpacity = Math.min(1, (renderPixelRatioC - 0.5) / 0.5);

            levelVisibility = optimalRatio / Math.abs(optimalRatio - renderPixelRatioT);

            // Update the level and keep track of 'best' tile to load
            best = updateLevel(tiledImage, haveDrawn, drawLevel, level, levelOpacity, levelVisibility, viewportTL, viewportBR, currentTime, best);

            // Stop the loop if lower-res tiles would all be covered by
            // already drawn tiles
            if (providesCoverage(tiledImage.coverage, level)) {
                break;
            }
        }

        // Perform the actual drawing
        drawTiles(tiledImage, tiledImage.lastDrawn);

        // Load the new 'best' tile
        if (best && !best.context2D) {
            loadTile(tiledImage, best, currentTime);
        }
    }

    function updateLevel(tiledImage, haveDrawn, drawLevel, level, levelOpacity, levelVisibility, viewportTL, viewportBR, currentTime, best) {

        var x,
            y,
            tileTL,
            tileBR,
            numberOfTiles,
            viewportCenter = tiledImage.viewport.pixelFromPoint(tiledImage.viewport.getCenter());

        if (tiledImage.viewer) {
            /**
             * <em>- Needs documentation -</em>
             *
             * @event update-level
             * @memberof OpenSeadragon.Viewer
             * @type {object}
             * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised the event.
             * @property {OpenSeadragon.TiledImage} tiledImage - Which TiledImage is being drawn.
             * @property {Object} havedrawn
             * @property {Object} level
             * @property {Object} opacity
             * @property {Object} visibility
             * @property {Object} topleft
             * @property {Object} bottomright
             * @property {Object} currenttime
             * @property {Object} best
             * @property {?Object} userData - Arbitrary subscriber-defined object.
             */
            tiledImage.viewer.raiseEvent('update-level', {
                tiledImage: tiledImage,
                havedrawn: haveDrawn,
                level: level,
                opacity: levelOpacity,
                visibility: levelVisibility,
                topleft: viewportTL,
                bottomright: viewportBR,
                currenttime: currentTime,
                best: best
            });
        }

        //OK, a new drawing so do your calculations
        tileTL = tiledImage.source.getTileAtPoint(level, viewportTL.divide(tiledImage._scaleSpring.current.value));
        tileBR = tiledImage.source.getTileAtPoint(level, viewportBR.divide(tiledImage._scaleSpring.current.value));
        numberOfTiles = tiledImage.source.getNumTiles(level);

        resetCoverage(tiledImage.coverage, level);

        if (!tiledImage.wrapHorizontal) {
            tileBR.x = Math.min(tileBR.x, numberOfTiles.x - 1);
        }
        if (!tiledImage.wrapVertical) {
            tileBR.y = Math.min(tileBR.y, numberOfTiles.y - 1);
        }

        for (x = tileTL.x; x <= tileBR.x; x++) {
            for (y = tileTL.y; y <= tileBR.y; y++) {

                best = updateTile(tiledImage, drawLevel, haveDrawn, x, y, level, levelOpacity, levelVisibility, viewportCenter, numberOfTiles, currentTime, best);
            }
        }

        return best;
    }

    function updateTile(tiledImage, drawLevel, haveDrawn, x, y, level, levelOpacity, levelVisibility, viewportCenter, numberOfTiles, currentTime, best) {

        var tile = getTile(x, y, level, tiledImage.source, tiledImage.tilesMatrix, currentTime, numberOfTiles, tiledImage._worldWidthCurrent, tiledImage._worldHeightCurrent),
            drawTile = drawLevel;

        if (tiledImage.viewer) {
            /**
             * <em>- Needs documentation -</em>
             *
             * @event update-tile
             * @memberof OpenSeadragon.Viewer
             * @type {object}
             * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised the event.
             * @property {OpenSeadragon.TiledImage} tiledImage - Which TiledImage is being drawn.
             * @property {OpenSeadragon.Tile} tile
             * @property {?Object} userData - Arbitrary subscriber-defined object.
             */
            tiledImage.viewer.raiseEvent('update-tile', {
                tiledImage: tiledImage,
                tile: tile
            });
        }

        setCoverage(tiledImage.coverage, level, x, y, false);

        if (!tile.exists) {
            return best;
        }

        if (haveDrawn && !drawTile) {
            if (isCovered(tiledImage.coverage, level, x, y)) {
                setCoverage(tiledImage.coverage, level, x, y, true);
            } else {
                drawTile = true;
            }
        }

        if (!drawTile) {
            return best;
        }

        positionTile(tile, tiledImage.source.tileOverlap, tiledImage.viewport, viewportCenter, levelVisibility, tiledImage);

        if (!tile.loaded) {
            if (tile.context2D) {
                setTileLoaded(tiledImage, tile);
            } else {
                var imageRecord = tiledImage._tileCache.getImageRecord(tile.url);
                if (imageRecord) {
                    var image = imageRecord.getImage();
                    setTileLoaded(tiledImage, tile, image);
                }
            }
        }

        if (tile.loaded) {
            var needsDraw = blendTile(tiledImage, tile, x, y, level, levelOpacity, currentTime);

            if (needsDraw) {
                tiledImage._needsDraw = true;
            }
        } else if (tile.loading) {
            // the tile is already in the download queue
            // thanks josh1093 for finally translating this typo
        } else {
                best = compareTiles(best, tile);
            }

        return best;
    }

    function getTile(x, y, level, tileSource, tilesMatrix, time, numTiles, worldWidth, worldHeight) {
        var xMod, yMod, bounds, exists, url, context2D, tile;

        if (!tilesMatrix[level]) {
            tilesMatrix[level] = {};
        }
        if (!tilesMatrix[level][x]) {
            tilesMatrix[level][x] = {};
        }

        if (!tilesMatrix[level][x][y]) {
            xMod = (numTiles.x + x % numTiles.x) % numTiles.x;
            yMod = (numTiles.y + y % numTiles.y) % numTiles.y;
            bounds = tileSource.getTileBounds(level, xMod, yMod);
            exists = tileSource.tileExists(level, xMod, yMod);
            url = tileSource.getTileUrl(level, xMod, yMod);
            context2D = tileSource.getContext2D ? tileSource.getContext2D(level, xMod, yMod) : undefined;

            bounds.x += (x - xMod) / numTiles.x;
            bounds.y += worldHeight / worldWidth * ((y - yMod) / numTiles.y);

            tilesMatrix[level][x][y] = new $.Tile(level, x, y, bounds, exists, url, context2D);
        }

        tile = tilesMatrix[level][x][y];
        tile.lastTouchTime = time;

        return tile;
    }

    function loadTile(tiledImage, tile, time) {
        tile.loading = true;
        tiledImage._imageLoader.addJob({
            src: tile.url,
            crossOriginPolicy: tiledImage.crossOriginPolicy,
            callback: function callback(image, errorMsg) {
                onTileLoad(tiledImage, tile, time, image, errorMsg);
            },
            abort: function abort() {
                tile.loading = false;
            }
        });
    }

    function onTileLoad(tiledImage, tile, time, image, errorMsg) {
        if (!image) {
            $.console.log("Tile %s failed to load: %s - error: %s", tile, tile.url, errorMsg);
            /**
             * Triggered when a tile fails to load.
             *
             * @event tile-load-failed
             * @memberof OpenSeadragon.Viewer
             * @type {object}
             * @property {OpenSeadragon.Tile} tile - The tile that failed to load.
             * @property {OpenSeadragon.TiledImage} tiledImage - The tiled image the tile belongs to.
             * @property {number} time - The time in milliseconds when the tile load began.
             * @property {string} message - The error message.
             */
            tiledImage.viewer.raiseEvent("tile-load-failed", { tile: tile, tiledImage: tiledImage, time: time, message: errorMsg });
            if (!tiledImage.debugMode) {
                tile.loading = false;
                tile.exists = false;
                return;
            }
        } else if (time < tiledImage.lastResetTime) {
            $.console.log("Ignoring tile %s loaded before reset: %s", tile, tile.url);
            tile.loading = false;
            return;
        }

        var finish = function finish() {
            var cutoff = Math.ceil(Math.log(tiledImage.source.getTileWidth(tile.level)) / Math.log(2));
            setTileLoaded(tiledImage, tile, image, cutoff);
        };

        // Check if we're mid-update; this can happen on IE8 because image load events for
        // cached images happen immediately there
        if (!tiledImage._midDraw) {
            finish();
        } else {
            // Wait until after the update, in case caching unloads any tiles
            window.setTimeout(finish, 1);
        }
    }

    function setTileLoaded(tiledImage, tile, image, cutoff) {
        var increment = 0;

        function getCompletionCallback() {
            increment++;
            return completionCallback;
        }

        function completionCallback() {
            increment--;
            if (increment === 0) {
                tile.loading = false;
                tile.loaded = true;
                if (!tile.context2D) {
                    tiledImage._tileCache.cacheTile({
                        image: image,
                        tile: tile,
                        cutoff: cutoff,
                        tiledImage: tiledImage
                    });
                }
                tiledImage._needsDraw = true;
            }
        }

        /**
         * Triggered when a tile has just been loaded in memory. That means that the
         * image has been downloaded and can be modified before being drawn to the canvas.
         *
         * @event tile-loaded
         * @memberof OpenSeadragon.Viewer
         * @type {object}
         * @property {Image} image - The image of the tile.
         * @property {OpenSeadragon.TiledImage} tiledImage - The tiled image of the loaded tile.
         * @property {OpenSeadragon.Tile} tile - The tile which has been loaded.
         * @property {function} getCompletionCallback - A function giving a callback to call
         * when the asynchronous processing of the image is done. The image will be
         * marked as entirely loaded when the callback has been called once for each
         * call to getCompletionCallback.
         */
        tiledImage.viewer.raiseEvent("tile-loaded", {
            tile: tile,
            tiledImage: tiledImage,
            image: image,
            getCompletionCallback: getCompletionCallback
        });
        // In case the completion callback is never called, we at least force it once.
        getCompletionCallback()();
    }

    function positionTile(tile, overlap, viewport, viewportCenter, levelVisibility, tiledImage) {
        var boundsTL = tile.bounds.getTopLeft();

        boundsTL.x *= tiledImage._scaleSpring.current.value;
        boundsTL.y *= tiledImage._scaleSpring.current.value;
        boundsTL.x += tiledImage._xSpring.current.value;
        boundsTL.y += tiledImage._ySpring.current.value;

        var boundsSize = tile.bounds.getSize();

        boundsSize.x *= tiledImage._scaleSpring.current.value;
        boundsSize.y *= tiledImage._scaleSpring.current.value;

        var positionC = viewport.pixelFromPoint(boundsTL, true),
            positionT = viewport.pixelFromPoint(boundsTL, false),
            sizeC = viewport.deltaPixelsFromPoints(boundsSize, true),
            sizeT = viewport.deltaPixelsFromPoints(boundsSize, false),
            tileCenter = positionT.plus(sizeT.divide(2)),
            tileDistance = viewportCenter.distanceTo(tileCenter);

        if (!overlap) {
            sizeC = sizeC.plus(new $.Point(1, 1));
        }

        tile.position = positionC;
        tile.size = sizeC;
        tile.distance = tileDistance;
        tile.visibility = levelVisibility;
    }

    function blendTile(tiledImage, tile, x, y, level, levelOpacity, currentTime) {
        var blendTimeMillis = 1000 * tiledImage.blendTime,
            deltaTime,
            opacity;

        if (!tile.blendStart) {
            tile.blendStart = currentTime;
        }

        deltaTime = currentTime - tile.blendStart;
        opacity = blendTimeMillis ? Math.min(1, deltaTime / blendTimeMillis) : 1;

        if (tiledImage.alwaysBlend) {
            opacity *= levelOpacity;
        }

        tile.opacity = opacity;

        tiledImage.lastDrawn.push(tile);

        if (opacity == 1) {
            setCoverage(tiledImage.coverage, level, x, y, true);
            tiledImage._hasOpaqueTile = true;
        } else if (deltaTime < blendTimeMillis) {
            return true;
        }

        return false;
    }

    /**
     * @private
     * @inner
     * Returns true if the given tile provides coverage to lower-level tiles of
     * lower resolution representing the same content. If neither x nor y is
     * given, returns true if the entire visible level provides coverage.
     *
     * Note that out-of-bounds tiles provide coverage in this sense, since
     * there's no content that they would need to cover. Tiles at non-existent
     * levels that are within the image bounds, however, do not.
     */
    function providesCoverage(coverage, level, x, y) {
        var rows, cols, i, j;

        if (!coverage[level]) {
            return false;
        }

        if (x === undefined || y === undefined) {
            rows = coverage[level];
            for (i in rows) {
                if (rows.hasOwnProperty(i)) {
                    cols = rows[i];
                    for (j in cols) {
                        if (cols.hasOwnProperty(j) && !cols[j]) {
                            return false;
                        }
                    }
                }
            }

            return true;
        }

        return coverage[level][x] === undefined || coverage[level][x][y] === undefined || coverage[level][x][y] === true;
    }

    /**
     * @private
     * @inner
     * Returns true if the given tile is completely covered by higher-level
     * tiles of higher resolution representing the same content. If neither x
     * nor y is given, returns true if the entire visible level is covered.
     */
    function isCovered(coverage, level, x, y) {
        if (x === undefined || y === undefined) {
            return providesCoverage(coverage, level + 1);
        } else {
            return providesCoverage(coverage, level + 1, 2 * x, 2 * y) && providesCoverage(coverage, level + 1, 2 * x, 2 * y + 1) && providesCoverage(coverage, level + 1, 2 * x + 1, 2 * y) && providesCoverage(coverage, level + 1, 2 * x + 1, 2 * y + 1);
        }
    }

    /**
     * @private
     * @inner
     * Sets whether the given tile provides coverage or not.
     */
    function setCoverage(coverage, level, x, y, covers) {
        if (!coverage[level]) {
            $.console.warn("Setting coverage for a tile before its level's coverage has been reset: %s", level);
            return;
        }

        if (!coverage[level][x]) {
            coverage[level][x] = {};
        }

        coverage[level][x][y] = covers;
    }

    /**
     * @private
     * @inner
     * Resets coverage information for the given level. This should be called
     * after every draw routine. Note that at the beginning of the next draw
     * routine, coverage for every visible tile should be explicitly set.
     */
    function resetCoverage(coverage, level) {
        coverage[level] = {};
    }

    /**
     * @private
     * @inner
     * Determines whether the 'last best' tile for the area is better than the
     * tile in question.
     */
    function compareTiles(previousBest, tile) {
        if (!previousBest) {
            return tile;
        }

        if (tile.visibility > previousBest.visibility) {
            return tile;
        } else if (tile.visibility == previousBest.visibility) {
            if (tile.distance < previousBest.distance) {
                return tile;
            }
        }

        return previousBest;
    }

    function drawTiles(tiledImage, lastDrawn) {
        var i, tile;

        if (tiledImage.opacity <= 0) {
            drawDebugInfo(tiledImage, lastDrawn);
            return;
        }
        var useSketch = tiledImage.opacity < 1;
        if (useSketch) {
            tiledImage._drawer._clear(true);
        }

        var usedClip = false;
        if (tiledImage._clip) {
            tiledImage._drawer.saveContext(useSketch);

            var box = tiledImage.imageToViewportRectangle(tiledImage._clip, true);
            var clipRect = tiledImage._drawer.viewportToDrawerRectangle(box);
            tiledImage._drawer.setClip(clipRect, useSketch);

            usedClip = true;
        }

        if (tiledImage.placeholderFillStyle && tiledImage._hasOpaqueTile === false) {
            var placeholderRect = tiledImage._drawer.viewportToDrawerRectangle(tiledImage.getBounds(true));

            var fillStyle = null;
            if (typeof tiledImage.placeholderFillStyle === "function") {
                fillStyle = tiledImage.placeholderFillStyle(tiledImage, tiledImage._drawer.context);
            } else {
                fillStyle = tiledImage.placeholderFillStyle;
            }

            tiledImage._drawer.drawRectangle(placeholderRect, fillStyle, useSketch);
        }

        for (i = lastDrawn.length - 1; i >= 0; i--) {
            tile = lastDrawn[i];
            tiledImage._drawer.drawTile(tile, tiledImage._drawingHandler, useSketch);
            tile.beingDrawn = true;

            if (tiledImage.viewer) {
                /**
                 * <em>- Needs documentation -</em>
                 *
                 * @event tile-drawn
                 * @memberof OpenSeadragon.Viewer
                 * @type {object}
                 * @property {OpenSeadragon.Viewer} eventSource - A reference to the Viewer which raised the event.
                 * @property {OpenSeadragon.TiledImage} tiledImage - Which TiledImage is being drawn.
                 * @property {OpenSeadragon.Tile} tile
                 * @property {?Object} userData - Arbitrary subscriber-defined object.
                 */
                tiledImage.viewer.raiseEvent('tile-drawn', {
                    tiledImage: tiledImage,
                    tile: tile
                });
            }
        }

        if (usedClip) {
            tiledImage._drawer.restoreContext(useSketch);
        }

        if (useSketch) {
            tiledImage._drawer.blendSketch(tiledImage.opacity);
        }
        drawDebugInfo(tiledImage, lastDrawn);
    }

    function drawDebugInfo(tiledImage, lastDrawn) {
        if (tiledImage.debugMode) {
            for (var i = lastDrawn.length - 1; i >= 0; i--) {
                var tile = lastDrawn[i];
                try {
                    tiledImage._drawer.drawDebugInfo(tile, lastDrawn.length, i);
                } catch (e) {
                    $.console.error(e);
                }
            }
        }
    }
})(OpenSeadragon);

/*
 * OpenSeadragon - TileCache
 *
 * Copyright (C) 2009 CodePlex Foundation
 * Copyright (C) 2010-2013 OpenSeadragon contributors
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 * - Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 *
 * - Neither the name of CodePlex Foundation nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

(function ($) {

    // private class
    var TileRecord = function TileRecord(options) {
        $.console.assert(options, "[TileCache.cacheTile] options is required");
        $.console.assert(options.tile, "[TileCache.cacheTile] options.tile is required");
        $.console.assert(options.tiledImage, "[TileCache.cacheTile] options.tiledImage is required");
        this.tile = options.tile;
        this.tiledImage = options.tiledImage;
    };

    // private class
    var ImageRecord = function ImageRecord(options) {
        $.console.assert(options, "[ImageRecord] options is required");
        $.console.assert(options.image, "[ImageRecord] options.image is required");
        this._image = options.image;
        this._tiles = [];
    };

    ImageRecord.prototype = {
        destroy: function destroy() {
            this._image = null;
            this._renderedContext = null;
            this._tiles = null;
        },

        getImage: function getImage() {
            return this._image;
        },

        getRenderedContext: function getRenderedContext() {
            if (!this._renderedContext) {
                var canvas = document.createElement('canvas');
                canvas.width = this._image.width;
                canvas.height = this._image.height;
                this._renderedContext = canvas.getContext('2d');
                this._renderedContext.drawImage(this._image, 0, 0);
                //since we are caching the prerendered image on a canvas
                //allow the image to not be held in memory
                this._image = null;
            }
            return this._renderedContext;
        },

        setRenderedContext: function setRenderedContext(renderedContext) {
            $.console.error("ImageRecord.setRenderedContext is deprecated. " + "The rendered context should be created by the ImageRecord " + "itself when calling ImageRecord.getRenderedContext.");
            this._renderedContext = renderedContext;
        },

        addTile: function addTile(tile) {
            $.console.assert(tile, '[ImageRecord.addTile] tile is required');
            this._tiles.push(tile);
        },

        removeTile: function removeTile(tile) {
            for (var i = 0; i < this._tiles.length; i++) {
                if (this._tiles[i] === tile) {
                    this._tiles.splice(i, 1);
                    return;
                }
            }

            $.console.warn('[ImageRecord.removeTile] trying to remove unknown tile', tile);
        },

        getTileCount: function getTileCount() {
            return this._tiles.length;
        }
    };

    /**
     * @class TileCache
     * @memberof OpenSeadragon
     * @classdesc Stores all the tiles displayed in a {@link OpenSeadragon.Viewer}.
     * You generally won't have to interact with the TileCache directly.
     * @param {Object} options - Configuration for this TileCache.
     * @param {Number} [options.maxImageCacheCount] - See maxImageCacheCount in
     * {@link OpenSeadragon.Options} for details.
     */
    $.TileCache = function (options) {
        options = options || {};

        this._maxImageCacheCount = options.maxImageCacheCount || $.DEFAULT_SETTINGS.maxImageCacheCount;
        this._tilesLoaded = [];
        this._imagesLoaded = [];
        this._imagesLoadedCount = 0;
    };

    $.TileCache.prototype = /** @lends OpenSeadragon.TileCache.prototype */{
        /**
         * @returns {Number} The total number of tiles that have been loaded by
         * this TileCache.
         */
        numTilesLoaded: function numTilesLoaded() {
            return this._tilesLoaded.length;
        },

        /**
         * Caches the specified tile, removing an old tile if necessary to stay under the
         * maxImageCacheCount specified on construction. Note that if multiple tiles reference
         * the same image, there may be more tiles than maxImageCacheCount; the goal is to keep
         * the number of images below that number. Note, as well, that even the number of images
         * may temporarily surpass that number, but should eventually come back down to the max specified.
         * @param {Object} options - Tile info.
         * @param {OpenSeadragon.Tile} options.tile - The tile to cache.
         * @param {Image} options.image - The image of the tile to cache.
         * @param {OpenSeadragon.TiledImage} options.tiledImage - The TiledImage that owns that tile.
         * @param {Number} [options.cutoff=0] - If adding this tile goes over the cache max count, this
         * function will release an old tile. The cutoff option specifies a tile level at or below which
         * tiles will not be released.
         */
        cacheTile: function cacheTile(options) {
            $.console.assert(options, "[TileCache.cacheTile] options is required");
            $.console.assert(options.tile, "[TileCache.cacheTile] options.tile is required");
            $.console.assert(options.tile.url, "[TileCache.cacheTile] options.tile.url is required");
            $.console.assert(options.tiledImage, "[TileCache.cacheTile] options.tiledImage is required");

            var cutoff = options.cutoff || 0;
            var insertionIndex = this._tilesLoaded.length;

            var imageRecord = this._imagesLoaded[options.tile.url];
            if (!imageRecord) {
                $.console.assert(options.image, "[TileCache.cacheTile] options.image is required to create an ImageRecord");
                imageRecord = this._imagesLoaded[options.tile.url] = new ImageRecord({
                    image: options.image
                });

                this._imagesLoadedCount++;
            }

            imageRecord.addTile(options.tile);
            options.tile.cacheImageRecord = imageRecord;

            // Note that just because we're unloading a tile doesn't necessarily mean
            // we're unloading an image. With repeated calls it should sort itself out, though.
            if (this._imagesLoadedCount > this._maxImageCacheCount) {
                var worstTile = null;
                var worstTileIndex = -1;
                var worstTileRecord = null;
                var prevTile, worstTime, worstLevel, prevTime, prevLevel, prevTileRecord;

                for (var i = this._tilesLoaded.length - 1; i >= 0; i--) {
                    prevTileRecord = this._tilesLoaded[i];
                    prevTile = prevTileRecord.tile;

                    if (prevTile.level <= cutoff || prevTile.beingDrawn) {
                        continue;
                    } else if (!worstTile) {
                        worstTile = prevTile;
                        worstTileIndex = i;
                        worstTileRecord = prevTileRecord;
                        continue;
                    }

                    prevTime = prevTile.lastTouchTime;
                    worstTime = worstTile.lastTouchTime;
                    prevLevel = prevTile.level;
                    worstLevel = worstTile.level;

                    if (prevTime < worstTime || prevTime == worstTime && prevLevel > worstLevel) {
                        worstTile = prevTile;
                        worstTileIndex = i;
                        worstTileRecord = prevTileRecord;
                    }
                }

                if (worstTile && worstTileIndex >= 0) {
                    this._unloadTile(worstTileRecord);
                    insertionIndex = worstTileIndex;
                }
            }

            this._tilesLoaded[insertionIndex] = new TileRecord({
                tile: options.tile,
                tiledImage: options.tiledImage
            });
        },

        /**
         * Clears all tiles associated with the specified tiledImage.
         * @param {OpenSeadragon.TiledImage} tiledImage
         */
        clearTilesFor: function clearTilesFor(tiledImage) {
            $.console.assert(tiledImage, '[TileCache.clearTilesFor] tiledImage is required');
            var tileRecord;
            for (var i = 0; i < this._tilesLoaded.length; ++i) {
                tileRecord = this._tilesLoaded[i];
                if (tileRecord.tiledImage === tiledImage) {
                    this._unloadTile(tileRecord);
                    this._tilesLoaded.splice(i, 1);
                    i--;
                }
            }
        },

        // private
        getImageRecord: function getImageRecord(url) {
            $.console.assert(url, '[TileCache.getImageRecord] url is required');
            return this._imagesLoaded[url];
        },

        // private
        _unloadTile: function _unloadTile(tileRecord) {
            $.console.assert(tileRecord, '[TileCache._unloadTile] tileRecord is required');
            var tile = tileRecord.tile;
            var tiledImage = tileRecord.tiledImage;

            tile.unload();
            tile.cacheImageRecord = null;

            var imageRecord = this._imagesLoaded[tile.url];
            imageRecord.removeTile(tile);
            if (!imageRecord.getTileCount()) {
                imageRecord.destroy();
                delete this._imagesLoaded[tile.url];
                this._imagesLoadedCount--;
            }

            /**
             * Triggered when a tile has just been unloaded from memory.
             *
             * @event tile-unloaded
             * @memberof OpenSeadragon.Viewer
             * @type {object}
             * @property {OpenSeadragon.TiledImage} tiledImage - The tiled image of the unloaded tile.
             * @property {OpenSeadragon.Tile} tile - The tile which has been unloaded.
             */
            tiledImage.viewer.raiseEvent("tile-unloaded", {
                tile: tile,
                tiledImage: tiledImage
            });
        }
    };
})(OpenSeadragon);

/*
 * OpenSeadragon - World
 *
 * Copyright (C) 2009 CodePlex Foundation
 * Copyright (C) 2010-2013 OpenSeadragon contributors
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 * - Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 *
 * - Neither the name of CodePlex Foundation nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

(function ($) {

    /**
     * @class World
     * @memberof OpenSeadragon
     * @extends OpenSeadragon.EventSource
     * @classdesc Keeps track of all of the tiled images in the scene.
     * @param {Object} options - World options.
     * @param {OpenSeadragon.Viewer} options.viewer - The Viewer that owns this World.
     **/
    $.World = function (options) {
        var _this = this;

        $.console.assert(options.viewer, "[World] options.viewer is required");

        $.EventSource.call(this);

        this.viewer = options.viewer;
        this._items = [];
        this._needsDraw = false;
        this._autoRefigureSizes = true;
        this._needsSizesFigured = false;
        this._delegatedFigureSizes = function (event) {
            if (_this._autoRefigureSizes) {
                _this._figureSizes();
            } else {
                _this._needsSizesFigured = true;
            }
        };

        this._figureSizes();
    };

    $.extend($.World.prototype, $.EventSource.prototype, /** @lends OpenSeadragon.World.prototype */{
        /**
         * Add the specified item.
         * @param {OpenSeadragon.TiledImage} item - The item to add.
         * @param {Number} [options.index] - Index for the item. If not specified, goes at the top.
         * @fires OpenSeadragon.World.event:add-item
         * @fires OpenSeadragon.World.event:metrics-change
         */
        addItem: function addItem(item, options) {
            $.console.assert(item, "[World.addItem] item is required");
            $.console.assert(item instanceof $.TiledImage, "[World.addItem] only TiledImages supported at this time");

            options = options || {};
            if (options.index !== undefined) {
                var index = Math.max(0, Math.min(this._items.length, options.index));
                this._items.splice(index, 0, item);
            } else {
                this._items.push(item);
            }

            if (this._autoRefigureSizes) {
                this._figureSizes();
            } else {
                this._needsSizesFigured = true;
            }

            this._needsDraw = true;

            item.addHandler('bounds-change', this._delegatedFigureSizes);

            /**
             * Raised when an item is added to the World.
             * @event add-item
             * @memberOf OpenSeadragon.World
             * @type {object}
             * @property {OpenSeadragon.Viewer} eventSource - A reference to the World which raised the event.
             * @property {OpenSeadragon.TiledImage} item - The item that has been added.
             * @property {?Object} userData - Arbitrary subscriber-defined object.
             */
            this.raiseEvent('add-item', {
                item: item
            });
        },

        /**
         * Get the item at the specified index.
         * @param {Number} index - The item's index.
         * @returns {OpenSeadragon.TiledImage} The item at the specified index.
         */
        getItemAt: function getItemAt(index) {
            $.console.assert(index !== undefined, "[World.getItemAt] index is required");
            return this._items[index];
        },

        /**
         * Get the index of the given item or -1 if not present.
         * @param {OpenSeadragon.TiledImage} item - The item.
         * @returns {Number} The index of the item or -1 if not present.
         */
        getIndexOfItem: function getIndexOfItem(item) {
            $.console.assert(item, "[World.getIndexOfItem] item is required");
            return $.indexOf(this._items, item);
        },

        /**
         * @returns {Number} The number of items used.
         */
        getItemCount: function getItemCount() {
            return this._items.length;
        },

        /**
         * Change the index of a item so that it appears over or under others.
         * @param {OpenSeadragon.TiledImage} item - The item to move.
         * @param {Number} index - The new index.
         * @fires OpenSeadragon.World.event:item-index-change
         */
        setItemIndex: function setItemIndex(item, index) {
            $.console.assert(item, "[World.setItemIndex] item is required");
            $.console.assert(index !== undefined, "[World.setItemIndex] index is required");

            var oldIndex = this.getIndexOfItem(item);

            if (index >= this._items.length) {
                throw new Error("Index bigger than number of layers.");
            }

            if (index === oldIndex || oldIndex === -1) {
                return;
            }

            this._items.splice(oldIndex, 1);
            this._items.splice(index, 0, item);
            this._needsDraw = true;

            /**
             * Raised when the order of the indexes has been changed.
             * @event item-index-change
             * @memberOf OpenSeadragon.World
             * @type {object}
             * @property {OpenSeadragon.World} eventSource - A reference to the World which raised the event.
             * @property {OpenSeadragon.TiledImage} item - The item whose index has
             * been changed
             * @property {Number} previousIndex - The previous index of the item
             * @property {Number} newIndex - The new index of the item
             * @property {?Object} userData - Arbitrary subscriber-defined object.
             */
            this.raiseEvent('item-index-change', {
                item: item,
                previousIndex: oldIndex,
                newIndex: index
            });
        },

        /**
         * Remove an item.
         * @param {OpenSeadragon.TiledImage} item - The item to remove.
         * @fires OpenSeadragon.World.event:remove-item
         * @fires OpenSeadragon.World.event:metrics-change
         */
        removeItem: function removeItem(item) {
            $.console.assert(item, "[World.removeItem] item is required");

            var index = $.indexOf(this._items, item);
            if (index === -1) {
                return;
            }

            item.removeHandler('bounds-change', this._delegatedFigureSizes);
            item.destroy();
            this._items.splice(index, 1);
            this._figureSizes();
            this._needsDraw = true;
            this._raiseRemoveItem(item);
        },

        /**
         * Remove all items.
         * @fires OpenSeadragon.World.event:remove-item
         * @fires OpenSeadragon.World.event:metrics-change
         */
        removeAll: function removeAll() {
            // We need to make sure any pending images are canceled so the world items don't get messed up
            this.viewer._cancelPendingImages();
            var item;
            for (var i = 0; i < this._items.length; i++) {
                item = this._items[i];
                item.removeHandler('bounds-change', this._delegatedFigureSizes);
                item.destroy();
            }

            var removedItems = this._items;
            this._items = [];
            this._figureSizes();
            this._needsDraw = true;

            for (i = 0; i < removedItems.length; i++) {
                item = removedItems[i];
                this._raiseRemoveItem(item);
            }
        },

        /**
         * Clears all tiles and triggers updates for all items.
         */
        resetItems: function resetItems() {
            for (var i = 0; i < this._items.length; i++) {
                this._items[i].reset();
            }
        },

        /**
         * Updates (i.e. animates bounds of) all items.
         */
        update: function update() {
            var animated = false;
            for (var i = 0; i < this._items.length; i++) {
                animated = this._items[i].update() || animated;
            }

            return animated;
        },

        /**
         * Draws all items.
         */
        draw: function draw() {
            for (var i = 0; i < this._items.length; i++) {
                this._items[i].draw();
            }

            this._needsDraw = false;
        },

        /**
         * @returns {Boolean} true if any items need updating.
         */
        needsDraw: function needsDraw() {
            for (var i = 0; i < this._items.length; i++) {
                if (this._items[i].needsDraw()) {
                    return true;
                }
            }
            return this._needsDraw;
        },

        /**
         * @returns {OpenSeadragon.Rect} The smallest rectangle that encloses all items, in viewport coordinates.
         */
        getHomeBounds: function getHomeBounds() {
            return this._homeBounds.clone();
        },

        /**
         * To facilitate zoom constraints, we keep track of the pixel density of the
         * densest item in the World (i.e. the item whose content size to viewport size
         * ratio is the highest) and save it as this "content factor".
         * @returns {Number} the number of content units per viewport unit.
         */
        getContentFactor: function getContentFactor() {
            return this._contentFactor;
        },

        /**
         * As a performance optimization, setting this flag to false allows the bounds-change event handler
         * on tiledImages to skip calculations on the world bounds. If a lot of images are going to be positioned in
         * rapid succession, this is a good idea. When finished, setAutoRefigureSizes should be called with true
         * or the system may behave oddly.
         * @param {Boolean} [value] The value to which to set the flag.
         */
        setAutoRefigureSizes: function setAutoRefigureSizes(value) {
            this._autoRefigureSizes = value;
            if (value & this._needsSizesFigured) {
                this._figureSizes();
                this._needsSizesFigured = false;
            }
        },

        /**
         * Arranges all of the TiledImages with the specified settings.
         * @param {Object} options - Specifies how to arrange.
         * @param {Boolean} [options.immediately=false] - Whether to animate to the new arrangement.
         * @param {String} [options.layout] - See collectionLayout in {@link OpenSeadragon.Options}.
         * @param {Number} [options.rows] - See collectionRows in {@link OpenSeadragon.Options}.
         * @param {Number} [options.columns] - See collectionColumns in {@link OpenSeadragon.Options}.
         * @param {Number} [options.tileSize] - See collectionTileSize in {@link OpenSeadragon.Options}.
         * @param {Number} [options.tileMargin] - See collectionTileMargin in {@link OpenSeadragon.Options}.
         * @fires OpenSeadragon.World.event:metrics-change
         */
        arrange: function arrange(options) {
            options = options || {};
            var immediately = options.immediately || false;
            var layout = options.layout || $.DEFAULT_SETTINGS.collectionLayout;
            var rows = options.rows || $.DEFAULT_SETTINGS.collectionRows;
            var columns = options.columns || $.DEFAULT_SETTINGS.collectionColumns;
            var tileSize = options.tileSize || $.DEFAULT_SETTINGS.collectionTileSize;
            var tileMargin = options.tileMargin || $.DEFAULT_SETTINGS.collectionTileMargin;
            var increment = tileSize + tileMargin;
            var wrap;
            if (!options.rows && columns) {
                wrap = columns;
            } else {
                wrap = Math.ceil(this._items.length / rows);
            }
            var x = 0;
            var y = 0;
            var item, box, width, height, position;

            this.setAutoRefigureSizes(false);
            for (var i = 0; i < this._items.length; i++) {
                if (i && i % wrap === 0) {
                    if (layout === 'horizontal') {
                        y += increment;
                        x = 0;
                    } else {
                        x += increment;
                        y = 0;
                    }
                }

                item = this._items[i];
                box = item.getBounds();
                if (box.width > box.height) {
                    width = tileSize;
                } else {
                    width = tileSize * (box.width / box.height);
                }

                height = width * (box.height / box.width);
                position = new $.Point(x + (tileSize - width) / 2, y + (tileSize - height) / 2);

                item.setPosition(position, immediately);
                item.setWidth(width, immediately);

                if (layout === 'horizontal') {
                    x += increment;
                } else {
                    y += increment;
                }
            }
            this.setAutoRefigureSizes(true);
        },

        // private
        _figureSizes: function _figureSizes() {
            var oldHomeBounds = this._homeBounds ? this._homeBounds.clone() : null;
            var oldContentSize = this._contentSize ? this._contentSize.clone() : null;
            var oldContentFactor = this._contentFactor || 0;

            if (!this._items.length) {
                this._homeBounds = new $.Rect(0, 0, 1, 1);
                this._contentSize = new $.Point(1, 1);
                this._contentFactor = 1;
            } else {
                var bounds = this._items[0].getBounds();
                this._contentFactor = this._items[0].getContentSize().x / bounds.width;
                var left = bounds.x;
                var top = bounds.y;
                var right = bounds.x + bounds.width;
                var bottom = bounds.y + bounds.height;
                var box;
                for (var i = 1; i < this._items.length; i++) {
                    box = this._items[i].getBounds();
                    this._contentFactor = Math.max(this._contentFactor, this._items[i].getContentSize().x / box.width);
                    left = Math.min(left, box.x);
                    top = Math.min(top, box.y);
                    right = Math.max(right, box.x + box.width);
                    bottom = Math.max(bottom, box.y + box.height);
                }

                this._homeBounds = new $.Rect(left, top, right - left, bottom - top);
                this._contentSize = new $.Point(this._homeBounds.width * this._contentFactor, this._homeBounds.height * this._contentFactor);
            }

            if (this._contentFactor !== oldContentFactor || !this._homeBounds.equals(oldHomeBounds) || !this._contentSize.equals(oldContentSize)) {
                /**
                 * Raised when the home bounds or content factor change.
                 * @event metrics-change
                 * @memberOf OpenSeadragon.World
                 * @type {object}
                 * @property {OpenSeadragon.World} eventSource - A reference to the World which raised the event.
                 * @property {?Object} userData - Arbitrary subscriber-defined object.
                 */
                this.raiseEvent('metrics-change', {});
            }
        },

        // private
        _raiseRemoveItem: function _raiseRemoveItem(item) {
            /**
             * Raised when an item is removed.
             * @event remove-item
             * @memberOf OpenSeadragon.World
             * @type {object}
             * @property {OpenSeadragon.World} eventSource - A reference to the World which raised the event.
             * @property {OpenSeadragon.TiledImage} item - The item's underlying item.
             * @property {?Object} userData - Arbitrary subscriber-defined object.
             */
            this.raiseEvent('remove-item', { item: item });
        }
    });
})(OpenSeadragon);

},{}]},{},[10]);
