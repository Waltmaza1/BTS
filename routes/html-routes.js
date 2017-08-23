var path = require("path");


module.exports = function(app) {
	app.get("/", function(req, res) {
		res.render("login");
	});
	app.get("/admin", function(req, res) {
		res.render("admin");
	});

	app.get("/newUser", function(req, res) {
		res.render("newUser");
	});

	app.get("/reports", function(req, res) {
		res.render("report");
	});

	app.get("/shipping", function(req,res){
        res.render("shipping");
    });
	
}