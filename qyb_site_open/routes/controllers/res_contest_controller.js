var db = require('../../models/db.js');
var algo = require('../../models/myAlgorithm.js');
var contest = require('../../models/contest.js');
var RichText = require('../../models/MyRichTextObject');

//比赛

//增
module.exports.submit = function (req, res, next){
    console.log(req.body);
    var ContestType = req.body['ContestType'];
    var ShortName = req.body['ShortName'];
    var Classification = req.body['Classification'];
    var Name = req.body['Name'];
    var ActivateTime = algo.convertTime(req.body['ActivateTime']);
    var DeactivateTime = algo.convertTime(req.body['DeactivateTime']);
    var StartTime = algo.convertTime(req.body['StartTime']);
    var EndTime = algo.convertTime(req.body['EndTime']);
    var FreezeTime = algo.convertTime(req.body['FreezeTime']);
    var UnfreezeTime = algo.convertTime(req.body['UnfreezeTime']);
    var FinalizeTime = algo.convertTime(req.body['FinalizeTime']);
    var PubliclyVisible = algo.convertSwitcher(req.body['PubliclyVisible']);
    var isDoubleCheck = algo.convertSwitcher(req.body['isDoubleCheck']);
    var ShowProblemProvider = algo.convertSwitcher(req.body['ShowProblemProvider']);
    var FullPdfPath = req.body['FullPdfPath'];
    var FullPdfAnsPath = req.body['FullPdfAnsPath'];
    var sql = `INSERT INTO Contest(ContestType, ShortName, Classification, Name, ActivateTime, DeactivateTime,`+
        `StartTime, EndTime, FinalizeTime, PubliclyVisible, isDoubleCheck, ShowProblemProvider, FullPdfPath, FullPdfAnsPath, FreezeTime, UnfreezeTime) VALUES`+
        `(${ContestType}, "${ShortName}", "${Classification}", "${Name}", "${ActivateTime}", "${DeactivateTime}", "${StartTime}", "${EndTime}", `+
        `"${FinalizeTime}", ${PubliclyVisible}, ${isDoubleCheck}, ${ShowProblemProvider},"${FullPdfPath}","${FullPdfAnsPath}","${FreezeTime}","${UnfreezeTime}")`
    db.query(sql, function(error, results){
        if(error){
            return res.send('出错啦：'+error);
        }else{
            return res.send('添加成功.');
        }
    });
};
//删
module.exports.delete = function(req, res, next){
    var ContestID = req.params.ContestID;
    var sql = "update Contest set Valid = 0 where ContestID = " + ContestID;
    db.query(sql, function (error, results, fields) {
        if(error){
            console.log(error);
            res.send("Error When Querying Problems List");
        }else{
            res.send("删除成功");
        }
    });
};
module.exports.redodelete = function (req, res, next){
    var ContestID = req.params.ContestID;
    var sql = "update Contest set Valid = 1 where ContestID = " + ContestID;
    db.query(sql, function (error, results, fields) {
        if(error){
            console.log(error);
            res.send("Error When Querying Problems List");
        }else{
            res.send("恢复成功");
        }
    });
};
//改
module.exports.edit = function(req, res, next){
    // console.log(req.body);
    var ContestID = req.body['ContestID'];
    var ContestType = req.body['ContestType'];
    var ShortName = req.body['ShortName'];
    var Classification = req.body['Classification'];
    var Name = req.body['Name'];
    var ActivateTime = algo.convertTime(req.body['ActivateTime']);
    var DeactivateTime = algo.convertTime(req.body['DeactivateTime']);
    var StartTime = algo.convertTime(req.body['StartTime']);
    var EndTime = algo.convertTime(req.body['EndTime']);
    var FreezeTime = algo.convertTime(req.body['FreezeTime']);
    var UnfreezeTime = algo.convertTime(req.body['UnfreezeTime']);
    var FinalizeTime = algo.convertTime(req.body['FinalizeTime']);
    var PubliclyVisible = algo.convertSwitcher(req.body['PubliclyVisible']);
    var isDoubleCheck = algo.convertSwitcher(req.body['isDoubleCheck']);
    var ShowProblemProvider = algo.convertSwitcher(req.body['ShowProblemProvider']);
    var FullPdfPath = req.body['FullPdfPath'];
    var FullPdfAnsPath = req.body['FullPdfAnsPath'];
    // console.log('here');
    var sql =`UPDATE Contest SET ContestType = ${ContestType}, ShortName =  "${ShortName}", Classification = "${Classification}", Name="${Name}",`+
        `ActivateTime = "${ActivateTime}", DeactivateTime = "${DeactivateTime}", StartTime = "${StartTime}", EndTime = "${EndTime}", FinalizeTime = "${FinalizeTime}", PubliclyVisible = "${PubliclyVisible}",`+
        `isDoubleCheck = "${isDoubleCheck}", ShowProblemProvider = "${ShowProblemProvider}", FullPdfPath = "${FullPdfPath}", FullPdfAnsPath = "${FullPdfAnsPath}", FreezeTime = "${FreezeTime}", UnfreezeTime="${UnfreezeTime}" ` +
        ` WHERE ContestID = ${ContestID}`;
    // console.log(sql);
    db.query(sql, function (error, results, fields) {
        if(error){
            return res.send("编辑比赛失败：" + error);
        }else{
            return res.send("编辑比赛成功");
        }
    });
};
//查
module.exports.getAllContests = function (req, res, next){
    var sql = `SELECT * FROM Contest WHERE Valid = 1`
    db.query(sql, function(error,results,fields){
       if(error){
           return res.send('出错了：'+error);
       }else{
           return res.json(results);
       }
    });
};
module.exports.getFullContest = function (req, res, next){
    var sql = `SELECT * FROM Contest WHERE Valid = 1 AND ContestID = ${req.params.ContestID}`;
    db.query(sql, function(error,results,fields){
        if(error){
            return res.send('出错了：'+error);
        }else{
            return res.json(results);
        }
    });
};


