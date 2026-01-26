"use client";

import React, { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import GoogleTranslate from "@/components/GoogleTranslate";
import { useTheme } from "next-themes";

interface UserData {
  _id: string;
  balance: number;
  earnedProfit: number;
  activeDeposit: number;
  status: string;
  fullname?: string;
  username?: string;
  email?: string;
}

const DashboardPage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const [traderName, setTraderName] = useState("Guest");

  const { theme, setTheme } = useTheme();
  const darkMode = theme === "dark";

  const chartRef = useRef<HTMLDivElement>(null);
  const newsRef = useRef<HTMLDivElement>(null);
  const extraChartRef = useRef<HTMLDivElement>(null);
  const tickerRef = useRef<HTMLDivElement>(null);

  const fetchUserData = async (id: string) => {
    try {
      const res = await fetch(`/api/users/${id}`);
      if (!res.ok) throw new Error();
      const updated = await res.json();
      setUser(updated);
      setTraderName(
        updated.fullname || updated.username || updated.email || "Guest"
      );
      localStorage.setItem("user", JSON.stringify(updated));
    } catch {}
  };

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (!stored) return;

    const parsed = JSON.parse(stored);
    const u = parsed.user || parsed;

    if (u?._id) {
      setUser(u);
      setTraderName(u.fullname || u.username || u.email || "Guest");
      fetchUserData(u._id);
      const i = setInterval(() => fetchUserData(u._id), 5000);
      return () => clearInterval(i);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "/login";
  };

  /* TradingView widgets */
  useEffect(() => {
    if (!chartRef.current) return;
    chartRef.current.innerHTML = "";
    const s = document.createElement("script");
    s.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    s.async = true;
    s.innerHTML = JSON.stringify({
      autosize: true,
      symbol: "EURUSD",
      theme: darkMode ? "dark" : "light",
    });
    chartRef.current.appendChild(s);
  }, [darkMode]);

  useEffect(() => {
    if (!newsRef.current) return;
    newsRef.current.innerHTML = "";
    const s = document.createElement("script");
    s.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js";
    s.async = true;
    s.innerHTML = JSON.stringify({
      colorTheme: darkMode ? "dark" : "light",
      locale: "en",
    });
    newsRef.current.appendChild(s);
  }, [darkMode]);

  useEffect(() => {
    if (!extraChartRef.current) return;
    extraChartRef.current.innerHTML = "";
    const s = document.createElement("script");
    s.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js";
    s.async = true;
    s.innerHTML = JSON.stringify({
      symbol: "NASDAQ:AAPL",
      colorTheme: darkMode ? "dark" : "light",
      autosize: true,
    });
    extraChartRef.current.appendChild(s);
  }, [darkMode]);

  useEffect(() => {
    if (!tickerRef.current) return;
    tickerRef.current.innerHTML = "";
    const s = document.createElement("script");
    s.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
    s.async = true;
    s.innerHTML = JSON.stringify({
      colorTheme: darkMode ? "dark" : "light",
      locale: "en",
    });
    tickerRef.current.appendChild(s);
  }, [darkMode]);

  return (
    <div
      className={`flex min-h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* SIDEBAR */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 transform transition-transform
        bg-white/40 backdrop-blur-xl border-r shadow-xl
        lg:relative lg:translate-x-0
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-6 text-2xl font-bold text-center border-b">
          {traderName}
        </div>

        <nav className="flex flex-col gap-3 p-4">
          {[
            ["Dashboard", "/dashboard"],
            ["Trades", "/trades"],
            ["BOT Trades History", "/bot-trades"],
            ["Transactions History", "/transactions"],
            ["Upgrade", "/upgrades"],
            ["News", "/news"],
            ["Help/Support", "/help-support"],
          ].map(([name, href]) => (
            <Link
              key={href}
              href={href}
              onClick={() => setSidebarOpen(false)}
              className="px-4 py-3 rounded-lg bg-white/70 hover:bg-white font-bold"
            >
              {name}
            </Link>
          ))}
        </nav>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* MAIN */}
      <div className="flex-1 flex flex-col">
        {/* NAVBAR */}
        <div
          className={`flex items-center justify-between px-4 py-2 ${
            darkMode ? "bg-gray-800" : "bg-blue-600"
          } text-white`}
        >
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden"
            >
              {sidebarOpen ? <X /> : <Menu />}
            </button>

            <Image src="/images/logo3.png" alt="Logo" width={100} height={32} />

            {/* ✅ DESKTOP NAV LINKS */}
            <div className="hidden lg:flex items-center gap-3">
              <Link href="/" className="px-3 py-1 bg-pink-600 rounded">
                HOME
              </Link>
              <Link
                href="/dashboard/deposit"
                className="px-3 py-1 bg-gradient-to-r from-red-500 to-orange-500 rounded"
              >
                DEPOSIT
              </Link>
              <Link
                href="/dashboard/withdraw"
                className="px-3 py-1 bg-blue-500 rounded"
              >
                WITHDRAW
              </Link>
              <Link
                href="/kyc-verification"
                className="px-3 py-1 bg-green-600 rounded"
              >
                KYC
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <GoogleTranslate />

            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={darkMode}
                onChange={() => setTheme(darkMode ? "light" : "dark")}
                className="sr-only"
              />
              <div className="w-9 h-5 bg-gray-300 rounded-full peer-checked:bg-green-500" />
            </label>

            <button
              onClick={handleLogout}
              className="hidden sm:block bg-red-600 px-3 py-1 rounded"
            >
              Logout
            </button>
          </div>
        </div>

        {/* MOBILE QUICK ACTIONS */}
        <div className="sm:hidden grid grid-cols-4 gap-2 p-2 bg-white">
          <Link href="/" className="text-center bg-pink-600 text-white rounded py-2 text-xs">HOME</Link>
          <Link href="/dashboard/deposit" className="text-center bg-red-500 text-white rounded py-2 text-xs">DEPOSIT</Link>
          <Link href="/dashboard/withdraw" className="text-center bg-blue-500 text-white rounded py-2 text-xs">WITHDRAW</Link>
          <Link href="/kyc-verification" className="text-center bg-green-600 text-white rounded py-2 text-xs">KYC</Link>
        </div>

        {/* ACCOUNT STATEMENT CARDS */}
        <div className="grid grid-cols-2 gap-2 p-3 sm:gap-4 sm:p-6">
          {[
            ["Account Balance", `$${user?.balance?.toFixed(2) || "0.00"}`, "bg-purple-600"],
            ["Earned Profit", `$${user?.earnedProfit?.toFixed(2) || "0.00"}`, "bg-green-600"],
            ["Active Deposit", `$${user?.activeDeposit?.toFixed(2) || "0.00"}`, "bg-orange-500"],
            ["Package Plan", "Upgrade", "bg-red-600"],
          ].map(([label, value, color], i) => (
            <div
              key={i}
              className={`${color} text-white rounded-xl shadow p-2 sm:p-4 text-center`}
            >
              <p className="text-[11px] sm:text-sm opacity-90">{label}</p>
              <p className="text-base sm:text-xl font-bold mt-1">{value}</p>
            </div>
          ))}
        </div>

        <div ref={tickerRef} className="h-[60px]" />

        <main className="flex-1 p-4 sm:p-6 space-y-8">
          <div className="bg-white rounded-xl p-4">
            <div ref={chartRef} className="h-[500px]" />
          </div>

          <div className="bg-white rounded-xl p-4">
            <div ref={newsRef} className="h-[400px]" />
          </div>

          <div className="bg-white rounded-xl p-4">
            <div ref={extraChartRef} className="h-[400px]" />
          </div>
        </main>

        <footer className="text-center py-4 text-sm border-t">
          All Rights Reserved © VentureFX {new Date().getFullYear()}
        </footer>
      </div>
    </div>
  );
};

export default DashboardPage;
