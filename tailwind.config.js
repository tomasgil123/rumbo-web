module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        primary: {
          light: '#0096d1',
          DEFAULT: '#28458e',
          dark: '#004a99',
        },
        danger: {
          light: '#eb7b30',
          DEFAULT: '#e30816',
        },
        success: {
          DEFAULT: '#5c9551',
        },
        disabled: {
          DEFAULT: '#999999',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
