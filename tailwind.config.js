/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        turing: {
          blue: "#62c0c9",
          purple: "#ad7ee0",
        },
      },
    },
  },
  plugins: [],
};
