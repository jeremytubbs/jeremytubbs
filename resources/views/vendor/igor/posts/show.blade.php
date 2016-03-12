@extends('app')

@section('content')
<main class="container">
  {!! $post->body !!}
  <div class="grid gallery">
    <div class="gallery-sizer"></div>
      @foreach($post->assets as $asset)
        <div class="col gallery-item">
          <div class="reveal">
          <a>
            <img class="grow intense" src="{{ $asset['files']['cover']['uri'] }}"
              data-image="{{ $asset['files']['cover@2x']['uri'] }}"
              data-title="{{ $asset['title'] }}" />
          </a>
          </div>
        </div>
      @endforeach
  </div>
</main>
@endsection

@section('scripts')
<script>
window.onload = function() {
  var elements = document.querySelectorAll( '.intense' );
  Intense( elements );
}
</script>
@endsection