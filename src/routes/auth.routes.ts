import express from 'express';
import type { NextFunction, Request, Response } from 'express';
import { forgotPassword, login, signup } from '../controllers/auth.controller';
import { protect } from '../middlewares/auth.middleware';
import { validateBody } from '../middlewares/validation.middleware';
import {
  forgotPasswordSchema,
  loginSchema,
  signupSchema,
} from '../validations/auth.validation';

const router = express.Router();

router.post('/signup', validateBody(signupSchema), signup);
router.post('/login', validateBody(loginSchema), login);
router.post(
  '/forgot-password',
  validateBody(forgotPasswordSchema),
  forgotPassword
);

router.get(
  '/profile',
  protect,
  (req: Request, res: Response, next: NextFunction) => {
    res.locals.response = {
      message: 'Protected route accessed',
      data: {
        user: req.user,
      },
    };

    next();
  }
);

export default router;
