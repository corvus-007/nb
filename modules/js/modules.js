window.util = (function() {
  'use strict';

  return {
    KEYCODE_ESC: 27,
    setMaxHeight: function(selector) {
      var maxHeight;
      var elements = document.querySelectorAll(selector);

      if (!elements.length) {
        return;
      }

      maxHeight = Array.from(elements).reduce(function findMaxHeight(
        prevValue,
        element
      ) {
        var currentValue = element.offsetHeight;
        return prevValue > currentValue ? prevValue : currentValue;
      },
      0);

      Array.from(elements).forEach(function specifyMaxHeight(it) {
        it.style.height = maxHeight + 'px';
      });
    },
    getScrollbarWidth: function() {
      var div = document.createElement('div');

      div.style.overflowY = 'scroll';
      div.style.width = '50px';
      div.style.height = '50px';
      div.style.visibility = 'hidden';

      document.body.appendChild(div);
      var scrollWidth = div.offsetWidth - div.clientWidth;
      document.body.removeChild(div);

      return scrollWidth;
    },
    throttle: function(func, wait, options) {
      var context, args, result;
      var timeout = null;
      var previous = 0;
      if (!options) options = {};
      var later = function() {
        previous = options.leading === false ? 0 : Date.now();
        timeout = null;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      };
      return function() {
        var now = Date.now();
        if (!previous && options.leading === false) previous = now;
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0 || remaining > wait) {
          if (timeout) {
            clearTimeout(timeout);
            timeout = null;
          }
          previous = now;
          result = func.apply(context, args);
          if (!timeout) context = args = null;
        } else if (!timeout && options.trailing !== false) {
          timeout = setTimeout(later, remaining);
        }
        return result;
      };
    },
    debounce: function(func, wait, immediate) {
      var timeout, args, context, timestamp, result;

      var later = function() {
        var last = new Date().getTime() - timestamp;

        if (last < wait && last >= 0) {
          timeout = setTimeout(later, wait - last);
        } else {
          timeout = null;
          if (!immediate) {
            result = func.apply(context, args);
            if (!timeout) context = args = null;
          }
        }
      };

      return function() {
        context = this;
        args = arguments;
        timestamp = new Date().getTime();
        var callNow = immediate && !timeout;
        if (!timeout) timeout = setTimeout(later, wait);
        if (callNow) {
          result = func.apply(context, args);
          context = args = null;
        }

        return result;
      };
    }
  };
})();

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

window.outCover = (function() {
  'use strict';

  var outCover = document.querySelector('.out-cover');
  var outCoverCloseWrapper = outCover.querySelector(
    '.out-cover__close-wrapper'
  );
  var outCoverBody = outCover.querySelector('.out-cover__body');
  var outCoverMainNavWrapper = outCover.querySelector(
    '.out-cover__main-nav-wrapper'
  );
  var outCoverFooter = outCover.querySelector('.out-cover__footer');
  var outCoverToggler = document.querySelector('.out-cover-toggler');
  var outCoverClose = outCover.querySelector('.out-cover__close');
  var scrollWidth = window.util.getScrollbarWidth();
  var scrollPageValue = 0;

  var onOutCoverEscPress = function(event) {
    if (event.keyCode === window.util.KEYCODE_ESC) {
      hideOutCover();
    }
  };

  var getSumHeight = function() {
    var result = 0;

    for (var i = 0; i < arguments.length; i++) {
      result += arguments[i].offsetHeight;
    }

    return result;
  };

  var showOutCover = function() {
    scrollPageValue = window.pageYOffset;
    outCoverBody.style.height =
      'calc(100% - (' +
      getSumHeight(outCoverCloseWrapper, outCoverFooter) +
      'px))';
    document.body.classList.add('no-scroll');
    outCover.classList.add('out-cover--opened');
    document.addEventListener('keydown', onOutCoverEscPress);
  };

  var hideOutCover = function() {
    outCover.classList.remove('out-cover--opened');
    document.body.classList.remove('no-scroll');
    window.scrollTo(0, scrollPageValue);
    document.removeEventListener('keydown', onOutCoverEscPress);
  };

  outCoverToggler.addEventListener('click', function(event) {
    event.preventDefault();
    showOutCover();
  });

  outCoverClose.addEventListener('click', function(event) {
    event.preventDefault();
    hideOutCover();
  });

  return {
    mainNavWrapper: outCoverMainNavWrapper,
    show: showOutCover,
    hide: hideOutCover
  };
})();

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
