var express = require("express");
var methodOverride = require("method-override");
var bodyParser = require("body-parser");
var login = require('./routes/api-routes.js');
var app = express();
var db = require("./models");
var PORT = process.env.PORT || 3000;


app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride("_method"));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

login(app);


db.sequelize.sync({}).then( function(){
	app.listen(PORT, function() {
    console.log("I got you on 3000");
});
});
