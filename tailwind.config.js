/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brandDark: '#526e78',
        brandLight: '#EFF4F7',
      },
    },
  },
  plugins: [],
}