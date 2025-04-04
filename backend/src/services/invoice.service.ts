// services/invoice.service.ts
import { prisma } from "../config/prisma";
import { calculateInvoiceTotal } from "../utils/calculate";
import { generateInvoicePDF } from "../utils/pdf";
import { sendEmail } from "../utils/mail";
import fs from "fs";

export const createInvoice = async (
  sellerId: string,
  input: {
    clientId: string;
    meshTypeId: string;
    quantity: number;
    pricePerUnit: number;
    amountPaid?: number;
  }
) => {
  const mesh = await prisma.meshType.findUnique({
    where: { id: input.meshTypeId },
  });
  if (!mesh) throw { status: 404, message: "Mesh type not found" };

  if (mesh.currentStock < input.quantity) {
    throw { status: 400, message: "Not enough mesh in stock" };
  }

  const total = calculateInvoiceTotal(input.quantity, input.pricePerUnit);
  const paid = input.amountPaid || 0;
  const due = total - paid;

  const invoice = await prisma.invoice.create({
    data: {
      sellerId,
      clientId: input.clientId,
      meshTypeId: input.meshTypeId,
      quantity: input.quantity,
      pricePerUnit: input.pricePerUnit,
      total,
      amountPaid: paid,
      dueAmount: due,
      isPaid: due <= 0,
    },
  });

  await prisma.meshType.update({
    where: { id: input.meshTypeId },
    data: {
      currentStock: { decrement: input.quantity },
    },
  });

  return invoice;
};

export const getAllInvoices = async () => {
  return prisma.invoice.findMany({
    include: {
      meshType: true,
      client: true,
      seller: true,
    },
    orderBy: { createdAt: "desc" },
  });
};

export const getInvoiceById = async (id: string) => {
  const invoice = await prisma.invoice.findUnique({
    where: { id },
    include: {
      meshType: true,
      client: true,
      seller: true,
    },
  });
  if (!invoice) throw { status: 404, message: "Invoice not found" };
  return invoice;
};

export const deleteInvoice = async (id: string) => {
  return prisma.invoice.delete({ where: { id } });
};

export const addPayment = async (invoiceId: string, amount: number) => {
  const invoice = await prisma.invoice.findUnique({ where: { id: invoiceId } });
  if (!invoice) throw { status: 404, message: "Invoice not found" };

  await prisma.paymentLog.create({
    data: { invoiceId, amount },
  });

  const newAmountPaid = invoice.amountPaid + amount;
  const newDue = invoice.total - newAmountPaid;

  return prisma.invoice.update({
    where: { id: invoiceId },
    data: {
      amountPaid: newAmountPaid,
      dueAmount: newDue,
      isPaid: newDue <= 0,
    },
  });
};

export const getInvoicePDF = async (invoiceId: string): Promise<Buffer> => {
  const invoice = await prisma.invoice.findUnique({
    where: { id: invoiceId },
    include: { client: true, meshType: true, seller: true },
  });

  if (!invoice) throw { status: 404, message: "Invoice not found" };

  const filePath = `/tmp/invoice-${invoiceId}.pdf`;
  await generateInvoicePDF(invoice, filePath);
  return fs.readFileSync(filePath);
};

export const emailInvoice = async (invoiceId: string) => {
  const invoice = await prisma.invoice.findUnique({
    where: { id: invoiceId },
    include: { client: true, meshType: true, seller: true },
  });

  if (!invoice || !invoice.client?.email) {
    throw { status: 400, message: "No client email available" };
  }

  const filePath = `/tmp/invoice-${invoiceId}.pdf`;
  await generateInvoicePDF(invoice, filePath);

  await sendEmail(
    invoice.client.email,
    `Invoice for mesh purchase`,
    `<p>Dear ${invoice.client.name},<br/>Please find attached your invoice.</p>`,
    [{ filename: "invoice.pdf", path: filePath }]
  );
};
