import type { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import { changePassword } from '../controllers/auth.controller';

jest.mock('bcryptjs');
jest.mock('../models/User');

describe('changePassword', () => {
  const createRequest = (): Parameters<typeof changePassword>[0] => {
    return {
      body: {
        currentPassword: 'WrongPass123!',
        newPassword: 'NewPass456!',
      },

      user: {
        sub: 'user-123',
        aud: 'e-commerce-api',
        iss: 'e-commerce',
        role: 'customer',
      },
    } as Parameters<typeof changePassword>[0];
  };

  const createResponse = (): Response => {
    return {
      locals: {},
    } as Response;
  };

  it('returns 401 when the current password is incorrect', async () => {
    const req = createRequest();
    const res = createResponse();
    const next = jest.fn() as NextFunction;

    jest.spyOn(User, 'findById').mockResolvedValue({
      password: 'hashed-current-password',
    } as never);

    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    await changePassword(req, res, next);

    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Current password is incorrect',
        statusCode: 401,
        code: 'INVALID_CURRENT_PASSWORD',
      })
    );
  });
});
