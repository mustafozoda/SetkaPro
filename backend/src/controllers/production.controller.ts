import { Request, Response, NextFunction } from "express";
import * as productionService from "../services/production.service";

export const createProduction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await productionService.createProduction(
      req.user!.id,
      req.body
    );
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
};

export const getAllProductions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await productionService.getAllProductions();
    res.json(data);
  } catch (err) {
    next(err);
  }
};

export const getProductionByDate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { date } = req.query;
    const data = await productionService.getProductionByDate(date as string);
    res.json(data);
  } catch (err) {
    next(err);
  }
};
