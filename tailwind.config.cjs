/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#0A192F", // Deep Navy Blue
        secondary: "#CCCCCC", // Light Gray (Text)
        tertiary: "#112240", // Slightly lighter Navy
        "black-100": "#100d25",
        "black-200": "#090325",
        "white-100": "#f3f3f3",
        "accent-cyan": "#00FFFF", // Teal/Cyan
        "accent-blue": "#00BFFF", // Electric Blue
        "accent-green": "#39FF14", // Lime Green
        "accent-orange": "#FF4500", // Bright Orange
      },
      boxShadow: {
        card: "0px 35px 120px -15px #211e35",
      },
      screens: {
        xs: "450px",
      },
      backgroundImage: {
        "hero-pattern": "url('/src/assets/herobg.png')",
      },
    },
  },
  plugins: [],
};
