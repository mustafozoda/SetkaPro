import { Outlet } from "react-router-dom";
import Sidebar from "../components/logic/Sidebar";
import Navbar from "../components/logic/Navbar";
import { useTheme } from "../stores/useTheme"; // Zustand for theme

export default function MainLayout() {
  const { theme } = useTheme();

  return (
    <div
      className={`flex h-screen ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="p-4 overflow-y-auto h-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
