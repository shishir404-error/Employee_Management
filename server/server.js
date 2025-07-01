import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import assetRoutes from "./routes/assetRoutes.js"
import { connectDB } from "./config/db.js";
import designationRoutes from "./routes/designationRoutes.js";

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
app.use("/api/assets", assetRoutes);
app.use("/api/designations", designationRoutes);




// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
