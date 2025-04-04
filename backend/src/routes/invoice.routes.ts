import { Router } from "express";
import {
  createInvoice,
  getAllInvoices,
  getInvoiceById,
  deleteInvoice,
  updateInvoicePayment,
  generateInvoicePDFRoute,
  sendInvoiceByEmail,
} from "../controllers/invoice.controller";
import { authenticate, authorize } from "../middleware/auth";
import { Role } from "@prisma/client";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Invoices
 *   description: Manage mesh sales and invoices
 */

router.use(authenticate);

/**
 * @swagger
 * /api/invoices:
 *   post:
 *     summary: Create a new invoice
 *     tags: [Invoices]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [clientId, meshTypeId, quantity, pricePerUnit]
 *             properties:
 *               clientId:
 *                 type: string
 *               meshTypeId:
 *                 type: string
 *               quantity:
 *                 type: number
 *               pricePerUnit:
 *                 type: number
 *               amountPaid:
 *                 type: number
 *     responses:
 *       201:
 *         description: Invoice created
 */
router.post(
  "/",
  authorize([Role.WORKER, Role.MANAGER, Role.OWNER]),
  createInvoice
);

/**
 * @swagger
 * /api/invoices:
 *   get:
 *     summary: Get all invoices
 *     tags: [Invoices]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all invoices
 */
router.get("/", authorize([Role.MANAGER, Role.OWNER]), getAllInvoices);

/**
 * @swagger
 * /api/invoices/{id}:
 *   get:
 *     summary: Get invoice by ID
 *     tags: [Invoices]
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
 *         description: Invoice details
 */
router.get("/:id", authorize([Role.MANAGER, Role.OWNER]), getInvoiceById);

/**
 * @swagger
 * /api/invoices/{id}:
 *   delete:
 *     summary: Delete an invoice
 *     tags: [Invoices]
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
 *         description: Invoice deleted
 */
router.delete("/:id", authorize([Role.OWNER]), deleteInvoice);

/**
 * @swagger
 * /api/invoices/{id}/pay:
 *   patch:
 *     summary: Add payment to an invoice
 *     tags: [Invoices]
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
 *             required: [amount]
 *             properties:
 *               amount:
 *                 type: number
 *     responses:
 *       200:
 *         description: Invoice updated
 */
router.patch(
  "/:id/pay",
  authorize([Role.MANAGER, Role.OWNER]),
  updateInvoicePayment
);

/**
 * @swagger
 * /api/invoices/{id}/pdf:
 *   get:
 *     summary: Download invoice as PDF
 *     tags: [Invoices]
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
 *         description: Returns PDF file
 */
router.get(
  "/:id/pdf",
  authorize([Role.MANAGER, Role.OWNER]),
  generateInvoicePDFRoute
);

/**
 * @swagger
 * /api/invoices/{id}/email:
 *   post:
 *     summary: Send invoice to client via email
 *     tags: [Invoices]
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
 *         description: Email sent
 */
router.post(
  "/:id/email",
  authorize([Role.MANAGER, Role.OWNER]),
  sendInvoiceByEmail
);

export default router;
