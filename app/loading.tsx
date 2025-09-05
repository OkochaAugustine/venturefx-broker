export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen bg-[#0d1b2a] text-white">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-red-500"></div>
      <p className="ml-4 text-lg font-semibold">Loading...</p>
    </div>
  )
}

