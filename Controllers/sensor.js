const {
  insertSensorData,
  getSensorData,
  updateSensorData,
  deleteSensorData,
} = require("../Models/sensor");

function insertSensor(req, res) {
  const {
    device_id,
    temperature,
    humidity,
    voltage,
    current,
    gas_level,
    reading_time,
  } = req.body;
  const data = {
    device_id,
    temperature,
    humidity,
    voltage,
    current,
    gas_level,
    reading_time,
  };

  insertSensorData(data, (err, result) => {
    if (err) return res.status(500).send(`Error: ${err.message}`);
    res.status(201).send("New record created successfully");
  });
}

function fetchSensorData(req, res) {
  const device_id = req.params.device_id;

  getSensorData(device_id, (err, data) => {
    if (err) return res.status(500).send(`Error: ${err.message}`);
    res.json(data);
  });
}

function updateSensor(req, res) {
  const device_id = req.params.device_id;
  const newData = req.body;

  updateSensorData(device_id, newData, (err, result) => {
    if (err) return res.status(500).send(`Error: ${err.message}`);
    res.status(200).send("Sensor data updated successfully");
  });
}

function deleteSensor(req, res) {
  const device_id = req.params.device_id;

  deleteSensorData(device_id, (err, result) => {
    if (err) return res.status(500).send(`Error: ${err.message}`);
    res.status(200).send("Sensor data deleted successfully");
  });
}

module.exports = { insertSensor, fetchSensorData, updateSensor, deleteSensor };
