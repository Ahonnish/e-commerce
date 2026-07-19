import type { NextFunction, Request, Response } from 'express';
import { ResponseCode } from '../types';
import errorHandler from '../middlewares/error.middleware';

type MockResponse = Response & {
  status: jest.Mock;
  json: jest.Mock;
};

const createResponse = (): MockResponse => {
  const res = {
    status: jest.fn(),
    json: jest.fn(),
  } as unknown as MockResponse;

  res.status.mockReturnValue(res);

  return res;
};

describe('errorHandler', () => {
  it('returns the canonical API error shape', () => {
    const req = {
      method: 'GET',
      originalUrl: '/api/resource',
      body: {},
    } as Request;
    const res = createResponse();
    const next = jest.fn() as NextFunction;
    const error = {
      message: 'Resource not found',
      statusCode: 404,
      code: ResponseCode.NOT_FOUND,
    };

    errorHandler(error, req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      code: ResponseCode.NOT_FOUND,
      message: 'Resource not found',
      data: null,
    });
  });
});