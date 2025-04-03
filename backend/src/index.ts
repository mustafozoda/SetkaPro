import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

// Import Routes
import authRoutes from "./routes/auth.routes";
import wireRoutes from "./routes/wire.routes";
import employeeRoutes from "./routes/employee.routes";
import meshRoutes from "./routes/mesh.routes";
import invoiceRoutes from "./routes/invoice.routes";
import clientRoutes from "./routes/client.routes";
import reportRoutes from "./routes/report.routes";
import { swaggerUi, specs } from "./docs/swagger";
// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Route Handlers
app.use("/api/auth", authRoutes);
app.use("/api/wire", wireRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/mesh", meshRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/invoices", invoiceRoutes);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(specs));
// Default Route
app.get("/", (req: Request, res: Response) => {
  res.send("SetkaPro API running ✅");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
