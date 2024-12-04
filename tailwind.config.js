export default {
  darkMode: false, 
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        mainColor: '#AB654B',
        cancelColor: '#FF1212',
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
