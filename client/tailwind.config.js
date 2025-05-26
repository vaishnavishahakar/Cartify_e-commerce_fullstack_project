/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
       fontFamily: {
        playwrite: ['"Playwrite HU"', 'cursive'],
        funnel: ['"Funnel Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

