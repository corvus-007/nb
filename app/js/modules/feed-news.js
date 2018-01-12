window.feedNews = (function() {
  'use strict';

  var feedNews = document.querySelector('.feed-news');
  var slider = document.querySelector('.feed-news-slider');

  var sliderOptions = {
    accessibility: false,
    slidesToShow: 7,
    slidesToScroll: 7,
    speed: 800,
    infinite: false,
    vertical: true,
    prevArrow:
      '<button class="slick-prev" aria-label="Новые" type="button"></button>',
    nextArrow:
      '<button class="slick-next" aria-label="Старые" type="button"></button>'
  };

  var initSlider = function() {
    $(slider).slick(sliderOptions);
  };

  var destroySlider = function() {
    $(slider).slick('unslick');
  };

  var moveFeedNewsToMain = function() {
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

  return {
    slider: slider,
    initSlider: initSlider,
    destroySlider: destroySlider
  };
})();
