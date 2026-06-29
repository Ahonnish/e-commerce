const sendResponse = require("../utils/response.handler");

describe("sendResponse", () => {
  it("should send a standardized success response from res.locals", () => {
    const req = {};
    const res = {
      locals: {
        response: {
          code: "LOGIN_SUCCESS",
          data: {
            id: 1,
          },
        },
      },
      headersSent: false,
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    sendResponse(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);

    expect(res.json).toHaveBeenCalledWith({
      success: true,
      code: "LOGIN_SUCCESS",
      message: "User logged in successfully",
      data: {
        id: 1,
      },
    });

    expect(next).not.toHaveBeenCalled();
  });

  it("should use null as default data when no data is provided", () => {
    const req = {};
    const res = {
      locals: {
        response: {
          code: "NOT_FOUND",
          success: false,
          statusCode: 404,
          message: "Resource not found",
        },
      },
      headersSent: false,
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    sendResponse(req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);

    expect(res.json).toHaveBeenCalledWith({
      success: false,
      code: "NOT_FOUND",
      message: "Resource not found",
      data: null,
    });

    expect(next).not.toHaveBeenCalled();
  });

  it("should call next when no response payload exists", () => {
    const req = {};
    const res = {
      locals: {},
      headersSent: false,
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    sendResponse(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  it("should call next when headers were already sent", () => {
    const req = {};
    const res = {
      locals: {
        response: { code: "LOGIN_SUCCESS" },
      },
      headersSent: true,
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    sendResponse(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });
});