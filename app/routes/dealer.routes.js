// const dealerController = require("../controllers/dealer.controller");
module.exports = app => {
  
  const dealerController = require("../controllers/dealer.controller");

  var router = require("express").Router();
  const verifyToken = require("../middleware/auth")
  router.use(verifyToken);
  // Create a new dealer
  router.post("/insert", dealerController.create);

  // Retrieve all dealer
  router.get("/all", dealerController.findAll);

  // Update a dealer with id
  router.put("/update/:id", dealerController.update);

  // // Retrieve a single dealer with id
  // router.get("/:id", dealerController.findOne);
  //
  // // Delete a dealer with id
  // router.delete("/:id", dealerController.delete);
  //
  // // Delete all dealer
  // router.delete("/", dealerController.deleteAll);

  app.use('/api/dealer', router);
};
