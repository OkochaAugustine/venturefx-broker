"use client"

import { useState, useEffect } from "react"

// ✅ Updated imports to point to app/components
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Ticker from "./components/Ticker"
import MarketAnalysis from "./components/MarketAnalysis"
import Features from "./components/Features"
import Experience from "./components/Experience"
import Footer from "./components/Footer"
import Loading from "./components/Loading"

import MarketTicker from "./components/MarketTicker"
import Packages from "./components/Packages"
import FastAccount from "./components/FastAccount"
import LiveCharts from "./components/LiveCharts"
import Stats from "./components/Stats"
import ChatBot from "./components/ChatBot"

export default function Home() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  if (loading) return <Loading />

  return (
    <main className="bg-white text-gray-900">
      <Navbar />
      <Hero />
      <Ticker />
      <MarketAnalysis />
      <Features />
      <Experience />
      <MarketTicker />
      <Packages />
      <FastAccount />
      <LiveCharts />
      <Stats />   {/* 🔥 Matches your screenshot */}
      <Footer />
      <ChatBot /> {/* ✅ Floating Chat Widget */}
    </main>
  )
}





