import express from "express";
import * as controller from "../controllers/user.js";
import Auth from "../middleware/auth.js";

const router = express.Router();

/** FIND */
router.get("/:id", controller.getUser);
router.delete("/deleteAll", controller.deleteAllUsers);

export default router;
