import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";
import User from "../models/User.model.js";
import { sendOtpMail } from "../utils/mail.js";

// ===================== SIGNUP =====================
export const signUp = async (req, res) => {
  try {
    const { name, email, mobile, password, role } = req.body;

    if (!name || !email || !mobile || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    //  Hash password

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      mobile,
      password: hashedPassword,
      role,
    });

    //  Generate token

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "20d" },
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      maxAge: 20 * 24 * 60 * 60 * 1000, // 20 days
    });

    res.status(201).json({
      success: true,
      message: "Signup successful",

      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================== LOGIN =====================
export const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    //  Check user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    //  Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "20d" },
    );
    // set cookies
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      maxAge: 20 * 24 * 60 * 60 * 1000, // 20 days
    });

    res.status(200).json({
      success: true,
      message: "Login successful",

      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ==================== LOGOUT =====================
export const logOut = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ success: true, message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ==================== forgot password =====================

export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) return res.status(400).json({ message: "Email is required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // generate OTP
    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    user.resetOtp = otp;
    user.otpExpiresIn = Date.now() + 5 * 60 * 1000; // 5 minutes
    await user.save();

    // call nodemailer
    await sendOtpMail(email, otp);

    res.status(200).json({
      success: true,
      message: "OTP sent to email",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error while sending OTP" });
  }
};

// ==================== verify otp =====================

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp)
      return res.status(400).json({ message: "Email and OTP required" });

    const user = await User.findOne({ email });

    if (!user || user.resetOtp !== otp)
      return res.status(400).json({ message: "Invalid OTP/User" });

    if (user.otpExpiresIn < Date.now())
      return res.status(400).json({ message: "OTP expired" });
    user.isOtpVerified = true;
    user.resetOtp = undefined;
    user.otpExpiry = undefined;
    await user.save();
    res.status(200).json({
      success: true,
      message: "OTP verified",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error while verifying OTP" });
  }
};

// ====================reset password =====================

export const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    console.log(email);
    console.log(newPassword);

    if (!email || !newPassword)
      return res
        .status(400)
        .json({ message: " Invalid User/Password try again" });

    const user = await User.findOne({ email });

    if (!user || !user.isOtpVerified)
      return res.status(404).json({ message: "User not found" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;

    user.isOtpVerified = false;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password reset successful",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error while password reset" });
  }
};
