import { Request, Response, NextFunction } from "express";
import * as financeService from "../services/finance.service";

export const createFinanceEntry = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const entry = await financeService.createFinanceEntry(req.body);
    res.status(201).json(entry);
  } catch (err) {
    next(err);
  }
};

export const getAllFinance = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const entries = await financeService.getAllFinance();
    res.json(entries);
  } catch (err) {
    next(err);
  }
};

export const getFinanceByMonth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const entries = await financeService.getFinanceByMonth(req.params.month);
    res.json(entries);
  } catch (err) {
    next(err);
  }
};

export const deleteFinanceEntry = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await financeService.deleteFinanceEntry(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
