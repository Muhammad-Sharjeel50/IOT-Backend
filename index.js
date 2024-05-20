const express = require("express");
const sensorRouter = require("./Routes/sensor");
const db = require("./Database/db");
const app = express();
const port = 3000;
const cors = require("cors");
app.use(cors());

app.use(express.json());
//main routes for api
app.use("/api/sensors", sensorRouter);

//table for sensor incase of migrations

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err.message);
  } else {
    console.log("Connected to the database");
  }
  db.end();
});

// Assuming you have imported the required database module and established the database connection (e.g., using MySQL or similar)

function createSensorUserTable() {
  const createSensorTableQuery = `
    CREATE TABLE IF NOT EXISTS Sensor (
      id INT AUTO_INCREMENT PRIMARY KEY,
      device_id VARCHAR(255) NOT NULL,
      temperature FLOAT,
      humidity FLOAT,
      voltage JSON,
      current FLOAT,
      gas_level FLOAT,
      reading_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      data JSON,
      status VARCHAR(50)
    )
  `;

  const createUserTableQuery = `
    CREATE TABLE IF NOT EXISTS User (
      id INT AUTO_INCREMENT PRIMARY KEY,
      device_id VARCHAR(255) NOT NULL,
      userId VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL
    )
  `;

  db.query(createSensorTableQuery, (err, results) => {
    if (err) throw err;
    console.log("Sensor table created or already exists");
  });

  db.query(createUserTableQuery, (err, results) => {
    if (err) throw err;
    console.log("User table created or already exists");
  });
}

// Assuming you have initialized the database connection and assigned it to the db variable

createSensorUserTable();

// createSensorUserTable();

//server connected
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
