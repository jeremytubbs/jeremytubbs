<?php

return [
    'destination_path' => public_path('images'),
    'image_sizes' => [
        'thumb'   => [240, null],
        'cover' => [540, null]
    ],
    'image_driver' => 'gd',
    'image_2x' => true,
    'image_format' => 'jpg',
];
