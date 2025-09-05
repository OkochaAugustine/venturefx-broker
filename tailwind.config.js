/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    // ✅ Use Tailwind's default breakpoints (don’t force to 0px anymore)
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      // ✅ Optionally keep your site always centered like desktop
      container: {
        center: true,
        padding: "1rem",
      },
    },
  },
  plugins: [],
};
