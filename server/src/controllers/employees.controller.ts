import { Request, Response } from "express";
import { pool } from "../db";

class EmployeesController {
  async getEmployees(req: Request, res: Response) {
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
  }
}

export const employeesController = new EmployeesController();
