const ProductVersionModel = require("../models/productversion.model");
const GlobalFun = require("../comman/globalFun")
const ProductModel = require("../models/product.model");
const PaymentModel = require("../models/payment.model");


exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a product
    const product = new ProductModel({
        productName: req.body.product.productName,
        adminID: req.user.adminID
    });

    // Save Customer in the database
    ProductModel.create(product, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Customer."
            });
        else {
            let ansdata = {product : data}
            console.log("product ;-   " +  ansdata)
            //newera 
            // Create a Customer
            const payment = new PaymentModel({
                paymentType: req.body.payment.paymentType,
                paymentDate: req.body.payment.paymentDate,
                adminID: req.user.adminID
            });

            // Save Customer in the database
            PaymentModel.create(payment, (err, data) => {
                if (err)
                    res.status(500).send({
                        message: err.message || "Some error occurred while creating the Customer."
                    });
                else {
                    ansdata.payment = data
                     //productVersion
                    const productVersion = new ProductVersionModel({
                        productVersionID : req.body.productVersion.productVersionID,
                        productType : req.body.productVersion.productType,
                        productPrice : req.body.productVersion.productPrice,
                        productQuntity : req.body.productVersion.productQuntity,
                        paymentDone    : req.body.productVersion.paymentDone,
                        productImage : req.body.productVersion.productImage,
                        paymentID : ansdata.payment.id,
                        dealerID : req.body.productVersion.dealerID,
                        productID : ansdata.product.id,
                        adminID : req.user.adminID
                      });
                    
                      // Save Customer in the database
                      ProductVersionModel.create(productVersion, (err, data) => {
                        if (err)
                          res.status(500).send({
                            message:
                              err.message || "Some error occurred while creating the Customer."
                          });
                        else {
                            ansdata.productVersion = data ; 
                            const appVersion = GlobalFun.genrate(req.user.adminID);
                            const ans = GlobalFun.genResponse(200, "Sucess", appVersion, ansdata)
                            res.send(ans);
                        }
                      });

                    
                   
                }
            });

        }
    });

}