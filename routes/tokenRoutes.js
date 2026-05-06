const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.post("/refresh", (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(400).json({ message: "No refresh token" });

  const secret = process.env.REFRESH_SECRET || "REFRESH_SECRET";
  jwt.verify(refreshToken, secret, (err, payload) => {
    if (err) return res.status(401).json({ message: "Invalid refresh token" });

    const accessSecret = process.env.JWT_SECRET || "SECRET";
    const accessToken = jwt.sign({ id: payload.id, role: payload.role }, accessSecret, { expiresIn: "15m" });

    res.json({ accessToken });
  });
});

module.exports = router;
