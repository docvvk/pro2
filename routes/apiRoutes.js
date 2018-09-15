var db = require("../models");

module.exports = function(app) {

// Show all transactions
  app.get("/api/all", function(req, res) {
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

  app.put("/api/new/:id", function(req, res) {
    db.Transaction.update(req.body,
      {
        where: {
          id: req.params.id
        }
      })
      .then(function(dbPost) {
        console.log(dbPost);
        res.json(dbPost);
      });
  });


  app.get("/api/with", function(req, res) {
    db.Transaction.findAll({
      where: {
        type: "withdrawl"
      }
    }).then(function(results) {
      res.json(results);
    });
  });

  app.get("/api/dep", function(req, res) {
    db.Transaction.findAll({
      where: {
        type: "deposit"
      }
    }).then(function(results) {
      res.json(results);
    });
  });
};
