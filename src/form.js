'use strict';

window.form = (function() {
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
  //nameField.addEventListener('input', validateForm);
  text.oninput = function() {
    validateForm();
  };
  //feedbackField.addEventListener('input', validateForm);

  for (var i = 0; i < rating.length; i++) {
    rating[i].onclick = function() {
      validateForm();
    };
  }

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
})();
