<?php

return [
    'destination_path' => public_path('images'),
    'image_sizes' => [
        'thumb'   => [240, null],
        'cover' => [480, 640]
    ],
    'image_driver' => 'imagick',
    'image_2x' => true,
    'image_format' => 'jpg',
];
