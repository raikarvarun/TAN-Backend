const express = require("express");
// const bodyParser = require("body-parser"); /* deprecated */
const cors = require("cors");
require('dotenv').config()

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json()); /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); /* bodyParser.urlencoded() is deprecated */

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Saurav application. migration done" });
});

require("./app/routes/customer.routes.js")(app);
require("./app/routes/payment.routes")(app);
require("./app/routes/productversion.routes.js")(app);
require("./app/routes/order.routes.js")(app);
require("./app/routes/admin.routes.js")(app);
require("./app/routes/appconfig.routes.js")(app);
require("./app/routes/orderproductrelation.routes.js")(app);
require("./app/routes/placeOrder.routes.js")(app);
require("./app/routes/paymentType.routes.js")(app);
require("./app/routes/expenseCat.routes.js")(app);
require("./app/routes/expenseItem.routes.js")(app);
require("./app/routes/ItemUnit.routes.js")(app);
require("./app/routes/Rl_expense_cat_item.routes.js")(app);
require("./app/routes/Rl_expense_cat_item.routes.js")(app);
require("./app/routes/adminTable.routes.js")(app);
require("./app/routes/subscription.routes.js")(app);







// set port, listen for requests
app.listen(process.env.LISTEN_PORT, () => {
  console.log(`Server is running on port ${process.env.LISTEN_PORT}.`);
});
