import { Request, Response } from "express";
import prisma from "../prisma/client";
import { startOfMonth, endOfMonth } from "date-fns";
import PDFDocument from "pdfkit";

// 🔁 Shared data logic
export const getMonthlyData = async (month: string) => {
  const [year, m] = month.split("-").map(Number);
  const from = startOfMonth(new Date(year, m - 1));
  const to = endOfMonth(from);

  const productions = await prisma.meshProduction.findMany({
    where: { createdAt: { gte: from, lte: to } },
    include: { employee: true },
  });

  const invoices = await prisma.invoice.findMany({
    where: { createdAt: { gte: from, lte: to } },
    include: { client: true, employee: true, items: true },
  });

  const productionByEmployee = productions.reduce((acc: any, p) => {
    const emp = p.employee?.name || "Unknown";
    acc[emp] = (acc[emp] || 0) + p.quantity;
    return acc;
  }, {});

  const productionByType = productions.reduce((acc: any, p) => {
    acc[p.meshType] = (acc[p.meshType] || 0) + p.quantity;
    return acc;
  }, {});

  const wireUsedKg = productions.reduce((sum, p) => sum + p.wireUsedKg, 0);
  const totalProduced = productions.reduce((sum, p) => sum + p.quantity, 0);

  const salesByType = invoices
    .flatMap((i) => i.items)
    .reduce((acc: any, item) => {
      acc[item.meshType] = (acc[item.meshType] || 0) + item.quantity;
      return acc;
    }, {});

  const totalSold = Object.values(salesByType).reduce(
    (sum: number, q: any) => sum + q,
    0
  );

  const totalRevenue = invoices.reduce((sum, i) => sum + i.total, 0);

  const unsoldMesh = Object.keys(productionByType).reduce((acc: any, type) => {
    acc[type] = (productionByType[type] || 0) - (salesByType[type] || 0);
    return acc;
  }, {});

  const topClients = Object.values(
    invoices.reduce((acc: any, i) => {
      const id = i.clientId;
      if (!acc[id]) acc[id] = { name: i.client.name, totalSpent: 0 };
      acc[id].totalSpent += i.total;
      return acc;
    }, {})
  ).sort((a: any, b: any) => b.totalSpent - a.totalSpent);

  return {
    month,
    totalMeshProduced: totalProduced,
    wireUsedKg,
    totalSold,
    totalRevenue,
    productionByEmployee,
    productionByType,
    salesByType,
    unsoldMesh,
    topClients,
    invoices,
  };
};

// 📄 PDF Export
export const generateMonthlyPdfReport = async (req: Request, res: Response) => {
  try {
    const month = req.query.month as string;
    if (!month)
      return res
        .status(400)
        .json({ error: "Month is required (e.g., 2025-04)" });

    const report = await getMonthlyData(month);

    const doc = new PDFDocument();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `inline; filename="Monthly-Report-${month}.pdf"`
    );

    doc.fontSize(20).text(`Monthly Report - ${month}`, { align: "center" });
    doc.moveDown();

    doc.fontSize(14).text(`Total Mesh Produced: ${report.totalMeshProduced}`);
    doc.text(`Wire Used (kg): ${report.wireUsedKg}`);
    doc.text(`Total Sold: ${report.totalSold}`);
    doc.text(`Total Revenue: $${report.totalRevenue}`);
    doc.moveDown();

    doc.fontSize(16).text("Invoices", { underline: true });
    report.invoices.forEach((inv) => {
      doc.moveDown(0.5);
      doc
        .fontSize(12)
        .text(
          `#${inv.id} | ${inv.client.name} | ${inv.total}$ | ${new Date(
            inv.createdAt
          ).toLocaleDateString()}`
        );
      inv.items.forEach((item) => {
        doc.text(
          ` - ${item.meshType} | Qty: ${item.quantity} | Price: ${item.unitPrice}$`
        );
      });
    });

    doc.end();
    doc.pipe(res);
  } catch (err) {
    console.error("PDF generation error:", err);
    res.status(500).json({ error: "Failed to generate PDF" });
  }
};

// 📊 JSON report
export const getMonthlyReport = async (req: Request, res: Response) => {
  try {
    const month = req.query.month as string;
    if (!month)
      return res
        .status(400)
        .json({ error: "Month is required (e.g., 2025-04)" });

    const report = await getMonthlyData(month);
    res.json(report);
  } catch (err) {
    console.error("Monthly report error:", err);
    res.status(500).json({ error: "Failed to fetch report" });
  }
};
