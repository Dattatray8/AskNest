import express, { Router } from "express";
import isAuth from "../middlewares/isAuth.js";
import {
  approveReport,
  getAllAnswers,
  removeReport,
  verifyAnswer,
} from "../controllers/teacher.controller.js";
import isTeacher from "../middlewares/isTeacher.js";

const teacherRouter = express(Router());

teacherRouter.get("/answered/:teacherId", isAuth, getAllAnswers);
teacherRouter.put("/verify/:answerId", isAuth, verifyAnswer);
teacherRouter.post("/report", isAuth, isTeacher, approveReport);
teacherRouter.delete("/report/:reportId", isAuth, isTeacher, removeReport);

export default teacherRouter;
