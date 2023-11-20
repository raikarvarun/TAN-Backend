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



module.exports = AppConfig;
