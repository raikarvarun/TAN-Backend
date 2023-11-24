const sql = require("../config/db.js");

// constructor
const Subscription = function () {
	
};








Subscription.checkEligible = (adminid, mobileno, result) => {

	sql.query(`select * from customer where customerMobile="${mobileno}" and customerID in ( select customerID from ordertable where orderType = 8 and adminID= "${adminid}" )`, (err, res) => {
		if (err) {
			// console.log("error: ", err);
			result(null, err);
			return;
		}

		console.log("customer: ", res);
		result(null, res);
	});
};



Subscription.getOrderDataByID = (adminid, mobileno, result) => {

	let ans = {};
	sql.query(` select * from ordertable where orderType = 8 and adminID= ${adminid} and customerID in (select customerID from customer where customerMobile='${mobileno}');`, (err, res) => {

		//console.log("ordertable: ", res[0]);

		ans.ordertable = res[0];
		sql.query(`select * from orderProductRelation where adminID = ${adminid} and orderID=${ans.ordertable.orderID};`, (err1, res1) => {

			let productNos = [];
			let orderQuantitys = [];
			let orderSellingPrices = [];
			if(res1!=null) 
			{
				for(var i= 0 ; i<res1.length; i++){
					productNos.push(res1[i].productNo);
                    orderQuantitys.push(res1[i].orderQuantity);
                    orderSellingPrices.push(res1[i].orderSellingPrice);
				}
			}
			ans.productNos = productNos;
			ans.orderQuantitys = orderQuantitys;
			ans.orderSellingPrices = orderSellingPrices;
			result(null, ans);
		});
		

	});
};








module.exports = Subscription;
