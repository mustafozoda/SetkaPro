// controllers/report.controller.ts
import { Request, Response, NextFunction } from "express";
import * as reportService from "../services/report.service";

export const getTopSellingMeshes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await reportService.getTopSellingMeshes();
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const getTopClients = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await reportService.getTopClients();
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const getTopWorkers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await reportService.getTopWorkers();
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const getCurrentStock = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await reportService.getCurrentStock();
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const getWireEfficiency = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await reportService.getWireEfficiency();
    res.json(result);
  } catch (err) {
    next(err);
  }
};
