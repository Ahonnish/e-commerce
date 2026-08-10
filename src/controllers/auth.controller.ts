import type { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import config from '../config/config';
import User from '../models/User';
import { ResponseCode } from '../types';
import appError from '../utils/error';
import logger from '../utils/logger';
import {
  type ForgotPasswordDto,
  type LoginDto,
  type SignupDto,
} from '../validations/auth.validation';

const authLogger = logger.child({ module: 'auth.controller' });
type SignupRequest = Request<Record<string, never>, unknown, SignupDto>;
type LoginRequest = Request<Record<string, never>, unknown, LoginDto>;

type ForgotPasswordRequest = Request<
  Record<string, never>,
  unknown,
  ForgotPasswordDto
>;

const signup = async (
  req: SignupRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    // check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      authLogger.error({ email }, 'User already exists');
      next(appError('User already exists', 400));
      return;
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, config.bcryptSaltRounds);

    // create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.locals.response = {
      code: ResponseCode.SIGNUP_SUCCESS,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };

    next();
    return;
  } catch (error) {
    authLogger.error({ err: error }, 'Registration failed');
    next(appError('Registration failed', 500));
  }
};

const forgotPassword = async (
  req: ForgotPasswordRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      // generate reset token
      const resetToken = crypto.randomBytes(32).toString('hex');

      // Hash the token
      const resetPasswordTokenHash = crypto
        .createHash('sha256') // Creates a SHA-256 hash instance.
        .update(resetToken) // Feeds the plain reset token into the hash.
        .digest('hex'); // Finalizes the hash and returns a hexadecimal string.

      user.resetPasswordTokenHash = resetPasswordTokenHash; // save the hash
      user.resetPasswordExpires = new Date(Date.now() + 15 * 60 * 1000); // expiry set for 15 minutes

      await user.save(); // save the user
      const resetUrl = `http://localhost:3000/reset-password?token=${resetToken}`;

      authLogger.info(
        {
          email,
          // resetUrl,
        },
        'Password reset link generated'
      );
    }

    res.locals.response = {
      code: ResponseCode.FORGOT_PASSWORD_EMAIL_SENT,
    };

    next();
    return;
  } catch (error) {
    authLogger.error({ err: error }, 'Forgot password failed');
    next(appError('Forgot password failed', 500));
    return;
  }
};

const login = async (
  req: LoginRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;

    // check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      authLogger.error({ email }, 'Invalid credentials');
      next(appError('Invalid credentials', 400));
      return;
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      authLogger.error({ email }, 'Invalid credentials');
      next(appError('Invalid credentials', 400));
      return;
    }

    // generate token
    const token = jwt.sign(
      {
        role: user.role,
        email: user.email,
      },
      config.jwtSecret,
      {
        expiresIn: config.jwtExpiresIn,
        subject: String(user._id),
        audience: config.jwtAudience,
        issuer: config.jwtIssuer,
      }
    );

    // pass standardized response payload to common middleware
    res.locals.response = {
      code: ResponseCode.LOGIN_SUCCESS,
      data: {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
    };

    next();
    return;
  } catch (error) {
    authLogger.error({ err: error }, 'Login failed');
    next(appError('Login failed', 500));
  }
};

export { forgotPassword, signup, login };
