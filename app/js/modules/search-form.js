window.searchForm = (function() {
  'use strict';

  var searchForm = document.querySelector('.search-form');
  if (searchForm) {
    var serachFormQueryLabel = searchForm.querySelector(
      '.search-form-query__label'
    );
    var searchFormRow = searchForm.querySelector('.search-form__row');
    var searchFormSubmit = searchForm.querySelector('.search-form__submit');
    var selectbox = document.querySelector('.selectbox');
    var searchFormFilterTitle = searchForm.querySelector(
      '.search-form-filter__title'
    );
    var searchFormFilterItem = searchForm.querySelector(
      '.search-form-filter__item'
    );

    if (window.matchMedia('(min-width: 840px)').matches) {
      searchFormRow.style.paddingLeft = serachFormQueryLabel.offsetWidth + 'px';
      searchFormSubmit.style.height =
        selectbox.offsetHeight * 2 +
        parseInt(
          window
            .getComputedStyle(searchFormFilterItem)
            .getPropertyValue('margin-bottom'),
          10
        ) +
        'px';
      searchFormSubmit.style.marginTop =
        searchFormFilterTitle.offsetHeight + 'px';
    }
  }
})();
