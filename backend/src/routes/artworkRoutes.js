import express from "express";
import { createArtwork, updateArtwork } from "../controllers/artworkController.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/", protectRoute, createArtwork);
router.patch("/:id", protectRoute, updateArtwork);

export default router;
