// db.js (or sequelize.js)
const { Sequelize } = require("sequelize");

// Initialize Sequelize with SQLite configuration
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite", // Adjust the database path if needed
});

// Ensure that sequelize is being exported correctly
module.exports = sequelize;
