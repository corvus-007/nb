window.searchbar = (function() {
  'use strict';

  var searchbar = document.querySelector('.searchbar');

  if (searchbar) {
    var searchbarToggler = searchbar.querySelector('.searchbar-toggler');
    var searchbarInput = searchbar.querySelector('.searchbar__input');

    var onSearchBarEscPress = function(event) {
      if (event.keyCode === window.util.KEYCODE_ESC) {
        hideSearchBarContent();
      }
    };

    var onSearchBarClickOut = function(event) {
      var isClickOut = true;

      if (searchbar.contains(event.target)) {
        isClickOut = false;
      }

      if (isClickOut) {
        hideSearchBarContent();
      }
    };

    searchbarToggler.addEventListener('click', function(event) {
      event.preventDefault();
      showSearchBarContent();
    });
  }

  var showSearchBarContent = function() {
    searchbar.classList.remove('searchbar--closed');
    searchbarInput.focus();
    document.addEventListener('keydown', onSearchBarEscPress);
    document.addEventListener('click', onSearchBarClickOut);
  };

  var hideSearchBarContent = function() {
    searchbar.classList.add('searchbar--closed');
    document.removeEventListener('keydown', onSearchBarEscPress);
  };

  return {
    showContent: showSearchBarContent,
    hideContent: hideSearchBarContent
  };
})();
