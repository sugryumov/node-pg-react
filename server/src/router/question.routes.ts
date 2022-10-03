import Router from "express";
import { questionController } from "../controllers/question.controller";

export const questionRouter = Router();

questionRouter.get("/question", questionController.question);
