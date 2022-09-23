import bcrypt from "bcrypt";
import { v4 } from "uuid";
import { mailService } from "./mailService";
import { tokenService } from "./tokenService";
import { UserDto } from "../dtos/userDto";
import { ApiError } from "../exceptions/apiError";
import { UserModel } from "../models/userModel";

class UserService {
  async registration(email: string, password: string) {
    const candidate = await UserModel.findOne({ where: { email } });

    if (candidate) {
      throw ApiError.BadRequest(
        `Пользователь с почтовым адресом ${email} уже существует`
      );
    }

    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = v4();
    const resetPasswordLink = v4();

    const user = await UserModel.create({
      email,
      password: hashPassword,
      activationLink,
      resetPasswordLink,
    });

    await mailService.sendActivationMail(
      email,
      `${process.env.API_URL}/api/activate/${activationLink}`
    );

    const userDto = new UserDto(user.toJSON());

    const tokens = tokenService.generateToken({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async activate(activationLink: string) {
    const user = await UserModel.findOne({ where: { activationLink } });

    if (!user) {
      throw ApiError.BadRequest("Некорректная ссылка активации");
    }

    user.isActivated = true;

    await user.save();
  }

  async login(email: string, password: string) {
    const user = await UserModel.findOne({ where: { email } });

    if (!user) {
      throw ApiError.BadRequest(
        `Пользователь с почтовым адресом ${email} не найден`
      );
    }

    const isPassEquals = await bcrypt.compare(password, user.toJSON().password);

    if (!isPassEquals) {
      throw ApiError.BadRequest("Неверный пароль");
    }

    const userDto = new UserDto(user.toJSON());
    const tokens = tokenService.generateToken({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async resetPassword(email: string) {
    const user = await UserModel.findOne({ where: { email } });

    if (!user) {
      throw ApiError.BadRequest(
        `Пользователь с почтовым адресом ${email} не найден`
      );
    }

    const resetPasswordLink = user?.toJSON().resetPasswordLink;

    await mailService.senRestorePasswordLink(
      email,
      `${process.env.API_URL}/api/reset-password/${resetPasswordLink}`
    );
  }

  async newPassword(password: string, resetPasswordLink: string) {
    const user = await UserModel.findOne({ where: { resetPasswordLink } });

    if (!user) {
      throw ApiError.BadRequest("Некорректная ссылка сброса пароля");
    }

    const hashPassword = await bcrypt.hash(password, 3);
    const newResetPasswordLink = v4();

    user.password = hashPassword;
    user.resetPasswordLink = newResetPasswordLink;

    await user.save();
  }

  async logout(refreshToken: string) {
    const token = await tokenService.removeToken(refreshToken);

    return token;
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }

    const userData: any = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);

    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }

    const user = await UserModel.findOne({ where: { id: userData?.id } });

    const userDto = new UserDto(user?.toJSON());
    const tokens = tokenService.generateToken({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async getAllUsers() {
    const users = await UserModel.findAll();

    return users;
  }
}

export const userService = new UserService();
