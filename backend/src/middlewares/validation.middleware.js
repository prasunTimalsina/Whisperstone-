import { ApiError } from "../utils/api-error.js";

export function validateData(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errors = result.error.issues.map((err) => ({
        message: err.message,
        path: err.path.join("."),
      }));

      return next(new ApiError(400, "Validation Error", errors));
    }

    next();
  };
}
