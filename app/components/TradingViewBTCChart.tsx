"use client";
import React, { useEffect, useRef } from "react";

const TradingViewBTCChart: React.FC = () => {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) return;

    // prevent loading the script multiple times
    if (container.current.querySelector("#tradingview-widget-script")) return;

    const script = document.createElement("script");
    script.id = "tradingview-widget-script";
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: "COINBASE:BTCUSD",
      interval: "60",
      timezone: "Etc/UTC",
      theme: "light",
      style: "1",
      locale: "en",
      enable_publishing: false,
      allow_symbol_change: true,
      hide_legend: false,
      calendar: true,
      support_host: "https://www.tradingview.com",
    });

    container.current.appendChild(script);
  }, []);

  return (
    <div className="w-full h-[500px]" ref={container}>
      {/* TradingView Widget loads here */}
    </div>
  );
};

export default TradingViewBTCChart;
