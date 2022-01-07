var express = require('express');
var router = express.Router();
var auth = require('./controllers/auth_controller.js');

router.get('/', auth.auth);
router.get('/',function(req,res,next){
  res.render('index', { title: '全员杯竞赛' });
});

module.exports = router;
