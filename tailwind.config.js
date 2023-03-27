/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        a: "#E14545",
        "a-dark": "#B93E3E",
        b: "#6966F5",
        "b-dark": "#5350BD",
        c: "#EFAC5D",
        "c-dark": "#BC8545",
        d: "#56BC66",
        "d-dark": "#429A50",
      },
    },
  },
  plugins: [],
};
