/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      mainColor: '#AB654B',
      cancelColor: '#6366FF'
    },
  },
  plugins: [require("tailwind-scrollbar-hide"),],
};
