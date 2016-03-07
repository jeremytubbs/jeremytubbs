<div class="masonry-item">
  <div class="reveal">
    <a href="{{ $content->url }}">
      <img class="grow" srcset="{{ $content->assets[0]['cover']['uri'] }} 1x" />
      <aside class="overlay">
        <div class="plus"></div>
        <div class="title-box">
          <h6 class='title'>{{ $content->title }}</h6>
        </div>
      </aside>
    </a>
  </div>
</div>