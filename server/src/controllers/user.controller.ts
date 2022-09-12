import { Request, Response } from "express";
import { userService } from "../service/userService";

class UserController {
  async registration(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const userData = await userService.registration(email, password);

      return res.json(userData);
    } catch (err: any) {
      res.status(400);
      res.json({ message: err?.message });
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
