var db = require('./db.js');
var algorithm = require('./myAlgorithm.js');

function User(user){
    this.UID = user.UID;
    this.Nickname = user.Nickname;
    this.QQ = user.QQ;
    this.Mail = user.Mail;
    this.PasswordHash = user.PasswordHash;
    this.Role = user.Role;
    this.RandomKey = user.RandomKey;
}

module.exports = User;

//类似于全局函数？ prototype类似于成员函数？

//根据UID获取用户对象, callback(error, user)
User.getByUID = function(UID,callback){
    if(!algorithm.isNumber(UID)){
        callback('出错啦：UID必须是数字');
    }
    sql = 'SELECT * FROM User WHERE UID = ' + UID;
    db.query(sql, function(error, results, fields){
        if(error){
            callback(error);
        }
        if(results.length !== 0){
            callback(error, new User(results[0]));
        }else{
            callback('出错啦：UID似乎不正确');
        }
    });
}

//根据QQ获取用户对象

User.getByQQ = function(QQ,callback){
    if(!algorithm.isNumber(QQ)){
        callback('出错啦：QQ必须是数字');
    }
    sql = 'SELECT * FROM User WHERE QQ = "' + QQ + '"';
    db.query(sql, function(error, results, fields){
        if(error){
            callback(error);
        }
        if(results.length !== 0){
            callback(error, new User(results[0]));
        }else{
            callback('出错啦：QQ号似乎不正确');
        }

    });
}