"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Register() {
  const router = useRouter();

  const [form, setForm] = useState({
    username: "",
    fullname: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    country: "",
    referral: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
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
          referralId: form.referral,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            name: form.fullname,
            email: form.email,
            username: form.username,
          })
        );

        alert(data.message || "✅ Account created successfully! You can now log in.");
        router.push("/login");
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (err) {
      console.error("Registration error:", err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1b2a] text-white flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-8 md:px-16 py-10">
        {/* Google Translate Placeholder */}
        <div className="mb-6 text-gray-400 text-sm text-center">
          Select Language <br />
          <span className="italic">Powered by Google Translate</span>
        </div>

        {/* Wider Form Card */}
        <div className="w-full max-w-4xl bg-[#1b263b] p-10 sm:p-14 rounded-2xl shadow-2xl">
          <h1 className="text-4xl font-bold text-center text-red-500 mb-10">
            Create an Account
          </h1>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div>
              <label className="block mb-1 text-base">UserName *</label>
              <input
                type="text"
                name="username"
                placeholder="Enter Unique Username"
                value={form.username}
                onChange={handleChange}
                required
                className="w-full p-4 rounded-lg bg-[#0d1b2a] border border-gray-600 focus:border-red-500 focus:ring-2 focus:ring-red-500 outline-none transition"
              />
            </div>

            <div>
              <label className="block mb-1 text-base">FullName *</label>
              <input
                type="text"
                name="fullname"
                placeholder="Enter FullName"
                value={form.fullname}
                onChange={handleChange}
                required
                className="w-full p-4 rounded-lg bg-[#0d1b2a] border border-gray-600 focus:border-red-500 focus:ring-2 focus:ring-red-500 outline-none transition"
              />
            </div>

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
              <label className="block mb-1 text-base">Phone Number *</label>
              <input
                type="tel"
                name="phone"
                placeholder="Enter Phone number"
                value={form.phone}
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
                placeholder="Enter Password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full p-4 rounded-lg bg-[#0d1b2a] border border-gray-600 focus:border-red-500 focus:ring-2 focus:ring-red-500 outline-none transition"
              />
            </div>

            <div>
              <label className="block mb-1 text-base">Confirm Password *</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={handleChange}
                required
                className="w-full p-4 rounded-lg bg-[#0d1b2a] border border-gray-600 focus:border-red-500 focus:ring-2 focus:ring-red-500 outline-none transition"
              />
            </div>

            <div>
              <label className="block mb-1 text-base">Country *</label>
              <select
                name="country"
                value={form.country}
                onChange={handleChange}
                required
                className="w-full p-4 rounded-lg bg-[#0d1b2a] border border-gray-600 focus:border-red-500 focus:ring-2 focus:ring-red-500 outline-none transition"
              >
                <option value="">Choose Country</option>
                <option value="Argentina">Argentina</option>
                <option value="Australia">Australia</option>
                <option value="Brazil">Brazil</option>
                <option value="Canada">Canada</option>
                <option value="Chile">Chile</option>
                <option value="China">China</option>
                <option value="Egypt">Egypt</option>
                <option value="France">France</option>
                <option value="Germany">Germany</option>
                <option value="India">India</option>
                <option value="Italy">Italy</option>
                <option value="Japan">Japan</option>
                <option value="Kenya">Kenya</option>
                <option value="Mexico">Mexico</option>
                <option value="Morocco">Morocco</option>
                <option value="Netherlands">Netherlands</option>
                <option value="Philippines">Philippines</option>
                <option value="Qatar">Qatar</option>
                <option value="Saudi Arabia">Saudi Arabia</option>
                <option value="Singapore">Singapore</option>
                <option value="South Africa">South Africa</option>
                <option value="South Korea">South Korea</option>
                <option value="Spain">Spain</option>
                <option value="Tanzania">Tanzania</option>
                <option value="Turkey">Turkey</option>
                <option value="Uganda">Uganda</option>
                <option value="UK">United Kingdom</option>
                <option value="USA">United States</option>
                <option value="United Arab Emirates">United Arab Emirates</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 text-base">Referral ID</label>
              <input
                type="text"
                name="referral"
                placeholder="Optional referral id"
                value={form.referral}
                onChange={handleChange}
                className="w-full p-4 rounded-lg bg-[#0d1b2a] border border-gray-600 focus:border-red-500 focus:ring-2 focus:ring-red-500 outline-none transition"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition text-lg"
            >
              Register
            </button>
          </form>

          <p className="text-sm text-center mt-8 text-gray-400">
            Already have an account?{" "}
            <Link href="/login" className="text-red-500 hover:underline">
              Login
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



