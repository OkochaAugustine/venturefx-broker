"use client";

import { useState } from "react";
import Link from "next/link";
import { Copy, Menu, X } from "lucide-react";
import GoogleTranslate from "@/components/GoogleTranslate";

// ✅ Navbar
function Navbar({ toggleSidebar }: { toggleSidebar: () => void }) {
  return (
    <nav className="bg-[#03182d] text-white shadow-md sticky top-0 z-50">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Sidebar toggle (mobile) */}
        <button
          onClick={toggleSidebar}
          className="lg:hidden text-white hover:text-indigo-400"
        >
          <Menu size={24} />
        </button>

        {/* Brand */}
        <Link href="/dashboard" className="text-lg font-bold tracking-wide">
          🚀 VentureWise FX
        </Link>

        {/* Links */}
        <div className="hidden lg:flex items-center gap-6">
          <Link href="/dashboard" className="hover:text-indigo-400 transition">
            Dashboard
          </Link>
          <Link href="/bot" className="hover:text-indigo-400 transition">
            Trading BOT
          </Link>
          <Link href="/help" className="hover:text-indigo-400 transition">
            Support
          </Link>

          {/* Translator */}
          <GoogleTranslate />
        </div>
      </div>
    </nav>
  );
}

// ✅ Sidebar
function Sidebar({
  open,
  toggleSidebar,
}: {
  open: boolean;
  toggleSidebar: () => void;
}) {
  return (
    <aside
      className={`fixed top-0 left-0 h-full bg-[#041e38] text-white shadow-xl w-64 transform ${
        open ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 lg:translate-x-0 z-40`}
    >
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
        <span className="text-lg font-bold">📊 Menu</span>
        <button
          onClick={toggleSidebar}
          className="lg:hidden text-gray-400 hover:text-white"
        >
          <X size={22} />
        </button>
      </div>
      <nav className="p-6 space-y-4">
        <Link href="/dashboard" className="block hover:text-indigo-400">
          Dashboard
        </Link>
        <Link href="/deposit" className="block hover:text-indigo-400">
          Deposit
        </Link>
        <Link href="/withdraw" className="block hover:text-indigo-400">
          Withdraw
        </Link>
        <Link href="/bot" className="block hover:text-indigo-400">
          Trading BOT
        </Link>
        <Link href="/help" className="block hover:text-indigo-400">
          Support
        </Link>
      </nav>
    </aside>
  );
}

// ✅ Payment Page
export default function PaymentPage() {
  const [selected, setSelected] = useState<"BTC" | "ETH" | "USDT">("BTC");
  const [copied, setCopied] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const wallets = {
    BTC: "bc1qexamplebtcwalletaddress123",
    ETH: "0xexampleethwalletaddress456",
    USDT: "Texampleusdtwalletaddress789",
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(wallets[selected]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <Navbar toggleSidebar={toggleSidebar} />

        {/* Page Content */}
        <main className="flex-1 p-6 space-y-8">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6 rounded-xl shadow-lg">
            <h1 className="text-2xl font-bold">Complete Your Payment</h1>
            <p className="mt-2 text-sm opacity-90">
              Send your subscription payment to activate the BOT.
            </p>
          </div>

          {/* Select currency */}
          <div className="bg-white p-6 rounded-xl shadow space-y-4">
            <h2 className="text-lg font-semibold">💱 Choose Payment Method</h2>
            <div className="flex gap-3">
              {(["BTC", "ETH", "USDT"] as const).map((coin) => (
                <button
                  key={coin}
                  onClick={() => setSelected(coin)}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    selected === coin
                      ? "bg-green-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {coin}
                </button>
              ))}
            </div>
          </div>

          {/* Wallet address */}
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <h2 className="text-lg font-semibold mb-4">
              📌 {selected} Wallet Address
            </h2>
            <p className="font-mono text-sm break-all bg-gray-100 p-3 rounded-lg">
              {wallets[selected]}
            </p>
            <button
              onClick={handleCopy}
              className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg flex items-center gap-2 mx-auto"
            >
              <Copy size={18} />
              {copied ? "Copied!" : "Copy Address"}
            </button>
          </div>

          {/* Confirmation instructions */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold mb-3">✅ After Payment</h2>
            <p className="text-sm text-gray-600">
              Once you have made the payment, please wait a few minutes for
              confirmation. Your BOT subscription will be activated
              automatically.
            </p>
          </div>

          {/* Back link */}
          <Link
            href="/bot-trades/info"
            className="inline-block mt-6 text-sm text-green-600 hover:underline"
          >
            ← Back to Plans
          </Link>
        </main>
      </div>
    </div>
  );
}
