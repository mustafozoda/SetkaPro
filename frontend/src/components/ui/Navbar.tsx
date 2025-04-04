import { Moon, Globe, LogOut, Sun } from "lucide-react";

export default function NavbarUI({
  theme,
  toggleTheme,
  currentLang,
  switchLang,
  user,
  logout,
  label,
}: {
  theme: string;
  toggleTheme: () => void;
  currentLang: string;
  switchLang: () => void;
  user: any;
  logout: () => void;
  label: string;
}) {
  return (
    <header
      className={`flex justify-between transition-all ease-in-out items-center p-1 border-b ${
        theme === "dark" ? "bg-[#171717] text-white" : "bg-white text-gray-900"
      }`}
    >
      <div className="flex items-center space-x-4">
        {/* App Title */}
        <div className="text-2xl font-semibold text-gray-800 dark:text-white">
          {label}
        </div>
      </div>

      <div className="flex items-center space-x-6">
        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600"
        >
          {theme === "dark" ? (
            <Sun size={25} className="text-yellow-500" />
          ) : (
            <Moon size={25} className="text-blue-600" />
          )}
        </button>

        {/* Language Switch Button */}
        <button
          onClick={switchLang}
          className="p-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 flex items-center space-x-2"
        >
          <Globe size={20} className="text-green-500" />
          <span className="font-semibold">{currentLang.toUpperCase()}</span>
        </button>

        {/* Logout Button */}
        <button
          onClick={logout}
          className="p-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600"
        >
          <LogOut size={20} className="text-red-500" />
        </button>
      </div>
    </header>
  );
}
