import { Routes, Route, Navigate } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import PrivateRoutes from "./PrivateRoutes";
import MainLayout from "../layouts/MainLayout";

import Dashboard from "../pages/dashboard";
// import Wire from "../pages/wire";
// import Mesh from "../pages/mesh";
// import Clients from "../pages/clients";
// import Invoices from "../pages/invoices";
// import Employees from "../pages/employees";
// import Expenses from "../pages/expenses";
// import Machines from "../pages/machines";
// import Reports from "../pages/reports";
// import Settings from "../pages/settings";
// import NotFound from "../pages/NotFound"; // Optional 404 page

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/*" element={<PublicRoutes />} />

      {/* Protected */}
      <Route element={<PrivateRoutes />}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* <Route path="/wire" element={<Wire />} />
          <Route path="/mesh" element={<Mesh />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/machines" element={<Machines />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} /> */}
        </Route>
      </Route>

      {/* Fallback */}
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
}
