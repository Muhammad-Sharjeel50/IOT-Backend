const mysql = require("mysql");

const db = mysql.createPool({
  connectionLimit: 10,
  host: "198.12.242.136",
  user: "Esp_homes",
  password: "03010106659@haissam",
  database: "SMART_HOME_SOLUTIONS",
  waitForConnections: true,
  queueLimit: 0,
});

module.exports = db;
