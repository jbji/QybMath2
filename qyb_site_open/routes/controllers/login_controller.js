var user = require('../../models/user.js');
var crypto = require('crypto');

module.exports.login = function(req, res, next) {
    var qq = req.body['QQ'];
    var pwd = req.body['pwd'];

    user.getByQQ(qq,function(error, user){
        if(error){
            req.session.error = error;
            return res.redirect('/auth/login');
        }
        //拿到了User
        if(user.RandomKey) pwd = user.RandomKey + pwd;
        pwd = crypto.createHash('md5').update(pwd).digest('base64');
        if(user.PasswordHash === pwd){
            req.session.user = user;
            res.redirect('/');
        }else {
            req.session.error = '出错啦：密码不正确';
            return res.redirect('/auth/login');
        }
    });
}

module.exports.logout = function(req, res, next){
    req.session.user = null;
    return res.redirect('/');
}