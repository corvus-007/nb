document.addEventListener('DOMContentLoaded', function() {
  svg4everybody();

  // Navigation
  if (window.matchMedia('(min-width: 992px)').matches) {
    var navigation = $('#main-nav').okayNav({
      parent: '.main-nav-wrapper',
      swipe_enabled: false
    });
  }

  $('.sticky-banners').stick_in_parent({
    parent: '.js-parent-sticky-sidebar-banners',
    offset_top: 56
  });

  if (window.matchMedia('(max-width: 1279px)').matches) {
    $('.sticky-banners').trigger('sticky_kit:detach');
  }
});
