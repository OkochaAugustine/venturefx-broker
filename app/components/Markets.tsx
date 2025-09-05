export default function Markets() {
  const markets = [
    { name: "Forex", icon: "💱" },
    { name: "Crypto", icon: "₿" },
    { name: "Indexes", icon: "📊" },
    { name: "Stocks", icon: "🏢" },
    { name: "Energy", icon: "⚡" },
    { name: "Commodities", icon: "🛢️" },
  ]

  return (
    <section className="bg-red-700 py-6 px-4 flex flex-wrap justify-center gap-6">
      {markets.map((m) => (
        <div key={m.name} className="text-center text-white">
          <div className="text-3xl">{m.icon}</div>
          <p className="mt-2 text-sm font-semibold">{m.name}</p>
        </div>
      ))}
    </section>
  )
}
