import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ScaleWrapper from "./scale-wrapper"; // 👈 client component
import { Providers } from "./providers/ThemeProvider"; // 👈 added

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
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white min-h-screen w-full overflow-hidden`}
      >
        <Providers>
          <ScaleWrapper>{children}</ScaleWrapper>
        </Providers>
      </body>
    </html>
  );
}




