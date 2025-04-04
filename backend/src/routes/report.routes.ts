// routes/report.routes.ts
import { Router } from "express";
import {
  getTopSellingMeshes,
  getTopClients,
  getTopWorkers,
  getCurrentStock,
  getWireEfficiency,
} from "../controllers/report.controller";
import { authenticate, authorize } from "../middleware/auth";
import { Role } from "@prisma/client";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Reports
 *   description: Analytics and insights
 */

router.use(authenticate);

router.get(
  "/top-meshes",
  authorize([Role.OWNER, Role.MANAGER]),
  getTopSellingMeshes
);
router.get(
  "/top-clients",
  authorize([Role.OWNER, Role.MANAGER]),
  getTopClients
);
router.get(
  "/top-workers",
  authorize([Role.OWNER, Role.MANAGER]),
  getTopWorkers
);
router.get("/stock", authorize([Role.OWNER, Role.MANAGER]), getCurrentStock);
router.get("/wire-efficiency", authorize([Role.OWNER]), getWireEfficiency);

export default router;
