import type { ErrorRequestHandler } from 'express';
import { ResponseCode } from '../types';
import logger from '../utils/logger';

const extractMessage = (error: unknown): string => {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  if (typeof error === 'object' && error !== null) {
    const message = Reflect.get(error, 'message');
    if (typeof message === 'string' && message.length > 0) {
      return message;
    }
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

const extractResponseCode = (error: unknown): ResponseCode | undefined => {
  if (typeof error !== 'object' || error === null) {
    return undefined;
  }

  const code = Reflect.get(error, 'code');
  if (Object.values(ResponseCode).includes(code as ResponseCode)) {
    return code as ResponseCode;
  }

  return undefined;
};

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  void next;
  const message = extractMessage(err);
  const statusCode = extractStatusCode(err);
  const code = extractResponseCode(err);
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
    code,
    message,
    data: null,
  });
};

export default errorHandler;
