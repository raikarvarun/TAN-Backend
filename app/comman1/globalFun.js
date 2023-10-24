
const appconfigController = require("../controllers/appconfig.controller");
exports.genrate = (adminID)=>{
    const chars ='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const length = 6 ;
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    let req = {"user" : {"adminID" : adminID } , "body" : {"appVersion" : result}}
    appconfigController.update(req)
    return result;
}

exports.genResponse = (status1 , msg, apiVersion,data)=>{
    const ans ={
        "status" : status1,
        "msg" :msg , 
        "apiVersion" :apiVersion ,
        "data" : data 
    };
    
    return ans;
}