export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-white text-black">
      {/* Optional: Add an AdminNavbar later */}
      {children}
    </div>
  );
}

