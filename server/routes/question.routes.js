import express, { Router } from "express";
import isAuth from "../middlewares/isAuth.js";
import {
  allQuestions,
  askQuestion,
  getCustomQuestions,
  getQuestion,
  iGotMyAnswer,
} from "../controllers/question.controller.js";
import { upload } from "../middlewares/multer.js";

const questionRouter = express(Router());

questionRouter.post("/", isAuth, upload.single("media"), askQuestion);
questionRouter.get("/page/:page", isAuth, allQuestions);
questionRouter.get("/:questionId", isAuth, getQuestion);
questionRouter.put("/:questionId/:answerId/stop", isAuth, iGotMyAnswer);
questionRouter.post("/filter/:questionType", isAuth, getCustomQuestions);

export default questionRouter;
