import express from "express";
import dotenv from "dotenv";
import { dbConnection } from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);

app.listen(process.env.PORT, () => {
  dbConnection();
  console.log(`Server is listening on PORT: ${process.env.PORT}`);
});
