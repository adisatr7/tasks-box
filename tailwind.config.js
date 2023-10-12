/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.tsx", "./**/*.{tsx,ts}"],
  theme: {
    extend: {
      colors: {
        primary: "#4B5FC7",
        secondary: "#5B6BE0",
        glass: "#111111",
        "glass-outline": "#DDDDDD",
        "glass-input": "#7B7B7B"
      },
      fontSize: {
        "heading-1": "24px",
        "heading-2": "20px",
        body: "16px",
        caption: "14px"
      }
    }
  },
  plugins: []
}

