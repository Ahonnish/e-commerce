import type { JwtUserPayload, ResponsePayload } from './index';

declare global {
  namespace Express {
    interface Request {
      user?: JwtUserPayload;
    }

    interface Locals {
      response?: ResponsePayload;
    }
  }
}

export {};
