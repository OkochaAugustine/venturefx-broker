"use client"
import { useState } from "react"

export default function AdminRegister() {
  const [form, setForm] = useState({ fullname: "", email: "", password: "" })
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch("/api/admin-register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (res.ok) {
        alert("✅ Admin registered! You can now log in.")
        window.location.href = "/admin-login"
      } else {
        alert(data.message || "Registration failed")
      }
    } catch (err) {
      console.error(err)
      alert("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0d1b2a] text-white">
      <div className="w-[400px] bg-[#1b263b] p-8 rounded-2xl shadow-2xl">
        <h1 className="text-2xl font-bold text-center text-red-500 mb-6">
          Admin Register
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="fullname"
            placeholder="Full Name"
            value={form.fullname}
            onChange={handleChange}
            className="p-3 rounded-lg bg-[#0d1b2a] border border-gray-600 focus:border-red-500 outline-none"
          />
          <input
            type="email"
            name="email"
            placeholder="Admin Email"
            value={form.email}
            onChange={handleChange}
            className="p-3 rounded-lg bg-[#0d1b2a] border border-gray-600 focus:border-red-500 outline-none"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="p-3 rounded-lg bg-[#0d1b2a] border border-gray-600 focus:border-red-500 outline-none"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  )
}
