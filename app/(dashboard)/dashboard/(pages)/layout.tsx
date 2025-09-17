"use client";

// import Sidebar from "@/components/Sidebar";
import DashboardNavbarWrapper from "@/components/DashboardNavbarWrapper";

export default function DashboardPagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      {/* Sidebar for all dashboard sub-pages */}
      {/* <Sidebar /> */}

      <div className="flex-1">
        <DashboardNavbarWrapper />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}

