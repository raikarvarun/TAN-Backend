

// async function fetchData(adminID  ,newData) {
    
    
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             AppConfig.updateById(
//                 adminID,
//                 newData,
//                 (err1, data1) => {
//                     if (err1) {
//                         resolve(err1);
//                     }
        
//                     else {
//                         resolve(data1);
//                     }
        
//                 }
//             );
 
//         }, 5000);
//     });

    
// }

exports.genrate = ()=>{
    const chars ='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const length = 6 ;
    var newApiVersion = '';
    for (var i = length; i > 0; --i) newApiVersion += chars[Math.floor(Math.random() * chars.length)];
    //return ans;
    // const newData = new AppConfig({
    //     appconfigName : appconName,
    //     appconfigVersion: newApiVersion
    // });
    //var ans = await fetchData(adminID , newData);
    
    return newApiVersion;
    
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