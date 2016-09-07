'use strict';

define(function() {

  var ICON_STAR_WIDTH = 40;
  var IMG_LOAD_TIMEOUT = 3000;
  var IMG_AUTHOR_HEIGHT = 124;
  var IMG_AUTHOR_WIDTH = 124;

  var templateElement = document.querySelector('template');

  var templateContainer = 'content' in templateElement ? templateElement.content : templateElement;

  var getReviewElement = function(review) {
    var reviewElement = templateContainer.querySelector('.review').cloneNode(true);
    var reviewsContainer = document.querySelector('.reviews-list');
    reviewsContainer.appendChild(reviewElement);
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

  return getReviewElement;

});
