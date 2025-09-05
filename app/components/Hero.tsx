"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Hero() {
  const images = [
    "/images/hero1.jpg",
    "/images/hero2.jpg",
    "/images/hero3.jpg",
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000); // 5s per slide
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <section className="relative h-[90vh] w-full flex items-center justify-center text-white overflow-hidden">
      {/* ✅ Background Slider */}
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={img}
            alt={`Slide ${index + 1}`}
            fill
            className="object-cover"
            priority={index === 0}
          />
          {/* Overlay for better text visibility */}
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
      ))}

      {/* ✅ Text Section (Centered Left) */}
      <div className="relative z-10 max-w-2xl px-6 md:px-12">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight animate-fade-in">
          Register Now and Get <br />
          a <span className="text-red-500">$500 Bonus</span> on <br />
          $5000 Deposit.
        </h1>
        <p className="mt-6 text-lg md:text-xl animate-slide-up">
          Trade Cryptocurrencies, Stock Indices, Commodities and Forex from a single account
        </p>

        {/* ✅ Buttons */}
        <div className="mt-8 flex gap-4 animate-bounce-in">
          <a
            href="/login"
            className="bg-red-600 px-8 py-3 rounded-md font-semibold hover:bg-red-700 shadow-lg transition"
          >
            Login Account
          </a>
          <a
            href="/register"
            className="bg-transparent border border-red-600 px-8 py-3 rounded-md font-semibold hover:bg-red-600 hover:text-white shadow-lg transition"
          >
            Open Account
          </a>
        </div>

        <p className="mt-6 text-xs opacity-80 animate-fade-in">
          Trading in Forex/CFDs is highly speculative and carries a high level of risk.
        </p>
      </div>

      {/* ✅ Dots (Indicators) */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
        {images.map((_, index) => (
          <span
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === current ? "bg-red-500" : "bg-white/50"
            }`}
          ></span>
        ))}
      </div>
    </section>
  );
}



