import jwt from 'jsonwebtoken';
import ms from "ms";

export const generateToken = (userId, res) => {

    const expiresIn = process.env.JWT_EXPIRES_IN || "7d";

    const payload = {id: userId, }
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn,
    });

    res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: ms(expiresIn),
    });
    return token;

};