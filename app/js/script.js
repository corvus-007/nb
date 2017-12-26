document.addEventListener('DOMContentLoaded', function() {
  svg4everybody();

  $('.date-range__input').flatpickr({
    locale: 'ru'
  });

  function changeStateStickyBanners() {
    if (window.matchMedia('(min-width: 1278px)').matches) {
      $('.sticky-banners').stick_in_parent({
        parent: '.js-parent-sticky-sidebar-banners',
        offset_top: 56
      });
    }
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
            case 'category': {
            }
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
                .find('ul')
                .append($result['html']);
              break;
            }
            case 'page': {
            }
            case 'news': {
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
    // if ($(this).parent().parent().parent().height() == 50) {
    //     $(this).css('resize', 'vertical');
    //     $(this).parent().parent().parent().animate({
    //         height: '138px'
    //     }, 'fast', function() {
    //         $(this).css('height', 'auto');
    //     });
    //     $(this).parent().parent().prev().animate({
    //         height: '30px',
    //         'margin-bottom': '12px'
    //     }, 'fast', function() {
    //         $(this).css('height', 'auto');
    //     });
    // }
    if ($('.news-comments-form .news-comments-user').is(':hidden')) {
      $('.news-comments-form .news-comments-user').slideDown();
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

  $('.archive-year select').change(function() {
    var $year = $(this).val();

    if ($('.archive-rubric select').val() == 'all')
      window.location.href = '/' + $year + '/';
    else
      window.location.href =
        '/' + $year + '/archivecat/' + $('.archive-rubric select').val();
  });

  $('.archive-rubric select').change(function() {
    var $rubric = $(this).val();

    if ($rubric == 'all')
      window.location.href = '/' + $('.archive-year select').val() + '/';
    else
      window.location.href =
        '/' + $('.archive-year select').val() + '/archivecat/' + $rubric;
  });

  $('.day-rubric select').change(function() {
    var $rubric = $(this).val();

    if ($rubric != 'all') {
      $('.day-content-block').each(function() {
        if ($(this).hasClass($rubric))
          $(this).slideDown(400, function() {
            $(this)
              .addClass('_show')
              .removeAttr('style');
          });
        if (!$(this).hasClass($rubric))
          $(this).slideUp(400, function() {
            $(this)
              .removeClass('_show')
              .removeAttr('style');
          });
      });
    } else {
      $('.day-content-block').each(function() {
        $(this).slideDown(400, function() {
          $(this)
            .addClass('_show')
            .removeAttr('style');
        });
      });
    }
    if ($('.day-content').data('isArchive') == '1') {
      $uri = $('.day-content').data('day');
      if ($rubric != 'all') $uri += 'dailycat/' + $rubric + '/';

      history.pushState(null, null, $uri);

      $('#mainmenu .menu li').removeClass('_active');
      $('#mainmenu .menu li[data-category="' + $rubric + '"]').addClass(
        '_active'
      );
    }
  });

  if ($('.day-rubric select option:selected').val() != 'all')
    $('.day-rubric select').change();

  // $('.post-content p > img').each(function() {
  //     $(this).removeAttr('style');
  /*        $(this).after('<span class="_sign">'+(($(this).attr('title'))?$(this).attr('title').replace(new RegExp('/&amp;/g'),'&').replace(new RegExp('/&lt;/g'),'<').replace(new RegExp('/&gt;/g'),'>').replace(new RegExp('/&quot;/g'),'"'):'&nbsp')+'</span>');
        $(this).removeAttr('title');
        $(this).parent().addClass('pimage');
        if ($(this).hasClass('l') || $(this).hasClass('r')) {
            $(this).parent().addClass(($(this).hasClass('r'))?'r':'l');
            $(this).removeClass('l').removeClass('r');
        }*/
  // });
});
