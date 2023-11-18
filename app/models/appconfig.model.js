const sql = require("../config/db.js");

// constructor
const AppConfig = function(arg) {
  this.appconfigID = arg.appconfigID;
  this.appconfigName = arg.appconfigName;
  this.appconfigVersion = arg.appconfigVersion;
};



AppConfig.getAll = (id, result) => {
  sql.query(`SELECT * FROM appConfig WHERE adminID = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

   
      result(null, res);
      
  });
};


AppConfig.updateById = (adminID, appconfig, result) => {
  sql.query(
    "UPDATE appConfig SET appconfigVersion = ? WHERE adminID = ? AND appconfigName = ?",
    [appconfig.appconfigVersion , adminID , appconfig.appconfigName],
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
      result(null, { ...appconfig });
    }
  );
};

// AppConfig.create = (newCustomer, result) => {
//   sql.query("INSERT INTO customer SET ?", newCustomer, (err, res) => {
//     if (err) {
//       // console.log("error: ", err);
//       result(err, null);
//       return;
//     }

//     // console.log("created tutorial: ", { id: res.insertId, ...newCustomer });
//     result(null, { id: res.insertId, ...newCustomer });
//   });
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

// AppConfig.getAll = (title, result) => {
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

module.exports = AppConfig;
