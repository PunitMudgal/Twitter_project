import express from "express";
import * as controller from "../controllers/user.js";
import Auth from "../middleware/auth.js";

const router = express.Router();

/** FIND */
router.get("/:id", controller.getUser);
router.get("/suggestFriends/:userId", Auth, controller.getFriendSuggestions);

/** PUT */
router.put("/:id/follow", Auth, controller.followUser);
router.put("/:id/unfollow", Auth, controller.unfollowUser);

router.delete("/deleteAll", controller.deleteAllUsers);
router.delete("/deleteUser/:id", controller.deleteUser);
export default router;
