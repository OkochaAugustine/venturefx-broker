"use client"
import { useState, useEffect } from "react"
import Navbar from "@/app/components/Navbar"
import Hero from "@/app/components/Hero"
import Ticker from "@/app/components/Ticker"
import MarketAnalysis from "@/app/components/MarketAnalysis"
import Features from "@/app/components/Features"
import Experience from "@/app/components/Experience"
import Footer from "@/app/components/Footer"
import Loading from "@/app/components/Loading"

import MarketTicker from "@/app/components/MarketTicker"
import Packages from "@/app/components/Packages"
import FastAccount from "@/app/components/FastAccount"
import LiveCharts from "@/app/components/LiveCharts"
import Stats from "@/app/components/Stats"
import ChatBot from "@/app/components/ChatBot"


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




