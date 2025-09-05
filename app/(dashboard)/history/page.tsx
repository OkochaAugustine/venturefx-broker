"use client";

import { useEffect, useState } from "react";
import TradeNav from "@/components/TradeNav"; // ✅ Reuse the same nav

interface Trade {
  id: number;
  pair: string;
  amount: number;
  type: "BUY" | "SELL";
  status: "Open" | "Closed";
  duration: string;
  buyRate: number;
  sellRate: number;
  entryTime: string;
}

const pairs = ["BTC/USD", "ETH/USD", "XRP/USD", "EUR/USD", "GBP/USD", "USD/JPY"];

export default function TradeHistoryPage() {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [asset, setAsset] = useState("BTCUSD"); // ✅ state for TradeNav

  // 🔥 Simulate live trades
  useEffect(() => {
    const interval = setInterval(() => {
      const newTrade: Trade = {
        id: Date.now(),
        pair: pairs[Math.floor(Math.random() * pairs.length)],
        amount: Math.floor(Math.random() * 500) + 50,
        type: Math.random() > 0.5 ? "BUY" : "SELL",
        status: Math.random() > 0.5 ? "Open" : "Closed",
        duration: ["1m", "5m", "1h", "1d"][Math.floor(Math.random() * 4)],
        buyRate: +(Math.random() * 50000 + 1000).toFixed(2),
        sellRate: +(Math.random() * 50000 + 1000).toFixed(2),
        entryTime: new Date().toLocaleTimeString(),
      };

      setTrades((prev) => [newTrade, ...prev].slice(0, 20)); // keep latest 20
    }, 4000); // every 4s

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 space-y-6">
      {/* 🔥 Same top nav from trades page */}
      <TradeNav asset={asset} setAsset={setAsset} />

      {/* Title */}
      <h1 className="text-2xl font-bold">📊 Live Trade History</h1>

      {/* History Table */}
      <div className="overflow-x-auto border rounded shadow">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Asset/Pair</th>
              <th className="p-2 border">Amount</th>
              <th className="p-2 border">Type</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Duration</th>
              <th className="p-2 border">Buy Rate</th>
              <th className="p-2 border">Sell Rate</th>
              <th className="p-2 border">Entry Time</th>
            </tr>
          </thead>
          <tbody>
            {trades.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center p-4 text-gray-500">
                  No trade history yet...
                </td>
              </tr>
            ) : (
              trades.map((trade) => (
                <tr key={trade.id} className="text-center">
                  <td className="p-2 border">{trade.pair}</td>
                  <td className="p-2 border">${trade.amount}</td>
                  <td
                    className={`p-2 border font-semibold ${
                      trade.type === "BUY" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {trade.type}
                  </td>
                  <td
                    className={`p-2 border ${
                      trade.status === "Open" ? "text-blue-600" : "text-gray-600"
                    }`}
                  >
                    {trade.status}
                  </td>
                  <td className="p-2 border">{trade.duration}</td>
                  <td className="p-2 border">${trade.buyRate}</td>
                  <td className="p-2 border">${trade.sellRate}</td>
                  <td className="p-2 border">{trade.entryTime}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
