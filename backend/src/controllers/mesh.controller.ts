import { Request, Response } from "express";
import prisma from "../prisma/client";
import { asyncHandler } from "../utils/asyncHandler";

// GET all mesh
export const getAllMesh = asyncHandler(async (_req: Request, res: Response) => {
  const mesh = await prisma.meshProduction.findMany({
    include: { employee: true },
    orderBy: { createdAt: "desc" },
  });
  res.json(mesh);
});

// POST create mesh + deduct wire by type & diameter
export const addMesh = asyncHandler(async (req: Request, res: Response) => {
  const { meshType, quantity, wireUsedKg, wireDiameter, employeeId } = req.body;

  if (!meshType || !wireDiameter || !quantity || !wireUsedKg || !employeeId) {
    return res.status(400).json({ error: "Missing required mesh fields" });
  }

  // Create mesh production
  const mesh = await prisma.meshProduction.create({
    data: { meshType, quantity, wireUsedKg, wireDiameter, employeeId },
  });

  const baseType = meshType.split("x")[0]; // e.g., "10" from "10x10"

  // Deduct wire based on type + diameter
  const wireUpdate = await prisma.wire.updateMany({
    where: {
      type: baseType,
      diameter: wireDiameter,
    },
    data: {
      quantityKg: {
        decrement: wireUsedKg,
      },
    },
  });

  if (wireUpdate.count === 0) {
    return res.status(404).json({
      error: `No matching wire found for type "${baseType}" and diameter "${wireDiameter}"`,
    });
  }

  res.status(201).json(mesh);
});
