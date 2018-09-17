module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "Username already exists"
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    googleId: {
      type: DataTypes.STRING
    },
    thumbnail: {
      type: DataTypes.STRING
    }
  });
  return User;
};
