"use client";

import { useState } from "react";
import Link from "next/link";
import { Copy } from "lucide-react";

export default function PaymentPage() {
  const [selected, setSelected] = useState<"BTC" | "ETH" | "USDT">("BTC");
  const [copied, setCopied] = useState(false);

  const wallets = {
    BTC: "bc1qexamplebtcwalletaddress123",
    ETH: "0xexampleethwalletaddress456",
    USDT: "Texampleusdtwalletaddress789",
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(wallets[selected]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold">Complete Your Payment</h1>
        <p className="mt-2 text-sm opacity-90">
          Send your subscription payment to activate the BOT.
        </p>
      </div>

      {/* Select currency */}
      <div className="bg-white p-6 rounded-xl shadow space-y-4">
        <h2 className="text-lg font-semibold">💱 Choose Payment Method</h2>
        <div className="flex gap-3">
          {(["BTC", "ETH", "USDT"] as const).map((coin) => (
            <button
              key={coin}
              onClick={() => setSelected(coin)}
              className={`px-4 py-2 rounded-lg font-medium ${
                selected === coin
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {coin}
            </button>
          ))}
        </div>
      </div>

      {/* Wallet address */}
      <div className="bg-white rounded-xl shadow p-6 text-center">
        <h2 className="text-lg font-semibold mb-4">📌 {selected} Wallet Address</h2>
        <p className="font-mono text-sm break-all bg-gray-100 p-3 rounded-lg">
          {wallets[selected]}
        </p>
        <button
          onClick={handleCopy}
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg flex items-center gap-2 mx-auto"
        >
          <Copy size={18} />
          {copied ? "Copied!" : "Copy Address"}
        </button>
      </div>

      {/* Confirmation instructions */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-semibold mb-3">✅ After Payment</h2>
        <p className="text-sm text-gray-600">
          Once you have made the payment, please wait a few minutes for confirmation.
          Your BOT subscription will be activated automatically.
        </p>
      </div>

      {/* Back link */}
      <Link
        href="/bot-trades/info"
        className="inline-block mt-6 text-sm text-green-600 hover:underline"
      >
        ← Back to Plans
      </Link>
    </div>
  );
}
