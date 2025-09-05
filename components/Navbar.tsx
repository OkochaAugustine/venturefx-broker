 "use client"

export default function Navbar() {
  return (
    <header className="w-full bg-white shadow p-4 flex justify-between items-center">
      <h1 className="font-bold text-lg">Dashboard</h1>
      <div className="flex items-center gap-4">
        <span className="text-gray-600">Welcome back!</span>
        <img
          src="https://ui-avatars.com/api/?name=User"
          alt="User"
          className="w-8 h-8 rounded-full"
        />
      </div>
    </header>
  )
}

