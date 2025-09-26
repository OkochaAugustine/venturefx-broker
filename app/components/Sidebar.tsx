"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Link from "next/link";

interface User {
  _id: string;
  fullname?: string;
  username?: string;
  email?: string;
}

export default function Sidebar() {
  const { t } = useTranslation();
  const [traderName, setTraderName] = useState<string>("Guest");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        const u: User = parsed.user || parsed;
        if (u) {
          setTraderName(u.fullname || u.username || u.email || "Guest");
        }
      } catch (err) {
        console.error("❌ Failed to parse user from localStorage:", err);
      }
    }
  }, []);

  const sidebarLinks = [
    { name: t("dashboard.sidebar.dashboard"), href: "/dashboard" },
    { name: t("dashboard.sidebar.trades"), href: "/trades" },
    { name: t("dashboard.sidebar.history"), href: "/history" },
    { name: t("dashboard.sidebar.botTrades"), href: "/bot-trades" },
    { name: t("dashboard.sidebar.transactions"), href: "/transactions" },
    { name: t("dashboard.sidebar.upgrades"), href: "/upgrades" },
    { name: t("dashboard.sidebar.helpSupport"), href: "/help-support" },
    { name: t("dashboard.sidebar.kyc"), href: "/kyc-verification" },
  ];

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 ease-in-out
      bg-white/40 backdrop-blur-2xl border-r border-white/30 shadow-2xl
      lg:relative lg:translate-x-0`}
    >
      {/* ✅ User name */}
      <div className="p-6 text-2xl font-extrabold text-gray-900 drop-shadow-md border-b border-white/20 text-center">
        {traderName}
      </div>

      {/* ✅ Sidebar links */}
      <nav className="flex flex-col gap-4 p-4">
        {sidebarLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="px-4 py-2 rounded-lg 
              bg-white/70 hover:bg-white/90
              text-lg font-bold text-gray-900 hover:text-red-600
              shadow-md hover:shadow-xl transition-all duration-300 ease-out"
          >
            {link.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
