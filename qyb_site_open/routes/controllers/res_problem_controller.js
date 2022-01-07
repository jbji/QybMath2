var RichText = require('../../models/MyRichTextObject');
var db = require('../../models/db.js');

module.exports.submit = function (req, res, next){
    var ProblemObject = new RichText({type: 'html', body: RichText.ConvertObjToBase64(req.body['ProblemObject'])}).toBase64();
    var AnswerObject = new RichText({type: 'html', body: RichText.ConvertObjToBase64(req.body['AnswerObject'])}).toBase64();
    var sqlInsertProblem = 'INSERT INTO Problem(Name, AddedTime, ' +
        'DraftFilePath, ProblemObject, DraftAnsPath, AnswerObject, UID) VALUES' +
        '("'+ req.body['Name'] + '",(select sysdate()), "'+req.body['DraftFilePath']
        + '","' + ProblemObject + '","'
        + req.body['DraftAnsPath'] + '","' + AnswerObject + '","'+ res.locals.myUID +'")'
    db.query(sqlInsertProblem, function (error, results, fields) {
        if(error){
            return res.send("添加题目失败");
        }else{
            return res.send("添加题目成功");
        }
    });
}

module.exports.getAllProblems = function(req, res, next){
    var sqlAllProblems = "select ProblemID, Name, AddedTime, NickName" +
        " from Problem,User where Problem.Valid = 1 AND Problem.UID = User.UID";
    db.query(sqlAllProblems, function (error, results, fields) {
        if(error){
            console.log(error);
            res.send("Error When Querying Problems List");
        }else{
            res.json(results);
        }
    });
}

module.exports.getFullProblem = function(req, res, next){
    var ProblemID = req.params.ProblemID;
    var sqlAllProblems = "select ProblemID, Name, AddedTime, NickName, Problem.UID, DraftFilePath, DraftAnsPath, ProblemObject, AnswerObject" +
        " from Problem,User where Problem.Valid = 1 AND Problem.UID = User.UID AND ProblemID = " + ProblemID;
    db.query(sqlAllProblems, function (error, results, fields) {
        if(error){
            console.log(error);
            res.send("Error When Querying Problems List");
        }else{
            res.json(results);
        }
    });
}

module.exports.delete = function(req, res, next){
    var ProblemID = req.params.ProblemID;
    var sqlAllProblems = "update Problem set Valid = 0 where ProblemID = " + ProblemID;
    db.query(sqlAllProblems, function (error, results, fields) {
        if(error){
            console.log(error);
            res.send("Error When Querying Problems List");
        }else{
            res.send("删除成功");
        }
    });
}

module.exports.redodelete = function(req, res, next){
    var ProblemID = req.params.ProblemID;
    var sqlAllProblems = "update Problem set Valid = 1 where ProblemID = " + ProblemID;
    db.query(sqlAllProblems, function (error, results, fields) {
        if(error){
            console.log(error);
            res.send("Error When Querying Problems List");
        }else{
            res.send("恢复成功");
        }
    });
}

module.exports.edit = function(req, res, next){
    console.log(req.body);
    var ProblemObject = new RichText({type: 'html', body: RichText.ConvertObjToBase64(req.body['ProblemObject'])}).toBase64();
    // req.body['DraftAnsPath'];
    var AnswerObject = new RichText({type: 'html', body: RichText.ConvertObjToBase64(req.body['AnswerObject'])}).toBase64();
    var sqlUpdateProblem = 'Update Problem set Name = ' + '"' + req.body['Name'] + '",' +
        'DraftFilePath = ' + '"' + req.body['DraftFilePath'] + '",' +
        'ProblemObject = ' + '"' + ProblemObject + '",' +
        'AnswerObject = ' + '"' + AnswerObject + '" '+
        'where ProblemID = ' + req.body['ProblemID'];
    console.log(sqlUpdateProblem);
    db.query(sqlUpdateProblem, function (error, results, fields) {
        if(error){
            return res.send("编辑题目失败");
        }else{
            return res.send("编辑题目成功");
        }
    });
}
