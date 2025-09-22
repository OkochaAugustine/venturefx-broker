"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Wallet, DollarSign, Copy, CheckCircle } from "lucide-react";

export default function DepositPage() {
  const [currency, setCurrency] = useState("BTC");
  const [amount, setAmount] = useState("");
  const [copied, setCopied] = useState(false);

  // Wallet addresses (replace with your real ones)
  const walletAddresses: Record<string, string> = {
    BTC: "bc1qexamplebtcwallet1234567890",
    ETH: "0xExampleEthereumWallet1234567890",
    USDT: "TExampleUSDTWallet1234567890",
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddresses[currency]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] bg-gradient-to-br from-purple-600 via-indigo-700 to-blue-800 text-white p-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15),transparent_70%)]"></div>

      <motion.h1
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="text-2xl font-bold mb-6"
      >
        💰 Deposit Funds
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-xl w-full max-w-md flex flex-col gap-4"
      >
        {/* Currency Selection */}
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="bg-white/20 rounded-lg px-4 py-2 text-white focus:outline-none"
        >
          <option value="BTC">BTC - Bitcoin</option>
          <option value="ETH">ETH - Ethereum</option>
          <option value="USDT">USDT - Tether</option>
        </select>

        {/* Wallet Address */}
        <div className="flex items-center justify-between bg-white/20 rounded-lg p-3">
          <div className="flex items-center gap-2">
            <Wallet className="text-indigo-300" size={20} />
            <span className="truncate max-w-[200px]">
              {walletAddresses[currency]}
            </span>
          </div>
          <button
            onClick={handleCopy}
            className="p-2 hover:bg-white/20 rounded-lg transition"
          >
            {copied ? (
              <CheckCircle className="text-green-400" size={20} />
            ) : (
              <Copy size={20} />
            )}
          </button>
        </div>

        {/* Amount */}
        <div className="flex items-center gap-2 bg-white/20 rounded-lg p-2">
          <DollarSign className="text-indigo-300" size={20} />
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="w-full bg-transparent focus:outline-none text-white placeholder-gray-300"
          />
        </div>

        {/* Instruction */}
        <p className="text-sm opacity-80">
          Send exactly the amount of <strong>{currency}</strong> you entered to
          the wallet address above.
        </p>
      </motion.div>
    </div>
  );
}
