import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { Pool } from "pg";

dotenv.config();

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

const pool = new Pool({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || "5432"),
});

const start = async () => {
  try {
    await pool.connect();

    app.listen(PORT, () => console.log(`Server is running at ${PORT}`));

    app.get("/employees", async (req: Request, res: Response) => {
      const results = await pool
        .query("SELECT * FROM employees")
        .then((payload) => {
          return payload.rows;
        })
        .catch(() => {
          throw new Error("Query failed");
        });
      res.setHeader("Content-Type", "application/json");
      res.status(200);
      res.send(JSON.stringify(results));
    });
  } catch (err) {
    console.log(err);
  }
};

start();
