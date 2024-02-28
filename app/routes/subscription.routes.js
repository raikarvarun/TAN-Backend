// const customerController = require("../controllers/customer.controller");
module.exports = app => {
  const  Controller = require("../controllers/subscription.controller");

  var router = require("express").Router();
  const verifyToken = require("../middleware/auth")
  router.use(verifyToken);

  // Create a new Customer
  router.get("/getsuborderbyid", Controller.getOrderDataByID);

  // Retrieve all Customer
  router.get("/checkeligible", Controller.checkEligible);

  router.get("/checkifcanceleligible", Controller.checkIfCancelEligible);

  // Update a Customer with id
  // router.put("/update/:id", Controller.update);

  // // Retrieve a single Customer with id
  // router.get("/:id", customerController.findOne);
  //
  // // Delete a Customer with id
  // router.delete("/:id", customerController.delete);
  //
  // // Delete all Customer
  // router.delete("/", customerController.deleteAll);

  app.use('/api/subscription', router);
};
