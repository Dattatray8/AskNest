import express, { Router } from "express";
import isAuth from "../middlewares/isAuth.js";
import { createReport, getReports } from "../controllers/report.controller.js";
import isTeacher from "../middlewares/isTeacher.js";

const reportRouter = express(Router());

reportRouter.post("/", isAuth, createReport);
reportRouter.get("/", isAuth, isTeacher, getReports);

export default reportRouter;
