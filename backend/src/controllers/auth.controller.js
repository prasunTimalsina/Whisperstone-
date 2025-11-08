import { ENV } from "../lib/env.js";
import User from "../models/user.model.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";
import { generateToken } from "../utils/generateToken.js";

export const signup = asyncHandler(async (req, res) => {
  const { fullname, email, password } = req.body;

  // check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(400, "User with this email already exists");
  }

  const newUser = new User({ fullname, email, password });

  if (newUser) {
    // Generate jwt token
    const token = generateToken(newUser._id);
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: ENV.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    await newUser.save();

    res.status(201).json(
      new ApiResponse(201, "User created successfully", {
        _id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
      })
    );
  } else {
    throw new ApiError(500, "Failed to create user");
  }
});
