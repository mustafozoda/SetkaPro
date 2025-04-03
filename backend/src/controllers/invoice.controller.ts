import { Request, Response } from "express";
import prisma from "../prisma/client";
import { startOfMonth, endOfMonth } from "date-fns";

export const createInvoice = async (req: Request, res: Response) => {
  const { clientId, employeeId, items } = req.body;

  if (!clientId || !items || items.length === 0) {
    return res.status(400).json({ error: "Client and items are required" });
  }

  const total = items.reduce((sum: number, item: any) => {
    return sum + item.unitPrice * item.quantity;
  }, 0);

  const invoice = await prisma.invoice.create({
    data: {
      clientId,
      employeeId,
      total,
      items: {
        create: items.map((item: any) => ({
          meshType: item.meshType,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
        })),
      },
    },
    include: {
      client: true,
      employee: true,
      items: true,
    },
  });

  res.status(201).json(invoice);
};

export const getInvoices = async (req: Request, res: Response) => {
  const { month, clientId } = req.query;

  const where: any = {};
  if (month) {
    const [year, m] = (month as string).split("-").map(Number);
    where.createdAt = {
      gte: startOfMonth(new Date(year, m - 1)),
      lte: endOfMonth(new Date(year, m - 1)),
    };
  }
  if (clientId) {
    where.clientId = Number(clientId);
  }

  const invoices = await prisma.invoice.findMany({
    where,
    include: {
      client: true,
      employee: true,
      items: true,
    },
    orderBy: { createdAt: "desc" },
  });

  res.json(invoices);
};

export const updateInvoice = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { items } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ error: "Invoice items required" });
  }

  const total = items.reduce((sum: number, item: any) => {
    return sum + item.unitPrice * item.quantity;
  }, 0);

  // Delete existing items
  await prisma.saleItem.deleteMany({ where: { invoiceId: Number(id) } });

  const invoice = await prisma.invoice.update({
    where: { id: Number(id) },
    data: {
      total,
      items: {
        create: items.map((item: any) => ({
          meshType: item.meshType,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
        })),
      },
    },
    include: {
      client: true,
      employee: true,
      items: true,
    },
  });

  res.json(invoice);
};
