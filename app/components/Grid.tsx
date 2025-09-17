"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

// Define Pair type
export type Pair = {
  symbol: string;
  bid: number;
  ask: number;
};

// Props for Grid
type GridProps = {
  data?: Pair[]; // optional, if you want to pass ticker data from parent
};

// Default initial pairs
const initialPairs: Pair[] = [
  { symbol: "EUR/USD", bid: 1.0832, ask: 1.0836 },
  { symbol: "GBP/USD", bid: 1.2724, ask: 1.2729 },
  { symbol: "USD/JPY", bid: 146.82, ask: 146.86 },
  { symbol: "AUD/USD", bid: 0.6541, ask: 0.6545 },
  { symbol: "USD/CAD", bid: 1.3488, ask: 1.3492 },
  { symbol: "USD/CHF", bid: 0.8902, ask: 0.8906 },
  { symbol: "NZD/USD", bid: 0.6035, ask: 0.6039 },

  // Crypto pairs
  { symbol: "BTC/USD", bid: 10220.11, ask: 10230.55 },
  { symbol: "ETH/USD", bid: 1880.23, ask: 1885.67 },
  { symbol: "LTC/USD", bid: 210.45, ask: 211.12 },
  { symbol: "XRP/USD", bid: 0.524, ask: 0.526 },
  { symbol: "BNB/USD", bid: 312.78, ask: 313.22 },
  { symbol: "SOL/USD", bid: 23.45, ask: 23.62 },
];

export default function Grid({ data }: GridProps) {
  const [pairs, setPairs] = useState<Pair[]>(data || initialPairs);

  // Live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setPairs((prev) =>
        prev.map((p) => ({
          ...p,
          bid: parseFloat((p.bid + (Math.random() - 0.5) * 0.01).toFixed(4)),
          ask: parseFloat((p.ask + (Math.random() - 0.5) * 0.01).toFixed(4)),
        }))
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Group pairs into 4 columns
  const chunkSize = Math.ceil(pairs.length / 4);
  const groupedPairs = Array.from({ length: 4 }, (_, i) =>
    pairs.slice(i * chunkSize, (i + 1) * chunkSize)
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      {groupedPairs.map((group, i) => (
        <Card key={i} className="rounded-2xl shadow-lg">
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold mb-2">Market {i + 1}</h2>
            {group.map((p) => (
              <div
                key={p.symbol}
                className="flex justify-between items-center text-sm py-1 border-b last:border-none"
              >
                <span className="font-medium">{p.symbol}</span>
                <span className="text-green-600">Bid {p.bid}</span>
                <span className="text-red-600">Ask {p.ask}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

