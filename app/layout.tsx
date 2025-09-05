import React from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ChatBot from "./components/ChatBot";
import LanguageSelector from "./components/LanguageSelector";

import { I18nextProvider } from "react-i18next";
import i18n from "../lib/i18n";
import type { Metadata } from "next";

// ✅ Google fonts
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

// ✅ Metadata (only works in Server Components)
export const metadata: Metadata = {
  title: "VentureFX Broker",
  description: "Trade Forex, Crypto, and Stocks",
  viewport:
    "width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const DESKTOP_WIDTH = 1280;

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <I18nextProvider i18n={i18n}>
          {/* ✅ Fixed desktop canvas */}
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
            {/* Language selector always visible */}
            <LanguageSelector />

            {/* Page content */}
            <main className="flex-1">{children}</main>

            {/* Global chatbot */}
            <ChatBot />
          </div>
        </I18nextProvider>
      </body>
    </html>
  );
}


