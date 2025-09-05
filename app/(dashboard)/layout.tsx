"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import DashboardNavbarWrapper from "@/components/DashboardNavbarWrapper";
import { motion, AnimatePresence } from "framer-motion";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200); // ⏳ Adjust duration for transitions

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* ✅ Page loader */}
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700"
          >
            <motion.div
              className="flex flex-col items-center space-y-4 text-white"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              <p className="text-lg font-semibold tracking-wide">
                Loading Dashboard...
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ✅ Navbar wrapper */}
      <DashboardNavbarWrapper />

      {/* ✅ Responsive layout */}
      <main className="flex-1 bg-gray-50">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </div>
      </main>
    </div>
  );
}




