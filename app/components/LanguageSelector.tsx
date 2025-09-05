"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";

type Props = { variant?: "nav" | "default" };

const LABELS: Record<string, string> = {
  en: "English",
  fr: "Français",
  de: "Deutsch",
  es: "Español",
  it: "Italiano",
  pt: "Português",
  ru: "Русский",
  zh: "中文",
  ja: "日本語",
  ko: "한국어",
  ar: "العربية",
  hi: "हिन्दी",
  ng: "Naija Pidgin",
};

const FLAGS: Record<string, string> = {
  en: "🇺🇸",
  fr: "🇫🇷",
  de: "🇩🇪",
  es: "🇪🇸",
  it: "🇮🇹",
  pt: "🇵🇹",
  ru: "🇷🇺",
  zh: "🇨🇳",
  ja: "🇯🇵",
  ko: "🇰🇷",
  ar: "🇸🇦",
  hi: "🇮🇳",
  ng: "🇳🇬",
};

export default function LanguageSelector({ variant = "default" }: Props) {
  const { i18n } = useTranslation();

  // Languages actually configured in i18n resources
  const resourceLangs = Object.keys(i18n.options?.resources || {});
  const preferredOrder = [
    "en",
    "fr",
    "de",
    "es",
    "it",
    "pt",
    "ru",
    "zh",
    "ja",
    "ko",
    "ar",
    "hi",
    "ng",
  ];
  const langs = preferredOrder.filter((c) => resourceLangs.includes(c));

  const wrapper =
    variant === "nav" ? "flex items-center gap-2" : "flex items-center gap-2 p-2";
  const selectCls =
    variant === "nav"
      ? "bg-blue-700 text-white px-2 py-1 rounded text-sm"
      : "border rounded p-1";

  return (
    <div className={wrapper}>
      <Globe
        className={variant === "nav" ? "w-4 h-4 text-white" : "w-5 h-5 text-gray-600"}
      />
      {variant !== "nav" && (
        <label htmlFor="lang" className="text-sm font-medium">
          Select Language:
        </label>
      )}
      <select
        id="lang"
        onChange={(e) => i18n.changeLanguage(e.target.value)}
        value={i18n.language}
        className={selectCls}
      >
        {langs.map((code) => (
          <option key={code} value={code}>
            {(FLAGS[code] || "") + " " + (LABELS[code] || code.toUpperCase())}
          </option>
        ))}
      </select>
    </div>
  );
}




