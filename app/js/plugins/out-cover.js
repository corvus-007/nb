window.outCover = (function() {
  'use strict';

  var outCover = document.querySelector('.out-cover');
  var outCoverCloseWrapper = outCover.querySelector(
    '.out-cover__close-wrapper'
  );
  var outCoverBody = outCover.querySelector('.out-cover__body');
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

  var showOutCover = function() {
    scrollPageValue = window.pageYOffset;
    var outCoverCloseWrapperHeight = outCoverCloseWrapper.offsetHeight;
    var outCoverFooterHeight = outCoverFooter.offsetHeight;
    outCoverBody.style.height =
      'calc(100% - (' +
      outCoverCloseWrapperHeight +
      outCoverFooterHeight +
      'px))';
    document.body.style.cssText = 'padding-right: ' + scrollWidth + 'px;';
    document.body.classList.add('no-scroll');
    outCover.classList.add('out-cover--opened');
    document.addEventListener('keydown', onOutCoverEscPress);
  };

  var hideOutCover = function() {
    document.body.style = '';
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
    show: showOutCover,
    hide: hideOutCover
  };
})();
