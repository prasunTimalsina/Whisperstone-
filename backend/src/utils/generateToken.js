import jwt from "jsonwebtoken";
import { ENV } from "../lib/env.js";

export const generateToken = (userId) => {
  const token = jwt.sign({ userId }, ENV.JWT_SECRET, { expiresIn: "7d" });
  return token;
};
