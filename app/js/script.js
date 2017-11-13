document.addEventListener('DOMContentLoaded', function() {
  svg4everybody();
  console.log('script.js');

  // Navigation
  const KEYCODE_ESC = 27;
  var navigation = $('#main-nav').okayNav({
    parent: '.main-nav-wrapper'
  });

  $('.navbar').sticky({
    zIndex: 20
  });

  $('navbar').stick_in_parent({
    parent: '.main-wrapper'
  });

  $('.sticky-banners').stick_in_parent({
    parent: '.js-parent-sticky-sidebar-banners',
    offset_top: 50
  });

  let searchbar = document.querySelector('.searchbar');

  if (searchbar) {
    let searchbarToggler = searchbar.querySelector('.searchbar-toggler');
    let searchbarInput = searchbar.querySelector('.searchbox__input');

    let onSearchBarEscPress = function(event) {
      if (event.keyCode === KEYCODE_ESC) {
        hideSearchBarContent();
      }
    };

    let showSearchBarContent = function() {
      searchbar.classList.remove('searchbar--closed');
      searchbarInput.focus();
      document.addEventListener('keydown', onSearchBarEscPress);
    };

    let hideSearchBarContent = function() {
      searchbar.classList.add('searchbar--closed');
      document.removeEventListener('keydown', onSearchBarEscPress);
    };

    searchbarToggler.addEventListener('click', function(event) {
      event.preventDefault();
      showSearchBarContent();
    });
  }
});
