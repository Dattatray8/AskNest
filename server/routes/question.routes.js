import express, { Router } from "express";
import isAuth from "../middlewares/isAuth.js";
import {
  allQuestions,
  askQuestion,
  getQuestion,
  iGotMyAnswer,
} from "../controllers/question.controller.js";

const questionRouter = express(Router());

questionRouter.post("/", isAuth, askQuestion);
questionRouter.get("/", isAuth, allQuestions);
questionRouter.get("/:questionId", isAuth, getQuestion);
questionRouter.put("/:questionId/:answerId/stop", isAuth, iGotMyAnswer);

export default questionRouter;
