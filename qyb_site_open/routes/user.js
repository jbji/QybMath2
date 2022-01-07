var express = require('express');
var router = express.Router();
var auth = require('./controllers/auth_controller.js');

router.get('/info',function (req, res, next){res.redirect('/');});
router.get('/info/:UID',function (req, res, next){res.redirect('/');});
router.get('/contest',function (req, res, next){res.redirect('/');});
router.get('/contest/:UID',function (req, res, next){res.redirect('/');});
module.exports = router;