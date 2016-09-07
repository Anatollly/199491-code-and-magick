'use strict';

define(function() {
  return function(urlJsonp, callbackName, callback) {
    window[callbackName] = callback;
    var scriptElement = document.createElement('script');
    scriptElement.src = urlJsonp + '?callback=' + callbackName;
    document.body.appendChild(scriptElement);
  };
});
