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
    },
  },
  plugins: [],
}
