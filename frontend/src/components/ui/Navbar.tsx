import { Moon, Globe, LogOut, Sun } from "lucide-react";

export default function NavbarUI({
  theme,
  toggleTheme,
  currentLang,
  switchLang,
  user,
  logout,
}: {
  theme: string;
  toggleTheme: () => void;
  currentLang: string;
  switchLang: () => void;
  user: any;
  logout: () => void;
}) {
  return (
    <header
      className={`flex justify-between items-center p-1 border-b transition-all duration-300 ease-in-out ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"
      }`}
    >
      <div className="flex items-center space-x-4">
        {/* User Role and App Title */}
        <div className="text-2xl font-semibold text-gray-800 dark:text-white">
          {user?.role ?? "Dashboard"}
        </div>
      </div>

      <div className="flex items-center space-x-6">
        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          {theme === "dark" ? (
            <Sun size={20} className="text-yellow-500" />
          ) : (
            <Moon size={20} className="text-blue-600" />
          )}
        </button>

        {/* Language Switch Button */}
        <button
          onClick={switchLang}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors flex items-center space-x-2"
        >
          <Globe size={20} className="text-green-500" />
          <span className="font-semibold">{currentLang.toUpperCase()}</span>
        </button>

        {/* Logout Button */}
        <button
          onClick={logout}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          <LogOut size={20} className="text-red-500" />
        </button>
      </div>
    </header>
  );
}
