/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        style1: ["Exo 2", "sans-serif"],
        style2: ["Fira Sans Condensed", "sans-serif"],
        style3: ["Roboto Slab", "serif"],
      },
      backgroundImage: {
        // "logo-image": "url('/src/assets/dark.png')",
        // "text-logo": "url('/src/assets/forever.png')",
      },
    },
    screens: {
      "2xl": { max: "1535px" },
      // => @media (max-width: 1535px) { ... }

      xl: { max: "1279px" },
      // => @media (max-width: 1279px) { ... }

      lg: { max: "1023px" },
      // => @media (max-width: 1023px) { ... }

      md: { max: "767px" },
      // => @media (max-width: 767px) { ... }

      sm: { max: "450px" },
      // => @media (max-width: 639px) { ... }

      ss: { max: "330px" },
    },
  },
  plugins: [],
};
