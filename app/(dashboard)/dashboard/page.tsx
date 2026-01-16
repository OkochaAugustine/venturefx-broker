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

  // Refs for TradingView widgets
  const chartRef = useRef<HTMLDivElement>(null);
  const newsRef = useRef<HTMLDivElement>(null);
  const extraChartRef = useRef<HTMLDivElement>(null);
  const tickerRef = useRef<HTMLDivElement>(null);

  // ✅ Fetch latest user from backend
  const fetchUserData = async (id: string) => {
    try {
      const res = await fetch(`/api/users/${id}`);
      if (!res.ok) throw new Error(`Failed to fetch user: ${res.status}`);
      const updated = await res.json();

      setUser(updated);
      setTraderName(
        updated.fullname || updated.username || updated.email || "Guest"
      );

      localStorage.setItem("user", JSON.stringify(updated));
    } catch (err) {
      console.error("❌ Error fetching user:", err);
    }
  };

  // ✅ Load user from localStorage & refresh
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        const u = parsed.user || parsed;

        if (u && u._id) {
          setTraderName(u.fullname || u.username || u.email || "Guest");
          setUser({
            _id: u._id,
            balance: Number(u.balance) || 0,
            earnedProfit: Number(u.earnedProfit) || 0,
            activeDeposit: Number(u.activeDeposit) || 0,
            status: u.status || "Active",
            fullname: u.fullname,
            username: u.username,
            email: u.email,
          });

          fetchUserData(u._id);
          const interval = setInterval(() => fetchUserData(u._id), 5000);
          return () => clearInterval(interval);
        }
      } catch (err) {
        console.error("❌ Failed to parse user:", err);
      }
    }
  }, []);

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

  // --- TradingView widgets setup ---
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
        className={`fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 ease-in-out
        bg-white/40 backdrop-blur-2xl border-r border-white/30 shadow-2xl
        lg:relative lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 text-3xl font-extrabold text-gray-900 drop-shadow-md border-b border-white/20 text-center">
          {traderName}
        </div>

        <nav className="flex flex-col gap-4 p-4">
          {[
            { name: "Dashboard", href: "/dashboard" },
            { name: "Trades", href: "/trades" },
            { name: "BOT Trades History", href: "/bot-trades" },
            { name: "Transactions History", href: "/transactions" },
            { name: "Upgrade", href: "/upgrades" },
            { name: "News", href: "/news" },
            { name: "Help/Support", href: "/help-support" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-3 rounded-lg bg-white/70 hover:bg-white/90
              text-xl font-extrabold text-gray-900 hover:text-red-600 shadow-md hover:shadow-xl
              transition-all duration-300 ease-out"
            >
              {link.name}
            </Link>
          ))}
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

            <div className="flex space-x-3 ml-6">
              <Link
                href="/"
                className="px-4 py-2 bg-pink-600 hover:bg-pink-700 rounded text-white font-bold text-lg"
              >
                HOME
              </Link>
              <Link
                href="/dashboard/deposit"
                className="px-4 py-2 bg-gradient-to-r from-red-500 to-orange-500 hover:opacity-90 rounded text-white font-bold text-lg"
              >
                DEPOSIT
              </Link>
              <Link
                href="/dashboard/withdraw"
                className="px-4 py-2 bg-blue-500 hover:bg-blue-700 rounded text-white font-bold text-lg"
              >
                WITHDRAW
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={darkMode}
                onChange={() => setTheme(darkMode ? "light" : "dark")}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-green-500"></div>
            </label>

            <GoogleTranslate />

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
            {[
              {
                value:
                  user?.balance !== undefined
                    ? `$${user.balance.toFixed(2)}`
                    : "$0.00",
                label: "Account Balance",
                extra: `Account Status: ${user?.status || "Active"}`,
                color: "bg-purple-600",
              },
              {
                value:
                  user?.earnedProfit !== undefined
                    ? `$${user.earnedProfit.toFixed(2)}`
                    : "$0.00",
                label: "Earned Profit",
                extra: `Account Status: ${user?.status || "Active"}`,
                color: "bg-green-600",
              },
              {
                value:
                  user?.activeDeposit !== undefined
                    ? `$${user.activeDeposit.toFixed(2)}`
                    : "$0.00",
                label: "Active Deposit",
                extra: `Account Status: ${user?.status || "Active"}`,
                color: "bg-orange-500",
              },
              {
                value: "Package Plan",
                label: "Buy Package",
                extra: (
                  <Link
                    href="/upgrades"
                    className="mt-3 inline-block px-4 py-2 bg-white text-red-600 font-semibold rounded-lg hover:bg-gray-100"
                  >
                    Upgrade Account
                  </Link>
                ),
                color: "bg-red-500",
              },
            ].map((card, i) => (
              <div
                key={i}
                className={`${card.color} text-white shadow rounded-xl p-4 text-center w-full`}
              >
                <h3 className="text-sm">{card.label}</h3>
                <p className="text-2xl font-bold">{card.value}</p>
                <p className="text-xs mt-2">{card.extra}</p>
              </div>
            ))}
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
