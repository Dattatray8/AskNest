import express, { Router } from "express";
import isAuth from "../middlewares/isAuth.js";
import { getAllAnswers } from "../controllers/teacher.controller.js";

const teacherRouter = express(Router());

teacherRouter.get("/answered/:teacherId", isAuth, getAllAnswers);

export default teacherRouter;
