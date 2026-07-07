import type { ErrorRequestHandler } from 'express';
import logger from '../utils/logger';

const extractMessage = (error: unknown): string => {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return 'Internal Server Error';
};

const extractStatusCode = (error: unknown): number => {
  if (typeof error !== 'object' || error === null) {
    return 500;
  }

  const statusCode = Reflect.get(error, 'statusCode');
  if (typeof statusCode === 'number') {
    return statusCode;
  }

  return 500;
};

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  void next;
  const message = extractMessage(err);
  const statusCode = extractStatusCode(err);
  const requestBody =
    req.body && typeof req.body === 'object'
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
    message
  );

  res.status(statusCode).json({
    success: false,
    message,
  });
};

export default errorHandler;
