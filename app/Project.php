<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $guarded = [];

    protected $dates = ['published_at'];

    /**
     * Get all of the tags for the Project.
     */
    public function tags()
    {
        return $this->morphToMany('Jeremytubbs\Igor\Models\Tag', 'taggable')->withTimestamps();
    }

    /**
     * Get all of the Project categories.
     */
    public function categories()
    {
        return $this->morphToMany('Jeremytubbs\Igor\Models\Category', 'categorable')->withTimestamps();
    }
}
