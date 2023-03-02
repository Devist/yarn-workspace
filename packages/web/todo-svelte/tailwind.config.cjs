const baseConfig = require("../../../tailwind.config.cjs");

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...baseConfig,
  content: ["./src/**/*.{html,js,svelte,ts}"],
  // theme: {
  //   extend: {},
  // },
  plugins: [],
};
