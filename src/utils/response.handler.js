const sendResponse = ({
  res,
  statusCode,
  success,
  code,
  message,
  data = null,
}) => {
  return res.status(statusCode).json({
    success,
    code,
    message,
    data,
  });
};

module.exports = sendResponse;