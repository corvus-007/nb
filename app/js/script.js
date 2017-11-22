document.addEventListener('DOMContentLoaded', function() {
  svg4everybody();

  $('.sticky-banners').stick_in_parent({
    parent: '.js-parent-sticky-sidebar-banners',
    offset_top: 56
  });

  if (window.matchMedia('(max-width: 1279px)').matches) {
    $('.sticky-banners').trigger('sticky_kit:detach');
  }
});
