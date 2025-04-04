import { Outlet } from "react-router-dom";
import Sidebar from "../components/logic/Sidebar";
import Navbar from "../components/logic/Navbar";

export default function MainLayout() {
  return (
    <div className="flex h-screen  transition-bg duration-300 bg-lightBg dark:bg-background text-lightText dark:text-accent">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="overflow-y-auto w-[80%] mx-auto scrollbar-hide h-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
