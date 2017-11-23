window.mainNav = (function() {
  'use strict';

  var mainNav = document.querySelector('.main-nav');
  var navigation = $(mainNav).okayNav({
    parent: '.navbar__main-nav-wrapper',
    swipe_enabled: false
  });

  var moveMainNavToNavbar = function() {
    window.navbar.mainNavWrapper.appendChild(mainNav);
    mainNav.classList.remove('main-nav--mobile');
  };

  var moveMainNavToOutCover = function() {
    window.outCover.mainNavWrapper.appendChild(mainNav);
    mainNav.classList.add('main-nav--mobile');
  };

  var updatePlaceNav = window.util.debounce(function() {
    if (window.matchMedia('(min-width: 992px)').matches) {
      moveMainNavToNavbar();
      $(mainNav).okayNav({
        parent: '.navbar__main-nav-wrapper',
        swipe_enabled: false
      });
      navigation.okayNav('recalcNav');
    } else {
      navigation.okayNav('destroy');
      moveMainNavToOutCover();
    }
  }, 150);

  updatePlaceNav();

  window.addEventListener('resize', updatePlaceNav);
})();
