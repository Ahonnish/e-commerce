import type { Response } from 'express';
import { handleStructuredResponse } from '../utils/response.handler';
import type { ApiResponseBody, ResponsePayload } from '../types';
import { ResponseCode } from '../types';

type MockNext = jest.Mock<void, [unknown?]>;

type MockResponse = {
  locals: {
    response?: ResponsePayload;
  };
  headersSent: boolean;
  status: jest.Mock<MockResponse, [number]>;
  json: jest.Mock;
};

const createMockResponse = (
  response?: MockResponse['locals']['response']
): Response<ApiResponseBody, { response?: ResponsePayload }> => {
  const mockResponse: MockResponse = {
    locals: response ? { response } : {},
    headersSent: false,
    status: jest.fn(),
    json: jest.fn(),
  };

  mockResponse.status.mockReturnValue(mockResponse);

  return mockResponse as unknown as Response<
    ApiResponseBody,
    { response?: ResponsePayload }
  >;
};

describe('sendResponse', () => {
  it('should send a standardized success response from res.locals', () => {
    const res = createMockResponse({
      code: ResponseCode.LOGIN_SUCCESS,
      data: {
        id: 1,
      },
    });
    const next: MockNext = jest.fn();

    handleStructuredResponse(res, next);

    expect(res.status).toHaveBeenCalledWith(200);

    expect(res.json).toHaveBeenCalledWith({
      success: true,
      code: ResponseCode.LOGIN_SUCCESS,
      message: 'User logged in successfully',
      data: {
        id: 1,
      },
    });

    expect(next).not.toHaveBeenCalled();
  });

  it('should use null as default data when no data is provided', () => {
    const res = createMockResponse({
      code: ResponseCode.NOT_FOUND,
      success: false,
      statusCode: 404,
      message: 'Resource not found',
    });
    const next: MockNext = jest.fn();

    handleStructuredResponse(res, next);

    expect(res.status).toHaveBeenCalledWith(404);

    expect(res.json).toHaveBeenCalledWith({
      success: false,
      code: ResponseCode.NOT_FOUND,
      message: 'Resource not found',
      data: null,
    });

    expect(next).not.toHaveBeenCalled();
  });

  it('should call next when no response payload exists', () => {
    const res = createMockResponse();
    const next: MockNext = jest.fn();

    handleStructuredResponse(res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  it('should call next when headers were already sent', () => {
    const res = createMockResponse({ code: ResponseCode.LOGIN_SUCCESS });
    res.headersSent = true;
    const next: MockNext = jest.fn();

    handleStructuredResponse(res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });
});
