// routes/finance.routes.ts
import { Router } from "express";
import {
  createFinanceEntry,
  getAllFinance,
  getFinanceByMonth,
  deleteFinanceEntry,
} from "../controllers/finance.controller";
import { authenticate, authorize } from "../middleware/auth";
import { Role } from "@prisma/client";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Finance
 *   description: Track income and expenses
 */

router.use(authenticate);

/**
 * @swagger
 * /api/finance:
 *   post:
 *     summary: Create a finance entry
 *     tags: [Finance]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [type, category, amount]
 *             properties:
 *               type:
 *                 type: string
 *                 enum: [income, expense]
 *               category:
 *                 type: string
 *               amount:
 *                 type: number
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Finance entry created
 */
router.post("/", authorize([Role.OWNER]), createFinanceEntry);

/**
 * @swagger
 * /api/finance:
 *   get:
 *     summary: Get all finance entries
 *     tags: [Finance]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of finance records
 */
router.get("/", authorize([Role.OWNER, Role.MANAGER]), getAllFinance);

/**
 * @swagger
 * /api/finance/month/{month}:
 *   get:
 *     summary: Get finance entries by month
 *     tags: [Finance]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: month
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: 2025-04
 *     responses:
 *       200:
 *         description: Monthly finance data
 */
router.get("/month/:month", authorize([Role.OWNER]), getFinanceByMonth);

/**
 * @swagger
 * /api/finance/{id}:
 *   delete:
 *     summary: Delete a finance entry
 *     tags: [Finance]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Entry deleted
 */
router.delete("/:id", authorize([Role.OWNER]), deleteFinanceEntry);

export default router;
