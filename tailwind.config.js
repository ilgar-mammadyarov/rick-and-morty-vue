/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      maxWidth: {
        card: "37.5rem",
      },
      width: {
        card: "37.5rem",
      },
    },
  },
  plugins: [],
};
