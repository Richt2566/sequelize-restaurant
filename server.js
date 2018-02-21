var express = require("express");
var bodyParser = require("body-parser");

var PORT = process.env.PORT || 3000;
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

require("./routes/api-routes.js")(app);

var db = require("./models");

db.sequelize.sync().then(function(){
	app.listen(PORT, function() {
  		console.log("App listening on PORT " + PORT);

	});
});
