import bcrypt from "bcrypt";
import { v4 } from "uuid";
import { pool } from "../db";
import { mailService } from "./mailService";
import { tokenService } from "./tokenService";
import { UserDto } from "../dtos/userDto";

class UserService {
  async registration(email: string, password: string) {
    const candidate = await pool.query(
      "SELECT email FROM users WHERE email = $1",
      [email]
    );

    if (candidate.rowCount !== 0) {
      throw new Error(
        `Пользователь с почтовым адресом ${email} уже существует`
      );
    }

    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = v4();

    const user = await pool.query(
      `INSERT INTO users (email, password, "isActivated", "activationLink") VALUES ($1, $2, $3, $4) RETURNING *`,
      [email, hashPassword, 0, activationLink]
    );

    await mailService.sendActivationMail(
      email,
      `${process.env.API_URL}/api/activate/${activationLink}`
    );

    const userDto = new UserDto(user.rows[0]);
    const tokens = tokenService.generateToken({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async activate(activationLink: string) {
    const candidate = await pool.query(
      'SELECT "activationLink" FROM users WHERE "activationLink" = $1',
      [activationLink]
    );

    if (candidate.rowCount === 0) {
      throw new Error("Некорректная ссылка активации");
    }

    await pool.query(
      'UPDATE users SET "isActivated" = $1 WHERE "activationLink" = $2',
      [true, activationLink]
    );
  }
}

export const userService = new UserService();
