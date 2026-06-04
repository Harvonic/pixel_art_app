import { z } from "zod";
import { prisma } from "../prismaClient.js"

const artworkSchema = z
    .object({
        width: z.number().int().positive().max(32),
        height: z.number().int().positive().max(32),
        pixels: z.array(z.string().regex(/^#[0-9a-fA-F]{6}$/).nullable()).max(32 * 32),
    })
    .refine(
        (data) => data.pixels.length === data.width * data.height,
        {
            message: "Pixel count must match width times height",
            path: ["pixels"],
        }
    );

const createArtwork = async (req, res, next) => {
    try {
        const result = artworkSchema.safeParse(req.body);

        // validate body
        if (!result.success) {
            return res.status(400).json({ ok: false, errors: z.flattenError(result.error) });
        }

        const { width, height, pixels } = result.data;

        // create artwork in db
        const artwork = await prisma.artwork.create({
            data: {
                creatorId: req.user.id,
                width,
                height,
                pixels,
            },
        });

        return res.status(201).json({ ok: true, data: { artwork } });

    } catch (err) {
        next(err);
    }
};

const updateArtwork = async (req, res, next) => {
    try {
        const artworkId = Number(req.params.id);

        if (!Number.isInteger(artworkId) || artworkId <= 0) {
            return res.status(400).json({ ok: false, error: "Invalid artwork ID" });
        }

        const result = artworkSchema.safeParse(req.body);

        // validate body
        if (!result.success) {
            return res.status(400).json({ ok: false, errors: z.flattenError(result.error) });
        }

        const existingArtwork = await prisma.artwork.findFirst({
            where: {
                id: artworkId,
                creatorId: req.user.id,
            },
            include: {
                post: true,
            },
        });

        if (!existingArtwork) {
            return res.status(404).json({
                ok: false,
                error: "Artwork not found",
            });
        }

        if (existingArtwork.post) {
            return res.status(409).json({
                ok: false,
                error: "Published artwork cannot be edited",
            });
        }

        const { width, height, pixels } = result.data;

        const artwork = await prisma.artwork.update({
            where: {
                id: artworkId,
            },
            data: {
                width,
                height,
                pixels,
            },
        });

        return res.status(200).json({ ok: true, data: { artwork } });
    } catch (err) {
        next(err);
    }
};

const getArtworks = async (req, res, next) => {
    try {
        const artworks = await prisma.artwork.findMany({
            where: {
                creatorId: req.user.id,
                post: null,
            },
            orderBy: {
                updatedAt: "desc",
            },
        });

        return res.status(200).json({ ok: true, data: { artworks } });

    } catch (err) {
        next(err);
    }
};

const getArtworkById = async (req, res, next) => {
    try {
        const artworkId = Number(req.params.id);

        if (!Number.isInteger(artworkId) || artworkId <= 0) {
            return res.status(400).json({ ok: false, error: "Invalid artwork ID" });
        }

        const artwork = await prisma.artwork.findFirst({
            where: {
                creatorId: req.user.id,
                id: artworkId
            },
        });

        if (!artwork) {
            return res.status(404).json({ ok: false, error: "Artwork not found", });
        }

        return res.status(200).json({ ok: true, data: { artwork } });

    } catch (err) {
        next(err);
    }
};

const deleteArtwork = async (req, res, next) => {
    try {
        const artworkId = Number(req.params.id);

        if (!Number.isInteger(artworkId) || artworkId <= 0) {
            return res.status(400).json({ ok: false, error: "Invalid artwork ID" });
        }

        const existingArtwork = await prisma.artwork.findFirst({
            where: {
                id: artworkId,
                creatorId: req.user.id,
            },
            include: {
                post: true,
            },
        });

        if (!existingArtwork) {
            return res.status(404).json({
                ok: false,
                error: "Artwork not found",
            });
        }

        if (existingArtwork.post) {
            return res.status(409).json({
                ok: false,
                error: "Published artwork cannot be deleted",
            });
        }

        await prisma.artwork.delete({
            where: {
                id: artworkId,
                creatorId: req.user.id,
            },
        });

        return res.status(200).json({ ok: true, message: "Artwork deleted" });

    } catch (err) {
        next(err);
    }
};

export { createArtwork, updateArtwork, getArtworks, getArtworkById, deleteArtwork };