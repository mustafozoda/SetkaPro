import { Request, Response } from "express";
import { prisma } from "../config/prisma";

// Create a new mesh type
export const createMeshType = async (req: Request, res: Response) => {
  try {
    const mesh = await prisma.meshType.create({ data: req.body });
    res.status(201).json(mesh);
  } catch (err) {
    res.status(500).json({ message: "Failed to create mesh type", error: err });
  }
};

// Get all mesh types
export const getAllMeshTypes = async (req: Request, res: Response) => {
  try {
    const meshes = await prisma.meshType.findMany();
    res.status(200).json(meshes);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to retrieve mesh types", error: err });
  }
};

// Get a specific mesh type by ID
export const getMeshTypeById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const mesh = await prisma.meshType.findUnique({
      where: { id: req.params.id },
    });
    if (!mesh) {
      res.status(404).json({ message: "Mesh type not found" });
      return;
    }
    res.status(200).json(mesh);
  } catch (err) {
    res.status(500).json({ message: "Error getting mesh type", error: err });
  }
};

// Update a mesh type
export const updateMeshType = async (req: Request, res: Response) => {
  try {
    const mesh = await prisma.meshType.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.status(200).json(mesh);
  } catch (err) {
    res.status(500).json({ message: "Failed to update mesh type", error: err });
  }
};

// Delete a mesh type
export const deleteMeshType = async (req: Request, res: Response) => {
  try {
    await prisma.meshType.delete({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: "Failed to delete mesh type", error: err });
  }
};
