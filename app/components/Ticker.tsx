"use client"
import { useEffect, useState } from "react"

// Fake live ticker data (can connect to real API later)
const pairs = [
  { symbol: "EUR/USD", bid: 1.0832, ask: 1.0836 },
  { symbol: "GBP/USD", bid: 1.2724, ask: 1.2729 },
  { symbol: "USD/JPY", bid: 146.82, ask: 146.86 },
  { symbol: "BTC/USD", bid: 10220.11, ask: 10230.55 },
]

export default function Ticker() {
  const [ticker, setTicker] = useState(pairs)

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTicker((prev) =>
        prev.map((p) => {
          const bidNum = parseFloat(p.bid.toString())
          const askNum = parseFloat(p.ask.toString())
          return {
            ...p,
            bid: parseFloat((bidNum + (Math.random() - 0.5) * 0.01).toFixed(4)),
            ask: parseFloat((askNum + (Math.random() - 0.5) * 0.01).toFixed(4)),
          }
        })
      )
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="overflow-hidden flex-1 mx-6">
      <div className="animate-marquee whitespace-nowrap flex gap-8">
        {ticker.map((p) => (
          <span key={p.symbol} className="text-sm">
            {p.symbol}:{" "}
            <span className="text-green-300">Bid {p.bid}</span> |{" "}
            <span className="text-red-300">Ask {p.ask}</span>
          </span>
        ))}
      </div>

      {/* Marquee animation CSS */}
      <style jsx>{`
        .animate-marquee {
          display: inline-block;
          min-width: 100%;
          animation: marquee 15s linear infinite;
        }
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  )
}

