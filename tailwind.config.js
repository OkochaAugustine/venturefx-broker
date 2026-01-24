/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],

  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    // ✅ NORMAL industry-standard breakpoints
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },

    container: {
      center: true,
      padding: {
        DEFAULT: "0.75rem", // smaller on mobile
        sm: "1rem",
        md: "1.5rem",
        lg: "2rem",
        xl: "2.5rem",
      },
    },

    extend: {
      // ✅ NO fontSize overrides (let Tailwind breathe)
      // ✅ NO typography overrides
    },
  },

  // ❌ REMOVE typography plugin completely
  plugins: [],
};
