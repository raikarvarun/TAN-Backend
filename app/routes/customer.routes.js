// const customerController = require("../controllers/customer.controller");
module.exports = app => {
  const customerController = require("../controllers/customer.controller");

  var router = require("express").Router();
  const verifyToken = require("../middleware/auth")
  router.use(verifyToken);

  // Create a new Customer
  router.post("/insert", customerController.create);

  // Retrieve all Customer
  router.get("/all/", customerController.findAll);

  // Update a Customer with id
  router.put("/update/:id", customerController.update);
 
  // // Retrieve a single Customer with id
  // router.get("/:id", customerController.findOne);
  //
  // // Delete a Customer with id
  // router.delete("/:id", customerController.delete);
  //
  // // Delete all Customer
  // router.delete("/", customerController.deleteAll);

  app.use('/api/customer', router);
};
