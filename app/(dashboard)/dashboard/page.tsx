"use client";

import { Card, CardContent } from "@/components/ui/card";
import Grid, { Pair } from "@/components/Grid";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  LineChart,
  History,
  Bot,
  Receipt,
  Star,
  HelpCircle,
  ShieldCheck,
  Menu,
  X,
} from "lucide-react";

import { useTranslation } from "react-i18next";

/* ---------------------- TRADINGVIEW GENERIC EMBED ---------------------- */
/** Generic TradingView widget embedder (script-based widgets).
 *  Usage:
 *   <TVWidget src="https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js" options={{ ... }} />
 */
function TVWidget({
  src,
  options,
  height = 420,
  className = "",
}: {
  src: string;
  options: Record<string, any>;
  height?: number | string;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear previous script if any rerender happens
    containerRef.current.innerHTML = `<div class="tradingview-widget-container__widget" style="height:${typeof height === "number" ? `${height}px` : height};"></div>`;

    const script = document.createElement("script");
    script.src = src;
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify(options);

    containerRef.current.appendChild(script);
  }, [src, options, height]);

  return (
    <div
      className={`tradingview-widget-container ${className}`}
      ref={containerRef}
      style={{ width: "100%", height: typeof height === "number" ? `${height}px` : height }}
    />
  );
}

