import { fieldValidator } from "../helpers/validator.js";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { generateToken } from "../config/token.js";
import sendMail from "../config/mail.js";
import client from "../config/redis.js";

export const signup = async (req, res) => {
  try {
    const { userName, email, password, role } = req.body;
    const signupRules = {
      userName: ["required", "unique"],
      email: ["required", "unique"],
      password: ["required"],
      role: ["required"],
    };
    const { valid, message } = await fieldValidator(req.body, signupRules);
    if (!valid) return res.status(400).json({ success: false, message });
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      userName,
      email,
      password: hashPassword,
      role,
    });
    const token = await generateToken(user?._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    const { password: _, ...safeUser } = user.toObject();
    return res.status(201).json({
      success: true,
      safeUser,
      message: "Signup successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Signup Failed : ${error.message}` });
  }
};

export const login = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const signupRules = {
      userName: ["required"],
      password: ["required"],
    };
    const { valid, message } = await fieldValidator(req.body, signupRules);
    if (!valid) return res.status(400).json({ success: false, message });
    const user = await User.findOne({ userName });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid username or password" });
    }
    const validPassword = await bcrypt.compare(password, user?.password);
    if (!validPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid username or password" });
    }
    if (
      user.isBanned &&
      user.banDuration &&
      new Date(user.banDuration) <= new Date()
    ) {
      user.isBanned = false;
      user.banDuration = null;
      user.spamMarkCount = 0;
      await user.save();
    }
    const token = await generateToken(user?._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    const { password: _, ...safeUser } = user.toObject();
    return res.status(200).json({
      success: true,
      message: "Login successfully",
      safeUser,
    });
  } catch (error) {
    return res.status(500).json({ message: `Login Failed : ${error.message}` });
  }
};

export const logout = async (_, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    return res
      .status(200)
      .json({ success: true, message: "Sign out successfully" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to SignOut",
      error: error.message,
    });
  }
};

export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not exists" });
    }
    const otp = Math.floor(1000 * Math.random() * 9000).toString();
    user.forgotPassword.resetOtp = otp;
    user.forgotPassword.otpExpires = Date.now() + 5 * 60 * 1000;
    user.forgotPassword.isOtpVerified = false;
    await user.save();
    await sendMail(email, otp);
    return res.status(200).json({
      success: true,
      message: "OTP sent successfully on Email, It May be in spam",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to Send OTP",
      error: error.message,
    });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });
    if (
      !user ||
      user.forgotPassword.resetOtp !== otp ||
      user.forgotPassword.otpExpires < Date.now()
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid/Expired OTP" });
    }
    user.forgotPassword.isOtpVerified = true;
    user.forgotPassword.resetOtp = undefined;
    user.forgotPassword.otpExpires = undefined;
    await user.save();
    return res
      .status(200)
      .json({ success: true, message: "OTP verified successfully" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to Verify OTP",
      error: error.message,
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !user.forgotPassword.isOtpVerified) {
      return res
        .status(400)
        .json({ success: false, message: "OTP verification required" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.forgotPassword.isOtpVerified = false;
    await user.save();
    return res
      .status(200)
      .json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to Reset Password",
      error: error.message,
    });
  }
};

export const sendOtpForEmailVerification = async (req, res) => {
  try {
    let { email } = req.body;
    const otp = Math.floor(1000 * Math.random() * 9000).toString();
    const hashOtp = await bcrypt.hash(otp, 10);
    await client.set(`otp: ${email}`, hashOtp, { EX: 300 });
    await sendMail(email, otp);
    return res.status(200).json({
      success: true,
      message: "OTP sent successfully on Email, It May be in spam",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to send OTP for Email Verification",
      error: error.message,
    });
  }
};

export const verifyOtpForEmailVerification = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const hashOtp = await client.get(`otp: ${email}`);
    if (!hashOtp) {
      return res
        .status(400)
        .json({ success: false, message: "OTP expired, Please resend OTP" });
    }
    const isValidOtp = await bcrypt.compare(otp, hashOtp);
    if (!isValidOtp) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }
    await client.del(`otp: ${email}`);
    return res
      .status(200)
      .json({ success: true, message: "Email verified successfully" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to verify OTP for Email Verification",
      error: error.message,
    });
  }
};
