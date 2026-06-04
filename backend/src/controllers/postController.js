import { z } from "zod";
import { prisma } from "../prismaClient.js"

const createPostSchema = z.object({
    artworkId: z.number().int().positive(),
    caption: z.string().max(300).optional(),
});

const createPost = async (req, res, next) => {
    try {

        const result = createPostSchema.safeParse(req.body);

        if (!result.success) {
            return res.status(400).json({
                ok: false,
                errors: z.flattenError(result.error),
            });
        }

        const { artworkId, caption } = result.data;

        const artwork = await prisma.artwork.findFirst({
            where: {
                id: artworkId,
                creatorId: req.user.id,
            },
            include: {
                post: true,
            },
        });

        if (!artwork) {
            return res.status(404).json({
                ok: false,
                error: "Artwork not found",
            });
        }

        if (artwork.post) {
            return res.status(409).json({
                ok: false,
                error: "Artwork is already published",
            });
        }

        const post = await prisma.post.create({
            data: {
                artworkId,
                authorId: req.user.id,
                caption: caption || null,
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
        });

        return res.status(201).json({
            ok: true,
            data: { post },
        });



    } catch (err) {
        next(err);
    }
};

const getUserPosts = async (req, res, next) => {
    try {
        const posts = await prisma.post.findMany({
            where: {
                authorId: req.user.id,
            },
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
        });

        return res.status(200).json({
            ok: true,
            data: { posts },
        });
    } catch (err) {
        next(err);
    }
};

const getPosts = async (req, res, next) => {
    try {

        const posts = await prisma.post.findMany({
            orderBy: {
                publishedAt: "desc",
            },
            take: 20,
            include: {
                artwork: true,
                author: {
                    select: {
                        id: true,
                        username: true,
                    },
                },
            },
        });

        return res.status(200).json({
            ok: true,
            data: { posts },
        });



    } catch (err) {
        next(err);
    }
};

export { createPost, getUserPosts, getPosts };