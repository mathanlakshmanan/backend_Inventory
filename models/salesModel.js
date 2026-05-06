const db = require("../config/db");

exports.createSale = (sale) => {
  const { invoice_no, total, items } = sale;
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO sales (invoice_no, total) VALUES (?,?)",
      [invoice_no, total],
      (err, result) => {
        if (err) return reject(err);
        const saleId = result.insertId;
        const values = items.map(i => [saleId, i.product_id, i.qty, i.price]);
        if (values.length === 0) return resolve({ id: saleId });
        db.query(
          "INSERT INTO sale_items (sale_id, product_id, qty, price) VALUES ?",
          [values],
          (err2) => {
            if (err2) return reject(err2);
            resolve({ id: saleId });
          }
        );
      }
    );
  });
};

exports.createReturn = (ret) => {
  const { sale_id, items } = ret;
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO sales_return (sale_id) VALUES (?)",
      [sale_id],
      (err, result) => {
        if (err) return reject(err);
        const returnId = result.insertId;
        const values = items.map(i => [returnId, i.product_id, i.qty, i.price]);
        if (values.length === 0) return resolve({ id: returnId });
        db.query(
          "INSERT INTO sales_return_items (return_id, product_id, qty, price) VALUES ?",
          [values],
          (err2) => {
            if (err2) return reject(err2);
            resolve({ id: returnId });
          }
        );
      }
    );
  });
};
