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
    <section className="relative h-[90vh] w-full flex items-end justify-center text-white overflow-hidden">
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
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
      ))}

      {/* ✅ Text Section */}
      <div className="relative z-10 max-w-3xl px-6 md:px-12 pb-16 md:pb-24 text-center md:text-left">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-snug">
          Register Now and Get <br />
          <span className="text-red-500">$500 Bonus</span> on <br />
          $5000 Deposit.
        </h1>
        <p className="mt-4 text-base sm:text-lg md:text-xl text-gray-100">
          Trade Cryptocurrencies, Stock Indices, Commodities and Forex from a single account
        </p>

        {/* ✅ Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          <a
            href="/login"
            className="bg-red-600 px-6 py-3 rounded-md text-white hover:bg-red-700 shadow-lg transition"
          >
            Login Account
          </a>
          <a
            href="/register"
            className="bg-transparent border border-red-600 px-6 py-3 rounded-md text-red-600 hover:bg-red-600 hover:text-white shadow-lg transition"
          >
            Open Account
          </a>
        </div>

        <p className="mt-4 text-xs text-gray-200 opacity-80">
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


