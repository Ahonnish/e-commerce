import type { RequestHandler } from 'express';
import { z } from 'zod';
import appError from '../utils/error';

const validateBody = <TSchema extends z.ZodTypeAny>(
  schema: TSchema
): RequestHandler<Record<string, never>, unknown, z.infer<TSchema>> => {
  return (req, _res, next): void => {
    const parsedBody = schema.safeParse(req.body);

    if (!parsedBody.success) {
      next(
        appError(
          parsedBody.error.issues.map((issue) => issue.message).join(', '),
          400
        )
      );
      return;
    }

    req.body = parsedBody.data;
    next();
  };
};

export { validateBody };