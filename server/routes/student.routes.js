import express, { Router } from "express";
import isAuth from "../middlewares/isAuth.js";
import {
  acceptedAnswers,
  answeredQuestions,
  askedQuestions,
} from "../controllers/student.controller.js";

const studentRouter = express(Router());

studentRouter.get("/asked/:studentId", isAuth, askedQuestions);
studentRouter.get("/answered/:studentId", isAuth, answeredQuestions);
studentRouter.get("/answered/accepted/:studentId", isAuth, acceptedAnswers);

export default studentRouter;
