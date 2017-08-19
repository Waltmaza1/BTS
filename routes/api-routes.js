var db = require("../models");
var nodemailer = require('nodemailer');

function sendMail(email, message) {

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'buildtrackingsystem@gmail.com',
        pass: 'build123'
      }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Build Tracker" <buildtrackingsystem@gmail.com>', // sender address
        to: email, // list of receivers
        subject: 'Order Shipped ✔', // Subject line
        html: message, // html body
        
      };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message %s sent: %s', info.messageId, info.response);
    });
  }

module.exports = function(app) {

	app.post("/api/newuser", function(req, res) {
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

