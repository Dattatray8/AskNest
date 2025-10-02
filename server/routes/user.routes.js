import express, { Router } from "express";
import isAuth from "../middlewares/isAuth.js";
import {
  applyForTeacherRole,
  editProfile,
  getCurrentUser,
  getProfile,
  removeApplicationForTeacherRole,
  search,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.js";

const userRouter = express(Router());

userRouter.get("/getcurrentuser", isAuth, getCurrentUser);
userRouter.post(
  "/editProfile",
  isAuth,
  upload.single("profileImage"),
  editProfile
);
userRouter.get("/profile/:userName", isAuth, getProfile);
userRouter.get("/search", isAuth, search);
userRouter.post("/applyTeacherRole", isAuth, applyForTeacherRole);
userRouter.post("/removeTeacherApplication", isAuth, removeApplicationForTeacherRole);

export default userRouter;
