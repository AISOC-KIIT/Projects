/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blogBlack: {
          500: "#0d0d0e"
        },
        blogGray: {
          500: "#3d3d43"
        }
      }
    },
  },
  plugins: [],
}

