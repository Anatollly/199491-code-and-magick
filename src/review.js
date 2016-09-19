'use strict';

define(function() {

  var ICON_STAR_WIDTH = 40;
  var IMG_LOAD_TIMEOUT = 3000;
  var IMG_AUTHOR_HEIGHT = 124;
  var IMG_AUTHOR_WIDTH = 124;

  var templateElement = document.querySelector('template');

  var templateContainer = 'content' in templateElement ? templateElement.content : templateElement;

  var Review = function(data) {
    this.data = data;
    this.element = this.getReviewElement(this.data);
    this.answerYes = this.element.querySelector('.review-quiz-answer-yes');
    this.answerNo = this.element.querySelector('.review-quiz-answer-no');
    this.clickYes = this.clickYes.bind(this);
    this.clickNo = this.clickNo.bind(this);
    this.answerYes.addEventListener('click', this.clickYes);
    this.answerNo.addEventListener('click', this.clickNo);
  };

  Review.prototype.clickYes = function() {
    this.answerYes.classList.add('review-quiz-answer-active');
    this.answerNo.classList.remove('review-quiz-answer-active');
  };

  Review.prototype.clickNo = function() {
    this.answerYes.classList.remove('review-quiz-answer-active');
    this.answerNo.classList.add('review-quiz-answer-active');
  };

  Review.prototype.remove = function() {
    this.answerYes.onclick = null;
    this.answerNo.onclick = null;
  };

  Review.prototype.getReviewElement = function(review) {
    var reviewElement = templateContainer.querySelector('.review').cloneNode(true);
    reviewElement.querySelector('.review-rating').style.width = (ICON_STAR_WIDTH * review.rating) + 'px';
    reviewElement.querySelector('.review-text').textContent = review.description;
    var reviewImage = reviewElement.querySelector('.review-author');

    var img = new Image(IMG_AUTHOR_HEIGHT, IMG_AUTHOR_WIDTH);

    img.onload = function() {
      reviewImage.src = review.author.picture;
      reviewImage.title = reviewImage.alt = review.author.name;
      clearTimeout(imgLoadTimeout);
    };

    img.onerror = function() {
      reviewElement.classList.add('review-load-failure');
    };

    img.src = review.author.picture;

    var imgLoadTimeout = setTimeout(function() {
      img.src = '';
      reviewElement.classList.add('review-load-failure');
    }, IMG_LOAD_TIMEOUT);

    return reviewElement;
  };

  return Review;

});
