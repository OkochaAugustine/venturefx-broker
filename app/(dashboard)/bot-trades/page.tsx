"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Play,
  Settings,
  Zap,
  TrendingUp,
  DollarSign,
  Clock,
  Star,
} from "lucide-react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function BotPage() {
  const [botActive] = useState(false);

  // Fake global performance data (from other traders)
  const performanceData = [
    { date: "Mon", profit: 120 },
    { date: "Tue", profit: 180 },
    { date: "Wed", profit: 90 },
    { date: "Thu", profit: 250 },
    { date: "Fri", profit: 200 },
    { date: "Sat", profit: 300 },
    { date: "Sun", profit: 280 },
  ];

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6 pb-20">
        {/* Title */}
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Zap className="text-yellow-500" /> Trading BOT
        </h1>

        {/* 🔗 Info Banner */}
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

          <div className="flex flex-wrap items-center gap-4">
            <button
              disabled
              className="px-6 py-3 rounded-xl text-white font-semibold shadow flex-1 bg-gray-400 cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Play size={18} />
              <span>Start BOT</span>
            </button>

            <button
              disabled
              className="px-6 py-3 rounded-xl border flex-1 justify-center text-gray-400 cursor-not-allowed flex items-center gap-2"
            >
              <Settings size={18} />
              <span>Configure</span>
            </button>
          </div>

          {/* Status */}
          <div className="mt-4">
            <p className="font-medium">BOT Status:</p>
            <p className="font-bold text-lg text-gray-500">
              ⏸️ Inactive (You haven’t purchased a BOT yet)
            </p>
          </div>
        </div>

        {/* Global Stats Overview */}
        <div>
          <h2 className="text-lg font-semibold mb-2">
            📊 Global BOT Performance (All Users)
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4 rounded-xl shadow">
              <p className="text-sm">Total Profit Generated</p>
              <h3 className="text-2xl font-bold flex items-center gap-2">
                <DollarSign size={20} /> 1.2M+
              </h3>
            </div>
            <div className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white p-4 rounded-xl shadow">
              <p className="text-sm">Global Success Rate</p>
              <h3 className="text-2xl font-bold flex items-center gap-2">
                <TrendingUp size={20} /> 86%
              </h3>
            </div>
            <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-4 rounded-xl shadow">
              <p className="text-sm">Total Trades Executed</p>
              <h3 className="text-2xl font-bold flex items-center gap-2">
                <Clock size={20} /> 245K+
              </h3>
            </div>
            <div className="bg-gradient-to-r from-pink-500 to-rose-600 text-white p-4 rounded-xl shadow">
              <p className="text-sm">User Rating</p>
              <h3 className="text-2xl font-bold flex items-center gap-2">
                <Star size={20} /> 4.8/5
              </h3>
            </div>
          </div>
        </div>

        {/* Performance Chart */}
        <div className="border rounded-xl shadow bg-white p-6">
          <h2 className="text-lg font-semibold mb-4">
            Weekly Global BOT Profit
          </h2>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="profit"
                  stroke="#4F46E5"
                  fillOpacity={1}
                  fill="url(#colorProfit)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Call To Action */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-center p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold">Upgrade to PRO BOT 🚀</h2>
          <p className="text-sm opacity-90 mt-2">
            Join thousands of traders already profiting with our AI BOT.
          </p>
          <Link href="/upgrade-bot">
            <button className="mt-4 px-6 py-3 bg-yellow-400 text-black font-semibold rounded-xl shadow hover:bg-yellow-500 transition">
              Upgrade Now
            </button>
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}
