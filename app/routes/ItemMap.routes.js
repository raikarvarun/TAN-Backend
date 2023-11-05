module.exports = app => {
  const Controller = require("../controllers/ItemMap.controller");

  var router = require("express").Router();
  const verifyToken = require("../middleware/auth")
  router.use(verifyToken);
  
  // Create a new product
  router.post("/insert", Controller.create);

  //Retrieve all product
  router.get("/all", Controller.findAll);

  // Update a product with id
  //router.put("/update/:id", Controller.update);

  // // Retrieve a single product with id
  // router.get("/:id", productController.findOne);
  //
  // // Delete a product with id
  // router.delete("/:id", productController.delete);
  //
  // // Delete all product
  // router.delete("/", productController.deleteAll);

  app.use('/api/itemmap', router);
};
