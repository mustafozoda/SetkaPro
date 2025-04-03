import express from "express";
import {
  addEmployee,
  getAllEmployees,
  updateEmployee,
  deleteEmployee,
} from "../controllers/employee.controller";
import { verifyToken, requireOwner } from "../middleware/auth.middleware";
import { asyncHandler } from "../utils/asyncHandler";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Employees
 *   description: Manage factory employees
 */

/**
 * @swagger
 * /api/employees:
 *   post:
 *     summary: Add a new employee
 *     tags: [Employees]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, role, salary]
 *             properties:
 *               name:
 *                 type: string
 *               role:
 *                 type: string
 *                 example: mesh_maker
 *               salary:
 *                 type: number
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 *
 *   get:
 *     summary: List all employees
 *     tags: [Employees]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of employees
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Employee'
 */

/**
 * @swagger
 * /api/employees/{id}:
 *   put:
 *     summary: Update employee by ID
 *     tags: [Employees]
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
 *             properties:
 *               name: { type: string }
 *               role: { type: string }
 *               salary: { type: number }
 *     responses:
 *       200:
 *         description: Employee updated
 *
 *   delete:
 *     summary: Delete employee by ID
 *     tags: [Employees]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Deleted successfully
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Employee:
 *       type: object
 *       properties:
 *         id: { type: integer }
 *         name: { type: string }
 *         role: { type: string }
 *         salary: { type: number }
 *         createdAt:
 *           type: string
 *           format: date-time
 */

router.get("/", verifyToken, asyncHandler(getAllEmployees));
router.post("/", verifyToken, requireOwner, asyncHandler(addEmployee));
router.put("/:id", verifyToken, requireOwner, asyncHandler(updateEmployee));
router.delete("/:id", verifyToken, requireOwner, asyncHandler(deleteEmployee));

export default router;
