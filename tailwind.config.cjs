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
        turing: {
          premium: "#FFB743",
          background: "#272934",
          dark: "#20222A",
          gradient_1: "#51d7c8",
          gradient_2: "#5376b0",
          gradient_3: "#ad7fe2",
          // new
          light_blue: "#44A6A6", // main
          dark_blue: "#647AA6",
          light_purple: "#A179D9", // main
          purple: "#7E55D9", //main
          dark_purple: "#5854BF", //main
        },
      },
    },
  },
  plugins: [],
};
