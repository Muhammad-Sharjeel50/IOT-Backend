const express = require("express");
const sensorRouter = require("./Routes/sensor");
const db = require("./Database/db");
const app = express();
const port = 5000;
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use("/api/sensors", sensorRouter);

// Function to create sensor table if it doesn't exist
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

// Initialize database connection
db.getConnection((err, connection) => {
  if (err) {
    console.error("Error getting database connection:", err.message);
  } else {
    console.log("Connected to MySQL database");
    connection.release();
  }
});

// Handle database connection errors
db.on("error", (err) => {
  console.error("Database error:", err.message);
});

// Create sensor table
createSensorTable();

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
