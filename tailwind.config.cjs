/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  important: true,
  theme: {
    extend: {
      colors: {
        discord: {
          blurple: "#5865F2",
          dark_blurple: "#454FBF",
        },
        whatsapp: {
          dark_green: "#103928",
          green: "#24d266",
        },
        telegram: {
          blue: "#229ED9",
        },
      },
    },
  },
  plugins: [],
};
