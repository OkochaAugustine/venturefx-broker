// app/components/TradesNav.tsx
"use client";

import { Dispatch, SetStateAction } from "react";

interface TradesNavProps {
  asset: string;
  setAsset: Dispatch<SetStateAction<string>>;
}

export default function TradesNav({ asset, setAsset }: TradesNavProps) {
  return (
    <nav className="bg-gray-100 p-3 rounded-md shadow mb-4 flex gap-4 items-center">
      <span className="font-medium">Selected: {asset}</span>

      <button
        onClick={() => setAsset("BTCUSD")}
        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        BTC/USD
      </button>

      <button
        onClick={() => setAsset("ETHUSD")}
        className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
      >
        ETH/USD
      </button>

      <button
        onClick={() => setAsset("XAUUSD")}
        className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
      >
        XAU/USD
      </button>
    </nav>
  );
}

