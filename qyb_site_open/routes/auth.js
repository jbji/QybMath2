var express = require('express');
var router = express.Router();

var loginCtrl = require('./controllers/login_controller.js');
var regCtrl = require('./controllers/register_controller.js');
var pwCtrl = require('./controllers/password_controller.js');
var authCtrl = require('./controllers/auth_controller.js');

//注册和登录
router.get('/login', function(req, res, next) {
    res.render('user/login', { layout: false });
});

router.post('/login', loginCtrl.login);
router.get('/logout',loginCtrl.logout);


router.get('/register', function(req, res, next) {
    res.render('user/register', { layout: false });
});

router.post('/register',regCtrl.register);

//重置密码
router.get('/resetpw/change/token/:ResetToken',pwCtrl.show);
router.post('/resetpw/submit',pwCtrl.changePw);
router.post('/resetpw/request/qq', authCtrl.auth, authCtrl.authAdmin, pwCtrl.requestByQQ);
router.post('/resetpw/request/uid',authCtrl.auth, authCtrl.authAdmin, pwCtrl.requestByUID);



module.exports = router;