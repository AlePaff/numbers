/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,     //centrar el contenido por default
      },
      animation: {
        'double-spin': 'double-spin 0.4s ease-in-out',
      },
      keyframes: {
        'double-spin': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(720deg)' },
        },
      },
      colors: {
        'arena-1': '#e5cf9b',
        'arena-2': '#e6c986',
        'arena-3': '#f1ede3',
        'arena-4': '#e9e2d3',
        'arena-5': '#b3ada0',
        'arena-6': '#e6d4ae',
        'arena-7': '#e6decd',
        'arena-8': '#f6f3ed',

      },
    },
  },
  plugins: [],
}
