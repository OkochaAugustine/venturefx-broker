"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Navbar from "../components/Navbar"

export default function Register() {
  const router = useRouter()

  const [form, setForm] = useState({
    username: "",
    fullname: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    country: "",
    referral: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // ✅ check passwords match
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match")
      return
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: form.username,
          fullname: form.fullname,
          email: form.email,
          phone: form.phone,
          password: form.password,
          country: form.country,
          referralId: form.referral, // ✅ matches backend field
        }),
      })

      const data = await res.json()

      if (res.ok) {
        // ✅ Save user info to localStorage for dashboard
        localStorage.setItem(
          "user",
          JSON.stringify({
            name: form.fullname,
            email: form.email,
            username: form.username,
          })
        )

        alert(data.message || "✅ Account created successfully! You can now log in.")
        router.push("/login") // ✅ redirect to login
      } else {
        alert(data.message || "Registration failed") // ✅ use message (not error)
      }
    } catch (err) {
      console.error("Registration error:", err)
      alert("Something went wrong")
    }
  }

  return (
    <div className="min-h-screen bg-[#0d1b2a] text-white flex flex-col">
      <Navbar />

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-10">
        <div className="mb-6 text-gray-400 text-sm">
          Select Language <br />
          <span className="italic">Powered by Google Translate</span>
        </div>

        <div className="w-[600px] bg-[#1b263b] p-10 rounded-2xl shadow-2xl">
          <h1 className="text-3xl font-bold text-center text-red-500 mb-8">
            Create an Account
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="block mb-1 text-sm">UserName *</label>
              <input
                type="text"
                name="username"
                placeholder="Enter Unique Username"
                value={form.username}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-lg bg-[#0d1b2a] border border-gray-600 focus:border-red-500 outline-none"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm">FullName *</label>
              <input
                type="text"
                name="fullname"
                placeholder="Enter FullName"
                value={form.fullname}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-lg bg-[#0d1b2a] border border-gray-600 focus:border-red-500 outline-none"
              />
            </div>

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
              <label className="block mb-1 text-sm">Phone Number *</label>
              <input
                type="tel"
                name="phone"
                placeholder="Enter Phone number"
                value={form.phone}
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
                placeholder="Enter Password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-lg bg-[#0d1b2a] border border-gray-600 focus:border-red-500 outline-none"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm">Confirm Password *</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-lg bg-[#0d1b2a] border border-gray-600 focus:border-red-500 outline-none"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm">Country *</label>
              <select
                name="country"
                value={form.country}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-lg bg-[#0d1b2a] border border-gray-600 focus:border-red-500 outline-none"
              >
                <option value="">Choose Country</option>
                <option value="USA">United States</option>
                <option value="UK">United Kingdom</option>
                <option value="Nigeria">Nigeria</option>
                <option value="Ghana">Ghana</option>
                <option value="South Africa">South Africa</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 text-sm">Referral ID</label>
              <input
                type="text"
                name="referral"
                placeholder="Optional referral id"
                value={form.referral}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-[#0d1b2a] border border-gray-600 focus:border-red-500 outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition"
            >
              Register
            </button>
          </form>

          <p className="text-sm text-center mt-6 text-gray-400">
            Already have an account?{" "}
            <Link href="/login" className="text-red-500 hover:underline">
              Login
            </Link>
          </p>
        </div>

        <p className="text-gray-500 text-sm mt-10 text-center">
          © Copyright 2025 <span className="text-red-500">Sturdy FX</span> All Rights Reserved.
        </p>
      </div>
    </div>
  )
}

