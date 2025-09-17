"use client";

import { useEffect, useRef, useMemo } from "react";

interface TVWidgetProps {
  symbol?: string;
  interval?: string;
  theme?: "light" | "dark";
  height?: number;
  studies?: string[];
  containerId: string; // ✅ must be fixed
}

export default function TradingViewAdvancedChart({
  symbol = "EURUSD",
  interval = "D",
  theme = "light",
  height = 600,
  studies = [],
  containerId, // must be provided
}: TVWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Memoize studies to prevent reruns
  const memoizedStudies = useMemo(() => studies, [studies.join(",")]);

  useEffect(() => {
    if (!containerRef.current) return;

    containerRef.current.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;

    script.onload = () => {
      // @ts-ignore
      new TradingView.widget({
        autosize: true,
        symbol,
        interval,
        timezone: "Etc/UTC",
        theme,
        style: "1",
        locale: "en",
        container_id: containerId,
        studies: memoizedStudies,
        toolbar_bg: "#f1f3f6",
        enable_publishing: false,
        allow_symbol_change: true,
      });
    };

    containerRef.current.appendChild(script);
  }, [symbol, interval, theme, containerId, memoizedStudies]);

  return <div id={containerId} ref={containerRef} style={{ height, width: "100%" }} />;
}

