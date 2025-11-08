import { Router } from "express";
import { login, logout, signup } from "../controllers/auth.controller.js";
import { validateData } from "../middlewares/validation.middleware.js";
import { loginSchema, userSchema } from "../schemas/userSchema.js";
import { authGuard } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/signup", validateData(userSchema), signup);
router.post("/login", validateData(loginSchema), login);
router.post("/logout", logout);
router.put("/update-profile", authGuard);

export default router;
