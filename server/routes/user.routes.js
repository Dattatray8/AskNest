import express, { Router } from "express";
import isAuth from "../middlewares/isAuth.js";
import { editProfile, getCurrentUser, getProfile, search } from "../controllers/user.controller.js";

const userRouter = express(Router());

userRouter.get("/getcurrentuser", isAuth, getCurrentUser);
userRouter.post(
  "/editProfile",
  isAuth,
//   upload.single("profileImage"),
  editProfile
);
userRouter.get("/profile/:userName", isAuth, getProfile);
userRouter.get("/search", isAuth, search);

export default userRouter;
