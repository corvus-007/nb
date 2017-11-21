window.navbar = (function() {
  'use strict';

  var navbar = document.querySelector('.navbar');
  var wrapperNavbar = document.createElement('div');
  var navbarOffsetTop = 0;

  wrapperNavbar.classList.add('navbar__wrapper');
  navbar.insertAdjacentElement('beforeBegin', wrapperNavbar);
  wrapperNavbar.appendChild(navbar);
  navbarOffsetTop = navbar.offsetTop;
  wrapperNavbar.style.height = navbar.offsetHeight + 'px';

  var stickNavbar = window.util.throttle(function() {
    navbar.classList.add('navbar--sticky');
  }, 40);

  var unstickNavbar = window.util.throttle(function() {
    navbar.classList.remove('navbar--sticky');
  }, 40);

  window.addEventListener('scroll', function(event) {
    if (window.pageYOffset > navbarOffsetTop) {
      stickNavbar();
    } else {
      unstickNavbar();
    }
  });

  return {
    stick: stickNavbar,
    unstick: unstickNavbar
  };
})();
