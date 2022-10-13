import { Request, Response, NextFunction } from "express";
import { exerciseListService } from "../service/exerciseListService";

class ExerciseListController {
  async exerciseList(req: Request, res: Response, next: NextFunction) {
    try {
      const { level, type } = req.query;

      const exerciseList = await exerciseListService.getExerciseList(
        level,
        type
      );

      return res.json(exerciseList);
    } catch (err) {
      next(err);
    }
  }
}

export const exerciseListController = new ExerciseListController();
