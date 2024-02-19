var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send({
    message: 'api works'
  });
});


module.exports = router