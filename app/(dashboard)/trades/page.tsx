// app/(dashboard)/trades/page.tsx
"use client";

import DashboardLayout from "@/components/layouts/DashboardLayout";
import { useState } from "react";
import TradesNav from "@/components/TradeNav";

// ✅ Correct Recharts imports
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";

// ✅ Mock data for charts
const data = [
  { name: "Mon", value: 120, volume: 300 },
  { name: "Tue", value: 200, volume: 250 },
  { name: "Wed", value: 150, volume: 400 },
  { name: "Thu", value: 300, volume: 350 },
  { name: "Fri", value: 250, volume: 500 },
];

export default function TradesPage() {
  const [asset, setAsset] = useState("BTCUSD");
  const [duration, setDuration] = useState("");
  const [amount, setAmount] = useState("10");
  const [stopLoss, setStopLoss] = useState("");
  const [takeProfit, setTakeProfit] = useState("");
  const [showPopup, setShowPopup] = useState(true);

  return (
    <DashboardLayout>
      {/* Popup Overlay */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-md text-center">
            <h2 className="text-lg font-bold mb-4">
              Welcome To Our Live Trade Section
            </h2>
            <p className="text-sm text-gray-700 mb-6">
              To Simplify The Process Kindly Subscribe To Our BOT Service to
              Eliminate The RISK Of Loss When Trading Your Self.
            </p>
            <button
              onClick={() => setShowPopup(false)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Okay
            </button>
          </div>
        </div>
      )}

      {/* Main Page Content */}
      <div className="p-6 space-y-6">
        {/* 🔥 Top Nav with live pairs */}
        <TradesNav asset={asset} setAsset={setAsset} />

        <h1 className="text-2xl font-bold">Live Trade Dashboard</h1>

        {/* Banner */}
        <div className="bg-green-600 text-white p-2 rounded">
          Buy Exclusive Trading BOT $500 For 2 Years, Estimated BOT Earnings
          0.3%/0.6% Daily
        </div>

        {/* TradingView Main Chart */}
        <div className="w-full h-[400px] border rounded overflow-hidden">
          <iframe
            src={`https://s.tradingview.com/widgetembed/?frameElementId=tradingview_12345&symbol=${asset}&interval=D&hidesidetoolbar=1&symboledit=1&saveimage=1&toolbarbg=f1f3f6&studies=[]&hideideas=1`}
            style={{ width: "100%", height: "100%" }}
          />
        </div>

        {/* Extra Charts to fill page */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Line Chart */}
          <div className="h-64 w-full border rounded p-2 bg-white">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#4f46e5" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart */}
          <div className="h-64 w-full border rounded p-2 bg-white">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="volume" fill="#16a34a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Trading Form */}
        <div className="space-y-4">
          <div>
            <label className="block">Duration of Trade</label>
            <select
              className="border rounded w-full p-2"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            >
              <option value="">Select Duration</option>
              <option value="1m">1 Minute</option>
              <option value="5m">5 Minutes</option>
              <option value="1h">1 Hour</option>
              <option value="1d">1 Day</option>
            </select>
          </div>

          <div>
            <label className="block">Input Amount to Trade</label>
            <input
              type="text"
              className="border rounded w-full p-2"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Enter Stop Loss"
              className="border rounded w-full p-2"
              value={stopLoss}
              onChange={(e) => setStopLoss(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter Take Profit"
              className="border rounded w-full p-2"
              value={takeProfit}
              onChange={(e) => setTakeProfit(e.target.value)}
            />
          </div>
        </div>

        {/* Execute trade buttons */}
        <div className="flex gap-4">
          <button className="bg-green-600 text-white w-full py-3 rounded">
            BUY / LONG
          </button>
          <button className="bg-red-600 text-white w-full py-3 rounded">
            SELL / SHORT
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}



