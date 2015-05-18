var express = require('express');
var glob = require('glob');
var probe = require('node-ffprobe');
var config = require('../config');
var router = express.Router();

/*probe('C:/Users/acarl/Dropbox/Videos/VIDEO0013_01.mp4', function(err,data) {
  console.log(err);
  console.log(data);
});*/

var _videos = [];

glob(config.MEDIA_DIRECTORY + '/*.mp4', {}, function(err,files) {
    _videos = files.map(function(file) {
      return {name:file};
    });
});

console.log(_videos);

router.get('/', function(req,res,next) {
  res.render('index', {
    videos: _videos
  });
});

router.get('/stream', function(req,res,next) {
  res.render('stream', {
    id: req.params.id
  });
});


module.exports = router;