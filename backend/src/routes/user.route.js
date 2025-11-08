import { Router } from "express";
import { deleteUser, getAllUser } from "../controllers/user.controller.js";
import { authGuard } from "../middlewares/auth.middleware.js";

const router = Router();

router.delete("/delete", authGuard, deleteUser);
router.get("", authGuard, getAllUser);

export default router;
