<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Content;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Jeremytubbs\Igor\Transformers\ContentTransformer;

class PagesController extends Controller
{
    protected $transformer;

    public function __construct(ContentTransformer $transformer)
    {
        $this->transformer = $transformer;
    }

    public function home()
    {
        // get all site content
        $contents = Content::where('published', '=', true)
            ->with('type', 'columns', 'columns.type', 'tags', 'categories', 'assets', 'assets.source')
            ->paginate();

        $contents = $this->transformer->collection($contents);
        return view('pages.home', compact('contents'));
    }
}
