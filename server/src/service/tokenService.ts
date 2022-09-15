import jwt from "jsonwebtoken";
import { TokenModel } from "../models/tokenModel";

class TokenService {
  generateToken(payload: any) {
    const accessToken = jwt.sign(
      payload,
      process.env.JWT_ACCESS_SECRET || "access",
      {
        expiresIn: "30m",
      }
    );

    const refreshToken = jwt.sign(
      payload,
      process.env.JWT_REFRESH_SECRET || "refresh",
      {
        expiresIn: "30d",
      }
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  validateAccessToken(token: string) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET || "");

      return userData;
    } catch (err) {
      return null;
    }
  }

  validateRefreshToken(token: string) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET || "");

      return userData;
    } catch (err) {
      return null;
    }
  }

  async saveToken(userId: string, refreshToken: string) {
    const tokenData = await TokenModel.findOne({
      where: { user: userId },
    });

    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }

    const token = await TokenModel.create({
      user: userId,
      refreshToken,
    });

    return token;
  }

  async removeToken(refreshToken: string) {
    const tokenData = TokenModel.destroy({ where: { refreshToken } });

    return tokenData;
  }

  async findToken(refreshToken: string) {
    const tokenData = await TokenModel.findOne({ where: { refreshToken } });

    return tokenData;
  }
}

export const tokenService = new TokenService();
