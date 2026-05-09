/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'black': {
          primary: '#0a0b14',    // Almost Black Sidebar
          secondary: '#10121d',  // Deep Dark Background
          card: '#1c1e2d',       // Dark Card
        },
        'purple': {
          primary: '#7c3aed',    // Vibrant Violet
          secondary: '#a78bfa',  // Light Violet
          dark: '#5b21b6',       // Deep Violet
        },
        text: {
          primary: '#f8fafc',
          secondary: '#cbd5e1',
        },
        border: {
          DEFAULT: '#334155',
        },
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}
