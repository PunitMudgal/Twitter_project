import express from "express";
import * as controller from "../controllers/message.js";
import Auth from "../middleware/auth.js";

const router = express.Router();

router.get("/:conversationId", Auth, controller.getUserMessages);
router.post("/", Auth, controller.createMessage);
router.patch("/mark-read/:messageId", Auth, controller.markMessageRead);
router.delete("/delete-message/:messageId", Auth, controller.deleteMessage);

export default router;
