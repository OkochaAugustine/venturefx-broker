/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],

  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    screens: {
      sm: "640px",
      md: "960px",
      lg: "1200px",
      xl: "1600px",
    },

    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        md: "2rem",
        lg: "3rem",
        xl: "4rem",
      },
    },

    extend: {
      fontSize: {
        base: ["1rem", { lineHeight: "1.5rem" }], // normal text size everywhere
        sm: ["1rem", { lineHeight: "1.5rem" }],
        md: ["1rem", { lineHeight: "1.5rem" }],
        lg: ["1rem", { lineHeight: "1.5rem" }],
        xl: ["1rem", { lineHeight: "1.5rem" }],
      },

      typography: {
        DEFAULT: {
          css: {
            maxWidth: "100%",
            color: "var(--foreground)",
            p: { marginTop: "0.75em", marginBottom: "0.75em", fontWeight: "400" },
            h1: { marginBottom: "0.6em", fontWeight: "400" },
            h2: { marginBottom: "0.6em", fontWeight: "400" },
            h3: { marginBottom: "0.6em", fontWeight: "400" },
            // remove any responsive overrides entirely
          },
        },
      },
    },
  },

  plugins: [
    require("@tailwindcss/typography"),
  ],
};
