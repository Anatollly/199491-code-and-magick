'use strict';

define(['./load', './review'], function(load, Review) {


  var elem = document.querySelector('.reviews-filter');
  var reviewsContainer = document.querySelector('.reviews-list');

  var addReviews = function(reviews) {
    reviews.forEach(function(review) {
      var rev = new Review(review);
      reviewsContainer.appendChild(rev.element);
    });
  };


  elem.classList.remove('invisible');


  load('http://localhost:1506/api/reviews', 'jsonCallback', addReviews);

});
