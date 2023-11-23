const OrderModel = require("../models/order.model");
const GlobalFun = require("../comman/globalFun")
const PaymentModel = require("../models/payment.model");
const OrderProductRelation = require("../models/orderproductrelation.model");
const CustomerModel = require("../models/customer.model");
const ProductVersion = require("../models/productversion.model");
const AppConfig = require("../models/appconfig.model");



exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    console.log(req.body);
    //edit customerAmount 
    CustomerModel.findById(req.body.order.customerID, (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Not found Tutorial with id ${req.body.order.customerID}.`
              });
            } else {
              res.status(500).send({
                message: "Error retrieving Customer with id " + req.body.order.customerID
              });
            }
          } else {
            var data1 = data;
            //edit
            

            if(req.body.order.orderType==1){
              data1.TotalAmount +=   req.body.payment.remainingBalance;
            }
            else if(req.body.order.orderType==2){
              data1.TotalAmount -=   req.body.payment.remainingBalance;
            }
            else if(req.body.order.orderType==6){
              data1.TotalAmount +=   req.body.payment.remainingBalance;
            }
            else if(req.body.order.orderType==5){
              data1.TotalAmount -=   req.body.payment.remainingBalance;
            }
            else if(req.body.order.orderType==3)
            {
              data1.TotalAmount -=   req.body.payment.paymentAmount;
            }
            else if(req.body.order.orderType==4)
            {
              data1.TotalAmount +=   req.body.payment.paymentAmount;
            }
            CustomerModel.updateById(
              req.body.order.customerID,
              new CustomerModel(data1),
              (err, data) => {
                if (err) {
                  if (err.kind === "not_found") {
                    res.status(404).send({
                      message: `Not found Tutorial with id ${req.params.id}.`
                    });
                  } else {
                    res.status(500).send({
                      message: "Error updating Customer with id " + req.params.id
                    });
                  }
                } else {
                  var data2 = data;
                    
                }
              }
            );
          }
    });

    console.log("working fine");
    
    //Edit ProductVersion
    var temppronos = req.body.productNos;
    var temporqus = req.body.orderQuantitys;
    var temporsells =req.body.orderSellingPrices;
    var clen = temporqus.length;
    for(var i = 0 ; i < clen ; i++){
      ProductVersion.findById(temppronos[i], temporqus[i] ,temporsells[i], (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Tutorial with id ${temppronos[i]}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving Customer with id " + temppronos[i]
            });
          }
        } else {
          console.log(data.res);
          var data1 = new ProductVersion(data.res);
          var dataid = data.id;
          if(req.body.order.orderType==1){
            data1.productQuntity = data1.productQuntity- data.newProductQuntity;
            data1.salePrice = data.newProductsaleprice;
          }
          else if(req.body.order.orderType==2){
            data1.productQuntity = data1.productQuntity+ data.newProductQuntity;
            data1.purchasePrice = data.newProductsaleprice;
          }
          else if(req.body.order.orderType==6){
            data1.productQuntity = data1.productQuntity- data.newProductQuntity;
          }
          else if(req.body.order.orderType==5){
            data1.productQuntity = data1.productQuntity+ data.newProductQuntity;
          }
          
          ProductVersion.updateById( req.user.adminID,
            dataid,
            data1,
            (err, data) => {
              if (err) {
                if (err.kind === "not_found") {
                  res.status(404).send({
                    message: `Not found Tutorial with id ${temppronos[i]}.`
                  });
                } else {
                  res.status(500).send({
                    message: "Error updating Customer with id " + temppronos[i]
                  });
                }
              } else {
                var data2 = data;
                  
              }
            }
          );
        }
      }
      );

    }
    
    console.log("working fine 1");
    // AddPayment
    const payment = new PaymentModel({
      paymentType   : req.body.payment.paymentType,
      paymentDate  : req.body.payment.paymentDate,
      paymentAmount :req.body.payment.paymentAmount,
      adminID : req.user.adminID,
      remainingBalance :req.body.payment.remainingBalance,
      TotalBalance :req.body.payment.TotalBalance
    });
  
    // Save Customer in the database
    PaymentModel.create(payment, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Customer."
        });
      else {
        let ansData  = {payment : data}

        
          
            // Create a Customer
            const order = new OrderModel({
              orderDate : req.body.order.orderDate,
              paymentDone : req.body.order.paymentDone,
              customerID : req.body.order.customerID,
              paymentID : ansData.payment.paymentID,
              adminID : req.user.adminID,
              orderType : req.body.order.orderType,
              InvoiceNo : req.body.order.InvoiceNo
            });
          
            // Save Customer in the database
            OrderModel.create(order, (err, data) => {
              if (err)
                res.status(500).send({
                  message:
                    err.message || "Some error occurred while creating the Customer."
                });
              else {
                ansData.order = data
                
                
                    
                    // Create a Customer
                    const ModelData = new OrderProductRelation({
                      orderID : ansData.order.orderID,
                      productNo : req.body.productNos,
                      adminID : req.user.adminID,
                      orderQuantity : req.body.orderQuantitys,
                      orderSellingPrice : req.body.orderSellingPrices
                    });
                  
                    // Save Customer in the database
                    OrderProductRelation.create(ModelData, (err, data) => {
                      if (err)
                        res.status(500).send({
                          message:
                            err.message || "Some error occurred while creating the Customer."
                        });
                      else {
                        ansData.orderproductrelation = data
                        const appVersion = GlobalFun.genrate(req.user.adminID);
                        const ans = GlobalFun.genResponse(200 , "Sucess" , appVersion , ansData)
                        res.send(ans);
                      }
                    });
                  };
                
              
            });
          };

        
      
    });

    console.log("working fine 2");
  };

