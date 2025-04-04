import { Router } from "express";
import {
  createWire,
  getAllWires,
  getWireBalanceByType,
  deleteWire,
} from "../controllers/wire.controller";
import { authenticate, authorize } from "../middleware/auth";
import { Role } from "@prisma/client";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Wire
 *   description: Manage imported wires by kg
 */

router.use(authenticate);

/**
 * @swagger
 * /api/wires:
 *   post:
 *     summary: Import new wire
 *     tags: [Wire]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [wireType, quantityKg]
 *             properties:
 *               wireType:
 *                 type: string
 *               quantityKg:
 *                 type: number
 *     responses:
 *       201:
 *         description: Wire entry created
 */
router.post("/", authorize([Role.OWNER]), createWire);

/**
 * @swagger
 * /api/wires:
 *   get:
 *     summary: List all wire imports
 *     tags: [Wire]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of wire imports
 */
router.get("/", authorize([Role.OWNER, Role.MANAGER]), getAllWires);

/**
 * @swagger
 * /api/wires/balance/{wireType}:
 *   get:
 *     summary: Get remaining kg for a wire type
 *     tags: [Wire]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: wireType
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Remaining kg
 */
router.get("/balance/:wireType", authorize([Role.OWNER]), getWireBalanceByType);

/**
 * @swagger
 * /api/wires/{id}:
 *   delete:
 *     summary: Delete wire entry
 *     tags: [Wire]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     responses:
 *       204:
 *         description: Deleted
 */
router.delete("/:id", authorize([Role.OWNER]), deleteWire);

export default router;
