/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        dosis: ["Dosis", "serif"],
      },
      animation: {
        "bounce-custom": "bounce-custom 1s infinite",
      },
    },
  },
  plugins: [],
};
