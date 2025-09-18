"use client";
import { useState } from "react";
import Link from "next/link";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        setLoading(true);
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 3000);
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#0d1b2a] text-white z-50">
        <div className="bg-[#1b263b] p-12 sm:p-16 rounded-2xl shadow-2xl text-center max-w-lg w-full">
          <h1 className="text-3xl font-bold text-green-400 mb-4">
            🎉 Congratulations!
          </h1>
          <p className="text-gray-300">
            Please wait while we connect your account...
          </p>
          <div className="mt-6 w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d1b2a] text-white flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-8 md:px-16 py-10">
        {/* Google Translate Placeholder */}
        <div className="mb-6 text-gray-400 text-sm text-center">
          Select Language <br />
          <span className="italic">Powered by Google Translate</span>
        </div>

        {/* Card */}
        <div className="w-full max-w-4xl bg-[#1b263b] p-10 sm:p-14 rounded-2xl shadow-2xl">
          <h1 className="text-4xl font-bold text-center text-red-500 mb-10">
            Login to Your Account
          </h1>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            <div>
              <label className="block mb-1 text-base">Your Email *</label>
              <input
                type="email"
                name="email"
                placeholder="name@example.com"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full p-4 rounded-lg bg-[#0d1b2a] border border-gray-600 focus:border-red-500 focus:ring-2 focus:ring-red-500 outline-none transition"
              />
            </div>

            <div>
              <label className="block mb-1 text-base">Password *</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full p-4 rounded-lg bg-[#0d1b2a] border border-gray-600 focus:border-red-500 focus:ring-2 focus:ring-red-500 outline-none transition"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition text-lg"
            >
              Login
            </button>
          </form>

          <p className="text-sm text-center mt-8 text-gray-400">
            Don’t have an account?{" "}
            <Link href="/register" className="text-red-500 hover:underline">
              Register
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p className="text-gray-500 text-sm mt-10 text-center">
          © 2025 <span className="text-red-500">VentureWise FX</span> All Rights Reserved.
        </p>
      </div>
    </div>
  );
}


