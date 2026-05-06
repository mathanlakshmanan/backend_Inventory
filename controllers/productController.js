const productModel = require("../models/productModel");

exports.create = async (req, res) => {
  try {
    const { name, sku, price, stock, category } = req.body;

    if (!name || typeof name !== 'string' || name.trim() === '') {
      return res.status(400).json({ message: "Product Name is required." });
    }
    if (!sku || typeof sku !== 'string' || sku.trim() === '') {
      return res.status(400).json({ message: "SKU is required." });
    }
    if (price === undefined || isNaN(Number(price)) || Number(price) < 0) {
      return res.status(400).json({ message: "Valid Price is required." });
    }
    if (stock === undefined || isNaN(Number(stock)) || Number(stock) < 0) {
      return res.status(400).json({ message: "Valid Stock quantity is required." });
    }

    const product = await productModel.create(req.body);
    res.json(product);
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY' || err.message.includes('duplicate')) {
      return res.status(400).json({ message: "Product with this SKU already exists." });
    }
    res.status(400).json({ message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { name, sku, price, stock, category } = req.body;

    if (!name || typeof name !== 'string' || name.trim() === '') {
      return res.status(400).json({ message: "Product Name is required." });
    }
    if (!sku || typeof sku !== 'string' || sku.trim() === '') {
      return res.status(400).json({ message: "SKU is required." });
    }
    if (price === undefined || isNaN(Number(price)) || Number(price) < 0) {
      return res.status(400).json({ message: "Valid Price is required." });
    }
    if (stock === undefined || isNaN(Number(stock)) || Number(stock) < 0) {
      return res.status(400).json({ message: "Valid Stock quantity is required." });
    }

    const product = await productModel.update(req.params.id, req.body);
    res.json(product);
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY' || err.message.includes('duplicate')) {
      return res.status(400).json({ message: "Product with this SKU already exists." });
    }
    res.status(400).json({ message: err.message });
  }
};

exports.remove = async (req, res) => {
  console.log("DELETE request for product ID:", req.params.id);
  try {
    await productModel.delete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.get = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.list = async (req, res) => {
  try {
    const { page, limit, q } = req.query;
    const data = await productModel.list({ page, limit, q });
    res.json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
