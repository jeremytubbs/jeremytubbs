var elixir = require('laravel-elixir');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(function(mix) {
    mix.sass('app.scss')
       .browserify('app.js');

    mix.scripts([
        'vendor/intense.js',
        'vendor/headroom.js',
        'vendor/imagesloaded.js',
        'vendor/masonry.js'
        //'vendor/scrollreveal.js'
        ],
        'public/js/vendor/vendor.js'
    );
});
