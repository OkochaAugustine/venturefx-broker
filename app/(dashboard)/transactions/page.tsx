"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const activities = [
  // 🇩🇪 German (70%)
  { id: 1, user: "Anna", type: "deposit", amount: "3,200$", wallet: "ID(6739204...)", status: "Deposit Successful" },
  { id: 2, user: "Lukas", type: "withdrawal", amount: "1,500$", wallet: "ID(2239012...)", status: "Withdrawal Successful" },
  { id: 3, user: "Mia", type: "deposit", amount: "5,800$", wallet: "ID(9982102...)", status: "Deposit Successful" },
  { id: 4, user: "Leon", type: "withdrawal", amount: "2,300$", wallet: "ID(8812390...)", status: "Withdrawal Successful" },
  { id: 5, user: "Sophie", type: "deposit", amount: "7,200$", wallet: "ID(4402390...)", status: "Deposit Successful" },
  { id: 6, user: "Maximilian", type: "withdrawal", amount: "1,900$", wallet: "ID(6620034...)", status: "Withdrawal Successful" },
  { id: 7, user: "Hannah", type: "deposit", amount: "4,500$", wallet: "ID(1103920...)", status: "Deposit Successful" },
  { id: 8, user: "Julian", type: "deposit", amount: "2,700$", wallet: "ID(9921204...)", status: "Deposit Successful" },
  { id: 9, user: "Laura", type: "withdrawal", amount: "3,600$", wallet: "ID(3321021...)", status: "Withdrawal Successful" },
  { id: 10, user: "Felix", type: "deposit", amount: "1,950$", wallet: "ID(8822201...)", status: "Deposit Successful" },
  { id: 11, user: "Charlotte", type: "deposit", amount: "6,700$", wallet: "ID(7729033...)", status: "Deposit Successful" },
  { id: 12, user: "Jonas", type: "withdrawal", amount: "2,800$", wallet: "ID(1192844...)", status: "Withdrawal Successful" },
  { id: 13, user: "Clara", type: "deposit", amount: "1,900$", wallet: "ID(5520031...)", status: "Deposit Successful" },
  { id: 14, user: "Nina", type: "withdrawal", amount: "1,300$", wallet: "ID(7722110...)", status: "Withdrawal Successful" },
  { id: 15, user: "Tobias", type: "deposit", amount: "5,000$", wallet: "ID(6621192...)", status: "Deposit Successful" },
  { id: 16, user: "Emilia", type: "deposit", amount: "8,400$", wallet: "ID(4422210...)", status: "Deposit Successful" },
  { id: 17, user: "Florian", type: "withdrawal", amount: "2,200$", wallet: "ID(3321980...)", status: "Withdrawal Successful" },
  { id: 18, user: "Katharina", type: "deposit", amount: "4,300$", wallet: "ID(2203902...)", status: "Deposit Successful" },
  { id: 19, user: "Sebastian", type: "withdrawal", amount: "3,100$", wallet: "ID(4482210...)", status: "Withdrawal Successful" },
  { id: 20, user: "Lea", type: "deposit", amount: "2,700$", wallet: "ID(5529083...)", status: "Deposit Successful" },

  // 🇺🇸 American (30%)
  { id: 21, user: "John", type: "deposit", amount: "4,000$", wallet: "ID(9845123...)", status: "Deposit Successful" },
  { id: 22, user: "Emily", type: "withdrawal", amount: "1,200$", wallet: "ID(1273992...)", status: "Withdrawal Successful" },
  { id: 23, user: "Michael", type: "deposit", amount: "2,500$", wallet: "ID(5739201...)", status: "Deposit Successful" },
  { id: 24, user: "David", type: "deposit", amount: "1,800$", wallet: "ID(3342902...)", status: "Deposit Successful" },
  { id: 25, user: "Sophia", type: "deposit", amount: "5,600$", wallet: "ID(8842209...)", status: "Deposit Successful" },
  { id: 26, user: "William", type: "withdrawal", amount: "700$", wallet: "ID(5521023...)", status: "Withdrawal Successful" },
  { id: 27, user: "Isabella", type: "deposit", amount: "7,200$", wallet: "ID(1182309...)", status: "Deposit Successful" },
  { id: 28, user: "Robert", type: "withdrawal", amount: "4,600$", wallet: "ID(2294011...)", status: "Withdrawal Successful" },
  { id: 29, user: "Benjamin", type: "deposit", amount: "1,450$", wallet: "ID(7729103...)", status: "Deposit Successful" },
  { id: 30, user: "Olivia", type: "withdrawal", amount: "4,300$", wallet: "ID(3392201...)", status: "Withdrawal Successful" },
];

export default function TransactionPage() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % activities.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-extrabold mb-8 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent"
      >
        Transactions
      </motion.h1>

      {/* No transactions message */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="text-lg text-gray-300 mb-12"
      >
        No transactions yet.
      </motion.p>

      {/* Recent Activity Ticker */}
      <div className="relative h-20 w-full max-w-3xl overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activities[current].id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 flex items-center justify-center text-lg font-medium"
          >
            <span className="px-4 py-2 rounded-xl bg-white/10 shadow-lg backdrop-blur-lg">
              <span className="font-bold text-green-400">{activities[current].user}</span>{" "}
              ({activities[current].wallet}) →{" "}
              <span
                className={`${
                  activities[current].type === "deposit" ? "text-green-400" : "text-red-400"
                } font-semibold`}
              >
                {activities[current].status} {activities[current].amount}
              </span>
            </span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}


