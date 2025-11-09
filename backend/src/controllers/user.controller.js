import { ENV } from "../lib/env.js";
import User from "../models/user.model.js";
import { ApiError } from "../utils/api-error.js";
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

  const updateData = {};
  
  if (fullname) updateData.fullname = fullname;
  if (email) updateData.email = email;
  if (password) updateData.password = password;

  const user = await User.findByIdAndUpdate(
    userId,
    updateData,
    { 
      new: true, 
      runValidators: true,
      select: "-password" // Exclude password from response
    }
  );

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  res.status(200).json(new ApiResponse(200, user, "User updated successfully"));
});

export const getAllUser = asyncHandler(async (req, res) => {
  const loggedInUserId = req.user._id;
  const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } });

  if (!filteredUsers) {
    throw new ApiError(404, "No users found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, filteredUsers, "Users retrieved successfully"));
});
