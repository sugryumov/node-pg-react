import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { sequelize } from "../config/db.config";

interface IQuestionModel
  extends Model<
    InferAttributes<IQuestionModel>,
    InferCreationAttributes<IQuestionModel>
  > {
  id: CreationOptional<number>;
  level: string;
  type: string;
  part: string;
  rules: string;
  body: string;
  answersVariant: string[][];
  correctAnswer: string;
}

export const QuestionModel = sequelize.define<IQuestionModel>("questions", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  level: { type: DataTypes.STRING },
  type: { type: DataTypes.STRING },
  part: { type: DataTypes.STRING },
  rules: { type: DataTypes.STRING },
  body: { type: DataTypes.STRING },
  answersVariant: { type: DataTypes.ARRAY(DataTypes.ARRAY(DataTypes.STRING)) },
  correctAnswer: { type: DataTypes.STRING },
});
