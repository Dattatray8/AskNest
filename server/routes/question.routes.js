import express, { Router } from "express";
import isAuth from "../middlewares/isAuth.js";
import {
  allQuestions,
  askQuestion,
  iGotMyAnswer,
} from "../controllers/question.controller.js";

const questionRouter = express(Router());

questionRouter.post("/", isAuth, askQuestion);
questionRouter.get("/", isAuth, allQuestions);
questionRouter.put("/:questionId/stop", isAuth, iGotMyAnswer);

export default questionRouter;
