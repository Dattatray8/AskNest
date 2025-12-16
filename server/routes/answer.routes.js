import express, { Router } from "express";
import isAuth from "../middlewares/isAuth.js";
import { allAnswers, answer } from "../controllers/answer.controller.js";
import { upload } from "../middlewares/multer.js";

const answerRouter = express(Router());

answerRouter.post("/:questionId", isAuth, upload.single("media"), answer);
answerRouter.get("/:questionId", isAuth, allAnswers);

export default answerRouter;
