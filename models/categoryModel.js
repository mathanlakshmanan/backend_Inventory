const db = require("../config/db");

exports.list = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM categories ORDER BY name ASC", (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
};
