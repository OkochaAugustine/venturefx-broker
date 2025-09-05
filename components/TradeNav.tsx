"use client";

import { useState, useEffect } from "react";

export interface Pair {
  symbol: string;
  name: string;
  bid: number;
  ask: number;
}

const initialPairs: Pair[] = [
  { symbol: "BTCUSD", name: "BTC/USD", bid: 43000, ask: 43010 },
  { symbol: "ETHUSD", name: "ETH/USD", bid: 3200, ask: 3205 },
  { symbol: "XRPUSD", name: "XRP/USD", bid: 0.56, ask: 0.57 },
  { symbol: "EURUSD", name: "EUR/USD", bid: 1.09, ask: 1.091 },
  { symbol: "GBPUSD", name: "GBP/USD", bid: 1.27, ask: 1.271 },
  { symbol: "USDJPY", name: "USD/JPY", bid: 147.5, ask: 147.55 },
  { symbol: "AUDUSD", name: "AUD/USD", bid: 0.67, ask: 0.671 },
  { symbol: "XAUUSD", name: "GOLD", bid: 1985, ask: 1987 },
  { symbol: "USDCAD", name: "USD/CAD", bid: 1.34, ask: 1.341 },
  
];

export default function TradesNav({
  asset,
  setAsset,
}: {
  asset: string;
  setAsset: (s: string) => void;
}) {
  const [pairs, setPairs] = useState<Pair[]>(initialPairs);

  // 🔥 Simulate live price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setPairs((prev) =>
        prev.map((p) => {
          const change = (Math.random() - 0.5) * (p.bid * 0.001); // ±0.1%
          const newBid = +(p.bid + change).toFixed(4);
          const newAsk = +(newBid + Math.random() * 0.01).toFixed(4);
          return { ...p, bid: newBid, ask: newAsk };
        })
      );
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-wrap gap-3 border-b pb-3">
      {pairs.map((p) => (
        <button
          key={p.symbol}
          onClick={() => setAsset(p.symbol)}
          className={`px-4 py-2 rounded shadow ${
            asset === p.symbol ? "bg-blue-600 text-white" : "bg-gray-100"
          }`}
        >
          <div className="font-semibold">{p.name}</div>
          <div className="text-xs">
            <span className="text-green-600 mr-2">Bid: {p.bid}</span>
            <span className="text-red-600">Ask: {p.ask}</span>
          </div>
        </button>
      ))}
    </div>
  );
}

