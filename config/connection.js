var mysql = require("mysql");

var connection = mysql.createConnection({
	database: "build_tracker",
	user: "root",
	password: "Bartsera1984",
	hostname: "localhost"
});


//-----------------
//Establish connection
//-----------------
connection.connect(function(err){
	if (err){
		throw err;
	}
	console.log("Connected as: " + connection.threadId);
});

module.exports = connection;