import express from "express";
import { getUserProfile } from "../controllers/userController.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

// not protected (so ai companies can scrap data obviously)
router.get("/:username", getUserProfile)

export default router;