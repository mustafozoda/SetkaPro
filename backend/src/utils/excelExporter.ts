import ExcelJS from "exceljs";
import { Response } from "express";

export const exportMonthlyReportToExcel = async (
  report: any,
  res: Response
) => {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Monthly Report");

  sheet.columns = [
    { header: "Metric", key: "metric", width: 30 },
    { header: "Value", key: "value", width: 50 },
  ];

  sheet.addRows([
    { metric: "Month", value: report.month },
    { metric: "Total Mesh Produced", value: report.totalMeshProduced },
    { metric: "Wire Used (kg)", value: report.wireUsedKg },
    { metric: "Total Sold", value: report.totalSold },
    { metric: "Total Revenue", value: report.totalRevenue },
  ]);

  sheet.addRow([]);
  sheet.addRow({ metric: "Top Clients", value: "" });

  report.topClients.forEach((client: any) => {
    sheet.addRow({ metric: client.name, value: client.totalSpent });
  });

  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=report-${report.month}.xlsx`
  );
  await workbook.xlsx.write(res);
  res.end();
};
