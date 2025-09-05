"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function LoadingScreen() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/dashboard")
    }, 3000) // wait 3s before redirect

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-red-500 mx-auto mb-6"></div>
        <h2 className="text-2xl font-bold text-gray-800">🎉 Congratulations!</h2>
        <p className="text-gray-600 mt-2">Please wait while we connect your account...</p>
      </div>
    </div>
  )
}
