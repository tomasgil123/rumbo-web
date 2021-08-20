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
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
