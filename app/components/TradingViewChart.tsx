"use client";
import { useEffect, useState } from "react";

const TradingViewChart = () => {
  const [symbol, setSymbol] = useState("NASDAQ:AAPL"); // ✅ Default symbol

  useEffect(() => {
    // Clear any existing widget before rendering a new one
    const container = document.getElementById("tradingview-widget");
    if (!container) return;
    container.innerHTML = "";

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";

    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: symbol,       // ✅ dynamic symbol
      interval: "60",
      timezone: "Etc/UTC",
      theme: "light",
      style: "1",
      locale: "en",
      allow_symbol_change: true,
      calendar: false,
      studies: ["BB@tv-basicstudies"],
    });

    container.appendChild(script);
  }, [symbol]);

  return (
    <div className="w-full h-[550px] rounded-2xl shadow-lg bg-white p-4 flex flex-col">
      {/* Dropdown for selecting ticker */}
      <div className="mb-4">
        <select
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          className="border rounded-lg p-2"
        >
          <option value="NASDAQ:AAPL">Apple (AAPL)</option>
          <option value="NASDAQ:TSLA">Tesla (TSLA)</option>
          <option value="NASDAQ:MSFT">Microsoft (MSFT)</option>
          <option value="NASDAQ:AMZN">Amazon (AMZN)</option>
          <option value="BINANCE:BTCUSDT">Bitcoin (BTC/USDT)</option>
          <option value="FX:EURUSD">EUR/USD</option>
        </select>
      </div>

      {/* TradingView Chart */}
      <div id="tradingview-widget" className="flex-1 w-full" />
    </div>
  );
};

export default TradingViewChart;
