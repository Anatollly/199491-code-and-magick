'use strict';

define(function() {

  var Gallery = function(data) {
    this.pictures = data;
    this.overlayGallery = document.querySelector('.overlay-gallery');
    this.galleryClose = this.overlayGallery.querySelector('.overlay-gallery-close');
    this.controlLeft = this.overlayGallery.querySelector('.overlay-gallery-control-left');
    this.controlRight = this.overlayGallery.querySelector('.overlay-gallery-control-right');
    this.galleryPreview = this.overlayGallery.querySelector('.overlay-gallery-preview');
    this.previewNumberCurrent = this.overlayGallery.querySelector('.preview-number-current');
    this.previewNumberTotal = this.overlayGallery.querySelector('.preview-number-total');
    this.activePicture = 0;
    this.previewNumberTotal.textContent = this.pictures.length;
    this.hide = this.hide.bind(this);
    this.prev = this.prev.bind(this);
    this.next = this.next.bind(this);
  };

  Gallery.prototype.show = function(index) {

    this.galleryClose.addEventListener('click', this.hide);
    this.controlLeft.addEventListener('click', this.prev);
    this.controlRight.addEventListener('click', this.next);

    this.setActivePicture(index);

    this.overlayGallery.classList.remove('invisible');
  };

  Gallery.prototype.hide = function() {
    this.galleryClose.removeEventListener('click', this.hide);
    this.controlLeft.removeEventListener('click', this.prev);
    this.controlRight.removeEventListener('click', this.next);
    this.overlayGallery.classList.add('invisible');
  };

  Gallery.prototype.prev = function() {
    if(this.activePicture !== 0) {
      this.setActivePicture(this.activePicture - 1);
    }
  };

  Gallery.prototype.next = function() {
    if(this.activePicture !== this.pictures.length - 1) {
      this.setActivePicture(this.activePicture + 1);
    }
  };

  Gallery.prototype.setActivePicture = function(index) {
    var oldImg = this.galleryPreview.querySelector('img');
    this.activePicture = index;
    var imgSrc = this.pictures[index];
    var newImg = new Image();
    newImg.src = imgSrc;
    if (oldImg) {
      this.galleryPreview.replaceChild(newImg, oldImg);
    }else {
      this.galleryPreview.appendChild(newImg);
    }

    this.previewNumberCurrent.textContent = this.activePicture + 1;

  };

  return Gallery;
});
