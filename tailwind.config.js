
module.exports = {

  purge: ['./components/**/*.tsx', './pages/**/*.tsx'],

  darkMode: false, // or 'media' or 'class'
  theme: {
    
    extend: {
      fontFamily:{
        ShipporiAntique:["Shippori Antique","sans-serif"],
        Nunito:["Nunito", "sans-serif"]
      },
      colors: {
        primary: "#4e4e4e",
        maticColor:"#8247e5",
        maticColorHover:"#b48ff2"
        
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}