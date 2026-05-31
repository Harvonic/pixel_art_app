import jwt from "jsonwebtoken";
import { prisma } from "../prismaClient.js";

const sanitizeUser = (user) => ({
    id: user.id,
    email: user.email,
    username: user.username,
    createdAt: user.createdAt,
});

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({
                ok: false,
                error: "Not authorized",
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await prisma.user.findUnique({
            where: { id: decoded.id },
        });

        if (!user) {
            return res.status(401).json({
                ok: false,
                error: "Not authorized",
            });
        }

        req.user = sanitizeUser(user);

        next();
    }
    catch (err) {
        return res.status(401).json({
            ok: false,
            error: "Not authorized",
        });
    }
};