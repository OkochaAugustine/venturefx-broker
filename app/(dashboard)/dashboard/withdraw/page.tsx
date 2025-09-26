"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wallet,
  DollarSign,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import DashboardLayout from "@/components/layouts/DashboardLayout";

export default function WithdrawPage() {
  const [wallet, setWallet] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("BTC");
  const [error, setError] = useState("");
  const [status, setStatus] = useState<"idle" | "pending" | "success">("idle");

  const handleWithdraw = () => {
    if (!wallet.trim() || !amount.trim()) {
      setError("⚠️ Please fill in all fields.");
      return;
    }
    if (isNaN(Number(amount)) || Number(amount) <= 0) {
      setError("❌ Invalid withdrawal amount.");
      return;
    }

    setError("");
    setStatus("pending"); // 👈 Now shows pending instead of instant success
  };

  return (
    <DashboardLayout>
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-lg">
          <div className="flex flex-col items-center justify-center min-h-[70vh] bg-gradient-to-br from-indigo-600 via-purple-700 to-pink-600 text-white p-6 rounded-2xl shadow-2xl relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15),transparent_70%)]"></div>

            <motion.h1
              initial={{ y: -40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100 }}
              className="text-2xl font-bold mb-6 relative z-10"
            >
              💸 Withdraw Funds
            </motion.h1>

            <AnimatePresence>
              {status === "idle" && (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-xl w-full flex flex-col gap-4 relative z-10"
                >
                  {/* Wallet Address */}
                  <div className="flex items-center gap-2 bg-white/20 rounded-lg p-2">
                    <Wallet className="text-indigo-300" size={20} />
                    <input
                      type="text"
                      value={wallet}
                      onChange={(e) => setWallet(e.target.value)}
                      placeholder="Enter wallet address"
                      className="w-full bg-transparent focus:outline-none text-white placeholder-gray-300"
                    />
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

                  {/* Currency Selection */}
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="bg-white/20 rounded-lg px-4 py-2 text-white focus:outline-none"
                  >
                    <option value="BTC">BTC</option>
                    <option value="ETH">ETH</option>
                    <option value="USDT">USDT</option>
                    <option value="BNB">BNB</option>
                  </select>

                  {/* Error */}
                  {error && (
                    <div className="flex items-center gap-2 text-red-300 text-sm">
                      <AlertCircle size={16} />
                      {error}
                    </div>
                  )}

                  <button
                    onClick={handleWithdraw}
                    className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition"
                  >
                    Withdraw
                  </button>
                </motion.div>
              )}

              {status === "pending" && (
                <motion.div
                  key="pending"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center bg-white/20 backdrop-blur-md p-8 rounded-2xl shadow-2xl relative z-10"
                >
                  <Loader2 className="animate-spin text-yellow-300 w-16 h-16 mb-4" />
                  <h2 className="text-xl font-bold mb-2">Withdrawal Pending ⏳</h2>
                  <p className="opacity-80 text-center mb-4">
                    Your request to withdraw{" "}
                    <span className="font-semibold">
                      {amount} {currency}
                    </span>{" "}
                    is pending.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg shadow-md transition"
                  >
                    Back
                  </button>
                </motion.div>
              )}

              {status === "success" && (
                <motion.div
                  key="success"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 120 }}
                  className="flex flex-col items-center bg-white/20 backdrop-blur-md p-8 rounded-2xl shadow-2xl relative z-10"
                >
                  <CheckCircle className="text-green-400 w-16 h-16 mb-4" />
                  <h2 className="text-xl font-bold mb-2">
                    Withdrawal Successful ✅
                  </h2>
                  <p className="opacity-80 text-center mb-4">
                    {amount} {currency} has been sent to your wallet:
                    <span className="block mt-2 text-sm text-green-200">
                      {wallet.slice(0, 6)}...{wallet.slice(-6)}
                    </span>
                  </p>
                  <button
                    onClick={() => window.location.reload()}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg shadow-md transition"
                  >
                    OK
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </DashboardLayout>
  );
}
