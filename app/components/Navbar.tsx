"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Link from "next/link";

const GoogleTranslate = dynamic(() => import("./GoogleTranslate"), { ssr: false });

type Pair = {
  symbol: string;
  price: number;
  change: number;
};

export default function Navbar() {
  const [pairs, setPairs] = useState<Pair[]>([
    { symbol: "EUR/USD", price: 1.085, change: 0.0012 },
    { symbol: "GBP/USD", price: 1.275, change: -0.0008 },
    { symbol: "USD/JPY", price: 149.35, change: 0.15 },
    { symbol: "AUD/USD", price: 0.655, change: -0.0005 },
    { symbol: "USD/CAD", price: 1.354, change: 0.0009 },
    { symbol: "USD/CHF", price: 0.905, change: -0.0007 },
    { symbol: "NZD/USD", price: 0.612, change: 0.0004 },
    { symbol: "BTC/USD", price: 64000, change: -250 },
    { symbol: "ETH/USD", price: 3200, change: 15 },
    { symbol: "LTC/USD", price: 82, change: -0.6 },
    { symbol: "XRP/USD", price: 0.52, change: 0.01 },
    { symbol: "SOL/USD", price: 145, change: 2.1 },
    { symbol: "BNB/USD", price: 590, change: -5.4 },
    { symbol: "ADA/USD", price: 0.38, change: 0.02 },
    { symbol: "XAU/USD", price: 2025, change: 5.5 },
    { symbol: "XAG/USD", price: 23.75, change: -0.12 },
    { symbol: "WTI/USD", price: 78.25, change: -0.5 },
    { symbol: "NG/USD", price: 2.65, change: 0.07 },
    { symbol: "PLAT/USD", price: 880, change: -2.5 },
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

  // Fake live updates
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
    <header className="fixed top-0 left-0 w-full z-50 bg-[#0d1b2a] text-white shadow-md">
      {/* Translator Bar */}
      <div className="w-full flex justify-start px-6 py-2 bg-[#0d1b2a] border-b border-gray-700 text-lg font-bold">
        <GoogleTranslate />
      </div>

      {/* Main Navbar Row */}
      <div className="flex items-center justify-between px-6 py-5">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 hover:scale-110 transition-transform duration-500 ease-out"
        >
          <div className="w-14 h-14 flex items-center justify-center rounded-full bg-white/10 p-1">
            <img
              src="/images/logo3.png"
              alt="VentureWise Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <span
            className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-red-500 via-yellow-400 to-blue-500 bg-clip-text text-transparent animate-gradient"
            style={{ fontFamily: "'Pacifico', cursive" }}
          >
            VentureWise
          </span>
          <style jsx>{`
            @keyframes gradient {
              0% {
                background-position: 0% 50%;
              }
              50% {
                background-position: 100% 50%;
              }
              100% {
                background-position: 0% 50%;
              }
            }
            .animate-gradient {
              background-size: 300% 300%;
              animation: gradient 6s ease infinite;
            }
          `}</style>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <nav className="flex gap-12 text-xl font-extrabold tracking-wide">
            <Link href="/" className="hover:text-yellow-400 transition">Home</Link>
            <Link href="/about" className="hover:text-yellow-400 transition">About</Link>
            <Link href="/faq" className="hover:text-yellow-400 transition">FAQ</Link>
            <Link href="/contact" className="hover:text-yellow-400 transition">Contact</Link>
          </nav>

          {/* Auth Buttons */}
          <div className="flex gap-6 ml-8">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="px-6 py-3 rounded-md bg-red-600 hover:bg-red-700 transition text-xl font-extrabold"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    localStorage.removeItem("jwtToken");
                    setUser(null);
                  }}
                  className="px-6 py-3 rounded-md bg-transparent border border-red-600 hover:bg-red-600 hover:text-white transition text-xl font-extrabold"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-6 py-3 rounded-md bg-transparent border border-red-600 hover:bg-red-600 hover:text-white transition text-xl font-extrabold"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="px-6 py-3 rounded-md bg-red-600 hover:bg-red-700 transition text-xl font-extrabold"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <button onClick={() => setIsOpen(!isOpen)} className="p-2">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  isOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <nav className="md:hidden flex flex-col gap-6 bg-[#0d1b2a] px-6 pb-6 text-2xl font-extrabold tracking-wide">
          <Link href="/" className="hover:text-yellow-400 transition">Home</Link>
          <Link href="/about" className="hover:text-yellow-400 transition">About</Link>
          <Link href="/faq" className="hover:text-yellow-400 transition">FAQ</Link>
          <Link href="/contact" className="hover:text-yellow-400 transition">Contact</Link>

          {/* Translate */}
          <div className="my-4 flex justify-center">
            <GoogleTranslate />
          </div>

          {user ? (
            <>
              <Link
                href="/dashboard"
                className="px-6 py-3 rounded-md bg-red-600 hover:bg-red-700 transition text-2xl font-extrabold"
              >
                Dashboard
              </Link>
              <button
                onClick={() => {
                  localStorage.removeItem("jwtToken");
                  setUser(null);
                }}
                className="px-6 py-3 rounded-md bg-transparent border border-red-600 hover:bg-red-600 hover:text-white transition text-2xl font-extrabold"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="px-6 py-3 rounded-md bg-transparent border border-red-600 hover:bg-red-600 hover:text-white transition text-2xl font-extrabold"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="px-6 py-3 rounded-md bg-red-600 hover:bg-red-700 transition text-2xl font-extrabold"
              >
                Register
              </Link>
            </>
          )}
        </nav>
      )}

      {/* Live Ticker */}
      <div className="bg-gradient-to-r from-gray-900 to-black overflow-hidden border-t border-b border-gray-700">
        <div className="flex whitespace-nowrap">
          <div className="animate-marquee flex gap-16 px-6 py-3 text-lg">
            {pairs.map((p, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 font-bold min-w-[160px]"
              >
                <span className="text-gray-300">{p.symbol}</span>
                <span className="text-white">{(p.price - 0.001).toFixed(4)}</span>{" "}
                /{" "}
                <span className="text-white">{(p.price + 0.001).toFixed(4)}</span>
                <span
                  className={`ml-2 font-bold ${
                    p.change >= 0 ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {p.change >= 0 ? "▲" : "▼"} {Math.abs(p.change)}
                </span>
              </div>
            ))}
          </div>

          <div className="animate-marquee flex gap-16 px-6 py-3 text-lg">
            {pairs.map((p, idx) => (
              <div
                key={idx + "-dup"}
                className="flex items-center gap-3 font-bold min-w-[160px]"
              >
                <span className="text-gray-300">{p.symbol}</span>
                <span className="text-white">{(p.price - 0.001).toFixed(4)}</span>{" "}
                /{" "}
                <span className="text-white">{(p.price + 0.001).toFixed(4)}</span>
                <span
                  className={`ml-2 font-bold ${
                    p.change >= 0 ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {p.change >= 0 ? "▲" : "▼"} {Math.abs(p.change)}
                </span>
              </div>
            ))}
          </div>
        </div>

        <style jsx>{`
          .animate-marquee {
            display: inline-flex;
            animation: marquee 50s linear infinite;
          }
          @keyframes marquee {
            0% {
              transform: translateX(0%);
            }
            100% {
              transform: translateX(-100%);
            }
          }
        `}</style>
      </div>
    </header>
  );
}

