const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./public/index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        gray: colors.coolGray,
        'wild-sand': {
          50: '#fefeff',
          100: '#fefefe',
          200: '#fcfcfd',
          300: '#fafbfb',
          400: '#f7f7f9',
          500: '#f3f4f6',
          600: '#dbdcdd',
          700: '#b6b7b9',
          800: '#929294',
          900: '#777879',
        },
      },
      flex: {
        basis: '0 0 auto',
      },
    },
  },
  variants: {
    extend: {
      margin: ['last'],
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
