var db = require("../models");
var path = require("path");

module.exports = function(app) {
  
  app.get("/dataChart", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/dataChart.html"));
  }); // used here for now

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
