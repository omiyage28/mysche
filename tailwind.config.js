module.exports = {
  purge: ["./app/javascript/src/**/*.{vue,js,jsx,ts,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#FCF5ED",
        secondary: "#F4BF96",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
