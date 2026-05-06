const db = require("../config/db");

exports.create = (product) => {
  const { name, sku, price, stock, category } = product;
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO products (name, sku, price, stock, category) VALUES (?,?,?,?,?)",
      [name, sku, price, stock, category],
      (err, result) => {
        if (err) return reject(err);
        resolve({ id: result.insertId, ...product });
      }
    );
  });
};

exports.update = (id, product) => {
  const { name, sku, price, stock, category } = product;
  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE products SET name=?, sku=?, price=?, stock=?, category=? WHERE id=?",
      [name, sku, price, stock, category, id],
      (err) => {
        if (err) return reject(err);
        resolve({ id, ...product });
      }
    );
  });
};

exports.delete = (id) => {
  return new Promise((resolve, reject) => {
    db.query("DELETE FROM products WHERE id=?", [id], (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
};

exports.findById = (id) => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM products WHERE id=?", [id], (err, rows) => {
      if (err) return reject(err);
      resolve(rows[0]);
    });
  });
};

exports.list = ({ page = 1, limit = 10, q = "" }) => {
  const p = parseInt(page) || 1;
  const l = parseInt(limit) || 10;
  const offset = (p - 1) * l;
  const search = `%${q || ""}%`;
  
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT SQL_CALC_FOUND_ROWS * FROM products WHERE name LIKE ? OR sku LIKE ? ORDER BY id DESC LIMIT ? OFFSET ?; SELECT FOUND_ROWS() as total;",
      [search, search, l, offset],
      (err, results) => {
        if (err) return reject(err);
        const rows = results[0];
        const total = results[1][0].total;
        resolve({ rows, total });
      }
    );
  });
};

exports.adjustStock = (id, delta) => {
  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE products SET stock = GREATEST(stock + ?, 0) WHERE id=?",
      [delta, id],
      (err) => {
        if (err) return reject(err);
        resolve();
      }
    );
  });
};
