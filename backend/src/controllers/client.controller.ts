import { Request, Response } from "express";
import prisma from "../prisma/client";

// CREATE
export const createClient = async (req: Request, res: Response) => {
  const { name, phone, address } = req.body;
  if (!name) return res.status(400).json({ error: "Client name is required" });

  const client = await prisma.client.create({ data: { name, phone, address } });
  res.status(201).json(client);
};

// READ
export const getAllClients = async (_req: Request, res: Response) => {
  const clients = await prisma.client.findMany({
    orderBy: { createdAt: "desc" },
  });
  res.json(clients);
};

// UPDATE
export const updateClient = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, phone, address } = req.body;

  const updated = await prisma.client.update({
    where: { id: Number(id) },
    data: { name, phone, address },
  });

  res.json(updated);
};

// DELETE
export const deleteClient = async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.client.delete({ where: { id: Number(id) } });
  res.json({ message: "Client deleted successfully" });
};
