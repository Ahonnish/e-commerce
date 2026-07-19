import type { NextFunction, Request, Response } from 'express';
import { ResponseCode } from '../types';

const getHealth = (req: Request, res: Response, next: NextFunction): void => {
  res.locals.response = {
    code: ResponseCode.HEALTH_CHECK_SUCCESS,
    data: {
      timestamp: new Date().toISOString(),
    },
  };

  next();
};

export { getHealth };
