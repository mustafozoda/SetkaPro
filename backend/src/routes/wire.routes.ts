import express from "express";
import {
  addWire,
  getAllWire,
  updateWire,
  deleteWire,
  getAvailableWire,
} from "../controllers/wire.controller";
import { verifyToken, requireOwner } from "../middleware/auth.middleware";
import { asyncHandler } from "../utils/asyncHandler";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Wire
 *   description: Wire Inventory Management
 */

/**
 * @swagger
 * /api/wire:
 *   get:
 *     summary: Get all wire entries
 *     tags: [Wire]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of wire stock
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   type:
 *                     type: string
 *                   diameter:
 *                     type: string
 *                   quantityKg:
 *                     type: number
 *                   pricePerKg:
 *                     type: number
 *                   supplier:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 */
/**
 * @swagger
 * /api/wire/create:
 *   post:
 *     summary: Add new wire stock
 *     tags: [Wire]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [type, diameter, quantityKg, pricePerKg, supplier]
 *             properties:
 *               type:
 *                 type: string
 *               diameter:
 *                 type: string
 *               quantityKg:
 *                 type: number
 *               pricePerKg:
 *                 type: number
 *               supplier:
 *                 type: string
 *     responses:
 *       201:
 *         description: Wire added
 */

/**
 * @swagger
 * /api/wire/update/{id}:
 *   put:
 *     summary: Update wire entry
 *     tags: [Wire]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *               diameter:
 *                 type: string
 *               quantityKg:
 *                 type: number
 *               pricePerKg:
 *                 type: number
 *               supplier:
 *                 type: string
 *     responses:
 *       200:
 *         description: Wire updated
 */

/**
 * @swagger
 * /api/wire/delete/{id}:
 *   delete:
 *     summary: Delete wire entry
 *     tags: [Wire]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Wire deleted
 */

/**
 * @swagger
 * /api/wire/available:
 *   get:
 *     summary: Get all available wire (by type, diameter)
 *     tags: [Wire]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of available wire stock
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   type:
 *                     type: string
 *                   diameter:
 *                     type: string
 *                   quantityKg:
 *                     type: number
 *                   pricePerKg:
 *                     type: number
 *                   supplier:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 */

// 👇 Route definitions
router.get("/available", verifyToken, asyncHandler(getAvailableWire));
router.get("/", verifyToken, asyncHandler(getAllWire));
router.post("/create", verifyToken, requireOwner, asyncHandler(addWire));
router.put("/update/:id", verifyToken, requireOwner, asyncHandler(updateWire));
router.delete(
  "/delete/:id",
  verifyToken,
  requireOwner,
  asyncHandler(deleteWire)
);

export default router;
