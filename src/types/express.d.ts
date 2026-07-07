import type { JwtUserPayload, ResponsePayload } from './index';

declare global {
  namespace Express {
    interface Request {
      user?: JwtUserPayload | string;
    }

    interface Locals {
      response?: ResponsePayload;
    }
  }
}

export {};
