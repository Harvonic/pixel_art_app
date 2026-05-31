import express from "express";
import { register, login, logout } from "../controllers/authController.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.post("/logout", logout);

router.get("/me", protectRoute, (req, res) => {
    return res.status(200).json({
        ok: true,
        data: { user: req.user },
    });
});

export default router;
