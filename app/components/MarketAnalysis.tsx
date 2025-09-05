"use client";

import Link from "next/link";

export default function MarketAnalysis() {
  return (
    <section className="bg-[#0d223f] text-white py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Heading + Video */}
        <div className="grid md:grid-cols-2 gap-10 items-center mb-12">
          <div>
            <h2 className="text-2xl font-bold mb-4">
              Market analysis and trade inspiration
            </h2>
            <p className="text-gray-300">
              With a strong network of experts, tailored content and our platform open
              doors to many opportunities. Focused market insights give you the best
              signals in the industry. You’ll have extensive connections to professional
              traders.
            </p>
          </div>
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              className="w-full h-64 md:h-80 rounded-lg"
              src="https://www.youtube.com/embed/5o3fMLPY7qY"
              title="Forex Basics"
              allowFullScreen
            />
          </div>
        </div>

        {/* Features row */}
        <div className="grid md:grid-cols-5 text-center gap-6 mb-12 text-sm">
          <div>Wide Range of Trading Instruments</div>
          <div>Unparalleled Trading Conditions</div>
          <div>Globally Licensed & Regulated</div>
          <div>Committed to Forex Education</div>
          <div>Regular Contests & Promotions</div>
        </div>

        {/* 3 Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="border border-red-600 rounded-lg p-6 bg-[#0f274d]">
            <h3 className="text-lg font-semibold mb-3">Learn</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>✔ Free Demo Account</li>
              <li>✔ Step by step tutorial sections</li>
              <li>✔ Dedicated Account Manager</li>
              <li>✔ Your own Account Manager</li>
            </ul>
            <Link
              href="/register"
              className="mt-4 block bg-red-600 px-4 py-2 rounded text-white text-center hover:bg-red-700 transition"
            >
              Open Account
            </Link>
          </div>

          <div className="border border-red-600 rounded-lg p-6 bg-[#0f274d]">
            <h3 className="text-lg font-semibold mb-3">Trade</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>✔ Tight spreads</li>
              <li>✔ Super-fast execution</li>
              <li>✔ No requotes, no rejections</li>
              <li>✔ Ultimate transparency</li>
            </ul>
            <Link
              href="/register"
              className="mt-4 block bg-red-600 px-4 py-2 rounded text-white text-center hover:bg-red-700 transition"
            >
              Open Account
            </Link>
          </div>

          <div className="border border-red-600 rounded-lg p-6 bg-[#0f274d]">
            <h3 className="text-lg font-semibold mb-3">Invest</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>✔ Hassle-free management</li>
              <li>✔ Expert account managers</li>
              <li>✔ Part control of your investment security</li>
            </ul>
            <Link
              href="/register"
              className="mt-4 block bg-red-600 px-4 py-2 rounded text-white text-center hover:bg-red-700 transition"
            >
              Start Investing
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

