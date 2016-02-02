<?php

namespace App;

use Jeremytubbs\Igor\Models\Post as IgorProject;

class Project extends IgorProject
{
    use \Jeremytubbs\Igor\Traits\SluggerTrait;

    protected $dates = ['started_at', 'completed_at'];

}
