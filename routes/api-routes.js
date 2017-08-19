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

	app.get("/api/orders-ready", function(req, res) {

		db.orders.findAll({
			where : {
				shipped_flag : true
			}
		}).then(function(orderdata) {
			if(orderdata.length!=0){
				db.users.findAll({
					where : {
						id : orderdata[0].user_id
					}
				}).then(function(userdata){
					console.log(JSON.stringify(userdata));
					console.log(userdata[0].email);
					var note = "<br><br><br>Thank You<br>BTS"
					var message = "<h3>Item Shipped!</h3><h4>Order details</h4>"+
					"Name: "+userdata[0].first_name + " " + userdata[0].last_name+
					"<br>"+"Address: "+ userdata[0].street+", "+ userdata[0].city +
					"<br>"+"Item: " + orderdata[0].sku + note;

					sendMail(userdata[0].email, message);
					res.json(userdata)

				});
			}
		});

	});

	app.get("/api/orderssku-report", function(req, res) {
		db.orders.findAll({
			attributes: ['sku', [db.sequelize.fn('count', db.sequelize.col('sku')), 'count']],
			group: ['sku']
		}).then(function(orderpersku) {
			if(orderpersku.length!=0){

				res.json(orderpersku);

			}
		});
	});

	app.get("/api/ordersShipped-report", function(req, res) {
    db.orders.findAll({
      attributes: ['sku', [db.sequelize.fn('count', db.sequelize.col('sku')), 'count']],
      where : {
        shipped_flag : true
      },
      group: ['sku']
    }).then(function(ordershipped) {
      if(ordershipped.length!=0){

        res.json(ordershipped);

      }
    });
  });

	app.get("/api/quality-report", function(req, res) {
    db.quality.findAll({
      attributes: ['sku', [db.sequelize.fn('count', db.sequelize.col('sku')), 'count']],
      where : {
        passed : true
      },
      group: ['sku']
    }).then(function(qualitydata) {
      if(qualitydata.length!=0){

        res.json(qualitydata);

      }
    });
  });

	app.get("/api/products", function(req, res) {
    db.products.findAll({}).then(function(productdata) {
      if(productdata.length!=0){
        res.json(productdata);
      }
    });
  });

};

