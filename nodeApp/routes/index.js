var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  res.locals.welcome = 'Bienvenido a  NodePop'
  res.render('index', { title: 'NodePop' });
});

module.exports = router;
