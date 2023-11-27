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


		let ans = {};
		if (res.length > 0) {
			ans.customer = res[0];
			sql.query(`select productName , orderQuantity,orderSellingPrice from (select * from orderProductRelation where orderID in  (select orderID from ordertable where orderType = 8 and adminID= ${adminid})) as orderdb1 left join productversion on orderdb1.productNo= productversion.productNo;`, (err1, res1) => {
				ans.products = [];
				for(var item in res1) {
					ans.products.push(res1[item]);
				}
				
				
				result(null, [ans]);
			});
		}
		else
			result(null, []);

		//result(null, [ans]);
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
			if (res1 != null) {
				for (var i = 0; i < res1.length; i++) {
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
