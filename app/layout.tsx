"use client";

import React, { useEffect, useState } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ChatBot from "./components/ChatBot";
import LanguageSelector from "./components/LanguageSelector";

import { I18nextProvider } from "react-i18next";
import i18n from "../lib/i18n";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Optional: keep the page nicely centered on wide monitors too
  const DESKTOP_WIDTH = 1280;

  // Prevent mobile browsers from auto-zooming inputs
  useEffect(() => {
    const fixTextAdjust = () => {
      document.documentElement.style.setProperty("-webkit-text-size-adjust", "100%");
    };
    fixTextAdjust();
  }, []);

  return (
    <html lang="en">
      <head>
        {/* ✅ Tell phones to render as a 1280px-wide desktop page, allow pinch zoom */}
        <meta
          name="viewport"
          content="width=1280, initial-scale=1, maximum-scale=5, user-scalable=yes"
        />
        {/* Small global helpers so nothing collapses */}
        <style>{`
          html, body { background: #0b1020; }
          /* Never let the app shrink below desktop width */
          body { min-width: ${DESKTOP_WIDTH}px; overflow-x: auto; }
          /* Avoid iOS/Android bumping font sizes */
          html { -webkit-text-size-adjust: 100%; text-size-adjust: 100%; }
        `}</style>
      </head>

      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <I18nextProvider i18n={i18n}>
          {/* ✅ Fixed-width desktop canvas for the entire site */}
          <div
            id="desktop-canvas"
            className="min-h-screen flex flex-col"
            style={{
              width: DESKTOP_WIDTH,          // fixed desktop width
              minWidth: DESKTOP_WIDTH,       // never collapse
              margin: "0 auto",              // centered on large monitors
              background: "transparent",
            }}
          >
            {/* Language bar on every page */}
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

