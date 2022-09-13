import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { pool } from "../db";
import { ApiError } from "../exceptions/apiError";
import { userService } from "../service/userService";

class UserController {
  async registration(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return next(
          ApiError.BadRequest("Ошибка при валидации", errors.array())
        );
      }

      const { email, password } = req.body;
      const userData = await userService.registration(email, password);

      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return res.json(userData);
    } catch (err) {
      next(err);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (err) {
      next(err);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (err) {
      next(err);
    }
  }

  async activate(req: Request, res: Response, next: NextFunction) {
    try {
      const activationLink = req.params.link;
      await userService.activate(activationLink);

      return res.redirect(process.env.CLIENT_URL || "");
    } catch (err) {
      next(err);
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (err) {
      next(err);
    }
  }

  async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const results = await pool
        .query("SELECT * FROM users")
        .then((payload) => {
          return payload.rows;
        })
        .catch(() => {
          throw new Error("Query failed");
        });
      res.setHeader("Content-Type", "application/json");
      res.status(200);
      res.send(JSON.stringify(results));
    } catch (err) {
      next(err);
    }
  }
}

export const userController = new UserController();
