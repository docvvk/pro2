var Sequelize = require("sequelize");

var sequelize = require("../config/connection.js");

var Transaction = sequelize.define("transaction", {
  author: Sequelize.STRING,
  type: Sequelize.STRING,
  from: Sequelize.STRING,
  amount: Sequelize.STRING,
  category: Sequelize.STRING,
  notes: Sequelize.STRING,
  created_at: Sequelize.DATE
});

Transaction.sync();

module.exports = Transaction;
