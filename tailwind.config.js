export default {
  darkMode: 'class',
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
        black: {
          900: "#1a1a1a", // Deep black for backgrounds
          800: "#2d2d2d", // Slightly lighter black
          700: "#404040", // Medium black for hover states
        },
        // Custom white shades for light theme
        white: {
          100: "#f8fafc", // Off-white for backgrounds
          200: "#e5e7eb", // Light grayish-white
          300: "#d1d5db", // Medium grayish-white
        },
        // Adjust gray palette for better contrast
        gray: {
          50: "#f9fafb",
          100: "#f3f4f6",
          800: "#1f2937",
          900: "#111827",
        },
      },
    },
  },
    plugins: [
      require('tailwind-scrollbar-hide'),
    ],
    
};
