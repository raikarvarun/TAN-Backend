const sql = require("../config/db.js");

// constructor
const Subscription = function(arg) {
  this.customerName = arg.customerName;
  this.customerTypeID = arg.customerTypeID;
  this.customerMobile = arg.customerMobile;
  this.adminID = arg.adminID;
  this.customerAddress = arg.customerAddress;
  this.customerOpeningAmount = arg.customerOpeningAmount;
  this.TotalAmount = arg.TotalAmount;
};

Subscription.create = (newCustomer, result) => {
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

Subscription.findById = (id, result) => {
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
Subscription.getAll = (adminid, result) => {
  

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

Subscription.checkEligible = (adminid , mobileno, result) => {
  
  
  sql.query(`select * from customer where customerMobile="${mobileno}" and customerID in ( select customerID from ordertable where orderType = 8 and adminID= "${adminid}" )` , (err, res) => {
    if (err) {
      // console.log("error: ", err);
      result(null, err);
      return;
    }

    // console.log("customer: ", res);
    result(null, res);
  });
};



Subscription.updateById = (id, customer, result) => {

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
      result(null, { id: id, ...customer });
    }
  );
};





module.exports = Subscription;
