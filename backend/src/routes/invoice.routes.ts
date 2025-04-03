import express from "express";
import {
  createInvoice,
  getInvoices,
  updateInvoice,
} from "../controllers/invoice.controller";
import { verifyToken } from "../middleware/auth.middleware";
import { asyncHandler } from "../utils/asyncHandler";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Invoices
 *   description: Manage sales/invoicing system
 */

/**
 * @swagger
 * /api/invoices:
 *   get:
 *     summary: List all invoices
 *     tags: [Invoices]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: month
 *         schema: { type: string, example: "2025-04" }
 *         description: Filter by month (YYYY-MM)
 *       - in: query
 *         name: clientId
 *         schema: { type: integer }
 *         description: Filter by client ID
 *     responses:
 *       200:
 *         description: List of invoices
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id: { type: integer }
 *                   total: { type: number }
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   client:
 *                     type: object
 *                     properties:
 *                       id: { type: integer }
 *                       name: { type: string }
 *                   employee:
 *                     type: object
 *                     nullable: true
 *                     properties:
 *                       id: { type: integer }
 *                       name: { type: string }
 *                   items:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         meshType: { type: string }
 *                         quantity: { type: integer }
 *                         unitPrice: { type: number }
 */

/**
 * @swagger
 * /api/invoices/create:
 *   post:
 *     summary: Create new invoice
 *     tags: [Invoices]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [clientId, items]
 *             properties:
 *               clientId: { type: integer }
 *               employeeId: { type: integer }
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required: [meshType, quantity, unitPrice]
 *                   properties:
 *                     meshType: { type: string }
 *                     quantity: { type: integer }
 *                     unitPrice: { type: number }
 *     responses:
 *       201:
 *         description: Invoice created
 */

/**
 * @swagger
 * /api/invoices/update/{id}:
 *   put:
 *     summary: Update existing invoice
 *     tags: [Invoices]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [items]
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     meshType: { type: string }
 *                     quantity: { type: integer }
 *                     unitPrice: { type: number }
 *     responses:
 *       200:
 *         description: Invoice updated
 */

router.post("/create", verifyToken, asyncHandler(createInvoice));
router.get("/", verifyToken, asyncHandler(getInvoices));
router.put("/update/:id", verifyToken, asyncHandler(updateInvoice));

export default router;
