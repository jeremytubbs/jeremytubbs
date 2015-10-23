$(function() {
  $('.burger-box,.sliding-panel-fade-screen,.sliding-panel-close').on('click touchstart', function(e) {
    e.preventDefault();
    $('.burger-box').toggleClass('is-open');
    $('.sliding-panel-content,.sliding-panel-fade-screen').toggleClass('is-visible');
  });
});