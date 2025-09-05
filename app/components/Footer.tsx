"use client"
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaTelegramPlane } from "react-icons/fa"

export default function Footer() {
  return (
    <footer className="bg-[#0d1b2a] text-white py-12 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-10">
        
        {/* Logo + About */}
        <div>
          <h2 className="text-xl font-bold text-red-500">VentureWise Brokers</h2>
          <p className="mt-3 text-sm opacity-80">
            Trade Forex, Crypto, Stocks & Commodities on a secure platform with fast execution,
            tight spreads and dedicated support.
          </p>
        </div>

        {/* Company Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-sm opacity-80">
            <li><a href="/about" className="hover:text-red-500">About Us</a></li>
            <li><a href="/careers" className="hover:text-red-500">Careers</a></li>
            <li><a href="/contact" className="hover:text-red-500">Contact</a></li>
            <li><a href="/faq" className="hover:text-red-500">FAQs</a></li>
          </ul>
        </div>

        {/* Trading Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Trading</h3>
          <ul className="space-y-2 text-sm opacity-80">
            <li><a href="/platforms" className="hover:text-red-500">Trading Platforms</a></li>
            <li><a href="/instruments" className="hover:text-red-500">Instruments</a></li>
            <li><a href="/education" className="hover:text-red-500">Education</a></li>
            <li><a href="/market-analysis" className="hover:text-red-500">Market Analysis</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="bg-[#1b263b] p-3 rounded-full hover:bg-red-600 transition"><FaFacebookF /></a>
            <a href="#" className="bg-[#1b263b] p-3 rounded-full hover:bg-red-600 transition"><FaTwitter /></a>
            <a href="#" className="bg-[#1b263b] p-3 rounded-full hover:bg-red-600 transition"><FaLinkedinIn /></a>
            <a href="#" className="bg-[#1b263b] p-3 rounded-full hover:bg-red-600 transition"><FaTelegramPlane /></a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-xs opacity-70">
        <p>
          Risk Warning: Trading Forex/CFDs involves significant risk and may not be suitable for all investors.
          You could lose more than your initial investment. Ensure you fully understand the risks before trading.
        </p>
        <p className="mt-4">&copy; {new Date().getFullYear()} VentureWise Brokers. All rights reserved.</p>
      </div>
    </footer>
  )
}
