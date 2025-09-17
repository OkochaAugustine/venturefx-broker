"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// ✅ Import JSON directly (because they're inside src/lib)
   

import en from "@/lib/locales/en/common.json";
import fr from "@/lib/locales/fr/common.json";
import de from "@/lib/locales/de/common.json";



i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    fr: { translation: fr },
    de: { translation: de },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
