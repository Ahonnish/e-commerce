import { z } from 'zod';

const jwtUserPayloadSchema = z.object({
  sub: z.string().min(1),
  aud: z.string().min(1),
  iss: z.string().min(1),
  email: z.string().email().optional(),
  role: z.string().min(1),
  iat: z.number().int().optional(),
  exp: z.number().int().optional(),
});

export type JwtUserPayload = z.infer<typeof jwtUserPayloadSchema>;

export enum ResponseCode {
  SIGNUP_SUCCESS = 'SIGNUP_SUCCESS',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  HEALTH_CHECK_SUCCESS = 'HEALTH_CHECK_SUCCESS',
  NOT_FOUND = 'NOT_FOUND',
  FORGOT_PASSWORD_EMAIL_SENT = 'FORGOT_PASSWORD_EMAIL_SENT',
  OK = 'OK',
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
  code?: ResponseCode;
}

export interface ApiResponseBody<TData = unknown> {
  success: boolean;
  code?: ResponseCode;
  message: string;
  data: TData | null;
}

export { jwtUserPayloadSchema };
