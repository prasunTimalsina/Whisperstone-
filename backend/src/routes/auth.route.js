import { Router } from "express";
import { signup } from "../controllers/auth.controller.js";
import { validateData } from "../middlewares/validation.middleware.js";
import { userSchema } from "../schemas/userSchema.js";

const router = Router();

router.post("/signup", validateData(userSchema), signup);
router.get("/login", (req, res) => {
  res.send("Login route");
});
router.get("/logout", (req, res) => {
  res.send("Logout route");
});

export default router;
