'use strict';

define(['./load', './review'], function(load, Review) {

  var PAGE_SIZE = 3;
  var pageNumber = 0;
  var activeFilter = 'reviews-all';

  var reviewsFilter = document.querySelector('.reviews-filter');
  var reviewsContainer = document.querySelector('.reviews-list');
  var reviewsMore = document.querySelector('.reviews-controls-more');
  reviewsMore.classList.remove('invisible');

  var addReviews = function(reviews) {
    reviews.forEach(function(review) {
      var rev = new Review(review);
      reviewsContainer.appendChild(rev.element);
    });
  };

  var loadReviews = function(currentPageNumber, filter) {
    load('http://localhost:1506/api/reviews', {
      from: currentPageNumber * PAGE_SIZE,
      to: PAGE_SIZE + currentPageNumber * PAGE_SIZE,
      filter: filter
    }, addReviews);
  };

  loadReviews(pageNumber, activeFilter);

  var changeFilters = function(filterID) {
    reviewsContainer.innerHTML = '';
    activeFilter = filterID;
    pageNumber = 0;
    loadReviews(pageNumber, filterID);
  };

  reviewsMore.addEventListener('click', function() {
    pageNumber++;
    loadReviews(pageNumber, activeFilter);
  });

  reviewsFilter.addEventListener('change', function(evt) {
    changeFilters(evt.target.id);
  });
});
