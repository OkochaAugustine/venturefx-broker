import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Components
import ChatBot from "./components/ChatBot";
import LanguageSelector from "./components/LanguageSelector";
import Providers from "./Providers";

// Fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ✅ Metadata (without viewport)
export const metadata: Metadata = {
  title: "VentureFX Broker",
  description: "Trade Forex, Crypto, and Stocks",
};

// ✅ Viewport must be exported separately in Next.js 15
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const DESKTOP_WIDTH = 1280;

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <div
            id="desktop-canvas"
            className="min-h-screen flex flex-col"
            style={{
              width: DESKTOP_WIDTH,
              minWidth: DESKTOP_WIDTH,
              margin: "0 auto",
              background: "transparent",
            }}
          >
            {/* Language selector */}
            <LanguageSelector />

            {/* Page content */}
            <main className="flex-1">{children}</main>

            {/* Global chatbot */}
            <ChatBot />
          </div>
        </Providers>
      </body>
    </html>
  );
}
