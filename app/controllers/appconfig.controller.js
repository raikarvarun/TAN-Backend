const AppConfig = require("../models/appconfig.model");
const GlobalFun = require("../comman/globalFun")


exports.getAll = (req, res) => {
  AppConfig.getAll(req.user.adminID, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Appversion with id.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving appconfig with id " 
        });
      }
    } else{
      const ans = GlobalFun.genResponse(200 , "Sucess" , null , data)
      res.send(ans);

    } 
  });
};

exports.update = (req ) => {

  const newData = new AppConfig({
    appconfigName : req.body.appconfigName,
    appconfigVersion: req.body.appconfigVersion
  });

  AppConfig.updateById(
    req.user.adminID,
    newData,
    (err, data) => {
      if(err){
        return err 
      }
      else
        return data;
      
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
