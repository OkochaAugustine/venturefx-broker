"use client";

import DashboardLayout from "@/components/layouts/DashboardLayout";
import { useState } from "react";
import TradesNav from "@/components/TradeNav";

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

  const [showWelcome, setShowWelcome] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showStarted, setShowStarted] = useState(false);
  const [tradeType, setTradeType] = useState<"BUY / LONG" | "SELL / SHORT" | null>(null);

  const handleTradeClick = (type: "BUY / LONG" | "SELL / SHORT") => {
    setTradeType(type);
    setShowConfirm(true);
  };

  return (
    <DashboardLayout>
      {/* ✅ Welcome Popup */}
      {showWelcome && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md text-center">
            <h2 className="text-lg font-bold mb-4">
              Welcome To Our Live Trade Section
            </h2>
            <p className="text-sm text-gray-700 mb-6">
              Kindly subscribe to our BOT service to eliminate the risk of loss.
            </p>
            <button
              onClick={() => setShowWelcome(false)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg"
            >
              Okay
            </button>
          </div>
        </div>
      )}

      {/* ✅ Confirm Trade Popup */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h2 className="text-lg font-bold mb-4 text-center">
              Confirm BOT Trade
            </h2>

            <div className="space-y-2 text-sm">
              <p><b>Asset:</b> {asset}</p>
              <p><b>Trade Type:</b> {tradeType}</p>
              <p><b>Duration:</b> {duration || "Not selected"}</p>
              <p><b>Amount:</b> ${amount}</p>
              <p><b>Stop Loss:</b> {stopLoss || "None"}</p>
              <p><b>Take Profit:</b> {takeProfit || "None"}</p>
            </div>

            <button
              onClick={() => {
                setShowConfirm(false);
                setShowStarted(true);
              }}
              className="mt-6 bg-green-600 text-white w-full py-2 rounded-lg"
            >
              OKAY, CONFIRM BOT TRADE
            </button>
          </div>
        </div>
      )}

      {/* ✅ Bot Started Popup */}
      {showStarted && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md text-center">
            <h2 className="text-xl font-bold mb-4 text-green-600">
              Bot Trading Started 🚀
            </h2>
            <p className="text-sm text-gray-700 mb-6">
              Good luck! Stay tuned while our BOT executes your trade.
            </p>
            <button
              onClick={() => setShowStarted(false)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* ================= MAIN PAGE ================= */}
      <div className="p-6 space-y-6">
        <TradesNav asset={asset} setAsset={setAsset} />

        <h1 className="text-2xl font-bold">Live Trade Dashboard</h1>

        <div className="bg-green-600 text-white p-2 rounded">
          Buy Exclusive Trading BOT $500 For 2 Years, Estimated BOT Earnings
          0.3% / 0.6% Daily
        </div>

        <div className="w-full h-[400px] border rounded overflow-hidden">
          <iframe
            src={`https://s.tradingview.com/widgetembed/?symbol=${asset}&interval=D&hidesidetoolbar=1`}
            className="w-full h-full"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-64 bg-white border rounded p-2">
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

          <div className="h-64 bg-white border rounded p-2">
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

          <input
            className="border rounded w-full p-2"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Input Amount to Trade"
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              className="border rounded p-2"
              placeholder="Stop Loss"
              value={stopLoss}
              onChange={(e) => setStopLoss(e.target.value)}
            />
            <input
              className="border rounded p-2"
              placeholder="Take Profit"
              value={takeProfit}
              onChange={(e) => setTakeProfit(e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => handleTradeClick("BUY / LONG")}
            className="bg-green-600 text-white w-full py-3 rounded"
          >
            BUY / LONG
          </button>
          <button
            onClick={() => handleTradeClick("SELL / SHORT")}
            className="bg-red-600 text-white w-full py-3 rounded"
          >
            SELL / SHORT
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}



