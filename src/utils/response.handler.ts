import type { RequestHandler } from 'express';
import type { ApiResponseBody, ResponsePayload } from '../types';
import { getResponseCodePreset } from './response.codes';

interface SendResponseResult<TData = unknown> {
  headersSent: boolean;
  locals: {
    response?: ResponsePayload<TData>;
  };
  status: (statusCode: number) => {
    json: (body: ApiResponseBody<TData>) => unknown;
  };
}

type SendResponseNext = (error?: unknown) => void;

const handleStructuredResponse = (
  res: SendResponseResult,
  next: SendResponseNext
): void => {
  if (res.headersSent) {
    return next();
  }

  const responseObj = res.locals.response;

  if (!responseObj) {
    return next();
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
