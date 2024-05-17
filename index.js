const express = require("express");
const sensorRouter = require("./Routes/sensor");
const db = require("./Database/db");
const app = express();
const port = 3000;
const cors = require("cors");
app.use(cors());
// Middleware
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
    if (err) throw err;
    console.log("Sensor table created or already exists");
  });
}

createSensorTable();

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err.message);
  } else {
    console.log("Connected to the database");
  }
  db.end();
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
