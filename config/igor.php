<?php

return [
    // your custom content types
    'types' => ['projects'],

    // custom columns for your content types
    'custom_columns' => [
        'projects' => [
            'started_at' => 'timestamp',
            'completed_at' => 'timestamp'
        ],
    ],

    // use the package routes
    'use_content_routes' => true,
    // custom route for a custom content type
    'content_type_routes' => [
        'projects' => 'projects'
    ],
    'use_page_routes' => true,
    'use_tag_routes' => true,
    'use_category_routes' => false,
    // use the sitemap route
    'use_sitemap' => true,

    'assets' => [
        'deepzoom' => true,
        'resize'   => true
    ],

    'excerpt_separator' => '<!--more-->',
];
