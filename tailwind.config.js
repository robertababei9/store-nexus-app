/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0F172A',
        primaryHover: '#1E293B',
        secondary: '#4F46E5',
        secondaryHover: '#3730A3',
        success: "#008000",
        danger: "#FF0000",
        warning: "#f0ad4e"
      }
    },
    screens: {
      'xs': '350px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    }
  },
  plugins: [],
}

