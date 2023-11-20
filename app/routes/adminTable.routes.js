// const customerController = require("../controllers/customer.controller");
module.exports = app => {
  const mainController = require("../controllers/adminTable.controller");

  var router = require("express").Router();
  const verifyToken = require("../middleware/auth")
  router.use(verifyToken);

  router.get("/all", mainController.findAll);

  // Create a new Customer
  router.post("/insert", mainController.create);

  // Retrieve all Customer
  

  // // Update a Customer with id
  // router.put("/update/:id", mainController.update);

  // // Retrieve a single Customer with id
  // router.get("/:id", customerController.findOne);
  //
  // // Delete a Customer with id
  // router.delete("/:id", customerController.delete);
  //
  // // Delete all Customer
  // router.delete("/", customerController.deleteAll);

  app.use('/api/admintable', router);
};
