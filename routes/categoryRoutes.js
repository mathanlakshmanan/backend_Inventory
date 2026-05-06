const express = require("express");
const router = express.Router();
const categoryModel = require("../models/categoryModel");
const { verifyToken } = require("../middleware/auth");

router.get("/", verifyToken, async (req, res) => {
  try {
    const categories = await categoryModel.list();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
