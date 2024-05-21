const {
  insertSensorData,
  getSensorData,
  updateSensorData,
  deleteSensorData,
  getWifiCredientalsUsingId,
  setWifiConnectionUsingCredentials,
  setWifiCredientalsUsingCreds,
  getWifiConnectionUsingCredientals,
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
    res
      .status(201)
      .send({ message: "New record created successfully", data: data });
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

function setWifiCredientals(req, res) {
  const { userId, password } = req.body;
  const data = {
    userId: userId,
    password: password,
  };
  console.log("data", data);

  setWifiCredientalsUsingCreds(data, (err, result) => {
    if (err) return res.status(500).send(`Error: ${err.message}`);
    res
      .status(200)
      .send({ message: "Wifi credentials set successfully", result });
  });
}

function getWifiCredientals(req, res) {
  const id = req.params.device_id;
  getWifiCredientalsUsingId(id, (err, result) => {
    if (err) return res.status(500).send(`Error: ${err.message}`);
    res.status(200).send("Wifi credentials get succesfully", result);
  });
}

function setWifiConnection(req, res) {
  const { ssid, password } = req.body;
  setWifiConnectionUsingCredentials({ ssid, password }, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(result);
  });
}

function getWifiConnection(req, res) {
  const { ssid, password } = req.body;
  getWifiConnectionUsingCredientals({ ssid, password }, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res
      .status(200)
      .json({ message: "Wifi credentials retrieved successfully", data: result });
  });
}


module.exports = {
  insertSensor,
  fetchSensorData,
  updateSensor,
  deleteSensor,
  setWifiCredientals,
  getWifiCredientals,
  setWifiConnection,
  getWifiConnection,
};
