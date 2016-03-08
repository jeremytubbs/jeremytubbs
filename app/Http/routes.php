<?php

Route::group(['middleware' => ['web']], function () {
    if (config('app.env') == 'local') {
        Route::get('categories/{slug}', '\Jeremytubbs\Igor\Http\Controllers\IgorCategoryController@show');
    }
    if (config('app.env') == 'production') {
        Route::group(['domain' => '{slug}.jeremytubbs.com'], function () {
            Route::get('/', '\Jeremytubbs\Igor\Http\Controllers\IgorCategoryController@show');
        });
    }
    Route::get('/', ['as' => 'pages.home', 'uses' => 'PagesController@home']);
});
