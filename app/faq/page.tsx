"use client"
import { useState } from "react"
import Navbar from "../components/Navbar"   // ✅ fixed path

const faqs = [
  {
    question: "What is VentureWise Brokers?",
    answer: "We are your trusted global brokerage partner providing forex, crypto, and stock trading services."
  },
  {
    question: "How do I create an account?",
    answer: "Click on the Sign Up button in the top navigation bar and fill out the registration form."
  },
  {
    question: "Is my data safe?",
    answer: "Yes, we use bank-grade encryption and industry security standards to protect your data."
  },
  {
    question: "Do you offer customer support?",
    answer: "Yes, our team is available 24/7 to assist you via chat, email, and phone."
  }
]

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* Page content */}
      <main className="flex-1 max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-center mb-12 text-red-600">Frequently Asked Questions</h1>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border rounded-lg shadow-sm bg-white"
            >
              <button
                className="w-full text-left px-6 py-4 flex justify-between items-center font-medium text-lg"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                {faq.question}
                <span className="text-red-500">{openIndex === index ? "−" : "+"}</span>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4 text-gray-700">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </main>

      {/* Footer branding */}
      <footer className="bg-[#0d1b2a] text-white py-8 mt-12">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-red-500">VentureWise Brokers</h2>
            <p className="text-sm text-gray-300">123 Market Street, New York, NY, USA</p>
            <p className="text-sm text-gray-300">support@venturewise.com</p>
          </div>
          <div className="mt-4 md:mt-0">
            <p className="text-xs text-gray-400">© {new Date().getFullYear()} VentureWise Brokers. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}


