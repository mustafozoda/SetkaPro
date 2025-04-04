// routes/machine.routes.ts
import { Router } from "express";
import {
  createMachine,
  getAllMachines,
  getMachineById,
  updateMachine,
  deleteMachine,
  createMachineLog,
  getMachineLogs,
} from "../controllers/machine.controller";
import { authenticate, authorize } from "../middleware/auth";
import { Role } from "@prisma/client";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Machines
 *   description: Manage machines and logs
 */

router.use(authenticate);

router.post("/", authorize([Role.OWNER, Role.MANAGER]), createMachine);
router.get("/", authorize([Role.OWNER, Role.MANAGER]), getAllMachines);
router.get("/:id", authorize([Role.OWNER, Role.MANAGER]), getMachineById);
router.put("/:id", authorize([Role.OWNER]), updateMachine);
router.delete("/:id", authorize([Role.OWNER]), deleteMachine);

router.post(
  "/:id/logs",
  authorize([Role.WORKER, Role.MANAGER, Role.OWNER]),
  createMachineLog
);
router.get("/:id/logs", authorize([Role.OWNER, Role.MANAGER]), getMachineLogs);

export default router;
