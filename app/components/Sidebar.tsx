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

        // ✅ IMPORTANT: actual user is inside parsed.user
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
    <nav className="flex flex-col gap-4 bg-gray-50 p-4 rounded">
      {/* ✅ User’s Name Section */}
      <div className="text-xl font-bold text-red-600 mb-4">
        {traderName}
      </div>

      {sidebarLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="hover:text-red-500 transition"
        >
          {link.name}
        </Link>
      ))}
    </nav>
  );
}


