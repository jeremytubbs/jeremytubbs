<?php

return [
    // source path for images to be tiled
    'source_path' => '',
    // destination path for tiled output
    'destination_path' => public_path('images'),
    // Choose between gd and imagick support.
    'driver' => 'gd',
    'tile_format' => 'jpg',
];