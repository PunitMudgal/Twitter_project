/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        blue1: "#0466C8",
        blue2: "#0353A4",
        blue3: "#023E7D",
        blue4: "#002855",
        blue5: "#001845",
        blue6: "#001233",
        gray1: "#979DAC",
        gray2: "#7D8597",
        gray3: "#5C677D",
        gray4: "#33415C",
      },
      fontFamily: {
        style1: ["Exo 2", "sans-serif"],
        style2: ["Fira Sans Condensed", "sans-serif"],
        style3: ["Roboto Slab", "serif"],
      },
      backgroundImage: {
        // "logo-image": "url('/src/assets/dark.png')",
        // "text-logo": "url('/src/assets/forever.png')",
      },
      screens: {
        "2xl": { max: "1535px" },
        xl: { max: "1279px" },
        lg: { max: "1023px" },
        md: { max: "767px" },
        sm: { max: "450px" },
        ss: { max: "330px" },
      },
    },
  },
  plugins: [],
};
