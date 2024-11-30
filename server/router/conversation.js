import express from "express";
import Auth from "../middleware/auth.js";
import * as controller from "../controllers/conversation.js";
const router = express.Router();

router.post("/", Auth, controller.createConversation);
router.get("/get-conversations", Auth, controller.getConversations);

router.patch("/update-last-message", Auth, controller.updateLastMessage);

router.delete(
  "/delete-conversation/:conversationId",
  Auth,
  controller.deleteConversation
);

export default router;
