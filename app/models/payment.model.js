const sql = require("../config/db.js");

// constructor
const Payment = function(arg) {
  this.paymentType = arg.paymentType;
  this.paymentDate = arg.paymentDate;
  this.paymentAmount =arg.paymentAmount,
  this.adminID = arg.adminID;
  this.remainingBalance = arg.remainingBalance;
  this.TotalBalance = arg.TotalBalance;

};

Payment.create = (newCustomer, result) => {
  sql.query("INSERT INTO payment SET ?", newCustomer, (err, res) => {
    if (err) {
      // console.log("error: ", err);
      result(err, null);
      return;
    }

    // console.log("created tutorial: ", { id: res.insertId, ...newCustomer });
    result(null, { paymentID: res.insertId, ...newCustomer });
  });
};

// Payment.findById = (id, result) => {
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
//     // not found Payment with the id
//     result({ kind: "not_found" }, null);
//   });
// };

Payment.getAll = (adminID, result) => {
  

 
  sql.query("SELECT * FROM payment WHERE adminID = ?",adminID ,  (err, res) => {
    if (err) {
      // console.log("error: ", err);
      result(null, err);
      return;
    }

    // console.log("customer: ", res);
    result(null, res);
  });
};



Payment.updateById = (id, payment, result) => {
  sql.query(
    "UPDATE payment SET paymentDone = ?, paymentType = ?, paymentDate = ? WHERE paymentID = ?",
    [payment.paymentDone, payment.paymentType , payment.paymentDate , id],
    (err, res) => {
      if (err) {
        // console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Payment with the id
        result({ kind: "not_found" }, null);
        return;
      }

      // console.log("updated tutorial: ", { id: id, ...customer });
      result(null, { id: id, ...payment });
    }
  );
};

// Payment.remove = (id, result) => {
//   sql.query("DELETE FROM customer WHERE id = ?", id, (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     }
//
//     if (res.affectedRows == 0) {
//       // not found Payment with the id
//       result({ kind: "not_found" }, null);
//       return;
//     }
//
//     console.log("deleted tutorial with id: ", id);
//     result(null, res);
//   });
// };



module.exports = Payment;
