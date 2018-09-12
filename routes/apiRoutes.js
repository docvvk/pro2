// var Transaction = require("../models/budget.js");

var db = require("../models");

module.exports = function(app) {

// Show all transactions
  app.get("/api/all", function(req, res) {
    db.Transaction.findAll({}).then(function(results) {
      res.json(results);
    });
  });

  app.get("/api/all/init", function(req, res) {
    db.Transaction.findAll({}).then(function(results) {
      res.json(results);
    });
  });

  app.post("/api/new", function(req, res) {
    console.log("Transaction Data: ");
    console.log(req.body);

    db.Transaction.create(req.body).then(function(results) {
      res.end();
    });
  });


};
