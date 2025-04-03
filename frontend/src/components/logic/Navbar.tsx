import NavbarUI from "../ui/Navbar";
import { useAuth } from "../../stores/useAuth";
import { useTheme } from "../../stores/useTheme";
import { useTranslation } from "react-i18next";

export default function Navbar() {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const { i18n } = useTranslation();
  const { logout, user } = useAuth();

  const switchLang = () => {
    const next = i18n.language === "en" ? "ru" : "en";
    i18n.changeLanguage(next);
  };

  return (
    <NavbarUI
      theme={theme}
      toggleTheme={toggleTheme}
      currentLang={i18n.language}
      switchLang={switchLang}
      user={user}
      logout={logout}
      label={t("dashboard")} // Example: Using translation inside navbar
    />
  );
}
