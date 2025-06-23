import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { generateOTP } from "../utils/generateOtp.js";
import { sendEmail } from "../services/emailService.js";

// 🔹 Register User & send OTP
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ msg: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 min

    const user = await User.create({
      name,
      email,
      password: hashed,
      otp,
      otpExpires
    });

    await sendEmail(email, "Verify your Email", `Your OTP is ${otp}`);
    res.status(201).json({ msg: "User registered. OTP sent to email." });
  } catch (err) {
    res.status(500).json({ msg: "Registration failed", error: err.message });
  }
};

// 🔹 Verify Email OTP
export const verifyEmail = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User not found" });

    if (user.otp !== otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ msg: "Invalid or expired OTP" });
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    res.json({ msg: "Email verified successfully" });
  } catch (err) {
    res.status(500).json({ msg: "OTP verification failed", error: err.message });
  }
};

// 🔹 Login
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User not found" });

    if (!user.isVerified) return res.status(401).json({ msg: "Email not verified" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ msg: "Login failed", error: err.message });
  }
};

// 🔹 Forgot Password
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User not found" });

    const otp = generateOTP();
    user.otp = otp;
    user.otpExpires = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();

    await sendEmail(email, "Reset your password", `Your OTP is ${otp}`);
    res.json({ msg: "OTP sent to email" });
  } catch (err) {
    res.status(500).json({ msg: "Failed to send OTP", error: err.message });
  }
};

// 🔹 Reset Password
export const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User not found" });

    if (user.otp !== otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ msg: "Invalid or expired OTP" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    res.json({ msg: "Password reset successful" });
  } catch (err) {
    res.status(500).json({ msg: "Reset failed", error: err.message });
  }
};
