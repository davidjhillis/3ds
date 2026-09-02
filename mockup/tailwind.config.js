const themeName = process.env.THEME || 'default';
const theme = require(`./themes/build/${themeName}.js`);

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './*.html',
    './js/*.js',
    './assets/js/*.js',
    './settings.html',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: theme.primary,
        accent: theme.accent || theme.primary,
        neutral: theme.neutral,
        // Standard Tailwind colors used by components
        blue: require('tailwindcss/colors').blue,
        green: require('tailwindcss/colors').green,
        red: require('tailwindcss/colors').red,
        amber: require('tailwindcss/colors').amber,
        yellow: require('tailwindcss/colors').yellow,
        purple: require('tailwindcss/colors').purple,
        orange: require('tailwindcss/colors').orange,
      }
    }
  },
  plugins: [],
}
