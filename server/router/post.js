import express from "express";
import * as controller from "../controllers/post.js";
import Auth from "../middleware/auth.js";

const router = express.Router();

router.get("/:userId/posts", Auth, controller.getUserPosts);
router.get("/foryou/getAll", controller.getFeedPosts);
router.get("/following/:userId", Auth, controller.getFollowingPosts);
router.get("/get-bookmared-posts", Auth, controller.getBookmarkedPosts);

/**UPDATE */
router.patch("/:postId/like", Auth, controller.likePost);
router.patch("/bookmark/:postId", Auth, controller.bookmarkPost);

/** DELETE */
router.delete("/:postId/delete", Auth, controller.deletePost);

export default router;
