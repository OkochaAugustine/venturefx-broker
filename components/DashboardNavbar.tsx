"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  LineChart,
  History,
  Bot,
  Receipt,
  Star,
  HelpCircle,
} from "lucide-react";

export default function DashboardNavbar() {
  const pathname = usePathname();

  const links = [
    { href: "/dashboard", label: "Dashboard", Icon: LayoutDashboard },
    { href: "/trades", label: "Trades", Icon: LineChart },
    { href: "/history", label: "History", Icon: History },
    { href: "/bot-trades", label: "AI Bot", Icon: Bot },
    { href: "/transactions", label: "Transcations", Icon: Receipt },
    { href: "/refer", label: "Refer & Earn", Icon: Star },
    { href: "/help", label: "Help", Icon: HelpCircle },
  ];

  return (
    <nav className="bg-white shadow-md border-b border-gray-200">
      <div className="flex items-center gap-6 px-6 py-3">
        {links.map(({ href, label, Icon }) => {
          const isActive = pathname === href;

          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-2 text-sm font-medium transition ${
                isActive
                  ? "text-indigo-600 border-b-2 border-indigo-600"
                  : "text-gray-600 hover:text-indigo-500"
              }`}
            >
              <Icon size={16} />
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}



