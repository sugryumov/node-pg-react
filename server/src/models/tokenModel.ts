import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { sequelize } from "../config/db.config";

interface ITokenModel
  extends Model<
    InferAttributes<ITokenModel>,
    InferCreationAttributes<ITokenModel>
  > {
  user: string;
  refreshToken: string;
}

export const TokenModel = sequelize.define<ITokenModel>("tokens", {
  user: { type: DataTypes.INTEGER, references: { model: "users" } },
  refreshToken: { type: DataTypes.STRING },
});
