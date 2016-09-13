'use strict';

define(['browser-cookies'], function(browserCookies) {
  var formContainer = document.querySelector('.overlay-container');
  var formCloseButton = document.querySelector('.review-form-close');

  var reviewForm = document.querySelector('.review-form');
  var rating = reviewForm.elements['review-mark'];
  var name = reviewForm.elements['review-name'];
  var text = reviewForm.elements['review-text'];
  var button = document.querySelector('.review-submit');
  var fieldLinks = document.querySelector('.review-fields');
  var linkName = document.querySelector('.review-fields-name');
  var linkText = document.querySelector('.review-fields-text');

  var markCookie = browserCookies.get('review-mark');
  var nameCookie = browserCookies.get('review-name');

  rating.value = markCookie;
  name.value = nameCookie;

  var LOW_RATING = 3;

  name.required = true;

  function validateForm() {
    text.required = rating.value < LOW_RATING;

    var validName = name.value;
    var validText = !text.required || text.value;

    if (validName) {
      linkName.classList.add('invisible');
    }else {
      linkName.classList.remove('invisible');
    }

    if (validText) {
      linkText.classList.add('invisible');
    }else {
      linkText.classList.remove('invisible');
    }

    if (validText && validName) {
      fieldLinks.classList.add('invisible');
    }else {
      fieldLinks.classList.remove('invisible');
    }

    button.disabled = !(validText && validName);
  }

  validateForm();

  name.oninput = function() {
    validateForm();
  };

  text.oninput = function() {
    validateForm();
  };


  for (var i = 0; i < rating.length; i++) {
    rating[i].onclick = function() {
      validateForm();
    };
  }

  //cookies

  var BIRTHDAY_HOPPER = new Date(1906, 11, 9);

  var getExpiresDate = function(birthday) {

    var nowDate = new Date();
    nowDate.setHours(0, 0, 0, 0);
    var year = nowDate.getFullYear();
    var birthThisYear = birthday.setFullYear(year);
    var birthLastYear = birthday.setFullYear(year - 1);
    var timeThisYear = (nowDate - birthThisYear);
    var timeLastYear = (nowDate - birthLastYear);

    if (nowDate > birthThisYear) {
      var time = timeThisYear;
    }else {
      time = timeLastYear;
    }

    var cookieTimeMsec = Date.now() + time;
    var cookieDate = new Date(cookieTimeMsec);

    return cookieDate;
  };

  reviewForm.onsubmit = function() {
    browserCookies.set('review-mark', rating.value, {expires: getExpiresDate(BIRTHDAY_HOPPER)});
    browserCookies.set('review-name', name.value, {expires: getExpiresDate(BIRTHDAY_HOPPER)});
  };



  var form = {
    onClose: null,

    /**
     * @param {Function} cb
     */
    open: function(cb) {
      formContainer.classList.remove('invisible');
      cb();
    },

    close: function() {
      formContainer.classList.add('invisible');

      if (typeof this.onClose === 'function') {
        this.onClose();
      }
    }
  };


  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    form.close();
  };

  return form;
});
