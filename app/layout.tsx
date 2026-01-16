import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ScaleWrapper from "./scale-wrapper";
import { Providers } from "./providers/ThemeProvider";
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
    <html
      lang="en"
      suppressHydrationWarning
      className="h-full text-[18px] md:text-[19px] lg:text-[20px]"
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
        `}
      >
        <Providers>
          <ScaleWrapper>
            <main className="min-h-screen w-full flex flex-col">
              {children}
            </main>
            <ChatBot />
          </ScaleWrapper>
        </Providers>
      </body>
    </html>
  );
}



