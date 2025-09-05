"use client";

export default function Experience() {
  return (
    <section className="bg-[#0b1930] text-white py-20 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        
        {/* Left side - Commitment Text */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            We are committed to meeting your CFD and FX trading needs
          </h2>
          <p className="text-lg opacity-80 leading-relaxed mb-8">
            We help your money grow by putting it to work. Not just by words, 
            our experts ensure not only that your funds are at work, but are 
            put into carefully planned and strategically diversified trading 
            and investment portfolios for risk management. 
            <br /><br />
            We ensure transparent returns, with favourable management fees.
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-8 text-center md:text-left">
            <div>
              <p className="text-red-500 font-bold text-2xl">89+</p>
              <p className="text-sm opacity-80">Countries Our Clients are from</p>
            </div>
            <div>
              <p className="text-red-500 font-bold text-2xl">90%</p>
              <p className="text-sm opacity-80">Win rate across Crypto, Index & Signals</p>
            </div>
            <div>
              <p className="text-red-500 font-bold text-2xl">131k+</p>
              <p className="text-sm opacity-80">Active Traders and Counting</p>
            </div>
            <div>
              <p className="text-red-500 font-bold text-2xl">10+</p>
              <p className="text-sm opacity-80">Years Experience in Industry</p>
            </div>
          </div>
        </div>

        {/* Right side - Global Capital Markets Form */}
        <div className="bg-[#122543] p-8 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold mb-4">Connect to global capital markets</h3>
          <p className="mb-6 text-sm opacity-80">
            Access 40,000+ trading instruments and professional asset management on award-winning platforms.
          </p>

          {/* Form */}
          <form className="space-y-4">
            <input
              type="email"
              placeholder="Email address"
              className="w-full px-4 py-3 rounded-md bg-[#0d1b2a] border border-gray-600 focus:border-red-500 outline-none"
            />
            <input
              type="tel"
              placeholder="Phone number"
              className="w-full px-4 py-3 rounded-md bg-[#0d1b2a] border border-gray-600 focus:border-red-500 outline-none"
            />
            <button
              type="submit"
              className="w-full bg-red-600 py-3 rounded-md font-semibold hover:bg-red-700 transition"
            >
              Open Account
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
