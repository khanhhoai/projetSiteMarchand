// models/Order.js
const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Orders = sequelize.define("Orders", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  products: {
    type: DataTypes.JSON,
    allowNull: false,
  },

  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "pending",
  },
  totalPrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

module.exports = Orders;
