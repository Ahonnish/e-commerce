import type { AppError } from '../types';
import type { ResponseCode } from '../types';

class ApplicationError extends Error implements AppError {
  statusCode?: number;
  code?: ResponseCode;

  constructor(message: string, statusCode: number, code?: ResponseCode) {
    super(message);
    this.name = 'ApplicationError';
    this.statusCode = statusCode;
    this.code = code;
  }
}

const appError = (
  message: string,
  statusCode: number,
  code?: ResponseCode
): AppError => {
  return new ApplicationError(message, statusCode, code);
};

export default appError;
