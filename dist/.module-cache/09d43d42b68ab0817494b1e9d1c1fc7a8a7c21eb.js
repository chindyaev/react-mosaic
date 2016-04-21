'use strict';

var inherit = require('../../lib/js/inherit'),
	ImageProvider = require('./ImageProvider'),
	_500pxConstants = require('../constants/_500pxConstants'),

	photos = [],
	pageSize = 20,
	imageSize = 4,
	page = 1,
	index = 0,
	isLoaded = false;


function _500pxImageProvider () {
  _500px.init({
    sdk_key: _500pxConstants.JAVASCRIPT_SDK_KEY
  });	

  loadPhotos(1);
};

inherit(_500pxImageProvider,ImageProvider);

function loadPhotos(page, category, callback){
	_500px.api('/photos', { 
		feature: 'Popular',
		only: category,
		rpp: pageSize,
		image_size: imageSize,
		page: page 
	}, function (response) {
		//_500pxImageProvider.uber.stopLoading();
		isLoaded = true;
		photos = response.data.photos;
    	if (typeof callback === 'function') callback.call(null,photos);
	});
}

function chargeFirstPhoto(photos){
	image.src = photos[index].image_url;
	image.width = photos[index].width;
	image.height = photos[index].height;		
	_500pxImageProvider.uber.chargeImage(image);
	index = 1;
}

_500pxImageProvider.prototype.getDefaultImage = function(){
	return {};
};

_500pxImageProvider.prototype.selectCategory = function(category){
	loadPhotos(1,category,chargeFirstPhoto);
};

_500pxImageProvider.prototype.next = function(){
	var image = {};

	if (index >= pageSize) 
	{
		index = 0;
		page++;
		loadPhotos(page,chargeFirstPhoto);
	} else 
	{
		image.src = photos[index].image_url;
		image.width = photos[index].width;
		image.height = photos[index].height;
		this.chargeImage(image);	
		index++;
	}	
}

module.exports = new _500pxImageProvider;


