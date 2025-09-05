"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

// ================= CURRENCY TICKER ===================
const pairs = [
  { symbol: "EUR/USD", price: 1.0923 },
  { symbol: "GBP/USD", price: 1.2718 },
  { symbol: "USD/JPY", price: 147.65 },
  { symbol: "USD/CHF", price: 0.8891 },
  { symbol: "AUD/USD", price: 0.6574 },
  { symbol: "BTC/USD", price: 43750 },
  { symbol: "ETH/USD", price: 2320 },
  { symbol: "XRP/USD", price: 0.62 },
  { symbol: "TSLA", price: 245.13 },
  { symbol: "AAPL", price: 193.74 },
  { symbol: "AMZN", price: 168.33 },
  { symbol: "MSFT", price: 314.56 },
  { symbol: "META", price: 292.14 },
]

function CurrencyTicker() {
  const [prices, setPrices] = useState(
    pairs.map(p => ({ ...p, direction: "neutral" as "up" | "down" | "neutral" }))
  )

  useEffect(() => {
    const interval = setInterval(() => {
      setPrices(prev =>
        prev.map(p => {
          const change = (Math.random() - 0.5) * (p.price * 0.001)
          const newPrice = +(p.price + change).toFixed(4)
          return {
            ...p,
            price: newPrice,
            direction: change > 0 ? "up" : "down",
          }
        })
      )
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-black text-white py-2 overflow-hidden">
      <motion.div
        className="whitespace-nowrap flex space-x-10 text-sm"
        animate={{ x: ["0%", "-100%"] }}
        transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
      >
        {prices.map((p, i) => (
          <span
            key={i}
            className={`transition-colors ${
              p.direction === "up"
                ? "text-green-400"
                : p.direction === "down"
                ? "text-red-400"
                : "text-gray-300"
            }`}
          >
            {p.symbol}: {p.price}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

// ================= MAIN PAGE ===================
export default function AboutPage() {
  return (
    <main className="bg-[#0d1b2a] text-white overflow-hidden relative">
      {/* BACKGROUND GRADIENT EFFECTS */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-[40rem] h-[40rem] bg-red-600/30 rounded-full blur-[180px] animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-[30rem] h-[30rem] bg-blue-600/30 rounded-full blur-[150px] animate-pulse"></div>
      </div>

      {/* NAVBAR */}
      <nav className="bg-[#0d1b2a]/80 backdrop-blur-md px-6 py-4 border-b border-gray-700 flex justify-between items-center sticky top-0 z-50">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-bold text-xl text-red-500"
        >
          VentureWise
        </motion.div>
        <ul className="flex space-x-6 text-gray-300 font-medium">
          {["Home", "About", "FAQ", "Contact", "Log in"].map((item, i) => (
            <motion.li
              key={i}
              whileHover={{ scale: 1.1, color: "#fff" }}
              className="cursor-pointer"
            >
              <Link href={`/${item.toLowerCase().replace(" ", "")}`}>{item}</Link>
            </motion.li>
          ))}
          <li>
            <Link
              href="/signup"
              className="bg-red-600 px-4 py-2 rounded shadow hover:bg-red-700 transition"
            >
              Sign up
            </Link>
          </li>
        </ul>
      </nav>

      {/* CURRENCY TICKER */}
      <CurrencyTicker />

      {/* Risk Disclaimer */}
      <div className="bg-gray-900 text-center text-gray-400 text-xs py-2 px-4">
        Trading involves substantial risk and may result in the loss of your invested/greater than your invested capital, respectively.
      </div>

      {/* HERO SECTION */}
      <section className="text-center py-20 relative">
        <motion.h1
          className="text-5xl font-extrabold bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Putting our clients first since 2016
        </motion.h1>
        <motion.p
          className="mt-6 text-lg text-gray-300 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          For more than 5 years, we’ve been empowering clients by helping them take control of their financial lives.
        </motion.p>
      </section>

      {/* TRUST THE PROFESSIONALS */}
      <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold mb-4">Trust the Professionals</h2>
          <p className="text-gray-300">
            We are a group of passionate, independent thinkers who never stop exploring new ways to improve trading for the self-directed investor.
          </p>
        </motion.div>
        <motion.div
          className="grid sm:grid-cols-2 gap-6"
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {[
            { role: "CHIEF EXECUTIVE OFFICER", name: "Luke Desmaris", desc: "Trader for 5 years with multiple strategies.", img: "/team/luke.jpg" },
            { role: "ASSISTANT MANAGER", name: "Jarvis Walsh", desc: "Proactive, master in financial markets.", img: "/team/jarvis.jpg" },
            { role: "ASSISTANT MANAGER", name: "Javier Hyson", desc: "Provides weekly market insights.", img: "/team/javier.jpg" },
          ].map((person, idx) => (
            <motion.div
              key={idx}
              className="bg-gray-800 p-4 rounded-lg shadow-lg hover:shadow-red-500/30 transition"
              whileHover={{ scale: 1.05 }}
            >
              <Image src={person.img} alt={person.name} width={400} height={400} className="h-32 w-full object-cover rounded mb-3" />
              <h4 className="font-bold text-red-500">{person.role}</h4>
              <p className="text-white font-medium">{person.name}</p>
              <p className="text-sm text-gray-400">{person.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* NUMBERS SPEAK */}
      <section className="bg-[#1b263b] py-20 text-center">
        <motion.h2
          className="text-3xl font-bold"
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
        >
          Number speaks
        </motion.h2>
        <p className="text-gray-300 mt-2">We are always ready for a challenge.</p>
        <motion.p
          className="text-red-500 mt-6 text-6xl font-extrabold"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          50+
        </motion.p>
        <p className="text-gray-300">Trading instruments</p>
      </section>

      {/* RELATIONSHIP */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl font-bold">A relationship on your terms</h2>
        <p className="text-gray-400 max-w-3xl mx-auto mt-4">
          Work with us the way you want. Whether you invest on your own, with an advisor, or a mix of both — we support you.
        </p>
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {[
            { title: "Investing", desc: "Wide selection of investment products to build your portfolio." },
            { title: "Trading", desc: "Powerful tools, insights, and dedicated support." },
            { title: "Wealth Management", desc: "Dedicated consultant to reach your specific goals." },
            { title: "Investment Advisory", desc: "Diverse strategies from seasoned portfolio managers." },
            { title: "Smart Portfolio", desc: "Fully automated investment advisory services." },
            { title: "Mutual Fund Advisor", desc: "Specialized guidance for high-net-worth investors." },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              className="bg-gray-800 p-6 rounded-lg shadow hover:shadow-blue-500/30 transition text-left"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-xl font-bold text-red-500">{item.title}</h3>
              <p className="text-gray-300 text-sm mt-2">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0d1b2a] text-gray-400 py-10 mt-10">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-10">
          <div>
            <h4 className="text-white font-bold mb-4">Regulations</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#">Legal documents</Link></li>
              <li><Link href="#">Privacy</Link></li>
              <li><Link href="#">Careers</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Policies</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#">Terms of Service</Link></li>
              <li><Link href="#">License Agreement</Link></li>
              <li><Link href="#">Security</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Trading Academy</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#">Beginner Course</Link></li>
              <li><Link href="#">Stocks & CFDs</Link></li>
              <li><Link href="#">Trading Tools</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Contact</h4>
            <p className="text-sm">4229 Ringford Dr,<br />Saint Louis, Missouri 63129<br />United States</p>
          </div>
        </div>
        <div className="text-center text-xs text-gray-500 mt-10">
          © {new Date().getFullYear()} VentureWise Brokers. All rights reserved.
        </div>
      </footer>
    </main>
  )
}

