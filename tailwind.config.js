/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        shine: {
          '0%, 100%': { color: 'white' },
          '50%': { color: '#10B981' }, // Emerald
        },
      },
      animation: {
        shine: 'shine 2s infinite',
      },
    },
  },
  plugins: [],
}
