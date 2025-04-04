import { Request, Response, NextFunction } from "express";
import * as salaryService from "../services/salary.service";

export const createSalary = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await salaryService.createSalary(req.body);
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
};

export const getAllSalaries = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await salaryService.getAllSalaries();
    res.json(data);
  } catch (err) {
    next(err);
  }
};

export const getSalariesByMonth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await salaryService.getSalariesByMonth(req.params.month);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

export const markSalaryAsPaid = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await salaryService.markSalaryAsPaid(req.params.id);
    res.json(data);
  } catch (err) {
    next(err);
  }
};
