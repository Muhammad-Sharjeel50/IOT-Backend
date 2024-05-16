const express = require("express");
const bodyParser = require("body-parser");
const sensorRouter = require("./Routes/sensor");
const db = require("./Database/db");
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/sensors", sensorRouter);

db.getConnection((err, connection) => {
    if (err) {
        console.error('Error getting database connection:', err.message);
    } else {
        console.log('Connected to MySQL database');
        connection.release();
    }
});

// Handle connection errors
db.on('error', (err) => {
    console.error('Database db error:', err.message);
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
