const path = require("path");
const fs = require("fs");
const dotenv = require("dotenv");

const environment = process.env.NODE_ENV || "local";
const envFile = path.resolve(process.cwd(), `.env.${environment}`);

if (fs.existsSync(envFile)) {
  dotenv.config({ path: envFile });
} else {
  dotenv.config();
}

const app = require("./app");
const connectDB = require("./database");
const config = require("./config/config");
const logger = require("./utils/logger");

connectDB();

const PORT = config.port;

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});