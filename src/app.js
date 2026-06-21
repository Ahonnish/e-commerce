const express = require("express");
const healthRouter = require("./routes/health.routes");
const authRoutes = require("./routes/auth.routes")

const app = express();

app.use(express.json()); // middleware

app.use("/api", healthRouter);
app.use("/api/auth",authRoutes)

module.exports = app;
