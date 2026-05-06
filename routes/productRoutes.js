const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const { verifyToken } = require("../middleware/auth");
const { requireRole } = require("../middleware/role");

router.get("/", verifyToken, productController.list);
router.post("/", verifyToken, productController.create);
router.get("/:id", verifyToken, productController.get);
router.put("/:id", verifyToken, productController.update);
router.delete("/:id", verifyToken, requireRole(["admin"]), productController.remove);

module.exports = router;
