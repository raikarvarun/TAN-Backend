const PaymenttypeModel = require("../models/paymentType.model");
const GlobalFun = require("../comman/globalFun")
// Create and Save a new Customer
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Customer
  const paymentType = new PaymenttypeModel({
    paymentTypeType : req.body.paymentTypeType,
    paymentTypeName : req.body.paymentTypeName,
    adminID : req.user.adminID
  });

  // Save Customer in the database
  PaymenttypeModel.create(paymentType, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Customer."
      });
    else {
      const appVersion = GlobalFun.genrate();
      const newData = new AppConfig({
        appconfigName : "paymentType",
        appconfigVersion: appVersion
      });
      
      AppConfig.updateById(
        req.user.adminID,
        newData,
        (err1, data1) => {
          let appconfig;
          if(err1){
            appconfig = err1; 
          }
          else
          {
            appconfig =data1;
          }
          
          res.send(GlobalFun.genResponse(200 , "Sucess" , [appconfig] , data));

        }
      );
    }
  });
};

// Retrieve all Tutorials from the database (with condition).
exports.findAll = (req, res) => {
  const adminid = req.user.adminID;
  PaymenttypeModel.getAll(adminid, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    else {
      const ans = GlobalFun.genResponse(200 , "Sucess" , null , data)
      res.send(ans);
    }
  });
};


