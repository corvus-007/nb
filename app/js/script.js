document.addEventListener('DOMContentLoaded', function() {
  svg4everybody();

  $('.date-range__input').flatpickr({
    locale: 'ru'
  });

  $('.sticky-banners').stick_in_parent({
    parent: '.js-parent-sticky-sidebar-banners',
    offset_top: 56
  });

  if (window.matchMedia('(max-width: 1279px)').matches) {
    $('.sticky-banners').trigger('sticky_kit:detach');
  }

  if ($('.feed-news__list').length) {
    var getLentaNews = function() {
      $.ajax({
        url: '/index.php?v[mode]=site&v[action]=reload_lenta_news',
        type: 'post',
        dataType: 'json',
        async: true,
        success: function(result) {
          if (result['status'] == 1) {
            // $('.lenta-tabs .tabs-contents .side-news-block').remove();
            $('.feed-news__list').html(result['html'][0]);
            // $('.lenta-tabs .tabs-contents .tabs-contents-tab').eq(1).append(result['html'][1]);
            $(document.body).trigger('sticky_kit:recalc');
          }
        }
      });
    };
    getLentaNews();
    $lenta = setInterval(function() {
      getLentaNews();
    }, 60000);
  }

  $('.other-news-more').click(function() {
    var obj = $(this);
    var count = obj.data('count');
    var type = obj.data('type');
    var search = obj.data('searchString');
    var tag_id = obj.data('tagId');
    var tag_type = $('input#contentType').val();
    var rubric_id = obj.data('rubricId');
    var news_id = obj.data('newsId');
    var offset = obj.data('offset');
    var last_date = obj.data('lastDate');

    $.ajax({
      url:
        '/index.php?v[mode]=site&v[action]=upload_other_news&v[count]=' +
        count +
        '&v[type]=' +
        type +
        '&v[search]=' +
        search +
        '&v[tag_id]=' +
        tag_id +
        '&v[rubric_id]=' +
        rubric_id +
        '&v[news_id]=' +
        news_id +
        '&v[offset]=' +
        offset +
        '&v[tag_type]=' +
        tag_type +
        '&v[last_date]=' +
        last_date,
      async: false,
      type: 'post',
      dataType: 'json',
      success: function($result) {
        if ($result['status'] == 1) {
          switch (type) {
            case 'polls': {
            }
            case 'search': {
            }
            case 'chapter_tag': {
            }
            case 'mainofweek': {
            }
            case 'event': {
              obj.before($result['html']);
              break;
            }
            case 'page': {
            }
            case 'news': {
            }
            case 'category': {
            }
            case 'multimedia': {
            }
            default: {
              //index
              $('.all-news__list')
                .children('.all-news__item')
                .eq(
                  $('.all-news__list').children('.all-news__item').length - 1
                )[0].outerHTML =
                $('.all-news__list')
                  .children('.all-news__item')
                  .eq(
                    $('.all-news__list').children('.all-news__item').length - 1
                  )[0].outerHTML + $result['html'];
            }
          }

          obj
            .data('offset', $result['offset'])
            .attr('data-offset', $result['offset']);
        }
        if ($result['empty']) obj.remove();
      }
    });
  });

  var add_comment = function(data) {
    $.ajax({
      url: '/index.php?v[mode]=site&v[action]=add_comment',
      async: false,
      data: {
        v: data
      },
      dataType: 'json',
      method: 'POST'
    })
      .done(function(data) {
        if (data.status == '2') {
          $('.ansverForm').remove();
          $('.news-comments-message-text textarea').val('');
          alert(
            'Комментарий добавлен! После проверки модератором он появится на сайте.'
          );
        } else {
          alert('Произошла ошибка! Обновите страницу и повторите снова!');
        }
      })
      .fail(function() {
        alert('Произошла ошибка! Обновите страницу и повторите снова!');
      });
  };

  $('.news-comments-form textarea').click(function() {
    if (
      $(this)
        .parent()
        .parent()
        .parent()
        .height() == 50
    ) {
      $(this).css('resize', 'vertical');
      $(this)
        .parent()
        .parent()
        .parent()
        .animate(
          {
            height: '138px'
          },
          'fast',
          function() {
            $(this).css('height', 'auto');
          }
        );
      $(this)
        .parent()
        .parent()
        .prev()
        .animate(
          {
            height: '30px',
            'margin-bottom': '12px'
          },
          'fast',
          function() {
            $(this).css('height', 'auto');
          }
        );
    }
  });

  $('#addComment').click(function() {
    var el = $(this).parents('.news-comments-form');
    if (
      el.find('[name="v[comment_name]"]').val() &&
      el.find('textarea').val()
    ) {
      var data = {
        name: el.find('[name="v[comment_name]"]').val(),
        text: el.find('textarea').val(),
        content_type: $('#contentType').val(),
        content_id: $('#contentId').val()
      };
      add_comment(data);
    } else {
      alert('Введите имя и текст сообщения!');
    }
  });

  $('.cAnswer .cBtn').click(function() {
    if (
      $(this)
        .parent()
        .find('.ansverForm').length > 0
    ) {
      $('.ansverForm').remove();
      return false;
    }
    $('.ansverForm').remove();
    $(this)
      .parent()
      .append(
        '<div class="ansverForm"><input placeholder="Ваше имя" type="text" value="' +
          $('[name="v[comment_name]"]').val() +
          '"><textarea placeholder="Текст сообщения"></textarea><button>Комментировать</button></div>'
      );
  });
  $('body').on('click', '.ansverForm button', function() {
    var data = {
      name: $(this)
        .parent()
        .find('input')
        .val(),
      text: $(this)
        .parent()
        .find('textarea')
        .val(),
      pid: $(this)
        .parent()
        .parent()
        .data('comment_id'),
      content_type: $('#contentType').val(),
      content_id: $('#contentId').val()
    };
    add_comment(data);
  });
});
