'use strict';

var reviews = null;

window.__jsonCallback = function(data) {
  reviews = data;
  console.log(reviews);
};

var funcCallback = window.__jsonCallback;

var doJsonp = function(urlJsonp, callback) {
  window.callback = callback;
  var scriptElement = document.createElement('script');
  scriptElement.src = urlJsonp;
  document.body.appendChild(scriptElement);
};

doJsonp('http://localhost:1506/api/reviews?callback=__jsonCallback', funcCallback);
