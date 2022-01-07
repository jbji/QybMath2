
var db = require('../../models/db.js');
var algo = require('../../models/myAlgorithm.js');
var user = require('../../models/user.js');

//获得PwResetRequest对象
var obj = {

};

var GetRequest = function(token, callback){
    var sql = `SELECT * FROM UserPwReset WHERE ResetToken = "${token}" AND TimeExpires > "${algo.getDateTime()}"`;
    db.query(sql, function(error, results){
       if(error){
           callback(error);
       }else{
           if(results.length !== 0){
                callback(error, results[0]);
           }else{
               callback("密码重置密钥无效或者已过期");
           }
       }
    });
};

obj.show = function(req, res, next){
    // req.params.ResetToken;
    GetRequest(req.params.ResetToken, function(error, pwreq){
        res.locals.resetpw_msg = '';
        res.locals.token = req.params.ResetToken;
        if(error){
            res.locals.resetpw_msg = '错误：' + error;
        }
        res.render('user/resetpw.ejs',{title: '重置密码', layout:false});
    });
};

obj.changePw = function(req, res, next){
    console.log(req.body);
    var token = req.body['token'];
    var pwd = req.body['pwd'];
    var pwdr = req.body['pwdr'];
    if (pwd !== pwdr) return res.send('出错啦：两次输入的密码不一致');
    if (pwd === '' || pwdr === '') return res.send('出错啦：密码不能为空');

    var key = algo.generateUUID();
    pwd = key + pwd;
    pwd = algo.getHash(pwd);
    GetRequest(token, function(error, pwreq){
        if(error){
            return res.send("出错啦：" + error);
        }else{
            var sql = `update User set PasswordHash = "${pwd}", RandomKey = "${key}" WHERE User.UID = ${pwreq.UID}`;
            db.query(sql, function(error, results){
                if(error){
                    return res.send("出错啦：" + error);
                }else{
                    var sql = `update UserPwReset set TimeExpires = "${algo.getDateTime()}" where ResetToken = "${token}"`;
                    db.query(sql, function(error, results){
                        if(error){
                            return res.send("出错啦：" + error);
                        }else{
                            return res.send("修改成功");
                        }
                    });
                }
            })
        }
    });


}
obj.requestByQQ = function(req, res, next){
    var token = algo.getHash(algo.generateUUID());
    user.getByQQ(req.body['qq'], function(error, user){
        if(error){
            res.send(error);
        }else{
            var sql = `INSERT INTO UserPwReset(UID, OriginalPasswordHash, TimeStart, TimeExpires, ResetToken) `
                    + `VALUES (${user.UID}, "${user.PasswordHash}", "${algo.getDateTime()}", "${algo.getDateTimeNextDay()}", "${token}")`;
            db.query(sql, function(error){
                if(error){
                    res.send("生成密码重置口令时发生错误: " + error);
                }else{
                    res.send(token);
                }
            });
        }
    });
};


obj.requestByUID = function(req, res, next){
    var token = algo.getHash(algo.generateUUID());
    user.getByUID(req.body['uid'], function(error, user){
        if(error){
            res.send(error);
        }else{
            var sql = `INSERT INTO UserPwReset(UID, OriginalPasswordHash, TimeStart, TimeExpires, ResetToken) `
                + `VALUES (${user.UID}, "${user.PasswordHash}", "${algo.getDateTime()}", "${algo.getDateTimeNextDay()}", "${token}")`;
            db.query(sql, function(error){
                if(error){
                    res.send("生成密码重置口令时发生错误: " + error);
                }else{
                    res.send(token);
                }
            });
        }
    });
};

module.exports = obj;