import express from "express";
import { addMesh, getAllMesh } from "../controllers/mesh.controller";
import { verifyToken } from "../middleware/auth.middleware";
import { asyncHandler } from "../utils/asyncHandler";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Mesh
 *   description: Mesh production tracking
 */

/**
 * @swagger
 * /api/mesh:
 *   get:
 *     summary: Get all mesh production records
 *     tags: [Mesh]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of mesh records
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id: { type: integer }
 *                   meshType: { type: string }
 *                   wireDiameter: { type: string }
 *                   quantity: { type: integer }
 *                   wireUsedKg: { type: number }
 *                   employee:
 *                     type: object
 *                     properties:
 *                       id: { type: integer }
 *                       name: { type: string }
 *                   createdAt: { type: string, format: date-time }
 */

/**
 * @swagger
 * /api/mesh/create:
 *   post:
 *     summary: Add a mesh production entry
 *     tags: [Mesh]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [meshType, wireDiameter, quantity, wireUsedKg, employeeId]
 *             properties:
 *               meshType:
 *                 type: string
 *                 example: "10x10"
 *               wireDiameter:
 *                 type: string
 *                 example: "6mm"
 *               quantity:
 *                 type: integer
 *               wireUsedKg:
 *                 type: number
 *               employeeId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Mesh entry created
 */

router.get("/", verifyToken, asyncHandler(getAllMesh));
router.post("/create", verifyToken, asyncHandler(addMesh));

export default router;
