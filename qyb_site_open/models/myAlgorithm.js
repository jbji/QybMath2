var crypto = require('crypto');

var algorithm = {

};

algorithm.isNumber = function(number){
    var reg = new RegExp("^[0-9]*$");
    return reg.test(number);
}

algorithm.hasSpecial = function(text){
    var regEn = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im;
    return regEn.test(text);
}

algorithm.generateUUID = function() {
    const hexDigits = "0123456789abcdef";
    const s = [];
    for (let i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    const uuid = s.join("");
    return uuid;
};

algorithm.getDateTime = function (obj){
    var date;
    if(obj) {
        date = new Date(obj);
    }else{
        date = new Date();
    }
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var Hours = date.getHours();
    var Minutes = date.getMinutes();
    var Seconds = date.getSeconds();
    if (month < 10) {
        month = "0" + month;
    }
    if (day < 10) {
        day = "0" + day;
    }
    var s_createtime = year + '-' + month + '-' + day + ' ' + Hours + ':' + Minutes + ':' + Seconds + '';
    return s_createtime;
};

algorithm.getDateTimeNextDay = function(){
    return this.getDateTime(new Date().getTime() + 24*60*60*1000);
}

algorithm.getHash = function(obj){
    return crypto.createHash('md5').update(obj).digest('base64');
}

algorithm.convertTime = function(str){
    return str.toString().replace('T',' ');
}

algorithm.convertSwitcher = function(str){
    if(str === 'true'){
        return 1;
    }
    if(str === 'false'){
        return 0;
    }
    return {};
}
algorithm.operateTime = function(value){
    if(value) return convertDbTime(value);
    return value;
}
algorithm.convertDbTime = function(time_str){
    time_str = time_str.toString().replace("T"," ");
    time_str = time_str.toString().replace("Z" , "");
    time_str = time_str.toString().replace("." , ":");
    var time = time_str.replace(/-/g, ':').replace(' ', ':');
    time = time.split(':');
    return getDateTime(new Date(time[0], (time[1] - 1), time[2], time[3], time[4], time[5]).getTime() + 8*60*60*1000);
}
module.exports = algorithm;