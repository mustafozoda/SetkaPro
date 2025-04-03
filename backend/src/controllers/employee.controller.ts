import { Request, Response } from "express";
import prisma from "../prisma/client";

export const addEmployee = async (req: Request, res: Response) => {
  try {
    const { name, role, salary } = req.body;

    if (!name || !role || salary === undefined) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const employee = await prisma.employee.create({
      data: { name, role, salary },
    });

    res.status(201).json(employee);
  } catch (error) {
    console.error("Error adding employee:", error);
    res.status(500).json({ error: "Failed to add employee" });
  }
};

export const getAllEmployees = async (_req: Request, res: Response) => {
  try {
    const employees = await prisma.employee.findMany({
      orderBy: { createdAt: "desc" },
    });

    res.json(employees);
  } catch (error) {
    console.error("Error getting employees:", error);
    res.status(500).json({ error: "Failed to get employees" });
  }
};

export const updateEmployee = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, role, salary } = req.body;

    const employeeId = Number(id);
    if (isNaN(employeeId)) {
      return res.status(400).json({ error: "Invalid employee ID" });
    }

    const existing = await prisma.employee.findUnique({
      where: { id: employeeId },
    });

    if (!existing) {
      return res.status(404).json({ error: "Employee not found" });
    }

    const updated = await prisma.employee.update({
      where: { id: employeeId },
      data: { name, role, salary },
    });

    res.json(updated);
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(500).json({ error: "Failed to update employee" });
  }
};

export const deleteEmployee = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const employeeId = Number(id);

    if (isNaN(employeeId)) {
      return res.status(400).json({ error: "Invalid employee ID" });
    }

    const existing = await prisma.employee.findUnique({
      where: { id: employeeId },
    });

    if (!existing) {
      return res.status(404).json({ error: "Employee not found" });
    }

    await prisma.employee.delete({ where: { id: employeeId } });
    res.json({ message: "Employee deleted successfully" });
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).json({ error: "Failed to delete employee" });
  }
};
