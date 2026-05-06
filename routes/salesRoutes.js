const express = require("express");
const router = express.Router();
const salesController = require("../controllers/salesController");
const { verifyToken } = require("../middleware/auth");

router.post("/", verifyToken, salesController.createSale);
router.post("/return", verifyToken, salesController.createReturn);

module.exports = router;
