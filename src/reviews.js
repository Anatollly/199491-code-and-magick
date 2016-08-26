'use strict';

var reviews = null;

var jsonCallback = function(data) {
  reviews = data;
  console.log(reviews);
};

var doJsonp = function(urlJsonp, callbackName, callback) {
  window[callbackName] = callback;
  var scriptElement = document.createElement('script');
  scriptElement.src = urlJsonp + '?callback=' + callbackName;
  document.body.appendChild(scriptElement);
};

doJsonp('http://localhost:1506/api/reviews', 'jsonCallback', jsonCallback);
