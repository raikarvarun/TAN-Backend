const AppConfig = require("../models/appconfig.model");

// Find a single Customer by Id
exports.findOne = (req, res) => {
  AppConfig.findById(req.user.adminID, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Appversion with id.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Customer with id " 
        });
      }
    } else res.send(data);
  });
};

// Update a Customer identified by the id in the request
exports.update = (req) => {
  AppConfig.updateById(
    req.user.adminID,
    new AppConfig(req.body),
    (err, data) => {
      if(err){
        return err 
      }
      else
       return data
    }
  );
};



// // Create and Save a new Customer
// exports.create = (req, res) => {
//   // Validate request
//   if (!req.body) {
//     res.status(400).send({
//       message: "Content can not be empty!"
//     });
//   }

//   // Create a Customer
//   const appconfig = new AppConfig({
//     appVersion  : req.body.appVersion,
//     adminID : req.body.adminID
//   });

//   // Save Customer in the database
//   AppConfig.create(appconfig, (err, data) => {
//     if (err)
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while creating the Customer."
//       });
//     else res.send(data);
//   });
// };

// // Retrieve all Tutorials from the database (with condition).
// exports.findAll = (req, res) => {
//   const title = "";

//   AppConfig.getAll(title, (err, data) => {
//     if (err)
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving tutorials."
//       });
//     else {
//       var data1 = {"appconfig": data}
//       res.send(data1);
//     }
//   });
// };



// // find all published Tutorials
// exports.findAllPublished = (req, res) => {
//   CustomerModel.getAllPublished((err, data) => {
//     if (err)
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving tutorials."
//       });
//     else res.send(data);
//   });
// };



// // Delete a Customer with the specified id in the request
// exports.delete = (req, res) => {
//   CustomerModel.remove(req.params.id, (err, data) => {
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
//   CustomerModel.removeAll((err, data) => {
//     if (err)
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while removing all tutorials."
//       });
//     else res.send({ message: `All Tutorials were deleted successfully!` });
//   });
// };
