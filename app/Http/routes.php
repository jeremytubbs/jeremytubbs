<?php

Route::group(['middleware' => ['web']], function () {
	Route::get('/', ['as' => 'pages.home', 'uses' => 'PagesController@home']);
});