/* --------------------------- TICKER COMPONENT --------------------------- */
function Ticker({ data }: { data: Pair[] }) {
  const extended = [...data, ...data];
  return (
    <div className="overflow-hidden flex-1 mx-2 sm:mx-6">
      <div className="animate-marquee whitespace-nowrap flex gap-6 sm:gap-8">
        {extended.map((p, index) => (
          <span key={p.symbol + index} className="text-xs sm:text-sm">
            {p.symbol}: <span className="text-green-300">Bid {p.bid}</span> |{" "}
            <span className="text-red-300">Ask {p.ask}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* --------------------------- SAMPLE PAIRS DATA -------------------------- */
const pairs: Pair[] = [
  { symbol: "EUR/USD", bid: 1.0832, ask: 1.0836, spread: 0.0004 },
  { symbol: "GBP/USD", bid: 1.2724, ask: 1.2729, spread: 0.0005 },
  { symbol: "USD/JPY", bid: 146.82, ask: 146.86, spread: 0.04 },
  { symbol: "USD/CHF", bid: 0.8894, ask: 0.8898, spread: 0.0004 },
  { symbol: "AUD/USD", bid: 0.6577, ask: 0.6581, spread: 0.0004 },
  { symbol: "NZD/USD", bid: 0.6092, ask: 0.6096, spread: 0.0004 },
  { symbol: "USD/CAD", bid: 1.3481, ask: 1.3486, spread: 0.0005 },
  { symbol: "BTC/USD", bid: 10220.11, ask: 10230.55, spread: 10.44 },
  { symbol: "ETH/USD", bid: 3520.25, ask: 3525.75, spread: 5.5 },
  { symbol: "XAU/USD", bid: 1985.55, ask: 1986.1, spread: 0.55 },
  { symbol: "XAG/USD", bid: 24.35, ask: 24.4, spread: 0.05 },
];

export default function DashboardPage() {
  const [ticker, setTicker] = useState<Pair[]>(pairs);
  const [traderName, setTraderName] = useState("Loading...");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { t } = useTranslation();

  // Load user name from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setTraderName(user.fullname || user.username || "Trader");
    } else {
      setTraderName("Guest");
    }
  }, []);

  // Live price updates (mock)
  useEffect(() => {
    const interval = setInterval(() => {
      setTicker((prev) =>
        prev.map((p) => {
          const newBid = parseFloat((p.bid + (Math.random() - 0.5) * 0.01).toFixed(4));
          const newAsk = parseFloat((p.ask + (Math.random() - 0.5) * 0.01).toFixed(4));
          return {
            ...p,
            bid: newBid,
            ask: newAsk,
            spread: parseFloat((newAsk - newBid).toFixed(4)),
          };
        })
      );
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex bg-gray-100 min-h-screen w-full">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-gray-900 text-white p-4 shadow-lg transform transition-transform duration-300 z-40
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold tracking-wide">{traderName}</h2>
          <button className="md:hidden text-white" onClick={() => setSidebarOpen(false)}>
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="space-y-2 text-sm font-medium">
          {[
            { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
            { name: "Trades", icon: LineChart, href: "/trades" },
            { name: "Live Trade History", icon: History, href: "/history" },
            { name: "BOT Trades", icon: Bot, href: "/bot-trades" },
            { name: "Transactions", icon: Receipt, href: "/transactions" },
            { name: "Upgrades", icon: Star, href: "/upgrades" },
            { name: "Help/Support", icon: HelpCircle, href: "/help-support" },
            { name: "KYC Verification", icon: ShieldCheck, href: "/kyc-verification" },
          ].map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-700 transition"
            >
              <item.icon className="w-5 h-5" /> {item.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col md:ml-64 w-full">
        {/* Top bar */}
        <header className="bg-blue-600 text-white px-4 py-3 flex flex-wrap items-center justify-between shadow-md w-full">
          <div className="flex items-center gap-3">
            <button className="md:hidden text-white" onClick={() => setSidebarOpen(true)}>
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex gap-2 sm:gap-4 font-medium flex-wrap">
              <Link
                href="/"
                className="bg-gradient-to-r from-blue-400 to-blue-600 text-white px-3 py-1 rounded-lg text-sm sm:text-base"
              >
                Home
              </Link>
              <Link
                href="/payment"
                className="bg-gradient-to-r from-green-400 to-green-600 text-white px-3 py-1 rounded-lg text-sm sm:text-base"
              >
                Deposit
              </Link>
              <Link
                href="/dashboard/withdraw"
                className="bg-gradient-to-r from-red-400 to-red-600 text-white px-3 py-1 rounded-lg text-sm sm:text-base"
              >
                Withdraw
              </Link>
            </div>
          </div>

          <Ticker data={ticker} />

          <div className="flex items-center gap-2 sm:gap-4">
            <span className="font-semibold text-xs sm:text-sm">👤 {traderName}</span>
            <a
              href="tel:+1307432965"
              className="bg-yellow-400 text-black font-bold px-2 py-1 sm:px-3 sm:py-1 rounded-lg shadow-md text-xs sm:text-sm"
            >
              📞 +1 307-432-965
            </a>
          </div>
        </header>

        {/* Live Prices Grid */}
        <section className="w-full">
          <div className="max-w-7xl mx-auto w-full px-3 sm:px-4 lg:px-6 py-4">
            <Grid data={ticker} />
          </div>
        </section>

        {/* KPI Cards */}
        <section className="w-full">
          <div className="max-w-7xl mx-auto w-full px-3 sm:px-4 lg:px-6 pb-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {[
                { value: "$5.00", label: t("Account Balance"), color: "from-purple-500 to-purple-700" },
                { value: "$0.00", label: t("Active Deposit"), color: "from-orange-400 to-orange-600" },
                { value: "$0.00", label: t("Earned Profit"), color: "from-green-500 to-green-700" },
              ].map((card, i) => (
                <Card key={i} className="rounded-2xl shadow-md hover:shadow-lg transition border border-black/5 overflow-hidden">
                  <CardContent className={`bg-gradient-to-br ${card.color} text-white p-4 sm:p-5 lg:p-6 min-h-[150px] flex`}>
                    <div className="flex flex-col justify-between items-start w-full">
                      <div className="space-y-1.5">
                        <div className="text-xl sm:text-2xl font-extrabold leading-none drop-shadow">{card.value}</div>
                        <p className="text-sm sm:text-base font-semibold">{card.label}</p>
                        <p className="flex items-center gap-2 text-[11px] sm:text-sm opacity-95">
                          <span className="inline-block h-2 w-2 rounded-full bg-green-300" />
                          {t("Account Status: Active")}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Buy Package Card */}
              <Card className="rounded-2xl shadow-md hover:shadow-lg transition border border-black/5 overflow-hidden">
                <CardContent className="bg-gradient-to-br from-blue-500 to-blue-700 text-white p-4 sm:p-5 lg:p-6 min-h-[150px] flex items-center justify-center">
                  <Link
                    href="/upgrades"
                    className="inline-flex items-center rounded-lg bg-yellow-400 text-black px-4 py-2 text-sm sm:text-base font-semibold shadow hover:bg-yellow-300 transition"
                  >
                    {t("Buy Package")}
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* ===================== CHARTS & LIVE SIGNALS ===================== */}
        <section className="w-full">
          <div className="max-w-7xl mx-auto w-full px-3 sm:px-4 lg:px-6 py-4 space-y-6">

            {/* 1) LIVE SIGNALS — Technical Analysis (Buy/Sell/Strong) */}
            <Card>
              <CardContent className="p-3 sm:p-4">
                <h3 className="font-bold text-lg mb-3">Live Signals — Technical Analysis</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { symbol: "FX:EURUSD", title: "EUR/USD" },
                    { symbol: "OANDA:XAUUSD", title: "XAU/USD (Gold)" },
                    { symbol: "CRYPTO:BTCUSD", title: "BTC/USD" },
                  ].map(({ symbol, title }) => (
                    <div key={symbol} className="rounded-lg border border-black/10 bg-white">
                      <div className="px-3 pt-3 font-semibold">{title}</div>
                      <TVWidget
                        src="https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js"
                        height={400}
                        options={{
                          interval: "1m",
                          width: "100%",
                          height: 380,
                          isTransparent: false,
                          showIntervalTabs: true,
                          symbol,
                          colorTheme: "light",
                        }}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 2) MARKET OVERVIEW — Tabbed Watchlists with Mini Charts */}
            <Card>
              <CardContent className="p-3 sm:p-4">
                <h3 className="font-bold text-lg mb-3">Market Overview</h3>
                <TVWidget
                  src="https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js"
                  height={520}
                  options={{
                    colorTheme: "light",
                    dateRange: "12M",
                    showChart: true,
                    width: "100%",
                    height: 500,
                    locale: "en",
                    isTransparent: false,
                    showSymbolLogo: true,
                    tabs: [
                      {
                        title: "Forex Majors",
                        symbols: [
                          { s: "FX:EURUSD", d: "EUR/USD" },
                          { s: "FX:GBPUSD", d: "GBP/USD" },
                          { s: "FX:USDJPY", d: "USD/JPY" },
                          { s: "FX:AUDUSD", d: "AUD/USD" },
                          { s: "FX:USDCHF", d: "USD/CHF" },
                          { s: "FX:USDCAD", d: "USD/CAD" },
                        ],
                      },
                      {
                        title: "Crypto",
                        symbols: [
                          { s: "CRYPTO:BTCUSD", d: "BTC/USD" },
                          { s: "CRYPTO:ETHUSD", d: "ETH/USD" },
                          { s: "CRYPTO:SOLUSD", d: "SOL/USD" },
                          { s: "CRYPTO:XRPUSD", d: "XRP/USD" },
                          { s: "CRYPTO:BNBUSD", d: "BNB/USD" },
                        ],
                      },
                      {
                        title: "Metals & Energy",
                        symbols: [
                          { s: "OANDA:XAUUSD", d: "Gold (XAU/USD)" },
                          { s: "OANDA:XAGUSD", d: "Silver (XAG/USD)" },
                          { s: "TVC:USOIL", d: "Crude Oil" },
                          { s: "TVC:UKOIL", d: "Brent Oil" },
                        ],
                      },
                    ],
                  }}
                />
              </CardContent>
            </Card>

            {/* 3) SYMBOL OVERVIEW — Clean Multi-Symbol Overview */}
            <Card>
              <CardContent className="p-3 sm:p-4">
                <h3 className="font-bold text-lg mb-3">Symbol Overview</h3>
                <TVWidget
                  src="https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js"
                  height={420}
                  options={{
                    symbols: [
                      ["FX:EURUSD|1D"],
                      ["FX:GBPUSD|1D"],
                      ["FX:USDJPY|1D"],
                      ["CRYPTO:BTCUSD|1D"],
                      ["CRYPTO:ETHUSD|1D"],
                      ["OANDA:XAUUSD|1D"],
                    ],
                    chartOnly: false,
                    width: "100%",
                    height: 400,
                    locale: "en",
                    colorTheme: "light",
                    autosize: true,
                    showVolume: false,
                    showMA: true,
                    hideDateRanges: false,
                    hideMarketStatus: false,
                    gridLineColor: "rgba(240, 243, 250, 0)",
                  }}
                />
              </CardContent>
            </Card>

            {/* Keep your existing advanced charts (candlesticks) */}
            <Card>
              <CardContent className="p-3 sm:p-4">
                <h3 className="font-bold text-lg mb-3">Advanced Charts</h3>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  {[
                    { title: "BTC/USD", symbol: "CRYPTO:BTCUSD" },
                    { title: "ETH/USD", symbol: "CRYPTO:ETHUSD" },
                    { title: "XAU/USD", symbol: "OANDA:XAUUSD" },
                  ].map(({ title, symbol }) => (
                    <div key={symbol} className="rounded-lg border border-black/10 bg-white">
                      <div className="px-3 pt-3 font-semibold">{title}</div>
                      <iframe
                        src={`https://s.tradingview.com/widgetembed/?symbol=${encodeURIComponent(
                          symbol
                        )}&interval=15&theme=light&style=1&timezone=Etc/UTC&allow_symbol_change=1&hide_side_toolbar=0&withdateranges=1`}
                        className="w-full rounded-md"
                        height={420}
                        frameBorder="0"
                        scrolling="no"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* KYC Card */}
        <section className="w-full pb-8">
          <div className="max-w-7xl mx-auto w-full px-3 sm:px-4 lg:px-6">
            <Card className="bg-gradient-to-r from-gray-700 to-gray-900 text-white shadow-lg rounded-xl">
              <CardContent className="flex flex-col items-center justify-center space-y-3 py-6">
                <ShieldCheck className="w-10 h-10 text-green-400" />
                <h3 className="text-xl font-bold">{t("dashboard.kycTitle")}</h3>
                <p className="text-sm text-gray-300 text-center">
                  {t("dashboard.kycDescription")}
                </p>
                <Link
                  href="/kyc-verification"
                  className="bg-yellow-400 text-black px-5 py-2 rounded-lg font-semibold shadow hover:bg-yellow-300 transition"
                >
                  {t("dashboard.verifyNow")}
                </Link>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>

      {/* Marquee CSS (keep your smooth scroll) */}
      <style jsx>{`
        .animate-marquee {
          display: inline-flex;
          animation: marquee 30s linear infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  );
}





