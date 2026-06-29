const logger = require("../utils/logger.js");

const errorHandler = (err, req, res, next) => {
  const requestBody = req.body && typeof req.body === "object"
    ? {
        name: req.body.name,
        email: req.body.email,
      }
    : undefined;

  logger.error(
    {
      err,
      method: req.method,
      path: req.originalUrl,
      body: requestBody,
    },
    err.message || "Unhandled error"
  );

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};

module.exports = errorHandler;