const { ZodError } = require("zod");

const validate = (schema) => {
  return (req, res, next) => {
    try {
      req.validatedBody = schema.parse(req.body);
      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = new Error(
          error.issues.map((issue) => issue.message).join(", ")
        );

        validationError.statusCode = 400;

        return next(validationError);
      }

      return next(error);
    }
  };
};

module.exports = validate;