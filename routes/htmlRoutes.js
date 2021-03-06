var db = require("../models");
var path = require("path");

module.exports = function(app) {

  app.get("/index", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  }); 
  
  app.get("/dataChart", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/dataChart.html"));
  }); // used here for now

  app.get("/transaction", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/transactions.html"));
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    // res.render("404");
  });
};
