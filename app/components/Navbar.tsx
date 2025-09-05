"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Pair = {
  symbol: string;
  price: number;
  change: number;
};

export default function Navbar() {
  const [pairs, setPairs] = useState<Pair[]>([
    // Forex
    { symbol: "EUR/USD", price: 1.085, change: 0.0012 },
    { symbol: "GBP/USD", price: 1.275, change: -0.0008 },
    { symbol: "USD/JPY", price: 149.35, change: 0.15 },
    { symbol: "AUD/USD", price: 0.655, change: -0.0005 },
    { symbol: "USD/CAD", price: 1.354, change: 0.0009 },
    { symbol: "USD/CHF", price: 0.905, change: -0.0007 },
    { symbol: "NZD/USD", price: 0.612, change: 0.0004 },

    // Crypto
    { symbol: "BTC/USD", price: 64000, change: -250 },
    { symbol: "ETH/USD", price: 3200, change: 15 },
    { symbol: "LTC/USD", price: 82, change: -0.6 },
    { symbol: "XRP/USD", price: 0.52, change: 0.01 },
    { symbol: "SOL/USD", price: 145, change: 2.1 },
    { symbol: "BNB/USD", price: 590, change: -5.4 },
    { symbol: "ADA/USD", price: 0.38, change: 0.02 },

    // Commodities
    { symbol: "XAU/USD", price: 2025, change: 5.5 },
    { symbol: "XAG/USD", price: 23.75, change: -0.12 },
    { symbol: "WTI/USD", price: 78.25, change: -0.5 },
    { symbol: "NG/USD", price: 2.65, change: 0.07 },
    { symbol: "PLAT/USD", price: 880, change: -2.5 },

    // Indices
    { symbol: "S&P 500", price: 5200, change: 12 },
    { symbol: "NASDAQ 100", price: 17650, change: -40 },
    { symbol: "DAX 40", price: 16200, change: 30 },
    { symbol: "FTSE 100", price: 7600, change: -20 },
    { symbol: "NIKKEI 225", price: 38200, change: 75 },
    { symbol: "HANG SENG", price: 19450, change: -65 },
    { symbol: "RUSSELL 2000", price: 2020, change: 15 },
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) setUser("loggedIn");
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setPairs((prev) =>
        prev.map((p) => ({
          ...p,
          price: +(p.price + (Math.random() - 0.5) * (p.price * 0.002)).toFixed(
            p.price > 100 ? 2 : 4
          ),
          change: +(Math.random() * 2 - 1).toFixed(4),
        }))
      );
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-[#0d1b2a] text-white shadow-md">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-red-500">
          VentureWise Brokers
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8 text-sm font-medium">
          <Link href="/" className="hover:text-red-500 transition">
            Home
          </Link>
          <Link href="/about" className="hover:text-red-500 transition">
            About
          </Link>
          <Link href="/faq" className="hover:text-red-500 transition">
            FAQ
          </Link>
          <Link href="/contact" className="hover:text-red-500 transition">
            Contact
          </Link>
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex gap-4">
          {user ? (
            <>
              <Link
                href="/dashboard"
                className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 transition"
              >
                Dashboard
              </Link>
              <button
                onClick={() => {
                  localStorage.removeItem("jwtToken");
                  setUser(null);
                }}
                className="px-4 py-2 rounded-md bg-transparent border border-red-600 hover:bg-red-600 hover:text-white transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="px-4 py-2 rounded-md bg-transparent border border-red-600 hover:bg-red-600 hover:text-white transition"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <button onClick={() => setIsOpen(!isOpen)} className="p-2">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <nav className="md:hidden flex flex-col gap-2 bg-[#0d1b2a] px-6 pb-4">
          <Link href="/" className="hover:text-red-500 transition">
            Home
          </Link>
          <Link href="/about" className="hover:text-red-500 transition">
            About
          </Link>
          <Link href="/faq" className="hover:text-red-500 transition">
            FAQ
          </Link>
          <Link href="/contact" className="hover:text-red-500 transition">
            Contact
          </Link>
          {user ? (
            <>
              <Link
                href="/dashboard"
                className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 transition"
              >
                Dashboard
              </Link>
              <button
                onClick={() => {
                  localStorage.removeItem("jwtToken");
                  setUser(null);
                }}
                className="px-4 py-2 rounded-md bg-transparent border border-red-600 hover:bg-red-600 hover:text-white transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="px-4 py-2 rounded-md bg-transparent border border-red-600 hover:bg-red-600 hover:text-white transition"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 transition"
              >
                Register
              </Link>
            </>
          )}
        </nav>
      )}

      {/* Live Ticker Bar */}
      <div className="bg-black overflow-x-hidden whitespace-nowrap">
        <div className="animate-marquee flex gap-12 px-6 py-2">
          {pairs.map((p, idx) => (
            <div key={idx} className="flex items-center gap-2 text-sm min-w-[120px]">
              <span className="font-semibold">{p.symbol}</span>
              <span>{p.price}</span>
              <span className={p.change >= 0 ? "text-green-400" : "text-red-400"}>
                {p.change >= 0 ? "▲" : "▼"} {Math.abs(p.change)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* CSS for infinite scroll */}
      <style jsx>{`
        .animate-marquee {
          display: inline-flex;
          animation: marquee 35s linear infinite;
        }
        @keyframes marquee {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </header>
  );
}


