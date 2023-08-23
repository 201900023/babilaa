const tailwindScrollbar = require('tailwind-scrollbar');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        Rubik: ['Rubil', 'sans serif']
      },
      gridTemplateColumns: {
        fill: 'repeat(auto-fit, minmax(250px, 1fr))',
        'fill-sm': 'repeat(auto-fit, minmax(160px, 1fr))',
      },
      colors: {
        purple: {
          0: '#86579F',
          100: '#E5DDEF'
        },
        primary: {
          0: 'white',
          50: '#fafafa',
          100: '#f4f4f5',
          200: '#e4e4e7',
          300: '#d4d4d8',
          400: '#a1a1aa',
          500: '#71717a',
          600: '#52525b',
          700: '#3f3f46',
          800: '#27272a',
          900: '#18181b',
        },

      },
      keyframes: {
        pop: {
          '25%': { transform: 'rotate(-5deg)' },
          '50%': { transform: 'scale(1.2)' },
          '75%': { transform: 'rotate(5deg) ' },
        },
      },
      animation: {
        pop: 'pop 1s ease-in-out',
      },
    },
  },
  plugins: [tailwindScrollbar],
};
