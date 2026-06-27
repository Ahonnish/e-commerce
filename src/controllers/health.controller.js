const sendResponse = require("../utils/response.handler");

const getHealth = (req, res) => {
  return sendResponse({
    res,
    statusCode: 200,
    success: true,
    code: "HEALTH_CHECK_SUCCESS",
    message: "Service is healthy",
    data: {
      timestamp: new Date().toISOString(),
    },
  });
};

module.exports = { getHealth };