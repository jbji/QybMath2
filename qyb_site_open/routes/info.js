var express = require('express');
var router = express.Router();
var auth = require('./controllers/auth_controller.js');
var Info = require('../models/info');
var MyRichTextObject = require('../models/MyRichTextObject');

router.get('/get/:address', auth.auth, (req,res,next) => {

    Info.getByAddress(req.params.address, (error,result) => {
        // return res.send("test");
        if(error){
            next(createError(404));
        }else{
            return res.render('info/general.ejs', {
                title: result.Title + ' - 全员杯竞赛',
                content: MyRichTextObject.ConvertBase64ToStr(
                    MyRichTextObject.FromBase64(result.Content).body
                )
            });
        }

    });

});

module.exports = router;