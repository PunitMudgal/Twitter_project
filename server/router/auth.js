import express from "express";
import * as controller from "../controllers/auth.js";
import Auth from "../middleware/auth.js";

const router = express.Router();

/** POST */
router.post("/register", controller.register);
router.post("/login", controller.login);
router.get("/logout", controller.logout);

/** GET */
router.get("/getAllUsers", controller.getAllUsers);
router.get("/check", Auth, controller.checkAuth);

export default router;
