import express from "express";
import {
  actionOnSpam,
  allSpam,
  approveTeacherApplication,
  disapproveTeacherApplication,
  getAllTeacherApplications,
  getAllUsers,
  getCustomUsers,
} from "../controllers/admin.controller.js";
import isAuth from "../middlewares/isAuth.js";
import isAdmin from "../middlewares/isAdmin.js";

const adminRouter = express.Router();

adminRouter.post(
  "/approve/:userId",
  isAuth,
  isAdmin,
  approveTeacherApplication
);
adminRouter.post(
  "/disapprove/:userId",
  isAuth,
  isAdmin,
  disapproveTeacherApplication
);
adminRouter.get("/applications", isAuth, isAdmin, getAllTeacherApplications);
adminRouter.get("/users", isAuth, isAdmin, getAllUsers);
adminRouter.post("/users/:usersType", isAuth, isAdmin, getCustomUsers);
adminRouter.delete("/spam/:reportId", isAuth, isAdmin, actionOnSpam);
adminRouter.get("/spam", isAuth, isAdmin, allSpam);

export default adminRouter;
