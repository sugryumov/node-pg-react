import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { userRouter } from "./router/user.routes";
import { errorMiddleware } from "./middleware/errorMiddleware";
import { sequelize } from "./config/db.config";

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);
app.use("/api", userRouter);
app.use(errorMiddleware);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    app.listen(PORT, () => console.log(`Server is running at ${PORT}`));
  } catch (err) {
    console.log(err);
  }
};

start();
