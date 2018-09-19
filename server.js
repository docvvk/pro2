var express = require("express");
var bodyParser = require("body-parser");
var db = require("./models");
var authRoutes = require("./routes/authRoutes");
var profileRoutes = require("./routes/profileRoutes");

var passportSetup = require("./config/passport-setup");
var passport = require("passport");
var cookieSession = require('cookie-session');
var keys = require("./config/keys");
var env = require('dotenv').load();

var app = express();
var PORT = process.env.PORT || 3000;

//set view engine
app.set('view engine', 'ejs');

//sey up session cookies
app.use(cookieSession({
  maxAge: 60000,
  keys: [keys.session.cookieKey]
}));

//initialize passport -- set up cookie-session
app.use(passport.initialize());
app.use(passport.session());

// Sets up the express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("public"));

//set up routes
app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);

app.get("/", function (req, res) { 
  res.render("index", {user: req.user});
 });

//apiRoutes
require("./routes/apiRoutes.js")(app);
require("./routes/htmlRoutes.js")(app);


db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on http://localhost:" + PORT);
  });
});
