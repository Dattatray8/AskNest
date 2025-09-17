import express from "express";
import dotenv from "dotenv";
import { dbConnection } from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import messageRouter from "./routes/message.routes.js";
import { app, server } from "./socket.js";
import questionRouter from "./routes/question.routes.js";

dotenv.config();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/chat", messageRouter);
app.use("/api/v1/questions", questionRouter);

server.listen(process.env.PORT, () => {
  dbConnection();
  console.log(`Server is listening on PORT: ${process.env.PORT}`);
});
