import type { AppError } from '../types';

class ApplicationError extends Error implements AppError {
  statusCode?: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.name = 'ApplicationError';
    this.statusCode = statusCode;
  }
}

const appError = (message: string, statusCode: number): AppError => {
  return new ApplicationError(message, statusCode);
};

export default appError;
