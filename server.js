var express = require("express");
var methodOverride = require("method-override");
var bodyParser = require("body-parser");
var apiRoutes = require('./routes/api-routes.js');
var htmlRoutes = require('./routes/html-routes.js');
var app = express();
var exphbs = require("express-handlebars");
var db = require("./models");
var connection = require("./config/connection.js")
var orm = require("./config/orm.js");

var PORT = process.env.PORT || 3000;


app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride("_method"));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

apiRoutes(app);
htmlRoutes(app);
app.get("/shipping", function(req,res){
		console.log("something");
	orm.getShipping(function(callback){
		console.log(callback);
		res.render("shipping", { data: callback});
	});
});


db.sequelize.sync({}).then( function(){
	app.listen(PORT, function() {
    console.log("I got you on 3000");
});
});
