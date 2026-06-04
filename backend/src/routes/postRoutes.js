import express from "express";
import { createPost, getUserPosts, getPosts } from "../controllers/postController.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();


router.get("/me", protectRoute, getUserPosts);

router.get("/", protectRoute, getPosts)
router.post("/", protectRoute, createPost);



export default router;