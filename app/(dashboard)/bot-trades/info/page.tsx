"use client";

import { CreditCard, Zap, CheckCircle } from "lucide-react";
import Link from "next/link";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import GoogleTranslate from "@/components/GoogleTranslate";

export default function BotInfoPage() {
  return (
    <DashboardLayout>
      <div className="p-6 space-y-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-xl shadow-lg">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Zap className="text-yellow-300" /> AI Trading BOT
          </h1>
          <p className="mt-2 text-sm opacity-90">
            Discover how our automated BOT works and unlock premium features.
          </p>
        </div>

        {/* How it works */}
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">⚙️ How the BOT Works</h2>
          <ul className="space-y-3 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <CheckCircle className="text-green-500 mt-1" size={18} />
              Our BOT uses AI-driven algorithms to analyze market data in
              real-time.
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="text-green-500 mt-1" size={18} />
              Executes trades automatically on your behalf 24/7.
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="text-green-500 mt-1" size={18} />
              Optimizes risk management and maximizes profits.
            </li>
          </ul>
        </div>

        {/* Payment Plans */}
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">💳 Activate BOT</h2>
          <p className="text-sm text-gray-600 mb-4">
            Choose a subscription plan to start using the BOT.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Plan 1 */}
            <div className="border rounded-xl p-6 shadow hover:shadow-md transition">
              <h3 className="text-xl font-semibold">Basic Plan</h3>
              <p className="text-gray-500">Ideal for beginners</p>
              <p className="text-2xl font-bold mt-4">
                $29 <span className="text-sm">/month</span>
              </p>
              <ul className="mt-4 text-sm text-gray-600 space-y-2">
                <li>✅ AI-powered trading</li>
                <li>✅ Supports major currency pairs</li>
                <li>✅ 24/7 auto trading</li>
              </ul>
              <Link
                href="/payment?plan=basic"
                className="mt-6 block w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg text-center flex items-center justify-center gap-2"
              >
                <CreditCard size={18} /> Subscribe
              </Link>
            </div>

            {/* Plan 2 */}
            <div className="border rounded-xl p-6 shadow hover:shadow-md transition">
              <h3 className="text-xl font-semibold">Pro Plan</h3>
              <p className="text-gray-500">For advanced traders</p>
              <p className="text-2xl font-bold mt-4">
                $79 <span className="text-sm">/month</span>
              </p>
              <ul className="mt-4 text-sm text-gray-600 space-y-2">
                <li>✅ All Basic features</li>
                <li>✅ Advanced strategy control</li>
                <li>✅ Priority support</li>
              </ul>
              <Link
                href="/payment?plan=pro"
                className="mt-6 block w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg text-center flex items-center justify-center gap-2"
              >
                <CreditCard size={18} /> Subscribe
              </Link>
            </div>
          </div>
        </div>

        {/* Back Link */}
        <Link
          href="/bot"
          className="inline-block mt-6 text-sm text-indigo-600 hover:underline"
        >
          ← Back to BOT
        </Link>
      </div>
    </DashboardLayout>
  );
}
