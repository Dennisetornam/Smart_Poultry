const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.json({ message: "SmartPoultry API is running 🐔" });
});

// Routes (register here as you build them)
// app.use("/api/auth", require("./routes/auth.routes"));

module.exports = app;
