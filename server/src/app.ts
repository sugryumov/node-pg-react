import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { pool } from "./db";
import { employeesRouter } from "./router/employees.routes";
import { userRouter } from "./router/user.routes";
import { errorMiddleware } from "./middleware/errorMiddleware";

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/api", employeesRouter);
app.use("/api", userRouter);
app.use(errorMiddleware);

const start = async () => {
  try {
    await pool.connect();

    app.listen(PORT, () => console.log(`Server is running at ${PORT}`));
  } catch (err) {
    console.log(err);
  }
};

start();
