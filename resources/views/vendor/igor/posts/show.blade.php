@extends('app')

@section('content')
<main class="container">
{!! $post->body !!}
</main>
@endsection

@section('scripts')
<script src='/js/vendor/intense.min.js' async></script>
<script>
window.onload = function() {
  var elements = document.querySelectorAll( '.intense' );
  Intense( elements );
}
</script>
@endsection