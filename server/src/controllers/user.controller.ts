import { Request, Response } from "express";
import { pool } from "../db";
import { userService } from "../service/userService";

class UserController {
  async registration(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const userData = await userService.registration(email, password);

      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return res.json(userData);
    } catch ({ message }: unknown) {
      res.status(400).send({ message });
    }
  }

  async login(req: Request, res: Response) {
    try {
    } catch (err) {}
  }

  async logout(req: Request, res: Response) {
    try {
    } catch (err) {}
  }

  async activate(req: Request, res: Response) {
    try {
    } catch (err) {}
  }

  async refresh(req: Request, res: Response) {
    try {
    } catch (err) {}
  }

  async getUsers(req: Request, res: Response) {
    try {
    } catch (err) {}
  }
}

export const userController = new UserController();
