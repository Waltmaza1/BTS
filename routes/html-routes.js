var path = require("path");


module.exports = function(app) {
	app.get("/", function(req, res) {
		res.sendFile(path.join(__dirname, "../public/index.html"));
	});
	app.get("/orders", function(req, res) {
		res.sendFile(path.join(__dirname, "../public/orders.html"));
	});
	app.get("/products", function(req, res) {
		res.sendFile(path.join(__dirname, "../public/products.html"));
	});
	app.get("/newUser", function(req, res) {
		res.sendFile(path.join(__dirname, "../public/newUser.html"));
	});
}