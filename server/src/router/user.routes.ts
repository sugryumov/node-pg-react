import Router from "express";
import { body } from "express-validator";
import { userController } from "../controllers/user.controller";
import { authMiddleware } from "../middleware/authMiddleware";

export const userRouter = Router();

userRouter.post(
  "/registration",
  body("email").isEmail(),
  body("password").isLength({ min: 3, max: 32 }),
  userController.registration
);
userRouter.post("/login", userController.login);
userRouter.post("/logout", userController.logout);
userRouter.get("/activate/:link", userController.activate);
userRouter.get("/refresh", userController.refresh);
userRouter.get("/users", authMiddleware, userController.getUsers);
