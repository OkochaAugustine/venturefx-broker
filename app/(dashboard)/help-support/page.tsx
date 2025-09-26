"use client";
import GoogleTranslate from "@/components/GoogleTranslate";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { useState } from "react";
import { Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function HelpPage() {
  const [messages, setMessages] = useState([
    {
      sender: "assistant",
      text: "👋 Hello! Welcome to VentureWise FX Support. How can we help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = () => {
    if (!input.trim()) return;

    const newUserMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, newUserMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate assistant typing + response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "assistant",
          text: "✅ Thanks for your message. Our support team will respond shortly.",
        },
      ]);

      // stop typing after response
      setIsTyping(false);
    }, 2000);
  };

  return (
    <DashboardLayout>
      <div className="relative flex flex-col h-[80vh] max-w-2xl mx-auto rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
        {/* Background glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 animate-gradient-x opacity-30"></div>

        {/* Header */}
        <motion.div
          initial={{ y: -80 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="relative z-10 bg-gradient-to-r from-indigo-600 to-purple-700 text-white p-4 font-bold text-lg shadow-lg flex items-center justify-center"
        >
          🚀 VentureWise FX Live Support
        </motion.div>

        {/* Chat Area */}
        <div className="relative z-10 flex-1 p-4 overflow-y-auto space-y-3 bg-white/70 backdrop-blur-md">
          <AnimatePresence>
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: msg.sender === "user" ? 50 : -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ type: "spring", stiffness: 120 }}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-4 py-2 rounded-2xl max-w-[75%] text-sm shadow-lg ${
                    msg.sender === "user"
                      ? "bg-indigo-600 text-white rounded-br-none"
                      : "bg-gray-200 text-gray-800 rounded-bl-none"
                  }`}
                >
                  {msg.text}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{
                repeat: Infinity,
                duration: 0.6,
                repeatType: "reverse",
              }}
              className="flex justify-start"
            >
              <div className="px-4 py-2 rounded-2xl bg-gray-200 text-gray-800 text-sm shadow-md">
                <span className="animate-pulse">
                  VentureWise FX is typing...
                </span>
              </div>
            </motion.div>
          )}
        </div>

        {/* Input */}
        <div className="relative z-10 p-3 border-t border-gray-200 flex items-center gap-2 bg-white backdrop-blur-md">
          <input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <motion.button
            whileTap={{ scale: 0.9, rotate: 360 }}
            onClick={sendMessage}
            className="bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-full shadow-md transition"
          >
            <Send size={18} />
          </motion.button>
        </div>
      </div>
    </DashboardLayout>
  );
}
