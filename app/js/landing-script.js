$(function() {
  $.fancybox.defaults.animationEffect = 'zoom-in-out';

  var partnersSlider = document.querySelector('.landing-partners-slider');
  var landingCoachesSlider = document.querySelector('.landing-coaches-slider');

  $('[type="tel"]').mask('+7 (999) 999-99-99', {autoclear: false});
  $.validator.addMethod(
    'customphone',
    function(value, element) {
      return (
        this.optional(element) ||
        /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(value)
      );
    },
    'Пожалуйста, введите правильный номер телефона'
  );

  $('#fintess-request-form').validate({
    submitHandler: function(form) {
      var data = $(form).serialize();
      $.ajax({
        url: '/index.php?v[mode]=specproject&v[action]=fitnes2018reg',
        async: false,
        data: data,
        method: 'POST',
        success: function(result) {
          if (result['status'] == '1') {
            $.fancybox.close(true);
            $.fancybox.open('<div class="popup"><h2 class="popup__title">Ошибка!</h2><p>Обновите страницу и попробуйте снова.</p></div>');
          } else {
            form.reset();
            $.fancybox.close(true);
            $.fancybox.open('<div class="popup"><h2 class="popup__title">Ваша анкета отправлена!</h2><p>С вами свяжутся организаторы конкурса.</p></div>');
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
      responsive: [
        {
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
      responsive: [
        {
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
});
