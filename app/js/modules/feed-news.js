window.feedNews = (function() {
  'use strict';

  var moveFeedNewsToMain = function() {
    var feedNews = document.querySelector('.feed-news');

    if (feedNews) {
      var mainGridColumn = document.querySelector('.main-grid__column-main');
      var sectionTopNews = mainGridColumn.querySelector('.section-top-news');
      mainGridColumn.insertBefore(feedNews, sectionTopNews);
      feedNews.classList.add('section');
    }
  };

  var moveFeedNewsToSidebar = function() {
    var feedNews = document.querySelector('.feed-news');

    if (feedNews) {
      var leftGridColumn = document.querySelector('.main-grid__column-left');
      var sidebar = leftGridColumn.querySelector('.sidebar');
      sidebar.insertBefore(feedNews, sidebar.firstElementChild);
      feedNews.classList.remove('section');
    }
  };

  var updatePlaceFeedNews = window.util.debounce(function() {
    if (window.matchMedia('(max-width: 1279px)').matches) {
      moveFeedNewsToMain();
    } else {
      moveFeedNewsToSidebar();
    }
  });

  window.addEventListener('resize', updatePlaceFeedNews);

  updatePlaceFeedNews();
})();
