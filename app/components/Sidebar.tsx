"use client";

import { useTranslation } from "react-i18next";
import Link from "next/link";

export default function Sidebar() {
  const { t } = useTranslation();

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
    <nav className="flex flex-col gap-2 bg-gray-50 p-4 rounded">
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
