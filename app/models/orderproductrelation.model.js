const { query } = require("express");
const sql = require("../config/db.js");

// constructor
const OrderProductRelation  = function(arg) {
  this.orderID = arg.orderID;
  this.productNo = arg.productNo;
  this.orderQuantity = arg.orderQuantity;
  this.orderSellingPrice = arg.orderSellingPrice;
  this.adminID = arg.adminID;
};

OrderProductRelation .create = (newProduct, result) => {


  // edit 
  

  let query = "INSERT INTO orderProductRelation(orderID , productNo , orderQuantity ,orderSellingPrice, adminID) VALUES "
  const length1 = newProduct.productNo.length -1
  if(length1==-1)
  {
    result(null, null);
    return;
  }
  for(i in newProduct.productNo){
    query+= "( " + newProduct.orderID +","+newProduct.productNo[i] + "," +newProduct.orderQuantity[i] + "," +newProduct.orderSellingPrice[i] + ","+newProduct.adminID +" )"
    if(length1==i){
      query+=";"
    }
    else{
      query+=","
    }
  }
  sql.query(query, (err, res) => {
    if (err) {
      // console.log("error: ", err);
      result(err, null);
      return;
    }

    // console.log("created tutorial: ", { id: res.insertId, ...newCustomer });
    result(null, { id: res.insertId, ...newProduct });
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

OrderProductRelation .getAll = (adminID, result) => {
  

  sql.query("SELECT * FROM orderProductRelation where adminID = ?",adminID, (err, res) => {
    if (err) {
      // console.log("error: ", err);
      result(null, err);
      return;
    }

    // console.log("customer: ", res);
    result(null, res);
  });
};



OrderProductRelation.updateById = (id, customer, result) => {
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



module.exports = OrderProductRelation ;
