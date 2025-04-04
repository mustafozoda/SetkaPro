import { Router } from "express";
import {
  createProduction,
  getAllProductions,
  getProductionByDate,
} from "../controllers/production.controller";
import { authenticate, authorize } from "../middleware/auth";
import { Role } from "@prisma/client";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Production
 *   description: Mesh production logs by workers
 */

router.use(authenticate);

/**
 * @swagger
 * /api/production:
 *   post:
 *     summary: Add a production entry
 *     tags: [Production]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [meshTypeId, quantity, startedAt, finishedAt]
 *             properties:
 *               meshTypeId:
 *                 type: string
 *               quantity:
 *                 type: number
 *               startedAt:
 *                 type: string
 *               finishedAt:
 *                 type: string
 *     responses:
 *       201:
 *         description: Production entry created
 */
router.post(
  "/",
  authorize([Role.WORKER, Role.MANAGER, Role.OWNER]),
  createProduction
);

/**
 * @swagger
 * /api/production:
 *   get:
 *     summary: Get all production logs
 *     tags: [Production]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of logs
 */
router.get("/", authorize([Role.MANAGER, Role.OWNER]), getAllProductions);

/**
 * @swagger
 * /api/production?date=YYYY-MM-DD:
 *   get:
 *     summary: Get production by date
 *     tags: [Production]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Production for that day
 */
router.get("/date", authorize([Role.MANAGER, Role.OWNER]), getProductionByDate);

export default router;
