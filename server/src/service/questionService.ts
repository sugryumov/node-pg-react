import { QuestionModel } from "../models/questionModel";

class QuestionService {
  async getQuestions(level: any, type: any) {
    const questions = await QuestionModel.findAndCountAll({
      where: { level, type },
    });

    return questions;
  }
}

export const questionService = new QuestionService();
