document.addEventListener('DOMContentLoaded', function() {
  svg4everybody();

  $('.date-range__input').flatpickr({
    locale: 'ru'
  });

  $('.sticky-banners').stick_in_parent({
    parent: '.js-parent-sticky-sidebar-banners',
    offset_top: 56
  });

  $(document.body).trigger('sticky_kit:recalc');

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

            $('.sticky-banners').stick_in_parent({
              parent: '.js-parent-sticky-sidebar-banners',
              offset_top: 56
            });
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
    console.log(obj.data());
    var count = obj.data('count');
    var type = obj.data('type');
    var search = obj.data('searchString');
    var tag_id = obj.data('tagId');
    var tag_type = $('input#contentType').val();
    var rubric_id = obj.data('rubricId');
    var news_id = obj.data('newsId');
    var offset = obj.data('offset');
    var last_date = obj.data('lastDate');
    var url =
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
      last_date;
    if (type == 'search') {
      var search_type = obj.attr('data-search_type');
      var search_date = obj.attr('date-search_date');
      var search_datestart = obj.attr('date-search_datestart');
      var search_dateend = obj.attr('date-search_dateend');
      url =
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
        last_date +
        '&v[search_type]=' +
        search_type +
        '&v[search_date]=' +
        search_date +
        '&v[search_datestart]=' +
        search_datestart +
        '&v[search_dateend]=' +
        search_dateend;
    }
    $.ajax({
      url: url,
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
              // obj.before($result['html']);
              obj
                .parent()
                .find('.search-output__list')
                .append($result['html']);
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

  $('.form-control[name=date]').change(function() {
    var today = new Date();
    switch ($(this).val()) {
      case '1': {
        $('[name=dateStart]').val('');
        $('[name=dateEnd]').val('');
        break;
      }
      case '2': {
        var lastWeek = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() - 7
        );
        $('[name=dateStart]').val(
          lastWeek.getFullYear() +
            '-' +
            lastWeek.getMonth() +
            '-' +
            lastWeek.getDate()
        );
        $('[name=dateEnd]').val(
          today.getFullYear() + '-' + today.getMonth() + '-' + today.getDate()
        );
        break;
      }
      case '3': {
        var lastMonth = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() - 30
        );
        $('[name=dateStart]').val(
          lastMonth.getFullYear() +
            '-' +
            lastMonth.getMonth() +
            '-' +
            lastMonth.getDate()
        );
        $('[name=dateEnd]').val(
          today.getFullYear() + '-' + today.getMonth() + '-' + today.getDate()
        );
        break;
      }
      case '4': {
        var lastYear = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() - 365
        );
        $('[name=dateStart]').val(
          lastYear.getFullYear() +
            '-' +
            lastYear.getMonth() +
            '-' +
            lastYear.getDate()
        );
        $('[name=dateEnd]').val(
          today.getFullYear() + '-' + today.getMonth() + '-' + today.getDate()
        );
        break;
      }
    }
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
    // debugger;
    if (
      // $(this)
      //   .parent()
      //   .parent()
      //   .parent()
      //   .height() == 50
      $('.news-comments-form .news-comments-user').is(':hidden')
    ) {
      // $(this).css('resize', 'vertical');
      $('.news-comments-form .news-comments-user').slideDown();
      // $(this)
      //   .parent()
      //   .parent()
      //   .parent()
      //   .animate(
      //     {
      //       height: '138px'
      //     },
      //     'fast',
      //     function() {
      //       $(this).css('height', 'auto');
      //     }
      //   );
      // $(this)
      //   .parent()
      //   .parent()
      //   .prev()
      //   .animate(
      //     {
      //       height: '30px',
      //       'margin-bottom': '12px'
      //     },
      //     'fast',
      //     function() {
      //       $(this).css('height', 'auto');
      //     }
      //   );
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
        '<div class="ansverForm"><input class="form-control" placeholder="Ваше имя" type="text" value="' +
          $('[name="v[comment_name]"]').val() +
          '"><textarea class="form-control" placeholder="Текст сообщения"></textarea><button>Комментировать</button></div>'
      );
      $('.ansverForm').find('input').focus();
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
