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
          orange: '#eb7b30',
          light: '#fb9da3',
          DEFAULT: '#e30816',
        },
        success: {
          light: '#cde1c9',
          DEFAULT: '#5c9551',
        },
        disabled: {
          light: '#e7e7e7',
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
