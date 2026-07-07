import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/config';
import appError from '../utils/error';

const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  void res;
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
    const decoded = jwt.verify(token, config.jwtSecret);

    // attach user data to request
    req.user = decoded;

    next();
  } catch (error) {
    void error;
    next(appError('Unauthorized', 401));
  }
};

export { protect };
