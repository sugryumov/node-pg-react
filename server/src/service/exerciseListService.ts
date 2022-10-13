import { ExerciseListDto } from "../dtos/exerciseListDto";
import { ExerciseListModel } from "../models/exerciseListModel";

class ExerciseListService {
  async getExerciseList(level: any, type: any) {
    const exerciseList = await ExerciseListModel.findAndCountAll({
      where: { level, type },
    });

    const exerciseListDto = exerciseList.rows.map(
      (exercise) => new ExerciseListDto(exercise)
    );

    return { count: exerciseList.count, data: exerciseListDto };
  }
}

export const exerciseListService = new ExerciseListService();
