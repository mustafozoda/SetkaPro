import { Request, Response } from "express";
import prisma from "../prisma/client";

// Add new wire stock
export const addWire = async (req: Request, res: Response) => {
  try {
    const { type, diameter, quantityKg, pricePerKg, supplier } = req.body;

    if (
      !type ||
      !diameter ||
      quantityKg == null ||
      pricePerKg == null ||
      !supplier
    ) {
      return res.status(400).json({ error: "Missing required wire fields" });
    }

    const wire = await prisma.wire.create({
      data: { type, diameter, quantityKg, pricePerKg, supplier },
    });

    res.status(201).json(wire);
  } catch (err) {
    console.error("Add wire error:", err);
    res.status(500).json({ error: "Failed to add wire" });
  }
};

// Get all wire entries
export const getAllWire = async (_req: Request, res: Response) => {
  try {
    const wires = await prisma.wire.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(wires);
  } catch (err) {
    console.error("Get wire error:", err);
    res.status(500).json({ error: "Failed to fetch wires" });
  }
};

// Get available wire (for production)
export const getAvailableWire = async (_req: Request, res: Response) => {
  try {
    const wires = await prisma.wire.findMany({
      select: {
        id: true,
        type: true,
        diameter: true,
        quantityKg: true,
        pricePerKg: true,
        supplier: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    });

    res.json(wires);
  } catch (err) {
    console.error("Get available wire error:", err);
    res.status(500).json({ error: "Failed to fetch available wire" });
  }
};

// Update wire
export const updateWire = async (req: Request, res: Response) => {
  try {
    const wireId = Number(req.params.id);
    const { type, diameter, quantityKg, pricePerKg, supplier } = req.body;

    const existing = await prisma.wire.findUnique({ where: { id: wireId } });
    if (!existing) return res.status(404).json({ error: "Wire not found" });

    const updated = await prisma.wire.update({
      where: { id: wireId },
      data: { type, diameter, quantityKg, pricePerKg, supplier },
    });

    res.json(updated);
  } catch (err) {
    console.error("Update wire error:", err);
    res.status(500).json({ error: "Failed to update wire" });
  }
};

// Delete wire
export const deleteWire = async (req: Request, res: Response) => {
  try {
    const wireId = Number(req.params.id);
    const existing = await prisma.wire.findUnique({ where: { id: wireId } });
    if (!existing) return res.status(404).json({ error: "Wire not found" });

    await prisma.wire.delete({ where: { id: wireId } });
    res.json({ message: "Wire deleted successfully" });
  } catch (err) {
    console.error("Delete wire error:", err);
    res.status(500).json({ error: "Failed to delete wire" });
  }
};
