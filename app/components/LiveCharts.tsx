"use client"
import { useEffect } from "react"

export default function LiveCharts() {
  useEffect(() => {
    // Load TradingView script dynamically
    const script = document.createElement("script")
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js"
    script.async = true
    script.innerHTML = JSON.stringify({
      colorTheme: "dark",
      dateRange: "12M",
      showChart: true,
      locale: "en",
      width: "100%",
      height: "600",
      largeChartUrl: "",
      isTransparent: false,
      showSymbolLogo: true,
      showFloatingTooltip: true,
      tabs: [
        {
          title: "Forex",
          symbols: [
            { s: "FX:EURUSD" },
            { s: "FX:GBPUSD" },
            { s: "FX:USDJPY" },
            { s: "FX:AUDUSD" },
          ],
        },
        {
          title: "Crypto",
          symbols: [
            { s: "BINANCE:BTCUSDT" },
            { s: "BINANCE:ETHUSDT" },
            { s: "BINANCE:XRPUSDT" },
            { s: "BINANCE:BNBUSDT" },
          ],
        },
        {
          title: "Stocks",
          symbols: [
            { s: "NASDAQ:AAPL" },
            { s: "NASDAQ:TSLA" },
            { s: "NASDAQ:MSFT" },
            { s: "NASDAQ:AMZN" },
          ],
        },
      ],
    })

    document.getElementById("tradingview-widget")?.appendChild(script)
  }, [])

  return (
    <section className="bg-[#0d1b2a] text-white py-16 px-4">
      <h2 className="text-3xl font-bold text-center mb-8">📈 Live Market Charts</h2>
      <div
        id="tradingview-widget"
        className="tradingview-widget-container w-full"
      >
        <div className="tradingview-widget-container__widget"></div>
      </div>
    </section>
  )
}
