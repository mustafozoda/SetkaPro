import { Router } from "express";
import {
  createSalary,
  getAllSalaries,
  getSalariesByMonth,
  markSalaryAsPaid,
} from "../controllers/salary.controller";
import { authenticate, authorize } from "../middleware/auth";
import { Role } from "@prisma/client";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Salaries
 *   description: Manage employee salary and payroll
 */

router.use(authenticate);

/**
 * @swagger
 * /api/salaries:
 *   post:
 *     summary: Create a new salary record
 *     tags: [Salaries]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [userId, month, amount]
 *             properties:
 *               userId:
 *                 type: string
 *               month:
 *                 type: string
 *               amount:
 *                 type: number
 *     responses:
 *       201:
 *         description: Salary created
 */
router.post("/", authorize([Role.OWNER]), createSalary);

/**
 * @swagger
 * /api/salaries:
 *   get:
 *     summary: Get all salary records
 *     tags: [Salaries]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of salaries
 */
router.get("/", authorize([Role.OWNER, Role.MANAGER]), getAllSalaries);

/**
 * @swagger
 * /api/salaries/month/{month}:
 *   get:
 *     summary: Get salary records by month (e.g. 2025-04)
 *     tags: [Salaries]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: month
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Salaries for given month
 */
router.get(
  "/month/:month",
  authorize([Role.OWNER, Role.MANAGER]),
  getSalariesByMonth
);

/**
 * @swagger
 * /api/salaries/{id}/pay:
 *   patch:
 *     summary: Mark salary as paid
 *     tags: [Salaries]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Salary marked as paid
 */
router.patch("/:id/pay", authorize([Role.OWNER]), markSalaryAsPaid);

export default router;
