const db = require("../Database/db");

function insertSensorData(data, callback) {
  db.query(
    "SELECT * FROM Sensor WHERE device_id = ?",
    data.device_id,
    (err, rows) => {
      if (err) return callback(err);

      if (rows.length === 0) {
        // Insert new record if device_id does not exist
        const voltageArray = Array.isArray(data.voltage)
          ? data.voltage
          : [data.voltage];
        const newData = {
          device_id: data.device_id,
          data: JSON.stringify([data]),
          voltage: JSON.stringify(voltageArray),
          status: voltageArray.length > 1 ? "threephase" : "singlephase",
        };

        db.query("INSERT INTO Sensor SET ?", newData, (err, result) => {
          if (err) return callback(err);
          callback(null, result);
        });
      } else {
        let existingData = [];
        let existingVoltage = [];
        if (rows[0]?.data) {
          existingData = JSON.parse(rows[0].data);
        }
        if (rows[0]?.voltage) {
          existingVoltage = JSON.parse(rows[0].voltage);
        }

        existingData.push(data);
        const voltageArray = Array.isArray(data.voltage)
          ? data.voltage
          : [data.voltage];
        existingVoltage = existingVoltage.concat(voltageArray);

        const status =
          existingVoltage.length > 1 ? "threephase" : "singlephase";

        db.query(
          "UPDATE Sensor SET data = ?, voltage = ?, status = ? WHERE device_id = ?",
          [
            JSON.stringify(existingData),
            JSON.stringify(existingVoltage),
            status,
            data.device_id,
          ],
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

      const allData = rows.map((row) => {
        const parsedData = JSON.parse(row.data);
        return {
          ...row,
          data: parsedData,
        };
      });

      callback(null, allData);
    }
  );
}

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

function createUniqueRandomGenerator(max) {
  let availableNumbers = [];

  function reset() {
    availableNumbers = Array.from({ length: max + 1 }, (_, i) => i);
  }

  function getRandomNumber() {
    if (availableNumbers.length === 0) {
      reset();
    }

    const randomIndex = Math.floor(Math.random() * availableNumbers.length);
    const number = availableNumbers.splice(randomIndex, 1)[0];
    return number;
  }

  reset();
  return getRandomNumber;
}

function setWifiCredientalsUsingCreds(data, callback) {
  const uniqueId = createUniqueRandomGenerator(5);
  data.device_id = uniqueId;
  db.query("Insert INTO User SET  = ?", data, (err, result) => {
    if (err) return callback(err);
    callback(null, result);
  });
}

function getWifiCredientalsUsingId(id, callback) {
  db.query("SELECT * from User WHERE device_id = ?", id, (err, result) => {
    if (err) return callback(err);
    callback(null, result);
  });
}

module.exports = {
  insertSensorData,
  getSensorData,
  updateSensorData,
  deleteSensorData,
  setWifiCredientalsUsingCreds,
  getWifiCredientalsUsingId,
};
