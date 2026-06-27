const sendResponse = require("../utils/response.handler");

describe("sendResponse", () => {
  it("should send a standardized success response", () => {
    // Mock Express response object
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    sendResponse({
      res,
      statusCode: 200,
      success: true,
      code: "TEST_SUCCESS",
      message: "Test successful",
      data: {
        id: 1,
      },
    });

    expect(res.status).toHaveBeenCalledWith(200);

    expect(res.json).toHaveBeenCalledWith({
      success: true,
      code: "TEST_SUCCESS",
      message: "Test successful",
      data: {
        id: 1,
      },
    });
  });
});

it("should use null as default data when no data is provided", () => {
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  sendResponse({
    res,
    statusCode: 404,
    success: false,
    code: "NOT_FOUND",
    message: "Resource not found",
  });

  expect(res.status).toHaveBeenCalledWith(404);

  expect(res.json).toHaveBeenCalledWith({
    success: false,
    code: "NOT_FOUND",
    message: "Resource not found",
    data: null,
  });
});