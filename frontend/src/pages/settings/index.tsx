import { useTranslation } from "react-i18next";
import { useTheme } from "@/stores/useTheme";

export default function Settings() {
  const { t } = useTranslation();
  const { theme } = useTheme();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{t("settings.title")}</h1>
      <p className="text-muted-foreground">{t("settings.description")}</p>
      <div className="mt-4">
        <span className="text-sm opacity-50">Theme: {theme}</span>
      </div>
      <div className="min-h-screen transition-bg duration-300 bg-lightBg dark:bg-background text-lightText dark:text-accent p-6">
        <div className="bg-lightCard dark:bg-card border border-lightBorder dark:border-borderLine p-6 rounded-xl shadow-md">
          <h1 className="text-2xl font-bold text-lightAccent dark:text-emeraldAccent">
            Dark + Light Mode
          </h1>
          <p className="mt-2 text-gray-600 dark:text-fuchsiaAccent">
            This theme persists & adapts beautifully.
          </p>
          <button
            className="mt-4 px-4 py-2 rounded-lg bg-lightHover dark:bg-hoverDark hover:bg-lightCard dark:hover:bg-card transition duration-300"
            onClick={() => useTheme.getState().toggleTheme()}
          >
            Toggle Theme
          </button>
        </div>
      </div>
    </div>
  );
}
