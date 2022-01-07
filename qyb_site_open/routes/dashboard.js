var express = require('express');
var router = express.Router();
var auth = require('./controllers/auth_controller.js');
var dash = require('./controllers/dashboard_controller.js');

//管理员页面
router.get('/', auth.auth, auth.authAdmin, dash.dashindex);
//考试开始前
router.get('/contests',auth.auth, auth.authAdmin,dash.contests);
router.get('/contests/add',auth.auth, auth.authAdmin, dash.contestsAdd);
router.get('/contests/setDetails',auth.auth, auth.authAdmin, dash.setDetails);
router.get('/contests/setDetails/:ContestID',auth.auth, auth.authAdmin, dash.setDetailsCore);

router.get('/problems',auth.auth, auth.authAdmin, dash.problems);
router.get('/problems/add',auth.auth, auth.authAdmin, dash.problemsAdd);
router.get('/problems/settings',auth.auth, auth.authAdmin, dash.problemsSettings);
router.get('/preview',auth.auth, auth.authAdmin, dash.preview);
router.get('/preview/:ContestID',auth.auth, auth.authAdmin, dash.previewCore);

//管理员功能
router.get('/users/resetpw',auth.auth, auth.authAdmin, dash.resetpw);
router.get('/users/permission',auth.auth, auth.authAdmin, dash.permission);

module.exports = router;