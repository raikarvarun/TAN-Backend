const sql = require("../config/db.js");

// constructor
const Customer = function(arg) {
  this.customerName = arg.customerName;
  this.customerTypeID = arg.customerTypeID;
  this.customerMobile = arg.customerMobile;
  this.adminID = arg.adminID;
  this.customerAddress = arg.customerAddress;
  this.customerOpeningAmount = arg.customerOpeningAmount;
  this.TotalAmount = arg.TotalAmount;
};

Customer.create = (newCustomer, result) => {
  sql.query("INSERT INTO customer SET ?", newCustomer, (err, res) => {
    if (err) {
      // console.log("error: ", err);
      result(err, null);
      return;
    }

    // console.log("created tutorial: ", { id: res.insertId, ...newCustomer });
    result(null, { customerID: res.insertId, ...newCustomer });
  });
};

Customer.findById = (id, result) => {
  sql.query(`SELECT * FROM customer WHERE customerID = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      result(null, res[0]);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};



//Geta ALl
Customer.getAll = (adminid, result) => {
  

  sql.query("SELECT * FROM customer WHERE adminID = ?", adminid, (err, res) => {
    if (err) {
      // console.log("error: ", err);
      result(null, err);
      return;
    }

    // console.log("customer: ", res);
    result(null, res);
  });
};



Customer.updateById = (id, customer, result) => {
  
  sql.query(
    "UPDATE customer SET customerName = ?, customerTypeID = ?, customerMobile = ? , customerAddress=?, customerOpeningAmount=?,TotalAmount=? WHERE customerID = ?",
    [customer.customerName, customer.customerTypeID , customer.customerMobile , customer.customerAddress, customer.customerOpeningAmount,customer.TotalAmount, id],
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
      result(null, { customerID: id, ...customer });
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



module.exports = Customer;
