"use client";
// app/(dashboard)/loading.tsx
export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-white/80 backdrop-blur">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <div className="h-12 w-12 rounded-full border-4 border-gray-300 border-t-blue-600 animate-spin" />
        {/* Title */}
        <div className="text-center">
          <p className="text-sm font-medium text-gray-900">Loading dashboard…</p>
          <p className="text-xs text-gray-500">Fetching live prices & charts</p>
        </div>
        {/* Progress bar (cosmetic) */}
        <div className="w-48 h-2 rounded-full bg-gray-200 overflow-hidden">
          <div className="h-full w-1/3 animate-[progress_1.2s_ease-in-out_infinite] bg-blue-600" />
        </div>
      </div>

      {/* Tailwind keyframes (scoped via arbitrary style) */}
      <style jsx>{`
        @keyframes progress {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(50%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </div>
  );
}
