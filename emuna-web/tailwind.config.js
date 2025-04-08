/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        peach: {
          DEFAULT: '#FFD89C',
          50:  '#FFF4E3',
          100: '#FFEBCF',
          200: '#FFE0B8', 
          300: '#FFD89C',
          400: '#FFC676',
        }
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
};