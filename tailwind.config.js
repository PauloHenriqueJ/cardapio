/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [    "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
],
  theme: {
    fontFamily: {
      'sans':['Roboto','sans-serif']
    },
    extend: {
      backgroundImage:{
      "home":"url('/assets/bg.png')"
      }
    },
  },
  plugins: [],
}

