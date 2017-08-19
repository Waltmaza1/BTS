var db = require("../models");

module.exports = function(app) {

    app.post("/api/newuser", function(req, res) {
        // exports.register = function(req, res) {
            // console.log("req",req.body);
            // var today = new Date();
        db.users.create({
        	
			first_name: req.body.firstname,
			last_name: req.body.lastname,
			user_name: req.body.username,
			password: req.body.password,
			email: req.body.email,
			street: req.body.street,
			city: req.body.city,
			state: req.body.state,
			zip_code: req.body.zipcode,
			phone_number: req.body.phone,
			type: req.body.usertype
		}).then(function(userdata){
			res.redirect("/")
		})
    });
  };

