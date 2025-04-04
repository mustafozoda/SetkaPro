import { useTranslation } from "react-i18next";
import { useTheme } from "@/stores/useTheme";

export default function Clients() {
  const { t } = useTranslation();
  const { theme } = useTheme();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{t("clients.title")}</h1>
      <p className="text-muted-foreground">{t("clients.description")}</p>
      <div className="mt-4">
        <span className="text-sm opacity-50">Theme: {theme}</span>
      </div>
    </div>
  );
}
