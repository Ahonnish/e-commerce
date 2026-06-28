require("./config/env");

const app = require("./app");
const connectDB = require("./database");
const logger = require("./utils/logger");

connectDB();

const PORT = process.env.PORT;

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});