module.exports = function(sequelize, DataTypes) {
  var Transaction = sequelize.define("Transaction", {
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    from: DataTypes.STRING,
    amount: DataTypes.STRING,
    category: DataTypes.STRING,
    notes: DataTypes.STRING
  });
  return Transaction;
};
