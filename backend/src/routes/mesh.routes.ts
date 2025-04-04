import { Router } from "express";
import {
  createMeshType,
  getAllMeshTypes,
  getMeshTypeById,
  updateMeshType,
  deleteMeshType,
} from "../controllers/mesh.controller";
import { authenticate, authorize } from "../middleware/auth";
import { Role } from "@prisma/client";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Mesh
 *   description: Mesh types and pricing
 */

router.use(authenticate);

/**
 * @swagger
 * /api/meshes:
 *   post:
 *     summary: Create mesh type
 *     tags: [Mesh]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [type, wireType, priceForClient, priceForWorker, weightPerPiece]
 *             properties:
 *               type:
 *                 type: string
 *                 example: "10x10"
 *               form:
 *                 type: string
 *                 example: "roll"
 *               wireType:
 *                 type: string
 *                 example: "3mm"
 *               priceForClient:
 *                 type: number
 *               priceForWorker:
 *                 type: number
 *               weightPerPiece:
 *                 type: number
 *               stockThreshold:
 *                 type: number
 *     responses:
 *       201:
 *         description: Created mesh type
 */
router.post("/", authorize([Role.OWNER]), createMeshType);

/**
 * @swagger
 * /api/meshes:
 *   get:
 *     summary: Get all mesh types
 *     tags: [Mesh]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of mesh types
 */
router.get(
  "/",
  authorize([Role.OWNER, Role.MANAGER, Role.WORKER]),
  getAllMeshTypes
);

/**
 * @swagger
 * /api/meshes/{id}:
 *   get:
 *     summary: Get mesh type by ID
 *     tags: [Mesh]
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
 *         description: Mesh type details
 */
router.get("/:id", authorize([Role.OWNER, Role.MANAGER]), getMeshTypeById);

/**
 * @swagger
 * /api/meshes/{id}:
 *   put:
 *     summary: Update mesh type
 *     tags: [Mesh]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *               form:
 *                 type: string
 *               wireType:
 *                 type: string
 *               priceForClient:
 *                 type: number
 *               priceForWorker:
 *                 type: number
 *               weightPerPiece:
 *                 type: number
 *               currentStock:
 *                 type: number
 *               stockThreshold:
 *                 type: number
 *     responses:
 *       200:
 *         description: Updated mesh type
 */
router.put("/:id", authorize([Role.OWNER]), updateMeshType);

/**
 * @swagger
 * /api/meshes/{id}:
 *   delete:
 *     summary: Delete mesh type
 *     tags: [Mesh]
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
router.delete("/:id", authorize([Role.OWNER]), deleteMeshType);

export default router;
