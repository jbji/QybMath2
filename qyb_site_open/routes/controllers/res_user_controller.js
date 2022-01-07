var db = require('../../models/db.js');

module.exports.getAdmins = function(req, res, next){
    var sql = `select * from User where Role != 0 AND Valid = 1`;
    db.query(sql, function(error, results){
        if(error){
            console.log(error);
            res.send("Error When Querying List");
        }else{
            res.json(results);
        }
    });
};

module.exports.grantUID = function(req, res, next){
    var sql = `UPDATE User SET Role = ${req.params.Role} WHERE UID = ${req.params.UID}`;
    db.query(sql, function(error, results){
        if(error){
            res.send('授予权限失败: ' + error);
        }else{
            res.send('授予权限成功');
        }
    });
};

module.exports.grantQQ = function(req, res, next){
    var sql = `UPDATE User SET Role = ${req.params.Role} WHERE QQ = "${req.params.QQ}"`;
    console.log(sql);
    db.query(sql, function(error, results){
        if(error){
            res.send('授予权限失败: ' + error);
        }else{
            res.send('授予权限成功');
        }
    });
};

module.exports.revokeUID = function(req, res, next){
    var sql = `UPDATE User SET Role = 0 WHERE UID = ${req.params.UID}`;
    db.query(sql, function(error, results){
        if(error){
            res.send('撤回权限失败: ' + error);
        }else{
            res.send('撤回权限成功');
        }
    });
};

module.exports.revokeQQ = function(req, res, next){
    var sql = `UPDATE User SET Role = 0 WHERE QQ = "${req.params.QQ}"`;
    db.query(sql, function(error, results){
        if(error){
            res.send('撤回权限失败: ' + error);
        }else{
            res.send('撤回权限成功');
        }
    });
};