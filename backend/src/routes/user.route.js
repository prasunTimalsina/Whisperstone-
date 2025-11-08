import { Router } from "express";
import { deleteUser } from "../controllers/user.controller.js";
import { authGuard } from "../middlewares/auth.middleware.js";

const router = Router();

router.delete("/delete", authGuard, deleteUser);

export default router;
