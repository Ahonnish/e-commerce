const User = require('../models/User');
const bcrypt = require('bcryptjs'); // for signUp
const jwt = require('jsonwebtoken'); // for login
const appError = require('../utils/error');
const logger = require('../utils/logger.js');

const authLogger = logger.child({ module: 'auth.controller' });

exports.signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.validatedBody;

    // check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      // const error = new Error("User already exists");
      // error.statusCode = 400;
      // return next(error);
      authLogger.error({ email }, 'User already exists');
      return next(appError('User already exists', 400));
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.locals.response = {
      code: 'SIGNUP_SUCCESS',
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    };

    return next();
  } catch (error) {
    authLogger.error({ err: error }, 'Registration failed');
    return next(appError('Registration failed', 500));
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // validation
    if (!email || !password) {
      authLogger.error({ email }, 'All fields are required');
      return next(appError('All fields are required', 400));
    }

    // check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      authLogger.error({ email }, 'Invalid credentials');
      return next(appError('Invalid credentials', 400));
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      authLogger.error({ email }, 'Invalid credentials');
      return next(appError('Invalid credentials', 400));
    }

    // generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    // pass standardized response payload to common middleware
    res.locals.response = {
      code: 'LOGIN_SUCCESS',
      data: {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      },
    };

    return next();
  } catch (error) {
    authLogger.error({ err: error }, 'Login failed');
    return next(appError('Login failed', 500));
  }
};
