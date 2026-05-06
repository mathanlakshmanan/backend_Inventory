const express = require("express");
const router = express.Router();

const { login } = require("../controllers/auth/loginController");
const { logout } = require("../controllers/auth/logoutController");

router.post("/login", login);
router.post("/logout", logout);

module.exports = router;