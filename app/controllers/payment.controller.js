const PaymentModel = require("../models/payment.model");
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
  const payment = new PaymentModel({
    paymentType   : req.body.paymentType ,
    paymentDate  : req.body.paymentDate,
    paymentAmount :req.body.paymentAmount,
    adminID : req.user.adminID,
    remainingBalance :req.body.remainingBalance,
    TotalBalance :req.body.TotalBalance
  });

  // Save Customer in the database
  PaymentModel.create(payment, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Customer."
      });
    else {
      const appVersion = GlobalFun.genrate();
      const newData = new AppConfig({
        appconfigName : "payment",
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
  const adminID = req.user.adminID

  PaymentModel.getAll(adminID, (err, data) => {
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

// // Find a single Customer by Id
// exports.findOne = (req, res) => {
//   PaymentModel.findById(req.params.id, (err, data) => {
//     if (err) {
//       if (err.kind === "not_found") {
//         res.status(404).send({
//           message: `Not found Tutorial with id ${req.params.id}.`
//         });
//       } else {
//         res.status(500).send({
//           message: "Error retrieving Customer with id " + req.params.id
//         });
//       }
//     } else res.send(data);
//   });
// };

// // find all published Tutorials
// exports.findAllPublished = (req, res) => {
//   PaymentModel.getAllPublished((err, data) => {
//     if (err)
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving tutorials."
//       });
//     else res.send(data);
//   });
// };

// Update a Customer identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // console.log(req.body);
  PaymentModel.updateById(
    req.params.id,
    new PaymentModel(req.body),
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
      } else res.send(data);
    }
  );
};

// // Delete a Customer with the specified id in the request
// exports.delete = (req, res) => {
//   PaymentModel.remove(req.params.id, (err, data) => {
//     if (err) {
//       if (err.kind === "not_found") {
//         res.status(404).send({
//           message: `Not found Tutorial with id ${req.params.id}.`
//         });
//       } else {
//         res.status(500).send({
//           message: "Could not delete Customer with id " + req.params.id
//         });
//       }
//     } else res.send({ message: `Tutorial was deleted successfully!` });
//   });
// };

// // Delete all Tutorials from the database.
// exports.deleteAll = (req, res) => {
//   PaymentModel.removeAll((err, data) => {
//     if (err)
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while removing all tutorials."
//       });
//     else res.send({ message: `All Tutorials were deleted successfully!` });
//   });
// };
