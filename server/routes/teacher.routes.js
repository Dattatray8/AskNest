import express, { Router } from "express";
import isAuth from "../middlewares/isAuth.js";
import {
  getAllAnswers,
  verifyAnswer,
} from "../controllers/teacher.controller.js";

const teacherRouter = express(Router());

teacherRouter.get("/answered/:teacherId", isAuth, getAllAnswers);
teacherRouter.put("/verify/:answerId", isAuth, verifyAnswer);

export default teacherRouter;
