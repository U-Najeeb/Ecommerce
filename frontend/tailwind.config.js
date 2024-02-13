/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        "input-grey" : "#E3E3E3",
        "text-grey" : "#848484",
        "primary" :  "#1D58EF"
      }
    },
  },
  plugins: [],
}