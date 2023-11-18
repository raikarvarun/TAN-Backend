const sql = require("../config/db.js");
const jwt = require("jsonwebtoken");


// constructor
const AdminTable = function(arg) {
  this.adminEmail = arg.adminEmail;
  this.adminPassword = arg.adminPassword;
  this.adminToken = arg.adminToken ; 
  this.isAdmin = arg.isAdmin ; 

};

AdminTable.create = (newData, result) => {
  sql.query("INSERT INTO adminTable SET ?", newData, (err, res) => {
    if (err) {
      // console.log("error: ", err);
      result(err, null);
      return;
    }

    // console.log("created tutorial: ", { id: res.insertId, ...newCustomer });
    result(null, { adminID: res.insertId, ...newData });
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

// Admin.getAll = (title, result) => {
//   let query = "SELECT * FROM customer";

//   // if (title) {
//   //   query += ` WHERE title LIKE '%${title}%'`;
//   // }

//   sql.query(query, (err, res) => {
//     if (err) {
//       // console.log("error: ", err);
//       result(null, err);
//       return;
//     }

//     // console.log("customer: ", res);
//     result(null, res);
//   });
// };



// Admin.updateById = (id, customer, result) => {
//   sql.query(
//     "UPDATE customer SET customerName = ?, customerType = ?, customerMobile = ? WHERE CustomerID = ?",
//     [customer.customerName, customer.customerType , customer.customerMobile , id],
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



module.exports = AdminTable;
