import express, { Router } from "express";
import isAuth from "../middlewares/isAuth.js";
import {
  getAllMessages,
  sendMessage,
} from "../controllers/message.controller.js";

const messageRouter = express(Router());

messageRouter.post("/send", isAuth, sendMessage);
messageRouter.get("/getmessages", isAuth, getAllMessages);

export default messageRouter;
