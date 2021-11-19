module.exports = {

  purge: {
    content: ['./components/**/*.tsx', './pages/**/*.tsx'],
    safelist: [
      'sidebar-icon ',
      'sidebar-icon-bottom',
      'sidebar-tooltip',
      'sidebar',
      'connect-div'
    ]
  },
  mode: "jit",
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        ShipporiAntique: ["Shippori Antique", "sans-serif"],
        Nunito: ["Nunito", "sans-serif"]
      },
      colors: {
        primary: "#4e4e4e",
        maticColor: "#8247e5",
        maticColorHover: "#b48ff2"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}