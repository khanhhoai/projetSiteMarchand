const express = require("express");
const dotenv = require('dotenv');
const mongoose = require("mongoose");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Route principale
app.get('/', (req, res) => {
  res.send('Hello World! everyone');
});

mongoose
     .connect(process.env.uri)
     .then(() => console.log( 'Database Connected' ))
     .catch(err => console.log( err ));
// Démarrage du serveur
app.listen(port, () => {
  console.log('Server is running in port: ', port);
});
