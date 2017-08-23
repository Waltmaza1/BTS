var express = require("express");
var methodOverride = require("method-override");
var bodyParser = require("body-parser");
var app = express();
var PORT = process.env.PORT || 3000;
// Requiring our models for syncing
var db = require("./models");
var connection = require("./config/connection.js");
var exphbs = require("express-handlebars");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(bodyParser.text());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);
require("./test/route-test.js")(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({}).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});