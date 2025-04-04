import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { useTheme } from "./stores/useTheme";
// import { useAuth } from "./stores/useAuth";
import "./index.css";
import "./locales/i18n";

const queryClient = new QueryClient();

function AppWrapper() {
  const { theme } = useTheme();
  // const { user } = useAuth(); // optional unless used

  return (
    <div className={`App ${theme === "dark" ? "dark" : ""}`}>
      <App />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppWrapper />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
