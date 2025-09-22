"use client";

import React, { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import GoogleTranslate from "@/components/GoogleTranslate";
import { useTheme } from "next-themes";

interface UserData {
  balance: number;
  earnedProfit: number;
  activeDeposit: number;
  status: string;
}

const DashboardPage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);

  // ✅ dark mode from next-themes
  const { theme, setTheme } = useTheme();
  const darkMode = theme === "dark";

  // Refs
  const chartRef = useRef<HTMLDivElement>(null);
  const newsRef = useRef<HTMLDivElement>(null);
  const extraChartRef = useRef<HTMLDivElement>(null);
  const tickerRef = useRef<HTMLDivElement>(null);

  // Logout handler
  const handleLogout = () => {
    try {
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = "/login";
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  // ✅ Fetch user data (balance, profit, deposit)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) return;

        const res = await fetch(`/api/users/${userId}`);
        const data = await res.json();

        if (res.ok) {
          setUser({
            balance: data.balance || 0,
            earnedProfit: data.earnedProfit || 0, // ✅ match API field
            activeDeposit: data.activeDeposit || 0,
            status: data.status || "Active",
          });
        } else {
          console.error("❌ Failed to fetch user:", data);
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUser();
  }, []);

  // Load TradingView scripts with theme support
  useEffect(() => {
    if (!chartRef.current) return;
    chartRef.current.innerHTML = "";
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: "AAPL",
      interval: "1",
      timezone: "Etc/UTC",
      theme: darkMode ? "dark" : "light",
      style: "1",
      locale: "en",
      enable_publishing: false,
      hide_top_toolbar: false,
      hide_legend: false,
      withdateranges: true,
      allow_symbol_change: true,
      details: true,
      hotlist: true,
      calendar: true,
      studies: [
        "RSI@tv-basicstudies",
        "Stochastic@tv-basicstudies",
        "BB@tv-basicstudies",
      ],
    });
    chartRef.current.appendChild(script);
  }, [darkMode]);

  useEffect(() => {
    if (!newsRef.current) return;
    newsRef.current.innerHTML = "";
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      colorTheme: darkMode ? "dark" : "light",
      dateRange: "12M",
      showChart: true,
      locale: "en",
      isTransparent: false,
      showSymbolLogo: true,
      showFloatingTooltip: false,
      width: "100%",
      height: "660",
      tabs: [
        {
          title: "Forex",
          symbols: [
            { s: "FX:EURUSD", d: "EUR/USD" },
            { s: "FX:GBPUSD", d: "GBP/USD" },
            { s: "FX:USDJPY", d: "USD/JPY" },
            { s: "FX:USDCHF", d: "USD/CHF" },
            { s: "FX:AUDUSD", d: "AUD/USD" },
            { s: "FX:USDCAD", d: "USD/CAD" },
          ],
        },
      ],
    });
    newsRef.current.appendChild(script);
  }, [darkMode]);

  useEffect(() => {
    if (!extraChartRef.current) return;
    extraChartRef.current.innerHTML = "";
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbol: "NASDAQ:AAPL",
      width: "100%",
      height: "100%",
      locale: "en",
      dateRange: "12M",
      colorTheme: darkMode ? "dark" : "light",
      isTransparent: false,
      autosize: true,
    });
    extraChartRef.current.appendChild(script);
  }, [darkMode]);

  useEffect(() => {
    if (!tickerRef.current) return;
    tickerRef.current.innerHTML = "";
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbols: [
        { proName: "FX:USDJPY", title: "USD/JPY" },
        { proName: "FX:GBPCHF", title: "GBP/CHF" },
        { proName: "ETHUSD", title: "ETH/XAU" },
        { proName: "CRYPTOCAP:BTC", title: "USD/BTC" },
        { proName: "FX:EURUSD", title: "EUR/USD" },
        { proName: "FX:EURCHF", title: "EUR/CHF" },
        { proName: "FX:EURNZD", title: "EUR/NZD" },
      ],
      colorTheme: darkMode ? "dark" : "light",
      isTransparent: false,
      displayMode: "adaptive",
      locale: "en",
    });
    tickerRef.current.appendChild(script);
  }, [darkMode]);

  return (
    <div
      className={`flex min-h-screen overflow-x-hidden ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 transform ${
          darkMode ? "bg-gray-800" : "bg-[#03182d] text-white"
        } transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 font-bold text-xl border-b border-gray-700">
          VentureFX
        </div>
        <nav className="p-4 space-y-4">
          <Link href="/dashboard" className="block hover:text-blue-400">
            Dashboard
          </Link>
          <Link href="/trades" className="block hover:text-blue-400">
            Trades
          </Link>
          <Link href="/bot-trades" className="block hover:text-blue-400">
            BOT Trades History
          </Link>
          <Link href="/transactions" className="block hover:text-blue-400">
            Transactions History
          </Link>
          <Link href="/upgrades" className="block hover:text-blue-400">
            Upgrade
          </Link>
          <Link href="/news" className="block hover:text-blue-400">
            News
          </Link>
          <Link href="/help-support" className="block hover:text-blue-400">
            Help/Support
          </Link>
        </nav>
      </aside>

      {/* Overlay for mobile */}
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
          {/* Left: Logo + toggle + nav buttons */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden"
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <Image
              src="/images/logo3.png"
              alt="Company Logo"
              width={120}
              height={40}
              priority
            />

            {/* Nav Buttons */}
            <div className="flex space-x-3 ml-6">
              <Link
                href="/"
                className="px-4 py-2 bg-pink-600 hover:bg-pink-700 rounded text-white font-semibold"
              >
                HOME
              </Link>
              <Link
                href="/dashboard/deposit"
                className="px-4 py-2 bg-gradient-to-r from-red-500 to-orange-500 hover:opacity-90 rounded text-white font-semibold"
              >
                DEPOSIT
              </Link>
              <Link
                href="/dashboard/withdraw"
                className="px-4 py-2 bg-blue-500 hover:bg-blue-700 rounded text-white font-semibold"
              >
                WITHDRAW
              </Link>
            </div>
          </div>

          {/* Right: language + switch + kyc + logout */}
          <div className="flex items-center space-x-3">
            {/* Dark/light toggle */}
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={darkMode}
                onChange={() => setTheme(darkMode ? "light" : "dark")}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-green-500"></div>
            </label>

            {/* Google Translate */}
            <div className="flex items-center">
              <GoogleTranslate />
            </div>

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

            {/* 🚀 Logout button */}
            <button
              onClick={handleLogout}
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

        {/* TradingView Ticker */}
        <div ref={tickerRef} className="w-full" style={{ height: "60px" }} />

        {/* Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8 w-full max-w-full">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6 w-full">
            <div className="bg-purple-600 text-white shadow rounded-xl p-4 text-center w-full">
              <h3 className="text-sm">Account Balance</h3>
              <p className="text-2xl font-bold">
                ${user ? user.balance.toFixed(2) : "0.00"}
              </p>
              <p className="text-xs mt-2">
                Account Status: {user ? user.status : "Loading..."}
              </p>
            </div>
            <div className="bg-green-600 text-white shadow rounded-xl p-4 text-center w-full">
              <h3 className="text-sm">Earned Profit</h3>
              <p className="text-2xl font-bold">
                ${user ? user.earnedProfit.toFixed(2) : "0.00"}
              </p>
              <p className="text-xs mt-2">
                Account Status: {user ? user.status : "Loading..."}
              </p>
            </div>
            <div className="bg-orange-500 text-white shadow rounded-xl p-4 text-center w-full">
              <h3 className="text-sm">Active Deposit</h3>
              <p className="text-2xl font-bold">
                ${user ? user.activeDeposit.toFixed(2) : "0.00"}
              </p>
              <p className="text-xs mt-2">
                Account Status: {user ? user.status : "Loading..."}
              </p>
            </div>
            <div className="bg-red-500 text-white shadow rounded-xl p-4 text-center w-full">
              <h3 className="text-sm">Buy Package</h3>
              <p className="text-xs mt-1">Package Plan</p>
              <Link
                href="/upgrade"
                className="mt-3 inline-block px-4 py-2 bg-white text-red-600 font-semibold rounded-lg hover:bg-gray-100"
              >
                Upgrade Account
              </Link>
            </div>
          </div>

          {/* Live Chart */}
          <div
            className={`shadow rounded-xl p-4 w-full ${
              darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
            }`}
          >
            <h2 className="text-lg font-semibold mb-4">Live Chart</h2>
            <div ref={chartRef} className="w-full h-[600px]" />
          </div>

          {/* Market Overview */}
          <div
            className={`shadow rounded-xl p-4 w-full ${
              darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
            }`}
          >
            <h2 className="text-lg font-semibold mb-4">Market Overview</h2>
            <div ref={newsRef} className="w-full h-[400px]" />
          </div>

          {/* Extra Chart */}
          <div
            className={`shadow rounded-xl p-4 w-full ${
              darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
            }`}
          >
            <h2 className="text-lg font-semibold mb-4">Extra Chart</h2>
            <div ref={extraChartRef} className="w-full h-[400px]" />
          </div>
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
};

export default DashboardPage;


