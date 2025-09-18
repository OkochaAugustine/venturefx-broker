import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import ChatBot from "./components/ChatBot";
import Providers from "./Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VentureFX Broker",
  description: "Trade Forex, Crypto, and Stocks",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const DESKTOP_WIDTH = 1280;

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* ✅ Our custom meta viewport */}
        <meta
          name="viewport"
          content="width=1280, initial-scale=0.25, maximum-scale=5, user-scalable=yes"
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
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
            <main className="flex-1">{children}</main>
            <ChatBot />
          </div>
        </Providers>
      </body>
    </html>
  );
}





