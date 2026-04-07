/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': 'var(--color-primary)',
        'secondary': '#ffffff',
      },
      fontSize: {
        'header': '14px',
        'subheader': '12px',
        'description': '10px',
      },
      fontWeight:{
        'bold': 'bold',
        'semibold': 'semibold',
        'medium': 'medium',
        'regular': 'regular',
      }
    },
  },
  plugins: [],
} 