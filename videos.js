var express = require('express');
var glob = require('glob');
var config = require('./config');

var dir = config.MEDIA_DIRECTORY + '/**/*.+(' + config.MEDIA_FILE_TYPES.join('|') + ')';

var data = [];
var hashData = {};

glob(dir, {}, function(err,files) {
  for(var i = 0; i < files.length; i++) {
  	var video = {name:files[i], id:i};
  	data.push(video);
  	hashData[i] = video;
  }
});

exports.getFromDirectory = function() {
	return data;
}

exports.getHashedVideos = function() {
	return hashData;
}