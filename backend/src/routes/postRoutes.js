import express from "express";
import { createPost, getUserPosts } from "../controllers/postController.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/", protectRoute, createPost);

router.get("/me", protectRoute, getUserPosts);



export default router;