import { StatusCodes } from 'http-status-codes';
import type { ResponseCodePreset } from '../types';
import { ResponseCode } from '../types';

const RESPONSE_CODES: Record<ResponseCode, ResponseCodePreset> = {
  [ResponseCode.SIGNUP_SUCCESS]: {
    statusCode: StatusCodes.CREATED,
    message: 'User registered successfully',
  },
  [ResponseCode.LOGIN_SUCCESS]: {
    statusCode: StatusCodes.OK,
    message: 'User logged in successfully',
  },
  [ResponseCode.CHANGE_PASSWORD_SUCCESS]: {
    statusCode: StatusCodes.OK,
    message: 'Password changed successfully',
  },

  [ResponseCode.INVALID_CURRENT_PASSWORD]: {
    statusCode: StatusCodes.UNAUTHORIZED,
    message: 'Current password is incorrect',
  },
  [ResponseCode.HEALTH_CHECK_SUCCESS]: {
    statusCode: StatusCodes.OK,
    message: 'Service is healthy',
  },
  [ResponseCode.NOT_FOUND]: {
    statusCode: StatusCodes.NOT_FOUND,
    message: 'Resource not found',
  },
  [ResponseCode.OK]: {
    statusCode: StatusCodes.OK,
    message: 'Success',
  },
};

const getResponseCodePreset = (
  code: ResponseCode | undefined
): ResponseCodePreset | undefined => {
  if (!code) {
    return RESPONSE_CODES.OK;
  }

  return RESPONSE_CODES[code];
};

export default RESPONSE_CODES;
export { getResponseCodePreset };
