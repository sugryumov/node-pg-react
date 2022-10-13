import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { sequelize } from "../config/db.config";

interface IExerciseListModel
  extends Model<
    InferAttributes<IExerciseListModel>,
    InferCreationAttributes<IExerciseListModel>
  > {
  id: CreationOptional<number>;
  level: string;
  type: string;
  title: string;
  img: string;
}

export const ExerciseListModel = sequelize.define<IExerciseListModel>(
  "exerciseList",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    level: { type: DataTypes.STRING },
    type: { type: DataTypes.STRING },
    title: { type: DataTypes.STRING },
    img: { type: DataTypes.STRING },
  }
);
