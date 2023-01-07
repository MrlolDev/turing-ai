/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        turing: {
          white: "#fefefe",
          black: "#101010",
          primary: "#5865F2",
        },
      },
    },
  },
  plugins: [],
};
