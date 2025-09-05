"use client";

import { usePathname } from "next/navigation";
import DashboardNavbar from "@/components/DashboardNavbar";

export default function DashboardNavbarWrapper() {
  const pathname = usePathname();

  // ✅ Navbar will not show on the main dashboard page
  if (pathname === "/dashboard") return null;

  return <DashboardNavbar />;
}
