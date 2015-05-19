var express = require('express');
var glob = require('glob');
var probe = require('node-ffprobe');
var config = require('../config');
var videos = require('../videos');
var router = express.Router();

router.get('/', function(req,res,next) {
  res.render('index', {
    videos: videos.getFromDirectory()
  });
});

router.get('/stream/:id', function(req,res,next) {
  var video = videos.getHashedVideos()[req.params.id];
  res.render('stream', {
    id: req.params.id,
    video: video
  });
});

module.exports = router;