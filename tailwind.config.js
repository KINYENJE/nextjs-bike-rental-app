/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ...colors,
        dprimarybg: '#1E1E1E',
        dsecondarybg: "rgba(11, 14, 16, 0.5)",
        dred: "#FF3465",
        dsectext: "rgba(255, 255, 255, 0.71)",
        dgreen: "#14B786",
        lsecondarybg: "rgba(205, 205, 205, 0.2)",
        faintBlack: "rgba(0, 0, 0, 0.5)",
        faintWhite: "rgba(255, 255, 255, 0.7)",

      },
    },
  },
  plugins: [],
};
