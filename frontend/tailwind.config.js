const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        'custom-blue': '#5A72A0',
        'custom-medium-blue': '#20293b',
        'custom-light-blue': '#2b3851',
        'custom-lighter-blue': '#354664',
        'custom-white': '#FDFFE2',
        'custom-gray': '#656A6B',
        'input-lower-opacity': '#747ea8',
        'custom-dark-blue': '#1A2130',
      },
      boxShadow: {
        'white-glow': '0 0 2px 1px #FDFFE2',
      },
    },
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      'h900': { 'raw': '(min-height: 900px)' },
    }
  },
  plugins: [],
};