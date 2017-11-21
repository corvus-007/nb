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
      // создадим элемент с прокруткой
      var div = document.createElement('div');

      div.style.overflowY = 'scroll';
      div.style.width = '50px';
      div.style.height = '50px';

      // при display:none размеры нельзя узнать
      // нужно, чтобы элемент был видим,
      // visibility:hidden - можно, т.к. сохраняет геометрию
      div.style.visibility = 'hidden';

      document.body.appendChild(div);
      var scrollWidth = div.offsetWidth - div.clientWidth;
      document.body.removeChild(div);

      return scrollWidth;
    }
  };
})();
