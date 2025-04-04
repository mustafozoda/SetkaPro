import express from "express";
import cors from "cors";
import { errorHandler } from "./middleware/errorHandler";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import clientRoutes from "./routes/client.routes";
import meshRoutes from "./routes/mesh.routes";
import wireRoutes from "./routes/wire.routes";
import productionRoutes from "./routes/production.routes";
import invoiceRoutes from "./routes/invoice.routes";
import salaryRoutes from "./routes/salary.routes";
import machineRoutes from "./routes/machine.routes";
import financeRoutes from "./routes/finance.routes";
import reportRoutes from "./routes/report.routes";
import localizationRoutes from "./routes/localization.routes";
import { detectLanguage } from "./middleware/lang";
import { swaggerUi, swaggerSpec } from "./docs/swagger";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/meshes", meshRoutes);
app.use("/api/wires", wireRoutes);
app.use("/api/production", productionRoutes);
app.use("/api/invoices", invoiceRoutes);
app.use("/api/salaries", salaryRoutes);
app.use("/api/machines", machineRoutes);
app.use("/api/finance", financeRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/localization", localizationRoutes);

app.use(detectLanguage);

// Global error handler
app.use(errorHandler);

export default app;
