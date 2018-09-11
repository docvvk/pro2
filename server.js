var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("public"));

//routes
require("./routes/apiRoutes.js")(app);

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
