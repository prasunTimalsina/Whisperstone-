import jwt from "jsonwebtoken";

import { ENV } from "../lib/env.js";
import User from "../models/user.model.js";
import { asyncHandler } from "../utils/async-handler.js";
import { ApiError } from "../utils/api-error.js";

export const authGuard = asyncHandler(async (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    throw new ApiError(401, "Unauthorized: No token provided");
  }

  const decoded = jwt.verify(token, ENV.JWT_SECRET);
  if (!decoded) {
    throw new ApiError(401, "Unauthorized: Invalid token");
  }

  const user = await User.findById(decoded.userId);
  console.log(user);
  if (!user) {
    throw new ApiError(401, "User not found");
  }

  req.user = user;
  next();
});
