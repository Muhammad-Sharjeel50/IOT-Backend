const db = require("../Database/db");

function insertSensorData(data, callback) {
    db.query(
      "SELECT * FROM Sensor WHERE device_id = ?",
      data.device_id,
      (err, rows) => {
        if (err) return callback(err);
  
        if (rows.length === 0) {
          // Insert new record if device_id does not exist
          db.query("INSERT INTO Sensor SET ?", data, (err, result) => {
            if (err) return callback(err);
            callback(null, result);
          });
        } else {
          // Update existing record by appending new data to the existing data
          const existingData = rows[0]; // Use rows[0] directly
  
          const newData = {
            temperature: data.temperature,
            humidity: data.humidity,
            voltage: data.voltage,
            current: data.current,
            gas_level: data.gas_level,
            reading_time: data.reading_time,
          };
          
          const updatedData = { ...existingData, ...newData };
  
          db.query(
            "UPDATE Sensor SET ? WHERE device_id = ?",
            [updatedData, data.device_id],
            (err, result) => {
              if (err) return callback(err);
              callback(null, result);
            }
          );
        }
      }
    );
  }
  

// Function to fetch all sensor data for a device_id
function getSensorData(device_id, callback) {
  db.query(
    "SELECT * FROM Sensor WHERE device_id = ?",
    device_id,
    (err, rows) => {
      if (err) return callback(err);
      if (rows.length === 0) return callback(null, []);
      const sensorData = rows[0];
      callback(null, sensorData);
    }
  );
}

// Function to update sensor data fßor a device_id
function updateSensorData(device_id, newData, callback) {
  db.query(
    "UPDATE Sensor SET data = ? WHERE device_id = ?",
    [JSON.stringify(newData), device_id],
    (err, result) => {
      if (err) return callback(err);
      callback(null, result);
    }
  );
}

// Function to delete sensor data for a device_id
function deleteSensorData(device_id, callback) {
  db.query(
    "DELETE FROM Sensor WHERE device_id = ?",
    device_id,
    (err, result) => {
      if (err) return callback(err);
      callback(null, result);
    }
  );
}

module.exports = {
  insertSensorData,
  getSensorData,
  updateSensorData,
  deleteSensorData,
};
