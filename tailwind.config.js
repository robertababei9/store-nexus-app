/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#111827',
        secondary: '#4F46E5',
        secondaryHover: '#3730A3'
      }
    },

  },
  plugins: [],
}

