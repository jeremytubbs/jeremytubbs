@extends('app')

@section('content')
<main class="container">
{!! $post->body !!}
<div class="grid gallery">
  <div class="gallery-sizer"></div>
  	@each('partials.gallery-card', $post->assets, 'content')
</div>
</main>
@endsection

@section('styles')
<script src='/js/vendor/intense.js'></script>
@endsection

@section('scripts')
<script>
window.onload = function() {
  var elements = document.querySelectorAll( '.intense' );
  Intense( elements );
}
</script>
@endsection