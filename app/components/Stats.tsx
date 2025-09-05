"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Stats() {
  const router = useRouter();
  const [loadingStep, setLoadingStep] = useState<"idle" | "creating" | "success">("idle");

  const handleCreateAccount = (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingStep("creating");

    // Step 1: Creating Account
    setTimeout(() => {
      setLoadingStep("success");

      // Step 2: Success, then redirect
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000); // show success message for 2s
    }, 2000); // show creating for 2s
  };

  return (
    <section className="bg-[#0d1b2a] text-white py-16 px-6 relative">
      {/* ✅ Loading Overlay */}
      {loadingStep !== "idle" && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
          <div className="text-center animate-fade-in">
            {loadingStep === "creating" && (
              <>
                <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
                <h2 className="text-2xl font-bold">Creating your account...</h2>
                <p className="opacity-70 mt-2">Please wait a moment</p>
              </>
            )}

            {loadingStep === "success" && (
              <>
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                  ✅
                </div>
                <h2 className="text-2xl font-bold text-green-400">
                  Congratulations!
                </h2>
                <p className="opacity-80 mt-2">Account created successfully 🎉</p>
              </>
            )}
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Left Side */}
        <div>
          <h2 className="text-2xl font-bold mb-4">
            <span className="text-red-500">$4.95</span> online stocks, currencies & commodities trades
          </h2>
          <p className="text-sm opacity-80 mb-6">
            Trade thousands of instruments (Forex, Stocks, Commodities, Indices & Crypto)
            with ultra-tight spreads & lightning-fast execution.
          </p>
          <a
            href="/login"
            className="bg-red-600 px-6 py-3 rounded-md font-semibold hover:bg-red-700 transition"
          >
            Learn More
          </a>
        </div>

        {/* Right Side: Signup Form */}
        <div className="bg-[#1b263b] p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4">New to investing? Start here.</h3>
          <form className="space-y-3" onSubmit={handleCreateAccount}>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-4 py-2 rounded bg-[#0d1b2a] border border-gray-600 focus:outline-none"
              required
            />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full px-4 py-2 rounded bg-[#0d1b2a] border border-gray-600 focus:outline-none"
              required
            />
            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full px-4 py-2 rounded bg-[#0d1b2a] border border-gray-600 focus:outline-none"
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 rounded bg-[#0d1b2a] border border-gray-600 focus:outline-none"
              required
            />
            <button
              type="submit"
              className="w-full bg-red-600 py-2 rounded-md font-semibold hover:bg-red-700 transition"
            >
              Create Account
            </button>
          </form>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 text-center mt-16">
        <div className="bg-[#1b263b] p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-bold text-red-500">&lt; 7.12 ms</h3>
          <p className="text-sm opacity-80">Order Execution Speed</p>
        </div>
        <div className="bg-[#1b263b] p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-bold text-red-500">12+</h3>
          <p className="text-sm opacity-80">Liquidity Providers</p>
        </div>
        <div className="bg-[#1b263b] p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-bold text-red-500">&gt; 12,000</h3>
          <p className="text-sm opacity-80">Instruments Traded</p>
        </div>
      </div>

      {/* Countries */}
      <div className="bg-gradient-to-r from-red-700 to-black text-center py-10 mt-16">
        <h2 className="text-3xl font-bold">Supporting Traders from over 48 Countries</h2>
        <div className="flex justify-center gap-12 mt-6">
          <div>
            <h3 className="text-2xl font-bold">$76B+</h3>
            <p className="text-sm opacity-80">Daily Volume</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold">1.6M+</h3>
            <p className="text-sm opacity-80">Active Traders</p>
          </div>
        </div>
      </div>

      {/* Market Analysis */}
      <div className="max-w-5xl mx-auto text-center mt-16">
        <h2 className="text-3xl font-bold mb-4">In-Depth Daily Market Analysis</h2>
        <p className="text-sm opacity-80 mb-6">
          Get timely news & analysis from top financial experts to help customers
          make informed trading & investing decisions.
        </p>
        <div className="flex justify-center gap-10">
          <div>
            <h3 className="text-xl font-semibold text-red-500">24/7</h3>
            <p className="text-sm opacity-80">Market Coverage</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-red-500">Expert Insights</h3>
            <p className="text-sm opacity-80">Delivered Daily</p>
          </div>
        </div>
      </div>
    </section>
  );
}
