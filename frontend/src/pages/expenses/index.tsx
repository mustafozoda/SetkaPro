import { useTranslation } from "react-i18next";
import { useTheme } from "@/stores/useTheme";

export default function Expenses() {
  const { t } = useTranslation();
  const { theme } = useTheme();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{t("expenses.title")}</h1>
      <p className="text-muted-foreground">{t("expenses.description")}</p>
      <div className="mt-4">
        <span className="text-sm opacity-50">Theme: {theme}</span>
      </div>
    </div>
  );
}
