window.navbar = (function() {
  'use strict';

  var navbar = document.querySelector('.navbar');
  var navbarMainNavWrapper = navbar.querySelector('.navbar__main-nav-wrapper');
  var wrapperNavbar = document.createElement('div');
  var navbarOffsetTop = 0;
  var topBanner = document.querySelector('.top-banner');

  wrapperNavbar.classList.add('navbar__wrapper');
  navbar.insertAdjacentElement('beforeBegin', wrapperNavbar);
  wrapperNavbar.appendChild(navbar);
  navbarOffsetTop = navbar.offsetTop;
  wrapperNavbar.style.height = navbar.offsetHeight + 'px';

  var stickNavbar = function() {
    navbar.classList.add('navbar--sticky');
  };

  var unstickNavbar = function() {
    navbar.classList.remove('navbar--sticky');
  };

  var updateScroll = window.util.debounce(function() {
    if (window.pageYOffset > navbarOffsetTop) {
      stickNavbar();
    } else {
      unstickNavbar();
    }
  }, 16);

  $(topBanner)
    .imagesLoaded()
    .always(function() {
      updateScroll();
      navbarOffsetTop = navbar.offsetTop;
      window.addEventListener('scroll', updateScroll);
    });

  return {
    mainNavWrapper: navbarMainNavWrapper,
    stick: stickNavbar,
    unstick: unstickNavbar
  };
})();
