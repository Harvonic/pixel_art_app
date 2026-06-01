import express from "express";
import { createArtwork, updateArtwork, getArtworks, getArtworkById } from "../controllers/artworkController.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/", protectRoute, createArtwork);
router.patch("/:id", protectRoute, updateArtwork);

router.get("/:id", protectRoute, getArtworkById);
router.get("/", protectRoute, getArtworks);

export default router;
