var db = require('../../models/db.js');

//快速比赛
module.exports.dashindex = function(req, res, next) {
    res.locals.dashboardMain = 'general.ejs';
    res.render('dashboard', { title: '快速开始 - 全员杯竞赛控制台' });
};
//比赛开始前、比赛管理
module.exports.contests = function (req, res,next){
    res.locals.dashboardMain = 'before/contestSummary.ejs';
    res.render('dashboard', { title: '比赛管理 - 全员杯竞赛控制台' });
};
module.exports.contestsAdd = function (req, res,next){
    res.locals.dashboardMain = 'before/contestAdd.ejs';
    res.render('dashboard', { title: '添加比赛 - 全员杯竞赛控制台' });
};
module.exports.setDetails = function(req, res, next){
    res.locals.ContestID = '';
    res.locals.ShortName = '';
    res.locals.RuleObject = '';
    res.locals.dashboardMain = 'before/contestDetails.ejs';
    res.render('dashboard', { title: '设置比赛详情 - 全员杯竞赛控制台' });
}
module.exports.setDetailsCore = function(req, res, next){
    res.locals.ContestID = '';
    res.locals.ShortName = '';
    res.locals.RuleObject = '';
    var sql = `SELECT * FROM Contest left join \`Contest Rule\` on Contest.ContestID WHERE Contest.ContestID = ${req.params.ContestID}`;
    db.query(sql, function(error, results){
        if(!error){
            if(results.length !== 0){
                res.locals.ContestID = req.params.ContestID;
                res.locals.ShortName = results[0]['ShortName'];
                res.locals.RuleObject = results[0]['RuleObject'];
            }
        }
        res.locals.dashboardMain = 'before/contestDetails.ejs';
        return res.render('dashboard', { title: '设置比赛详情 - 全员杯竞赛控制台' });
    });
}

//比赛开始前、题目管理
module.exports.problems = function (req, res,next){
    res.locals.dashboardMain = 'before/problemSummary.ejs';
    res.render('dashboard', { title: '题目管理 - 全员杯竞赛控制台' });
};
module.exports.problemsAdd = function (req, res,next){
    res.locals.dashboardMain = 'before/problemAdd.ejs';
    res.render('dashboard', { title: '添加题目 - 全员杯竞赛控制台' });
};
module.exports.problemsSettings = function (req, res,next){
    res.locals.dashboardMain = 'before/problemSettings.ejs';
    res.render('dashboard', { title: '设置题目 - 全员杯竞赛控制台' });
};

//比赛开始前，预览试题册
module.exports.preview = function (req, res,next){
    res.locals.dashboardMain = 'before/preview.ejs';
    res.render('dashboard', { title: '预览试题册 - 全员杯竞赛控制台' });
};

module.exports.previewCore = function (req, res,next){
    res.locals.dashboardMain = 'before/preview.ejs';
    res.render('dashboard', { title: '预览试题册 - 全员杯竞赛控制台' });
};

//管理员功能，重置密码
module.exports.resetpw = function (req, res,next){
    res.locals.dashboardMain = 'admin/resetpw.ejs';
    res.render('dashboard', { title: '用户密码重置 - 全员杯竞赛控制台' });
};
module.exports.permission = function (req, res,next){
    res.locals.dashboardMain = 'admin/permission.ejs';
    res.render('dashboard', { title: '授予管理权限 - 全员杯竞赛控制台' });
};