import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.js";
import artworkRoutes from "./routes/artworkRoutes.js";

dotenv.config();

const app = express()

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/artworks", artworkRoutes);

app.get("/test", (req, res) => {
    res.json({ message: "Backend running" });
});

app.get("/test-cookie", (req, res) => {
  res.json({ cookies: req.cookies });
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});