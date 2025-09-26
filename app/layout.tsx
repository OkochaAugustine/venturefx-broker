import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ScaleWrapper from "./scale-wrapper"; // 👈 still handling scaling
import { Providers } from "./providers/ThemeProvider"; // 👈 keep
import ChatBot from "@/components/ChatBot";

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
  return (
    <html lang="en" suppressHydrationWarning className="h-full">
      <head>
        <meta
          name="viewport"
          // 👇 important to keep proper scaling on mobile
          content="width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen w-full bg-white overflow-x-hidden overflow-y-auto`}
      >
        <Providers>
          <ScaleWrapper>
            {children}
            <ChatBot /> {/* 👈 Render chatbot here */}
          </ScaleWrapper>
        </Providers>
      </body>
    </html>
  );
}






