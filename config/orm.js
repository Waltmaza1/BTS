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
		var queryString = "update orders set serial_id = ?, station_completed = 1 where id = ?";
		connection.query(queryString, inputData, function(err, result){
			if (err){
				throw err;
			}
		console.log(queryString);
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
	getShipping: function(callback){
		var queryString = "select orders.id as orders_id, users.first_name as firstname, users.last_name as lastname,  products.sku as products_sku, orders.shipped_flag as shippedflag, email as email " +
						  "from orders " + 
						  "inner join products on products.id = orders.sku " +
						  "inner join users on users.id = orders.user_id";
       connection.query(queryString, function(err, result){
       	if (err){
       		throw err;
       	}
       	callback(result);
       });
	}

}

module.exports = orm;


