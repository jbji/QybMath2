var db = require('../../models/db.js');
var crypto = require('crypto');
var User = require('../../models/user');
var algorithm = require('../../models/myAlgorithm');

//密码加密规则
//先做一次哈希
//再把用户UID加在哈希结果前面
//二者组合再做一次哈希得到最终哈希
module.exports.register = function(req, res, next) {
    //获得输入
    var name = req.body['nickname'];
    var qq = req.body['qq'];
    var mail = req.body['mail'];
    var pwd = req.body['pwd'];
    var pwdr = req.body['pwd-repeat'];
    var grade = req.body['grade'];
    var errstr = '';
    //检查输入合法性
    if (errstr === '' && name === '') errstr = '出错啦：昵称不能为空';
    if (errstr === '' && qq === '') errstr = '出错啦：QQ号不能为空';
    if (errstr === '' && (pwd === '' || pwdr === '')) errstr = '出错啦：密码不能为空';
    if (errstr === '' && pwd !== pwdr) errstr = '出错啦：两次输入的密码不一致';
    if (errstr === '' && grade === '你的年级（可更改）') errstr = '出错啦：你没有选择年级';
    if (errstr === '' && algorithm.hasSpecial(name)) errstr = "出错啦：名字中不能包含特殊英文字符.";
    if (errstr === '' && !algorithm.isNumber(qq)) errstr = "出错啦：QQ号无效";
    if (errstr === '' && mail !== '') {
        let atpos = mail.indexOf("@");
        let dotpos = mail.lastIndexOf(".");
        if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= mail.length) errstr = "出错啦：邮箱地址无效，请输入正确的邮箱地址.";
    }
    //尝试跳转一次错误页面
    if (errstr !== '') {
        req.session.error = errstr;
        return res.redirect('/auth/register');
    }


    //现在所有的输入都是正常的， 可以开始注册用户啦！

    //先计算哈希和随机key
    var key = algorithm.generateUUID();
    pwd = key + pwd;
    pwd = crypto.createHash('md5').update(pwd).digest('base64');

    var sqlCheckQQ = 'SELECT * FROM User WHERE QQ = "' + qq + '"';
    var sql_insert = `INSERT INTO User(Nickname, QQ, Mail, PasswordHash, RandomKey, Grade) VALUES ("${name}","${qq}","${mail}","${pwd}","${key}","${grade}")`

    //  回  调  陷  阱  .jpg

    //执行查询语句，检查QQ是否已被注册
    db.query(sqlCheckQQ, function (error, results, fields) {
        if (error) {
            errstr = '错误：检查数据库时出现错误' + error;
            return res.redirect('/auth/register');
        } else {
            if (results.length) {
                req.session.error = '出错啦：QQ号已注册';
                return res.redirect('/auth/register');
            } else {
                //执行插入语句
                db.query(sql_insert, function (error, results, fields) {
                    if (error) {
                        req.session.error = '错误：插入数据库时出现错误' + error;
                        return res.redirect('/auth/register');
                    }else{
                        //再次查询，获得注册完成的ID
                        db.query(sqlCheckQQ, function(error, results, fields){
                            if(error){
                                req.session.error = '错误：注册成功，但检查数据库时出现错误' + error;
                                return res.redirect('/auth/register');
                            }else{
                                req.session.user = new User(results[0]);
                                return res.redirect('/');
                            }
                        });

                    }
                });
            }
        }
    });
}