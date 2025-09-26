"use client";

import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import GoogleTranslate from "@/components/GoogleTranslate";

const plans = [
  {
    name: "Starter BOT",
    price: "$1000 / mo",
    roi: "8.3% ROI",
    duration: "1 Week",
    features: ["AI Bot Trading", "Standard Support", "Basic Analytics"],
    href: "/payment?plan=basic",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    name: " Bronze BOT ",
    price: "$3000 / mo",
    roi: "14% ROI",
    duration: "1 Month",
    features: [
      "Advanced AI Bot",
      "Priority Support",
      "Advanced Analytics",
      "Custom Strategies",
    ],
    href: "/payment?plan=pro",
    gradient: "from-purple-600 to-pink-600",
  },
  {
    name: "Silver BOT",
    price: "$5000 / mo",
    roi: "21.5% ROI",
    duration: "2 Months",
    features: [
      "All Pro Features",
      "Dedicated Manager",
      "Unlimited Strategies",
      "VIP Support",
    ],
    href: "/payment?plan=enterprise",
    gradient: "from-green-600 to-emerald-600",
  },
];

export default function UpgradePage() {
  return (
    <DashboardLayout>
      <div className="p-8 space-y-10">
        {/* Header */}
        <motion.div
          className="text-center space-y-3"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent drop-shadow-lg">
            🚀 Upgrade Your Plan
          </h1>
          <p className="text-gray-600 text-lg">
            Choose the perfect plan for your trading journey and maximize your ROI.
          </p>
        </motion.div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6, type: "spring" }}
              whileHover={{ scale: 1.05, rotate: 1 }}
              whileTap={{ scale: 0.98 }}
              className={`bg-gradient-to-br ${plan.gradient} p-[2px] rounded-2xl shadow-xl hover:shadow-2xl transition`}
            >
              <Card className="h-full rounded-2xl bg-white/90 backdrop-blur-lg">
                <CardHeader className="text-center space-y-2">
                  <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
                  <p className="text-2xl font-extrabold text-gray-900">
                    {plan.price}
                  </p>
                  <p className="text-green-600 font-semibold">{plan.roi}</p>
                  <p className="text-sm text-gray-500">{plan.duration}</p>
                </CardHeader>
                <CardContent className="flex flex-col justify-between h-full">
                  <ul className="space-y-2 text-gray-700 mb-6">
                    {plan.features.map((feature, i) => (
                      <motion.li
                        key={i}
                        className="flex items-center gap-2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + i * 0.1 }}
                      >
                        ✅ {feature}
                      </motion.li>
                    ))}
                  </ul>
                  <Link href={plan.href}>
                    <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold shadow-md">
                      Upgrade to {plan.name}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Floating Glow Effect */}
        <motion.div
          className="fixed bottom-10 right-10 w-40 h-40 bg-purple-500/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
          }}
        />
      </div>
    </DashboardLayout>
  );
}

