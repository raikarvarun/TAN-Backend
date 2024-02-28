const MainModel = require("../models/subscription.model");
const GlobalFun = require("../comman/globalFun")
const AppConfig = require("../models/appconfig.model");



exports.checkEligible = (req, res) => {
    const adminid = req.user.adminID;
    const mobileNo = req.query.mobileno;
    

    MainModel.checkEligible(adminid, mobileNo, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        else { 
            const ans = GlobalFun.genResponse(200, "Sucess", null, data)
            // if (data.length == 1) {
            //     res.send({ "iseligible": 1 });
            // }
            // else
            //     res.send({ "iseligible": 0 });
            res.send(data);
        }
    });
};

exports.checkIfCancelEligible = (req, res) => {
    const adminid = req.user.adminID;
    const mobileNo = req.query.mobileno;
    const orderType = req.query.ordertype;
    const orderDate = req.query.orderdate;

    


    MainModel.checkIfCancelEligible(adminid, mobileNo , orderDate , orderType, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        else { 
            const ans = GlobalFun.genResponse(200, "Sucess", null, data)
            // if (data.length == 1) {
            //     res.send({ "iseligible": 1 });
            // }
            // else
            //     res.send({ "iseligible": 0 });
            res.send(data);
        }
    });
};
exports.deleteSubscription = (req, res) => {
    const adminid = req.user.adminID;
    const orderID = req.query.orderid;
    const paymentID = req.query.paymentid;
    

    


    MainModel.deleteSubscription(adminid, orderID , paymentID , (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        else { 
            const ans = GlobalFun.genResponse(200, "Sucess", null, null);
            // if (data.length == 1) {
            //     res.send({ "iseligible": 1 });
            // }
            // else
            //     res.send({ "iseligible": 0 });
            res.send(ans);
        }
    });
};
exports.getOrderDataByID = (req, res) => {
    const adminid = req.user.adminID;
    const mobileNo = req.query.mobileno;

    MainModel.getOrderDataByID(adminid, mobileNo, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        else {
            res.send(data);
        }
    });
};




