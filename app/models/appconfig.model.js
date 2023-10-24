const sql = require("../config/db.js");

// constructor
const AppConfig = function(arg) {
  this.appVersion = arg.appVersion;
};



AppConfig.findById = (id, result) => {
  sql.query(`SELECT appVersion FROM appconfig WHERE adminID = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      //console.log("found tutorial: ", res[0]);
      const data = { "data" : res[0]}
      result(null, data);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};


AppConfig.updateById = (adminID, appconfig, result) => {
  sql.query(
    "UPDATE appconfig SET appVersion = ? WHERE adminID = ?",
    [appconfig.appVersion , adminID],
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
