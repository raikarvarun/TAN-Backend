const productController = require("../controllers/product.controller");
module.exports = app => {
  const productController = require("../controllers/product.controller");

  var router = require("express").Router();
  const verifyToken = require("../middleware/auth")
  router.use(verifyToken);
  
  // Create a new product
  router.post("/insert", productController.create);

  // Retrieve all product
  router.get("/all", productController.findAll);

  // Update a product with id
  router.put("/update/:id", productController.update);

  // // Retrieve a single product with id
  // router.get("/:id", productController.findOne);
  //
  // // Delete a product with id
  // router.delete("/:id", productController.delete);
  //
  // // Delete all product
  // router.delete("/", productController.deleteAll);

  app.use('/api/product', router);
};
