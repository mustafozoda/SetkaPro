import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { useTheme } from "./stores/useTheme"; // Zustand for theme
import { useAuth } from "./stores/useAuth"; // Zustand for auth
import "./index.css"; // Tailwind styles
import "./locales/i18n"; // i18n config

function AppWrapper() {
  // Initialize Zustand stores
  const { theme } = useTheme(); // Access the theme from Zustand
  const { user } = useAuth(); // Access the user (auth state) from Zustand

  // You can add logic here for dark mode classes, etc., if necessary

  return (
    <div className={`App ${theme === "dark" ? "dark" : ""}`}>
      <App />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  </React.StrictMode>
);
