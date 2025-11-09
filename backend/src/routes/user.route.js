import { Router } from "express";
import {
  deleteUser,
  getAllUser,
  updateUser,
} from "../controllers/user.controller.js";
import { authGuard } from "../middlewares/auth.middleware.js";

const router = Router();

router.delete("/delete", authGuard, deleteUser);
router.get("", authGuard, getAllUser);
router.put("", authGuard, updateUser);
export default router;
