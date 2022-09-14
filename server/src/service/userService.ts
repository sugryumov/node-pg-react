import bcrypt from "bcrypt";
import { v4 } from "uuid";
import { pool } from "../db";
import { mailService } from "./mailService";
import { tokenService } from "./tokenService";
import { UserDto } from "../dtos/userDto";
import { ApiError } from "../exceptions/apiError";
import { IUser } from "../models/userModel";

class UserService {
  async registration(email: string, password: string) {
    const candidate = await pool.query(
      "SELECT email FROM users WHERE email = $1",
      [email]
    );

    if (candidate.rowCount !== 0) {
      throw ApiError.BadRequest(
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
      throw ApiError.BadRequest("Некорректная ссылка активации");
    }

    await pool.query(
      'UPDATE users SET "isActivated" = $1 WHERE "activationLink" = $2',
      [true, activationLink]
    );
  }

  async login(email: string, password: string) {
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (user.rowCount === 0) {
      throw ApiError.BadRequest(
        `Пользователь с почтовым адресом ${email} не найден`
      );
    }

    const isPassEquals = await bcrypt.compare(password, user.rows[0].password);

    if (!isPassEquals) {
      throw ApiError.BadRequest("Неверный пароль");
    }

    const userDto = new UserDto(user.rows[0]);
    const tokens = tokenService.generateToken({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async logout(refreshToken: string) {
    const token = await tokenService.removeToken(refreshToken);

    return token;
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }

    const userData = tokenService.validateRefreshToken(refreshToken) as IUser;
    const tokenFromDb = await tokenService.findToken(refreshToken);

    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }

    const user = await pool.query("SELECT * FROM users WHERE id = $1", [
      userData?.id,
    ]);

    const userDto = new UserDto(user.rows[0]);
    const tokens = tokenService.generateToken({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }
}

export const userService = new UserService();
