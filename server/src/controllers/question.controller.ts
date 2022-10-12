import { Request, Response, NextFunction } from "express";
import { questionService } from "../service/questionService";

class QuestionController {
  async question(req: Request, res: Response, next: NextFunction) {
    try {
      const { level, type, part } = req.query;

      const questions = await questionService.getQuestions(level, type, part);

      return res.json(questions);
    } catch (err) {
      next(err);
    }
  }
}

export const questionController = new QuestionController();
