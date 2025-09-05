export default function Features() {
  return (
    <section className="py-16 px-6 bg-white text-gray-800">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4">Why Choose Us</h2>
        <p className="text-gray-500 mb-10">
          We provide the best trading conditions in the market with transparency and
          reliability.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="border rounded-lg p-6 shadow hover:shadow-lg transition">
            <h3 className="text-lg font-semibold mb-3">Low Spreads</h3>
            <p className="text-gray-600 text-sm">
              Trade with ultra-tight spreads starting from 0.0 pips.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="border rounded-lg p-6 shadow hover:shadow-lg transition">
            <h3 className="text-lg font-semibold mb-3">Fast Execution</h3>
            <p className="text-gray-600 text-sm">
              Experience lightning-fast order execution with no requotes.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="border rounded-lg p-6 shadow hover:shadow-lg transition">
            <h3 className="text-lg font-semibold mb-3">24/7 Support</h3>
            <p className="text-gray-600 text-sm">
              Our dedicated team is always available to assist you anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
