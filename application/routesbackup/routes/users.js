var express = require('express');
var router = express.Router();
var db = require('../config/database');

/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
  res.render('partials/login');
});

module.exports = router;
