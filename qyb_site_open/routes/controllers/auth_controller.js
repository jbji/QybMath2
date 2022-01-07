
var resContest = require('./res_contest_controller.js');

//判断登录状态和根据登录状态切换页面模板

//layout:'layouts/layout-admin.ejs'
//2
module.exports.authBlock = function (req, res, next){
    if(res.locals.myUID === 0){
        return;
    }
    next();
}
//1
module.exports.auth = function(req, res, next) {
    var user = req.session.user;
    res.locals.isLogined = false;
    res.locals.myUID = 0;
    res.locals.myName = '';
    res.locals.myRole = 0;
    if(user){
        res.locals.layout = 'layout-logined.ejs';
        res.locals.myUID = user.UID;
        res.locals.myName = user.Nickname;
        res.locals.myRole = user.Role;
        res.locals.isLogined = true;
    }
    resContest.GetCurrent(req, res, next);
};
//3 同时设置DashBoard的导航样式。
module.exports.authAdmin = function(req, res, next){
    if(res.locals.myRole === 0){
        // next(createError(404));
        res.redirect('/');
    }else{
        res.locals.layout = 'dashboard/layout.ejs';
        next();
    }
}

module.exports.contestBlock = function (req, res, next){
    if(!res.locals.globalContest || res.locals.globalContest.ContestID === 0 || !res.locals.globalContest.ContestID){
        return res.redirect('/');
    }
    next();
}