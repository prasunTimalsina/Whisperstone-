import { Router } from "express";

import { getMessages, sendMessage } from "../controllers/message.controller.js";
import { validateData } from "../middlewares/validation.middleware.js";
import { messageSchema } from "../schemas/messageSchema.js";
import { authGuard } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("", validateData(messageSchema), authGuard, sendMessage);
router.get("", authGuard, getMessages);

export default router;
