import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import { connectDB } from "./config/db.js";

// Load env variables
dotenv.config();

const app = express();

// Middlewares
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json());

// MongoDB connection
connectDB();

// Routes
app.use("/api/auth", authRoutes);

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
