const colors = require("tailwindcss/colors")

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  darkMode: "selector",
  theme: {
    fontFamily: {
      display: ['"Noto Sans"', '"Roboto"', "ui-sans-serif", "system-ui", "sans-serif"]
    },
    extend: {
      colors: {
        light: "rgb(248 250 252)", // fill-gray-900
        dark: "rgb(17 24 39)", // fill-slate-50
        primary: "#F8F9FA",
        secondary: colors.yellow,
        neutral: colors.neutral,
      }
    },
  },
  plugins: [],
}