//当前比赛
module.exports.getAvailable = function(req, res, next){
    contest.GetAvailable(function(error, results){
        if(error){
            res.send(error);
        }else{
            res.json(results);
        }
    });
};
module.exports.setGlobalCurrent = function(req, res, next){
    var id = req.params.ContestID;
    if(id === '0') id='NULL';
    var sql = `UPDATE Current_Contest SET ContestID = ${id} WHERE UID = 10000`;
    db.query(sql, function(error, results, fields){
       if(error){
           return res.send('错误：'+error);
       }else{
           return res.send('设置成功. 请刷新页面');
       }
    });
};
module.exports.setMyCurrent = function(req, res, next){
    var cid = req.body['ContestID'];
    var uid = res.locals.myUID;
    console.log(uid);
    if(uid === 0) return res.send('设置失败：UID不合法');
    if(cid === '0') cid='NULL';
    //尝试先插入 再更新
    var sql_insert = `INSERT INTO Current_Contest(UID,ContestID) VALUES (${uid}, ${cid})`;
    db.query(sql_insert, function(error, results, fields){
        if(error){
            var sql = `UPDATE Current_Contest SET ContestID = ${cid} WHERE UID = ${uid}`;
            db.query(sql, function(error, results, fields){
                if(error){
                    return res.send('尝试更新错误：'+error);
                }else{
                    return res.send('修改原记录成功. 请刷新页面');
                }
            });
        }else{
            return res.send('添加新记录成功，请刷新页面');
        }
    });


};

//获得当前比赛，这是一个路由中间件
module.exports.GetCurrent = function(req, res, next){
    //获得全局当前比赛
    contest.GetCurrentID(function(error, result){
        res.locals.globalContest = result;
        res.locals.myContest = {};
        //获得我的当前比赛，仅对管理员有效
        if(res.locals.myRole !== 0 && res.locals.myUID){
            contest.GetCurrentByUID(res.locals.myUID,function(error, result){
                res.locals.myContest = result;
                next();
            });
        }else{
            next();
        }
    });
};

module.exports.editDetails = function(req, res, next){
    var RuleObject = new RichText({type: 'html', body: RichText.ConvertObjToBase64(req.body['RuleObject'])}).toBase64();
    var ContestID = req.body['ContestID'];
    var sql_insert = `INSERT INTO \`Contest Rule\`(ContestID, RuleObject) VALUES (${ContestID}, "${RuleObject}")`;
    db.query(sql_insert, function(error, results, fields){
       if(error){
           var sql_update = `UPDATE \`Contest Rule\` SET RuleObject = "${RuleObject}" WHERE ContestID = ${ContestID}`;
           db.query(sql_update, function(error, results, fields){
               if(error){
                   res.send('错误：'+error);
               }else{
                   res.send('成功：比赛Details(考生须知)已更新');
               }
           });
       }else{
           res.send('成功：比赛Details(考生须知)已插入');
       }
    });
};