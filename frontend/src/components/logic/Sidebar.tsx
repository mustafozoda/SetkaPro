import { useState } from "react";
import SidebarUI from "../ui/Sidebar";
import {
  LayoutDashboard,
  Boxes,
  User,
  Settings,
  LogOut,
  ShoppingCart,
  FileText,
  Wrench,
  Users,
  ClipboardList,
  BarChart2,
} from "lucide-react"; // Ensure all icons are imported correctly
import { useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "../../stores/useTheme"; // Zustand for theme
import { useTranslation } from "react-i18next"; // Import i18next

const navItems = [
  { label: "dashboard", icon: LayoutDashboard, to: "/dashboard" },
  { label: "wire", icon: Boxes, to: "/wire" },
  { label: "mesh", icon: ClipboardList, to: "/mesh" },
  { label: "clients", icon: User, to: "/clients" },
  { label: "invoices", icon: FileText, to: "/invoices" },
  { label: "employees", icon: Users, to: "/employees" },
  { label: "expenses", icon: ShoppingCart, to: "/expenses" },
  { label: "machines", icon: Wrench, to: "/machines" },
  { label: "reports", icon: BarChart2, to: "/reports" },
  { label: "settings", icon: Settings, to: "/settings" },
];

export default function Sidebar() {
  const { t } = useTranslation(); // Initialize translation hook
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { theme } = useTheme(); // Zustand for theme

  const translatedItems = navItems.map((item) => ({
    ...item,
    label: t(item.label), // Dynamically change labels using i18next
  }));

  return (
    <SidebarUI
      collapsed={collapsed}
      toggleCollapse={() => setCollapsed(!collapsed)}
      items={translatedItems}
      activePath={pathname}
      onNavigate={(to) => navigate(to)}
      theme={theme} // Passing the theme prop here
    />
  );
}
