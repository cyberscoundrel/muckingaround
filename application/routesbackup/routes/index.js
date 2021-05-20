var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("hey");
  //res.render('layouts/home', {body:'partials/login'});
  res.render('partials/home', {script: 'home.js'});
  console.log("here");
});

module.exports = router;
