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
        'spin-with-bounce': 'spin-with-bounce 1s ease-in-out',
      },
      keyframes: {
        'spin-with-bounce': {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(720deg)' },
          '90%': { transform: 'rotate(-50deg)' },
        },
      },
    },
  },
  plugins: [],
}
