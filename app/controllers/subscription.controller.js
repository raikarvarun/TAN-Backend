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
            if (data.length == 1) {
                res.send({ "iseligible": 1 });
            }
            else
                res.send({ "iseligible": 0 });

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




