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
			sql.query(`select productName , orderQuantity,orderSellingPrice from (select * from orderProductRelation where orderID in  (select orderID from ordertable where orderType = 8 and adminID= ${adminid} and customerID=${ans.customer.customerID})) as orderdb1 left join product on orderdb1.productNo= product.productNo;`, (err1, res1) => {
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

Subscription.checkIfCancelEligible = (adminid, mobileNo ,  orderDate , orderType, result) => {

	sql.query(`select * from ordertable where CAST(orderDate AS DATE)="${orderDate}" and adminID = ${adminid} and orderType=${orderType} ; `, (err, res) => {
		if (err) {
			// console.log("error: ", err);
			result(null, err);
			return;
		} 


		result(null, res);

		//result(null, [ans]);
	});
};

Subscription.deleteSubscription = (adminid, orderID ,  paymentID , result) => {

	sql.query(`delete from orderProductRelation where orderID="${orderID}" and adminID = ${adminid} ; `, (err, res) => {
		if (err) {
			// console.log("error: ", err);
			result(null, err);
			return;
		} 

		sql.query(`delete from ordertable where orderID="${orderID}" and adminID = ${adminid} ; `, (err1, res1) => {
			if (err1) {
				// console.log("error: ", err);
				result(null, err1);
				return;
			} 

			sql.query(`delete from payment where paymentID="${paymentID}" and adminID = ${adminid} ; `, (err2, res2) => {
				if (err2) {
					// console.log("error: ", err);
					result(null, err2);
					return;
				} 
				result(null, res2);
	
			});


		});
	
		

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
