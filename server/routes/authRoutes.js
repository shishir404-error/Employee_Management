import express from "express";
import {
  register,
  verifyEmail,
  login,
  forgotPassword,
  resetPassword,
} from "../controllers/authController.js";
import { authenticate } from "../middlewares/auth.js"; // 🛡️ JWT middleware

const router = express.Router();

// ✨ Public Routes
router.post("/register", register);
router.post("/verify", verifyEmail);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

// 🔐 Protected Route (after login only)
router.get("/me", authenticate, (req, res) => {
  res.json({
    msg: "Welcome, you are authorized ✅",
    user: req.user, // contains decoded user id
  });
});

export default router;
