"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function FastAccount() {
  const [loadingStep, setLoadingStep] = useState<"idle" | "setting" | "success">("idle");
  const router = useRouter();

  const handleOpenAccount = (e: React.FormEvent) => {
    e.preventDefault();

    // Step 1: Start loading
    setLoadingStep("setting");

    // Step 2: After 3s show success
    setTimeout(() => {
      setLoadingStep("success");

      // Step 3: Redirect to dashboard after another 2s
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    }, 3000);
  };

  return (
    <section className="bg-gradient-to-r from-red-700 to-red-900 text-white py-20 px-6 relative">
      {/* Loading Overlay */}
      {loadingStep !== "idle" && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="text-center space-y-4 animate-fadeIn">
            {loadingStep === "setting" && (
              <>
                <div className="w-12 h-12 border-4 border-t-transparent border-red-500 rounded-full animate-spin mx-auto"></div>
                <p className="text-lg font-semibold">Setting up your fast account, please wait…</p>
              </>
            )}
            {loadingStep === "success" && (
              <>
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto animate-bounce">
                  ✅
                </div>
                <p className="text-lg font-semibold">🎉 Account Created Successfully!</p>
              </>
            )}
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">
          Fast account opening in 3 simple steps
        </h2>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div>
            <div className="text-4xl font-bold mb-2">1</div>
            <h3 className="font-semibold">Register</h3>
            <p className="text-sm opacity-80">
              Choose your account type and sign up
            </p>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">2</div>
            <h3 className="font-semibold">Fund</h3>
            <p className="text-sm opacity-80">
              Easily deposit using multiple payment methods
            </p>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">3</div>
            <h3 className="font-semibold">Trade</h3>
            <p className="text-sm opacity-80">
              Access 40,000+ instruments on award-winning platforms
            </p>
          </div>
        </div>

        {/* Bottom Form */}
        <form
          className="max-w-xl mx-auto flex flex-col md:flex-row gap-4"
          onSubmit={handleOpenAccount}
        >
          <input
            type="email"
            placeholder="Email address"
            className="flex-1 px-4 py-3 rounded-md bg-white text-black outline-none"
          />
          <input
            type="tel"
            placeholder="Phone number"
            className="flex-1 px-4 py-3 rounded-md bg-white text-black outline-none"
          />
          <button
            type="submit"
            className="bg-black px-6 py-3 rounded-md font-semibold hover:bg-gray-900"
          >
            Open Account
          </button>
        </form>
      </div>
    </section>
  );
}
