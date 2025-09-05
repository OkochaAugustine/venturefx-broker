"use client";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-100 z-50">
      {/* Spinner */}
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

      {/* Text */}
      <p className="mt-4 text-gray-700 font-semibold text-lg">
        Loading Live Trade Dashboard...
      </p>
    </div>
  );
}
