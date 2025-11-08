import * as z from "zod";

export const signUpSchema = z.object({
  firstname: z
    .string({ required_error: "First name is required" })
    .trim()
    .min(1, "First name cannot be empty")
    .max(50, "First name must be less than 50 characters"),

  lastname: z
    .string({ required_error: "Last name is required" })
    .trim()
    .min(1, "Last name cannot be empty")
    .max(50, "Last name must be less than 50 characters"),

  email: z.email({ required_error: "Email is required" }).trim(),

  password: z
    .string({ required_error: "Password is required" })
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password must not exceed 100 characters"),
});
