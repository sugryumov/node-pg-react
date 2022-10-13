import Router from "express";
import { exerciseListController } from "../controllers/exerciseList.controller";
import { authMiddleware } from "../middleware/authMiddleware";

export const exerciseListRouter = Router();

exerciseListRouter.get(
  "/exercise-list",
  authMiddleware,
  exerciseListController.exerciseList
);
