import { fieldValidator } from "../helpers/validator.js";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { generateToken } from "../config/token.js";

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
    res.clearCookie("token",{
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

