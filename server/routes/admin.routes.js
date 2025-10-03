import express from "express";
import {
  approveTeacherApplication,
  disapproveTeacherApplication,
  getAllTeacherApplications,
  getAllUsers,
} from "../controllers/admin.controller.js";
import isAuth from "../middlewares/isAuth.js";

const adminRouter = express.Router();

adminRouter.post("/approve/:userId", isAuth, approveTeacherApplication);
adminRouter.post("/disapprove/:userId", isAuth, disapproveTeacherApplication);
adminRouter.get("/applications", isAuth, getAllTeacherApplications);
adminRouter.get("/users", isAuth, getAllUsers);

export default adminRouter;
