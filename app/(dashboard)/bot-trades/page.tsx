"use client";

import { useState } from "react";
import Link from "next/link";
import { Play, Pause, Settings, Zap } from "lucide-react";

export default function BotPage() {
  const [botActive, setBotActive] = useState(false);

  return (
    <div className="p-6 space-y-6">
      {/* Title */}
      <h1 className="text-2xl font-bold flex items-center gap-2">
        <Zap className="text-yellow-500" /> Trading BOT
      </h1>

      {/* 🔗 Clickable Banner */}
      <Link href="/bot-trades/info">
        <div className="cursor-pointer bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 rounded-xl shadow-md transition transform hover:scale-[1.02] hover:shadow-lg">
          <h2 className="text-lg font-semibold">Automated Trading BOT</h2>
          <p className="text-sm opacity-90">
            Let our AI-driven BOT trade for you 24/7 with optimized strategies.
          </p>
          <p className="mt-2 underline text-sm">👉 Learn more & Activate</p>
        </div>
      </Link>

      {/* BOT Control Panel */}
      <div className="border rounded-xl shadow bg-white p-6 space-y-6">
        <h2 className="text-lg font-semibold">BOT Control Panel</h2>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setBotActive(!botActive)}
            className={`px-6 py-3 rounded-xl text-white font-semibold shadow transition ${
              botActive ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {botActive ? (
              <span className="flex items-center gap-2">
                <Pause size={18} /> Stop BOT
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Play size={18} /> Start BOT
              </span>
            )}
          </button>

          <button className="px-6 py-3 rounded-xl border flex items-center gap-2 hover:bg-gray-50 transition">
            <Settings size={18} /> Configure BOT
          </button>
        </div>

        {/* Status */}
        <div className="mt-4">
          <p className="font-medium">BOT Status:</p>
          <p
            className={`font-bold text-lg ${
              botActive ? "text-green-600" : "text-gray-500"
            }`}
          >
            {botActive ? "✅ Running" : "⏸️ Inactive"}
          </p>
        </div>
      </div>

      {/* Performance Table */}
      <div className="border rounded-xl shadow bg-white p-6">
        <h2 className="text-lg font-semibold mb-4">BOT Performance</h2>
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Pair</th>
              <th className="p-2 border">Direction</th>
              <th className="p-2 border">Profit</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center">
              <td className="p-2 border">2025-09-02</td>
              <td className="p-2 border">BTC/USD</td>
              <td className="p-2 border text-green-600 font-semibold">BUY</td>
              <td className="p-2 border text-green-600 font-semibold">+2.4%</td>
            </tr>
            <tr className="text-center">
              <td className="p-2 border">2025-09-01</td>
              <td className="p-2 border">ETH/USD</td>
              <td className="p-2 border text-red-600 font-semibold">SELL</td>
              <td className="p-2 border text-red-600 font-semibold">-0.8%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
