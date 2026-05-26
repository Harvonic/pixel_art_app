import bcrypt from "bcrypt";
import { z } from "zod";
import { prisma } from "../prismaClient.js"


const registerSchema = z.object({
    email: z.email(),
    username: z.string().max(20), 
    password: z.string().min(8)
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

        return res.status(201).json({ ok: true, data: { user: sanitizeUser(user)}});
    }
    catch(err) {
        next(err);
    }
};

export { register };