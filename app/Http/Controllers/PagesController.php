<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Jeremytubbs\Igor\Models\Category;

class PagesController extends Controller
{
    public function home()
    {
        $layout = 'default';
        // get all site content
        $content = Category::with('posts', 'projects')->get();
        return view('app', compact('layout', 'content'));
    }
}
