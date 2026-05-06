const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "laksha",
  password: "Laksha6!",
  database: "surabi",
  multipleStatements: true
});

module.exports = db;