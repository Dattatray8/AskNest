import express, { Router } from "express";
import { login, logout, resetPassword, sendOtp, signup, verifyOtp } from "../controllers/auth.controller.js";

const authRouter = express(Router());

authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.get("/logout", logout);
authRouter.post("/sendotp", sendOtp);
authRouter.post("/verifyotp", verifyOtp);
authRouter.post("/resetpassword", resetPassword);

export default authRouter;
