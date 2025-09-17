"use client";
import { useEffect, useState } from "react";

export default function MarketTicker() {
  const [pairs, setPairs] = useState([
    { name: "EUR/USD", bid: 1.0651, ask: 1.0877 },
    { name: "GBP/USD", bid: 1.2471, ask: 1.29 },
    { name: "USD/JPY", bid: 146.7843, ask: 146.8506 },
    { name: "USD/CHF", bid: 0.8857, ask: 0.8745 },
    { name: "AUD/USD", bid: 0.6812, ask: 0.6763 },
    { name: "NZD/USD", bid: 0.6083, ask: 0.5855 },
    { name: "USD/CAD", bid: 1.3555, ask: 1.3243 },
    { name: "BTC/USD", bid: 10220.12, ask: 10320.54 },
    { name: "ETH/USD", bid: 3520.25, ask: 3525.74 },
    { name: "XAU/USD", bid: 1985.56, ask: 1986.11 },
    { name: "XAG/USD", bid: 24.33, ask: 24.41 },
  ]);

  // fake updates every 5s (you can hook this to a real API later)
  useEffect(() => {
    const interval = setInterval(() => {
      setPairs((prev) =>
        prev.map((p) => ({
          ...p,
          bid: +(p.bid + (Math.random() - 0.5) * 0.01).toFixed(4),
          ask: +(p.ask + (Math.random() - 0.5) * 0.01).toFixed(4),
        }))
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-900 text-white overflow-hidden whitespace-nowrap w-full shadow-md">
      <div className="animate-marquee inline-block min-w-full py-2">
        {pairs.map((p, idx) => (
          <span key={idx} className="mx-6">
            <strong>{p.name}</strong>{" "}
            <span className="text-green-400">Bid {p.bid}</span>{" "}
            <span className="text-red-400">Ask {p.ask}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

