function MyRichTextObject(myobject){
    this.type = myobject.type;
    this.body = myobject.body;
}

MyRichTextObject.prototype.toBase64 = function(){
    return new Buffer(JSON.stringify(this)).toString('base64');
}
// MyRichTextObject.prototype.fromBase64 = function(str){
//     return new MyRichTextObject(JSON.parse(Buffer.from(str , 'base64').toString()));
// }

MyRichTextObject.ConvertObjToBase64 = function(obj){
    return Buffer.from(obj).toString('base64');
}

MyRichTextObject.ConvertBase64ToStr = function(obj){
    return Buffer.from(obj,'base64').toString();
}

MyRichTextObject.FromBase64 = function(str){
    return new MyRichTextObject(JSON.parse(Buffer.from(str , 'base64').toString()));
}

module.exports = MyRichTextObject;