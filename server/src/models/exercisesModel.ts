import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { sequelize } from "../config/db.config";

interface IExerciseModel
  extends Model<
    InferAttributes<IExerciseModel>,
    InferCreationAttributes<IExerciseModel>
  > {
  id: CreationOptional<number>;
  level: string;
  type: string;
  part: string;
  rules: string;
  example: string;
}

export const ExerciseModel = sequelize.define<IExerciseModel>("exercises", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  level: { type: DataTypes.STRING },
  type: { type: DataTypes.STRING },
  part: { type: DataTypes.STRING },
  rules: { type: DataTypes.STRING },
  example: { type: DataTypes.STRING },
});
