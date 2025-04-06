export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563eb', // blue-600
          hover:   '#1e40af', // blue-800
        },
        secondary: {
          DEFAULT: '#f59e0b', // amber-500
          hover:   '#b45309', // amber-700
        },
      },
    },
  },
    plugins: [
      require('tailwind-scrollbar-hide'),
    ],
    
};
