// const paymentController = require("../controllers/payment.controller");
module.exports = app => {
  const paymentController = require("../controllers/payment.controller");

  var router = require("express").Router();
  const verifyToken = require("../middleware/auth")
  router.use(verifyToken);
  
  // Create a new Customer
  router.post("/insert", paymentController.create);

  // Retrieve all Customer
  router.get("/all", paymentController.findAll);

  // Update a Customer with id
  router.put("/update/:id", paymentController.update);

  // // Retrieve a single Customer with id
  // router.get("/:id", customerController.findOne);
  //
  // // Delete a Customer with id
  // router.delete("/:id", customerController.delete);
  //
  // // Delete all Customer
  // router.delete("/", customerController.deleteAll);

  app.use('/api/payment', router);
};
