import express, { Router } from "express";
import {
  login,
  logout,
  resetPassword,
  sendOtp,
  sendOtpForEmailVerification,
  signup,
  verifyOtp,
  verifyOtpForEmailVerification,
} from "../controllers/auth.controller.js";

const authRouter = express(Router());

authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.get("/logout", logout);
authRouter.post("/sendotp", sendOtp);
authRouter.post("/verifyotp", verifyOtp);
authRouter.post("/resetpassword", resetPassword);
authRouter.post("/sendotpemailverification", sendOtpForEmailVerification);
authRouter.post("/verifyotpemailverification", verifyOtpForEmailVerification);

export default authRouter;
