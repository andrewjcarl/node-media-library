var express = require('express');
var videos = require('../videos');
var router = express.Router();

router.get('/videos', function(req,res) {
  res.json(videos.getFromDirectory());
});

module.exports = router;