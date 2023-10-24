module.exports = app => {
  const itemController = require("../controllers/item.controller");

  var router = require("express").Router();
  const verifyToken = require("../middleware/auth")
  router.use(verifyToken);
  
  // Create a new product
  router.post("/insert", itemController.create);

  // Retrieve all product
  //router.get("/all", itemController.findAll);

  // Update a product with id
  //router.put("/update/:id", itemController.update);

  // // Retrieve a single product with id
  // router.get("/:id", productController.findOne);
  //
  // // Delete a product with id
  // router.delete("/:id", productController.delete);
  //
  // // Delete all product
  // router.delete("/", productController.deleteAll);

  app.use('/api/item', router);
};
