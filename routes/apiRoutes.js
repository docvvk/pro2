var Transaction = require("../models/budget.js");

module.exports = function(app) {

  // Show all transactions
  app.get("/api/all", function(req, res) {
    Transaction.findAll({}).then(function(results) {
      res.json(results);
    });
  });

  app.post("/api/new", function(req, res) {
    console.log("Transaction Data: ");
    console.log(req.body);

    Transaction.create(req.body).then(function(results) {
      res.end();
    });
  });


};
