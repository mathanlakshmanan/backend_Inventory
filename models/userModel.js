const db = require("../config/db");

exports.findByEmail = (email) => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM users WHERE email=?", [email], (err, result) => {
      if (err) reject(err);
      resolve(result[0]);
    });
  });
};