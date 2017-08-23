var db = require("../models");
var nodemailer = require('nodemailer');
var bcrypt = require('bcrypt');
const saltRounds = 10;
var userID;
var orm = require("../config/orm.js");

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
      db.users.findAll({
        where :{
          user_name : req.body.username
        }
      }).then(function(data){
        if(data == ""){
          var myPlaintextPassword = req.body.password;
          hashPassword(myPlaintextPassword);
          function hashPassword(myPlaintextPassword){
            bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
              
              db.users.create({
                first_name: req.body.firstname,
                last_name: req.body.lastname,
                user_name: req.body.username,
                password: hash,
                email: req.body.email,
                street: req.body.street,
                city: req.body.city,
                state: req.body.state,
                zip_code: req.body.zipcode,
                phone_number: req.body.phone,
                type: req.body.usertype
              }).then(function(userdata){
                res.redirect("/")
              });
            });

          }
        } else {
          res.render("newUser", {userexists : "username already existing!"});
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
      console.log("/api/ordersShipped-report");
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
          res.render("products", {data: productdata});
        }
      });
    });
    
    app.post("/api/new-order", function(req, res) {
      if(!(userID == "")){
        db.orders.create({
          user_id: userID,
          station_completed: req.body.station_completed,
          shipped_flag: req.body.shipped_flag,
          sku: req.body.sku,
          date_created: db.sequelize.fn('NOW'),
        }).then(function(neworder) {
          res.json(neworder);
        })
        .catch(function(err) {
          console.log(err);
        });
      }
    });


    app.post("/login", function(req, res) {
      userID = "";
      db.users.findOne({
        where: {
          user_name: req.body.username
        }
      }
      ).then(function(user) {

        let myPlaintextPassword = req.body.password;
        comparePassword(res, user.password, myPlaintextPassword);
        function comparePassword(res, hash, myPlaintextPassword){
          bcrypt.compare(myPlaintextPassword, hash, function(err, response) {
          if(response == true){
          if(user.type == 0){
            userID = user.id;
            console.log('user: ' + userID);
            res.redirect('/api/products');
          }
          else if(user.type == 1){
            res.redirect('/admin');
          }
        }
        else {
          console.log("password doesn't match");
          res.render("login", {passwordmismatch : "Incorrect username or password!"});
        }
      });
        }
      })
      .catch(function(err) {
        console.log(err);
        res.render("login", {usernotexisting : "username doesn't exist!"});
      });
    });

    app.get("/allOrders", function(req, res){
      orm.selectAllOrders(function(callBack){
        res.render("index", {data: callBack});
      });
    });

    app.get("/warehouse/:id", function(req, res){
      orm.selectOneOrder(req.params.id, function(callBack){
        res.render("warehouse", {data: callBack});

      });
    });

    app.post("/warehouse-submit/:id", function(req, res){
      orm.updateSerialID([req.body.scan, req.params.id], function(err, result){
        if(err) {
          console.log('e ' + err);
        }
        orm.selectAllOrders(function(result){
          res.render("index", {data: result});
        });
      });

    });

    app.get("/quality", function(req, res){
      res.render("quality");
    });

    app.get("/quality-confirm", function(req, res){
      orm.getQuality(req.query.scan, function(callBack){
        res.render("quality-confirm", {data: callBack});
      });
    });


    // app.post("/quality-confirm-insert/:id/:sku", function(req, res){
    //   orm.addQuality([req.params.id, req.params.sku, req.body.optradio], function(callBack){
    //     res.render("quality");
    //   });

    // });

    app.get("/logout", function(req, res){
      userID = "";
      res.render("login");
    });


    app.post("/quality-confirm-insert/:id/:sku/:order", function(req, res){
      orm.addQuality([req.params.id, req.params.sku, req.body.optradio, req.params.order], function(callBack){
        res.render("quality");
      });

    });
    app.get("/shipping-update/", function(req, res){
      orm.getShippingOrders(req.query.scan, function(callback){
        res.render("shipping-done", { data: callback});
      });
    });

    app.post("/insert-shipping/:id", function(req,res){
      orm.insertShipping(req.params.id, function(callback){
        var note = "<br><br><br>Thank You<br>BTS"
        var message = "<h3>Item Shipped!</h3><h4>Order details</h4>"+
        "Name: "+callback[0].first_name + " " + callback[0].last_name+
        "<br>"+"Address: "+ callback[0].street+", "+ callback[0].city + ", "+ callback[0].state + ", "+ callback[0].zip_code +
        "<br>"+"Product Ordered: " + callback[0].product_name +
        "<br>"+"Order placed on: " + callback[0].date_created + note;
        sendMail(callback[0].email, message);
        res.render("shipping-complete", { data: callback});
      });
    });
    
  }