"use client";

import Link from "next/link";

const packages = [
  {
    name: "STARTER ACCOUNT",
    features: ["Spread from 1:20", "Leverage 1:200", "Live Chat Support", "24/7 Assistance", "Personal Account Manager"],
  },
  {
    name: "BRONZE ACCOUNT",
    features: ["Spread from 1:20", "Leverage 1:300", "Live Chat Support", "24/7 Assistance", "Personal Account Manager"],
  },
  {
    name: "SILVER ACCOUNT",
    features: ["Spread from 1:20", "Leverage 1:400", "Live Chat Support", "24/7 Assistance", "Personal Account Manager"],
  },
  {
    name: "PLATINUM ACCOUNT",
    features: ["Spread from 1:20", "Leverage 1:500", "Live Chat Support", "24/7 Assistance", "Personal Account Manager"],
  },
];

export default function Packages() {
  return (
    <section className="bg-[#0d1b2a] text-white py-20 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">Our Packages</h2>

        <div className="grid md:grid-cols-4 gap-8">
          {packages.map((pkg, i) => (
            <div
              key={i}
              className="border border-red-600 rounded-lg p-6 shadow-lg hover:scale-105 transition"
            >
              <h3 className="text-xl font-bold mb-4">{pkg.name}</h3>
              <ul className="space-y-2 mb-6">
                {pkg.features.map((f, j) => (
                  <li key={j} className="text-sm opacity-80">
                    ✔ {f}
                  </li>
                ))}
              </ul>

              {/* ✅ Open Account Button linking to register */}
              <Link
                href="/register"
                className="block bg-red-600 px-6 py-2 rounded-md font-semibold hover:bg-red-700 transition"
              >
                Open Account
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
