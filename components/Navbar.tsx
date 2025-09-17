"use client";

import { useTranslation } from "react-i18next";

export default function Navbar() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <header className="w-full bg-white shadow p-4 flex justify-between items-center">
      <h1 className="font-bold text-lg">{t("dashboard.sidebar.dashboard")}</h1>

      <div className="flex items-center gap-4">
        <span className="text-gray-600">{t("welcomeBack", { name: "User" })}</span>

        <img
          src="https://ui-avatars.com/api/?name=User"
          alt="User"
          className="w-8 h-8 rounded-full"
        />

        {/* Language Selector */}
        <select
          onChange={(e) => changeLanguage(e.target.value)}
          value={i18n.language}
          className="border rounded p-1 text-sm"
        >
          <option value="en">EN</option>
          <option value="fr">FR</option>
          <option value="de">DE</option>
        </select>
      </div>
    </header>
  );
}

