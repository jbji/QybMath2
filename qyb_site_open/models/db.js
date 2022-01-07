var mysql = require('mysql');
var set = require('./db_settings.js');

var pool = mysql.createPool({
    connectionLimit: set.connectionLimit,
    host     : set.host,
    user     : set.user,
    password : set.password,
    database : set.database
});

module.exports = pool;