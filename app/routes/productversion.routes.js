module.exports = app => {
  const productVersionController = require("../controllers/productversion.controller");

  var router = require("express").Router();
  const verifyToken = require("../middleware/auth")
  router.use(verifyToken);
  
  // Create a new product
  router.post("/insert", productVersionController.create);

  // Retrieve all product
  router.get("/all", productVersionController.findAll);

  // Update a product with id
  router.put("/update/:id", productVersionController.update);

  // // Retrieve a single product with id
  // router.get("/:id", productController.findOne);
  //
  // Delete a product with id
  router.delete("/delete/:id", productVersionController.delete);
  //
  // // Delete all product
  // router.delete("/", productController.deleteAll);

  app.use('/api/productversion', router);
};
