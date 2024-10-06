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
        'custom-white': '#FDFFE2',
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
    }
  },
  plugins: [],
};