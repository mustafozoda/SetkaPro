import { Outlet, Route, Routes } from "react-router-dom";
import Login from "../pages/login";
import Register from "../pages/register";

export default function PublicRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<Outlet />} />
    </Routes>
  );
}
