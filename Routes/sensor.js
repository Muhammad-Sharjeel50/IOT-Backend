const express = require("express");
const {
  insertSensor,
  fetchSensorData,
  updateSensor,
  deleteSensor,
  getWifiCredientals,
  setWifiCredientals,
} = require("../Controllers/sensor");

const router = express.Router();

router.post("/insert", insertSensor);

router.post("/set-wifi-cred", setWifiCredientals);

router.post("/get-wifi-cred", getWifiCredientals);

router.get("/data/:device_id", fetchSensorData);

router.put("/update/:device_id", updateSensor);

router.delete("/delete/:device_id", deleteSensor);

module.exports = router;
