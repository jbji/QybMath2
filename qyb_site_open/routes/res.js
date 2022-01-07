var express = require('express');
var router = express.Router();
var auth = require('./controllers/auth_controller.js');
var multiparty = require('multiparty');

var resProblem = require('./controllers/res_problem_controller.js');
var resUser = require('./controllers/res_user_controller.js');
var resContest = require('./controllers/res_contest_controller.js');


//资源上传，上传题目文件或题目图片，AJAX方式可以获得路径
router.post('/problems/uploadImg',auth.auth, auth.authBlock, function(req, res) {
    if(res.locals.myUID === 0){
        return;
    }
    var form = new multiparty.Form({uploadDir: './public/files/problems/images'});
    //上传完成后处理
    form.parse(req, function(err, fields, files) {
        if(!err){
            return res.send(files.problemImg[0].path.substr(6));
        }
        return res.send('上传失败');
        // return res.redirect('/');
    });
});
router.post('/problems/uploadDoc',auth.auth, auth.authBlock, function(req, res) {
    if(res.locals.myUID === 0){
        return;
    }
    var form = new multiparty.Form({uploadDir: './public/files/problems/docs'});
    //上传完成后处理
    form.parse(req, function(err, fields, files) {
        if(!err){
            return res.send(files.problemDoc[0].path.substr(6));
        }
        return res.send('上传失败');
        // return res.redirect('/');
    });
});
// 题目增删改查
router.post('/problems/submit',auth.auth, auth.authBlock, resProblem.submit);
router.get('/problems/getAll', auth.auth, auth.authBlock, auth.authAdmin, resProblem.getAllProblems);
router.get('/problems/getFull/:ProblemID', auth.auth, auth.authBlock, auth.authAdmin, resProblem.getFullProblem);
router.get('/problems/delete/:ProblemID', auth.auth, auth.authBlock, auth.authAdmin, resProblem.delete);
router.get('/problems/redodelete/:ProblemID', auth.auth, auth.authBlock, auth.authAdmin, resProblem.redodelete);
router.post('/problems/edit', auth.auth, auth.authBlock, auth.authAdmin, resProblem.edit);
// 管理员权限管理
router.get('/users/getAdmins', auth.auth, auth.authBlock, auth.authAdmin, resUser.getAdmins);
router.get('/users/grant/UID/:UID/:Role', auth.auth, auth.authBlock, auth.authAdmin, resUser.grantUID);
router.get('/users/revoke/UID/:UID', auth.auth, auth.authBlock, auth.authAdmin, resUser.revokeUID);
router.get('/users/grant/QQ/:QQ/:Role', auth.auth, auth.authBlock, auth.authAdmin, resUser.grantQQ);
router.get('/users/revoke/QQ/:QQ', auth.auth, auth.authBlock, auth.authAdmin, resUser.revokeQQ);
// 比赛增删改查
router.post('/contests/submit',auth.auth, auth.authBlock, auth.authAdmin, resContest.submit);
router.get('/contests/getAll', auth.auth, auth.authBlock, auth.authAdmin, resContest.getAllContests);
router.get('/contests/getFull/:ContestID', auth.auth, auth.authBlock, auth.authAdmin, resContest.getFullContest);
router.get('/contests/delete/:ContestID', auth.auth, auth.authBlock, auth.authAdmin, resContest.delete);
router.get('/contests/redodelete/:ContestID', auth.auth, auth.authBlock, auth.authAdmin, resContest.redodelete);
router.post('/contests/edit', auth.auth, auth.authBlock, auth.authAdmin, resContest.edit);
//可用比赛设置为当前比赛的逻辑
router.get('/contests/getAvailable', auth.auth, auth.authBlock, auth.authAdmin, resContest.getAvailable);
router.get('/contests/setGlobalCurrent/:ContestID', auth.auth, auth.authBlock, auth.authAdmin, resContest.setGlobalCurrent);
router.post('/contests/setMyCurrent', auth.auth, auth.authBlock, auth.authAdmin, resContest.setMyCurrent);
//比赛信息的设置
router.post('/contests/editDetails', auth.auth, auth.authBlock, auth.authAdmin, resContest.editDetails);

module.exports = router;