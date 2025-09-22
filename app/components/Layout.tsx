import Link from 'next/link'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex min-h-screen bg-gray-100'>
      <aside className='w-64 bg-white shadow-lg p-4 space-y-4'>
        <h1 className='text-2xl font-bold text-blue-600'>VentureFX</h1>
        <nav className='flex flex-col space-y-2'>
          <Link href='/dashboard' className='hover:bg-blue-100 p-2 rounded'>📊 Dashboard</Link>
          <Link href='/deposit' className='hover:bg-blue-100 p-2 rounded'>💰 Deposit</Link>
          <Link href='/withdraw' className='hover:bg-blue-100 p-2 rounded'>🏦 Withdraw</Link>
          <Link href='/trade' className='hover:bg-blue-100 p-2 rounded'>📈 Trade</Link>
          <Link href='/profile' className='hover:bg-blue-100 p-2 rounded'>👤 Profile</Link>
        </nav>
      </aside>
      <main className='flex-1 p-6'>{children}</main>
    </div>
  )
}
