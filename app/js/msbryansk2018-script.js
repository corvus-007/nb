$(function () {
  'use strict';

  $.fancybox.defaults.animationEffect = 'zoom-in-out';
  $.fancybox.defaults.gutter = 0;
  $.fancybox.defaults.transitionEffect = 'zoom-in-out';
  $.fancybox.defaults.transitionDuration = 500;

  var $membersList = $('.msbryansk2018-members__list');
  var partnersSlider = document.querySelector('.landing-partners-slider');

  function cycleMemberPhotos(memberSlides) {
    var $slides = $(memberSlides).find(
      '.msbryansk2018-member-card__slides-item'
    );
    var $currentSlide = $slides.filter(
      '.msbryansk2018-member-card__slides-item--active'
    );
    var slidesCount = $slides.length;
    var currentSlideIndex = $currentSlide.index();

    function changeMemberSlide() {
      if (currentSlideIndex % slidesCount === 0) {
        currentSlideIndex = 0;
      }
      if (currentSlideIndex >= slidesCount - 1) {
        currentSlideIndex = -1;
      }

      $slides
        .removeClass('msbryansk2018-member-card__slides-item--active')
        .eq(++currentSlideIndex)
        .addClass('msbryansk2018-member-card__slides-item--active');
    }

    changeMemberSlide();
    cycleTimeEnd = setInterval(changeMemberSlide, CYCLE_DELAY);
  }

  if ($membersList.length) {
    var cycleTimeEnd;
    var CYCLE_DELAY = 2000;

    $membersList.on('mouseenter', '.msbryansk2018-member-card__slides', function (event) {
      event.preventDefault();
      console.log('навели');
      cycleMemberPhotos(this);
    });

    $membersList.on('mouseleave', '.msbryansk2018-member-card__slides', function (event) {
      event.preventDefault();
      console.log('убрали курсор');
      clearInterval(cycleTimeEnd);
    });
  }

  if (partnersSlider) {
    $(partnersSlider).slick({
      accessibility: false,
      autoplay: true,
      centerMode: true,
      arrows: false,
      mobileFirst: true,
      centerPadding: '70px',
      slidesToShow: 1,
      variableWidth: true,
      responsive: [{
          breakpoint: 767,
          settings: 'unslick'
        },
        {
          breakpoint: 567,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '70px',
            slidesToShow: 1,
            variableWidth: true
          }
        }
      ]
    });
  }
});
