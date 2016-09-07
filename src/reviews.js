'use strict';

define(['./load', './review'], function(load, getReview) {


  var reviews = null;

  var elem = document.querySelector('.reviews-filter');

  var addReviews = function(data) {
    reviews = data;
    reviews.forEach(function(review) {
      getReview(review);
    });
    elem.classList.add('invisible');
  };

  window.onload = function() {
    elem.classList.remove('invisible');
  };

  load('http://localhost:1506/api/reviews', 'jsonCallback', addReviews);

});
