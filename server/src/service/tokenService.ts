import jwt from "jsonwebtoken";
import { pool } from "../db";
import { IUserDto } from "../models/userModel";

class TokenService {
  generateToken(payload: IUserDto) {
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
    const tokenData = await pool.query("SELECT id FROM users WHERE id = $1", [
      userId,
    ]);

    if (tokenData.rowCount !== 0) {
      await pool.query('UPDATE tokens SET "refreshToken" = $1 WHERE id = $2', [
        refreshToken,
        userId,
      ]);
    }

    const token = await pool.query(
      `INSERT INTO tokens (id, "refreshToken") VALUES ($1, $2)`,
      [userId, refreshToken]
    );

    return token;
  }

  async removeToken(refreshToken: string) {
    const tokenData = await pool.query(
      `DELETE FROM tokens WHERE "refreshToken" = $1`,
      [refreshToken]
    );

    return tokenData;
  }

  async findToken(refreshToken: string) {
    const tokenData = await pool.query(
      `SELECT "refreshToken" FROM tokens WHERE "refreshToken" = $1`,
      [refreshToken]
    );

    return tokenData;
  }
}

export const tokenService = new TokenService();
