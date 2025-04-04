import { cn } from "../../lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function SidebarUI({
  collapsed,
  toggleCollapse,
  items,
  activePath,
  onNavigate,
  theme, // Add theme prop here
}: {
  collapsed: boolean;
  toggleCollapse: () => void;
  items: { label: string; icon: any; to: string }[];
  activePath: string;
  onNavigate: (to: string) => void;
  theme: "dark" | "light";
}) {
  return (
    <aside
      className={cn(
        "h-full border-r  transition-all ease-in-out",
        theme === "dark" ? "bg-[#171717] text-white" : "bg-white text-gray-900",
        collapsed ? "w-[60px]" : "w-[220px]"
      )}
    >
      <div className="flex items-center justify-between p-3 border-b">
        {!collapsed && <h1 className="font-bold text-lg">SetkaPro</h1>}
        <button
          onClick={toggleCollapse}
          className="p-1 rounded hover:bg-accent"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>
      <ul className="mt-4 space-y-1">
        {items.map(({ label, icon: Icon, to }) => (
          <li key={to}>
            <button
              onClick={() => onNavigate(to)}
              className={cn(
                "flex items-center gap-3 w-full px-4 py-2 text-sm hover:bg-accent rounded",
                activePath === to && "bg-accent font-semibold"
              )}
            >
              <Icon size={18} />
              {!collapsed && <span>{label}</span>}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
