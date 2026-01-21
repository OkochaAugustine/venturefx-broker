import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ScaleWrapper from "./scale-wrapper";
import { Providers } from "./providers/ThemeProvider";
import ChatBot from "@/components/ChatBot";
import { FiHome, FiTrendingUp, FiUser } from "react-icons/fi"; // example icons

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
    <html
      lang="en"
      suppressHydrationWarning
      className="h-full text-base md:text-lg lg:text-xl"
    >
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
      </head>

      <body
        className={`
          ${geistSans.variable}
          ${geistMono.variable}
          antialiased
          min-h-screen
          w-full
          bg-white
          overflow-x-hidden
          overflow-y-auto
          break-words
          font-sans
        `}
      >
        <Providers>
          <ScaleWrapper>
            <header className="w-full flex flex-col md:flex-row items-center justify-between p-4 md:p-6 gap-4 md:gap-8 font-bold">
              {/* Example Nav Icons */}
              <div className="flex items-center gap-4">
                <FiHome className="w-6 h-6 md:w-8 md:h-8" />
                <span className="text-base md:text-lg lg:text-xl">Home</span>
              </div>
              <div className="flex items-center gap-4">
                <FiTrendingUp className="w-6 h-6 md:w-8 md:h-8" />
                <span className="text-base md:text-lg lg:text-xl">Market</span>
              </div>
              <div className="flex items-center gap-4">
                <FiUser className="w-6 h-6 md:w-8 md:h-8" />
                <span className="text-base md:text-lg lg:text-xl">Profile</span>
              </div>
            </header>

            <main className="min-h-screen w-full flex flex-col gap-6 font-bold">
              {children}
            </main>

            <ChatBot />
          </ScaleWrapper>
        </Providers>
      </body>
    </html>
  );
}



