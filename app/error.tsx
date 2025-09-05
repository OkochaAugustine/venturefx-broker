"use client"

import { useEffect } from "react"

export default function ErrorPage({ error, reset }: { error: Error, reset: () => void }) {
  useEffect(() => {
    console.error("Error caught in error.tsx:", error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#0d1b2a] text-white">
      <h2 className="text-xl font-bold mb-4">Something went wrong!</h2>
      <p className="text-gray-400 mb-6">{error.message}</p>
      <button
        onClick={() => reset()}
        className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
      >
        Try Again
      </button>
    </div>
  )
}

