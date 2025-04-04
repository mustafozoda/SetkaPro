import { Request, Response, NextFunction } from "express";
import * as clientService from "../services/client.service";

export const createClient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const client = await clientService.createClient(req.body);
    res.status(201).json(client);
  } catch (err) {
    next(err);
  }
};

export const getAllClients = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const clients = await clientService.getAllClients();
    res.json(clients);
  } catch (err) {
    next(err);
  }
};

export const getClientById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const client = await clientService.getClientById(req.params.id);
    res.json(client);
  } catch (err) {
    next(err);
  }
};

export const updateClient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const updated = await clientService.updateClient(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const deleteClient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await clientService.deleteClient(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
