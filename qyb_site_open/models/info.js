var db = require('./db.js');
var algorithm = require('./myAlgorithm.js');

function Info(info){
    this.Address = info.Address;
    this.Title = info.Title;
    this.Content = info.Content;
}

module.exports = Info;

Info.getByAddress = function(address,callback){
    sql = `SELECT * FROM Info WHERE Address = '${address}' AND Valid = 1`;
    db.query(sql, function(error, results, fields){
        if(error){
            callback(error);
        }
        if(results.length !== 0){
            callback(error, new Info(results[0]));
        }else{
            callback('出错啦：地址不存在');
        }
    });
}