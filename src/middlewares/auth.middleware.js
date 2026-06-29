const jwt = require('jsonwebtoken');
const appError = require('../utils/error');

exports.protect = async (req, res, next) => {
  try {
    // get token from headers
    const authHeader = req.headers.authorization;
    // check token exists
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      // const error = new Error("Unauthorized");
      // error.statusCode = 401;
      // return next(error);
      throw appError('Unauthorized', 401);
    }

    // extract token
    const token = authHeader.split(' ')[1];

    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // attach user data to request
    req.user = decoded;

    next();
  } catch (error) {
    next(appError('Unauthorized', 401));
  }
};
