import * as z from "zod";

export const userSchema = z.object({
  fullname: z
    .string({ required_error: "Full name is required" })
    .trim()
    .min(3, "Full name must be at least 3 characters")
    .max(50, "Full name must be less than 50 characters"),

  email: z.email({ required_error: "Email is required" }).trim(),

  password: z
    .string({ required_error: "Password is required" })
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password must not exceed 100 characters"),

  profilePic: z.string().optional(),
});
