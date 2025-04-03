import express, { Request, Response } from "express";
import {
  getMonthlyReport,
  generateMonthlyPdfReport,
  getMonthlyData,
} from "../controllers/report.controller";

import { exportMonthlyReportToExcel } from "../utils/excelExporter";
import { verifyToken, requireOwner } from "../middleware/auth.middleware";
import { asyncHandler } from "../utils/asyncHandler";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Reports
 *   description: Monthly reports and analytics
 */

/**
 * @swagger
 * /api/reports/monthly:
 *   get:
 *     summary: Get monthly report (mesh, sales, wire usage)
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: month
 *         required: true
 *         schema:
 *           type: string
 *           example: 2025-04
 *         description: Target month in YYYY-MM format
 *     responses:
 *       200:
 *         description: Monthly report
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 month: { type: string }
 *                 totalMeshProduced: { type: integer }
 *                 wireUsedKg: { type: number }
 *                 totalSold: { type: integer }
 *                 totalRevenue: { type: number }
 *                 productionByEmployee:
 *                   type: object
 *                   additionalProperties: { type: integer }
 *                 productionByType:
 *                   type: object
 *                   additionalProperties: { type: integer }
 *                 salesByType:
 *                   type: object
 *                   additionalProperties: { type: integer }
 *                 unsoldMesh:
 *                   type: object
 *                   additionalProperties: { type: integer }
 *                 topClients:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name: { type: string }
 *                       totalSpent: { type: number }
 *                 invoices:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id: { type: integer }
 *                       total: { type: number }
 *                       createdAt: { type: string, format: date-time }
 *                       client:
 *                         type: object
 *                         properties:
 *                           id: { type: integer }
 *                           name: { type: string }
 *                       employee:
 *                         type: object
 *                         nullable: true
 *                         properties:
 *                           id: { type: integer }
 *                           name: { type: string }
 *                       items:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             meshType: { type: string }
 *                             quantity: { type: integer }
 *                             unitPrice: { type: number }
 */

/**
 * @swagger
 * /api/reports/monthly/pdf:
 *   get:
 *     summary: Download monthly report as PDF
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: month
 *         required: true
 *         schema:
 *           type: string
 *           example: 2025-04
 *         description: Month to generate PDF for
 *     responses:
 *       200:
 *         description: PDF generated
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 */

/**
 * @swagger
 * /api/reports/monthly/export:
 *   get:
 *     summary: Export monthly report to Excel
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: month
 *         required: true
 *         schema:
 *           type: string
 *           example: 2025-04
 *         description: Month to export as Excel
 *     responses:
 *       200:
 *         description: Excel file exported
 *         content:
 *           application/vnd.openxmlformats-officedocument.spreadsheetml.sheet:
 *             schema:
 *               type: string
 *               format: binary
 */

router.get(
  "/monthly",
  verifyToken,
  requireOwner,
  asyncHandler(getMonthlyReport)
);

router.get(
  "/monthly/pdf",
  verifyToken,
  requireOwner,
  asyncHandler(generateMonthlyPdfReport)
);

router.get(
  "/monthly/export",
  verifyToken,
  requireOwner,
  asyncHandler(
    async (req: Request<{}, {}, {}, { month: string }>, res: Response) => {
      const month = req.query.month;
      if (!month) {
        return res
          .status(400)
          .json({ error: "Query param 'month' is required" });
      }

      const report = await getMonthlyData(month);
      await exportMonthlyReportToExcel(report, res);
    }
  )
);

export default router;
