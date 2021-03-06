$(function () {
  $.fancybox.defaults.animationEffect = 'zoom-in-out';

  var partnersSlider = document.querySelector('.landing-partners-slider');
  var landingCoachesSlider = document.querySelector('.landing-coaches-slider');
  var landingMembersSlider = document.querySelector('.landing-members-slider');
  var landingTrainingSlider = document.querySelector('.js-landing-training-slider');
  var memberProfileSlider = document.querySelector('.js-member-profile-slider');
  var currentSlide;
  var slidesCount;

  var updateSliderCounter = function (slick, sliderCounter, currentIndex) {
    currentSlide = slick.slickCurrentSlide() + 1;
    slidesCount = slick.slideCount;
    $(sliderCounter).text(currentSlide + '/' + slidesCount)
  };

  $('[type="tel"]').mask('+7 (999) 999-99-99', {
    autoclear: false
  });

  $.validator.addMethod(
    'customphone',
    function (value, element) {
      return (
        this.optional(element) ||
        /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(value)
      );
    },
    'Пожалуйста, введите правильный номер телефона'
  );

  $('#fitness-request-form').validate({
    submitHandler: function (form) {
      var data = $(form).serialize();
      $.ajax({
        url: '/index.php?v[mode]=specproject&v[action]=fitnes2018reg',
        async: false,
        data: data,
        method: 'POST',
        success: function (result) {
          if (result['status'] == '1') {
            $.fancybox.close(true);
            $.fancybox.open(
              '<div class="popup"><h2 class="popup__title">Ошибка!</h2><p>Обновите страницу и попробуйте снова.</p></div>'
            );
          } else {
            form.reset();
            $.fancybox.close(true);
            $.fancybox.open(
              '<div class="popup"><h2 class="popup__title">Ваша анкета отправлена!</h2><p>С вами свяжутся организаторы конкурса.</p></div>'
            );
          }
        }
      });
    },
    rules: {
      name: {
        required: true
      },
      email: {
        required: true,
        email: true
      },
      phone: {
        customphone: true
      }
    }
  });

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

  if (landingCoachesSlider) {
    $(landingCoachesSlider).slick({
      accessibility: false,
      centerMode: true,
      mobileFirst: true,
      slidesToShow: 1,
      responsive: [{
          breakpoint: 1023,
          settings: 'unslick'
        },
        {
          breakpoint: 567,
          settings: {
            centerMode: true,
            slidesToShow: 1,
            variableWidth: true
          }
        }
      ]
    });
  }

  if (landingMembersSlider) {
    $(landingMembersSlider).slick({
      accessibility: false,
      centerMode: true,
      mobileFirst: true,
      slidesToShow: 1,
      responsive: [{
          breakpoint: 1023,
          settings: 'unslick'
        },
        {
          breakpoint: 567,
          settings: {
            centerMode: true,
            slidesToShow: 1,
            variableWidth: true
          }
        }
      ]
    });
  }

  if (landingTrainingSlider) {
    var sliderCounterTraining = document.createElement('div');
    sliderCounterTraining.classList.add('landing-training-slider__counter');

    $(landingTrainingSlider).on('init', function (event, slick) {
      $(landingTrainingSlider).append(sliderCounterTraining);
      updateSliderCounter(slick, sliderCounterTraining);
    });

    $(landingTrainingSlider).on('afterChange', function (event, slick, currentSlide) {
      updateSliderCounter(slick, sliderCounterTraining, currentSlide);
    });

    $(landingTrainingSlider).slick({
      accessibility: false,
      autoplay: true,
      centerMode: true,
      slidesToShow: 3,
      centerPadding: 0,
      variableWidth: true,
      speed: 900,
      appendArrows: '.landing-training-slider__arrows-holder',
      responsive: [{
          breakpoint: 768,
          settings: {
            arrows: false,
            slidesToShow: 1,
            centerMode: false,
            variableWidth: false
          }
        },
        {
          breakpoint: 500,
          settings: {
            arrows: false,
            slidesToShow: 1,
            variableWidth: false,
            centerMode: false
          }
        }
      ]
    });
  }

  var memberProfileIntroSlider = document.querySelector(
    '.js-member-profile-intro-slider'
  );

  if (memberProfileIntroSlider) {
    $(memberProfileIntroSlider).slick({
      accessibility: false,
      dots: true,
      arrows: false,
      autoplay: true,
      fade: true,
      speed: 1000,
      cssEase: 'linear'
    });
  }

  if (memberProfileSlider) {
    var sliderCounterProfileTraining = document.createElement('div');
    sliderCounterProfileTraining.classList.add('member-profile-slider__counter');

    $(memberProfileSlider).on('init', function (event, slick) {
      $(memberProfileSlider).append(sliderCounterProfileTraining);
      updateSliderCounter(slick, sliderCounterProfileTraining);
    });

    $(memberProfileSlider).on('afterChange', function (event, slick, currentSlide) {
      updateSliderCounter(slick, sliderCounterProfileTraining, currentSlide);
    });

    $(memberProfileSlider).slick({
      accessibility: false,
      centerMode: true,
      slidesToShow: 3,
      centerPadding: 0,
      variableWidth: true,
      speed: 900,
      appendArrows: '.member-profile-slider__arrows-holder',
      responsive: [{
          breakpoint: 768,
          settings: {
            arrows: false,
            slidesToShow: 1,
            centerMode: false,
            variableWidth: false
          }
        },
        {
          breakpoint: 500,
          settings: {
            arrows: false,
            slidesToShow: 1,
            variableWidth: false,
            centerMode: false
          }
        }
      ]
    });
  }
});
