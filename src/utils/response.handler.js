const RESPONSE_CODES = require("./response.codes");

const sendResponse = (req, res, next) => {
  if (res.headersSent) {
    return next();
  }

  const responseObj = res.locals.response;

  if (!responseObj) {
    return next();
  }

  const { code, data = null, success = true } = responseObj;
  const message =
    responseObj.message || (code ? RESPONSE_CODES[code]?.message : undefined) || "Success";
  const statusCode =
    responseObj.statusCode || (code ? RESPONSE_CODES[code]?.statusCode : undefined) || 200;

  return res.status(statusCode).json({
    success,
    code,
    message,
    data,
  });
};

module.exports = sendResponse;