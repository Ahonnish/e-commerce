import type { NextFunction, RequestHandler, Response } from 'express';
import type { ApiResponseBody } from '../types';
import type { ResponsePayload } from '../types';
import { getResponseCodePreset } from './response.codes';

type StructuredResponse<TData = unknown> = Response<
  ApiResponseBody<TData>,
  { response?: ResponsePayload<TData> }
>;

const handleStructuredResponse = <TData = unknown>(
  res: StructuredResponse<TData>,
  next: NextFunction
): void => {
  if (res.headersSent) {
    next();
    return;
  }

  const responseObj = res.locals.response;

  if (!responseObj) {
    next();
    return;
  }

  const { code, data = null, success = true } = responseObj;
  const codePreset = getResponseCodePreset(code);

  const message = responseObj.message || codePreset?.message || 'Success';

  const statusCode = responseObj.statusCode || codePreset?.statusCode || 200;

  res.status(statusCode).json({
    success,
    code,
    message,
    data,
  });
};

const sendResponse: RequestHandler = (_req, res, next): void => {
  handleStructuredResponse(res, next);
};

export default sendResponse;
export { handleStructuredResponse };
