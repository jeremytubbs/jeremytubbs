@extends('app')

@section('content')
<main class="container">
  <div class="grid masonry">
    <div class="masonry-sizer"></div>
      @each('partials.card', $contents, 'content')
  </div>
</main>
@endsection