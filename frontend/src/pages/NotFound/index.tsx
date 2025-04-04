import { useTranslation } from "react-i18next";
import { useTheme } from "@/stores/useTheme";

export default function NotFound() {
  const { t } = useTranslation();
  const { theme } = useTheme();

  return (
    <div className="p-4 text-center">
      <h1 className="text-3xl font-bold">404</h1>
      <p className="text-muted-foreground">{t("notfound.message")}</p>
      <div className="mt-4">
        <span className="text-sm opacity-50">Theme: {theme}</span>
      </div>
    </div>
  );
}
