import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./responsive.css"; // ✅ Keep your responsive overrides

// Components
import ChatBot from "./components/ChatBot";
import Providers from "./Providers";
import GoogleTranslate from "./components/GoogleTranslate";

// Fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ✅ SEO + Meta
export const metadata: Metadata = {
  title: "VentureFX Broker",
  description: "Trade Forex, Crypto, and Stocks",
};

// ✅ Viewport – matches sturdyfx style (no weird zoom issues)
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* ✅ Meta tags for better mobile rendering */}
        <meta name="theme-color" content="#ffffff" />
        <meta name="description" content="Join VentureFX and trade Forex, Crypto, and Stocks with ease." />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-900`}
      >
        <Providers>
          {/* ✅ No hard max-width, just centered responsive container */}
          <div className="min-h-screen flex flex-col w-full max-w-screen-2xl mx-auto overflow-x-hidden">
            {/* ✅ Google Translate widget */}
            <GoogleTranslate />

            {/* ✅ Page content – stays fluid, collapses properly */}
            <main className="flex-1 w-full">{children}</main>

            {/* ✅ Global ChatBot stays floating */}
            <ChatBot />
          </div>
        </Providers>
      </body>
    </html>
  );
}



