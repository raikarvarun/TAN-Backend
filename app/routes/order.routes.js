// const customerController = require("../controllers/customer.controller");
module.exports = app => {
  const orderController = require("../controllers/order.controller");

  var router = require("express").Router();
  const verifyToken = require("../middleware/auth")
  router.use(verifyToken);
  // Create a new Customer
  router.post("/insert", orderController.create);

  // Retrieve all Customer
  router.get("/all", orderController.findAll);

  // Update a Customer with id
  //router.put("/update/:id", orderController.update);

  // // Retrieve a single Customer with id
  // router.get("/:id", orderController.findOne);
  //
  // // Delete a Customer with id
  // router.delete("/:id", orderController.delete);
  //
  // // Delete all Customer
  // router.delete("/", orderController.deleteAll);

  app.use('/api/order', router);
};
