const MainModel = require("../models/expenseCat.model");
const GlobalFun = require("../comman/globalFun")
// Create and Save a new Customer
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    }); 
  }
  
  // Create a data
  const dataModel = new MainModel({
    expenseCategaryName : req.body.ExpenseCategaryName,
    adminID : req.user.adminID

  });

  // Save data in the database
  MainModel.create(dataModel, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Customer."
      });
    else {
      const appVersion = GlobalFun.genrate();
      const newData = new AppConfig({
        appconfigName : "expenseCategary",
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
  MainModel.getAll(adminid, (err, data) => {
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



