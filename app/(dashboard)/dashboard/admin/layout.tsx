export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-[#0d1b2a] text-white">
      {/* You can add an AdminNavbar later if needed */}
      {children}
    </div>
  )
}
