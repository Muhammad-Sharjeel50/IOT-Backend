const express = require("express");
const bodyParser = require("body-parser");
const sensorRouter = require("./Routes/sensor");
const db = require("./Database/db");

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/sensor", sensorRouter); // Define routes for sensor data

// Connect to MySQL database
db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL database");
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
