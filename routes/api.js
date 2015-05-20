var express = require('express');
var videos = require('../videos');
var router = express.Router();

router.get('/videos', function(req,res) {
  res.json(videos.getFromDirectory());
});

router.get('/video/:id', function(req,res) {
  var path = videos.getFromDirectory()[req.params.id].name;
  console.log(path);
  res.sendFile(path);
});

module.exports = router;