import express from "express";
import {
  register,
  verifyEmail,
  login,
  forgotPassword,
  resetPassword,
  getMe, // ✅ import kiya
} from "../controllers/authController.js";
import { authenticate } from "../middlewares/auth.js"; // 🛡️ JWT middleware

const router = express.Router();

// ✨ Public Routes
router.post("/register", register);
router.post("/verify", verifyEmail);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

// 🔐 Protected Route
router.get("/me", authenticate, getMe);

export default router;
