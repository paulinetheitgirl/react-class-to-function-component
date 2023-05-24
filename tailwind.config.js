/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        green: colors.green,
        sky: colors.sky
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
