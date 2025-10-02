import express, { Router } from "express";
import isAuth from "../middlewares/isAuth.js";
import {
  answeredQuestions,
  askedQuestions,
} from "../controllers/student.controller.js";

const studentRouter = express(Router());

studentRouter.get("/asked/:studentId", isAuth, askedQuestions);
studentRouter.get("/answered/:studentId", isAuth, answeredQuestions);

export default studentRouter;
