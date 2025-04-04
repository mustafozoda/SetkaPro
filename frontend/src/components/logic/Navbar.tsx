import NavbarUI from "../ui/Navbar";
import { useAuth } from "../../stores/useAuth";
import { useTheme } from "../../stores/useTheme";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom"; // ✅ import added

export default function Navbar() {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const { i18n } = useTranslation();
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const switchLang = () => {
    const next = i18n.language === "en" ? "ru" : "en";
    i18n.changeLanguage(next);
  };

  const handleLogout = () => {
    logout();
    navigate("/login"); // ✅ redirect after logout
  };

  const pageTitle =
    user?.role === "OWNER" ? t("Owner Dashboard") : t("Employee Panel"); // or however you get the page title

  return (
    <NavbarUI
      theme={theme}
      toggleTheme={toggleTheme}
      currentLang={i18n.language}
      switchLang={switchLang}
      user={user}
      logout={handleLogout} // ✅ pass redirecting logout
      label={pageTitle}
    />
  );
}
