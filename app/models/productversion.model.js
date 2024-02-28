const sql = require("../config/db.js");

// constructor
const ProductVersion  = function(arg) {
  this.productType = arg.productType;
  this.productPrice = arg.productPrice;
  this.productQuntity = arg.productQuntity;
  this.productImage = arg.productImage;
  this.adminID = arg.adminID;
  this.productName = arg.productName;
  this.openingQuantity = arg.openingQuantity;
  this.atprice = arg.atprice;
  this.salePrice = arg.salePrice;
  this.purchasePrice = arg.purchasePrice;
  
};

ProductVersion .create = (newProduct, result) => {
  sql.query("INSERT INTO product SET ?", newProduct, (err, res) => {
    if (err) {
      // console.log("error: ", err);
      result(err, null);
      return;
    }

    // console.log("created tutorial: ", { id: res.insertId, ...newCustomer });
    result(null, { productNo: res.insertId, ...newProduct });
  });
};

ProductVersion.findById = (id, newProductQuntity , newProductsaleprice, result) => {
  sql.query(`SELECT * FROM product WHERE productNo = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      result(null, {id:id ,newProductQuntity:newProductQuntity , newProductsaleprice: newProductsaleprice , res :res[0]});
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};

ProductVersion.getAll = (adminID,  result) => {
   

  sql.query("SELECT * FROM product where adminID = ?",adminID, (err, res) => {
    if (err) {
      
      result(null, err);
      return;
    }

    // console.log("customer: ", res);
    result(null,res);
  });
};



ProductVersion.updateById = (adminID, id,   product, result) => {
  sql.query(
    "UPDATE product SET productType = ?, productPrice = ?, productQuntity = ? ,productImage = ?, productName = ?, openingQuantity = ? ,atprice = ?, salePrice = ?, purchasePrice = ? WHERE productNo = ? and adminID = ?",
    [product.productType,product.productPrice,product.productQuntity,product.productImage,product.productName,product.openingQuantity,product.atprice,product.salePrice,product.purchasePrice, id , adminID],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Customer with the id
        result({ kind: "not_found" }, null);
        return;
      }

      // console.log("updated tutorial: ", { id: id, ...customer });
      result(null, { productNo: id, ...product });
    }
  );
};

ProductVersion.remove = (adminID,id, result) => {
  sql.query("DELETE FROM product WHERE productNo = ? and adminID = ?", [id,adminID], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      
      result({ kind: "not_found" }, null);
      return;
    }

    
    result(null, res);
  });
};



module.exports = ProductVersion ;
