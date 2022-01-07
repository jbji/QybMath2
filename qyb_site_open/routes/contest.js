var express = require('express');
var router = express.Router();
var auth = require('./controllers/auth_controller.js');

router.get('/', auth.auth, auth.contestBlock);
router.get('/', function(req, res, next) {
    // res.render('contest', { contestToggle : 'rank',title: '当前比赛' });
    res.redirect('/contest/rank');
});

router.get('/home', auth.auth, auth.contestBlock);
router.get('/home', function(req, res, next) {
    res.render('contest', { contestToggle : 'home', title: '当前比赛 - 我的参赛' });
});

router.get('/rank/', auth.auth, auth.contestBlock);
router.get('/rank/', function(req, res, next) {
    res.render('contest', { contestToggle : 'rank',title: '当前比赛 - 排行榜' });
});

router.get('/problemSet', auth.auth, auth.contestBlock);
router.get('/problemSet', function(req, res, next) {
    res.render('contest', { contestToggle : 'problemSet',title: '当前比赛 - 试题册' });
});

module.exports = router;
