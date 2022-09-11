import Router from "express";
import { employeesController } from "../controllers/employees.controller";

export const employeesRouter = Router();

employeesRouter.get("/employees", employeesController.getEmployees);
