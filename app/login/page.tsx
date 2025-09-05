"use client"
import { useState } from "react"
import Link from "next/link"
import Navbar from "../components/Navbar"

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      const data = await res.json()
      if (res.ok) {
        setLoading(true) // ✅ show loading screen
        setTimeout(() => {
          window.location.href = "/dashboard" // redirect after 3s
        }, 3000)
      } else {
        alert(data.message || "Login failed")
      }
    } catch (err) {
      console.error(err)
      alert("Something went wrong")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0d1b2a] text-white">
        <div className="bg-[#1b263b] p-10 rounded-2xl shadow-2xl text-center">
          <h1 className="text-3xl font-bold text-green-400 mb-4">
            🎉 Congratulations!
          </h1>
          <p className="text-gray-300">
            Please wait while we connect your account...
          </p>
          <div className="mt-6 w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0d1b2a] text-white flex flex-col">
      {/* ✅ Navbar */}
      <Navbar />

      {/* ✅ Page Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-10">
        {/* Google Translate Placeholder */}
        <div className="mb-6 text-gray-400 text-sm">
          Select Language <br />
          <span className="italic">Powered by Google Translate</span>
        </div>

        {/* Card */}
        <div className="w-[600px] bg-[#1b263b] p-10 rounded-2xl shadow-2xl">
          <h1 className="text-3xl font-bold text-center text-red-500 mb-8">
            Login to Your Account
          </h1>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="block mb-1 text-sm">Your Email *</label>
              <input
                type="email"
                name="email"
                placeholder="name@example.com"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-lg bg-[#0d1b2a] border border-gray-600 focus:border-red-500 outline-none"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm">Password *</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-lg bg-[#0d1b2a] border border-gray-600 focus:border-red-500 outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition"
            >
              Login
            </button>
          </form>

          <p className="text-sm text-center mt-6 text-gray-400">
            Don’t have an account?{" "}
            <Link href="/register" className="text-red-500 hover:underline">
              Register
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p className="text-gray-500 text-sm mt-10 text-center">
          © Copyright 2025 <span className="text-red-500">Sturdy FX</span> All Rights Reserved.
        </p>
      </div>
    </div>
  )
}

