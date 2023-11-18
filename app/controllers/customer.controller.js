const CustomerModel = require("../models/customer.model");
const GlobalFun = require("../comman/globalFun")
const AppConfig = require("../models/appconfig.model");

// Create and Save a new Customer
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
 
  // Create a Customer
  const customer = new CustomerModel({
    customerName : req.body.customerName,
    customerTypeID : req.body.customerTypeID,
    customerMobile: req.body.customerMobile,
    adminID : req.user.adminID,
    customerAddress: req.body.customerAddress,
    customerOpeningAmount: req.body.customerOpeningAmount,
    TotalAmount: req.body.TotalAmount

  });

  // Save Customer in the database
  CustomerModel.create(customer, async (err, data) =>  {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Customer."
      });
    else {
            const appVersion =  GlobalFun.genrate();

            const newData = new AppConfig({
			        appconfigName : "customer",
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
  CustomerModel.getAll(adminid, (err, data) => {
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



// Update a Customer identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // console.log(req.body);

  CustomerModel.updateById(
    req.query.customerID,
    new CustomerModel(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Tutorial with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Customer with id " + req.params.id
          });
        }
      } else {
        const appVersion = GlobalFun.genrate();

        const newData = new AppConfig({
          appconfigName : "customer",
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
    }
  );
};

