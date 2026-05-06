require('dotenv').config();
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const tokenRoutes = require("./routes/tokenRoutes");
const productRoutes = require("./routes/productRoutes");
const salesRoutes = require("./routes/salesRoutes");

const categoryRoutes = require("./routes/categoryRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/token", tokenRoutes);
app.use("/api/products", productRoutes);
app.use("/api/sales", salesRoutes);

app.use("/api/categories", categoryRoutes);

module.exports = app;