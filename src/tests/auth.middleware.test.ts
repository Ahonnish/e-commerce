import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { protect } from '../middlewares/auth.middleware';

const createRequest = (authorization?: string): Request => {
  return {
    headers: authorization ? { authorization } : {},
  } as Request;
};

describe('protect', () => {
  let verifySpy: jest.SpiedFunction<typeof jwt.verify>;

  const setVerifiedPayload = (payload: unknown): void => {
    (verifySpy as unknown as jest.Mock).mockReturnValue(payload);
  };

  beforeEach(() => {
    verifySpy = jest.spyOn(jwt, 'verify');
  });

  afterEach(() => {
    verifySpy.mockRestore();
  });

  it('attaches a validated JWT payload to the request', async () => {
    const req = createRequest('Bearer valid-token');
    const res = {} as Response;
    const next = jest.fn() as NextFunction;

    const payload = {
      sub: 'user-123',
      aud: 'e-commerce-api',
      iss: 'e-commerce',
      role: 'customer',
      email: 'user@example.com',
    };

    setVerifiedPayload(payload);

    await protect(req, res, next);

    expect(req.user).toEqual(payload);
    expect(next).toHaveBeenCalledWith();
  });

  it('rejects unauthenticated requests without an authorization header', async () => {
    const req = createRequest();
    const res = {} as Response;
    const next = jest.fn() as NextFunction;

    await protect(req, res, next);

    expect(req.user).toBeUndefined();

    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Unauthorized',
        statusCode: 401,
      })
    );
  });

  it('rejects tokens whose payload does not match the request contract', async () => {
    const req = createRequest('Bearer invalid-token');
    const res = {} as Response;
    const next = jest.fn() as NextFunction;

    setVerifiedPayload('invalid-payload');

    await protect(req, res, next);

    expect(req.user).toBeUndefined();

    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Unauthorized',
        statusCode: 401,
      })
    );
  });

  it('passes issuer and audience constraints to jwt.verify', async () => {
    const req = createRequest('Bearer valid-token');
    const res = {} as Response;
    const next = jest.fn() as NextFunction;

    setVerifiedPayload({
      sub: 'user-123',
      aud: 'e-commerce-api',
      iss: 'e-commerce',
      role: 'customer',
    });

    await protect(req, res, next);

    expect(verifySpy).toHaveBeenCalledWith('valid-token', expect.any(String), {
      audience: 'e-commerce-api',
      issuer: 'e-commerce',
    });
  });
});
