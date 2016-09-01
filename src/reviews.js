'use strict';

var reviews = null;

var doJsonp = function(urlJsonp, callbackName, callback) {
  window[callbackName] = callback;
  var scriptElement = document.createElement('script');
  scriptElement.src = urlJsonp + '?callback=' + callbackName;
  document.body.appendChild(scriptElement);
};

var elem = document.querySelector('.reviews-filter');

//эта функция отрисовывает отзывы на странице

var addReviews = function(data) {
  reviews = data;
  reviews.forEach(function(review) {
    getReviewElement(review, reviewsContainer);
  });
  elem.classList.add('invisible');
};

window.onload = function() {
  elem.classList.remove('invisible');
};

var ICON_STAR_WIDTH = 40;
var IMG_LOAD_TIMEOUT = 3000;
var IMG_AUTHOR_HEIGHT = 124;
var IMG_AUTHOR_WIDTH = 124;

var reviewsContainer = document.querySelector('.reviews-list');
var templateElement = document.querySelector('template');

var templateContainer = 'content' in templateElement ? templateElement.content : templateElement;

//эта функция создает дом-элемент и возвращает его

var getReviewElement = function(review, container) {
  var reviewElement = templateContainer.querySelector('.review').cloneNode(true);
  container.appendChild(reviewElement);
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

doJsonp('http://localhost:1506/api/reviews', 'jsonCallback', addReviews);
