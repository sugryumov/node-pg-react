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
  body: string;
  answer: string[][];
}

export const QuestionModel = sequelize.define<IQuestionModel>("questions", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  level: { type: DataTypes.STRING },
  type: { type: DataTypes.STRING },
  part: { type: DataTypes.STRING },
  body: { type: DataTypes.STRING },
  answer: { type: DataTypes.ARRAY(DataTypes.ARRAY(DataTypes.STRING)) },
});
