"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, CheckCircle, AlertCircle } from "lucide-react";

export default function KYCPage() {
  const [idNumber, setIdNumber] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setStreaming(true);
      }
    } catch (err) {
      alert("Camera access denied. Please enable permissions.");
    }
  };

  const validateID = (id: string) => {
    // Example rules: Must be numeric, exactly 10 digits, and start with "27"
    const regex = /^27\d{8}$/;
    return regex.test(id);
  };

  const handleVerify = () => {
    if (!idNumber.trim()) {
      setError("⚠️ Please enter your ID number.");
      return;
    }
    if (!validateID(idNumber)) {
      setError("❌ Invalid ID provided. Please check and try again.");
      return;
    }
    setError("");
    setVerified(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] bg-gradient-to-br from-indigo-600 via-purple-700 to-pink-600 text-white p-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15),transparent_70%)]"></div>

      <motion.h1
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="text-2xl font-bold mb-6"
      >
        🛡️ KYC Verification
      </motion.h1>

      <AnimatePresence>
        {!verified ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-xl w-full max-w-md flex flex-col gap-4"
          >
            {/* Face Verification */}
            <div className="flex flex-col items-center">
              {!streaming ? (
                <button
                  onClick={startCamera}
                  className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-md transition"
                >
                  <Camera size={18} />
                  Start Face Verification
                </button>
              ) : (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-48 h-48 rounded-xl border-4 border-indigo-400 shadow-md object-cover"
                />
              )}
            </div>

            {/* ID Input */}
            <input
              type="text"
              value={idNumber}
              onChange={(e) => setIdNumber(e.target.value)}
              placeholder="Enter your ID Number (must start with 27...)"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />

            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-2 text-red-300 text-sm">
                <AlertCircle size={16} />
                {error}
              </div>
            )}

            <button
              onClick={handleVerify}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition"
            >
              Submit Verification
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 120 }}
            className="flex flex-col items-center bg-white/20 backdrop-blur-md p-8 rounded-2xl shadow-2xl"
          >
            <CheckCircle className="text-green-400 w-16 h-16 mb-4" />
            <h2 className="text-xl font-bold mb-2">Verification Successful ✅</h2>
            <p className="opacity-80 text-center mb-4">
              Your identity has been verified successfully.  
              Welcome to VentureWise FX.
            </p>
            <button
              onClick={() => (window.location.href = "/dashboard")}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg shadow-md transition"
            >
              OK
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
