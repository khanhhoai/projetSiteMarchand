// server.js
const express = require("express");
const sequelize = require("./db"); // Import sequelize from db.js

const port = 5000;
const route = require("./routes"); // Assuming you have routes defined

const app = express();
app.use(express.json());
app.use(require("cors")());

// Simple route for testing
app.get("/", (req, res) => {
  res.send("Welcome to the API!");
});

// Synchronize the database and start the server
sequelize.sync().then(() => {
  app.listen(5000, () =>
    console.log("Server started on http://localhost:5000")
  );
});

route(app);
