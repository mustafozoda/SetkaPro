import { Request, Response } from "express";
import prisma from "../prisma/client";

/**
 * @swagger
 * /api/meshRate:
 *   get:
 *     summary: Get all mesh rates
 *     description: Returns a list of mesh rates from the database
 *     responses:
 *       200:
 *         description: List of mesh rates
 */
export const getRates = async (req: Request, res: Response) => {
  try {
    const rates = await prisma.meshRate.findMany();
    res.json(rates);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch mesh rates" });
  }
};

/**
 * @swagger
 * /api/meshRate/create:
 *   post:
 *     summary: Create a new mesh rate
 *     description: Creates a new mesh rate in the database
 *     responses:
 *       201:
 *         description: Mesh rate successfully added
 *       400:
 *         description: Invalid request body
 */
export const addRate = async (req: Request, res: Response) => {
  const { meshType, rate, price } = req.body;

  if (!meshType || !rate || !price) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const newRate = await prisma.meshRate.create({
      data: { meshType, rate, price },
    });
    res.status(201).json(newRate);
  } catch (err) {
    res.status(500).json({ error: "Failed to create mesh rate" });
  }
};
