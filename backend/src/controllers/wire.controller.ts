import { Request, Response, NextFunction } from "express";
import * as wireService from "../services/wire.service";

export const createWire = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const wire = await wireService.createWire(req.body);
    res.status(201).json(wire);
  } catch (err) {
    next(err);
  }
};

export const getAllWires = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const list = await wireService.getAllWires();
    res.json(list);
  } catch (err) {
    next(err);
  }
};

export const getWireBalanceByType = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const balance = await wireService.getRemainingWireByType(
      req.params.wireType
    );
    res.json({ wireType: req.params.wireType, remainingKg: balance });
  } catch (err) {
    next(err);
  }
};

export const deleteWire = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await wireService.deleteWire(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
