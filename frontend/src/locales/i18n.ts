import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./en/translation.json";
import ru from "./ru/translation.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ru: { translation: ru },
  },
  lng: localStorage.getItem("lang") || "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  returnObjects: true,
});

export default i18n;
