import bcrypt from "bcrypt";
import { z } from "zod";
import { prisma } from "../prismaClient.js"
import { generateToken } from "../utils/generateToken.js";


const registerSchema = z.object({
    email: z.email(),
    username: z.string().max(20), 
    password: z.string().min(8)
});

const loginSchema = z.object({
    login: z.string().min(1, "Email or username is required"),
    password: z.string().min(1, "Password is required"),
});

const sanitizeUser = (user) => ({
    id: user.id,
    email: user.email,
    username: user.username,
    createdAt: user.createdAt,
});


const register = async (req, res, next) => {
    try {
        const result = registerSchema.safeParse(req.body);

        // validate body
        if (!result.success) {
            return res.status(400).json({ ok: false, errors: z.flattenError(result.error) });
        }

        const { email, username, password } = result.data;

        // check if email or username is used already
        const existingEmail = await prisma.user.findUnique({ where: { email }});
        if (existingEmail) {return res.status(409).json({ ok: false, error: "Email is already in use" })}

        const existingUsername = await prisma.user.findUnique({ where: { username }});
        if (existingUsername) {return res.status(409).json({ ok: false, error: "Username is already taken" })}
        
        // hash password
        const passwordHash = await bcrypt.hash(password, 10)

        // create user in db
        const user = await prisma.user.create({
            data: {
                email,
                username,
                passwordHash,
            },
        });

         // Generate JWT Token
        const token = generateToken(user.id, res);

        return res.status(201).json({ ok: true, data: { 
            user: sanitizeUser(user),
            token,
        }});
    }
    catch(err) {
        next(err);
    }
};

const login = async (req, res, next) => {
    try {
        const result = loginSchema.safeParse(req.body);

        // validate body
        if (!result.success) {
            return res.status(400).json({ ok: false, errors: z.flattenError(result.error) });
        }

        const { login, password } = result.data;

        // check if email or username exists
        const user = await prisma.user.findFirst({ 
            where: {
                OR: [
                    { email: login },
                    { username: login },
                ],
            }
        });

        if (!user) {return res.status(401).json({ ok: false, error: "Invalid login or password" })}

        const passwordMatches = await bcrypt.compare(password, user.passwordHash);

        if (!passwordMatches) {return res.status(401).json({ ok: false, error: "Invalid login or password" })}

        // Generate JWT Token
        const token = generateToken(user.id, res);

        return res.status(201).json({ ok: true, data: { 
            user: sanitizeUser(user),
            token,
        }});
    }
    catch(err) {
        next(err);
    }
};

const logout = async (req, res, next) => {
    try {

        res.clearCookie("jwt", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
        });

        return res.status(200).json({ ok: true, message: "Logged out successfully"});
    }
    catch(err) {
        next(err);
    }
};

export { register, login, logout };