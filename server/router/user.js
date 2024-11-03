import express from "express";
import * as controller from "../controllers/user.js";
import Auth from "../middleware/auth.js";

const router = express.Router();

/** FIND */
router.get("/:id", controller.getUser);
router.post("/suggestFriends", Auth, controller.getFriendSuggestions);
router.get("/search/:name", Auth, controller.searchUser);
router.post("/admin/get-users", Auth, controller.getAllUsers);

/** POST */
router.post("/getAllFollowing", Auth, controller.getAllFollowing);
router.post("/getAllFollower", Auth, controller.getAllFollower);

/** PUT */
router.put("/:id/follow", Auth, controller.followUser);
router.put("/:id/unfollow", Auth, controller.unfollowUser);

/** DELETE */
router.delete("/deleteUser/:userId", Auth, controller.deleteUser);
export default router;
