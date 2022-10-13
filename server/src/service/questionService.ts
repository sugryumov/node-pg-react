import { ExerciseDto } from "../dtos/exerciseDto";
import { QuestionDto } from "../dtos/questionDto";
import { ExerciseModel } from "../models/exercisesModel";
import { QuestionModel } from "../models/questionModel";

class QuestionService {
  async getQuestions(level: any, type: any, part: any) {
    const questions = await QuestionModel.findAndCountAll({
      where: { level, type, part },
    });

    const questionDto = questions.rows.map(
      (question) => new QuestionDto(question)
    );

    const exerciseInfo = await ExerciseModel.findOne({
      where: { level, type, part },
    });

    const exerciseDto = new ExerciseDto(exerciseInfo);

    return {
      count: questions.count,
      data: questionDto,
      info: exerciseDto,
    };
  }
}

export const questionService = new QuestionService();
