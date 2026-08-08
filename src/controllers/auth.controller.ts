import type { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../config/config';
import User from '../models/User';
import { ResponseCode } from '../types';
import appError from '../utils/error';
import logger from '../utils/logger';
import {
  type LoginDto,
  type SignupDto,
  type UpdateProfileDto,
} from '../validations/auth.validation';

const authLogger = logger.child({ module: 'auth.controller' });
type SignupRequest = Request<Record<string, never>, unknown, SignupDto>;
type LoginRequest = Request<Record<string, never>, unknown, LoginDto>;

type UpdateProfileRequest = Request<
  Record<string, never>,
  unknown,
  UpdateProfileDto
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

const updateProfile = async (
  req: UpdateProfileRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.user?.sub;

    const user = await User.findById(userId);

    if (!user) {
      authLogger.error({ userId }, 'User not found');
      return next(appError('User not found', 404));
    }

    const { name, email } = req.body;

    if (email !== undefined && email !== user.email) {
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        authLogger.error({ email }, 'Email already exists');
        return next(appError('Email already exists', 400));
      }
    }

    if (name !== undefined) {
      user.name = name;
    }

    if (email !== undefined) {
      user.email = email;
    }

    await user.save();

    res.locals.response = {
      code: ResponseCode.UPDATE_PROFILE_SUCCESS,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };

    return next();
  } catch (error) {
    authLogger.error({ err: error }, 'Update profile failed');
    next(appError('Update profile failed', 500));
  }
};

export { signup, login, updateProfile };
