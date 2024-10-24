import express from "express";
import * as controller from "../controllers/post.js";
import Auth from "../middleware/auth.js";

const router = express.Router();

router.get("/getAll", controller.getFeedPosts);
router.get("/:userId/posts", Auth, controller.getUserPosts);

/**UPDATE */
// router.patch("/:id/like", Auth, likePost);

export default router;
