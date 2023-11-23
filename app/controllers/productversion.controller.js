const ProductVersionModel = require("../models/productversion.model");
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
  const productVersion = new ProductVersionModel({
    productType : req.body.productType,
    productPrice : req.body.productPrice,
    productQuntity : req.body.productQuntity,
    productImage : req.body.productImage,
    adminID : req.user.adminID,
    productName : req.body.productName,
    openingQuantity : req.body.openingQuantity,
    atprice : req.body.atprice,
    salePrice : req.body.salePrice,
    purchasePrice : req.body.purchasePrice
  });

  // Save Customer in the database
  ProductVersionModel.create(productVersion, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Customer."
      });
    else {
      const appVersion = GlobalFun.genrate(req.user.adminID);
      const newData = new AppConfig({
        appconfigName : "product",
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
  
  ProductVersionModel.getAll(adminID, (err, data) => {
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
//   ProductVersionModel.findById(req.params.id, (err, data) => {
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
//   ProductVersionModel.getAllPublished((err, data) => {
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

  const adminID = req.user.adminID;
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // console.log(req.body);

  ProductVersionModel.updateById(adminID,
    req.params.id,
    new ProductVersionModel(req.body),
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
        const appVersion = GlobalFun.genrate(req.user.adminID);
        const ans = GlobalFun.genResponse(200 , "Sucess" , appVersion , data)
        res.send(ans);
      }
    }
  );
};


exports.delete = (req, res) => {
  const adminID = req.user.adminID;
  ProductVersionModel.remove(adminID,req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Tutorial with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Customer with id " + req.params.id
        });
      }
    } else {
        const appVersion = GlobalFun.genrate(req.user.adminID);
        const ans = GlobalFun.genResponse(200 , "Sucess" , appVersion , "");
        res.send(ans);
    }
  });
};

// // Delete all Tutorials from the database.
// exports.deleteAll = (req, res) => {
//   ProductVersionModel.removeAll((err, data) => {
//     if (err)
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while removing all tutorials."
//       });
//     else res.send({ message: `All Tutorials were deleted successfully!` });
//   });
// };
