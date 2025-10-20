import express, { Router } from "express";
import isAuth from "../middlewares/isAuth.js";
import {
  acceptedAnswers,
  answeredQuestions,
  askedQuestions,
  verifiedAnswers,
} from "../controllers/student.controller.js";

const studentRouter = express(Router());

studentRouter.get("/asked/:studentId", isAuth, askedQuestions);
studentRouter.get("/answered/:studentId", isAuth, answeredQuestions);
studentRouter.get("/answered/accepted/:studentId", isAuth, acceptedAnswers);
studentRouter.get("/answered/verified/:studentId", isAuth, verifiedAnswers);

export default studentRouter;
