const ProductModel = require("../models/product.model");
const GlobalFun = require("../comman1/globalFun")


// Create and Save a new Customer
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!" 
    });
  }

  // Create a Customer
  const product = new ProductModel({
    productName : req.body.productName,
    adminID : req.user.adminID
  });

  // Save Customer in the database
  ProductModel.create(product, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Customer."
      });
    else {
      const appVersion = GlobalFun.genrate(req.user.adminID);
      const ans = GlobalFun.genResponse(200 , "Sucess" , appVersion , data)
      res.send(ans);
    }
  });
};

// Retrieve all Tutorials from the database (with condition).
exports.findAll = (req, res) => {
  const adminID = req.user.adminID
  
  ProductModel.getAll(adminID, (err, data) => {
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
//   ProductModel.findById(req.params.id, (err, data) => {
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
//   ProductModel.getAllPublished((err, data) => {
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

  ProductModel.updateById(
    req.params.id,
    new ProductModel(req.body),
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
//   ProductModel.remove(req.params.id, (err, data) => {
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
//   ProductModel.removeAll((err, data) => {
//     if (err)
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while removing all tutorials."
//       });
//     else res.send({ message: `All Tutorials were deleted successfully!` });
//   });
// };



// Create and Save a new Customer
// exports.createWithoutResponse = (req , temp) => {
  
//   let ans ="Varun"; 
//   // Create a Customer
//   const product = new ProductModel({
//     productName : req.productName,
//     adminID : temp.adminID
//   });
//   // Save Customer in the database
//   ProductModel.create(product, (err, data) => {
//     if (err)
//       {
//         return err
//       }
//     else {
      
//       const appVersion = GlobalFun.genrate(temp.adminID);
//       ans = GlobalFun.genResponse(200 , "Sucess" , appVersion , data);
//       console.log(ans);
//     }
//   });

//   return ans;
// };