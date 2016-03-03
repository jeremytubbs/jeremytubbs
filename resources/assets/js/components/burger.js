var burgerBox = document.querySelector('.burger-box');
var slidingPanel = document.querySelector('.sliding-panel');
var screenOverlay = document.querySelector('.screen-overlay');
var body = document.querySelector('body');

burgerBox.addEventListener('click', function(e) {
  e.preventDefault();
  burgerBox.classList.toggle('burger--open');
  slidingPanel.classList.toggle('sliding-panel--open');
  screenOverlay.classList.toggle('screen-overlay--visible');
  body.classList.toggle('disable-scroll');
});

screenOverlay.addEventListener('click', function(e) {
  e.preventDefault();
  burgerBox.classList.toggle('burger--open');
  slidingPanel.classList.toggle('sliding-panel--open');
  screenOverlay.classList.toggle('screen-overlay--visible');
  body.classList.toggle('disable-scroll');
});
