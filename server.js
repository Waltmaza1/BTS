var express = require("express");
var methodOverride = require("method-override");
var bodyParser = require("body-parser");
var app = express();
var PORT = process.env.PORT || 3000;


app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride("_method"));





app.listen(PORT, function(){
	console.log("I got you on 3000");
});