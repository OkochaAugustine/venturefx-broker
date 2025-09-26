"use client";

import { ReactNode, useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import GoogleTranslate from "@/components/GoogleTranslate";
import { useTheme } from "next-themes";

interface Props {
  children: ReactNode;
  traderName?: string;
  onLogout?: () => void;
}

export default function DashboardLayout({
  children,
  traderName = "Guest",
  onLogout,
}: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const darkMode = theme === "dark";

  return (
    <div
      className={`flex min-h-screen overflow-x-hidden ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 ease-in-out
        bg-white/40 backdrop-blur-2xl border-r border-white/30 shadow-2xl
        lg:relative lg:translate-x-0 
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-6 text-2xl font-extrabold text-gray-900 drop-shadow-md border-b border-white/20 text-center">
          {traderName}
        </div>

        <nav className="flex flex-col gap-4 p-4">
          <Link
            href="/dashboard"
            className="px-4 py-2 rounded-lg bg-white/70 hover:bg-white/90 text-lg font-bold text-gray-900 hover:text-red-600 shadow-md hover:shadow-xl transition-all duration-300 ease-out"
          >
            Dashboard
          </Link>
          <Link
            href="/trades"
            className="px-4 py-2 rounded-lg bg-white/70 hover:bg-white/90 text-lg font-bold text-gray-900 hover:text-red-600 shadow-md hover:shadow-xl transition-all duration-300 ease-out"
          >
            Trades
          </Link>
          <Link
            href="/bot-trades"
            className="px-4 py-2 rounded-lg bg-white/70 hover:bg-white/90 text-lg font-bold text-gray-900 hover:text-red-600 shadow-md hover:shadow-xl transition-all duration-300 ease-out"
          >
            BOT Trades History
          </Link>
          <Link
            href="/transactions"
            className="px-4 py-2 rounded-lg bg-white/70 hover:bg-white/90 text-lg font-bold text-gray-900 hover:text-red-600 shadow-md hover:shadow-xl transition-all duration-300 ease-out"
          >
            Transactions History
          </Link>
          <Link
            href="/upgrades"
            className="px-4 py-2 rounded-lg bg-white/70 hover:bg-white/90 text-lg font-bold text-gray-900 hover:text-red-600 shadow-md hover:shadow-xl transition-all duration-300 ease-out"
          >
            Upgrade
          </Link>
          <Link
            href="/news"
            className="px-4 py-2 rounded-lg bg-white/70 hover:bg-white/90 text-lg font-bold text-gray-900 hover:text-red-600 shadow-md hover:shadow-xl transition-all duration-300 ease-out"
          >
            News
          </Link>
          <Link
            href="/help-support"
            className="px-4 py-2 rounded-lg bg-white/70 hover:bg-white/90 text-lg font-bold text-gray-900 hover:text-red-600 shadow-md hover:shadow-xl transition-all duration-300 ease-out"
          >
            Help/Support
          </Link>
          <Link
            href="/kyc-verification"
            className="px-4 py-2 rounded-lg bg-white/70 hover:bg-white/90 text-lg font-bold text-gray-900 hover:text-red-600 shadow-md hover:shadow-xl transition-all duration-300 ease-out"
          >
            KYC Verification
          </Link>
        </nav>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex flex-col flex-1 w-full">
        {/* Top Navbar */}
        <div
          className={`flex items-center justify-between px-4 py-2 shadow ${
            darkMode ? "bg-gray-800 text-white" : "bg-blue-600 text-white"
          }`}
        >
          <div className="flex items-center space-x-4">
            {/* Sidebar toggle (mobile) */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden"
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Logo */}
            <Image
              src="/images/logo3.png"
              alt="Company Logo"
              width={120}
              height={40}
              priority
            />

            {/* Quick links */}
            <div className="flex space-x-3 ml-6">
              <Link
                href="/"
                className="px-4 py-2 bg-pink-600 hover:bg-pink-700 rounded text-white font-semibold"
              >
                HOME
              </Link>
              <Link
                href="/deposit"
                className="px-4 py-2 bg-gradient-to-r from-red-500 to-orange-500 hover:opacity-90 rounded text-white font-semibold"
              >
                DEPOSIT
              </Link>
              <Link
                href="/withdraw"
                className="px-4 py-2 bg-blue-500 hover:bg-blue-700 rounded text-white font-semibold"
              >
                WITHDRAW
              </Link>
            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-3">
            {/* Theme switch */}
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={darkMode}
                onChange={() => setTheme(darkMode ? "light" : "dark")}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-green-500"></div>
            </label>

            {/* Translate */}
            <GoogleTranslate />

            {/* KYC button */}
            <Link
              href="/kyc-verification"
              className={`px-3 py-1 rounded font-semibold text-sm ${
                darkMode
                  ? "bg-gray-200 text-blue-600"
                  : "bg-white text-blue-600"
              }`}
            >
              KYC
            </Link>

            {/* Logout */}
            <button
              onClick={onLogout}
              className={`px-3 py-1 rounded font-semibold text-sm ${
                darkMode
                  ? "bg-red-500 text-white hover:bg-red-600"
                  : "bg-red-600 text-white hover:bg-red-700"
              }`}
            >
              Logout
            </button>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8 w-full max-w-full">
          {children}
        </main>

        {/* Footer */}
        <footer
          className={`border-t py-4 text-center text-sm w-full ${
            darkMode ? "bg-gray-800 text-gray-300" : "bg-gray-50 text-gray-600"
          }`}
        >
          All Rights Reserved © VentureFX {new Date().getFullYear()}
        </footer>
      </div>
    </div>
  );
}
