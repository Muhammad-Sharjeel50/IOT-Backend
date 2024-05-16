const express = require("express");
const {
  insertSensor,
  fetchSensorData,
  updateSensor,
  deleteSensor,
} = require("../Controllers/sensor");

const router = express.Router();

// POST route to insert sensor data or add to existing data
router.post("/insert", insertSensor);

// GET route to fetch all sensor data for a device_id
router.get("/data/:device_id", fetchSensorData);

// PUT route to update sensor data for a device_id
router.put("/update/:device_id", updateSensor);

// DELETE route to delete sensor data for a device_id
router.delete("/delete/:device_id", deleteSensor);

module.exports = router;
