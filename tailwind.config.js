// const colors = require("tailwindcss/colors")

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  mode: "jit",
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#4e4e4e",
        
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}