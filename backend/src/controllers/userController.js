import { z } from "zod";
import { prisma } from "../prismaClient.js"

const usernameParamsSchema = z.object({
    username: z.string().min(1).max(20),
});

const getUserProfile = async (req, res, next) => {
    try {

        const result = usernameParamsSchema.safeParse(req.params);

        // validate body
        if (!result.success) {
            return res.status(400).json({ ok: false, errors: z.flattenError(result.error) });
        }

        const { username } = result.data;

        const user = await prisma.user.findUnique({
            where: {
                username: username
            },
            include: {
                posts: {
                    orderBy: {
                        publishedAt: "desc",
                    },
                    include: {
                        artwork: true,
                        author: {
                            select: {
                                id: true,
                                username: true,
                            },
                        },
                    },
                },
            },
        })

        if (!user) {
            return res.status(404).json({ ok: false, error: "Username not found" });
        }

        // dont leak stuff like email and password hash lol
        const publicUser = {
            id: user.id,
            username: user.username,
            createdAt: user.createdAt,
        };

        return res.status(200).json({ 
            ok: true,
             data: { 
                user: publicUser,
                posts: user.posts,
            } });

    } catch (err) {
        next(err);
    }
};

export { getUserProfile };