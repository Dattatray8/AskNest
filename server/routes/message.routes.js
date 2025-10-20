import express, { Router } from "express";
import isAuth from "../middlewares/isAuth.js";
import {
  getAllMessages,
  sendMessage,
} from "../controllers/message.controller.js";
import { upload } from "../middlewares/multer.js";

const messageRouter = express(Router());

messageRouter.post("/send", isAuth, upload.single("media"), sendMessage);
messageRouter.get("/getmessages", isAuth, getAllMessages);

export default messageRouter;
