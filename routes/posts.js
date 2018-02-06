const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Post = require('../models/post')

/* GET posts listing */
router.get('/', function(req, res, next) {
   Post.find({}, function(err, posts) {
    res.json(posts);  
  });
});

module.exports = router;