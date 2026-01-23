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
      md: "960px",  // breakpoint for desktop
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
        // MOBILE-FIRST: bold, larger text
        base: ["1.25rem", { lineHeight: "1.75rem" }], // 20px for mobile
        sm: ["1.25rem", { lineHeight: "1.75rem" }],   // same as base
        // reset for desktop (md and up)
        md: ["1rem", { lineHeight: "1.5rem" }],       // 16px normal
        lg: ["1rem", { lineHeight: "1.5rem" }],
        xl: ["1rem", { lineHeight: "1.5rem" }],
      },

      typography: {
        DEFAULT: {
          css: {
            maxWidth: "100%",
            color: "var(--foreground)",
            p: {
              marginTop: "0.75em",
              marginBottom: "0.75em",
              fontWeight: "700", // bold for mobile
            },
            h1: { marginBottom: "0.6em", fontWeight: "700" },
            h2: { marginBottom: "0.6em", fontWeight: "700" },
            h3: { marginBottom: "0.6em", fontWeight: "700" },
            // desktop overrides
            "@screen md": {
              p: { fontWeight: "400" }, // normal for desktop
              h1: { fontWeight: "600" },
              h2: { fontWeight: "600" },
              h3: { fontWeight: "600" },
            },
          },
        },
      },
    },
  },

  plugins: [
    require("@tailwindcss/typography"),
  ],
};
