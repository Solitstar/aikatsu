/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#F4DFE0',
        'card-bg': '#FDFBF7',
        'accent': '#F7A9A8',
        'accent-hover': '#F28B8A',
        'text-primary': '#5C4A4E',
        'text-secondary': '#8B7D80',
      },
      fontFamily: {
        'quick': ['Quicksand', 'sans-serif'],
        'sans': ['"Noto Sans SC"', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px rgba(247, 169, 168, 0.15)',
        'card': '0 2px 12px rgba(92, 74, 78, 0.08)',
      },
    },
  },
  plugins: [],
}
