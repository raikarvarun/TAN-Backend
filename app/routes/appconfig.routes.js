// const customerController = require("../controllers/customer.controller");
module.exports = app => {
  const appconfigController = require("../controllers/appconfig.controller");

  var router = require("express").Router();
  const verifyToken = require("../middleware/auth")
  router.use(verifyToken);
  
  // Create a new Customer
  // router.post("/insert", customerController.create);

  // Retrieve all Customer
  // router.get("/all", customerController.findAll);

  // Update a Customer with id
  router.put("/update", appconfigController.update);

  // Retrieve a single Customer with id
  router.get("/get", appconfigController.findOne);

  //
  // // Delete a Customer with id
  // router.delete("/:id", customerController.delete);
  //
  // // Delete all Customer
  // router.delete("/", customerController.deleteAll);

  app.use('/api/appconfig', router);
};
