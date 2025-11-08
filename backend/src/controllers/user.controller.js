import { ENV } from "../lib/env.js";
import User from "../models/user.model.js";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";

export const deleteUser = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  if (!userId) {
    throw new ApiError(400, "User ID is required");
  }

  const deletedUser = await User.findByIdAndDelete(userId);
  if (!deletedUser) {
    throw new ApiError(404, "User not found");
  }

  // Clear JWT token cookie
  res.cookie("jwt", "", {
    maxAge: 0,
    httpOnly: true,
    secure: ENV.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.status(200).json(new ApiResponse(200, "User deleted successfully"));
});

export const updateUser = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { fullname, email, password } = req.body;

  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  user.fullname = fullname || user.fullname;
  user.email = email || user.email;
  user.password = password || user.password;

  await user.save();
  res.status(200).json(new ApiResponse(200, "User updated successfully", user));
});
