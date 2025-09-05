"use client"
import Navbar from "../components/Navbar"
import { useState } from "react"

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: send form data to API (e.g. /api/contact)
    alert("Thanks for reaching out! We'll contact you soon.")
    setForm({ name: "", email: "", subject: "", message: "" })
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#0d1b2a] text-white">
      <Navbar />

      <main className="flex-1 max-w-3xl mx-auto p-6 space-y-8">
        <h1 className="text-4xl font-bold text-center text-red-500">
          Contact Us
        </h1>
        <p className="text-center text-gray-300">
          We&apos;re here to help! Drop us a message and we&apos;ll get back to you as soon as possible.
        </p>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-6 bg-[#1b263b] p-6 rounded-lg shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              type="text"
              placeholder="Name"
              required
              className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:border-red-500 focus:outline-none"
            />
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:border-red-500 focus:outline-none"
            />
          </div>
          <input
            name="subject"
            type="text"
            value={form.subject}
            onChange={handleChange}
            placeholder="Subject"
            className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:border-red-500 focus:outline-none"
          />
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Your Message"
            rows={5}
            required
            className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:border-red-500 focus:outline-none resize-none"
          />

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 transition py-3 rounded-md font-semibold text-lg"
          >
            Send Message
          </button>
        </form>

        {/* Office Info */}
        <div className="bg-[#1b263b] p-6 rounded-lg shadow-lg space-y-3">
          <h2 className="text-2xl font-bold text-red-500">Our Office</h2>
          <p>VentureWise Brokers HQ</p>
          <p>1234 Market Street</p>
          <p>New York, NY 10005, USA</p>
          <p>Email: support@venturewise.com</p>
          <p>Phone: +1 (800) 123-4567</p>
        </div>

        {/* Optional: Embedded Map or Placeholder */}
        <div className="border border-gray-700 rounded-lg overflow-hidden">
          <iframe
            src="https://maps.google.com/maps?q=New+York+NY+USA&t=&z=13&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="250"
            className="border-0"
            allowFullScreen
            loading="lazy"
          />
        </div>
      </main>

      <footer className="bg-[#0d1b2a] text-white py-8">
        <div className="max-w-6xl mx-auto px-6 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} VentureWise Brokers. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

