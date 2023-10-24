const productVersionController = require("../controller/productversion.controller");
const ProductController = require("../controllers/product.controller");
const paymentController = require("../controllers/payment.controller");


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
    productVersionID : req.body.productVersionID,
    productType : req.body.productType,
    productPrice : req.body.productPrice,
    productQuntity : req.body.productQuntity,
    paymentDone    : req.body.paymentDone,
    productImage : req.body.productImage,
    paymentID : req.body.paymentID,
    dealerID : req.body.dealerID,
    productID : req.body.productID
  });

  // Save Customer in the database
  ProductVersionModel.create(productVersion, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Customer."
      });
    else res.send(data);
  });
};

// Retrieve all Tutorials from the database (with condition).
exports.findAll = (req, res) => {
  const data = "";
  
  ProductVersionModel.getAll(data, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    else {
      var data1 = {"productversion": data}
      res.send(data1);
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
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // console.log(req.body);

  ProductVersionModel.updateById(
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
      } else res.send(data);
    }
  );
};

// // Delete a Customer with the specified id in the request
// exports.delete = (req, res) => {
//   ProductVersionModel.remove(req.params.id, (err, data) => {
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
//   ProductVersionModel.removeAll((err, data) => {
//     if (err)
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while removing all tutorials."
//       });
//     else res.send({ message: `All Tutorials were deleted successfully!` });
//   });
// };
