const express = require("express");
const sensorRouter = require("./Routes/sensor");
const db = require("./Database/db");
const app = express();
const port = 5000;
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use("/api/sensors", sensorRouter);

function createSensorTable() {
  const createTableQuery = `
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
  db.query(createTableQuery, (err, results) => {
    if (err) {
      console.error("Error creating table:", err.message);
      return;
    }
    console.log("Sensor table created or already exists");
  });
}
function createWifiCredentialsTable() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS WifiCredentials (
      id INT AUTO_INCREMENT PRIMARY KEY,
      ssid VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL
    )
  `;

  db.query(createTableQuery, (err, results) => {
    if (err) {
      console.error('Error creating WifiCredentials table:', err.message);
    } else {
      console.log('WifiCredentials table created or already exists');
    }
  });
}

function createUserTable() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS User (
      id INT AUTO_INCREMENT PRIMARY KEY,
      device_id VARCHAR(255) NOT NULL,
      userId VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL
    )
  `;

  db.query(createTableQuery, (err, results) => {
    if (err) {
      console.error('Error creating User table:', err.message);
    } else {
      console.log('User table created or already exists');
    }
  });
}

// Initialize database connection
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
  } else {
    console.log('Connected to the RDS MySQL database');
  }
});

db.on("error", (err) => {
  console.error("Database error:", err.message);
});


createSensorTable();
createWifiCredentialsTable();
createUserTable();
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
