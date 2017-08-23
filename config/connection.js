//-----------------
//Require statements
//-----------------
var mysql = require("mysql");
var connection;

if(process.env.JAWSDB_URL){
	connection = mysql.createConnection(process.env.JAWSDB_URL);
}
else {
connection = mysql.createConnection({
	database: "build_tracker",
	user: "root",
	password: "password",
	hostname: "localhost"
});
};

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