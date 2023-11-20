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



//Geta ALl
AdminTable.getAll = (isAdmin, result) => {
  

  sql.query("SELECT * FROM adminTable WHERE isAdmin = ?", isAdmin, (err, res) => {
    if (err) {
      // console.log("error: ", err);
      result(null, err);
      return;
    }

    // console.log("customer: ", res);
    result(null, res);
  });
};




module.exports = AdminTable;
