/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens:{
        "1440px":"1440px",
        "1300px":"1300px",
        "1030px":"1030px",
        "1000px":"1000px",
        "640px":"640px",
        "990px":"990px",
        "600px":"600px",
        "400px":"400px",
        "390px":"390px",
        "356px":"356px",
        "340px":"340px",
      }
    },
  },
  plugins: [],
}