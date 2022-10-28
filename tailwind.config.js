/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    maxWidth: {
      container: "900px",
    },
    screens: {
      sm: "375px",
      sml: "667px",
      md: "768px",
      lg: "1024px",
    },
    extend: {},
  },
  plugins: [],
};
