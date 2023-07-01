/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      primary: "Roboto",
    },

    extend: {
      screens: { sm: "480px", md: "768px", lg: "976px", xl: "1440pd" },
      colors: {
        "light-gold": "#f5bc51",
        "dark-gold": "#533519",
        "gradient-1": {
          50: "rgb(43, 0, 88)",
          100: "rgb(42, 37, 201)",
          200: "rgb(48, 173, 255)",
          300: "rgb(48, 173, 255)",
          400: "rgb(48, 173, 255)",
          500: "rgb(48, 173, 255)",
          600: "rgb(48, 173, 255)",
          700: "rgb(48, 173, 255)",
          800: "rgb(48, 173, 255)",
          900: "rgb(48, 173, 255)",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
