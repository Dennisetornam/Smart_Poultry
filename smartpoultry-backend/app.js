require("dotenv").config();
const express = require("express");
const cors = require("cors");
const routes = require("./src/routes");
const errorHandler = require("./src/middleware/errorHandler");

const app = express();

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// ─── Root Route ──────────────────────────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({ message: "SmartPoultry API is up and running 🐔" });
});

// ─── API Routes ───────────────────────────────────────────────────────────────
app.use("/api", routes);

// ─── Global Error Handler ─────────────────────────────────────────────────────
// Must be LAST — catches any error forwarded via next(err) from routes above
app.use(errorHandler);

// ─── Start Server ─────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
