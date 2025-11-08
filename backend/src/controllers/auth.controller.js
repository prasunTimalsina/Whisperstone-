import bcrypt from "bcryptjs";
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
    const savedUser = await newUser.save();
    const token = generateToken(savedUser._id);
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: ENV.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(201).json(
      new ApiResponse(201, "User created successfully", {
        _id: savedUser._id,
        fullname: savedUser.fullname,
        email: savedUser.email,
      })
    );
  } else {
    throw new ApiError(500, "Failed to create user");
  }
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    email,
  }).select("+password");
  if (!user) throw new ApiError(400, "Invalid credentials");

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new ApiError(400, "Invalid credentials");

  // Generate jwt token
  const token = generateToken(user._id);
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: ENV.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  res.status(200).json(
    new ApiResponse(200, "Login successful", {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
    })
  );
});

export const logout = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", { maxAge: 0, httpOnly: true });
  res.status(200).json(new ApiResponse(200, "Logout successful"));
});
