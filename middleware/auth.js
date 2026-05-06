const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"] || "";
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : authHeader;

  if (!token) return res.status(403).json({ message: "No token provided" });

  const secret = process.env.JWT_SECRET || "SECRET";
  jwt.verify(token, secret, (err, user) => {
    if (err) return res.status(401).json({ message: "Invalid token" });
    req.user = user;
    next();
  });
};