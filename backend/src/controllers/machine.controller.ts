import { Request, Response, NextFunction } from "express";
import * as machineService from "../services/machine.service";

export const createMachine = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const machine = await machineService.createMachine(req.body);
    res.status(201).json(machine);
  } catch (err) {
    next(err);
  }
};

export const getAllMachines = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const machines = await machineService.getAllMachines();
    res.json(machines);
  } catch (err) {
    next(err);
  }
};

export const getMachineById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const machine = await machineService.getMachineById(req.params.id);
    res.json(machine);
  } catch (err) {
    next(err);
  }
};

export const updateMachine = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const updated = await machineService.updateMachine(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const deleteMachine = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await machineService.deleteMachine(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

export const createMachineLog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const log = await machineService.createMachineLog(
      req.params.id,
      req.user!.id,
      req.body
    );
    res.status(201).json(log);
  } catch (err) {
    next(err);
  }
};

export const getMachineLogs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const logs = await machineService.getMachineLogs(req.params.id);
    res.json(logs);
  } catch (err) {
    next(err);
  }
};
