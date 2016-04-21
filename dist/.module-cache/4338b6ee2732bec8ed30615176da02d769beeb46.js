'use strict';

var inherit = require('../../lib/js/inherit'),
	ImageProvider = require('./ImageProvider'),
	images = [
		{
			src: 'img/covers/landscale.jpg',
			width: 1600,
			height: 900
		},
		{
			src: 'img/covers/portrait.jpg',
			width: 674,
			height: 960
		}
	];


function LocalImageProvider () {
	this.index = 0;
};

inherit(LocalImageProvider,ImageProvider);

LocalImageProvider.getDefaultImage = function(){
	return images[this.index];
};

LocalImageProvider.start = function(){
	var image = (images[this.index + 1] !== undefined) ? images[this.index + 1] : images[0];
	this.setImage(image);
}


module.exports = new LocalImageProvider;