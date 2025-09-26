// app/components/DashboardNavbarWrapper.tsx
"use client";

import { usePathname } from "next/navigation";

export default function DashboardNavbarWrapper() {
  const pathname = usePathname();
  const safePath = pathname ?? "/dashboard"; // fallback if null

  return (
    <nav className="w-full bg-white shadow px-4 py-3 mb-4 flex items-center justify-between">
      <h1 className="text-lg font-semibold">
        {safePath === "/dashboard"
          ? "Dashboard"
          : safePath.replace("/", "")}
      </h1>
      {/* Add right-side controls (user menu, logout, etc.) here later */}
    </nav>
  );
}
