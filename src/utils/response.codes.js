const { StatusCodes } = require('http-status-codes');

const RESPONSE_CODES = {
    SIGNUP_SUCCESS: {
        statusCode: StatusCodes.CREATED,
        message: 'User registered successfully',
    },
    LOGIN_SUCCESS: {
        statusCode: StatusCodes.OK,
        message: 'User logged in successfully',
    },
    HEALTH_CHECK_SUCCESS: {
        statusCode: StatusCodes.OK,
        message: 'Service is healthy',
    },
};

module.exports = RESPONSE_CODES;