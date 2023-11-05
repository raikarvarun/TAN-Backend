const sql = require("../config/db.js");

// constructor
const DataModel = function(arg) {
  this.expenseItemName = arg.expenseItemName;
  this.openingAmount = arg.openingAmount;
  this.adminID = arg.adminID;
};

DataModel.create = (newData, result) => {
  sql.query("INSERT INTO expenseItem SET ?", newData, (err, res) => {
    if (err) {
      // console.log("error: ", err);
      result(err, null);
      return;
    }

    // console.log("created tutorial: ", { id: res.insertId, ...newCustomer });
    result(null, { expenseItemID: res.insertId, ...newData });
  });
};

// PaymentType.findById = (id, result) => {
//   sql.query(`SELECT * FROM paymentType WHERE customerID = ${id}`, (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(err, null);
//       return;
//     }

//     if (res.length) {
//       result(null, res[0]);
//       return;
//     }

//     // not found Customer with the id
//     result({ kind: "not_found" }, null);
//   });
// };



//Geta ALl
DataModel.getAll = (adminid, result) => {
  

  sql.query("SELECT * FROM expenseItem WHERE adminID = ?", adminid, (err, res) => {
    if (err) {
      // console.log("error: ", err);
      result(null, err);
      return;
    }

    // console.log("customer: ", res);
    result(null, res);
  });
};



// PaymentType.updateById = (id, customer, result) => {

//   sql.query(
//     "UPDATE customer SET customerName = ?, customerTypeID = ?, customerMobile = ? , customerAddress=?, customerOpeningAmount=?,TotalAmount=? WHERE customerID = ?",
//     [customer.customerName, customer.customerTypeID , customer.customerMobile , customer.customerAddress, customer.customerOpeningAmount,customer.TotalAmount, id],
//     (err, res) => {
//       if (err) {
//         // console.log("error: ", err);
//         result(null, err);
//         return;
//       }

//       if (res.affectedRows == 0) {
//         // not found Customer with the id
//         result({ kind: "not_found" }, null);
//         return;
//       }

//       // console.log("updated tutorial: ", { id: id, ...customer });
//       result(null, { id: id, ...customer });
//     }
//   );
// };

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



module.exports = DataModel;
