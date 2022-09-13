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
}

export const tokenService = new TokenService();
