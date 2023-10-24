const sql = require("../config/db.js");

// constructor
const Dealer = function(arg) {
  this.dealerFirstName = arg.dealerFirstName;
  this.dealerLastName = arg.dealerLastName;
  this.dealerMobile = arg.dealerMobile;

  this.adminID = arg.adminID;
};

Dealer.create = (newDealer, result) => {
  sql.query("INSERT INTO dealer SET ?", newDealer, (err, res) => {
    if (err) {
      // console.log("error: ", err);
      result(err, null);
      return;
    }

    // console.log("created tutorial: ", { id: res.insertId, ...newCustomer });
    result(null, { id: res.insertId, ...newDealer });
  });
};

Dealer.getAll = (adminid, result) => {
  sql.query("SELECT * FROM dealer where adminID = ?",adminid ,  (err, res) => {
    if (err) {
      // console.log("error: ", err);
      result(null, err);
      return;
    }

    // console.log("customer: ", res);
    result(null, res);
  });
};


// Customer.findById = (id, result) => {
//   sql.query(`SELECT * FROM customer WHERE CustomerID = ${id}`, (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(err, null);
//       return;
//     }
//
//     if (res.length) {
//       console.log("found tutorial: ", res[0]);
//       result(null, res[0]);
//       return;
//     }
//
//     // not found Customer with the id
//     result({ kind: "not_found" }, null);
//   });
// };





Dealer.updateById = (id, customer, result) => {
  sql.query(
    "UPDATE customer SET customerName = ?, customerType = ?, customerMobile = ? WHERE CustomerID = ?",
    [customer.customerName, customer.customerType , customer.customerMobile , id],
    (err, res) => {
      if (err) {
        // console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Customer with the id
        result({ kind: "not_found" }, null);
        return;
      }

      // console.log("updated tutorial: ", { id: id, ...customer });
      result(null, { id: id, ...customer });
    }
  );
};

// Customer.remove = (id, result) => {
//   sql.query("DELETE FROM customer WHERE id = ?", id, (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     }
//
//     if (res.affectedRows == 0) {
//       // not found Customer with the id
//       result({ kind: "not_found" }, null);
//       return;
//     }
//
//     console.log("deleted tutorial with id: ", id);
//     result(null, res);
//   });
// };



module.exports = Dealer;
