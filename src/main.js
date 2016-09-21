'use strict';

define(['./form', './game', './gallery', './reviews'], function(form, Game, Gallery) {

  var game = new Game(document.querySelector('.demo'));
  game.initializeLevelAndStart();
  game.setGameStatus(Game.Verdict.INTRO);

  var formOpenButton = document.querySelector('.reviews-controls-new');

  /** @param {MouseEvent} evt */
  formOpenButton.onclick = function(evt) {
    evt.preventDefault();

    form.open(function() {
      game.setGameStatus(Game.Verdict.PAUSE);
      game.setDeactivated(true);
    });
  };

  form.onClose = function() {
    game.setDeactivated(false);
  };

  var photoGallery = document.querySelectorAll('.photogallery .photogallery-image img');
  var photoLinks = document.querySelectorAll('.photogallery-image');

  var links = [];
  for (var i = 0; i < photoGallery.length; i++) {
    links[i] = photoGallery[i].src;
  }

  var gallery = new Gallery(links);

  var each = function(arr, callback) {
    for (i = 0; i < arr.length; i++) {
      callback(arr[i], i);
    }
  };

  each(photoLinks, function(photo, index) {
    photo.onclick = function() {
      gallery.show(index);
    };
  });

});
