//-----------------
//Require statements
//-----------------
var connection = require("./connection.js");

var orm = {
	selectAllOrders: function(callBack){
		var queryString = "select orders.id as order_id, first_name, last_name, station_completed, orders.date_created, products.sku, shipped_flag " +
		"from users " +
		"inner join orders on users.id = orders.user_id " +
		"inner join products on orders.sku = products.id " +
		"where station_completed = 0";
		connection.query(queryString, function(err, result){
			if (err){
				throw err;
			}
			callBack(result);
		});
	},
	selectOneOrder: function(inputID, callBack){
		var queryString = "select orders.id as orders_id, station_completed, date_created, products.sku as products_sku " +
		"from orders " +
		"inner join products on products.id = orders.sku " +
		"where orders.id = ?";
		connection.query(queryString, inputID, function(err, result){
			if(err){
				throw err;
			}
			callBack(result);
		});
	},
	updateSerialID: function(inputData, callback){
		console.log(inputData);
		var queryStringCheck = "select * from kits where serial_id = ?";
		connection.query(queryStringCheck, inputData[0], function(err, result) {
			var error;
			if (err || result.length === 0) {
				error = new Error("INVALID SERIAL NUMBER");
			} else {
				var queryString = "update orders set serial_id = ?, station_completed = 1 where id = ?";
				connection.query(queryString, inputData, function(err, result) {
					if (err) {
						throw err;
					}
					console.log(queryString);
				});
			}
			callback(error, {});
		});	
	},
	getQuality: function(inputData, callBack){
		var queryString = "select kits.serial_id as serial_id, orders.id as orders_id, products.sku as products_sku, stations.station_name  as station_name " +
		"from kits " +
		"inner join orders on orders.serial_id = kits.serial_id " +
		"inner join stations on stations.id = orders.station_completed " +
		"inner join products on kits.sku = products.id " +
		"where kits.serial_id = ? AND orders.station_completed = 1";
		connection.query(queryString, inputData, function(err, result){
			if (err){
				throw err;
			}
			callBack(result);
		});
	},
	addQuality: function(input, callBack){
		console.log(input);

		var queryString = "insert into quality (serial_id, sku, passed, date_created) " +
		"values (?,?,?, NOW())";
		connection.query(queryString, input, function(err, result){
			if (err){
				throw err;
			};
			callBack(result);
		});

		console.log("Input[3]: "+input[3]);
		if(input[2] == 1) {
			var queryString = "update orders " +
			"set station_completed = 2 " +
			"where id = ?";
			connection.query(queryString, input[3], function(err, result){
				if (err){
					throw err;
				};
				console.log(result);
			});
		}
	},

	getShippingOrders: function(inputData, callback){
		console.log(inputData);
		var queryString ="select kits.serial_id as serial_id, orders.id as orders_id, products.product_name as product_name, stations.id as station_id, station_name " +
		"from kits " +
		"inner join orders on orders.serial_id = kits.serial_id " +
		"inner join products on products.id = orders.sku " +
		"inner join stations on stations.id = orders.station_completed " +
		"inner join quality on quality.serial_id = orders.serial_id " +
		"where kits.serial_id = ? and stations.id = 2 and quality.passed = 1";
		connection.query(queryString, inputData, function(err, result){
			if (err){
				throw err;
			};
			console.log(result);
			callback(result);
		});
	},
	insertShipping: function(data,callBack){
		var queryString ="update orders " +
		"set station_completed = 3, shipped_flag = true " +
		"where id = ? ";
		connection.query(queryString, data, function(err,result){
			if (err){
				throw err;
			};
			console.log(result);

		});


		var queryString = "select orders.id as order_id, first_name, last_name, email, street, city, state, zip_code, station_completed, orders.date_created, products.product_name, shipped_flag " +
		"from users " +
		"inner join orders on users.id = orders.user_id " +
		"inner join products on orders.sku = products.id " +
		"where station_completed = 3 and orders.id = ?";
		connection.query(queryString, data, function(err,result){
			if (err){
				throw err;
			};
			console.log(result);
			callBack(result);
		});
	},
}

module.exports = orm;


