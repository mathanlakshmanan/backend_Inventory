const salesModel = require("../models/salesModel");
const productModel = require("../models/productModel");

exports.createSale = async (req, res) => {
  try {
    const { invoice_no, total, items } = req.body;

    if (!invoice_no || typeof invoice_no !== 'string' || invoice_no.trim() === '') {
      return res.status(400).json({ message: "Valid Invoice Number is required." });
    }
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Sale must contain at least one item." });
    }
    if (total === undefined || isNaN(Number(total)) || Number(total) < 0) {
      return res.status(400).json({ message: "Valid Total Amount is required." });
    }

    // Verify stock availability
    for (const it of items) {
      if (!it.product_id || !it.qty || isNaN(Number(it.qty)) || Number(it.qty) <= 0) {
         return res.status(400).json({ message: "Invalid item details provided." });
      }
      const product = await productModel.findById(it.product_id);
      if (!product) {
        return res.status(400).json({ message: `Product with ID ${it.product_id} not found.` });
      }
      if (product.stock < it.qty) {
        return res.status(400).json({ message: `Insufficient stock for product: ${product.name}. Available: ${product.stock}, Requested: ${it.qty}` });
      }
    }

    // reduce stock for each item
    for (const it of items) {
      await productModel.adjustStock(it.product_id, -Math.abs(it.qty));
    }

    const sale = await salesModel.createSale({ invoice_no, total, items });
    res.json(sale);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.createReturn = async (req, res) => {
  try {
    const { sale_id, items } = req.body;

    if (!sale_id) {
       return res.status(400).json({ message: "Sale ID is required." });
    }
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Return must contain at least one item." });
    }

    // validate items
    for (const it of items) {
      if (!it.product_id || !it.qty || isNaN(Number(it.qty)) || Number(it.qty) <= 0) {
         return res.status(400).json({ message: "Invalid item details provided." });
      }
    }

    // increase stock for returned items
    for (const it of items) {
      await productModel.adjustStock(it.product_id, Math.abs(it.qty));
    }

    const ret = await salesModel.createReturn({ sale_id, items });
    res.json(ret);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
