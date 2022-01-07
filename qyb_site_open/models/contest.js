var db = require('./db.js');

function Contest(obj){
    this.ContestID = obj.ContestID;
    this.ContestType = obj.ContestType;
    this.ShortName = obj.ShortName;
    this.Classification = obj.Classification;
    this.Name = obj.Name;
    this.ActivateTime = obj.ActivateTime;
    this.StartTime = obj.StartTime;
    this.EndTime = obj.EndTime;
    this.FinalizeTime = obj.FinalizeTime;
    this.DeactivateTime = obj.DeactivateTime;
    this.PubliclyVisible = obj.PubliclyVisible;
    this.FullPdfPath = obj.FullPdfPath;
    this.isDoubleCheck = obj.isDoubleCheck;
    this.FullPdfAnsPath = obj.FullPdfAnsPath;
    this.ShowProblemProvider = obj.ShowProblemProvider;
    this.Valid = obj.Valid;
    this.AvailableAsCurrent = obj.AvailableAsCurrent;
    this.FreezeTime = obj.FreezeTime;
    this.UnfreezeTime = obj.UnfreezeTime;
}

module.exports = Contest;

Contest.GetCurrentByUID = function(UID, callback){
    var sql = `SELECT * FROM Current_Contest,Contest WHERE Current_Contest.ContestID = Contest.ContestID AND Current_Contest.UID = ${UID}`;
    db.query(sql, function(error, results){
        if(error){
            callback(error);
        }else{
            if(results.length !== 0){
                callback(error, new Contest(results[0]));
            }else{
                callback('无当前比赛');
            }
        }
    });
}

Contest.GetCurrentID = function(callback){
    //当前比赛，全局默认ID 10000
    Contest.GetCurrentByUID(10000, callback);
}

Contest.GetByID = function(callback){
    var sql = `SELECT * FROM Contest WHERE Valid = 1 AND ContestID = ${req.params.ContestID}`;
    db.query(sql, function(error,results,fields){
        if(error){
            callback('出错了：'+error);
        }else{
            callback(error, new Contest(results[0]));
        }
    });
}

Contest.GetAvailable = function(callback){
    var sql = `SELECT ContestID, ShortName FROM Contest WHERE Valid = 1 AND PubliclyVisible = 1 AND AvailableAsCurrent = 1`;
    db.query(sql, function(error, results, fields){
       if(error){
           callback('出错了：'+error);
       }else{
           callback(error, results);
       }
    });
}