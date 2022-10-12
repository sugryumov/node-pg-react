import { QuestionModel } from "../models/questionModel";

class QuestionService {
  async getQuestions(level: any, type: any, part: any) {
    const questions = await QuestionModel.findAndCountAll({
      where: { level, type, part },
    });

    return questions;
  }
}

export const questionService = new QuestionService();
