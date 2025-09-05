"use client";

import { useEffect, useState } from "react";

// 🔹 Export Pair type so Dashboard can import it
export type Pair = {
  symbol: string;
  bid: number;
  ask: number;
  spread: number;
};

// 🔹 Initial pairs data (11 restored)
const initialPairs: Pair[] = [
  { symbol: "EUR/NZD", bid: 1.98353, ask: 1.98361, spread: 0.8 },
  { symbol: "AUD/JPY", bid: 96.13, ask: 96.141, spread: 1.1 },
  { symbol: "USD/JPY", bid: 146.916, ask: 146.927, spread: 1.1 },
  { symbol: "GBP/CHF", bid: 1.07993, ask: 1.08004, spread: 1.1 },
  { symbol: "ETH/XAU", bid: 1.25712, ask: 1.25724, spread: 1.2 },
  { symbol: "USD/BTC", bid: 0.00000922, ask: 0.00000924, spread: 0.2 },
  { symbol: "EUR/USD", bid: 1.0832, ask: 1.0836, spread: 0.4 },
  { symbol: "GBP/USD", bid: 1.2724, ask: 1.2729, spread: 0.5 },
  { symbol: "XAU/USD", bid: 1920.5, ask: 1921.2, spread: 0.7 },
  { symbol: "BTC/USD", bid: 27000.45, ask: 27050.55, spread: 50 },
  { symbol: "US30", bid: 34567.8, ask: 34572.3, spread: 4.5 },
];

type GridProps = {
  data?: Pair[];
};

export default function Grid({ data }: GridProps) {
  const [pairs, setPairs] = useState<Pair[]>(data ?? initialPairs);

  // 🔹 Fake live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setPairs((prev) =>
        prev.map((p) => {
          const change = (Math.random() - 0.5) * 0.01;
          const newBid = parseFloat((p.bid + change).toFixed(5));
          const newAsk = parseFloat((p.ask + change).toFixed(5));
          return { ...p, bid: newBid, ask: newAsk };
        })
      );
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  // 🔹 Duplicate data for infinite marquee
  const extended = [...pairs, ...pairs];

  return (
    <div className="overflow-hidden w-full bg-blue-900 text-white py-2">
      <div className="animate-marquee whitespace-nowrap flex gap-12">
        {extended.map((p, idx) => (
          <span key={p.symbol + idx} className="text-sm font-medium">
            {p.symbol}:{" "}
            <span className="text-green-300">Bid {p.bid}</span> |{" "}
            <span className="text-red-300">Ask {p.ask}</span>
          </span>
        ))}
      </div>
    </div>
  );
}




