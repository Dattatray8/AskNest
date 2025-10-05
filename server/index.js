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
import answerRouter from "./routes/answer.routes.js";
import studentRouter from "./routes/student.routes.js";
import adminRouter from "./routes/admin.routes.js";
import teacherRouter from "./routes/teacher.routes.js";

dotenv.config();

app.use(
  cors({
    origin: "https://query-sphere.onrender.com",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/chat", messageRouter);
app.use("/api/v1/questions", questionRouter);
app.use("/api/v1/answers", answerRouter);
app.use("/api/v1/student", studentRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/teacher", teacherRouter);

server.listen(process.env.PORT, () => {
  dbConnection();
  console.log(`Server is listening on PORT: ${process.env.PORT}`);
});
