const {fontFamily} = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', ...fontFamily.sans]
      },
    },
  },
  plugins: [],
}