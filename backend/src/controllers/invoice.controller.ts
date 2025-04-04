import { Request, Response, NextFunction } from "express";
import * as invoiceService from "../services/invoice.service";

export const createInvoice = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const invoice = await invoiceService.createInvoice(req.user!.id, req.body);
    res.status(201).json(invoice);
  } catch (err) {
    next(err);
  }
};

export const getAllInvoices = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const invoices = await invoiceService.getAllInvoices();
    res.json(invoices);
  } catch (err) {
    next(err);
  }
};

export const getInvoiceById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const invoice = await invoiceService.getInvoiceById(req.params.id);
    res.json(invoice);
  } catch (err) {
    next(err);
  }
};

export const deleteInvoice = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await invoiceService.deleteInvoice(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

export const updateInvoicePayment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await invoiceService.addPayment(
      req.params.id,
      req.body.amount
    );
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const generateInvoicePDFRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const buffer = await invoiceService.getInvoicePDF(req.params.id);
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "inline; filename=invoice.pdf");
    res.send(buffer);
  } catch (err) {
    next(err);
  }
};

export const sendInvoiceByEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await invoiceService.emailInvoice(req.params.id);
    res.json({ message: "Email sent!" });
  } catch (err) {
    next(err);
  }
};
