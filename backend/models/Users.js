const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Users = sequelize.define("Users", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
  },
  role: {
    type: DataTypes.ENUM("seller", "user"),
    allowNull: false,
    defaultValue: "user",
  },
});

// Export the model correctly
module.exports = Users;
