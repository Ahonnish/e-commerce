export type JwtUserPayload = {
  id?: string;
  email?: string;
  role?: string;
  iat?: number;
  exp?: number;
};

export enum ResponseCode {
  SIGNUP_SUCCESS = 'SIGNUP_SUCCESS',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  HEALTH_CHECK_SUCCESS = 'HEALTH_CHECK_SUCCESS',
  NOT_FOUND = 'NOT_FOUND',
}

export interface ResponseCodePreset {
  statusCode: number;
  message: string;
}

export interface ResponsePayload<TData = unknown> {
  code?: ResponseCode;
  message?: string;
  statusCode?: number;
  success?: boolean;
  data?: TData | null;
}

export interface AppError extends Error {
  statusCode?: number;
}

export interface ApiResponseBody<TData = unknown> {
  success: boolean;
  code?: ResponseCode;
  message: string;
  data: TData | null;
}
